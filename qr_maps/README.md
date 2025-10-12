# QR Maps - Tạo mã QR cho vị trí địa lý

Đây là một công cụ web đơn giản giúp bạn tạo mã QR cho một vị trí địa lý cụ thể. Người dùng có thể quét mã QR này bằng điện thoại thông minh để mở vị trí đó trực tiếp trên các ứng dụng bản đồ phổ biến như Google Maps, Apple Maps, hoặc OpenStreetMap.

## Tính năng chính

*   **Bản đồ tương tác:** Sử dụng bản đồ từ Leaflet.js, cho phép bạn kéo, thả, và zoom để xem chi tiết.
*   **Nhiều lớp bản đồ:** Hỗ trợ chuyển đổi giữa các loại bản đồ khác nhau:
    *   Bản đồ Tiêu chuẩn (OpenStreetMap)
    *   Bản đồ Vệ tinh (Esri World Imagery)
    *   Bản đồ Địa hình (OpenTopoMap)
    *   Bản đồ Tối giản (CartoDB)
*   **Tìm kiếm địa chỉ:** Dễ dàng tìm kiếm một địa chỉ cụ thể và ghim vị trí đó trên bản đồ.
*   **Ghim vị trí thủ công:** **Nhấn và giữ chuột (hoặc trên màn hình cảm ứng) trong 3 giây** tại một điểm bất kỳ trên bản đồ để ghim vị trí.
*   **Tạo nhiều loại mã QR:** Tự động tạo 4 loại mã QR cho vị trí đã chọn:
    1.  **Google Maps:** Mở vị trí trên Google Maps.
    2.  **Apple Maps:** Mở vị trí trên Apple Maps (dành cho thiết bị iOS).
    3.  **OpenStreetMap:** Mở vị trí trên trang web OpenStreetMap.
    4.  **Tọa độ:** Mã QR chứa kinh độ và vĩ độ ở dạng văn bản thô.
*   **Tải về và Mở:** Cho phép tải về mã QR dưới dạng file ảnh PNG hoặc mở trực tiếp liên kết bản đồ trong tab mới.

## Hướng dẫn sử dụng

1.  **Mở trang web:** Truy cập vào file `index.html`.
2.  **Chọn vị trí:**
    *   **Cách 1: Tìm kiếm:** Nhập địa chỉ bạn muốn tìm vào ô tìm kiếm và nhấn nút "Tìm kiếm". Bản đồ sẽ tự động di chuyển đến vị trí đó và đặt một điểm đánh dấu.
    *   **Cách 2: Ghim thủ công:** Di chuyển đến khu vực bạn muốn trên bản đồ. **Nhấn và giữ chuột (hoặc ngón tay trên màn hình cảm ứng) trong khoảng 3 giây** tại điểm bạn muốn chọn. Một điểm đánh dấu sẽ xuất hiện.
3.  **Tạo mã QR:**
    *   Sau khi điểm đánh dấu xuất hiện, nút **"Tạo mã QR"** sẽ hiện ra.
    *   Nhấn vào nút này.
    *   Nếu bạn muốn tạo lại mã QR cho vị trí vừa ghim, chỉ cần nhấn lại nút **"Tạo mã QR"**.
4.  **Sử dụng mã QR:**
    *   Bốn mã QR sẽ được hiển thị.
    *   **Tải về:** Nhấn nút "Tải về" bên dưới mỗi mã QR để lưu nó về máy dưới dạng file PNG.
    *   **Mở liên kết:** Nhấn nút "Mở" để xem trước vị trí trên dịch vụ bản đồ tương ứng.

## Cách hoạt động

Công cụ này được xây dựng bằng HTML, CSS và JavaScript.
*   **Bản đồ:** Sử dụng thư viện [Leaflet.js](https://leafletjs.com/) để hiển thị bản đồ và các lớp bản đồ từ OpenStreetMap, Esri, và Carto.
*   **Tìm kiếm địa chỉ:** Sử dụng API của [Nominatim (OpenStreetMap)](https://nominatim.org/) để chuyển đổi địa chỉ thành tọa độ địa lý.
*   **Tạo mã QR:** Sử dụng thư viện [QR Code Styling](https://github.com/kozakdenys/qr-code-styling) để tạo và tùy chỉnh mã QR.
