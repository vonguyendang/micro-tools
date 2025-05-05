// Hàm hiển thị tab được chọn và ẩn các tab khác
function showTab(tabId) {
    // Ẩn tất cả các container
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.display = 'none';
        container.classList.remove('active-container');
    });

    // Bỏ active class khỏi tất cả các tab
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Hiển thị container được chọn và thêm class active
    const selectedContainer = document.getElementById(tabId);
    if (selectedContainer) {
        selectedContainer.style.display = 'block';
        selectedContainer.classList.add('active-container');
    }

    // Thêm class active cho tab được click
    // Tìm tab tương ứng với tabId
    const selectedTab = document.querySelector(`.tab[onclick="showTab('${tabId}')"]`);
     if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

// Hàm lấy khoảng thời gian lọc sự kiện (10 năm trước đến 1 năm sau)
function getFilterDate() {
    let date = new Date();
    // Ngày đầu tiên của năm 10 năm trước
    let fromDate = new Date(date.getFullYear() - 10, 0, 1);
    // Ngày cuối cùng của năm sau
    let toDate = new Date(date.getFullYear() + 1, 11, 31);

    // Định dạng ngày thành YYYY-MM-DD (chuẩn ISO không cần múi giờ)
    function formatDateToISO(d) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return [
        formatDateToISO(fromDate),
        formatDateToISO(toDate)
    ];
}

