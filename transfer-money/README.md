# Trang Thông Tin Chuyển Khoản Cá Nhân

Đây là một dự án web tĩnh (static web page) đơn giản, được thiết kế để tạo ra một trang thông tin thanh toán/chuyển khoản cá nhân một cách nhanh chóng và thanh lịch. Trang web tổng hợp nhiều phương thức thanh toán như ngân hàng, ví điện tử vào một nơi duy nhất, giúp người khác dễ dàng chuyển tiền cho bạn.

Dự án được xây dựng hoàn toàn bằng HTML, CSS và JavaScript, không yêu cầu backend hay cơ sở dữ liệu. Mọi thông tin hiển thị đều được cấu hình thông qua một file JSON duy nhất (`payment-data.json`), giúp việc tùy chỉnh trở nên cực kỳ đơn giản.

![Hình ảnh demo dự án](https://i.imgur.com/example.png)
*(Lưu ý: Bạn nên thay thế link ảnh này bằng ảnh chụp màn hình thực tế của trang web sau khi đã tùy chỉnh)*

## ✨ Tính năng nổi bật

- **Data-Driven**: Toàn bộ nội dung (thông tin ngân hàng, ví, link...) được quản lý trong file `payment-data.json`.
- **Đa ngôn ngữ**: Dễ dàng thêm hoặc chỉnh sửa ngôn ngữ hiển thị.
- **Sao chép nhanh**: Nút "Sao chép" tiện lợi cho số tài khoản, số điện thoại.
- **Hiển thị mã QR**: Hỗ trợ popup hiển thị mã QR VietQR để chuyển khoản nhanh.
- **Deep Link**: Nút "Mở ứng dụng" để mở trực tiếp ứng dụng ngân hàng/ví điện tử trên di động.
- **Tùy biến cao**: Dễ dàng thêm/bớt/sửa các phương thức thanh toán.
- **Thiết kế đáp ứng (Responsive)**: Hiển thị tốt trên cả máy tính và thiết bị di động.
- **Không cần Backend**: Hoạt động hoàn toàn phía client, có thể host trên bất kỳ dịch vụ hosting trang web tĩnh nào (GitHub Pages, Netlify, Vercel, etc.).

## 📂 Cấu trúc thư mục

```
transfer-money/
├── index.html            # File HTML chính, cấu trúc của trang web
├── style.css             # File CSS, chứa toàn bộ style cho giao diện
├── script.js             # File JavaScript xử lý logic, đọc JSON và hiển thị dữ liệu
├── payment-data.json     # File dữ liệu chứa toàn bộ thông tin thanh toán của bạn
├── payment-sample.json   # File mẫu cấu trúc dữ liệu để bạn tham khảo
├── images/               # Thư mục chứa logo, icon, ảnh QR...
│   ├── logo-momo.png
│   └── ...
└── README.md             # File hướng dẫn này
```

## 🚀 Hướng dẫn cài đặt

Dự án này không yêu cầu các bước cài đặt phức tạp. Tuy nhiên, để trình duyệt có thể tải file `payment-data.json` một cách chính xác (tránh lỗi CORS), bạn nên chạy dự án thông qua một máy chủ web cục bộ.

### Cách 1: Sử dụng Live Server trong Visual Studio Code

Đây là cách đơn giản nhất.
1. Cài đặt extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) trong VS Code.
2. Mở thư mục dự án trong VS Code.
3. Nhấp chuột phải vào file `index.html` và chọn "Open with Live Server".

### Cách 2: Sử dụng Python

Nếu bạn có cài đặt Python, hãy mở Terminal (hoặc Command Prompt) trong thư mục dự án và chạy lệnh:

- **Python 3**: `python -m http.server`
- **Python 2**: `python -m SimpleHTTPServer`

Sau đó, truy cập vào `http://localhost:8000` trên trình duyệt.

### Cách 3: Sử dụng Node.js

Nếu bạn có Node.js, bạn có thể cài đặt một gói server đơn giản:
1. Cài đặt `serve`: `npm install -g serve`
2. Trong thư mục dự án, chạy lệnh: `serve`
3. Truy cập vào địa chỉ mà terminal cung cấp (thường là `http://localhost:3000`).

## ⚙️ Hướng dẫn sử dụng và tùy chỉnh

