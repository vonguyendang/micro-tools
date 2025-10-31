# PTKT Dashboard - Bảng điều khiển Phân Tích Kỹ Thuật

**PTKT** là viết tắt của "Phân Tích Kỹ Thuật". Đây là một công cụ web đơn giản được thiết kế cho các nhà giao dịch (trader) hoặc những người quan tâm đến phân tích kỹ thuật tài chính. Công cụ này cho phép người dùng xem nhiều biểu đồ phân tích kỹ thuật cùng một lúc trên một màn hình duy nhất, được sắp xếp theo dạng lưới.

## Tính năng chính

*   **Hiển thị đa màn hình:** Tạo một lưới các cửa sổ biểu đồ, giúp theo dõi đồng thời nhiều khung thời gian hoặc nhiều chỉ báo khác nhau.
*   **Tùy chỉnh bố cục:** Người dùng có thể tự do điều chỉnh số lượng hàng và cột của lưới, từ 1x1 lên đến tối đa 8x8 (tổng cộng 64 màn hình).
*   **Giao diện gọn gàng:** Bảng điều khiển có thể được ẩn đi để tối đa hóa không gian hiển thị cho các biểu đồ.
*   **Sử dụng đơn giản:** Chỉ cần nhập số hàng, số cột và nhấn "Cập nhật" để tạo bảng điều khiển.

## Hướng dẫn sử dụng

1.  **Mở ứng dụng:** Truy cập file `index.html` để bắt đầu.
2.  **Thiết lập bố cục:**
    *   Một bảng điều khiển nhỏ sẽ xuất hiện ở góc trên bên trái.
    *   Nhập số **Hàng** (Rows) và **Cột** (Columns) bạn mong muốn.
    *   Nhấn nút **"Cập nhật"** để áp dụng thay đổi. Lưới biểu đồ sẽ được tạo ngay lập tức.
3.  **Bố cục tối đa:**
    *   Để nhanh chóng hiển thị 64 biểu đồ, hãy nhấn nút **"Tối đa (8x8)"**.
4.  **Ẩn/Hiện bảng điều khiển:**
    *   Nhấn vào biểu tượng bánh răng (⚙️) ở góc trên bên trái để ẩn hoặc hiện bảng điều khiển, giúp bạn tập trung hoàn toàn vào các biểu đồ.

## Chi tiết kỹ thuật

*   Công cụ được xây dựng bằng HTML, CSS, và JavaScript thuần.
*   Sử dụng thuộc tính `display: grid` của CSS để tạo bố cục lưới linh hoạt.
*   Mỗi biểu đồ trong lưới là một thẻ `<iframe>` tải nội dung từ một URL phân tích kỹ thuật được xác định trước (`https://smoney.vodang2702.workers.dev/phan-tich-ky-thuat`).