// Hàm gọi API và xử lý dữ liệu định giá cổ phiếu
async function fetchStockData() {
    const codeInput = document.getElementById('stockCode');
    const code = codeInput.value.trim(); // Trim để loại bỏ khoảng trắng thừa
    const resultDiv = document.getElementById('resultValuation');

    if (!code) {
        resultDiv.innerHTML = `<p class="placeholder-text error-text"><i class="fas fa-exclamation-triangle"></i> Vui lòng nhập mã cổ phiếu.</p>`;
        codeInput.focus(); // Focus vào input nếu rỗng
        return;
    }

    const stockCode = code.toUpperCase();
    // !!! LƯU Ý: API Key này có thể hết hạn. Bạn nên thay thế bằng key của bạn nếu có.
    const apiKey = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDA5MTc4MDczLCJuYmYiOjE3MDkxNzgwNzMsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIzMWYzYzU5Ny1jYjZlLTQzYWEtYmRlZS01NjkyYjM3YWNiM2EiLCJhdXRoX3RpbWUiOjE3MDkxNzgwNzMsImlkcCI6Imlkc3J2IiwibmFtZSI6InZvZGFuZzI3MDJAZ21haWwuY29tIiwic2VjdXJpdHlfc3RhbXAiOiJlNjA5NTEzYy05ZDFmLTQ4NGUtOTAyNi01MTA0ZDVlNmYzNTMiLCJqdGkiOiIwNzc0MDRiNmE1ZmM3MjQ4ZmMyMmNlYmEzYjUzYjlhZCIsImFtciI6WyJwYXNzd29yZCJdfQ.yhyKMefOxXhxIFTD9YCAUnQYqGAnA7-m89g-EWX3B3N51m614d2uj3IhEMH6kl8W-zhgdWu1yfIY7PgiwIUqAKL4M-LG93roNzTN0F0tk_WCFbrpxyc3Z4Cv1uTi4A10EGCkqwnZ3sZV8ValCmzfxmDvXDoQRFuy91nznmiUFEg_YVnukVsZyASetLh6-_jYC-FsuW9ZCLAXo4QNkr6_DsJKbIywZkkofn7IsfWFMDBoa5dEiPyxfG8zMq3F3pydh_fKPjaz-oUWmewjIRwm0ohfNwvTJqs4jU0Pz4t4QmFYvRj_yrILxTc_59ewZvKb_fvuE8q3l1E7dXvIb7SYIg';
    resultDiv.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Đang tải và phân tích dữ liệu...</p>';

    const [dateFrom, dateTo] = getFilterDate();
    const urls = [
        `https://restv2.fireant.vn/symbols/${stockCode}/fundamental`, // Chỉ số cơ bản (beta, shares...)
        `https://restv2.fireant.vn/symbols/${stockCode}/financial-data?type=Q&count=4`, // Dữ liệu tài chính 4 quý gần nhất
        `https://restv2.fireant.vn/symbols/${stockCode}/financial-data?type=Y&count=5`, // Dữ liệu tài chính 5 năm gần nhất
        'https://sbcharts.investing.com/bond_charts/bonds_chart_72.json', // Lãi suất TPCP (proxy qua Investing)
        // Sử dụng proxy để tránh lỗi CORS khi gọi API SSI
        `https://webproxy.vodang2702.workers.dev/?url=https://iboard-query.ssi.com.vn/stock/${stockCode}`, // Dữ liệu giao dịch SSI
        `https://restv2.fireant.vn/events/search?symbol=${stockCode}&orderBy=1&type=0&startDate=${dateFrom}&endDate=${dateTo}&offset=0&limit=20`, // Sự kiện cổ tức Fireant
        `https://restv2.fireant.vn/symbols/${stockCode}/profile` // Thông tin profile công ty Fireant
    ];

    const headers = {
        'accept': 'application/json',
        'authorization': apiKey
    };
    const headersSSI = { 'accept': 'application/json' }; // Header riêng cho SSI

    try {
        const requests = urls.map((url, index) => {
             // Sử dụng header khác nhau cho API SSI
             const currentHeaders = url.includes('iboard-query.ssi.com.vn') ? headersSSI : headers;
             // Investing API không cần header auth
             if (url.includes('investing.com')) {
                 return fetch(url);
             }
             return fetch(url, { headers: currentHeaders });
        });

        const responses = await Promise.all(requests);

        // Kiểm tra tất cả response có OK không
        for (const response of responses) {
            if (!response.ok) {
                 // Cố gắng đọc lỗi từ response nếu có thể
                 let errorMsg = `Lỗi ${response.status}: ${response.statusText}`;
                 try {
                     const errorData = await response.json();
                     errorMsg += ` - ${errorData.message || JSON.stringify(errorData)}`;
                 } catch (e) { /* Ignore if response body is not JSON or empty */ }

                 throw new Error(`Không thể tải dữ liệu cho mã ${stockCode}. ${errorMsg}`);
            }
        }

        const [
            stockData,
            financialDataQuarter,
            financialDataYear,
            bonds,
            stockTransaction,
            dividendEvents,
            stockProfile
        ] = await Promise.all(responses.map(res => res.json()));

        // --- Xử lý dữ liệu ---

        // 1. Dữ liệu giao dịch từ SSI (ưu tiên) hoặc Profile Fireant
        const transactionData = stockTransaction.data || {}; // Dữ liệu từ SSI
        const profileData = stockProfile || {};         // Dữ liệu từ Fireant

        const stockExchange = (transactionData.exchange ?? profileData.exchange ?? 'N/A').toUpperCase();
        const stockNameVi = (transactionData.companyNameVi ?? profileData.companyName ?? 'Không rõ').toUpperCase();
        const stockNameEn = (transactionData.companyNameEn ?? profileData.internationalName ?? 'Unknown').toUpperCase();

        // Hàm định dạng số an toàn (trả về 0 nếu null/undefined/NaN)
        const safeFormatNumber = (value, decimals = 0) => formatNumber(value ?? 0, decimals);

        // Dữ liệu giá
        const marketPrice = transactionData.matchedPrice ?? 0; // Giá khớp lệnh cuối cùng
        const referencePrice = transactionData.refPrice ?? 0;
        const ceilingPrice = transactionData.ceiling ?? 0;
        const floorPrice = transactionData.floor ?? 0;
        const openingPrice = transactionData.openPrice ?? 0;
        const highestPrice = transactionData.highest ?? 0;
        const lowestPrice = transactionData.lowest ?? 0;
        const averagePrice = transactionData.avgPrice ?? 0; // Giá trung bình phiên
        const priceChange = transactionData.priceChange ?? 0;
        const percentageChange = transactionData.priceChangePercent ?? 0;

        // Dữ liệu khối lượng
        const totalVolume = transactionData.stockVol ?? 0;
        const totalBuyVolume = transactionData.stockBUVol ?? 0; // Tổng KL đặt mua
        const totalSellVolume = transactionData.stockSDVol ?? 0; // Tổng KL đặt bán
        const totalForeignBuyVolume = transactionData.buyForeignQtty ?? 0;
        const totalForeignSellVolume = transactionData.sellForeignQtty ?? 0;
        const totalInternalBuyVolume = Math.max(0, totalBuyVolume - totalForeignBuyVolume); // KL mua trong nước
        const totalInternalSellVolume = Math.max(0, totalSellVolume - totalForeignSellVolume); // KL bán trong nước
        const totalForeignNetFlow = totalForeignBuyVolume - totalForeignSellVolume; // Dòng tiền ngoại
        const totalInternalNetFlow = totalInternalBuyVolume - totalInternalSellVolume; // Dòng tiền nội
        const totalNetFlow = totalBuyVolume - totalSellVolume; // Dòng tiền ròng

        // Tính % khối lượng (tránh chia cho 0)
        const percentBuyVolume = totalVolume > 0 ? (totalBuyVolume / totalVolume) * 100 : 0;
        const percentSellVolume = totalVolume > 0 ? (totalSellVolume / totalVolume) * 100 : 0;
        const percentForeignBuyVolume = totalBuyVolume > 0 ? (totalForeignBuyVolume / totalBuyVolume) * 100 : 0;
        const percentInternalBuyVolume = totalBuyVolume > 0 ? (totalInternalBuyVolume / totalBuyVolume) * 100 : 0;
        const percentForeignSellVolume = totalSellVolume > 0 ? (totalForeignSellVolume / totalSellVolume) * 100 : 0;
        const percentInternalSellVolume = totalSellVolume > 0 ? (totalInternalSellVolume / totalSellVolume) * 100 : 0;


        // Lấy class màu sắc cho giá
        let marketPriceClass = getPriceClass(marketPrice, referencePrice, ceilingPrice, floorPrice);
        let openingPriceClass = getPriceClass(openingPrice, referencePrice, ceilingPrice, floorPrice);
        let averagePriceClass = getPriceClass(averagePrice, referencePrice, ceilingPrice, floorPrice);
        let highestPriceClass = getPriceClass(highestPrice, referencePrice, ceilingPrice, floorPrice);
        let lowestPriceClass = getPriceClass(lowestPrice, referencePrice, ceilingPrice, floorPrice);
        let foreignNetFlowClass = totalForeignNetFlow > 0 ? 'price-up' : (totalForeignNetFlow < 0 ? 'price-down' : 'reference-price');
        let internalNetFlowClass = totalInternalNetFlow > 0 ? 'price-up' : (totalInternalNetFlow < 0 ? 'price-down' : 'reference-price');
        let netFlowClass = totalNetFlow > 0 ? 'price-up' : (totalNetFlow < 0 ? 'price-down' : 'reference-price');

        // 2. Dữ liệu cơ bản và tài chính từ Fireant
        const betaStock = stockData.beta ?? 0;
        const sharesOutstanding = stockData.sharesOutstanding ?? 0; // Tổng KLCP đang lưu hành
        const freeShares = stockData.freeShares ?? 0; // KLCP tự do chuyển nhượng
         // Tính FSR an toàn, tránh chia cho 0
        const floatingShareRatio = sharesOutstanding > 0 ? freeShares / sharesOutstanding : 0;

        // Tính toán chỉ số trung bình 4 quý
        let totalEPS = 0, totalPE = 0, totalPB = 0, totalPS = 0, totalROA = 0, totalROE = 0, totalSalePerShare = 0, totalBookValuePerShare = 0, totalTangibleBookValuePerShare = 0;
        let validQuarters = 0;

        financialDataQuarter.forEach(data => {
            // Chỉ tính các quý có dữ liệu hợp lệ (ví dụ: EPS không phải null/undefined)
            if (data.financialValues && data.financialValues.BasicEPS != null) {
                 validQuarters++;
                 totalEPS += data.financialValues.BasicEPS ?? 0;
                 totalPE += data.financialValues.PE ?? 0;
                 totalPB += data.financialValues.PB ?? 0;
                 totalPS += data.financialValues.PS ?? 0;
                 totalROA += data.financialValues.ROA ?? 0;
                 totalROE += data.financialValues.ROE ?? 0;
                 totalSalePerShare += data.financialValues.SalePerShare ?? 0;
                 totalBookValuePerShare += data.financialValues.BookValuePerShare ?? 0;
                 totalTangibleBookValuePerShare += data.financialValues.TangibleBookValuePerShare ?? 0;
            }
        });

        // Tính trung bình an toàn, tránh chia cho 0
        const avgEPS = validQuarters > 0 ? totalEPS / validQuarters : 0;
        const avgPE = validQuarters > 0 ? totalPE / validQuarters : 0;
        const avgPB = validQuarters > 0 ? totalPB / validQuarters : 0;
        const avgPS = validQuarters > 0 ? totalPS / validQuarters : 0;
        const avgROA = validQuarters > 0 ? totalROA / validQuarters : 0;
        const avgROE = validQuarters > 0 ? totalROE / validQuarters : 0;
        const avgSalePerShare = validQuarters > 0 ? totalSalePerShare / validQuarters : 0;
        const avgBookValuePerShare = validQuarters > 0 ? totalBookValuePerShare / validQuarters : 0;
        const avgTangibleBookValuePerShare = validQuarters > 0 ? totalTangibleBookValuePerShare / validQuarters : 0;


        // --- Tính toán các mức giá định giá ---
        // Các phương pháp cơ bản
        const pricePE_EPS = avgPE * avgEPS; // Giá = P/E trung bình * EPS trung bình
        const pricePS_SPS = avgPS * avgSalePerShare; // Giá = P/S trung bình * Doanh thu/cp trung bình
        const pricePB_BVPS = avgPB * avgBookValuePerShare; // Giá = P/B trung bình * Giá trị sổ sách/cp trung bình

        // Phương pháp Benjamin Graham
        let priceGraham1 = NaN, priceGraham2 = NaN, priceGraham3 = NaN;
        let g = NaN; // Tốc độ tăng trưởng EPS ước tính

        // Ước tính tốc độ tăng trưởng EPS (g) 5 năm, cần ít nhất 2 điểm dữ liệu
        if (financialDataYear.length >= 5 && financialDataYear[4].financialValues.BasicEPS != null && financialDataYear[4].financialValues.BasicEPS !== 0 && financialDataYear[0].financialValues.BasicEPS != null) {
           // Sử dụng EPS năm gần nhất và EPS 5 năm trước
           const latestEPS = financialDataYear[0].financialValues.BasicEPS;
           const oldestEPS = financialDataYear[4].financialValues.BasicEPS;
            // Chỉ tính khi cả hai đều dương để tránh kết quả vô nghĩa
            if (latestEPS > 0 && oldestEPS > 0) {
                 g = Math.pow((latestEPS / oldestEPS), 1 / 4) - 1; // Tăng trưởng trong 4 khoảng thời gian (5 năm)
            }
        }

        // Lấy lãi suất TPCP 10 năm từ Investing.com (cần kiểm tra cấu trúc JSON)
        // bonds.current[5] là mảng cho kỳ hạn 10 năm, [5][1] là lãi suất hiện tại
        const y10 = (bonds && bonds.current && bonds.current[5] && typeof bonds.current[5][1] === 'number') ? bonds.current[5][1] : 4.4; // Lấy lãi suất hoặc mặc định 4.4%

        const riskFreeRateAdj = (y10 > 0 ? y10 : 4.4) + 0.5; // Lãi suất phi rủi ro điều chỉnh (thêm 0.5%)

        // Chỉ tính công thức Graham nếu có g hợp lệ (số thực) và avgEPS dương
        if (!isNaN(g) && avgEPS > 0) {
            // Công thức Graham gốc (điều chỉnh): V = EPS * (8.5 + 2g) * (4.4 / Y), Y là lãi suất TPCP AAA 20 năm (thay bằng y10_adj)
            // Sử dụng hằng số gốc của Graham và lãi suất mặc định 4.4 nếu y10 không có
            // Giới hạn tốc độ tăng trưởng g để tránh kết quả quá cao (ví dụ: tối đa 15%)
            const cappedG = Math.min(Math.max(g, 0), 0.15); // Giới hạn g từ 0% đến 15%

            // Graham 1: Công thức đầy đủ với lãi suất điều chỉnh
            priceGraham1 = avgEPS * (8.5 + 2 * cappedG) * (4.4 / riskFreeRateAdj);

            // Graham 2: Công thức rút gọn không tính lãi suất (P/E ngụ ý)
            priceGraham2 = avgEPS * (8.5 + 2 * cappedG);

            // Graham 3: Công thức dựa trên căn bậc hai (EPS * BVPS)
            // V = √(22.5 * EPS * BVPS) - Điều chỉnh 22.5 -> 20, thêm hệ số an toàn 0.85
            if (avgBookValuePerShare > 0) { // Chỉ tính nếu BVPS dương
                 priceGraham3 = Math.sqrt(20 * avgEPS * avgBookValuePerShare * 0.85);
            }
        }

        // --- Tính giá trị định giá trung bình có trọng số ---
        // Trọng số (có thể điều chỉnh tùy chiến lược):
        const wPE_EPS = 0.20; // 20%
        const wPS_SPS = 0.15; // 15%
        const wPB_BVPS = 0.15; // 15%
        const wGraham1 = 0.25; // 25% (Công thức đầy đủ)
        const wGraham2 = 0.10; // 10% (Rút gọn)
        const wGraham3 = 0.15; // 15% (Căn bậc hai)

        let totalPrice = 0;
        let totalWeight = 0;

        // Chỉ cộng vào giá trị trung bình nếu giá trị tính được hợp lệ (không âm, không NaN)
        if (pricePE_EPS > 0 && !isNaN(pricePE_EPS)) { totalPrice += pricePE_EPS * wPE_EPS; totalWeight += wPE_EPS; }
        if (pricePS_SPS > 0 && !isNaN(pricePS_SPS)) { totalPrice += pricePS_SPS * wPS_SPS; totalWeight += wPS_SPS; }
        if (pricePB_BVPS > 0 && !isNaN(pricePB_BVPS)) { totalPrice += pricePB_BVPS * wPB_BVPS; totalWeight += wPB_BVPS; }
        if (priceGraham1 > 0 && !isNaN(priceGraham1)) { totalPrice += priceGraham1 * wGraham1; totalWeight += wGraham1; }
        if (priceGraham2 > 0 && !isNaN(priceGraham2)) { totalPrice += priceGraham2 * wGraham2; totalWeight += wGraham2; }
        if (priceGraham3 > 0 && !isNaN(priceGraham3)) { totalPrice += priceGraham3 * wGraham3; totalWeight += wGraham3; }

        // Tính giá trung bình, nếu totalWeight = 0 (không có phương pháp nào hợp lệ) thì avgValuationPrice = 0
        const avgValuationPrice = totalWeight > 0 ? totalPrice / totalWeight : 0;


        // --- Xây dựng Nhận định và Tính điểm ---
        const totalStars = 10;
        let achievedStars = 0;
        let commentary = {}; // Object để lưu trữ các nhận định

        // Nhận định Thị giá
        commentary.marketPrice = `Giao dịch trên sàn ${stockExchange}.\nTên đầy đủ: ${stockNameVi}.\nTên quốc tế: ${stockNameEn}.`;

        // Nhận định EPS
        if (avgEPS >= 5000) { achievedStars += 1; commentary.avgEPS = `Rất tốt (${safeFormatNumber(avgEPS)}đ). Cho thấy hiệu quả sinh lời cao trên mỗi cổ phần, có khả năng duy trì hoặc tăng trưởng lợi nhuận ổn định.`; }
        else if (avgEPS >= 3000) { achievedStars += 0.75; commentary.avgEPS = `Tốt (${safeFormatNumber(avgEPS)}đ). Công ty tạo ra lợi nhuận đáng kể, sử dụng vốn hiệu quả.`; }
        else if (avgEPS >= 1000) { achievedStars += 0.5; commentary.avgEPS = `Khá (${safeFormatNumber(avgEPS)}đ). Khả năng sinh lời ở mức chấp nhận được, cần theo dõi thêm về biên lợi nhuận.`; }
        else if (avgEPS > 0) { achievedStars += 0.25; commentary.avgEPS = `Thấp (${safeFormatNumber(avgEPS)}đ). Lợi nhuận trên cổ phần còn hạn chế, có thể do mới hoạt động hoặc hiệu quả chưa cao.`; }
        else { commentary.avgEPS = `Âm (${safeFormatNumber(avgEPS)}đ). Công ty đang thua lỗ, cần xem xét kỹ lưỡng rủi ro.`; }

        // Nhận định P/E
        if (avgPE <= 0) { commentary.avgPE = `Âm hoặc bằng 0 (${safeFormatNumber(avgPE, 2)}x). Công ty đang thua lỗ hoặc EPS quá thấp, khó định giá bằng P/E.`; }
        else if (avgPE < 5) { achievedStars += 0.5; commentary.avgPE = `Rất thấp (${safeFormatNumber(avgPE, 2)}x). Có thể bị định giá thấp hoặc thị trường bi quan về triển vọng/chất lượng lợi nhuận.`; }
        else if (avgPE < 10) { achievedStars += 1; commentary.avgPE = `Thấp (${safeFormatNumber(avgPE, 2)}x). Hấp dẫn nếu công ty có nền tảng tốt, tiềm ẩn cơ hội đầu tư giá trị.`; }
        else if (avgPE < 15) { achievedStars += 0.75; commentary.avgPE = `Hợp lý (${safeFormatNumber(avgPE, 2)}x). Phản ánh mức định giá vừa phải, thường thấy ở các công ty ổn định.`; }
        else if (avgPE < 25) { achievedStars += 0.5; commentary.avgPE = `Khá cao (${safeFormatNumber(avgPE, 2)}x). Cho thấy kỳ vọng tăng trưởng từ thị trường, cần đánh giá tiềm năng tăng trưởng tương lai.`; }
        else { achievedStars += 0.25; commentary.avgPE = `Cao (${safeFormatNumber(avgPE, 2)}x). Kỳ vọng tăng trưởng rất lớn hoặc giá đang quá cao so với lợi nhuận. Rủi ro điều chỉnh cao.`; }

        // Nhận định P/B
        if (avgPB <= 0) { commentary.avgPB = `Âm hoặc bằng 0 (${safeFormatNumber(avgPB, 2)}x). Giá trị sổ sách âm, tình hình tài chính rất xấu.`; }
        else if (avgPB < 1) { achievedStars += 1; commentary.avgPB = `Thấp (<1) (${safeFormatNumber(avgPB, 2)}x). Giá thị trường thấp hơn giá trị sổ sách, có thể là cơ hội nếu công ty không gặp vấn đề nghiêm trọng.`; }
        else if (avgPB < 1.5) { achievedStars += 0.75; commentary.avgPB = `Hợp lý (${safeFormatNumber(avgPB, 2)}x). Mức định giá khá cân bằng so với tài sản ròng.`; }
        else if (avgPB < 3) { achievedStars += 0.5; commentary.avgPB = `Khá cao (${safeFormatNumber(avgPB, 2)}x). Thị trường đánh giá cao hơn giá trị sổ sách, thường do kỳ vọng lợi nhuận/tài sản vô hình.`; }
        else { achievedStars += 0.25; commentary.avgPB = `Cao (>3) (${safeFormatNumber(avgPB, 2)}x). Kỳ vọng rất lớn vào tiềm năng công ty hoặc tài sản ngầm, cần phân tích kỹ.`; }

        // Nhận định P/S
        if (avgPS <= 0) { commentary.avgPS = `Âm hoặc bằng 0 (${safeFormatNumber(avgPS, 2)}x). Doanh thu âm (ít xảy ra) hoặc SPS âm.`; }
        else if (avgPS < 0.8) { achievedStars += 1; commentary.avgPS = `Thấp (<0.8) (${safeFormatNumber(avgPS, 2)}x). Giá đang rẻ so với doanh thu tạo ra, hấp dẫn nếu biên lợi nhuận tốt.`; }
        else if (avgPS < 1.5) { achievedStars += 0.75; commentary.avgPS = `Hợp lý (${safeFormatNumber(avgPS, 2)}x). Mức định giá khá cân bằng so với doanh thu.`; }
        else if (avgPS < 3) { achievedStars += 0.5; commentary.avgPS = `Khá cao (${safeFormatNumber(avgPS, 2)}x). Giá cao hơn so với doanh thu, cần biên lợi nhuận cao để hợp lý hóa.`; }
        else { achievedStars += 0.25; commentary.avgPS = `Cao (>3) (${safeFormatNumber(avgPS, 2)}x). Định giá rất cao so với doanh thu, thường thấy ở công ty tăng trưởng nhanh nhưng rủi ro cao.`; }

        // Nhận định Beta
        if (betaStock === 1) { achievedStars += 0.75; commentary.betaStock = `Trung bình (β = ${safeFormatNumber(betaStock, 2)}). Biến động giá tương đương thị trường chung.`; }
        else if (betaStock > 0 && betaStock < 1) { achievedStars += 1; commentary.betaStock = `Thấp hơn thị trường (0 < β < 1, β = ${safeFormatNumber(betaStock, 2)}). Ít biến động hơn thị trường, phòng thủ tốt hơn khi thị trường giảm.`; }
        else if (betaStock > 1) { achievedStars += 0.5; commentary.betaStock = `Cao hơn thị trường (β > 1, β = ${safeFormatNumber(betaStock, 2)}). Biến động mạnh hơn thị trường, tiềm năng lợi nhuận/rủi ro cao hơn.`; }
        else if (betaStock === 0) { achievedStars += 0.25; commentary.betaStock = `Không tương quan (β = 0). Giá không di chuyển theo thị trường (hiếm).`; }
        else { commentary.betaStock = `Tương quan nghịch (β < 0, β = ${safeFormatNumber(betaStock, 2)}). Giá có xu hướng đi ngược thị trường (rất hiếm và thường không ổn định).`; }

        // Nhận định FSR (Floating Share Ratio)
        const fsrPercent = floatingShareRatio * 100;
        if (fsrPercent < 20) { achievedStars += 0.5; commentary.floatingShareRatio = `Thấp (${safeFormatNumber(fsrPercent, 1)}%). Lượng cổ phiếu tự do ít, thanh khoản có thể thấp, dễ bị biến động giá mạnh do cung cầu mất cân đối.`; }
        else if (fsrPercent < 60) { achievedStars += 1; commentary.floatingShareRatio = `Trung bình (${safeFormatNumber(fsrPercent, 1)}%). Mức độ cô đặc vừa phải, thanh khoản khá, cân bằng giữa kiểm soát và giao dịch.`; }
        else { achievedStars += 0.75; commentary.floatingShareRatio = `Cao (${safeFormatNumber(fsrPercent, 1)}%). Lượng cổ phiếu trôi nổi lớn, thanh khoản tốt, giá khó bị thao túng nhưng cũng khó tăng đột biến do nguồn cung dồi dào.`; }

        // Nhận định ROA
        const avgROAPercent = avgROA * 100;
        if (avgROAPercent >= 10) { achievedStars += 1; commentary.avgROA = `Rất tốt (${safeFormatNumber(avgROAPercent, 1)}%). Hiệu quả sử dụng tài sản để tạo lợi nhuận rất cao.`; }
        else if (avgROAPercent >= 5) { achievedStars += 0.75; commentary.avgROA = `Tốt (${safeFormatNumber(avgROAPercent, 1)}%). Sử dụng tài sản hiệu quả để sinh lời.`; }
        else if (avgROAPercent > 0) { achievedStars += 0.5; commentary.avgROA = `Trung bình (${safeFormatNumber(avgROAPercent, 1)}%). Khả năng sinh lời từ tài sản chưa thực sự nổi bật.`; }
        else { commentary.avgROA = `Thấp/Âm (${safeFormatNumber(avgROAPercent, 1)}%). Hiệu quả sử dụng tài sản kém hoặc đang thua lỗ.`; }

        // Nhận định ROE
        const avgROEPercent = avgROE * 100;
        if (avgROEPercent >= 20) { achievedStars += 1; commentary.avgROE = `Rất tốt (${safeFormatNumber(avgROEPercent, 1)}%). Khả năng sinh lời trên vốn chủ sở hữu vượt trội, rất hấp dẫn cổ đông.`; }
        else if (avgROEPercent >= 15) { achievedStars += 0.75; commentary.avgROE = `Tốt (${safeFormatNumber(avgROEPercent, 1)}%). Hiệu quả sử dụng vốn chủ sở hữu tốt.`; }
        else if (avgROEPercent >= 10) { achievedStars += 0.5; commentary.avgROE = `Khá (${safeFormatNumber(avgROEPercent, 1)}%). Sinh lời trên vốn chủ sở hữu ở mức chấp nhận được.`; }
        else if (avgROEPercent > 0) { achievedStars += 0.25; commentary.avgROE = `Trung bình (${safeFormatNumber(avgROEPercent, 1)}%). Khả năng sinh lời trên vốn chưa cao.`; }
        else { commentary.avgROE = `Thấp/Âm (${safeFormatNumber(avgROEPercent, 1)}%). Hiệu quả sử dụng vốn kém hoặc đang thua lỗ.`; }

        // Nhận định SPS (Sale Per Share) - Chủ yếu mang tính thông tin
        commentary.avgSalePerShare = `Mỗi cổ phiếu đại diện cho ${safeFormatNumber(avgSalePerShare)}đ doanh thu trong 4 quý gần nhất. Chỉ số này cần xem xét cùng biên lợi nhuận.`;

        // Nhận định BVPS (Book Value Per Share)
        commentary.avgBookValuePerShare = `Giá trị sổ sách ghi nhận trên mỗi cổ phiếu là ${safeFormatNumber(avgBookValuePerShare)}đ. `;
        if (marketPrice > 0 && avgBookValuePerShare > 0) { // Chỉ so sánh khi cả 2 > 0
             if (avgBookValuePerShare > marketPrice) {
                 achievedStars += 0.75; // Thưởng điểm khi BVPS > Giá
                 commentary.avgBookValuePerShare += `Cao hơn thị giá (${safeFormatNumber((avgBookValuePerShare / marketPrice - 1) * 100, 1)}%).`;
             } else {
                 commentary.avgBookValuePerShare += `Thấp hơn thị giá (${safeFormatNumber((1 - avgBookValuePerShare / marketPrice) * 100, 1)}%).`;
             }
        }

        // Nhận định TBVPS (Tangible Book Value Per Share)
        commentary.avgTangibleBookValuePerShare = `Giá trị sổ sách hữu hình (loại trừ tài sản vô hình như lợi thế thương mại) là ${safeFormatNumber(avgTangibleBookValuePerShare)}đ/cp. Cho cái nhìn thận trọng hơn về giá trị tài sản ròng.`;

        // Nhận định cho các phương pháp định giá cụ thể
        const valuationMethodComment = (price, method) => {
            if (isNaN(price)) return `Không đủ dữ liệu để tính theo phương pháp ${method}.`;
            if (price <= 0) return `Kết quả định giá theo ${method} âm hoặc bằng 0, cho thấy tín hiệu rất xấu.`;
            let comparison = '';
            if (marketPrice > 0) {
                 const diffPercent = (price / marketPrice - 1) * 100;
                 if (diffPercent > 15) comparison = ` cao hơn đáng kể (${safeFormatNumber(diffPercent, 1)}%) so với thị giá.`;
                 else if (diffPercent < -15) comparison = ` thấp hơn đáng kể (${safeFormatNumber(Math.abs(diffPercent), 1)}%) so với thị giá.`;
                 else comparison = ` khá gần (${safeFormatNumber(diffPercent, 1)}%) với thị giá.`;
            }
             return `Định giá ${safeFormatNumber(price)}đ/cp, ${comparison}`;
        };

        commentary.pricePE_EPS = valuationMethodComment(pricePE_EPS, 'P/E * EPS');
        commentary.pricePS_SPS = valuationMethodComment(pricePS_SPS, 'P/S * SPS');
        commentary.pricePB_BVPS = valuationMethodComment(pricePB_BVPS, 'P/B * BVPS');
        commentary.priceGraham1 = valuationMethodComment(priceGraham1, 'Graham (đầy đủ)');
        commentary.priceGraham2 = valuationMethodComment(priceGraham2, 'Graham (rút gọn)');
        commentary.priceGraham3 = valuationMethodComment(priceGraham3, 'Graham (căn bậc hai)');


        // Nhận định giá trung bình
        commentary.avgValuationPrice = `Giá trị hợp lý ước tính theo trung bình các phương pháp là ${safeFormatNumber(avgValuationPrice)}đ/cp. `;
        if (avgValuationPrice <= 0) {
            commentary.avgValuationPrice += 'Không thể đưa ra mức giá hợp lý dương từ các phương pháp trên.';
        } else if (marketPrice > 0) {
            const diffPercent = (avgValuationPrice / marketPrice - 1) * 100;
             if (diffPercent > 10) { // Cao hơn thị giá > 10% -> Tiềm năng
                 achievedStars += 1;
                 commentary.avgValuationPrice += `Cao hơn ${safeFormatNumber(diffPercent, 1)}% so với thị giá hiện tại, cho thấy tiềm năng tăng giá.`;
             } else if (diffPercent < -10) { // Thấp hơn thị giá > 10% -> Đắt
                 achievedStars += 0.1; // Chỉ cho ít điểm nếu có giá trị dương
                 commentary.avgValuationPrice += `Thấp hơn ${safeFormatNumber(Math.abs(diffPercent), 1)}% so với thị giá hiện tại, có thể cổ phiếu đang được định giá cao.`;
             } else { // Chênh lệch trong khoảng +/- 10% -> Hợp lý
                 achievedStars += 0.5;
                 commentary.avgValuationPrice += `Quanh (${safeFormatNumber(diffPercent, 1)}%) mức thị giá hiện tại, cho thấy mức định giá tương đối hợp lý.`;
             }
        } else {
            commentary.avgValuationPrice += 'Không thể so sánh với thị giá hiện tại (giá <= 0).';
        }

        // Làm tròn điểm số cuối cùng
        achievedStars = Math.round(achievedStars * 2) / 2; // Làm tròn đến 0.5 gần nhất
        achievedStars = Math.min(achievedStars, totalStars); // Đảm bảo không vượt quá totalStars

        // --- Hiển thị kết quả ---
        resultDiv.innerHTML = `
            <style> /* Style nội bộ cho bảng kết quả để ghi đè nếu cần */
                .result table { margin-top: 15px; margin-bottom: 25px; }
                .assessment-header th { background-color: #e9f5ff; }
                .comment { font-style: italic; color: #555; }
                .error-text { color: var(--error-color); font-weight: bold; }
            </style>

            <table class="hidden-border">
                 <tbody>
                    <tr>
                        <th colspan="5" class="center">THÔNG TIN THAM KHẢO THÊM VỀ ${stockNameVi} (${stockCode})</th>
                    </tr>
                    <tr>
                        <td colspan="5" class="center">
                            <div class="button-container">
                                <button class="action-button external-link-button" onclick="openFireant('${stockCode}')"><i class="fas fa-external-link-alt"></i> Fireant</button>
                                <button class="action-button external-link-button" onclick="openVietstock('${stockCode}')"><i class="fas fa-external-link-alt"></i> Vietstock</button>
                                <button class="action-button external-link-button" onclick="openTradingView('${stockExchange}','${stockCode}')"><i class="fas fa-external-link-alt"></i> TradingView</button>
                             </div>
                        </td>
                    </tr>
                    <tr><th colspan="5" class="center">GIÁ GIAO DỊCH PHIÊN GẦN NHẤT</th></tr>
                    <tr>
                        <td class="${marketPriceClass}">Giá Khớp Lệnh<br><strong>${safeFormatNumber(marketPrice)}</strong></td>
                        <td class="${marketPriceClass}">Thay đổi<br><strong>${safeFormatNumber(priceChange)} (${safeFormatNumber(percentageChange, 2)}%)</strong></td>
                        <td class="ceiling-price">Giá Trần<br><strong>${safeFormatNumber(ceilingPrice)}</strong></td>
                        <td class="reference-price">Giá Tham Chiếu<br><strong>${safeFormatNumber(referencePrice)}</strong></td>
                        <td class="floor-price">Giá Sàn<br><strong>${safeFormatNumber(floorPrice)}</strong></td>
                    </tr>
                    <tr>
                        <td class="${openingPriceClass}">Mở cửa<br><strong>${safeFormatNumber(openingPrice)}</strong></td>
                        <td class="${averagePriceClass}">Trung bình<br><strong>${safeFormatNumber(averagePrice)}</strong></td>
                        <td class="${highestPriceClass}">Cao nhất<br><strong>${safeFormatNumber(highestPrice)}</strong></td>
                        <td class="${lowestPriceClass}">Thấp nhất<br><strong>${safeFormatNumber(lowestPrice)}</strong></td>
                        <td class="${averagePriceClass}">Tổng KLGD<br><strong>${safeFormatNumber(totalVolume / 1000, 1)}K</strong></td>
                    </tr>
                </tbody>
            </table>

            <table class="hidden-border">
                <tbody>
                     <tr><th colspan="3" class="center">CHI TIẾT KHỐI LƯỢNG GIAO DỊCH HÔM NAY</th></tr>
                     <tr>
                        <td class="price-up">Khối lượng Mua<br>${safeFormatNumber(totalBuyVolume / 1000, 1)}K (${safeFormatNumber(percentBuyVolume, 1)}%)</td>
                        <td class="price-up">Nước ngoài<br>${safeFormatNumber(totalForeignBuyVolume / 1000, 1)}K (${safeFormatNumber(percentForeignBuyVolume, 1)}%)</td>
                        <td class="price-up">Trong nước<br>${safeFormatNumber(totalInternalBuyVolume / 1000, 1)}K (${safeFormatNumber(percentInternalBuyVolume, 1)}%)</td>
                    </tr>
                    <tr>
                        <td class="price-down">Khối lượng Bán<br>${safeFormatNumber(totalSellVolume / 1000, 1)}K (${safeFormatNumber(percentSellVolume, 1)}%)</td>
                        <td class="price-down">Nước ngoài<br>${safeFormatNumber(totalForeignSellVolume / 1000, 1)}K (${safeFormatNumber(percentForeignSellVolume, 1)}%)</td>
                        <td class="price-down">Trong nước<br>${safeFormatNumber(totalInternalSellVolume / 1000, 1)}K (${safeFormatNumber(percentInternalSellVolume, 1)}%)</td>
                    </tr>
                    <tr>
                        <td class=${netFlowClass}><strong>Tổng mua ròng<br>${safeFormatNumber(totalNetFlow / 1000, 1)}K </strong></td>
                        <td class="${foreignNetFlowClass}"><strong>Mua ròng nước ngoài<br>${safeFormatNumber(totalForeignNetFlow / 1000, 1)}K </strong></td>
                        <td class="${internalNetFlowClass}"><strong>Mua ròng trong nước<br>${safeFormatNumber(totalInternalNetFlow / 1000, 1)}K </strong></td>
                    </tr>
                 </tbody>
             </table>

            ${dividendEvents && dividendEvents.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th colspan="3" class="center">SỰ KIỆN CỔ TỨC GẦN ĐÂY (${formatDate(dateFrom)} - ${formatDate(dateTo)})</th>
                    </tr>
                    <tr>
                        <th class="center">Ngày GDKHQ</th>
                        <th>Nội dung Sự kiện</th>
                        <th class="center">Ngày Thực Hiện</th>
                    </tr>
                </thead>
                <tbody>
                    ${dividendEvents.map(event => `
                        <tr>
                            <td class="center">${formatDate(event.recordDate)}</td>
                            <td>${event.title}</td>
                            <td class="center">${formatDate(event.executionDate)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>` : '<p class="placeholder-text">Không tìm thấy sự kiện cổ tức trong khoảng thời gian đã chọn.</p>'}


            <table>
                <thead>
                     <tr class="assessment-header">
                        <th class="center" style="width:40%;">ĐÁNH GIÁ TỔNG QUAN</th>
                        <th class="center" style="width:15%;">${achievedStars} / ${totalStars}</th>
                        <th class="center" id="star-rating" style="width:45%;">${generateStarRating(achievedStars, totalStars)}</th>
                    </tr>
                    <tr>
                        <th>Chỉ số Phân tích</th>
                        <th class="center">Giá trị</th>
                        <th>Nhận định Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><i class="fas fa-dollar-sign icon"></i> Giá thị trường</td>
                        <td class="value">${safeFormatNumber(marketPrice)} đ</td>
                        <td><span class="comment">${commentary.marketPrice}</span></td>
                    </tr>
                     <tr>
                        <td><i class="fas fa-chart-line icon"></i> Lợi nhuận trên cổ phiếu (EPS - TB 4 quý)</td>
                        <td class="value">${safeFormatNumber(avgEPS)} đ</td>
                         <td><span class="comment">${commentary.avgEPS}</span></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-percentage icon"></i> Giá / Lợi nhuận (P/E - TB 4 quý)</td>
                        <td class="value">${safeFormatNumber(avgPE, 2)} x</td>
                         <td><span class="comment">${commentary.avgPE}</span></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-book icon"></i> Giá / Giá trị sổ sách (P/B - TB 4 quý)</td>
                        <td class="value">${safeFormatNumber(avgPB, 2)} x</td>
                        <td><span class="comment">${commentary.avgPB}</span></td>
                    </tr>
                     <tr>
                        <td><i class="fas fa-receipt icon"></i> Giá / Doanh thu (P/S - TB 4 quý)</td>
                        <td class="value">${safeFormatNumber(avgPS, 2)} x</td>
                        <td><span class="comment">${commentary.avgPS}</span></td>
                    </tr>
                     <tr>
                        <td><i class="fas fa-wave-square icon"></i> Hệ số Beta (Mức độ rủi ro thị trường)</td>
                        <td class="value">${safeFormatNumber(betaStock, 2)}</td>
                        <td><span class="comment">${commentary.betaStock}</span></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-users icon"></i> Tỷ lệ cổ phiếu lưu hành tự do (FSR)</td>
                        <td class="value">${safeFormatNumber(floatingShareRatio * 100, 1)} %</td>
                         <td><span class="comment">${commentary.floatingShareRatio}</span></td>
                    </tr>
                     <tr>
                        <td><i class="fas fa-landmark icon"></i> Lợi nhuận / Tổng tài sản (ROA - TB 4 quý)</td>
                        <td class="value">${safeFormatNumber(avgROA * 100, 1)} %</td>
                        <td><span class="comment">${commentary.avgROA}</span></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-gem icon"></i> Lợi nhuận / Vốn chủ sở hữu (ROE - TB 4 quý)</td>
                        <td class="value">${safeFormatNumber(avgROE * 100, 1)} %</td>
                         <td><span class="comment">${commentary.avgROE}</span></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-file-invoice icon"></i> Doanh thu / Cổ phiếu (SPS - TB 4 quý)</td>
                        <td class="value">${safeFormatNumber(avgSalePerShare)} đ</td>
                        <td><span class="comment">${commentary.avgSalePerShare}</span></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-balance-scale icon"></i> Giá trị sổ sách / Cổ phiếu (BVPS - TB 4 quý)</td>
                        <td class="value">${safeFormatNumber(avgBookValuePerShare)} đ</td>
                        <td><span class="comment">${commentary.avgBookValuePerShare}</span></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-building icon"></i> GT sổ sách hữu hình / CP (TBVPS - TB 4 quý)</td>
                        <td class="value">${safeFormatNumber(avgTangibleBookValuePerShare)} đ</td>
                        <td><span class="comment">${commentary.avgTangibleBookValuePerShare}</span></td>
                    </tr>
                    <tr> <td colspan="3" style="background-color: #f0f0f0; text-align:center; font-weight:bold;">ƯỚC TÍNH GIÁ TRỊ HỢP LÝ THEO CÁC PHƯƠNG PHÁP</td> </tr>
                    <tr>
                        <td><i class="fas fa-calculator icon"></i> Định giá theo P/E * EPS</td>
                        <td class="value">${safeFormatNumber(pricePE_EPS)} đ</td>
                        <td><span class="comment">${commentary.pricePE_EPS}</span></td>
                    </tr>
                     <tr>
                        <td><i class="fas fa-calculator icon"></i> Định giá theo P/S * SPS</td>
                        <td class="value">${safeFormatNumber(pricePS_SPS)} đ</td>
                        <td><span class="comment">${commentary.pricePS_SPS}</span></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-calculator icon"></i> Định giá theo P/B * BVPS</td>
                        <td class="value">${safeFormatNumber(pricePB_BVPS)} đ</td>
                         <td><span class="comment">${commentary.pricePB_BVPS}</span></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-graduation-cap icon"></i> Định giá theo Graham (đầy đủ)</td>
                        <td class="value">${!isNaN(priceGraham1) ? safeFormatNumber(priceGraham1) + ' đ' : 'N/A'}</td>
                        <td><span class="comment">${commentary.priceGraham1}</span></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-graduation-cap icon"></i> Định giá theo Graham (rút gọn)</td>
                        <td class="value">${!isNaN(priceGraham2) ? safeFormatNumber(priceGraham2) + ' đ' : 'N/A'}</td>
                        <td><span class="comment">${commentary.priceGraham2}</span></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-graduation-cap icon"></i> Định giá theo Graham (căn bậc hai)</td>
                        <td class="value">${!isNaN(priceGraham3) ? safeFormatNumber(priceGraham3) + ' đ' : 'N/A'}</td>
                        <td><span class="comment">${commentary.priceGraham3}</span></td>
                    </tr>
                     <tr> <td colspan="3" style="background-color: #e9f5ff; text-align:center; font-weight:bold;">KẾT LUẬN GIÁ TRỊ HỢP LÝ ƯỚC TÍNH</td> </tr>
                    <tr>
                        <td><i class="fas fa-check-circle icon" style="color: var(--secondary-darker)"></i> Định giá Trung bình Trọng số</td>
                        <td class="value" style="font-weight: bold; font-size: 1.1em;">${safeFormatNumber(avgValuationPrice)} đ</td>
                        <td><span class="comment" style="font-weight: bold;">${commentary.avgValuationPrice}</span></td>
                    </tr>
                </tbody>
            </table>
            <p style="text-align: center; font-size: 0.8em; color: #777; margin-top: 20px;">
                <i><strong>Lưu ý quan trọng </strong>: Các thông tin và nhận định trên được cung cấp chỉ nhằm mục đích tham khảo, <strong>không cấu thành lời khuyên hay khuyến nghị đầu tư dưới bất kỳ hình thức nào<strong>. Nhà đầu tư <strong>cần tự thực hiện phân tích, đánh giá và chịu trách nhiệm hoàn toàn</strong> về mọi quyết định đầu tư của mình.</i>
            </p>
        `;

    } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error); // Log lỗi chi tiết vào console
        resultDiv.innerHTML = `<p class="placeholder-text error-text"><i class="fas fa-exclamation-circle"></i> Có lỗi xảy ra: ${error.message}. Vui lòng thử lại hoặc kiểm tra mã cổ phiếu.</p>`;
    }
}

