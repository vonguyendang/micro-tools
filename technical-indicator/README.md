# Bộ sưu tập Chỉ báo Kỹ thuật cho TradingView

## Giới thiệu

Dự án này là một bộ sưu tập các chỉ báo kỹ thuật nâng cao, được viết bằng Pine Script dành cho nền tảng TradingView. Triết lý cốt lõi của dự án là giải quyết vấn đề "ô nhiễm chỉ báo" (indicator clutter) mà nhiều nhà giao dịch gặp phải. Thay vì phải thêm hàng chục chỉ báo riêng lẻ lên biểu đồ, bộ sưu tập này tích hợp các phương pháp phân tích đa chiều vào một vài công cụ "All-in-One" (AIO) mạnh mẽ, tạo ra một không gian làm việc sạch sẽ nhưng vẫn đảm bảo cung cấp đầy đủ thông tin.

Bộ công cụ này cung cấp một hệ thống phân tích toàn diện, bao gồm:

-   **Phân tích Xu hướng & Tín hiệu**: Kết hợp các chỉ báo kinh điển như MACD, RSI, SuperTrend, và các đường EMA để tạo ra tín hiệu Mua/Bán rõ ràng cho các khung thời gian khác nhau (ngắn, trung và dài hạn).
-   **Phân tích Cấu trúc Thị trường**: Tự động hóa việc vẽ các Kênh Hỗ trợ/Kháng cự (SR Channels) và Đường xu hướng (Trendlines), giúp nhà giao dịch nhanh chóng xác định các vùng giá quan trọng và cấu trúc hình học của thị trường mà không cần vẽ thủ công.
-   **Phân tích Hành động Giá**: Tự động nhận diện các Mẫu nến (Candlestick Patterns) quan trọng, cung cấp những manh mối sớm về khả năng đảo chiều hoặc tiếp diễn của xu hướng.
-   **Phân tích Dòng tiền & Tâm lý thị trường**: Cung cấp các công cụ chuyên sâu như chỉ báo MCDX để theo dõi dấu chân của "dòng tiền thông minh" (smart money) và Bảng điều khiển Dao động (Oscillator Dashboard) để đo lường động lượng và tâm lý chung của thị trường.
-   **Phát hiện Phân kỳ Tự động**: Tích hợp khả năng tự động tìm kiếm các tín hiệu Phân kỳ (Divergence) — một trong những kỹ thuật mạnh mẽ nhất để dự báo sự suy yếu và đảo chiều của xu hướng.

Các chỉ báo này được thiết kế để phục vụ cho cả nhà giao dịch mới và có kinh nghiệm. Với khả năng tùy biến cao, người dùng có thể dễ dàng bật/tắt từng thành phần riêng lẻ để điều chỉnh công cụ sao cho phù hợp nhất với phong cách giao dịch và chiến lược cá nhân của mình.

## Cấu trúc thư mục

Dưới đây là mô tả về các tệp trong thư mục này:

```
/technical-indicator/
├── AIO_SR_Trendline_Candles_Divergence.txt  # Chỉ báo All-In-One (AIO) phiên bản đầy đủ nhất, tích hợp tín hiệu, SR, trendline, mẫu nến và phân kỳ.
├── Allinone-Signal_byDANGVO.txt             # Một phiên bản khác của chỉ báo AIO, tập trung vào tín hiệu, SR và trendline.
├── MCDX_SIgnal.txt                          # Chỉ báo MCDX (Multi-Color Dragon Extended) để theo dõi dòng tiền của "Banker", "Hot Money" và "Retailer".
├── MFI_RSI_ADX_KDJ_MOM.txt                  # Bảng điều khiển (Dashboard) các chỉ báo dao động bao gồm MFI, RSI, KDJ và Momentum.
└── README.md                                # Tệp hướng dẫn này.
```

## Hướng dẫn Cài đặt

Để cài đặt và sử dụng các chỉ báo này trên TradingView, hãy làm theo các bước sau cho mỗi tệp `.txt`:

