# Bộ sưu tập Micro-Tools

## Giới thiệu chung

Đây là kho mã nguồn cá nhân, tập hợp một loạt các ứng dụng web, công cụ, và script nhỏ (micro-tools) được phát triển cho nhiều mục đích khác nhau. Dự án này như một danh mục đầu tư (portfolio), một thư viện các đoạn mã hữu ích, và là một sân chơi để thử nghiệm các công nghệ đa dạng từ frontend đến backend.

Các công nghệ được sử dụng trong bộ sưu tập này bao gồm:
- **Frontend**: HTML, CSS, JavaScript (thuần và jQuery), Bootstrap.
- **Backend**: Node.js (với Fastify), PHP (thuần), Python (với Flask, script).
- **Lưu trữ dữ liệu**: Chủ yếu sử dụng các file JSON làm cơ sở dữ liệu gọn nhẹ, không yêu cầu hệ quản trị CSDL phức tạp.

## Mục đích

1.  **Portfolio**: Trưng bày các kỹ năng và dự án đã thực hiện.
2.  **Thư viện mã**: Lưu trữ các giải pháp và đoạn mã có thể tái sử dụng cho các dự án trong tương lai.
3.  **Thử nghiệm**: Một môi trường để học hỏi và thử nghiệm các công nghệ, thư viện và API mới.

## Hướng dẫn Cài đặt chung

Do tính chất đa dạng của các dự án, cách cài đặt sẽ khác nhau:

-   **Dự án Frontend (HTML, CSS, JS)**: Hầu hết các công cụ trong đây là ứng dụng web tĩnh. Bạn chỉ cần tải về và mở file `index.html` trực tiếp trên trình duyệt. Để có trải nghiệm tốt nhất và tránh các lỗi liên quan đến chính sách bảo mật của trình duyệt (CORS), bạn nên chạy chúng thông qua một máy chủ web cục bộ (ví dụ: extension **Live Server** trong VS Code, hoặc `python -m http.server`).
-   **Dự án Backend (PHP, Node.js, Python)**: Các dự án này yêu cầu một môi trường máy chủ tương ứng.
    -   **PHP**: Cần một web server như Apache hoặc Nginx với PHP đã được cài đặt.
    -   **Node.js**: Cần cài đặt Node.js và chạy `npm install` để tải các gói phụ thuộc.
    -   **Python**: Cần cài đặt Python và các thư viện được liệt kê trong file `requirements.txt` hoặc trong hướng dẫn của từng dự án (ví dụ: `pip install -r requirements.txt`).

Chi tiết cài đặt cho từng dự án sẽ được mô tả cụ thể bên dưới.

---

## Tổng quan các Công cụ

Dưới đây là danh sách và mô tả chi tiết cho từng công cụ trong bộ sưu tập.

### 📂 `abc-delta-blogger` & `danguidio-blogger` & `vtrick-theme-blogger`
- **Mô tả**: Các dự án chứa chủ đề (theme) cho nền tảng Blogger, được tùy chỉnh từ các theme gốc như VTrick Premium.
- **Công nghệ**: XML (Blogger Theme).
- **Cách sử dụng**: Đăng nhập vào Blogger, đi đến mục "Chủ đề" -> "Khôi phục" và tải lên file `.xml` có trong thư mục `source/` của từng dự án. Luôn nhớ sao lưu theme hiện tại của bạn trước khi cài đặt theme mới.

### 📂 `chamthi`
- **Mô tả**: Một công cụ web thông minh giúp chấm bài thi trắc nghiệm từ các định dạng văn bản không đồng nhất. Công cụ sử dụng bộ phân tích (parser) để tự động nhận dạng câu trả lời và so sánh với đáp án chuẩn, sau đó xuất ra báo cáo chi tiết.
- **Công nghệ**: HTML, CSS, JavaScript.
- **Cách sử dụng**: Mở file `index.html`. Dán đáp án chuẩn vào ô 1 và lưu lại. Sau đó, dán bài làm của thí sinh vào ô 2 và nhấn "Chấm điểm" để xem kết quả.

### 📂 `coming-soon`
- **Mô tả**: Một mẫu trang "Sắp ra mắt" (Coming Soon) hiện đại, có đồng hồ đếm ngược, form đăng ký nhận thông báo và liên kết mạng xã hội.
- **Công nghệ**: HTML, CSS, Bootstrap, JavaScript.
- **Cách sử dụng**: Mở `index.html` để xem trang. Để tùy chỉnh, hãy chỉnh sửa nội dung trong `index.html` và cấu hình ngày ra mắt trong file `js/main.js`.