// --- Các hàm tiện ích khác ---

// Mở link Fireant
function openFireant(code) {
    if (code) {
        window.open(`https://fireant.vn/ma-chung-khoan/${code}`, '_blank');
    }
}

// Mở link Vietstock
function openVietstock(code) {
    if (code) {
        window.open(`https://finance.vietstock.vn/${code}/tin-moi-nhat.htm`, '_blank'); // Mở hồ sơ DN
    }
}
// Mở link TradingView
function openTradingView(exchange, code) {
     if (code && exchange && exchange !== 'N/A') {
         // Chuẩn hóa mã sàn cho TradingView (HNX, HOSE, UPCOM)
         let tvExchange = exchange.toUpperCase();
         if (tvExchange === 'HSX') tvExchange = 'HOSE'; // TradingView dùng HOSE thay vì HSX
         window.open(`https://vn.tradingview.com/chart/?symbol=${tvExchange}:${code}`, '_blank');
     } else if (code) {
        // Nếu không có sàn, thử mở tìm kiếm chung
         window.open(`https://vn.tradingview.com/symbols/${code}/`, '_blank');
     }
}

// --- Hàm phụ trợ phân tích tỷ lệ ---
/**
 * ******************************************************************
 * TAB TÍNH GIÁ CỔ PHIẾU NGÀY GIAO DỊCH KHÔNG HƯỞNG QUYỀN - BẮT ĐẦU
 * ******************************************************************
 */

