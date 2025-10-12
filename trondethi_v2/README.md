Chắc chắn rồi, đây là hướng dẫn sử dụng chi tiết cho phiên bản hoàn chỉnh của chương trình `trondethi.py`.

***
## **HƯỚNG DẪN SỬ DỤNG CHƯƠNG TRÌNH TRỘN ĐỀ THI TRẮC NGHIỆM**
**Phiên bản:** 2.0 (Bản hoàn thiện)
**Ngày cập nhật:** 26/09/2025

***
### **1. MỤC ĐÍCH**

Chương trình `trondethi.py` giúp tự động hóa việc tạo ra nhiều mã đề thi trắc nghiệm từ một file ngân hàng câu hỏi gốc. Các tính năng chính bao gồm:
* Trộn ngẫu nhiên thứ tự các câu hỏi.
* Trộn ngẫu nhiên thứ tự các lựa chọn (A, B, C, D) trong từng câu hỏi.
* Tự động nhận diện đáp án đúng dựa vào **chữ in đậm** trong ngân hàng đề.
* Sử dụng các file "khuôn mẫu" (template) để giữ lại 100% định dạng gốc của đề thi và phiếu đáp án.
* Tự động định dạng văn bản theo chuẩn: **Times New Roman, cỡ chữ 12, giãn dòng 1.5**.
* Tự động xử lý các định dạng phức tạp như in đậm, in nghiêng, và căn chỉnh bảng đáp án.

***
### **2. YÊU CẦU HỆ THỐNG**

* Máy tính đã cài đặt **Python 3.6** trở lên.
* Đã cài đặt thư viện `python-docx`.

Nếu chưa có thư viện, mở **Terminal** (hoặc **Command Prompt**) và gõ lệnh sau:
`pip install python-docx`

***
### **3. CHUẨN BỊ CÁC TỆP TIN (BƯỚC QUAN TRỌNG NHẤT)**

Bạn cần chuẩn bị **ĐÚNG 3 TỆP TIN WORD (.docx)** sau và đặt chúng vào **CÙNG MỘT THƯ MỤC** với tệp `trondethi.py`.

#### **a) Tệp 1: `NGAN_HANG_DE_GOC.docx`**
* **Chức năng:** Chứa toàn bộ câu hỏi gốc để chương trình lấy dữ liệu.
* **Yêu cầu bắt buộc:**
    1.  Mỗi câu hỏi phải bắt đầu bằng `Câu ` (ví dụ: `Câu 1.`, `Câu 2.`).
    2.  Với mỗi câu hỏi, phải có **MỘT VÀ CHỈ MỘT** lựa chọn đáp án đúng được **IN ĐẬM**.

#### **b) Tệp 2: `MAU_DE_THI.docx`**
* **Chức năng:** Là "khuôn mẫu" định dạng cho các file đề thi sẽ được tạo ra.
* **Cách tạo:**
    1.  Tạo một bản sao (copy) của file đề thi gốc hoàn chỉnh.
    2.  Đổi tên file bản sao thành `MAU_DE_THI.docx`.
    3.  **Xóa toàn bộ** phần nội dung câu hỏi và thay thế bằng một dòng duy nhất: `[[NOI_DUNG_DE]]`.
    4.  Tìm đến các vị trí có mã đề (ví dụ: "Đề gốc") và thay thế bằng `[ ĐỀ GỐC ]`.
        * **Lưu ý:** Chương trình **không thể** sửa chữ trong **Text Box**. Vui lòng chuyển `[ ĐỀ GỐC ]` thành văn bản thường (có thể tạo đường viền bằng tính năng **Borders**).

#### **c) Tệp 3: `MAU_DAP_AN.docx`**
* **Chức năng:** Là "khuôn mẫu" định dạng cho các file đáp án sẽ được tạo ra.
* **Cách tạo:**
    1.  Mở một file đáp án hoàn chỉnh có định dạng bạn mong muốn.
    2.  Lưu file đó với tên `MAU_DAP_AN.docx`.
    3.  **Xóa phần bảng lưới đáp án** và thay thế bằng một dòng duy nhất: `[[BANG_DAP_AN]]`.
    4.  Đảm bảo tiêu đề là "ĐÁP ÁN ĐỀ THI GỐC" để chương trình có thể tìm và thay thế.

***
### **4. CÁCH CHẠY CHƯƠNG TRÌNH**

1.  Mở **Terminal** (trên macOS/Linux) hoặc **Command Prompt** (trên Windows).
2.  Sử dụng lệnh `cd` để điều hướng đến thư mục bạn đã lưu 4 tệp tin trên.
    *Ví dụ:* `cd C:\Users\TenNguoiDung\Desktop\TronDeThi`
3.  Gõ lệnh sau và nhấn **Enter**:
    `python trondethi.py`
4.  Làm theo hướng dẫn hiển thị trên màn hình:
    * Nhập số lượng mã đề bạn muốn tạo.
    * Nhập số lượng câu hỏi cho mỗi đề.

***
### **5. KẾT QUẢ ĐẦU RA**

Sau khi chạy xong, chương trình sẽ tự động tạo ra các cặp tệp tin trong cùng thư mục, ví dụ:
* `DE SO 01.docx`
* `DAP AN DE SO 01.docx`
* `DE SO 02.docx`
* `DAP AN DE SO 02.docx`
* ...

***
### **6. XỬ LÝ LỖI THƯỜNG GẶP**

* **Lỗi: "Không tìm thấy tệp tin..."**
    * **Nguyên nhân:** Bạn đặt tên sai một trong 3 file Word hoặc đặt chúng không cùng thư mục với file `trondethi.py`.
    * **Giải pháp:** Kiểm tra lại chính tả tên file và đảm bảo tất cả các tệp đều nằm trong cùng một thư mục.

* **Lỗi: "Phân tích được 0 câu hỏi..."**
    * **Nguyên nhân:** File `NGAN_HANG_DE_GOC.docx` không có câu hỏi nào có đáp án được **in đậm**.
    * **Giải pháp:** Mở file ngân hàng đề và kiểm tra lại. Đảm bảo mỗi câu hỏi đều có một lựa chọn được in đậm.