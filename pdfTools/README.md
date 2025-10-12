# PDF Tools - Công cụ xử lý PDF phía Client

## Giới thiệu

**PDF Tools** là một bộ công cụ web đơn giản, mạnh mẽ cho phép bạn thực hiện các thao tác cơ bản trên file PDF như gộp và tách file. Điểm đặc biệt của công cụ này là mọi quá trình xử lý đều được thực hiện trực tiếp trên trình duyệt của bạn (phía client).

**Sự riêng tư của bạn được đảm bảo tuyệt đối vì không có bất kỳ file nào được tải lên máy chủ.**

### Các tính năng chính

1.  **Gộp PDF (Merge PDF):** Gộp nhiều file PDF thành một file duy nhất. Bạn có thể sắp xếp lại thứ tự các file trước khi gộp.
2.  **Tách PDF (Split PDF):** Tách một file PDF thành nhiều file nhỏ hơn dựa trên các trang hoặc khoảng trang bạn chỉ định (ví dụ: `1-3`, `5`, `8-10`).
3.  **Xem trước (Preview):** Xem trước kết quả của file đã gộp hoặc các file đã tách trước khi quyết định tải về.
4.  **Tải về dưới dạng ZIP:** Khi tách PDF thành nhiều file, công cụ hỗ trợ tải về tất cả các file đó trong một file nén `.zip` duy nhất.

### Công nghệ sử dụng

*   **Giao diện:** HTML, CSS, JavaScript.
*   **Xử lý PDF:** [pdf-lib.js](https://pdf-lib.js.org/) - một thư viện mạnh mẽ để tạo và sửa đổi tài liệu PDF bằng JavaScript.
*   **Xem trước PDF:** [PDF.js](https://mozilla.github.io/pdf.js/) - một thư viện của Mozilla để hiển thị file PDF trên web.
*   **Nén file:** [JSZip](https://stuk.github.io/jszip/) - một thư viện để tạo và đọc file `.zip` bằng JavaScript.

## Cấu trúc thư mục

```
pdfTools/
│
├─── index.html             # File HTML chính chứa giao diện người dùng.
├─── styles.css             # File CSS để tạo kiểu cho giao diện.
├─── script.js              # File JavaScript chứa toàn bộ logic của ứng dụng.
└─── script_obfuscator.js   # (Công cụ phát triển) File này không được sử dụng trong ứng dụng, có thể dùng để làm rối mã nguồn của script.js.
```

## Hướng dẫn cài đặt

Đây là một ứng dụng web tĩnh và không yêu cầu cài đặt phức tạp.

### Cách 1: Mở trực tiếp (Đơn giản nhất)

Chỉ cần tải về toàn bộ thư mục và mở file `index.html` bằng trình duyệt web của bạn (Chrome, Firefox, Edge, v.v.).

### Cách 2: Chạy bằng máy chủ web cục bộ (Khuyến khích)

Một số trình duyệt có thể có chính sách bảo mật chặt chẽ đối với việc chạy các tập lệnh từ file cục bộ. Để đảm bảo mọi chức năng hoạt động ổn định, bạn nên chạy ứng dụng thông qua một máy chủ web cục bộ.

Nếu bạn đã cài đặt Python, hãy mở terminal hoặc command prompt trong thư mục `pdfTools` và chạy lệnh sau:

```sh
# Dành cho Python 3
python -m http.server
```

Sau đó, truy cập vào địa chỉ `http://localhost:8000` trên trình duyệt của bạn.

## Hướng dẫn sử dụng

### 1. Gộp nhiều file PDF

1.  Mở ứng dụng và chọn tab **"Gộp PDF"**.
2.  Kéo và thả các file PDF của bạn vào khu vực tải lên, hoặc nhấn vào đó để chọn file từ máy tính.
3.  Các file đã chọn sẽ xuất hiện trong danh sách. Bạn có thể sử dụng các biểu tượng mũi tên (⬆️, ⬇️) để **sắp xếp lại thứ tự** hoặc biểu tượng dấu X (❌) để xóa một file.
4.  (Tùy chọn) Nhập tên cho file PDF kết quả vào ô "Tên file kết quả". Nếu để trống, tên mặc định sẽ là `merged.pdf`.
5.  Nhấn nút **`Gộp PDF`** để xử lý và tải file về, hoặc nhấn **`Xem trước`** để xem kết quả trong một cửa sổ pop-up trước khi tải.

### 2. Tách một file PDF

1.  Chuyển sang tab **"Tách PDF"**.
2.  Chọn một file PDF duy nhất để tách.
3.  Trong ô **"Trang cần tách"**, nhập các trang bạn muốn lấy ra. Cú pháp rất linh hoạt:
    *   Để lấy các trang riêng lẻ, dùng dấu phẩy: `1, 3, 5` (sẽ tạo 3 file PDF).
    *   Để lấy một khoảng trang, dùng dấu gạch ngang: `2-5` (sẽ tạo 1 file PDF chứa các trang từ 2 đến 5).
    *   Bạn có thể kết hợp cả hai: `1, 3-5, 8` (sẽ tạo 3 file: file1 chứa trang 1, file2 chứa trang 3-5, file3 chứa trang 8).
4.  Nhấn nút **`Tách PDF`** để xử lý và tải về.
    *   Nếu kết quả chỉ có một file, nó sẽ được tải về trực tiếp.
    *   Nếu kết quả có nhiều file, chúng sẽ được nén lại thành một file `.zip` duy nhất.
5.  Nhấn **`Xem trước`** để kiểm tra các file kết quả trước khi tải. Trong cửa sổ xem trước, bạn có thể chuyển qua lại giữa các file đã được tách bằng các tab ở trên cùng.