/**
 * Phân tích chuỗi đầu vào để lấy tỷ lệ hoặc giá trị tiền mặt (hỗ trợ định dạng VN).
 * @param {string} inputString Chuỗi đầu vào (VD: "100:10", "10,5%", "1.000/10", "1.500,5").
 * @param {'ratio' | 'cash'} type Loại tỷ lệ cần phân tích.
 * @param {number} parValue Mệnh giá cổ phiếu.
 * @returns {number} Tỷ lệ số thập phân hoặc giá trị tiền mặt/cp. Trả về NaN nếu lỗi.
 */
function parseRatioInput(inputString, type, parValue = 10000) {
    if (!inputString || typeof inputString !== 'string') {
        return 0;
    }
    const str = inputString.trim();

    // 1. Kiểm tra định dạng phần trăm (%)
    if (str.endsWith('%')) {
        // Lấy phần số trước %, chuẩn hóa nó (thay ',' bằng '.') rồi parse
        const percentageStr = str.slice(0, -1).trim().replace(/,/, '.');
        const percentage = parseFloat(percentageStr); // Dùng parseFloat chuẩn cho %
        if (isNaN(percentage)) return NaN;
        const ratio = percentage / 100;
        return type === 'cash' ? ratio * parValue : ratio;
    }

    // 2. Kiểm tra định dạng X:Y hoặc X/Y
    let delimiter = null;
    if (str.includes(':')) delimiter = ':';
    else if (str.includes('/')) delimiter = '/';

    if (delimiter) {
        const parts = str.split(delimiter);
        if (parts.length !== 2) return NaN;

        // Dùng hàm mới để parse các phần X và Y
        const x = parseVietnameseFloat(parts[0]);
        const y = parseVietnameseFloat(parts[1]);

        // Kiểm tra X, Y hợp lệ
         if (isNaN(x) || isNaN(y) || (x === 0 && !(type === 'cash' && delimiter === ':' && parts[0].trim() === '1'))) {
              // Chỉ cho phép x=1 nếu là dạng 1:Amount cho cash
              if(type === 'cash' && delimiter === ':' && parts[0].trim() === '1' && !isNaN(y)){
                 // Bỏ qua kiểm tra x=0 nếu là dạng 1:Amount
              } else {
                 return NaN; // Lỗi nếu x, y không hợp lệ hoặc x=0 (trừ TH 1:Amount)
              }
         }

        if (type === 'cash') {
             // Xử lý đặc biệt cho dạng 1:Amount
             if (delimiter === ':' && parts[0].trim() === '1' && !isNaN(y)) {
                 return y; // Trả về trực tiếp Amount
             }
             if (x === 0) return NaN; // Không thể chia cho 0
            return y / x; // Số tiền trên mỗi cổ phiếu sở hữu
        } else { // type === 'ratio'
            if (x === 0) return NaN; // Không thể chia cho 0
            return y / x; // Tỷ lệ cổ phiếu mới / cổ phiếu cũ
        }
    }

    // 3. Nếu không phải % hay X:Y, X/Y -> thử parse thành số trực tiếp dùng hàm mới
    const directValue = parseVietnameseFloat(str);
    if (isNaN(directValue)) return NaN; // Lỗi nếu không parse được

    if (type === 'cash') {
        return directValue; // Là giá trị tiền mặt trực tiếp (VD: 1.500 hoặc 2.000,5)
    } else { // type === 'ratio'
        // Tỷ lệ chỉ hợp lệ nếu là 0 khi nhập trực tiếp
        return directValue === 0 ? 0 : NaN;
    }
}