### 📂 `cp-gdkhq`
- **Mô tả**: Một trang web đơn giản để tính toán giá tham chiếu của cổ phiếu vào ngày giao dịch không hưởng quyền (GDKHQ) sau khi chia cổ tức hoặc phát hành thêm.
- **Công nghệ**: HTML, JavaScript.
- **Cách sử dụng**: Mở `index.html`, nhập giá đóng cửa và các thông số về cổ tức/quyền mua, sau đó nhấn nút tính toán.

### 📂 `location-api`
- **Mô tả**: Một API RESTful đơn giản được xây dựng bằng PHP thuần để truy vấn thông tin các đơn vị hành chính của Việt Nam (Tỉnh/Thành, Quận/Huyện, Phường/Xã) từ một file JSON.
- **Công nghệ**: PHP, Composer.
- **Cách sử dụng**: Yêu cầu môi trường PHP và web server. Cần chạy `composer install` và trỏ document root vào thư mục `public/`. Chi tiết các endpoint có trong `location-api/README.md`.

### 📂 `nafi6-quiz`
- **Mô tả**: Một ứng dụng web trắc nghiệm về đấu thầu, với khả năng quản lý (thêm/sửa/xóa) câu hỏi thông qua một trang quản trị đơn giản.
- **Công nghệ**: HTML, CSS, JavaScript, PHP, Python (cho script chuyển đổi).
- **Cách sử dụng**: Yêu cầu môi trường web server có PHP. Dữ liệu câu hỏi gốc được chuyển đổi từ file `.docx` bằng script `convert_word_to_js.py`. Người dùng có thể làm bài thi trên `index.html` và quản lý câu hỏi trên `manage.html`.

### 📂 `pdfTools`
- **Mô tả**: Bộ công cụ xử lý PDF hoạt động hoàn toàn trên trình duyệt. Cho phép gộp nhiều file PDF thành một và tách một file PDF thành nhiều file nhỏ hơn. Đảm bảo riêng tư vì không có file nào được tải lên máy chủ.
- **Công nghệ**: HTML, CSS, JavaScript, `pdf-lib.js`, `JSZip`.
- **Cách sử dụng**: Mở `index.html` và chọn chức năng "Gộp PDF" hoặc "Tách PDF".

### 📂 `power-reduction-schedule`
- **Mô tả**: Công cụ tra cứu lịch ngừng, giảm cung cấp điện của Tổng công ty Điện lực Miền Nam (EVNSPC). Cho phép tra cứu theo mã khách hàng hoặc theo khu vực (Tỉnh/Huyện).
- **Công nghệ**: HTML, Bootstrap, JavaScript, jQuery.
- **Cách sử dụng**: Mở `index.html`, chọn phương thức tra cứu và nhập thông tin cần thiết.

### 📂 `ptkt`
- **Mô tả**: Một bảng điều khiển (dashboard) cho phép xem nhiều biểu đồ phân tích kỹ thuật cùng lúc trên một màn hình dạng lưới. Người dùng có thể tùy chỉnh số hàng và cột của lưới.
- **Công nghệ**: HTML, CSS, JavaScript.
- **Cách sử dụng**: Mở `index.html`, nhập số hàng và cột mong muốn rồi nhấn "Cập nhật".

### 📂 `qr_maps` & `qrcode-generator` & `VietQR_Generator`
- **Mô tả**: Một bộ ba công cụ tạo mã QR:
    - `qr_maps`: Tạo mã QR cho một vị trí địa lý để mở trên Google Maps, Apple Maps...
    - `qrcode-generator`: Tạo mã QR đa năng cho nhiều loại dữ liệu (URL, vCard, WiFi, Email...).
    - `VietQR_Generator`: Tạo mã QR thanh toán theo chuẩn VietQR (Napas247) cho các ngân hàng Việt Nam.
- **Công nghệ**: HTML, CSS, JavaScript.
- **Cách sử dụng**: Mở file `index.html` trong từng thư mục và làm theo hướng dẫn trên giao diện.

