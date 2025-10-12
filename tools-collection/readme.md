# Tools Collection - Bộ sưu tập các công cụ tiện ích

## Giới thiệu

Đây là một dự án web tĩnh hoạt động như một cổng thông tin, tập hợp nhiều công cụ và tiện ích nhỏ. Ứng dụng được xây dựng bằng JavaScript thuần (vanilla JavaScript) và được thiết kế để chạy mà không cần một backend phức tạp.

Một trong những tính năng chính của dự án là hỗ trợ đa ngôn ngữ (internationalization - i18n), với các bản dịch được quản lý trong các file JSON, cho phép dễ dàng chuyển đổi giữa tiếng Anh và tiếng Việt.

## Cấu trúc thư mục

```
tools-collection/
│
├─── public/                  # Thư mục gốc chứa ứng dụng chính.
│    └─── index.html           # Trang chính của bộ sưu tập công cụ.
│
├─── locales/                 # Chứa các file ngôn ngữ.
│    ├─── en.json              # File dịch tiếng Anh.
│    └─── vi.json              # File dịch tiếng Việt.
│
├─── index.html               # Một trang chuyển hướng tạm thời đến /public/index.html.
│
├─── package.json             # File định nghĩa dự án, các script và gói phụ thuộc.
│
├─── .gitignore               # Các file và thư mục được Git bỏ qua.
│
└─── readme.txt               # File hướng dẫn này.
```

## Yêu cầu

*   [Node.js](https://nodejs.org/) và npm (Node Package Manager).

Node.js là cần thiết để chạy gói `serve`, giúp tạo một máy chủ web cục bộ để phát triển và thử nghiệm.

## Hướng dẫn cài đặt

1.  **Tải mã nguồn:**
    *   Clone repository này về máy của bạn.
    ```sh
    git clone <URL_CUA_REPOSITORY> tools-collection
    ```
    *   Di chuyển vào thư mục vừa tạo:
    ```sh
    cd tools-collection
    ```

2.  **Cài đặt các gói phụ thuộc:**
    *   Dự án này sử dụng `serve` để tạo một máy chủ phát triển. Chạy lệnh sau để cài đặt:
    ```sh
    npm install
    ```

## Hướng dẫn sử dụng

### 1. Chạy ứng dụng

Cách tốt nhất để chạy dự án này là sử dụng script đã được định nghĩa sẵn trong `package.json`.

*   Trong thư mục gốc của dự án, chạy lệnh:
    ```sh
    npm start
    ```
*   Lệnh này sẽ khởi động một máy chủ web cục bộ. Mở trình duyệt của bạn và truy cập vào địa chỉ mà terminal hiển thị (thường là `http://localhost:3000`).
*   Bạn sẽ được tự động chuyển hướng đến trang ứng dụng chính.

Việc chạy bằng máy chủ cục bộ là cần thiết để trình duyệt có thể tải các file ngôn ngữ từ thư mục `locales/` mà không gặp lỗi bảo mật CORS.

### 2. Sử dụng các công cụ

*   Sau khi truy cập trang web, bạn sẽ thấy giao diện chính liệt kê các công cụ có sẵn.
*   **Chuyển đổi ngôn ngữ:** Tìm nút chuyển đổi ngôn ngữ (thường có biểu tượng cờ hoặc chữ `EN`/`VI`) để thay đổi giao diện giữa tiếng Anh và tiếng Việt.
*   Chọn một công cụ từ danh sách để bắt đầu sử dụng.

### 3. Triển khai (Deployment)

Vì đây là một dự án web tĩnh, việc triển khai rất đơn giản. Bạn chỉ cần tải nội dung của thư mục `public/` và thư mục `locales/` lên bất kỳ nhà cung cấp dịch vụ hosting tĩnh nào (ví dụ: Vercel, Netlify, GitHub Pages, Cloudflare Pages, v.v.).
