# Chủ đề Blogger - Dang Guidio (dựa trên VTrick Premium)

## Giới thiệu

Đây là một dự án chứa chủ đề (theme) cho nền tảng Blogger (Blogspot), được tùy chỉnh dựa trên theme gốc **VTrick Premium v1.9** của tác giả Vietrick. VTrick là một chủ đề hiện đại, nhanh, đáp ứng (responsive) và có khả năng tùy biến cao, phù hợp cho các blog cá nhân, tin tức, hoặc tạp chí.

Phiên bản trong dự án này đã được tùy chỉnh và sao lưu cho blog `dangvo.io.vn`.

## Cấu trúc thư mục

```
danguidio-blogger/
│
├─── source/
│    └─── blog-12-22-2024.xml    # File chủ đề chính để cài đặt cho blog.
│
├─── backup/
│    └─── blog-12-22-2024.xml    # File sao lưu của chủ đề và nội dung.
│
├─── resources/                 # (Trống) Thư mục dành cho tài nguyên phát triển.
│
└─── README.md                  # File hướng dẫn này.
```

*   **File quan trọng nhất:** `source/blog-12-22-2024.xml`. Đây là file bạn sẽ sử dụng để cài đặt giao diện cho blog của mình.

## Hướng dẫn cài đặt

Việc cài đặt một chủ đề Blogger được thực hiện thông qua giao diện quản trị của Blogger. Hãy làm theo các bước sau một cách cẩn thận.

**CẢNH BÁO QUAN TRỌNG:** Trước khi cài đặt chủ đề mới, hãy luôn **SAO LƯU (BACKUP)** chủ đề hiện tại của bạn. Điều này cho phép bạn khôi phục lại giao diện cũ nếu có bất kỳ lỗi nào xảy ra.

1.  **Đăng nhập vào Blogger:** Truy cập [Blogger.com](https://www.blogger.com) và đăng nhập vào tài khoản của bạn.

2.  **Đi đến phần Chủ đề:**
    *   Từ menu bên trái, chọn **`Chủ đề`** (Theme).

3.  **Sao lưu chủ đề hiện tại:**
    *   Nhấn vào nút mũi tên xuống (▼) bên cạnh nút `TÙY CHỈNH` (CUSTOMIZE).
    *   Chọn **`Sao lưu`** (Backup).
    *   Nhấn **`Tải xuống`** (Download) và lưu file `.xml` của chủ đề hiện tại vào một nơi an toàn.

4.  **Cài đặt chủ đề mới:**
    *   Sau khi đã sao lưu, nhấn lại vào nút mũi tên xuống (▼).
    *   Chọn **`Khôi phục`** (Restore).
    *   Một cửa sổ sẽ hiện ra. Nhấn vào nút **`TẢI LÊN`** (UPLOAD).
    *   Tìm và chọn file **`source/blog-12-22-2024.xml`** từ thư mục dự án này trên máy tính của bạn.

5.  **Hoàn tất:** Blogger sẽ tự động cài đặt và áp dụng chủ đề mới. Giao diện blog của bạn sẽ được thay đổi.

## Hướng dẫn sử dụng và tùy chỉnh

Sau khi cài đặt, bạn có thể tùy chỉnh chủ đề thông qua các công cụ có sẵn của Blogger.

### 1. Tùy chỉnh giao diện (Màu sắc, Font chữ)

Đây là cách dễ nhất để thay đổi giao diện mà không cần đụng đến code.

*   Đi đến **`Chủ đề`** (Theme) -> **`TÙY CHỈNH`** (CUSTOMIZE).
*   Một trình tùy biến sẽ mở ra. Tại đây, bạn có thể thay đổi:
    *   Màu sắc chính (Main Color)
    *   Font chữ cho các thành phần khác nhau.
    *   Chiều rộng của trang, sidebar.
    *   Bật/tắt các tính năng như Dark Mode, Fixed Menu, Auto Table of Contents...

### 2. Chỉnh sửa bố cục (Thêm/xóa Widgets)

Bạn có thể thêm, xóa hoặc sắp xếp lại các tiện ích (gadgets/widgets) như bài đăng phổ biến, danh sách nhãn, hộp tìm kiếm...

*   Từ menu bên trái, chọn **`Bố cục`** (Layout).
*   Tại đây bạn sẽ thấy các khu vực của blog (Header, Sidebar, Footer...).
*   Nhấn vào **`Thêm tiện ích`** (Add a Gadget) để thêm tiện ích mới hoặc nhấn vào biểu tượng bút chì để chỉnh sửa các tiện ích hiện có.
*   **Để chỉnh sửa Menu chính:** Tìm tiện ích `LinkList` (Danh sách liên kết) trong khu vực menu và chỉnh sửa các liên kết trong đó.

### 3. Chỉnh sửa HTML nâng cao (Dành cho người dùng có kinh nghiệm)

Nếu bạn muốn can thiệp sâu hơn vào cấu trúc của chủ đề, bạn có thể chỉnh sửa trực tiếp mã nguồn XML.

*   **Cảnh báo:** Chỉ thực hiện việc này nếu bạn hiểu về HTML, CSS và cấu trúc theme của Blogger. Luôn sao lưu chủ đề trước khi thực hiện bất kỳ thay đổi nào.
*   Đi đến **`Chủ đề`** (Theme) -> Nút mũi tên xuống (▼) -> **`Chỉnh sửa HTML`** (Edit HTML).
*   Toàn bộ mã nguồn của file `.xml` sẽ hiện ra, cho phép bạn chỉnh sửa mọi thứ.