### 📂 `site-proxy`
- **Mô tả**: Một dự án máy chủ Node.js đơn giản sử dụng framework Fastify và Handlebars. Hoạt động như một proxy hoặc một web server cơ bản.
- **Công nghệ**: Node.js, Fastify, Handlebars.
- **Cách sử dụng**: Chạy `npm install` để cài đặt các gói phụ thuộc, sau đó chạy `node server.js` để khởi động máy chủ.

### 📂 `stock-merge` & `stock-valuation`
- **Mô tả**: Các công cụ hỗ trợ phân tích chứng khoán:
    - `stock-valuation`: Công cụ phân tích và định giá cổ phiếu chuyên sâu cho thị trường Việt Nam, tự động lấy dữ liệu tài chính và tính toán giá trị thực dựa trên nhiều mô hình.
    - `stock-merge`: Một script thử nghiệm để gộp dữ liệu chứng khoán.
- **Công nghệ**: HTML, CSS, JavaScript.
- **Cách sử dụng**: Mở file `index.html` (của `stock-valuation`) và nhập mã cổ phiếu cần phân tích.

### 📂 `subjav-downloader-python`
- **Mô tả**: Một script Python để tự động tìm kiếm và tải hàng loạt phụ đề tiếng Việt cho JAV từ trang `subtitlecat.com`.
- **Công nghệ**: Python, `requests`, `beautifulsoup4`.
- **Cách sử dụng**: Cài đặt các thư viện cần thiết (`pip install requests beautifulsoup4`), chuẩn bị 2 file `name.txt` và `sublink.txt` theo hướng dẫn, sau đó chạy `python subtitlecat.py`.

### 📂 `technical-indicator`
- **Mô tả**: Bộ sưu tập các chỉ báo kỹ thuật nâng cao (All-in-One, MCDX, Oscillator Dashboard) được viết bằng Pine Script để sử dụng trên nền tảng TradingView.
- **Công nghệ**: Pine Script.
- **Cách sử dụng**: Sao chép mã nguồn từ các file `.txt` và dán vào Pine Editor trên TradingView, sau đó thêm vào biểu đồ.

### 📂 `tools-collection`
- **Mô tả**: Một cổng thông tin (portal) tập hợp nhiều công cụ tiện ích, hỗ trợ đa ngôn ngữ (Anh/Việt) thông qua các file JSON.
- **Công nghệ**: JavaScript, JSON.
- **Cách sử dụng**: Yêu cầu Node.js. Chạy `npm install` rồi `npm start` để khởi động máy chủ cục bộ.

### 📂 `transfer-money`
- **Mô tả**: Một trang web tĩnh hiển thị thông tin chuyển khoản cá nhân (ngân hàng, ví điện tử) một cách thanh lịch. Toàn bộ thông tin được cấu hình qua file `payment-data.json`.
- **Công nghệ**: HTML, CSS, JavaScript, JSON.
- **Cách sử dụng**: Chỉnh sửa file `payment-data.json` với thông tin của bạn, sau đó mở `index.html` trên trình duyệt (thông qua một máy chủ cục bộ).

### 📂 `trondethi` & `trondethi_v2`
- **Mô tả**: Hai phiên bản của một công cụ Python giúp trộn đề thi trắc nghiệm từ file Word (`.docx`). Công cụ tự động trộn câu hỏi, đáp án và xuất ra nhiều mã đề khác nhau. Phiên bản 2 sử dụng các file mẫu để giữ nguyên định dạng.
- **Công nghệ**: Python, `python-docx`.
- **Cách sử dụng**: Cài đặt thư viện `python-docx`, chuẩn bị các file Word đầu vào theo đúng định dạng yêu cầu, sau đó chạy script `python trondethi.py`.

### 📂 `url-shortener-json-v1` & `url-shortener-json-v2`
- **Mô tả**: Hai phiên bản của một trình rút gọn link gọn nhẹ sử dụng PHP và file JSON.
    - **v1**: Chức năng rút gọn link cơ bản.
    - **v2**: Nâng cấp lớn với trang quản lý (thêm/sửa/xóa link) được bảo vệ bằng mật khẩu.
- **Công nghệ**: PHP, JSON, HTML, CSS, JavaScript.
- **Cách sử dụng**: Yêu cầu môi trường hosting có PHP và Apache. Cần cấp quyền ghi cho file `links.json`. Ở v2, cần cấu hình mật khẩu admin trong `config.php`.