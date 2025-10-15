# Công cụ Phân tích và Hỗ trợ Đầu tư Chứng khoán (Stock Valuation & Investor Toolkit)

## 1. Giới thiệu và Mục đích

Đây là một ứng dụng web đa chức năng, được xây dựng hoàn toàn bằng HTML, CSS và JavaScript phía client. Mục đích chính của công cụ là cung cấp cho các nhà đầu tư cá nhân tại thị trường chứng khoán Việt Nam một bộ công cụ toàn diện, tất cả trong một, giúp đơn giản hóa quá trình phân tích, định giá cổ phiếu và quản lý danh mục đầu tư.

Ứng dụng tổng hợp dữ liệu từ nhiều nguồn API công khai (Fireant, SSI, Investing.com) để cung cấp thông tin nhanh chóng, trực quan và hữu ích, từ đó hỗ trợ người dùng đưa ra các quyết định đầu tư sáng suốt hơn.

## 2. Tính năng chính

Ứng dụng được tổ chức theo các tab chức năng riêng biệt:

### a. Định giá Cổ phiếu
-   **Tự động lấy dữ liệu:** Chỉ cần nhập mã cổ phiếu, công cụ sẽ tự động tìm nạp dữ liệu tài chính, thông tin cơ bản và giá giao dịch hiện tại.
-   **Phân tích đa chỉ số:** Đánh giá cổ phiếu dựa trên các chỉ số tài chính quan trọng như EPS, P/E, P/B, P/S, ROA, ROE, Beta...
-   **Định giá đa mô hình:** Ước tính giá trị hợp lý của cổ phiếu bằng cách tổng hợp trọng số nhiều phương pháp định giá (P/E*EPS, P/B*BVPS, P/S*SPS, và các biến thể của mô hình Graham).
-   **Hệ thống xếp hạng (Star Rating):** Cung cấp một đánh giá tổng quan nhanh chóng về sức khỏe và tiềm năng của cổ phiếu qua thang điểm 10 sao.
-   **Phân tích theo nhiều kỳ:** Cho phép người dùng chọn các kỳ phân tích khác nhau (quý gần nhất, 4 quý, 1 năm, 5 năm) để có cái nhìn đa chiều.

### b. Tính giá ngày GDKHQ (Giao dịch không hưởng quyền)
-   Tự động tính toán giá tham chiếu điều chỉnh của cổ phiếu vào ngày giao dịch không hưởng quyền.
-   Hỗ trợ đầy đủ các loại sự kiện: Cổ tức bằng tiền mặt, cổ tức bằng cổ phiếu, và phát hành thêm cổ phiếu quyền mua.

### c. Hỗ trợ Nhà đầu tư
-   **Tính Lãi/Lỗ & ROI:** Theo dõi lợi nhuận của các giao dịch riêng lẻ, có khả năng cập nhật giá thị trường trực tiếp.
-   **Tính Giá vốn Trung bình:** Tự động tính giá vốn trung bình sau nhiều lần mua.
-   **Quản lý Danh mục Đầu tư:**
    -   Tạo và quản lý nhiều danh mục đầu tư.
    -   Bảo vệ danh mục bằng mật khẩu riêng.
    -   Theo dõi lãi/lỗ tạm tính của toàn bộ danh mục với giá được cập nhật trực tiếp.
-   **Ước tính Lợi nhuận Mục tiêu:** Tính toán số phiên tăng trần cần thiết để đạt được giá bán mục tiêu.

### d. Thông tin Thị trường & Quản lý
-   **Niêm yết mới & Lịch sự kiện:** Theo dõi các cổ phiếu sắp niêm yết và các sự kiện quan trọng của doanh nghiệp.
-   **Phân tích Kỹ thuật (PTKT):** Tích hợp biểu đồ phân tích kỹ thuật từ một nguồn bên ngoài.
-   **Trang Quản lý (Admin):** Khu vực được bảo vệ bằng mật khẩu để quản lý các thông báo chung trên toàn trang.

## 3. Cấu trúc thư mục