Mọi tùy chỉnh của trang web đều được thực hiện trong file `payment-data.json`.

**Bước đầu tiên:** Sao chép nội dung từ `payment-sample.json` và dán vào `payment-data.json` để bắt đầu.

### Cấu trúc file `payment-data.json`

File này bao gồm các phần chính:

1.  **`languages`, `defaultLang`, `translations`**: Quản lý đa ngôn ngữ.
    - `languages`: Định nghĩa các ngôn ngữ có sẵn để hiển thị trên nút chuyển đổi.
    - `defaultLang`: Ngôn ngữ mặc định khi người dùng truy cập lần đầu.
    - `translations`: Chứa các "key" dịch thuật cho từng ngôn ngữ. Bạn cần tìm và thay thế các placeholder như `[Your Name]` bằng tên của bạn.

2.  **`paymentCategories`**: Một mảng chứa các danh mục thanh toán (Ngân hàng, Ví điện tử...).
    - Mỗi danh mục có `id`, `titleKey` (key dịch cho tiêu đề), `iconClass` (icon từ Font Awesome), và một mảng `methods`.
    - Mỗi `method` (phương thức) trong `methods` là một tài khoản cụ thể (VCB, MoMo...). Các thuộc tính quan trọng:
        - `name`: Tên ngân hàng/ví (e.g., "Ngân hàng TMCP Ngoại Thương Việt Nam").
        - `logo`: Đường dẫn đến file logo trong thư mục `images/`.
        - `themeColor`: (Tùy chọn) Màu nền đặc trưng cho phương thức đó.
        - `details`: Mảng chứa các thông tin chi tiết như chủ tài khoản, số tài khoản.
            - `labelKey`: Key dịch cho nhãn (e.g., "Số tài khoản").
            - `value`: Giá trị thực tế (e.g., "0123456789").
            - `isCopyable`: Đặt là `true` nếu bạn muốn có nút sao chép bên cạnh thông tin này.
        - `qrCodeUrl`: **Quan trọng**, đường dẫn đến ảnh mã QR của bạn (có thể tạo qua các dịch vụ VietQR).
        - `appLink`: **Quan trọng**, deep link để mở ứng dụng tương ứng. Bạn cần tìm deep link cho ngân hàng/ví của mình.

3.  **`contactInfo`**: Thông tin liên hệ của bạn.
    - `phoneZalo`: Số điện thoại/Zalo.
    - `email`: Địa chỉ email.

4.  **`socialLinks`**: Các liên kết mạng xã hội.
    - Thêm các cặp `key: "url"` (e.g., `facebook: "https://fb.com/your-profile"`). Icon sẽ được tự động hiển thị nếu `key` được hỗ trợ (xem trong `script.js`, hàm `renderSocialLinks`).

5.  **`donationLinks`**: Các liên kết ủng hộ/donate.
    - Cấu hình tương tự các mục khác, có thể là link trực tiếp hoặc link ảnh QR.

6.  **`contactFormRecipient`**: Địa chỉ email sẽ nhận thư khi người dùng điền vào form liên hệ ở cuối trang.

### Các bước tùy chỉnh

1.  **Sao chép `payment-sample.json`**: Copy toàn bộ nội dung của `payment-sample.json` và dán vào `payment-data.json`.
2.  **Cập nhật thông tin cá nhân**: Mở `payment-data.json` và thay thế tất cả các giá trị mẫu (như `[Số tài khoản VCB]`, `[Tên hoặc SĐT MoMo]`, `[Địa chỉ email của bạn]`, v.v.) bằng thông tin thật của bạn.
3.  **Thêm Logo và QR Code**:
    - Đặt các file logo ngân hàng, ví điện tử vào thư mục `images/`.
    - Tạo mã QR cho tài khoản ngân hàng của bạn (dùng dịch vụ VietQR) và lưu ảnh vào `images/`.
    - Cập nhật lại đường dẫn trong các thuộc tính `logo` và `qrCodeUrl` trong file JSON.
4.  **Cập nhật Deep Link**: Tìm và thay thế các giá trị `[Deep Link...]` bằng các deep link thật sự để tính năng "Mở ứng dụng" hoạt động.
5.  **Lưu file** và làm mới trang web trên trình duyệt để xem kết quả.
