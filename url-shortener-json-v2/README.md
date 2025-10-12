# Trình Rút Gọn Link v2.0 - Có Trang Quản Lý

Đây là phiên bản 2.0 của dự án trình rút gọn link, một bản nâng cấp lớn so với phiên bản đầu tiên. Dự án vẫn giữ nguyên triết lý cốt lõi: gọn nhẹ, không cần cơ sở dữ liệu (sử dụng file JSON), và chạy trên môi trường PHP phổ thông. 

Điểm cải tiến lớn nhất ở phiên bản này là sự xuất hiện của **Trang Quản Lý (Admin Dashboard)** được bảo vệ bằng mật khẩu, cho phép bạn dễ dàng thêm, sửa, xóa và tìm kiếm các liên kết đã tạo.

## ✨ Tính năng mới ở v2.0

- **Trang Quản Lý Link**: Giao diện trực quan để quản lý toàn bộ các link rút gọn.
- **Xác thực bằng mật khẩu**: Trang quản lý được bảo vệ bằng username và mật khẩu (cấu hình trong `config.php`).
- **Cấu hình tập trung**: Tách các thông tin nhạy cảm (như mật khẩu admin) ra file `config.php` riêng biệt.
- **API quản lý**: File `api.php` được viết lại hoàn toàn để phục vụ các tác vụ Thêm/Sửa/Xóa (CRUD) một cách an toàn từ trang quản lý.
- **Cấu trúc dữ liệu cải tiến**: File `links.json` giờ đây là một mảng các đối tượng, mỗi đối tượng chứa nhiều thông tin hơn (ID, shortCode, originalUrl, clicks, createdAt, updatedAt), tạo nền tảng để mở rộng các tính năng thống kê trong tương lai.
- **Giao diện cải tiến**: Tối ưu hóa trải nghiệm người dùng ở cả trang chủ và trang quản lý.

## 📂 Cấu trúc thư mục

```
url-shortener-json-v2/
├── index.php             # Giao diện người dùng chính (trang chủ).
├── redirect.php          # Backend xử lý chuyển hướng và đếm lượt click.
├── shorten.php           # Backend xử lý yêu cầu rút gọn link nhanh từ trang chủ.
├── api.php               # API backend cho trang quản lý (Thêm, sửa, xóa, tải danh sách link).
├── config.php            # [QUAN TRỌNG] File cấu hình username và mật khẩu admin.
├── links.json            # File "cơ sở dữ liệu" với cấu trúc mới.
├── .htaccess             # File cấu hình của Apache cho URL thân thiện.
├── style.css, script.js  # Asset cho trang chủ.
├── s-manager/            # [TÍNH NĂNG MỚI] Thư mục chứa trang quản lý.
│   ├── index.php         # Trang chính của khu vực quản lý, yêu cầu đăng nhập.
│   ├── login.php         # Xử lý logic đăng nhập.
│   ├── logout.php        # Xử lý đăng xuất.
│   ├── manager_content.php # Nội dung trang quản lý sau khi đăng nhập thành công.
│   └── script.js, style.css # Asset cho trang quản lý.
└── README.md             # File hướng dẫn này.
```

## 🚀 Hướng dẫn cài đặt

### Yêu cầu

1.  **Web Server**: Apache với module `mod_rewrite` đã được bật.
2.  **PHP**: Phiên bản 7.0 trở lên (do có sử dụng session và các hàm PHP hiện đại).

### Các bước cài đặt

1.  **Cấu hình mật khẩu Admin**: Đây là bước đầu tiên và quan trọng nhất.
    - Mở file `config.php`.
    - Thay đổi giá trị của `ADMIN_USERNAME` và `ADMIN_PASSWORD` thành tên đăng nhập và mật khẩu bạn muốn sử dụng.
    - **Lưu ý**: Để bảo mật tốt hơn, bạn nên sử dụng mật khẩu đã được hash như hướng dẫn trong comment của file.

2.  **Tải lên mã nguồn**: Tải toàn bộ các file và thư mục của dự án lên hosting của bạn.

3.  **Cấp quyền ghi cho file `links.json`**: Tương tự phiên bản 1, máy chủ web cần có quyền ghi vào file `links.json`. 
    - Sử dụng trình quản lý file trên hosting hoặc SSH để cấp quyền `664` (hoặc `666` nếu `664` không hoạt động) cho file `links.json`.

4.  **(Khuyến nghị) Bảo vệ file `links.json` và `config.php`**: Để tăng cường bảo mật, hãy thêm đoạn mã sau vào file `.htaccess` để chặn truy cập trực tiếp vào các file này từ trình duyệt:

    ```apache
    <FilesMatch "\.(json|php)$">
        <If "-f %{REQUEST_FILENAME}">
            <If "%{REQUEST_URI} !~ m#^/index.php#">
                <If "%{REQUEST_URI} !~ m#^/redirect.php#">
                    <If "%{REQUEST_URI} !~ m#^/shorten.php#">
                        <If "%{REQUEST_URI} !~ m#^/api.php#">
                            <If "%{REQUEST_URI} !~ m#^/s-manager/(index|login|logout|manager_content)\.php#">
                                Order Allow,Deny
                                Deny from all
                            </If>
                        </If>
                    </If>
                </If>
            </If>
        </If>
    </FilesMatch>
    ```
    *Lưu ý: Đoạn mã trên phức tạp hơn để đảm bảo các file PHP cần thiết vẫn hoạt động. Một cách đơn giản hơn là chỉ chặn file `.json` và `config.php`.*

5.  **Hoàn tất**: Truy cập vào tên miền của bạn để bắt đầu sử dụng.

## ⚙️ Hướng dẫn sử dụng

### 1. Rút gọn link (Trang chủ)

- Truy cập trang chủ (`yourdomain.com`).
- Dán URL dài vào ô và nhấn "Rút Gọn Ngay".
- Link rút gọn sẽ được tạo tự động và hiển thị.

### 2. Quản lý Links (Trang Admin)

- **Đăng nhập**:
    - Truy cập vào đường dẫn `yourdomain.com/s-manager`.
    - Sử dụng username và mật khẩu bạn đã cấu hình trong `config.php` để đăng nhập.

- **Các tính năng trong trang quản lý**:
    - **Xem danh sách**: Toàn bộ các link đã tạo sẽ được liệt kê ở đây, cùng với số lượt click, ngày tạo và ngày cập nhật.
    - **Tìm kiếm**: Gõ vào ô tìm kiếm để lọc danh sách link theo short code hoặc URL gốc.
    - **Thêm link mới**: Nhấn nút "Thêm Link Mới", bạn có thể tự điền "short code" (alias) tùy chỉnh và URL gốc.
    - **Sửa link**: Nhấn vào biểu tượng cây bút ở mỗi hàng để chỉnh sửa short code hoặc URL gốc của một link.
    - **Xóa link**: Nhấn vào biểu tượng thùng rác để xóa một link. Sẽ có một hộp thoại xác nhận để tránh xóa nhầm.
    - **Đăng xuất**: Nhấn vào nút "Đăng xuất" ở góc trên bên phải để kết thúc phiên làm việc.
