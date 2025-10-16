Chắc chắn rồi\! Tôi đã cập nhật lại file `README.md` để bổ sung các thông tin bạn yêu cầu: thêm cách chạy server bằng PHP trên terminal, làm rõ lệnh `npm install`, và giải thích về file `.gitignore` cùng nội dung đề xuất cho nó.

Dưới đây là nội dung chi tiết cho file `README.md` đã được cập nhật.

-----

# Công cụ Phân tích và Hỗ trợ Đầu tư Chứng khoán (Stock Valuation & Investor Toolkit)

## 1\. Giới thiệu và Mục đích 🎯

Đây là một ứng dụng web đa chức năng, được xây dựng chủ yếu bằng **HTML, CSS, và JavaScript phía client**, với một phần backend nhỏ sử dụng PHP để lưu trữ dữ liệu người dùng (danh mục đầu tư, thông báo).

Mục đích của công cụ là cung cấp cho các nhà đầu tư cá nhân tại thị trường chứng khoán Việt Nam một bộ công cụ "tất cả trong một", giúp đơn giản hóa việc phân tích, định giá cổ phiếu, và quản lý danh mục. Ứng dụng thực hiện các lệnh gọi API đa luồng trực tiếp từ client để đạt tốc độ xử lý tối đa và đảm bảo dữ liệu luôn là mới nhất.

-----

## 2\. Tính năng chính 🚀

Ứng dụng được tổ chức theo các tab chức năng riêng biệt:

  * **Định giá Cổ phiếu**: Tự động tìm nạp dữ liệu tài chính và giá giao dịch để phân tích đa chỉ số (P/E, P/B, EPS, ROE...), định giá theo nhiều mô hình (Graham, P/E\*EPS...), và cung cấp hệ thống xếp hạng sao trực quan.
  * **Tính giá ngày GDKHQ**: Tự động tính toán giá tham chiếu điều chỉnh cho các sự kiện như chia cổ tức bằng tiền, cổ phiếu thưởng, hoặc phát hành thêm.
  * **Hỗ trợ Nhà đầu tư**:
      * **Tính Lãi/Lỗ & ROI**: Theo dõi lợi nhuận của các giao dịch riêng lẻ với khả năng cập nhật giá thị trường trực tiếp.
      * **Tính Giá vốn Trung bình**: Tự động tính giá vốn sau nhiều lần mua.
      * **Quản lý Danh mục Đầu tư**: Tạo và quản lý nhiều danh mục được bảo vệ bằng mật khẩu, theo dõi lãi/Lỗ tạm tính của toàn bộ danh mục.
      * **Ước tính Lợi nhuận Mục tiêu**: Tính toán số phiên tăng trần cần thiết để đạt giá bán kỳ vọng.
  * **Thông tin Thị trường & Quản lý**:
      * **Niêm yết mới & Lịch sự kiện**: Theo dõi các cổ phiếu sắp niêm yết và các sự kiện quan trọng.
      * **Phân tích Kỹ thuật (PTKT)**: Tích hợp biểu đồ PTKT từ bên ngoài.
      * **Trang Quản lý (Admin)**: Khu vực được bảo vệ bằng mật khẩu để quản lý thông báo chung và các công cụ quản trị khác.

-----

## 3\. Cấu trúc thư mục 📂

Dự án được chia làm hai phần chính: thư mục mã nguồn (`stock-valuation`) và thư mục phiên bản production được tạo tự động (`stock-valuation-obfuscate`).

```
/Project-Folder/
├── /stock-valuation/          # <<< THƯ MỤC MÃ NGUỒN (Nơi bạn làm việc)
│   ├── api/                   # Các file PHP để lưu/tải dữ liệu
│   ├── data/                  # Các file JSON (database đơn giản)
│   ├── js/                    # Chứa các file JavaScript gốc, dễ đọc
│   ├── style.css
│   ├── index.html
│   ├── build.js               # Kịch bản tự động hóa build
│   └── package.json           # Quản lý các công cụ build
│
└── /stock-valuation-obfuscate/  # <<< THƯ MỤC PRODUCTION (Tự động tạo ra)
    ├── api/
    ├── data/
    ├── favicon_io/
    ├── style.css
    ├── index.html             # Đã được chỉnh sửa để gọi file JS duy nhất
    └── app.min.js             # File JS đã được gộp và làm rối
```

-----

## 4\. Hướng dẫn Cài đặt & Sử dụng 🛠️

### Yêu cầu