// --- Hàm tính giá GDKHQ mới (thay thế hàm calculatePrice cũ) ---

async function calculateAdjustedPrice() {
    const preGDKHQInputElem = document.getElementById('preGDKHQInput');
    const paInputElem = document.getElementById('Pa');
    const phtRatioInputElem = document.getElementById('phtRatioInput');
    const cashDividendInputElem = document.getElementById('cashDividendInput');
    const stockDividendRatioInputElem = document.getElementById('stockDividendRatioInput');
    const resultDiv = document.getElementById('resultGDKHQ');
    const loadingDiv = document.getElementById('loadingGDKHQ');

    resultDiv.innerHTML = ''; // Xóa kết quả cũ
    resultDiv.classList.remove('show');
    loadingDiv.style.display = 'none'; // Ẩn loading mặc định

    // --- Lấy giá trị đầu vào ---
    const preGDKHQValue = preGDKHQInputElem.value.trim();
    // Lấy giá PHT, đảm bảo là số không âm
    const paValue = Math.max(0, parseVietnameseFloat(paInputElem.value) || 0);
    const phtRatioStr = phtRatioInputElem.value;
    const cashDividendStr = cashDividendInputElem.value;
    const stockDividendRatioStr = stockDividendRatioInputElem.value;

    let P = 0; // Giá trước GDKHQ sẽ được xác định

    // --- Xử lý Giá trước GDKHQ (P) ---
    if (!preGDKHQValue) {
        resultDiv.innerText = 'Lỗi: Vui lòng nhập Giá trước GDKHQ hoặc Mã Cổ phiếu.';
        resultDiv.classList.add('show'); // Hiển thị lỗi
        preGDKHQInputElem.focus();
        return;
    }

    // Thử kiểm tra xem có phải mã cổ phiếu không (VD: 3-10 ký tự chữ cái/số) - linh hoạt hơn
    const isStockCode = /^[A-Z0-9]{3,10}$/i.test(preGDKHQValue);
    // Cố gắng parse thành số để kiểm tra xem có phải người dùng nhập số không
    const parsedPrice = parseVietnameseFloat(preGDKHQValue);
    if (isStockCode && isNaN(parsedPrice)) { // Ưu tiên nếu trông giống mã CK và không phải là số
        loadingDiv.style.display = 'block'; // Hiện loading
        try {
             const stockCode = preGDKHQValue.toUpperCase();
             console.log(`Đang lấy giá cho mã: ${stockCode}`); // Log để debug
             const response = await fetch(`https://webproxy.vodang2702.workers.dev/?url=https://iboard-query.ssi.com.vn/stock/${stockCode}`, {
                 headers: { 'accept': 'application/json' }
             });

             // Log trạng thái response
             console.log(`Response status cho ${stockCode}: ${response.status}`);

            if (!response.ok) {
                 let errorMsg = `Không tìm thấy mã CK "${stockCode}" hoặc lỗi API (${response.status})`;
                 try { // Cố gắng đọc lỗi chi tiết từ API nếu có
                     const errorData = await response.json();
                     console.error("API error data:", errorData);
                     errorMsg += ` - ${errorData.message || JSON.stringify(errorData)}`;
                 } catch(e) { /* ignore if no JSON body */ }
                 throw new Error(errorMsg);
            }

            const stockTransaction = await response.json();
             console.log(`Dữ liệu giao dịch cho ${stockCode}:`, stockTransaction); // Log dữ liệu nhận được

            if (!stockTransaction.data || stockTransaction.data.matchedPrice == null) {
                 throw new Error(`Không lấy được giá khớp lệnh (matchedPrice) cho mã ${stockCode}. Dữ liệu trả về có thể không đúng định dạng.`);
            }
            P = parseFloat(stockTransaction.data.matchedPrice);
            if (isNaN(P) || P <= 0) {
                 throw new Error(`Giá khớp lệnh nhận được (${stockTransaction.data.matchedPrice}) không hợp lệ cho mã ${stockCode}.`);
            }
            // Cập nhật lại giá trị vào ô input để người dùng thấy rõ giá đã lấy
            preGDKHQInputElem.value = formatNumber(P, 0); // Định dạng lại số

        } catch (error) {
            console.error("Lỗi khi lấy giá cổ phiếu:", error);
            resultDiv.innerText = `Lỗi: ${error.message}`;
            resultDiv.classList.add('show');
            loadingDiv.style.display = 'none';
            return; // Dừng nếu lỗi
        } finally {
             loadingDiv.style.display = 'none'; // Luôn ẩn loading sau khi xong
        }
    } else {
        // Nếu không phải mã CK HOẶC là số -> coi như người dùng nhập giá trực tiếp
        P = parsedPrice; // Sử dụng giá trị đã parse ở trên
        if (isNaN(P) || P <= 0) {
            resultDiv.innerText = 'Lỗi: Giá trị nhập vào không phải là Mã CK hợp lệ hoặc Giá > 0.';
            resultDiv.classList.add('show');
            preGDKHQInputElem.focus();
            return;
        }
         // Nếu người dùng nhập số, cũng format lại cho đẹp
         preGDKHQInputElem.value = formatNumber(P, 0);
    }
    // Kiểm tra giá trị P > 1000
    if (P <= 1000) {
        resultDiv.innerText = `Lỗi: Giá trước GDKHQ (${formatNumber(P, 0)} VNĐ) phải lớn hơn 1.000 VNĐ.`;
        resultDiv.classList.add('show'); // Hiển thị thông báo lỗi
        preGDKHQInputElem.focus(); // Focus lại vào ô nhập giá
        return; // Dừng thực thi hàm nếu giá không hợp lệ
    }
    // --- Phân tích các tỷ lệ ---
     let hasError = false;
     const errors = [];

     // Gọi parseRatioInput, đảm bảo kết quả không âm
     const a = Math.max(0, parseRatioInput(phtRatioStr, 'ratio'));       // Tỷ lệ PHT
     const C = Math.max(0, parseRatioInput(cashDividendStr, 'cash'));     // Tiền mặt / CP
     const B = Math.max(0, parseRatioInput(stockDividendRatioStr, 'ratio')); // Tỷ lệ cổ tức CP

     // Kiểm tra lỗi NaN sau khi đã gọi parseRatioInput
     if (isNaN(parseRatioInput(phtRatioStr, 'ratio'))) { // Kiểm tra lại với kết quả gốc trước khi Math.max
         hasError = true; errors.push("Định dạng Tỷ lệ PHT không hợp lệ.");
     }
     if (isNaN(parseRatioInput(cashDividendStr, 'cash'))) {
         hasError = true; errors.push("Định dạng Cổ tức tiền mặt không hợp lệ.");
     }
     if (isNaN(parseRatioInput(stockDividendRatioStr, 'ratio'))) {
         hasError = true; errors.push("Định dạng Tỷ lệ Cổ tức CP không hợp lệ.");
     }

     // Hiển thị lỗi nếu có
     if (hasError) {
         resultDiv.innerHTML = "Lỗi:<br>" + errors.join("<br>");
         resultDiv.classList.add('show');
         return;
     }

     // Log các giá trị đã parse để debug
     console.log(`P: ${P}, Pa: ${paValue}, a: ${a}, C: ${C}, B: ${B}`);

    // --- Tính toán giá điều chỉnh ---
    const denominator = 1 + a + B;
    let P_prime = 0;

    if (denominator <= 0) {
         // Trường hợp này thực sự không nên xảy ra với tỷ lệ không âm
         resultDiv.innerText = 'Lỗi: Mẫu số tính toán <= 0 (Tỷ lệ không hợp lệ?).';
         resultDiv.classList.add('show');
         return;
    }

    // Công thức: P' = (P + Pa * a - C) / (1 + a + B)
    P_prime = (P + (paValue * a) - C) / denominator;
    // console.log(`Giá điều chỉnh (P'): ${P_prime}`); // Log giá điều chỉnh để debug

     // Giá điều chỉnh không thể âm (ít nhất là 0)
     P_prime = Math.max(0, P_prime);

    // --- Hiển thị kết quả ---
    resultDiv.innerText = `Giá tham chiếu điều chỉnh vào ngày GDKHQ: ${formatNumber(P_prime, 0)} VNĐ`;
    resultDiv.classList.add('show'); // Kích hoạt animation
}

