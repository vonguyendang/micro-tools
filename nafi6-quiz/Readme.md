Chào bạn,

Dưới đây là file `README.md` chi tiết hướng dẫn cài đặt và sử dụng dự án trắc nghiệm đấu thầu `nafi6-quiz`.

Dự án này là một ứng dụng web cơ bản sử dụng HTML, CSS, JavaScript ở phía client và PHP ở phía server để quản lý dữ liệu câu hỏi bổ sung.

````markdown
# 📚 Hướng dẫn Cài đặt & Sử dụng Dự án Trắc Nghiệm Đấu Thầu (nafi6-quiz)

Dự án này cung cấp một giao diện trắc nghiệm đơn giản, linh hoạt, với khả năng quản lý (thêm/sửa/xóa) các câu hỏi bổ sung thông qua một file JSON.

## ⚙️ Yêu cầu Hệ thống

Để dự án hoạt động đầy đủ (bao gồm chức năng quản lý câu hỏi), bạn cần có môi trường **Web Server** hỗ trợ:
* **PHP** (Phiên bản 7.x trở lên).
* **Module `docx` của Python** (cần cho công cụ chuyển đổi file Word).

Ví dụ về môi trường phát triển cục bộ: **XAMPP, WAMP, MAMP, Laragon**.

## 🚀 Cài đặt Dự án

### 1. Chuẩn bị Thư mục

1.  Tải toàn bộ thư mục dự án `nafi6-quiz/` (chứa các file `.html`, `.js`, `.css`, `.php`, `.py`) lên thư mục gốc của Web Server của bạn (ví dụ: thư mục `htdocs` trong XAMPP).
2.  Đảm bảo file **`NganHangCauHoi.docx`** nằm trong cùng thư mục.
3.  Đảm bảo file **`add-quiz.json`** tồn tại trong thư mục, nếu không có, hãy tạo một file rỗng với nội dung là `[]`.

### 2. Khởi tạo Dữ liệu Câu hỏi

Dữ liệu câu hỏi gốc được lấy từ file `NganHangCauHoi.docx` và chuyển đổi thành file `data.js`.

**Bước 2.1: Cài đặt thư viện Python**

Bạn cần thư viện `python-docx` để đọc file Word.
```bash
pip install python-docx
````

**Bước 2.2: Chạy script chuyển đổi**

Sử dụng file `convert_word_to_js.py` để trích xuất câu hỏi và đáp án đúng (dựa trên định dạng **in đậm** trong file Word) và ghi vào `data.js`.

```bash
python nafi6-quiz/convert_word_to_js.py
```

*(Nếu bạn đang chạy trong thư mục `nafi6-quiz`, chỉ cần dùng `python convert_word_to_js.py`)*

### 3\. Cấu hình Web Server

Đảm bảo Web Server (ví dụ: Apache) đã được khởi động.

## 💻 Hướng dẫn Sử dụng

### 1\. Thực hiện Bài kiểm tra (`index.html`)

Truy cập địa chỉ trong trình duyệt: `http://localhost/[ten_thu_muc_du_an]/index.html`

  * **Thời gian:** Mặc định là **40 phút**. Bạn có thể đặt lại thời gian tùy chỉnh bằng nút **"Đặt thời gian"**.
  * **Bắt đầu:** Nhấn nút **"Bắt đầu Tính giờ"** để kích hoạt đếm ngược.
  * **Nộp bài:** Nhấn nút **"Nộp bài"** để xem kết quả và đáp án chi tiết.
  * **Dữ liệu câu hỏi:** Bài kiểm tra sử dụng 70 câu hỏi được chọn ngẫu nhiên từ tổng hợp các câu hỏi gốc (`data.js`) và câu hỏi thêm mới (`add-quiz.json`).

### 2\. Quản lý Câu hỏi (`manage.html`)

Chức năng này cho phép bạn **thêm**, **sửa**, **xóa** các câu hỏi bổ sung và lưu chúng vào file `add-quiz.json`.

**Bước 2.1: Truy cập và Đăng nhập**

Truy cập địa chỉ: `http://localhost/[ten_thu_muc_du_an]/manage.html`

  * Hệ thống sẽ yêu cầu **Mật khẩu Quản trị**.
  * **Mật khẩu mặc định:** `Bimat@123`

**Bước 2.2: Thêm Câu hỏi Mới**

1.  Sử dụng form **"Thêm Câu Hỏi Mới"** ở đầu trang.
2.  Nhập nội dung câu hỏi, 4 đáp án (A, B, C, D) và chọn đáp án đúng.
3.  Nhấn nút **"Lưu Câu Hỏi"**.
4.  Dữ liệu sẽ được ghi vào file `add-quiz.json`. Các câu hỏi mới này sẽ có ID tiếp theo ID cuối cùng của ngân hàng câu hỏi gốc.

**Bước 2.3: Tìm kiếm, Sửa và Xóa**

  * **Tìm kiếm:** Nhập **ID** hoặc **từ khóa** vào ô tìm kiếm để lọc danh sách câu hỏi.
  * **Sửa:** Nhấn nút **"Sửa"** bên cạnh câu hỏi muốn chỉnh sửa (chỉ áp dụng cho câu hỏi trong `add-quiz.json`). Form thêm mới sẽ chuyển sang chế độ chỉnh sửa, điền sẵn thông tin của câu hỏi được chọn.
  * **Xóa:** Nhấn nút **"Xóa"** bên cạnh câu hỏi và xác nhận.

## ⚠️ Lưu ý Quan trọng

1.  **Tính bảo mật:** Mật khẩu quản trị (`Bimat@123` trong `manage.html`) được lưu trữ ở phía client (JavaScript). Trong môi trường thực tế, không nên sử dụng phương pháp này.
2.  **Lưu trữ Dữ liệu:** File `save-quiz-data.php` ghi đè toàn bộ dữ liệu vào `add-quiz.json`. Đảm bảo thư mục dự án có **quyền ghi** (`write permission`) để PHP có thể sửa đổi file này.
3.  **Định dạng Word:** Công cụ chuyển đổi (`convert_word_to_js.py`) phụ thuộc vào cấu trúc 3 cột của bảng và việc định dạng đáp án đúng bằng **chữ in đậm** (`run.bold == True`) trong file Word. Nếu định dạng file Word thay đổi, việc trích xuất có thể bị sai lệch.

<!-- end list -->

```
```