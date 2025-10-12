# Công cụ Phân tích và Định giá Cổ phiếu (Stock Valuation & Analysis)

Đây là một công cụ đa chức năng được xây dựng bằng HTML, CSS và JavaScript, nhằm hỗ trợ các nhà đầu tư trên thị trường chứng khoán Việt Nam. Công cụ hoạt động hoàn toàn trên trình duyệt (client-side), đảm bảo quyền riêng tư và không lưu trữ bất kỳ dữ liệu nào của người dùng.

## Các tính năng chính

Công cụ cung cấp nhiều tab với các chức năng chuyên biệt:

1.  **Định giá Cổ phiếu**:
    -   Tự động lấy dữ liệu tài chính (hàng quý và hàng năm), thông tin cơ bản và giá giao dịch từ các API của Fireant và SSI.
    -   Tính toán các chỉ số tài chính quan trọng như `EPS`, `P/E`, `P/B`, `P/S`, `ROA`, `ROE` trung bình theo nhiều khoảng thời gian (Quý gần nhất, 4 Quý, 1 Năm, 5 Năm).
    -   Ước tính giá trị thực của cổ phiếu dựa trên mô hình định giá trung bình trọng số từ nhiều phương pháp:
        -   `P/E * EPS`
        -   `P/S * Doanh thu/CP`
        -   `P/B * Giá trị sổ sách/CP`
        -   3 biến thể của công thức định giá **Graham**.
    -   Cung cấp một hệ thống "chấm điểm" (tối đa 10 sao) để đánh giá sức khỏe và mức độ hấp dẫn của cổ phiếu.

2.  **Tính giá ngày GDKHQ**:
    -   Tính toán giá tham chiếu điều chỉnh của cổ phiếu vào ngày giao dịch không hưởng quyền khi có các sự kiện như: chia cổ tức bằng tiền mặt, chia cổ tức bằng cổ phiếu, và phát hành thêm quyền mua.

3.  **Hỗ trợ Nhà đầu tư**:
    -   **Tính Lãi/Lỗ**: Giúp nhà đầu tư tính toán lợi nhuận thực tế từ các giao dịch mua/bán.
    -   **Giá vốn trung bình**: Tự động tính giá vốn trung bình sau nhiều lần mua.
    -   **Danh mục đầu tư**: Theo dõi và tổng hợp hiệu suất của danh mục.
    -   **Lợi nhuận mục tiêu**: Ước tính số phiên tăng trần/giảm sàn để đạt được giá mục tiêu.

4.  **Thông tin thị trường**:
    -   Cung cấp danh sách các công ty sắp và mới niêm yết, lịch sự kiện sắp tới.

## Hướng dẫn sử dụng

Chỉ cần mở file `index.html` trong trình duyệt web để bắt đầu.

### Để định giá một cổ phiếu:

1.  Chọn tab **"ĐỊNH GIÁ CỔ PHIẾU"**.
2.  Nhập mã cổ phiếu bạn quan tâm (ví dụ: `HPG`, `FPT`, `VCB`) vào ô "Mã cổ phiếu".
3.  Nhấn nút **"Tính toán Định giá"**.
4.  Chờ trong giây lát để công cụ tổng hợp và phân tích dữ liệu.
5.  Kết quả sẽ được hiển thị chi tiết, bao gồm thông tin giá, các chỉ số phân tích, các mức giá định giá theo từng phương pháp và khuyến nghị tổng quan.
6.  Bạn có thể nhấn vào các tab giai đoạn (`4 Quý`, `1 Năm`, `3 Năm`...) để xem kết quả phân tích theo các khoảng thời gian khác nhau.

### Đối với các tính năng khác:

-   **Tính giá GDKHQ**: Chuyển sang tab **"GIÁ NGÀY GDKHQ"**, nhập giá đóng cửa gần nhất (hoặc mã CK để tự động lấy giá) và các thông số về quyền, cổ tức, sau đó nhấn nút tính toán.
-   **Hỗ trợ NĐT**: Chuyển sang tab **"HỖ TRỢ NĐT"** và sử dụng các công cụ con tương ứng.

## Nguồn dữ liệu

Công cụ sử dụng các API công khai và đáng tin cậy:

-   **Fireant API**: Cung cấp dữ liệu tài chính, báo cáo quý/năm, thông tin hồ sơ doanh nghiệp.
-   **SSI iBoard API**: Cung cấp dữ liệu giao dịch real-time (giá khớp lệnh, khối lượng, giá trần/sàn...).
-   **Investing.com / WorldGovernmentBonds.com**: Cung cấp dữ liệu lợi suất trái phiếu chính phủ, được dùng làm lãi suất phi rủi ro trong mô hình định giá.

## Miễn trừ trách nhiệm

Các thông tin, phân tích và định giá được cung cấp bởi công cụ này chỉ mang tính chất **tham khảo và giáo dục**. Đây **không phải là một khuyến nghị đầu tư**. Người dùng phải tự chịu hoàn toàn trách nhiệm cho mọi quyết định đầu tư của mình.
