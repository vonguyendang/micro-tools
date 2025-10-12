# Công cụ hỗ trợ chấm thi trắc nghiệm thông minh

`Chấm thi` là một công cụ web được thiết kế để giải quyết vấn đề chấm bài thi trắc nghiệm từ các định dạng văn bản không đồng nhất. Trong nhiều trường hợp, bài làm của thí sinh được gửi dưới dạng văn bản tự do, copy-paste, khiến việc chấm thủ công trở nên tốn thời gian và dễ sai sót. Công cụ này sử dụng một bộ phân tích (parser) thông minh để tự động nhận dạng và chấm điểm một cách chính xác.

Ý tưởng và bộ yêu cầu ban đầu của công cụ này được phát triển với sự hỗ trợ của AI, như được ghi lại trong file `promt-gemini.txt`.

## Tính năng chính

*   **Bộ phân tích (Parser) thông minh:** Đây là trái tim của công cụ. Nó có khả năng đọc và hiểu nhiều định dạng bài làm khác nhau, ví dụ:
    *   `1C 2D 3A...`
    *   `1.C, 2.D, 3.A...`
    *   `Câu 1: C, Câu 2: D...`
    *   Văn bản được dán theo nhiều cột.
    *   Và nhiều biến thể khác có chứa số câu và đáp án (A, B, C, D).
*   **Chấm điểm tự động:** Tự động so sánh bài làm của thí sinh với đáp án chuẩn và tính điểm trên thang điểm 10.
*   **Báo cáo kết quả chi tiết:** Cung cấp một bản phân tích đầy đủ sau khi chấm, bao gồm:
    *   **Bài làm đã định dạng:** Hiển thị lại các câu trả lời của thí sinh theo một định dạng chuẩn, giúp dễ dàng kiểm tra.
    *   **Tổng kết điểm:** Ghi rõ số câu đúng và tổng điểm đạt được.
    *   **Danh sách câu sai:** Liệt kê các câu trả lời sai, đồng thời chỉ ra "thí sinh chọn gì" và "đáp án đúng là gì".
    *   **Danh sách câu bị bỏ lỡ:** Liệt kê các câu mà thí sinh không trả lời hoặc công cụ không nhận dạng được.
*   **Giao diện đơn giản:** Quy trình chấm bài chỉ gồm 3 bước rõ ràng, trực quan.

## Hướng dẫn sử dụng

1.  **Bước 1: Nhập đáp án chuẩn**
    *   Sao chép (copy) toàn bộ nội dung đáp án của đề thi.
    *   Dán (paste) vào ô **"1. Nhập đáp án chuẩn"**.
    *   Nhấn nút **"Lưu đáp án chuẩn"**. Hệ thống sẽ xử lý và thông báo khi lưu thành công. Nút "Chấm điểm" sẽ được kích hoạt.

2.  **Bước 2: Nhập bài làm của thí sinh**
    *   Sao chép nội dung bài làm của thí sinh.
    *   Dán vào ô **"2. Nhập bài làm của thí sinh"**.

3.  **Bước 3: Chấm điểm**
    *   Nhấn nút **"Chấm điểm"**.

4.  **Bước 4: Xem kết quả**
    *   Kéo xuống phần **"3. Kết quả chấm điểm"** để xem báo cáo chi tiết.
    *   Để bắt đầu một lượt chấm mới, bạn có thể nhấn **"Tạo mới đáp án"** hoặc **"Xóa bài làm"**.

## Chi tiết kỹ thuật

*   Công cụ được xây dựng hoàn toàn bằng HTML, CSS, và JavaScript, có thể chạy trên mọi trình duyệt web hiện đại mà không cần cài đặt.
*   Logic cốt lõi nằm ở hàm `parseAnswers` trong file `script.js`, sử dụng một biểu thức chính quy (Regular Expression) để bóc tách số câu và đáp án từ chuỗi văn bản đầu vào.
