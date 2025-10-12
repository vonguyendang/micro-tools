# Trình Rút Gọn Link Đơn Giản bằng PHP & JSON

Đây là một dự án trình rút gọn link (URL Shortener) gọn nhẹ, được xây dựng bằng PHP cho phần backend và sử dụng một file JSON duy nhất (`links.json`) để làm cơ sở dữ liệu. Dự án không yêu cầu hệ quản trị cơ sở dữ liệu phức tạp như MySQL, giúp việc cài đặt và triển khai trở nên cực kỳ nhanh chóng.

Trang giao diện người dùng được xây dựng bằng HTML/CSS/JS đơn giản, cho phép người dùng dán một URL dài và nhận lại một URL rút gọn.

## ✨ Tính năng chính

- **Không cần Database**: Sử dụng file `links.json` để lưu trữ các liên kết, dễ dàng sao lưu và di chuyển.
- **Backend bằng PHP**: Hoạt động trên hầu hết các môi trường hosting phổ thông có hỗ trợ PHP.
- **URL thân thiện (Clean URLs)**: Sử dụng file `.htaccess` để tạo ra các link rút gọn có dạng `yourdomain.com/short-code` thay vì `yourdomain.com/redirect.php?code=short-code`.
- **Giao diện đơn giản**: Giao diện người dùng trực quan để rút gọn link.
- **Tạo mã QR**: Tích hợp tính năng tạo mã QR cho link đã được rút gọn.
- **Dễ dàng cài đặt**: Chỉ cần tải lên hosting và cấu hình quyền ghi file.

## 📂 Cấu trúc thư mục

```
url-shortener-json-v1/
├── index.html          # Giao diện người dùng chính để nhập link cần rút gọn.
├── script.js           # JavaScript phía client, xử lý việc gửi yêu cầu rút gọn và hiển thị kết quả.
├── style.css           # Định dạng giao diện.
├── shorten.php         # Backend PHP xử lý việc tạo short code, lưu vào file JSON.
├── redirect.php        # Backend PHP xử lý việc đọc short code và chuyển hướng đến URL gốc.
├── links.json          # File "cơ sở dữ liệu" chứa các cặp ánh xạ giữa short code và URL gốc.
├── api.php             # (Có thể dùng để mở rộng) Cung cấp API để tương tác với dữ liệu links.
├── .htaccess           # File cấu hình của Apache, giúp tạo ra các URL thân thiện.
├── s-manager/          # Thư mục có thể dùng để phát triển trang quản lý link trong tương lai.
└── README.md           # File hướng dẫn này.
```

## 🚀 Hướng dẫn cài đặt

Để dự án hoạt động, bạn cần một môi trường hosting có hỗ trợ PHP và máy chủ web Apache (hoặc tương thích với file `.htaccess`).

### Yêu cầu

1.  **Web Server**: Apache với module `mod_rewrite` đã được bật.
2.  **PHP**: Phiên bản 5.6 trở lên.

### Các bước cài đặt

1.  **Tải lên mã nguồn**: Tải toàn bộ các file trong thư mục dự án lên thư mục gốc trên hosting của bạn (ví dụ: `public_html`).

2.  **Cấp quyền ghi cho file `links.json`**: Đây là bước **quan trọng nhất**. Máy chủ web cần có quyền ghi vào file `links.json` để có thể lưu các link mới. Bạn có thể cấp quyền này thông qua trình quản lý file trên cPanel/DirectAdmin hoặc qua SSH.

    - **Sử dụng trình quản lý file**: Tìm file `links.json`, chọn "Change Permissions" (hoặc "Phân quyền") và đặt giá trị thành `664` hoặc `666`. 
    ![Cấp quyền file](https://i.imgur.com/g2p3sJc.png)

    - **Sử dụng SSH**: Di chuyển đến thư mục dự án và chạy lệnh:
      ```bash
      chmod 664 links.json
      ```

3.  **(Khuyến nghị) Bảo vệ file `links.json`**: Để ngăn người khác truy cập trực tiếp và xem toàn bộ danh sách link của bạn, hãy thêm đoạn mã sau vào cuối file `.htaccess`:

    ```apache
    <Files "links.json">
        Order Allow,Deny
        Deny from all
    </Files>
    ```

4.  **Hoàn tất**: Truy cập vào tên miền của bạn để bắt đầu sử dụng.

## ⚙️ Hướng dẫn sử dụng

### Rút gọn một link

1.  Mở trình duyệt và truy cập vào trang chủ của bạn (nơi bạn đã upload mã nguồn).
2.  Dán URL dài mà bạn muốn rút gọn vào ô nhập liệu.
3.  Nhấn nút "Rút Gọn".
4.  Link sau khi rút gọn sẽ xuất hiện bên dưới. Bạn có thể sao chép, mở trực tiếp hoặc tạo mã QR cho nó.

### Cơ chế hoạt động

-   Khi bạn rút gọn một link, `index.html` sẽ gửi yêu cầu đến `shorten.php`.
-   `shorten.php` tạo một mã ngắn (short code) ngẫu nhiên, sau đó lưu cặp `short-code` và `URL-gốc` vào file `links.json`.
-   Khi có người truy cập vào link rút gọn (ví dụ: `yourdomain.com/abcde`), file `.htaccess` sẽ bí mật chuyển hướng yêu cầu này đến `redirect.php?code=abcde`.
-   `redirect.php` sẽ tra cứu mã `abcde` trong file `links.json` để tìm URL gốc tương ứng và thực hiện chuyển hướng người dùng đến đó.

### Quản lý các link đã tạo

Dự án ở phiên bản này không có giao diện quản lý link. Để xóa hoặc chỉnh sửa một link, bạn cần phải **chỉnh sửa trực tiếp file `links.json`**.