1.  **Node.js và NPM**: Cần thiết để chạy các kịch bản tự động hóa. Tải về từ [https://nodejs.org/](https://nodejs.org/).
2.  **PHP**: Cần để chạy máy chủ phát triển và các file trong thư mục `api/`. Tải về từ [https://www.php.net/downloads](https://www.php.net/downloads) hoặc sử dụng các bộ cài như XAMPP.

### Cài đặt

1.  **Clone mã nguồn**: Tải về và giải nén mã nguồn của thư mục `stock-valuation`.
2.  **Mở Terminal**: Mở cửa sổ dòng lệnh (Terminal/Command Prompt) ngay tại thư mục `stock-valuation`.
3.  **Cài đặt công cụ**: Chạy lệnh sau. Lệnh này sẽ tự động đọc file `package.json` và cài đặt tất cả các gói cần thiết (như `concat`, `javascript-obfuscator`, `fs-extra`).
    ```bash
    npm install
    ```

### Chạy phiên bản Phát triển (Development)

Để chỉnh sửa code và xem thay đổi ngay lập tức, bạn cần chạy một máy chủ web cục bộ. Chọn **một** trong hai cách sau:

  * **Cách 1 (Đơn giản - Khuyến khích)**: Nếu bạn đã cài đặt PHP, mở Terminal tại thư mục `stock-valuation` và chạy lệnh:

    ```bash
    php -S localhost:8000
    ```

    Sau đó, truy cập vào `http://localhost:8000` trên trình duyệt.

  * **Cách 2 (Dùng XAMPP/WAMP)**:

    1.  Đặt thư mục `stock-valuation` vào thư mục gốc của máy chủ web (ví dụ: `htdocs` của XAMPP).
    2.  Truy cập vào `http://localhost/stock-valuation/` trong trình duyệt.

### Tạo phiên bản Production

Khi bạn đã hoàn tất việc chỉnh sửa và muốn tạo ra một phiên bản cuối cùng để triển khai:

1.  Mở Terminal tại thư mục `stock-valuation`.
2.  Chạy lệnh:
    ```bash
    npm run build
    ```
3.  Một thư mục mới tên là **`stock-valuation-obfuscate`** sẽ được tạo ra bên ngoài thư mục hiện tại. Đây chính là phiên bản bạn sẽ tải lên hosting.

-----

## 5\. Quy trình Build (Tự động hóa) ⚙️

Lệnh `npm run build` sẽ tự động thực hiện các công việc sau:

1.  **Dọn dẹp**: Xóa thư mục `stock-valuation-obfuscate` cũ (nếu có).
2.  **Tạo thư mục mới**: Tạo lại thư mục `stock-valuation-obfuscate`.
3.  **Sao chép tài sản**: Sao chép toàn bộ các file và thư mục cần thiết (`style.css`, `api/`, `data/`, `favicon_io/`) sang thư mục mới.
4.  **Gộp & Làm rối mã**:
      * Tự động gộp tất cả các file JavaScript trong `js/` lại thành một file duy nhất.
      * Sử dụng **JavaScript Obfuscator** để làm rối mã đã gộp, khiến cho việc đọc hiểu và sao chép logic trở nên rất khó khăn.
      * Lưu kết quả vào file `app.min.js` trong thư mục đích.
5.  **Cập nhật `index.html`**:
      * Sao chép file `index.html` gốc.
      * Tự động xóa tất cả các thẻ `<script>` cũ và thay thế bằng một thẻ duy nhất trỏ đến `app.min.js`.
      * Lưu file `index.html` đã được cập nhật vào thư mục đích.

-----

## 6\. Quản lý mã nguồn với Git (`.gitignore`)

### `.gitignore` là gì?

`.gitignore` là một file văn bản dùng để chỉ định cho **Git** (hệ thống quản lý phiên bản) những file hoặc thư mục nào cần được **bỏ qua** và không được theo dõi hoặc đưa vào repository (kho chứa mã nguồn).

### Tại sao cần dùng?

  * **Tránh đưa các file không cần thiết lên kho chứa**: Như thư mục `node_modules` (chứa hàng nghìn file thư viện có thể cài lại dễ dàng bằng `npm install`) hoặc thư mục build (`stock-valuation-obfuscate`) được tạo ra tự động.
  * **Giữ kho chứa sạch sẽ**: Chỉ lưu trữ mã nguồn gốc, giúp việc quản lý và làm việc nhóm dễ dàng hơn.
  * **Bảo mật**: Tránh vô tình đưa các file chứa thông tin nhạy cảm (như file cấu hình, mật khẩu...) lên kho chứa công khai.

### Nội dung `.gitignore` đề xuất

Bạn nên tạo một file tên là `.gitignore` trong thư mục gốc (`stock-valuation`) với nội dung sau:

```gitignore
# Thư mục chứa các gói thư viện của Node.js
/node_modules

# Thư mục build được tạo tự động
/../stock-valuation-obfuscate

# Các file log và file tạm của hệ điều hành
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Các file cấu hình của Editor/IDE
.vscode/
.idea/
```