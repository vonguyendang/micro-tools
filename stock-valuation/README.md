# Công cụ Phân tích và Định giá Cổ phiếu (Stock Valuation & Analysis)

Đây là một công cụ đa chức năng được xây dựng bằng HTML, CSS và JavaScript, nhằm hỗ trợ các nhà đầu tư trên thị trường chứng khoán Việt Nam. Công cụ hoạt động hoàn toàn trên trình duyệt (client-side), đảm bảo quyền riêng tư và không lưu trữ bất kỳ dữ liệu nào của người dùng trên máy chủ.

## Các tính năng chính

Công cụ cung cấp nhiều tab với các chức năng chuyên biệt:

1.  **Định giá Cổ phiếu**:
    -   Tự động lấy dữ liệu tài chính (hàng quý và hàng năm), thông tin cơ bản và giá giao dịch từ các API của Fireant và SSI.
    -   Tính toán các chỉ số tài chính quan trọng như `EPS`, `P/E`, `P/B`, `P/S`, `ROA`, `ROE` trung bình theo nhiều khoảng thời gian.
    -   Ước tính giá trị thực của cổ phiếu dựa trên mô hình định giá trung bình trọng số từ nhiều phương pháp khác nhau.
    -   Cung cấp một hệ thống "chấm điểm" (tối đa 10 sao) để đánh giá sức khỏe và mức độ hấp dẫn của cổ phiếu.

2.  **Tính giá ngày GDKHQ**:
    -   Tính toán giá tham chiếu điều chỉnh của cổ phiếu vào ngày giao dịch không hưởng quyền.

3.  **Hỗ trợ Nhà đầu tư**:
    -   **Tính Lãi/Lỗ**: Giúp nhà đầu tư tính toán nhanh lợi nhuận từ các giao dịch.
    -   **Giá vốn trung bình**: Tự động tính giá vốn trung bình sau nhiều lần mua.
    -   **Theo dõi Danh mục (MỚI)**:
        -   Cho phép tạo và quản lý nhiều danh mục đầu tư.
        -   Bảo mật từng danh mục bằng mật khẩu riêng.
        -   Có mật khẩu admin (`Bimat@123`) để quản lý tất cả các danh mục.
        -   Tự động cập nhật giá thị trường và tính toán lãi/lỗ tạm tính.
        -   Dữ liệu được lưu trữ an toàn trên `localStorage` của trình duyệt.
    -   **Lợi nhuận mục tiêu**: Ước tính số phiên tăng trần để đạt được giá mục tiêu.

4.  **Thông tin thị trường**:
    -   Cung cấp danh sách các công ty sắp và mới niêm yết, lịch sự kiện sắp tới.

## Hướng dẫn sử dụng

Chỉ cần mở file `index.html` trong trình duyệt web để bắt đầu.

### Để sử dụng tính năng Theo dõi Danh mục:

1.  Chọn tab **"HỖ TRỢ NĐT"**.
2.  Chọn tab con **"Danh Mục Đầu Tư"**.
3.  **Tạo danh mục mới**:
    -   Nhấn nút "Tạo Danh mục mới".
    -   Đặt tên và mật khẩu cho danh mục của bạn rồi nhấn "Tạo mới".
4.  **Đăng nhập**:
    -   Nhập mật khẩu của danh mục bạn muốn xem và nhấn "Đăng nhập".
    -   Để quản lý tất cả danh mục, nhập mật khẩu admin: `Bimat@123`.
5.  **Quản lý**:
    -   Sau khi đăng nhập, bạn có thể thêm, sửa, xóa cổ phiếu.
    -   Nhấn nút "Cập nhật giá" để xem lãi/lỗ tạm tính mới nhất.

## Nguồn dữ liệu

Công cụ sử dụng các API công khai và đáng tin cậy:

-   **Fireant API**: Cung cấp dữ liệu tài chính, báo cáo quý/năm, thông tin hồ sơ doanh nghiệp.
-   **SSI iBoard API**: Cung cấp dữ liệu giao dịch real-time.
-   **Investing.com / WorldGovernmentBonds.com**: Cung cấp dữ liệu lợi suất trái phiếu chính phủ.

## Miễn trừ trách nhiệm

Các thông tin, phân tích và định giá được cung cấp bởi công cụ này chỉ mang tính chất **tham khảo và giáo dục**. Đây **không phải là một khuyến nghị đầu tư**. Người dùng phải tự chịu hoàn toàn trách nhiệm cho mọi quyết định đầu tư của mình.