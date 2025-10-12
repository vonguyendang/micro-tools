# Trình tạo mã QR đa năng

Đây là một công cụ web mạnh mẽ cho phép bạn tạo mã QR cho nhiều loại dữ liệu khác nhau. Bạn có thể tùy chỉnh mã QR bằng cách thêm logo và tải xuống ở nhiều định dạng khác nhau.

## Tính năng chính

Công cụ hỗ trợ tạo mã QR cho 8 loại nội dung phổ biến:

1.  **Website:** Tạo mã QR từ một địa chỉ URL. Khi quét, người dùng sẽ được chuyển hướng đến trang web đó.
2.  **VCard (Danh thiếp điện tử):** Tạo mã QR chứa thông tin liên hệ chi tiết, bao gồm:
    *   Họ và tên
    *   Thông tin cá nhân (số điện thoại, email)
    *   Thông tin công ty (tên công ty, chức danh, website, SĐT, fax)
    *   Địa chỉ công ty (đường, thành phố, tiểu bang, quốc gia, mã bưu chính)
    Khi quét, người dùng có thể lưu trực tiếp danh bạ vào điện thoại.
3.  **Text:** Chuyển đổi một đoạn văn bản bất kỳ thành mã QR.
4.  **Email:** Soạn sẵn một email với địa chỉ người nhận, tiêu đề và nội dung. Người dùng quét mã sẽ mở ứng dụng email với các thông tin đã được điền sẵn.
5.  **Facebook:** Tạo mã QR dẫn đến một trang Facebook cá nhân, fanpage, hoặc nhóm.
6.  **Wifi:** Chia sẻ thông tin đăng nhập mạng Wi-Fi. Người dùng chỉ cần quét mã để kết nối mà không cần nhập mật khẩu.
    *   Hỗ trợ các loại mã hóa: WPA/WPA2, WEP, và không mã hóa.
7.  **Phone:** Tạo mã QR chứa một số điện thoại. Khi quét, thiết bị sẽ đề xuất thực hiện cuộc gọi đến số đó.
8.  **SMS:** Soạn sẵn một tin nhắn SMS với số điện thoại người nhận và nội dung tin nhắn.

### Tùy chỉnh

*   **Thêm Logo:** Bạn có thể tải lên một hình ảnh (logo) để chèn vào giữa mã QR, giúp tăng nhận diện thương hiệu.

### Định dạng tải về

*   **PNG:** Tải về mã QR dưới dạng ảnh chất lượng cao, phù hợp để in ấn và chia sẻ.
*   **SVG:** Tải về dưới dạng đồ họa vector, có thể phóng to thu nhỏ mà không bị vỡ nét.
*   **HTML:** Tải về một file HTML chứa mã nhúng `<img>` với hình ảnh QR được mã hóa base64, tiện lợi để chèn vào website.

## Hướng dẫn sử dụng

1.  **Mở trang web:** Truy cập file `index.html` để bắt đầu.
2.  **Chọn loại QR:** Nhấn vào các tab ở đầu trang (Website, VCard, Text, v.v.) để chọn loại mã QR bạn muốn tạo.
3.  **Nhập thông tin:** Điền đầy đủ các thông tin được yêu cầu trong biểu mẫu tương ứng.
4.  **(Tùy chọn) Thêm logo:**
    *   Nhấn vào nút "Choose File" (Chọn tệp) trong phần "Add logo".
    *   Chọn file ảnh từ máy tính của bạn. Logo sẽ được hiển thị xem trước.
    *   Để xóa logo, nhấn nút "Delete logo".
5.  **Tạo mã QR:** Nhấn nút **"Generate QR Code"**. Mã QR của bạn sẽ ngay lập tức xuất hiện ở phía dưới.
6.  **Tải về:**
    *   Sau khi mã được tạo, các nút tải về sẽ xuất hiện.
    *   Chọn định dạng bạn muốn: **Download PNG**, **Download SVG**, hoặc **Download HTML**.

## Chi tiết kỹ thuật

*   Công cụ này được xây dựng bằng HTML, CSS và JavaScript thuần.
*   Thư viện [qrcodejs](https://github.com/davidshimjs/qrcodejs) được sử dụng để tạo mã QR cơ bản.
*   Thẻ `<canvas>` của HTML5 được dùng để vẽ lại mã QR với kích thước lớn hơn, thêm phần đệm trắng và chèn logo vào trung tâm.
