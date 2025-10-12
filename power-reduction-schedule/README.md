# Tra Cứu Lịch Cúp Điện Miền Nam

## Giới thiệu

Đây là một công cụ web được xây dựng để giúp người dùng dễ dàng tra cứu lịch ngừng, giảm cung cấp điện (lịch cúp điện) của Tổng công ty Điện lực Miền Nam (EVNSPC). Giao diện được thiết kế đơn giản và thân thiện, cho phép tra cứu thông tin một cách nhanh chóng và chính xác.

Ứng dụng này hoạt động hoàn toàn ở phía client (trình duyệt), lấy dữ liệu trực tiếp từ các API public của EVNSPC và các nguồn dữ liệu mở về địa danh hành chính Việt Nam. Toàn bộ quá trình là ẩn danh và không lưu trữ bất kỳ thông tin nào của người dùng.

### Các tính năng chính

*   **Tra cứu theo Mã Khách Hàng:** Cho phép người dùng nhập mã khách hàng (PE code) để kiểm tra lịch cúp điện cụ thể tại địa chỉ của mình.
*   **Tra cứu theo Đơn vị cấp điện:** Cho phép tra cứu lịch cúp điện trên diện rộng bằng cách chọn Tỉnh/Thành phố và Quận/Huyện.
*   **Lọc theo Phường/Xã:** Hỗ trợ lọc kết quả chi tiết hơn theo từng Phường/Xã.
*   **Giao diện đáp ứng (Responsive):** Hoạt động tốt trên cả máy tính và thiết bị di động.

### Công nghệ sử dụng

*   **Giao diện:** HTML, Bootstrap 5, Font Awesome.
*   **Logic:** JavaScript, jQuery để xử lý sự kiện và gọi API.
*   **Nguồn dữ liệu:**
    *   API của trang CSKH EVNSPC (thông qua một proxy để tránh lỗi CORS).
    *   API địa danh hành chính Việt Nam (open.oapi.vn) để tải danh sách quận/huyện, phường/xã.

## Cấu trúc thư mục

```
power-reduction-schedule/
│
├─── index.html                  # File HTML chính chứa giao diện người dùng.
├─── styles.css                  # File CSS để tạo kiểu cho giao diện.
├─── script.js                   # File JavaScript chứa toàn bộ logic của ứng dụng.
└─── script_upload_hosting.js    # (Công cụ phát triển) File này không được sử dụng trong ứng dụng, có thể là một script hỗ trợ việc tải lên hosting.
```

## Hướng dẫn cài đặt

Đây là một ứng dụng web tĩnh và không yêu cầu các bước cài đặt phức tạp ở phía máy chủ.

### Cách 1: Mở trực tiếp (Không khuyến khích)

Bạn có thể tải về toàn bộ thư mục và mở file `index.html` trực tiếp bằng trình duyệt. Tuy nhiên, cách này có thể không hoạt động do các chính sách bảo mật của trình duyệt liên quan đến việc gọi API từ file cục bộ.

### Cách 2: Chạy bằng máy chủ web cục bộ (Khuyến khích)

Để đảm bảo ứng dụng hoạt động ổn định, bạn nên chạy nó thông qua một máy chủ web cục bộ.

Nếu bạn đã cài đặt Python, hãy mở terminal (hoặc Command Prompt) trong thư mục `power-reduction-schedule` và chạy lệnh sau:

```sh
# Dành cho Python 3
python -m http.server
```

Sau đó, truy cập vào địa chỉ `http://localhost:8000` trên trình duyệt của bạn.

## Hướng dẫn sử dụng

Sau khi mở ứng dụng, bạn sẽ thấy hai tab chức năng chính:

### 1. Tra cứu theo Mã khách hàng

Cách này dùng để kiểm tra lịch cúp điện cho một hộ gia đình hoặc một địa chỉ cụ thể.

1.  Chọn tab **"Mã khách hàng"**.
2.  Nhập **Mã khách hàng** của bạn vào ô (ví dụ: `PB010203...`).
3.  Chọn khoảng thời gian **"Từ ngày"** và **"Đến ngày"** bạn muốn tra cứu. Mặc định, ứng dụng sẽ chọn từ ngày hôm nay đến 7 ngày sau.
4.  Nhấn nút **`Tra cứu`**.
5.  Chờ trong giây lát để ứng dụng tải dữ liệu. Kết quả sẽ hiển thị ngay bên dưới, thông báo rõ ràng nếu có lịch cúp điện hoặc không.

### 2. Tra cứu theo Đơn vị cấp điện

Cách này dùng để xem toàn bộ lịch cúp điện trong một khu vực rộng lớn.

1.  Chọn tab **"Đơn vị cấp điện"**.
2.  Trong mục **"Tỉnh/Thành phố"**, chọn công ty điện lực cấp tỉnh mà bạn quan tâm.
3.  Chờ một chút để danh sách **"Quận/Huyện"** được tải về, sau đó chọn một quận/huyện.
4.  (Tùy chọn) Bạn có thể chọn một **"Phường/Xã"** cụ thể để lọc kết quả chính xác hơn.
5.  Chọn khoảng thời gian **"Từ ngày"** và **"Đến ngày"**.
6.  Nhấn nút **`Tra cứu`**.
7.  Kết quả sẽ được hiển thị dưới dạng một bảng chi tiết, bao gồm thời gian, khu vực bị ảnh hưởng và lý do cúp điện.