/**
 * Chuyển đổi chuỗi số định dạng Việt Nam ('.' là nghìn, ',' là thập phân)
 * thành số thực chuẩn của JavaScript.
 * @param {string} inputStr Chuỗi cần chuyển đổi.
 * @returns {number} Số thực hoặc NaN nếu lỗi.
 */
function parseVietnameseFloat(inputStr) {
    if (typeof inputStr !== 'string' || !inputStr) {
        return NaN; // Trả về NaN nếu không phải chuỗi hoặc rỗng
    }
    try {
        // Bước 1: Xóa tất cả dấu chấm phân cách hàng nghìn
        const stringWithoutDots = inputStr.trim().replace(/\./g, '');
        // Bước 2: Thay dấu phẩy thập phân bằng dấu chấm
        const standardString = stringWithoutDots.replace(/,/, '.');
        // Bước 3: Dùng parseFloat để chuyển đổi chuỗi chuẩn
        return parseFloat(standardString);
    } catch (error) {
        console.error("Lỗi khi parse số VN:", inputStr, error);
        return NaN; // Trả về NaN nếu có lỗi khác
    }
}
/**
 * ******************************************************************
 * TAB TÍNH GIÁ CỔ PHIẾU NGÀY GIAO DỊCH KHÔNG HƯỞNG QUYỀN - KẾT THÚC
 * ******************************************************************
 */