1.  **Mở tệp**: Mở một trong các tệp `.txt` (ví dụ: `AIO_SR_Trendline_Candles_Divergence.txt`).
2.  **Sao chép mã**: Chọn tất cả nội dung trong tệp (Ctrl+A hoặc Cmd+A) và sao chép (Ctrl+C hoặc Cmd+C).
3.  **Mở TradingView**: Truy cập trang web [TradingView](https://www.tradingview.com/) và mở một biểu đồ bất kỳ.
4.  **Mở Pine Editor**: Ở thanh công cụ dưới cùng của biểu đồ, nhấp vào tab `Pine Editor`.
5.  **Dán mã**: Xóa mọi mã hiện có trong Pine Editor và dán mã bạn đã sao chép vào (Ctrl+V hoặc Cmd+V).
6.  **Thêm vào biểu đồ**: Nhấp vào nút `Add to chart` (Thêm vào biểu đồ) ở phía trên cửa sổ Pine Editor.
7.  Chỉ báo sẽ xuất hiện trên biểu đồ của bạn. Bạn có thể tùy chỉnh các thông số của nó bằng cách nhấp vào biểu tượng bánh răng (⚙️) bên cạnh tên chỉ báo.

Lặp lại các bước trên cho mỗi chỉ báo bạn muốn sử dụng.

## Hướng dẫn Sử dụng chi tiết

### 1. AIO_SR_Trendline_Candles_Divergence.txt (All-in-One Pro)

Đây là chỉ báo toàn diện nhất, hoạt động như một hệ thống giao dịch hoàn chỉnh bằng cách tổng hợp nhiều lớp phân tích.

-   **Chi tiết các thành phần**:
    -   **Tín hiệu All-in-One (AIO)**: Đây là cốt lõi của chỉ báo, cung cấp tín hiệu dựa trên sự hợp lưu của nhiều khung thời gian:
        -   *Tín hiệu Ngắn hạn (RSI/MACD)*: Đưa ra các cảnh báo sớm dựa trên sự thay đổi động lượng (MACD Crossover) và các điều kiện quá mua/quá bán (RSI). Thích hợp cho các giao dịch lướt sóng.
        -   *Tín hiệu Trung hạn (Range Filter)*: Hoạt động như một bộ lọc xu hướng. Khi giá nằm trên đường màu xanh, xu hướng trung hạn là tăng và ngược lại với đường màu đỏ. Tín hiệu `B` và `S` xuất hiện khi có sự thay đổi trong xu hướng này.
        -   *Tín hiệu Dài hạn (SuperTrend)*: Là bộ lọc xu hướng chính. Vùng nền màu xanh/đỏ trên biểu đồ cho thấy rõ xu hướng chủ đạo của thị trường. Một sự thay đổi màu sắc của SuperTrend là một sự kiện quan trọng, thường báo hiệu một xu hướng lớn mới.
        -   *Các lớp phủ tùy chọn (EMA, Bollinger Bands, Ichimoku)*: Cung cấp thêm bối cảnh. Bạn có thể bật chúng để tìm kiếm sự hợp lưu, ví dụ: giá phản ứng tại một đường EMA, giá chạm dải Bollinger Bands, hoặc giá phá vỡ Mây Ichimoku.

    -   **Kênh Hỗ trợ/Kháng cự (SR Channels)**: Chỉ báo tự động phân tích các đỉnh/đáy quan trọng trong quá khứ, nhóm chúng lại thành các vùng (kênh) có xác suất phản ứng giá cao. Khi giá đi vào một kênh, nó có thể di chuyển sideway. Một cú phá vỡ (breakout) ra khỏi kênh là một tín hiệu giao dịch tiềm năng.

    -   **Đường xu hướng (Trendlines)**: Tự động vẽ các đường xu hướng nối các đỉnh/đáy gần nhất. Khi giá phá vỡ một đường xu hướng (được đánh dấu bằng nhãn `B` hoặc `S`), nó báo hiệu sự thay đổi về động lượng và có thể dẫn đến một sự đảo chiều hoặc tăng tốc của xu hướng.

    -   **Mẫu nến (Candlestick Patterns)**: Tự động xác định các mẫu nến đảo chiều hoặc tiếp diễn quan trọng. Ví dụ: một mẫu nến *Hammer* hoặc *Bullish Engulfing* ở vùng hỗ trợ là một tín hiệu mua mạnh. Ngược lại, một mẫu *Shooting Star* hoặc *Bearish Engulfing* ở vùng kháng cự là một tín hiệu bán tiềm năng.

    -   **Phân kỳ (Divergence)**: Đây là một trong những tính năng mạnh mẽ nhất, tự động tìm kiếm sự khác biệt giữa hành động giá và các chỉ báo dao động để tìm tín hiệu sớm.
        -   *Phân kỳ thường (Regular Divergence)*: Giá tạo đáy sau thấp hơn đáy trước nhưng chỉ báo tạo đáy sau cao hơn (Phân kỳ tăng giá - Bullish Div) -> Tín hiệu đảo chiều tăng. Ngược lại cho Phân kỳ giảm giá (Bearish Div).
        -   *Phân kỳ ẩn (Hidden Divergence)*: Giá tạo đáy sau cao hơn đáy trước nhưng chỉ báo tạo đáy sau thấp hơn (Phân kỳ ẩn tăng giá - Hidden Bullish Div) -> Tín hiệu tiếp diễn xu hướng tăng. Ngược lại cho Phân kỳ ẩn giảm giá.

### 2. Allinone-Signal_byDANGVO.txt (All-in-One Standard)

Đây là phiên bản tinh gọn của chỉ báo `AIO Pro`, lý tưởng cho các nhà giao dịch muốn tập trung vào phân tích xu hướng, cấu trúc thị trường và hành động giá mà không bị phân tâm bởi tín hiệu phân kỳ, hoặc dành cho những ai muốn sử dụng một chỉ báo phân kỳ chuyên dụng khác.

-   **Tính năng chính**: Bao gồm đầy đủ các mô-đun Tín hiệu AIO, Kênh Hỗ trợ/Kháng cự, Đường xu hướng và Mẫu nến.
-   **Cách sử dụng**: Cách tiếp cận tương tự phiên bản Pro. Bạn có thể kết hợp các tín hiệu từ nhiều thành phần để có một quyết định giao dịch chắc chắn hơn. Ví dụ: một tín hiệu mua từ SuperTrend sẽ đáng tin cậy hơn nhiều nếu nó xuất hiện đồng thời với một mẫu nến Bullish Engulfing tại một kênh hỗ trợ mạnh.

### 3. MCDX_SIgnal.txt (MCDX - Dòng tiền Thông minh)

Chỉ báo này không cho bạn biết khi nào nên mua hay bán, mà cho bạn biết **ai** đang mua và bán. Đây là một công cụ cực kỳ hữu ích để phân tích tâm lý và hành vi của các nhóm tham gia thị trường.

-   **Diễn giải chi tiết**:
    -   **Banker (Cột đỏ/hồng)**: Đại diện cho dòng tiền lớn, các tổ chức, "cá mập". Đây là dòng tiền dẫn dắt xu hướng. **Chiến lược**: Hãy giao dịch cùng hướng với Banker. Khi cột đỏ tăng mạnh và vượt lên trên đường MA (màu đen), điều đó cho thấy các tổ chức đang tích cực gom hàng (nếu giá đang ở vùng thấp) hoặc đẩy giá (nếu đang trong xu hướng tăng). Sự sụt giảm của cột đỏ là một cảnh báo sớm rằng xu hướng có thể đang mất đi sự hỗ trợ từ dòng tiền lớn.
    -   **Hot Money (Cột vàng)**: Các nhà giao dịch nhanh nhạy, theo xu hướng. Dòng tiền này thường vào cuộc khi xu hướng đã trở nên rõ ràng và giúp khuếch đại đà tăng/giảm.
    -   **Retailer (Cột xanh lá)**: Các nhà đầu tư nhỏ lẻ, thường bị cảm xúc chi phối. Khi cột xanh chiếm ưu thế, thị trường thường đang ở các vùng đỉnh (nhỏ lẻ Fomo mua vào) hoặc đáy (nhỏ lẻ hoảng loạn bán ra). **Chiến lược**: Tránh giao dịch theo đám đông. Một tín hiệu tốt là khi cột đỏ (Banker) tăng lên trong khi cột xanh (Retailer) giảm đi.

### 4. MFI_RSI_ADX_KDJ_MOM.txt (Oscillator Dashboard)

Sức mạnh của chỉ báo này nằm ở việc tổng hợp và sàng lọc tín hiệu từ nhiều chỉ báo dao động để đưa ra cảnh báo chất lượng cao.

-   **Vai trò của từng thành phần**:
    -   **MOM (Momentum)**: Cung cấp một thước đo "thô" về vận tốc của giá. Việc nó cắt lên/xuống đường zero cho thấy động lượng đang chuyển sang dương/âm.
    -   **RSI & MFI**: Cả hai đều là chỉ báo động lượng giúp xác định các vùng quá mua (>70-80) và quá bán (<20-30). MFI được xem là "RSI được trọng số hóa theo khối lượng", do đó nó rất nhạy với dòng tiền ra/vào thị trường.
    -   **KDJ**: Là một chỉ báo động lượng rất nhạy, thường được dùng để xác định thời điểm vào/ra lệnh trong ngắn hạn. Tín hiệu chính là sự giao cắt giữa các đường K, D và J.

-   **Chiến lược Tích hợp & Cảnh báo Thông minh**:
    -   Điểm cốt lõi của chỉ báo này là hệ thống cảnh báo đã được lọc nhiễu. 
    -   Một **Tín hiệu Mua** không chỉ đơn thuần là một cú cắt lên của KDJ. Nó chỉ được kích hoạt khi **đồng thời** RSI và MFI **chưa** nằm trong vùng quá mua. Điều này giúp bạn tránh được việc "mua đuổi" khi một đợt tăng giá đã gần kết thúc.
    -   Tương tự, một **Tín hiệu Bán** chỉ được kích hoạt khi RSI và MFI **chưa** ở vùng quá bán, giúp bạn không bán ra ngay tại đáy của một đợt điều chỉnh.

---

**Tuyên bố miễn trừ trách nhiệm**: Các chỉ báo này chỉ là công cụ hỗ trợ phân tích. Giao dịch tài chính luôn đi kèm với rủi ro. Hãy tự chịu trách nhiệm cho các quyết định đầu tư của mình.
