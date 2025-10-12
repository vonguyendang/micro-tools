# API Địa danh Hành chính Việt Nam

## Giới thiệu

Đây là một API RESTful đơn giản, nhẹ và không phụ thuộc (dependency-free) được xây dựng bằng PHP thuần. API này cho phép truy vấn thông tin về các đơn vị hành chính của Việt Nam, bao gồm Tỉnh/Thành phố, Quận/Huyện, và Phường/Xã.

Toàn bộ dữ liệu được lấy từ file `data/vn-location.json`, một file JSON chứa cấu trúc cây của các đơn vị hành chính.

### Công nghệ sử dụng

*   **Ngôn ngữ:** PHP (yêu cầu phiên bản 7.4 trở lên).
*   **Web Server:** Apache hoặc Nginx.
*   **Quản lý gói:** Composer (chỉ sử dụng cho việc tự động tải class theo chuẩn PSR-4).

## Cấu trúc thư mục

```
location-api/
│
├─── public/                   # Thư mục gốc của web server (Document Root).
│    ├─── .htaccess            # File cấu hình cho Apache để điều hướng mọi request đến index.php.
│    └─── index.php            # Điểm vào (Entry Point) của ứng dụng, xử lý routing.
│
├─── src/                      # Chứa mã nguồn của ứng dụng.
│    ├─── Controller/          # Chứa các lớp điều khiển, xử lý logic request.
│    │    └─── LocationController.php
│    ├─── Exception/           # Chứa các lớp exception tùy chỉnh.
│    │    └─── NotFoundException.php
│    └─── Service/             # Chứa các lớp dịch vụ, xử lý logic nghiệp vụ.
│         └─── LocationService.php
│
├─── data/                     # Chứa file dữ liệu địa danh.
│    └─── vn-location.json
│
├─── config/                   # Chứa các file cấu hình.
│    └─── config.php
│
├─── templates/                # Chứa các file template HTML.
│    └─── api_help.php
│
├─── cache/                    # Thư mục cache (cần cấp quyền ghi).
│    └─── .gitignore
│
├─── vendor/                   # Thư mục chứa các gói được cài đặt bởi Composer.
│
├─── composer.json             # File định nghĩa dự án và các gói phụ thuộc cho Composer.
│
└─── README.md                 # File hướng dẫn này.
```

## Yêu cầu

*   PHP >= 7.4
*   Composer
*   Web server (Apache, Nginx, hoặc tương tự)

## Hướng dẫn cài đặt

### 1. Tải mã nguồn

Clone repository này về máy của bạn:
```sh
git clone <URL_CUA_REPOSITORY> location-api
cd location-api
```

### 2. Cài đặt Dependencies

Dự án này không có thư viện bên ngoài, nhưng cần chạy `composer install` để tạo file autoloader cho các class trong `src/`.

```sh
composer install
```

### 3. Cấp quyền

Đảm bảo rằng web server có quyền ghi vào thư mục `cache/` để tạo file cache từ dữ liệu JSON, giúp tăng tốc độ cho các lần truy vấn sau.

```sh
sudo chmod -R 775 cache
sudo chown -R www-data:www-data cache # Thay www-data bằng user của web server bạn đang dùng
```

### 4. Cấu hình Web Server

Điều quan trọng là bạn phải trỏ Document Root của web server vào thư mục `public/`. Điều này đảm bảo rằng chỉ các file trong `public/` mới có thể được truy cập trực tiếp từ trình duyệt, tăng cường bảo mật.

#### a. Cấu hình cho Apache

Nếu bạn dùng Apache, hãy tạo hoặc đảm bảo file `.htaccess` trong thư mục `public/` có nội dung sau để điều hướng tất cả các request đến `index.php`:

```apache
# public/.htaccess

RewriteEngine On

# Điều kiện: nếu request không phải là một file đã tồn tại
RewriteCond %{REQUEST_FILENAME} !-f
# Điều kiện: nếu request không phải là một thư mục đã tồn tại
RewriteCond %{REQUEST_FILENAME} !-d

# Chuyển hướng tất cả các request còn lại đến index.php
RewriteRule ^ index.php [L]
```

Đồng thời, bạn cần cho phép `AllowOverride All` trong file cấu hình virtual host của Apache để file `.htaccess` có hiệu lực.

#### b. Cấu hình cho Nginx

Nếu bạn dùng Nginx, hãy thêm đoạn `location` sau vào file cấu hình server block của bạn:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/project/location-api/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock; # Thay đổi cho phù hợp với phiên bản PHP của bạn
    }

    location ~ /\.ht {
        deny all;
    }
}
```

## Hướng dẫn sử dụng API

Sau khi cài đặt thành công, bạn có thể bắt đầu truy vấn các endpoint dưới đây. Mọi phản hồi đều ở định dạng JSON.

*   **Base URL:** `http://your-domain.com/api`

### 1. Lấy danh sách tất cả Tỉnh/Thành phố

*   **Endpoint:** `GET /provinces`
*   **Mô tả:** Trả về một mảng chứa tất cả các tỉnh thành của Việt Nam.
*   **Ví dụ:** `GET http://your-domain.com/api/provinces`

### 2. Lấy thông tin chi tiết một Tỉnh/Thành phố

*   **Endpoint:** `GET /provinces/{province_code}`
*   **Mô tả:** Trả về thông tin chi tiết của một tỉnh dựa vào mã code.
*   **Ví dụ:** `GET http://your-domain.com/api/provinces/01` (Lấy thông tin Hà Nội)

### 3. Lấy danh sách Quận/Huyện của một Tỉnh/Thành phố

*   **Endpoint:** `GET /provinces/{province_code}/districts`
*   **Mô tả:** Trả về danh sách các quận/huyện thuộc một tỉnh.
*   **Ví dụ:** `GET http://your-domain.com/api/provinces/79/districts` (Lấy các quận/huyện của TP.HCM)

### 4. Lấy danh sách Phường/Xã của một Quận/Huyện

*   **Endpoint:** `GET /wards?province_code={p_code}&district_code={d_code}`
*   **Mô tả:** Trả về danh sách các phường/xã thuộc một quận/huyện. Cần cung cấp cả mã tỉnh và mã huyện.
*   **Ví dụ:** `GET http://your-domain.com/api/wards?province_code=79&district_code=770` (Lấy các phường của Quận 11, TP.HCM)

### 5. Tìm kiếm địa danh

*   **Endpoint:** `GET /search?q={query}[&type=...][&limit=...]`
*   **Mô tả:** Tìm kiếm địa danh theo tên. Hỗ trợ lọc theo loại và giới hạn số lượng kết quả.
*   **Tham số:**
    *   `q` (bắt buộc): Từ khóa tìm kiếm.
    *   `type` (tùy chọn): Loại đơn vị hành chính. Các giá trị hợp lệ: `province`, `district`, `ward`.
    *   `limit` (tùy chọn): Số lượng kết quả tối đa. Mặc định là 20, tối đa 100.
*   **Ví dụ:**
    *   `GET http://your-domain.com/api/search?q=Ba Đình`
    *   `GET http://your-domain.com/api/search?q=Thảo Điền&type=ward`

### 6. Trang trợ giúp

*   **Endpoint:** `GET /help`
*   **Mô tả:** Hiển thị một trang HTML thân thiện, liệt kê tất cả các endpoint và cách sử dụng.
*   **Ví dụ:** `GET http://your-domain.com/help`
