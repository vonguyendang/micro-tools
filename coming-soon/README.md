# Coming Soon Page Template

Đây là một mẫu trang "Sắp ra mắt" (Coming Soon) hiện đại, đáp ứng (responsive) và có thể tùy chỉnh. Mẫu này được xây dựng bằng HTML, CSS và JavaScript, sử dụng các framework phổ biến như Bootstrap và jQuery. Nó hoàn hảo để sử dụng làm trang giữ chỗ trong khi trang web chính của bạn đang được phát triển.

## Cấu trúc thư mục

Dưới đây là cấu trúc các tệp và thư mục trong dự án và mục đích của chúng:

```
coming-soon/
│
├─── index.html             # File HTML chính chứa toàn bộ nội dung trang.
│
├─── css/                   # Thư mục chứa các file stylesheet.
│    ├─── bootstrap.min.css   # Framework Bootstrap.
│    ├─── font-awesome.min.css# Biểu tượng Font Awesome.
│    └─── style.css           # File style tùy chỉnh chính của bạn.
│
├─── fonts/                 # Thư mục chứa các file font cho Font Awesome.
│
├─── images/                # Thư mục chứa tất cả các hình ảnh.
│    ├─── 01.jpg              # Hình nền chính.
│    ├─── logo-1.png          # Logo của trang.
│    └─── ...                 # Các hình ảnh khác.
│
└─── js/                    # Thư mục chứa các file JavaScript.
     ├─── jquery.min.js       # Thư viện jQuery.
     ├─── bootstrap.min.js    # JavaScript của Bootstrap.
     ├─── main.js             # File JavaScript tùy chỉnh chính.
     └─── ...                 # Các plugin JS khác.

```

## Hướng dẫn cài đặt

Đây là một dự án web tĩnh, không yêu cầu các bước cài đặt phức tạp.

1.  **Tải mã nguồn:** Tải về hoặc clone (sao chép) toàn bộ thư mục `coming-soon` về máy tính của bạn.
2.  **Hoàn tất:** Không cần thêm bước nào cả! Bạn có thể mở file `index.html` trực tiếp trên trình duyệt để xem trang.

## Hướng dẫn sử dụng và tùy chỉnh

Để chỉnh sửa mẫu này cho phù hợp với dự án của bạn, hãy làm theo các bước dưới đây.

### 1. Chỉnh sửa nội dung chính (trong `index.html`)

Mở file `index.html` bằng một trình soạn thảo văn bản hoặc code (như VS Code, Sublime Text, Notepad++).

*   **Tiêu đề trang:**
    *   Tìm và thay đổi nội dung trong thẻ `<title>`: `<title>Your Project Name - Coming Soon</title>`
*   **Logo:**
    *   Thay thế file `images/logo-1.png` bằng logo của bạn. Đảm bảo giữ nguyên tên file hoặc cập nhật đường dẫn trong `index.html`:
      ```html
      <a href="index.html"><img src="images/logo-1.png" alt="Your Logo"></a>
      ```
*   **Tiêu đề và mô tả:**
    *   Tìm đến phần `md-headline` và thay đổi nội dung của thẻ `<h1>` và `<p>`.
*   **Liên kết mạng xã hội:**
    *   Tìm đến phần `social-box-bot`. Thay thế dấu `#` trong các thẻ `<a>` bằng liên kết đến trang mạng xã hội của bạn:
      ```html
      <li><a href="https://facebook.com/yourprofile" ...><i class="fa fa-facebook"></i></a></li>
      <li><a href="https://twitter.com/yourprofile" ...><i class="fa fa-twitter"></i></a></li>
      ```
*   **Thông tin liên hệ:**
    *   Trong phần `contact-box`, cập nhật địa chỉ, email, và số điện thoại của bạn.

### 2. Cấu hình đồng hồ đếm ngược (trong `js/main.js`)

Đây là phần quan trọng nhất để trang "Coming Soon" hoạt động đúng.

1.  Mở file `js/main.js`.
2.  Tìm đến hàm `makeTimer()`.
3.  Thay đổi giá trị của biến `endTime` thành ngày ra mắt dự án của bạn. **Lưu ý:** Giữ nguyên định dạng `Tháng Ngày, Năm Giờ:Phút:Giây`.

    ```javascript
    // Ví dụ: Đặt ngày ra mắt là 1 tháng 1 năm 2025, lúc 12:00:00
    var endTime = new Date("01 January 2025 12:00:00 GMT+07:00");
    ```

### 3. Cấu hình Form

Trang này có 2 biểu mẫu: một form liên hệ và một form đăng ký nhận thông báo. Cả hai đều yêu cầu xử lý phía máy chủ (backend) để hoạt động.

*   Trong file `index.html`, tìm đến thẻ `<form>` (ví dụ: `<form id="contact_form">` và `<form id="sm-form">`).
*   Bạn cần thêm thuộc tính `action` để trỏ đến dịch vụ xử lý form của bạn (ví dụ: một file PHP, hoặc một dịch vụ của bên thứ ba như Mailchimp, Formspree).

    ```html
    <form id="sm-form" action="https://your-mail-service.com/subscribe" method="post">
        <!-- ... các trường input ... -->
    </form>
    ```

### 4. Thay đổi hình ảnh và giao diện

*   **Hình nền:** Để thay đổi hình nền chính, hãy thay thế file `images/01.jpg` bằng hình ảnh của bạn.
*   **Màu sắc và Font chữ:** Để tùy chỉnh màu sắc, font chữ, hoặc các thuộc tính giao diện khác, hãy chỉnh sửa file `css/style.css`.
