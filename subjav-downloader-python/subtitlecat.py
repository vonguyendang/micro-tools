import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urlparse
import time
import re
from datetime import datetime, timedelta

def find_subtitle_url(url):
    """
    Tìm URL tải xuống phụ đề tiếng Việt từ trang web.

    Args:
        url (str): URL của trang tìm kiếm.

    Returns:
        str: URL tải xuống phụ đề tiếng Việt, hoặc None nếu không tìm thấy.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, "html.parser")
        td_tags = soup.find_all("td")
        td_tags_with_href = [td for td in td_tags if td.find("a") and td.find("a").has_attr("href")]

        hrefs = [td.find("a")["href"] for td in td_tags_with_href[:3] if td.find("a")]  # Lấy trực tiếp href

        subtitle_code = url.split("=")[-1]
        subtitle_url = None

        for href in hrefs:
            if href and re.search(re.escape(subtitle_code), href, re.IGNORECASE):
                subtitle_url = "https://subtitlecat.com/" + href
                print(f"✔️ Tìm thấy: subtitle_code={subtitle_code}, href={href}, subtitle_url={subtitle_url}")
                return subtitle_url

        # Kiểm tra sự tồn tại của cả hai chuỗi
        code_found = any(re.search(re.escape(subtitle_code), h, re.IGNORECASE) for h in hrefs if h)
        aldn_found = any(re.search(re.escape("ALDN-332"), h, re.IGNORECASE) for h in hrefs if h)

        if not code_found and not aldn_found:
            print(f"❌ Cả {subtitle_code} và ALDN-332 đều không có trong URL.")
            return "NOT_FOUND"  # Sử dụng một giá trị đặc biệt

        return None  # Trả về None nếu chỉ có ALDN-332 hoặc không tìm thấy gì khác

    except requests.exceptions.RequestException as e:
        print(f"❌ Lỗi request khi xử lý {url}: {e}")
        return None
    except Exception as e:
        print(f"❌ Lỗi không xác định khi xử lý {url}: {e}")
        return None


def get_download_link(url):
    """
    Lấy URL tải xuống thực tế từ trang trung gian.

    Args:
        url (str): URL trang chứa liên kết tải xuống.

    Returns:
        str: URL tải xuống trực tiếp, hoặc None nếu không tìm thấy.
    """
    try:
        subtitle_response = requests.get(url)
        subtitle_response.raise_for_status()

        subtitle_soup = BeautifulSoup(subtitle_response.content, "html.parser")
        download_link = subtitle_soup.find("a", id="download_vi")
        if download_link and download_link.has_attr("href"):
            download_url = "https://subtitlecat.com" + download_link["href"]
            print(f"➕ Đã tạo URL tải xuống phụ đề: {download_url}")
            return download_url
        else:
            print("❌ Lỗi: Không tìm thấy URL tải xuống phụ đề.")
            return None

    except requests.exceptions.RequestException as e:
        print(f"❌ Lỗi request khi lấy link tải xuống từ {url}: {e}")
        return None
    except Exception as e:
        print(f"❌ Lỗi không xác định khi lấy link tải xuống từ {url}: {e}")
        return None

def format_timedelta(td):
    """
    Định dạng đối tượng timedelta thành chuỗi có dạng "HH:MM:SS".

    Args:
        td (timedelta): Đối tượng timedelta cần định dạng.

    Returns:
        str: Chuỗi định dạng thời gian.
    """
    hours, remainder = divmod(td.total_seconds(), 3600)
    minutes, seconds = divmod(remainder, 60)
    return "{:02}:{:02}:{:02}".format(int(hours), int(minutes), int(seconds))

def download_subtitle(url, folder=".", filename="subtitle.srt"):
    """
    Tải xuống phụ đề từ URL đã cho và lưu vào một tệp trong thư mục đã chỉ định.

    Args:
        url (str): URL tải phụ đề.
        folder (str): Thư mục để tải file, nếu thư mục không tồn tại sẽ tạo mới.
        filename (str): Tên file để lưu phụ đề.

    Returns:
        bool: True nếu thành công, False nếu thất bại.
    """
    try:
        srt_url = get_download_link(url)
        if not srt_url:
            return False  # Không tải nếu không có URL

        if not os.path.exists(folder):
            os.makedirs(folder)
            print(f"➕ Đã tạo thư mục: {folder}")

        response = requests.get(srt_url)
        response.raise_for_status()

        filepath = os.path.join(folder, filename)

        with open(filepath, "wb") as f:
            f.write(response.content)
        print(f"⬇️ 💾 Phụ đề đã được tải xuống và lưu vào {filepath}")
        return True

    except requests.exceptions.RequestException as e:
        print(f"❌ Lỗi request khi tải xuống từ {srt_url}: {e}")
        return False
    except Exception as e:
        print(f"❌ Lỗi không xác định khi tải xuống từ {srt_url}: {e}")
        return False


def main():
    """
    Đọc URL từ sublink.txt, tải xuống phụ đề và lưu với tên lấy từ URL.
    """

    try:
        with open("sublink.txt", "r") as url_file:
            url_lines = [url.strip() for url in url_file.readlines()]
        print("✔️ Đã đọc URL từ file sublink.txt.")
    except FileNotFoundError:
        print("❌ Lỗi : Không tìm thấy file sublink.txt")
        return

    try:
        with open("name.txt", "r") as name_file:
            name_lines = [name.strip() for name in name_file.readlines()]
        print("✔️ Đã đọc tên từ file name.txt.")
    except FileNotFoundError:
        print("❌ Lỗi : Không tìm thấy file name.txt")
        return

    if len(url_lines) != len(name_lines):
        print("⚠️ Lỗi: Số lượng URL và tên không khớp.")
        return

    folder = "subtitles"
    total_urls = len(url_lines)
    max_download_retries = 20
    url_retry_counts = {}
    not_found_urls = []
    cannot_download_urls = []
    successful_downloads = 0


    start_time = datetime.now()  # Ghi lại thời gian bắt đầu
    
   
    print()
    print(f"💥 Bắt đầu lúc: {start_time.strftime('%H:%M:%S %d/%m/%Y')}")

    for i, url in enumerate(url_lines):


        processed_count = i + 1

        elapsed_time = datetime.now() - start_time  # Tính thời gian đã trôi qua
        avg_time_per_url = elapsed_time / processed_count if processed_count > 0 else timedelta(0)  # Tính thời gian trung bình
        remaining_time = avg_time_per_url * (total_urls - processed_count)  # Tính thời gian còn lại
        end_time_est = datetime.now() + remaining_time  # Ước tính thời gian kết thúc
        # Tính toán tỷ lệ tạm thời và in ra
        temp_success_rate = (successful_downloads / (processed_count-1)) * 100 if processed_count-1 else 0
        temp_not_found_rate = (len(not_found_urls) / (processed_count-1)) * 100 if processed_count-1 else 0
        temp_failed_download_rate = (len(cannot_download_urls) / (processed_count-1)) * 100 if processed_count-1 else 0

        print()
        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        print()
        print(f"⏱️ Đã thực hiện được: {format_timedelta(elapsed_time)}, Dự kiến hoàn thành sau {format_timedelta(remaining_time)} , lúc: {end_time_est.strftime('%H:%M:%S')}")
        print(f"💡 Thành công: {temp_success_rate:.2f}% ({successful_downloads} URLS) | Không tìm thấy: {temp_not_found_rate:.2f}% ({len(not_found_urls)} URLS) | Không thể tải: {temp_failed_download_rate:.2f}% ({len(cannot_download_urls)} URLS)")
        print(f"🚀 Đang xử lý URL thứ {processed_count}/{total_urls}: {url}")

        download_url = None
        for retry in range(max_download_retries):
            print(f"🔄 Lần thử: {retry + 1} - Tìm URL từ: {url}")
            code = url.split("=")[-1]
            download_url = find_subtitle_url(url)
            if download_url == "NOT_FOUND":
                break  # Dừng thử lại nếu cả hai đều không tìm thấy
            elif download_url:
                break  # Dừng thử lại nếu tìm thấy
            time.sleep(3)

        if download_url and download_url != "NOT_FOUND":
            filename = name_lines[i]  # Tạo tên file từ name.txt
            if download_subtitle(download_url, folder, filename):
                successful_downloads += 1
                pass
            else:
                print(f"⚠️ Lỗi: Không thể tải xuống phụ đề từ {download_url}, ghi vào cannotdownload.txt")
                cannot_download_urls.append((download_url, url, name_lines[i]))
        elif download_url == "NOT_FOUND":
            print(f"❌ Lỗi: Không tìm thấy ALDN-332 và {code} trong URL: {url}, ghi vào notfound.txt")
            not_found_urls.append((code, url, name_lines[i]))
        else:
            print(f"❌ Lỗi: Không tìm thấy URL tải xuống cho {url}, ghi vào notfound.txt")
            not_found_urls.append((code, url, name_lines[i]))

        time.sleep(3)

    if not_found_urls:
        with open("notfound.txt", "w") as f:
            for code, url, name in not_found_urls:
                f.write(f"❌ Không tìm thấy srt cho code: {code} ; url: {url} ; name: {name}\n")
        print()
        print("✅ Đã ghi các URL không tìm thấy vào notfound.txt")

    if cannot_download_urls:
        with open("cannotdownload.txt", "w") as f:
            for download_url, url, name in cannot_download_urls:
                f.write(f"⚠️ Không thể tải srt từ: {download_url} ; url: {url} ; name: {name}\n")
        print("✅ Đã ghi các URL không thể tải vào cannotdownload.txt")

    print("✅ Đã xử lý xong tất cả các URL.")
        # Thêm thông tin thống kê
    success_rate = (successful_downloads / total_urls) * 100 if total_urls else 0
    not_found_rate = (len(not_found_urls) / total_urls) * 100 if total_urls else 0
    failed_download_rate = (len(cannot_download_urls) / total_urls) * 100 if total_urls else 0
 
    print()
    print("--- Thống kê ---")
    print(f"Tổng URL xử lý: {total_urls} URLS")
    print(f"Tỷ lệ thành công: {success_rate:.2f}% ({successful_downloads} URLS)")
    print(f"Tỷ lệ không tìm thấy: {not_found_rate:.2f}% ({len(not_found_urls)} URLS)")
    print(f"Tỷ lệ không thể tải xuống: {failed_download_rate:.2f}% ({len(cannot_download_urls)} URLS)")
    print()
    print(f"💥 Kết thúc: {datetime.now().strftime('%H:%M:%S %d/%m/%Y')}")


if __name__ == "__main__":
    main()