```
/stock-valuation/
├── index.html              # Tệp HTML chính, chứa cấu trúc giao diện người dùng.
├── style.css               # Tệp CSS chính cho toàn bộ ứng dụng.
├── script.js               # (Không còn dùng) Logic cũ, đã được tách ra các tệp bên dưới.
├── js/
│   ├── main.js             # Logic chính, quản lý tab và khởi tạo.
│   ├── tab-valuation.js    # Logic cho tab "Định giá Cổ phiếu".
│   ├── tab-gdkhq.js        # Logic cho tab "Giá ngày GDKHQ".
│   ├── tab-investor-support.js # Logic cho tab "Hỗ trợ NĐT".
│   ├── tab-listings.js     # Logic cho tab "Niêm yết mới".
│   ├── tab-events.js       # Logic cho tab "Lịch sự kiện".
│   ├── tab-admin.js        # Logic cho tab "Quản lý".
│   └── utils.js            # Các hàm tiện ích dùng chung.
├── favicon_io/             # Chứa các biểu tượng (favicon) cho trang web.
└── README.md               # Tệp hướng dẫn này.
```

## 4. Hướng dẫn cài đặt

Công cụ này không yêu cầu cài đặt phức tạp.

1.  **Tải mã nguồn:** Clone repository hoặc tải về dưới dạng tệp ZIP và giải nén.
2.  **Chạy ứng dụng:**
    -   **Cách 1 (Đơn giản):** Mở tệp `index.html` trực tiếp bằng trình duyệt.
    -   **Cách 2 (Khuyến khích):** Do ứng dụng cần gọi đến các API bên ngoài, một số trình duyệt có thể chặn các yêu cầu này khi mở tệp trực tiếp (do chính sách CORS). Để đảm bảo mọi tính năng hoạt động ổn định, bạn nên chạy ứng dụng thông qua một máy chủ web cục bộ.
        -   Nếu bạn đã cài đặt Python, hãy mở terminal hoặc command prompt trong thư mục dự án và chạy lệnh:
            ```bash
            # Đối với php:
            php -S localhost:8000
            ```
        -   Sau đó, truy cập vào `http://localhost:8000` trong trình duyệt của bạn.

## 5. Hướng dẫn sử dụng

### a. Điều hướng
-   Sử dụng các tab ở đầu trang để chuyển đổi giữa các chức năng chính.
-   Trong một số tab (như "Hỗ trợ NĐT"), có các tab phụ để truy cập các công cụ con.

### b. Định giá một Cổ phiếu
1.  Chọn tab **"ĐỊNH GIÁ CỔ PHIẾU"**.
2.  Nhập mã cổ phiếu bạn quan tâm vào ô **"Mã cổ phiếu"** (ví dụ: `FPT`).
3.  Nhấn nút **"Tính toán Định giá"**.
4.  Chờ trong giây lát để công cụ tải và phân tích dữ liệu.
5.  Kết quả sẽ hiển thị chi tiết bên dưới, bao gồm:
    -   Thông tin giá giao dịch hiện tại.
    -   Các liên kết nhanh đến các trang tài chính khác.
    -   Bảng đánh giá tổng quan với thang điểm sao.
    -   Phân tích chi tiết từng chỉ số.
    -   Ước tính giá trị hợp lý theo nhiều phương pháp.
6.  Bạn có thể nhấp vào các tab **"Quý gần nhất"**, **"4 Quý"**, **"1 Năm"**... để thay đổi kỳ phân tích và xem kết quả thay đổi tương ứng.

### c. Quản lý Danh mục
1.  Chọn tab **"HỖ TRỢ NĐT"**, sau đó chọn tab phụ **"Danh Mục Đầu Tư"**.
2.  **Để tạo danh mục mới:**
    -   Nhấn nút **"Tạo Danh mục mới"**.
    -   Nhập **Tên danh mục** và **Mật khẩu** rồi nhấn **"Tạo mới"**.
3.  **Để truy cập danh mục:**
    -   Nhập mật khẩu của danh mục vào ô **"Mật khẩu"** và nhấn **"Đăng nhập"**.
4.  **Trong giao diện quản lý:**
    -   Nhấn **"Thêm Cổ phiếu"** để thêm mã mới vào danh mục.
    -   Nhấn **"Cập nhật giá"** để làm mới giá thị trường và xem lãi/lỗ tạm tính.
    -   Sử dụng các nút "Sửa", "Xóa" trên mỗi dòng để quản lý từng cổ phiếu.