// Hàm xác định class màu cho giá dựa trên các mức tham chiếu
function getPriceClass(currentPrice, referencePrice, ceilingPrice, floorPrice) {
    // Làm tròn giá về 2 chữ số thập phân để so sánh chính xác hơn (cho sàn HOSE có bước giá 10đ)
    // Hoặc có thể không cần làm tròn nếu API trả về chính xác
    // const cp = parseFloat(currentPrice.toFixed(2));
    // const rp = parseFloat(referencePrice.toFixed(2));
    // const ceilp = parseFloat(ceilingPrice.toFixed(2));
    // const floorp = parseFloat(floorPrice.toFixed(2));
    const cp = currentPrice;
    const rp = referencePrice;
    const ceilp = ceilingPrice;
    const floorp = floorPrice;


    if (cp === ceilp && cp > rp) { // Kiểm tra giá trần VÀ phải lớn hơn tham chiếu
        return 'ceiling-price';
    } else if (cp === floorp && cp < rp) { // Kiểm tra giá sàn VÀ phải nhỏ hơn tham chiếu
        return 'floor-price';
    } else if (cp > rp) {
        return 'price-up'; // Giá tăng
    } else if (cp < rp) {
        return 'price-down'; // Giá giảm
    } else {
        return 'reference-price'; // Bằng giá tham chiếu
    }
}

