# Trình tải phụ đề JAV từ Subtitlecat

## Giới thiệu

Đây là một script Python được thiết kế để tự động hóa việc tìm kiếm và tải hàng loạt phụ đề tiếng Việt cho JAV (Japanese Adult Video) từ trang web `subtitlecat.com`.

Script hoạt động bằng cách đọc danh sách các mã phim và URL tìm kiếm tương ứng từ các file văn bản, sau đó truy cập vào trang web, phân tích (scrape) dữ liệu để tìm liên kết tải về, và cuối cùng là lưu các file phụ đề vào máy tính của bạn.

## Cấu trúc thư mục

```
subjav-downloader-python/
│
├─── subtitlecat.py           # Script Python chính để chạy.
│
├─── name.txt                 # [INPUT] File văn bản chứa danh sách TÊN FILE PHỤ ĐỀ bạn muốn lưu.
│
├─── sublink.txt              # [INPUT] File văn bản chứa danh sách URL TÌM KIẾM trên subtitlecat.com.
│
├─── subtitles/               # [OUTPUT] Thư mục chứa các file phụ đề (.srt) đã được tải về.
│
├─── notfound.txt             # [LOG] Ghi lại các mã phim không tìm thấy phụ đề.
│
├─── cannotdownload.txt       # [LOG] Ghi lại các link phụ đề đã tìm thấy nhưng không thể tải về được.
│
└─── README.md                # File hướng dẫn này.
```

## Yêu cầu

*   Python 3.x
*   Thư viện `requests`
*   Thư viện `beautifulsoup4`

## Hướng dẫn cài đặt

1.  **Tải mã nguồn:**
    *   Clone repository này về máy của bạn hoặc tải về dưới dạng file ZIP và giải nén.

2.  **Cài đặt các thư viện cần thiết:**
    *   Mở Terminal (trên macOS/Linux) hoặc Command Prompt (trên Windows).
    *   Di chuyển đến thư mục của dự án này.
    *   Chạy lệnh sau để cài đặt các thư viện qua `pip`:

    ```sh
    pip install requests beautifulsoup4
    ```

## Hướng dẫn sử dụng

Để script hoạt động chính xác, bạn cần chuẩn bị hai file input là `name.txt` và `sublink.txt`.

### Bước 1: Chuẩn bị file `name.txt`

Mở file `name.txt` và nhập vào danh sách các **tên file** bạn muốn đặt cho phụ đề sau khi tải về. **Mỗi tên file nằm trên một dòng riêng**.

*Ví dụ nội dung file `name.txt`:*
```
SSIS-001.srt
IPX-486.srt
STARS-333.srt
```

### Bước 2: Chuẩn bị file `sublink.txt`

Mở file `sublink.txt`. Với mỗi dòng trong file `name.txt`, bạn cần cung cấp một URL tìm kiếm tương ứng trên trang `subtitlecat.com` và đặt nó vào **đúng số dòng** trong file `sublink.txt`.

URL tìm kiếm có định dạng: `https://subtitlecat.com/search.php?search=MA_PHIM`

*Ví dụ nội dung file `sublink.txt` (tương ứng với ví dụ `name.txt` ở trên):*
```
https://subtitlecat.com/search.php?search=SSIS-001
https://subtitlecat.com/search.php?search=IPX-486
https://subtitlecat.com/search.php?search=STARS-333
```

**QUAN TRỌNG:** Số lượng dòng trong file `name.txt` và `sublink.txt` phải **bằng nhau tuyệt đối**.

### Bước 3: Chạy Script

1.  Mở Terminal hoặc Command Prompt trong thư mục của dự án.
2.  Thực thi script bằng lệnh:

    ```sh
    python subtitlecat.py
    ```

3.  Script sẽ bắt đầu chạy, bạn sẽ thấy log xử lý được in ra màn hình, bao gồm tiến trình, thời gian dự kiến hoàn thành, và trạng thái của từng URL.

### Bước 4: Kiểm tra kết quả

*   **File tải về:** Các file phụ đề tải thành công sẽ nằm trong thư mục `subtitles/`.
*   **File log:**
    *   `notfound.txt`: Chứa danh sách các mã phim không tìm thấy phụ đề trên trang web.
    *   `cannotdownload.txt`: Chứa danh sách các link phụ đề đã tìm thấy nhưng gặp lỗi trong quá trình tải.