// Hàm định dạng số (thêm dấu phân cách hàng nghìn, làm tròn)
// decimals: số chữ số thập phân mong muốn
function formatNumber(num, decimals = 0) {
    // console.log(`Định dạng số: ${num}, với ${decimals} chữ số thập phân`);
    // Kiểm tra nếu không phải là số hợp lệ thì trả về 'N/A' hoặc 0
    if (typeof num !== 'number' || isNaN(num) || num === null) {
        return 0; // Hoặc có thể trả về 'N/A'
    }
    // Làm tròn số đến số chữ số thập phân mong muốn
    const roundedNum = num.toFixed(decimals);
    // console.log(`Số sau khi làm tròn: ${roundedNum}`);
    // Tách phần nguyên và phần thập phân (nếu có)
    const parts = roundedNum.toString().split('.');
    // console.log(`Phần nguyên: ${parts[0]}, Phần thập phân: ${parts[1]}`);
    // Thêm dấu phân cách hàng nghìn cho phần nguyên
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Sử dụng dấu '.' làm phân cách
    // console.log(`Phần nguyên sau khi thêm dấu phân cách: ${parts[0]}`);
    // Kết hợp lại phần nguyên và phần thập phân (nếu có) bằng dấu ','
    // console.log(`Kết quả cuối cùng: ${parts.join(',')}`);
    return parts.join(',');
}

// Hàm định dạng ngày từ chuỗi YYYY-MM-DD hoặc đối tượng Date thành DD/MM/YYYY
function formatDate(inputDate) {
    if (!inputDate) return 'N/A'; // Trả về 'N/A' nếu không có ngày

    try {
        let dateObj;
        if (inputDate instanceof Date) {
            dateObj = inputDate;
        } else {
            // Xử lý chuỗi ngày tháng, có thể có hoặc không có giờ phút giây
            // Cắt bỏ phần giờ nếu có (ví dụ: '2023-10-26T00:00:00')
            const datePart = inputDate.toString().split('T')[0];
            dateObj = new Date(datePart);
             // Kiểm tra xem ngày có hợp lệ không sau khi parse
             if (isNaN(dateObj.getTime())) {
                 return 'N/A';
             }
        }

        // Lấy ngày, tháng, năm (UTC để tránh lệch múi giờ khi chỉ cần ngày)
        let day = String(dateObj.getUTCDate()).padStart(2, '0');
        let month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        let year = dateObj.getUTCFullYear();

        // Trả về định dạng dd/mm/yyyy
        return `${day}/${month}/${year}`;
    } catch (error) {
        console.error("Lỗi định dạng ngày:", inputDate, error);
        return 'N/A'; // Trả về 'N/A' nếu có lỗi
    }
}

// Hàm tạo chuỗi HTML hiển thị đánh giá sao
function generateStarRating(rating, total) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = total - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '&nbsp;<i class="fa-solid fa-star"></i>'; // Sao vàng đầy
    }
    if (halfStar) {
        starsHTML += '&nbsp;<i class="fa-solid fa-star-half-stroke"></i>'; // Nửa sao vàng
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '&nbsp;<i class="fa-regular fa-star"></i>'; // Sao rỗng (viền)
    }
    return starsHTML;
}

// --- Khởi tạo ---
// Hiển thị tab đầu tiên khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    showTab('tab1');
});