/**
 * tab-valuation.js
 * Chứa mã nguồn cho chức năng Tab 1: Định giá Cổ phiếu.
 */

// --- Biến toàn cục để lưu trữ dữ liệu ---
let globalStockData = {};
let globalFinancialDataQuarter = [];
let globalFinancialDataYear = [];
let globalBonds = {};
let globalStockTransaction = {};
let globalDividendEvents = [];
let globalStockProfile = {};
let dividendCurrentPage = 1; // BIẾN MỚI: Quản lý trang cho bảng cổ tức

// --- Cấu hình các giai đoạn phân tích ---
const PERIODS = [
    { id: '1Q', name: 'Quý gần nhất', required: 1, source: 'q' },
    { id: '2Q', name: '2 Quý', required: 2, source: 'q' },
    { id: '3Q', name: '3 Quý', required: 3, source: 'q' },
    { id: '4Q', name: '4 Quý', required: 4, source: 'q' },
    { id: '1Y', name: '1 Năm', required: 1, source: 'y' },
    { id: '2Y', name: '2 Năm', required: 2, source: 'y' },
    { id: '3Y', name: '3 Năm', required: 3, source: 'y' },
    { id: '4Y', name: '4 Năm', required: 4, source: 'y' },
    { id: '5Y', name: '5 Năm', required: 5, source: 'y' }
];

/**
 * Hàm chính để gọi các API và lấy dữ liệu cổ phiếu.
 */
async function fetchStockData() {
    const codeInput = document.getElementById('stockCode');
    const code = codeInput.value.trim();
    const resultDiv = document.getElementById('resultValuation');

    if (!code) {
        resultDiv.innerHTML = `<p class="placeholder-text error-text"><i class="fas fa-exclamation-triangle"></i> Vui lòng nhập mã cổ phiếu.</p>`;
        codeInput.focus();
        return;
    }

    const stockCode = code.toUpperCase();
    resultDiv.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Đang tải và phân tích dữ liệu...</p>';
    dividendCurrentPage = 1; // Reset lại trang khi tìm mã mới

    try {
        const response = await fetch(`api/proxy.php?endpoint=stock_data&code=${stockCode}`);
        if (!response.ok) {
            throw new Error(`Lỗi máy chủ: ${response.statusText}`);
        }
        const allData = await response.json();

        if (allData.error) {
             throw new Error(`Lỗi từ backend: ${allData.message}`);
        }

        // Gán dữ liệu vào các biến toàn cục
        globalStockData = allData.fundamental || {};
        globalFinancialDataQuarter = allData.financial_q || [];
        globalFinancialDataYear = allData.financial_y || [];
        globalBonds = allData.bonds || {};
        globalStockTransaction = allData.transaction || {};
        globalDividendEvents = allData.events || [];
        globalStockProfile = allData.profile || {};

        const q_count = globalFinancialDataQuarter.length;
        const y_count = globalFinancialDataYear.length;
        const availablePeriods = PERIODS.filter(p => (p.source === 'q' ? q_count : y_count) >= p.required);
        const defaultPeriod = availablePeriods.find(p => p.id === '1Y') ? '1Y' : (availablePeriods.length > 0 ? availablePeriods[availablePeriods.length - 1].id : '1Q');

        updateValuationUI(defaultPeriod);
    } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
        resultDiv.innerHTML = `<p class="placeholder-text error-text"><i class="fas fa-exclamation-circle"></i> Có lỗi xảy ra: ${error.message}. Vui lòng thử lại hoặc kiểm tra mã cổ phiếu.</p>`;
    }
}


/**
 * Cập nhật giao diện định giá dựa trên giai đoạn được chọn.
 * @param {string} period - Giai đoạn phân tích (VD: '4Q', '1Y').
 */
function updateValuationUI(period = '4Q') {
    const resultDiv = document.getElementById('resultValuation');
    if (!globalStockProfile || !globalStockProfile.symbol) {
        resultDiv.innerHTML = `<p class="placeholder-text error-text">Không có dữ liệu để hiển thị. Vui lòng thực hiện tính toán trước.</p>`;
        return;
    }

    const q_count = globalFinancialDataQuarter.length;
    const y_count = globalFinancialDataYear.length;
    const availablePeriods = PERIODS.filter(p => (p.source === 'q' ? q_count : y_count) >= p.required);
    
    if (availablePeriods.length === 0) {
        renderBaseUI(); 
        const assessmentContainer = document.getElementById('assessment-container');
        if(assessmentContainer) assessmentContainer.innerHTML = `<p class="placeholder-text error-text" style="margin-top:15px;">Không có đủ dữ liệu tài chính để phân tích. Cổ phiếu có thể quá mới.</p>`;
        return;
    }

    const selectedPeriodIsValid = availablePeriods.some(p => p.id === period);
    if (!selectedPeriodIsValid) period = availablePeriods[availablePeriods.length - 1].id;

    const selectedPeriodInfo = PERIODS.find(p => p.id === period);
    const dataToProcess = selectedPeriodInfo.source === 'q'
        ? globalFinancialDataQuarter.slice(0, selectedPeriodInfo.required)
        : globalFinancialDataYear.slice(0, selectedPeriodInfo.required);

    renderBaseUI(); // Render phần tĩnh trước
    renderAssessmentUI(dataToProcess, period, selectedPeriodInfo.name, availablePeriods); // Render phần phân tích
}

/**
 * HÀM MỚI: Xử lý chuyển trang cho bảng sự kiện cổ tức.
 * @param {number} direction - Hướng chuyển trang (-1 cho lùi, 1 cho tiến).
 */
function changeDividendPage(direction) {
    const sortedEvents = [...globalDividendEvents].sort((a, b) => new Date(b.recordDate) - new Date(a.recordDate));
    const totalPages = Math.ceil(sortedEvents.length / 5);
    const newPage = dividendCurrentPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
        dividendCurrentPage = newPage;
        // Chỉ render lại toàn bộ UI để cập nhật bảng và phân trang
        // Đây là cách đơn giản nhất, tối ưu hơn có thể chỉ render lại phần bảng
        updateValuationUI(document.querySelector('.period-tab.active')?.getAttribute('onclick').match(/'([^']+)'/)[1] || '4Q');
    }
}

/**
 * Hiển thị thông tin cơ bản về cổ phiếu và thị trường.
 */
function renderBaseUI() {
    const resultDiv = document.getElementById('resultValuation');
    const transactionData = globalStockTransaction.data || {};
    const profileData = globalStockProfile || {};
    const dividendEvents = globalDividendEvents || [];
    const stockCode = profileData.symbol;
    const stockExchange = (transactionData.exchange ?? profileData.exchange ?? 'N/A').toUpperCase();
    const stockNameVi = (transactionData.companyNameVi ?? profileData.companyName ?? 'Không rõ').toUpperCase();
    const stockNameEn = (transactionData.companyNameEn ?? profileData.internationalName ?? 'Không rõ').toUpperCase();
    const companyWebsite = profileData.webAddress ?? '';
    
    const safeFormatNumber = (value, decimals = 0) => formatNumber(value ?? 0, decimals);
    
    const marketPrice = transactionData.matchedPrice ?? 0;
    const referencePrice = transactionData.refPrice ?? 0;
    const ceilingPrice = transactionData.ceiling ?? 0;
    const floorPrice = transactionData.floor ?? 0;
    const openingPrice = transactionData.openPrice ?? 0;
    const highestPrice = transactionData.highest ?? 0;
    const lowestPrice = transactionData.lowest ?? 0;
    const averagePrice = transactionData.avgPrice ?? 0;
    const priceChange = transactionData.priceChange ?? 0;
    const percentageChange = transactionData.priceChangePercent ?? 0;
    const totalVolume = transactionData.stockVol ?? 0;
       const totalBuyVolume = transactionData.stockBUVol ?? 0;
    const totalSellVolume = transactionData.stockSDVol ?? 0;
    const totalForeignBuyVolume = transactionData.buyForeignQtty ?? 0;
    const totalForeignSellVolume = transactionData.sellForeignQtty ?? 0;
    const totalInternalBuyVolume = Math.max(0, totalBuyVolume - totalForeignBuyVolume);
    const totalInternalSellVolume = Math.max(0, totalSellVolume - totalForeignSellVolume);
    const totalForeignNetFlow = totalForeignBuyVolume - totalForeignSellVolume;
    const totalInternalNetFlow = totalInternalBuyVolume - totalInternalSellVolume;
    const totalNetFlow = totalBuyVolume - totalSellVolume;

    const percentBuyVolume = totalVolume > 0 ? (totalBuyVolume / totalVolume) * 100 : 0;
    const percentSellVolume = totalVolume > 0 ? (totalSellVolume / totalVolume) * 100 : 0;
    const percentForeignBuyVolume = totalBuyVolume > 0 ? (totalForeignBuyVolume / totalBuyVolume) * 100 : 0;
    const percentInternalBuyVolume = totalBuyVolume > 0 ? (totalInternalBuyVolume / totalBuyVolume) * 100 : 0;
    const percentForeignSellVolume = totalSellVolume > 0 ? (totalForeignSellVolume / totalSellVolume) * 100 : 0;
    const percentInternalSellVolume = totalSellVolume > 0 ? (totalInternalSellVolume / totalSellVolume) * 100 : 0;


    let marketPriceClass = getPriceClass(marketPrice, referencePrice, ceilingPrice, floorPrice);
    let openingPriceClass = getPriceClass(openingPrice, referencePrice, ceilingPrice, floorPrice);
    let averagePriceClass = getPriceClass(averagePrice, referencePrice, ceilingPrice, floorPrice);
    let highestPriceClass = getPriceClass(highestPrice, referencePrice, ceilingPrice, floorPrice);
    let lowestPriceClass = getPriceClass(lowestPrice, referencePrice, ceilingPrice, floorPrice);
    let foreignNetFlowClass = totalForeignNetFlow > 0 ? 'price-up' : (totalForeignNetFlow < 0 ? 'price-down' : 'reference-price');
    let internalNetFlowClass = totalInternalNetFlow > 0 ? 'price-up' : (totalInternalNetFlow < 0 ? 'price-down' : 'reference-price');
    let netFlowClass = totalNetFlow > 0 ? 'price-up' : (totalNetFlow < 0 ? 'price-down' : 'reference-price');
    
    
    const [dateFrom, dateTo] = getFilterDate();

    // --- LOGIC MỚI: Phân trang cho bảng cổ tức ---
    let dividendTableHTML = '';
    if (dividendEvents && dividendEvents.length > 0) {
        const sortedEvents = [...dividendEvents].sort((a, b) => new Date(b.recordDate) - new Date(a.recordDate));
        const rowsPerPage = 5;
        const totalPages = Math.ceil(sortedEvents.length / rowsPerPage);
        const start = (dividendCurrentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = sortedEvents.slice(start, end);

        const tableRows = pageData.map(event => `
            <tr>
                <td class="center">${formatDate(event.recordDate)}</td>
                <td>${event.title}</td>
                <td class="center">${formatDate(event.executionDate)}</td>
            </tr>`).join('');

        const paginationControls = `
            <div class="pagination-controls dividend-pagination">
                <button onclick="changeDividendPage(-1)" ${dividendCurrentPage === 1 ? 'disabled' : ''}>&laquo; Trước</button>
                <span>Trang ${dividendCurrentPage} / ${totalPages}</span>
                <button onclick="changeDividendPage(1)" ${dividendCurrentPage === totalPages ? 'disabled' : ''}>Sau &raquo;</button>
            </div>`;

        dividendTableHTML = `
            <table>
                <thead>
                    <tr><th colspan="3" class="center">SỰ KIỆN CỔ TỨC GẦN ĐÂY (${formatDate(dateFrom)} - ${formatDate(dateTo)})</th></tr>
                    <tr><th class="center">Ngày GDKHQ</th><th>Nội dung</th><th class="center">Ngày Thực Hiện</th></tr>
                </thead>
                <tbody>${tableRows}</tbody>
            </table>
            ${totalPages > 1 ? paginationControls : ''}
        `;
    }

    resultDiv.innerHTML = `
        <table class="hidden-border">
             <tbody>
                <tr><th colspan="5" class="center">THÔNG TIN THAM KHẢO THÊM VỀ ${stockNameVi} (${stockCode})</th></tr>
                <tr><td colspan="5" class="center"><div class="button-container">
                    <button class="action-button external-link-button" onclick="openCompanyWebsite('${companyWebsite}')"><i class="fas fa-external-link-alt"></i> Website</button>
                    <button class="action-button external-link-button" onclick="openPlatform('fireant','${stockCode}')"><i class="fas fa-external-link-alt"></i> Fireant</button>
                    <button class="action-button external-link-button" onclick="openPlatform('vietstock','${stockCode}')"><i class="fas fa-external-link-alt"></i> Vietstock</button>
                    <button class="action-button external-link-button" onclick="openPlatform('vcinews','${stockCode}')"><i class="fas fa-external-link-alt"></i> Tin tức</button>
                    <button class="action-button external-link-button" onclick="openPlatform('vcievents','${stockCode}')"><i class="fas fa-external-link-alt"></i> Sự kiện</button>
                    <button class="action-button external-link-button" onclick="openPlatform('info','${stockCode}')"><i class="fas fa-external-link-alt"></i> Thông tin thêm</button>
                    <button class="action-button external-link-button" onclick="openTradingView('${stockExchange}','${stockCode}')"><i class="fas fa-external-link-alt"></i> TradingView</button>
                </div></td></tr>
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
                    <td class="price-up">KL Mua<br>${safeFormatNumber(totalBuyVolume / 1000, 1)}K (${safeFormatNumber(percentBuyVolume, 1)}%)</td>
                    <td class="price-up">Nước ngoài<br>${safeFormatNumber(totalForeignBuyVolume / 1000, 1)}K (${safeFormatNumber(percentForeignBuyVolume, 1)}%)</td>
                    <td class="price-up">Trong nước<br>${safeFormatNumber(totalInternalBuyVolume / 1000, 1)}K (${safeFormatNumber(percentInternalBuyVolume, 1)}%)</td>
                </tr>
                <tr>
                    <td class="price-down">KL Bán<br>${safeFormatNumber(totalSellVolume / 1000, 1)}K (${safeFormatNumber(percentSellVolume, 1)}%)</td>
                    <td class="price-down">Nước ngoài<br>${safeFormatNumber(totalForeignSellVolume / 1000, 1)}K (${safeFormatNumber(percentForeignSellVolume, 1)}%)</td>
                    <td class="price-down">Trong nước<br>${safeFormatNumber(totalInternalSellVolume / 1000, 1)}K (${safeFormatNumber(percentInternalSellVolume, 1)}%)</td>
                </tr>
                <tr>
                    <td class=${netFlowClass}><strong>Tổng mua ròng<br>${safeFormatNumber(totalNetFlow / 1000, 1)}K </strong></td>
                    <td class="${foreignNetFlowClass}"><strong>NN mua ròng<br>${safeFormatNumber(totalForeignNetFlow / 1000, 1)}K </strong></td>
                    <td class="${internalNetFlowClass}"><strong>TN mua ròng<br>${safeFormatNumber(totalInternalNetFlow / 1000, 1)}K </strong></td>
                </tr>
             </tbody>
         </table>
        ${dividendTableHTML}
        <div id="assessment-container"></div>
    `;
}


/**
 * Tính toán các chỉ số tài chính, định giá và hiển thị kết quả phân tích.
 * @param {Array<Object>} dataToProcess - Dữ liệu tài chính cho giai đoạn được chọn.
 * @param {string} period - Giai đoạn phân tích.
 * @param {string} periodLabel - Nhãn của giai đoạn (VD: '4 Quý').
 * @param {Array<Object>} availablePeriods - Danh sách các giai đoạn có đủ dữ liệu.
 */
function renderAssessmentUI(dataToProcess, period, periodLabel, availablePeriods) {
    const assessmentContainer = document.getElementById('assessment-container');
    const { data: transactionData = {} } = globalStockTransaction;
    const stockData = globalStockData || {};
    const bonds = globalBonds || {};
    const financialDataYear = globalFinancialDataYear || [];

    const safeFormatNumber = (value, decimals = 0) => formatNumber(value ?? 0, decimals);
    const marketPrice = transactionData.matchedPrice ?? 0;
    
    let totalEPS = 0, totalPE = 0, totalPB = 0, totalPS = 0, totalROA = 0, totalROE = 0, totalSalePerShare = 0, totalBookValuePerShare = 0, totalTangibleBookValuePerShare = 0;
    let validPeriods = 0;

    dataToProcess.forEach(data => {
        if (data.financialValues && data.financialValues.BasicEPS != null) {
             validPeriods++;
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

    const avgEPS = validPeriods > 0 ? totalEPS / validPeriods : 0;
    const avgPE = validPeriods > 0 ? totalPE / validPeriods : 0;
    const avgPB = validPeriods > 0 ? totalPB / validPeriods : 0;
    const avgPS = validPeriods > 0 ? totalPS / validPeriods : 0;
    const avgROA = validPeriods > 0 ? totalROA / validPeriods : 0;
    const avgROE = validPeriods > 0 ? totalROE / validPeriods : 0;
    const avgSalePerShare = validPeriods > 0 ? totalSalePerShare / validPeriods : 0;
    const avgBookValuePerShare = validPeriods > 0 ? totalBookValuePerShare / validPeriods : 0;
    const avgTangibleBookValuePerShare = validPeriods > 0 ? totalTangibleBookValuePerShare / validPeriods : 0;

    const pricePE_EPS = avgPE * avgEPS;
    const pricePS_SPS = avgPS * avgSalePerShare;
    const pricePB_BVPS = avgPB * avgBookValuePerShare;

    let priceGraham1 = NaN, priceGraham2 = NaN, priceGraham3 = NaN;
    let g = NaN;

    if (financialDataYear.length >= 5 && financialDataYear[4].financialValues.BasicEPS > 0 && financialDataYear[0].financialValues.BasicEPS > 0) {
       const latestEPS = financialDataYear[0].financialValues.BasicEPS;
       const oldestEPS = financialDataYear[4].financialValues.BasicEPS;
       g = Math.pow((latestEPS / oldestEPS), 1 / 4) - 1;
    }
    
    let y10;
    // Xử lý dữ liệu trái phiếu từ nguồn chính hoặc dự phòng
    const yearToFetch = new Date().getFullYear() + 1;
    if (bonds && bonds.result && bonds.result.yearly && bonds.result.yearly[yearToFetch]) {
        y10 = bonds.result.yearly[yearToFetch].lastVal; // Nguồn dự phòng
    } else if (bonds && bonds.current && bonds.current[5] && typeof bonds.current[5][1] === 'number') {
        y10 = bonds.current[5][1]; // Nguồn chính
    } else {
        y10 = 3.79; // Mặc định nếu cả hai nguồn đều lỗi
    }

    const riskFreeRateAdj = (y10 > 0 ? y10 : 4.4) + 0.5;

    if (!isNaN(g) && avgEPS > 0) {
        const cappedG = Math.min(Math.max(g, 0), 0.15);
        priceGraham1 = avgEPS * (8.5 + 2 * cappedG) * (4.4 / riskFreeRateAdj);
        priceGraham2 = avgEPS * (8.5 + 2 * cappedG);
        if (avgBookValuePerShare > 0) priceGraham3 = Math.sqrt(20 * avgEPS * avgBookValuePerShare * 0.85);
    }

    const wPE_EPS = 0.20, wPS_SPS = 0.15, wPB_BVPS = 0.15, wGraham1 = 0.25, wGraham2 = 0.10, wGraham3 = 0.15;
    let totalPrice = 0, totalWeight = 0;
    if (pricePE_EPS > 0 && !isNaN(pricePE_EPS)) { totalPrice += pricePE_EPS * wPE_EPS; totalWeight += wPE_EPS; }
    if (pricePS_SPS > 0 && !isNaN(pricePS_SPS)) { totalPrice += pricePS_SPS * wPS_SPS; totalWeight += wPS_SPS; }
    if (pricePB_BVPS > 0 && !isNaN(pricePB_BVPS)) { totalPrice += pricePB_BVPS * wPB_BVPS; totalWeight += wPB_BVPS; }
    if (priceGraham1 > 0 && !isNaN(priceGraham1)) { totalPrice += priceGraham1 * wGraham1; totalWeight += wGraham1; }
    if (priceGraham2 > 0 && !isNaN(priceGraham2)) { totalPrice += priceGraham2 * wGraham2; totalWeight += wGraham2; }
    if (priceGraham3 > 0 && !isNaN(priceGraham3)) { totalPrice += priceGraham3 * wGraham3; totalWeight += wGraham3; }
    const avgValuationPrice = totalWeight > 0 ? totalPrice / totalWeight : 0;
    
    const totalStars = 10;
    let achievedStars = 0;
    let commentary = {};

    commentary.marketPrice = `Đây là giá khớp lệnh gần nhất, dùng để so sánh với giá trị hợp lý.`;
    if (avgEPS >= 5000) { achievedStars += 1; commentary.avgEPS = `Rất tốt. Mỗi cổ phiếu làm ra trên 5,000đ lợi nhuận, cho thấy hiệu quả kinh doanh cao.`; }
    else if (avgEPS >= 3000) { achievedStars += 0.75; commentary.avgEPS = `Tốt. Lợi nhuận trên mỗi cổ phiếu ở mức khá, là một dấu hiệu tích cực.`; }
    else if (avgEPS >= 1000) { achievedStars += 0.5; commentary.avgEPS = `Khá. Công ty có lãi nhưng chưa thực sự đột phá.`; }
    else if (avgEPS > 0) { achievedStars += 0.25; commentary.avgEPS = `Thấp. Lợi nhuận còn khiêm tốn, cần xem xét thêm các yếu tố khác.`; }
    else { commentary.avgEPS = `Âm. Công ty đang kinh doanh thua lỗ, cần cẩn trọng.`; }

    if (avgPE <= 0) { commentary.avgPE = `Không áp dụng. EPS âm nên chỉ số P/E không có ý nghĩa.`; }
    else if (avgPE < 10) { achievedStars += 1; commentary.avgPE = `Hấp dẫn. Bạn chỉ mất chưa đến 10 năm để hoàn vốn nếu lợi nhuận không đổi.`; }
    else if (avgPE < 15) { achievedStars += 0.75; commentary.avgPE = `Hợp lý. Mức định giá phổ biến cho các công ty tăng trưởng ổn định.`; }
    else if (avgPE < 25) { achievedStars += 0.5; commentary.avgPE = `Khá cao. Thị trường đang kỳ vọng nhiều vào sự tăng trưởng trong tương lai.`; }
    else { achievedStars += 0.25; commentary.avgPE = `Rất cao. Định giá này đi kèm rủi ro lớn nếu công ty không đạt kỳ vọng.`; }

    if (avgPB <= 0) { commentary.avgPB = `Rất xấu. Giá trị sổ sách của công ty đang là số âm.`; }
    else if (avgPB < 1) { achievedStars += 1; commentary.avgPB = `Rẻ. Bạn đang mua cổ phiếu với giá thấp hơn giá trị sổ sách của công ty.`; }
    else if (avgPB < 1.5) { achievedStars += 0.75; commentary.avgPB = `Hợp lý. Mức giá phản ánh tương đối đúng giá trị tài sản của công ty.`; }
    else { achievedStars += 0.5; commentary.avgPB = `Khá cao. Thị trường đang trả giá cao hơn giá trị ghi sổ của tài sản.`; }

    if (avgPS <= 0) { commentary.avgPS = `Không áp dụng.`; }
    else if (avgPS < 0.8) { achievedStars += 1; commentary.avgPS = `Rất tốt. Mỗi đồng bạn bỏ ra mua cổ phiếu tạo ra hơn 1.25 đồng doanh thu.`; }
    else if (avgPS < 1.5) { achievedStars += 0.75; commentary.avgPS = `Khá. Doanh thu tạo ra trên giá cổ phiếu ở mức chấp nhận được.`; }
    else { achievedStars += 0.5; commentary.avgPS = `Khá cao. Cần doanh thu tăng trưởng mạnh để biện minh cho mức giá này.`; }
    
    const betaStock = stockData.beta ?? 0;
    if (betaStock < 1 && betaStock > 0) { achievedStars += 1; commentary.betaStock = `An toàn hơn thị trường. Cổ phiếu có xu hướng biến động ít hơn VN-Index.`; }
    else if (betaStock > 1) { achievedStars += 0.5; commentary.betaStock = `Biến động mạnh. Rủi ro cao hơn nhưng tiềm năng lợi nhuận cũng lớn hơn VN-Index.`; }
    else { achievedStars += 0.75; commentary.betaStock = `Tương đương thị trường. Biến động của cổ phiếu khá sát với VN-Index.`; }

    const fsrPercent = (stockData.freeShares / stockData.sharesOutstanding) * 100;
    if (fsrPercent < 30) { achievedStars += 0.5; commentary.floatingShareRatio = `Cô đặc. Lượng cổ phiếu trôi nổi thấp, giá có thể dễ bị chi phối.`; }
    else if (fsrPercent < 60) { achievedStars += 1; commentary.floatingShareRatio = `Cân bằng. Mức độ cô đặc vừa phải, thanh khoản tốt.`; }
    else { achievedStars += 0.75; commentary.floatingShareRatio = `Pha loãng. Lượng cổ phiếu trôi nổi lớn, khó có biến động giá đột ngột.`; }

    const avgROAPercent = avgROA * 100;
    if (avgROAPercent >= 10) { achievedStars += 1; commentary.avgROA = `Sử dụng tài sản hiệu quả. Cứ 100 đồng tài sản tạo ra ${safeFormatNumber(avgROAPercent, 1)}đ lợi nhuận.`; }
    else if (avgROAPercent >= 5) { achievedStars += 0.75; commentary.avgROA = `Tốt. Khả năng chuyển đổi tài sản thành lợi nhuận ở mức khá.`; }
    else if (avgROAPercent > 0) { achievedStars += 0.5; commentary.avgROA = `Trung bình. Cần cải thiện thêm hiệu quả sử dụng tài sản.`; }
    else { commentary.avgROA = `Yếu. Hiệu quả sử dụng tài sản thấp hoặc đang thua lỗ.`; }

    const avgROEPercent = avgROE * 100;
    if (avgROEPercent >= 20) { achievedStars += 1; commentary.avgROE = `Hiệu quả sử dụng vốn vượt trội. 100 đồng vốn chủ sở hữu tạo ra ${safeFormatNumber(avgROEPercent, 1)}đ lợi nhuận.`; }
    else if (avgROEPercent >= 15) { achievedStars += 0.75; commentary.avgROE = `Tốt. Đây là mức sinh lời trên vốn mong muốn của nhiều nhà đầu tư.`; }
    else if (avgROEPercent > 0) { achievedStars += 0.5; commentary.avgROE = `Trung bình. Khả năng sinh lời trên vốn ở mức cơ bản.`; }
    else { commentary.avgROE = `Yếu/Âm. Công ty đang không tạo ra lợi nhuận cho cổ đông.`; }

    commentary.avgSalePerShare = `Mỗi cổ phiếu đang gánh ${safeFormatNumber(avgSalePerShare)}đ doanh thu.`;
    commentary.avgBookValuePerShare = `Giá trị tài sản ròng trên mỗi cổ phiếu là ${safeFormatNumber(avgBookValuePerShare)}đ. `;
    if (marketPrice > 0 && avgBookValuePerShare > marketPrice) { achievedStars += 0.75; commentary.avgBookValuePerShare += `Cao hơn thị giá.`; }
    commentary.avgTangibleBookValuePerShare = `Nếu trừ đi tài sản vô hình, giá trị còn ${safeFormatNumber(avgTangibleBookValuePerShare)}đ/cp.`;

    const valuationMethodComment = (price, method) => {
        if (isNaN(price) || price <= 0) return `Không đủ dữ liệu cho phương pháp ${method}.`;
        let comparison = (price / marketPrice - 1) * 100;
        return `Ước tính ${safeFormatNumber(price)}đ/cp (${comparison >= 0 ? '+' : ''}${safeFormatNumber(comparison, 1)}% so với thị giá).`;
    };
    commentary.pricePE_EPS = valuationMethodComment(pricePE_EPS, 'P/E*EPS');
    commentary.pricePS_SPS = valuationMethodComment(pricePS_SPS, 'P/S*SPS');
    commentary.pricePB_BVPS = valuationMethodComment(pricePB_BVPS, 'P/B*BVPS');
    commentary.priceGraham1 = valuationMethodComment(priceGraham1, 'Graham (đầy đủ)');
    commentary.priceGraham2 = valuationMethodComment(priceGraham2, 'Graham (rút gọn)');
    commentary.priceGraham3 = valuationMethodComment(priceGraham3, 'Graham (căn)');

    commentary.avgValuationPrice = `Giá trị hợp lý ước tính là ${safeFormatNumber(avgValuationPrice)}đ/cp. `;
    if (avgValuationPrice > 0 && marketPrice > 0) {
        const diffPercent = (avgValuationPrice / marketPrice - 1) * 100;
         if (diffPercent > 15) { achievedStars += 1; commentary.avgValuationPrice += `Rẻ, cao hơn ${safeFormatNumber(diffPercent, 1)}% so với thị giá.`; }
         else if (diffPercent < -15) { achievedStars += 0.1; commentary.avgValuationPrice += `Đắt, thấp hơn ${safeFormatNumber(Math.abs(diffPercent), 1)}% so với thị giá.`; }
         else { achievedStars += 0.5; commentary.avgValuationPrice += `Hợp lý, chênh lệch ${safeFormatNumber(diffPercent, 1)}% so với thị giá.`; }
    }

    achievedStars = Math.min(Math.round(achievedStars * 2) / 2, totalStars);

    const periodTabsHTML = PERIODS.map(p => {
        const isAvailable = availablePeriods.some(ap => ap.id === p.id);
        return `<button class="period-tab ${p.id === period ? 'active' : ''}" onclick="updateValuationUI('${p.id}')" ${!isAvailable ? 'disabled title="Không đủ dữ liệu"' : ''}>${p.name}</button>`;
    }).join('');

    assessmentContainer.innerHTML = `
        <table>
            <thead>
                <tr><td colspan="3" style="border:none; padding: 10px 0;"><div class="period-tabs">${periodTabsHTML}</div></td></tr>
                 <tr class="assessment-header">
                    <th class="center" style="width:40%;">ĐÁNH GIÁ TỔNG QUAN (${periodLabel})</th>
                    <th class="center" style="width:15%;">${achievedStars} / ${totalStars}</th>
                    <th class="center" id="star-rating" style="width:45%;">${generateStarRating(achievedStars, totalStars)}</th>
                </tr>
                <tr><th>Chỉ số Phân tích</th><th class="center">Giá trị</th><th>Nhận định</th></tr>
            </thead>
            <tbody>
                <tr><td><i class="fas fa-dollar-sign icon"></i> Giá thị trường</td><td class="value">${safeFormatNumber(marketPrice)} đ</td><td><span class="comment">${commentary.marketPrice}</span></td></tr>
                <tr><td><i class="fas fa-chart-line icon"></i> EPS (${periodLabel})</td><td class="value">${safeFormatNumber(avgEPS)} đ</td><td><span class="comment">${commentary.avgEPS}</span></td></tr>
                <tr><td><i class="fas fa-percentage icon"></i> P/E (${periodLabel})</td><td class="value">${safeFormatNumber(avgPE, 2)} x</td><td><span class="comment">${commentary.avgPE}</span></td></tr>
                <tr><td><i class="fas fa-book icon"></i> P/B (${periodLabel})</td><td class="value">${safeFormatNumber(avgPB, 2)} x</td><td><span class="comment">${commentary.avgPB}</span></td></tr>
                <tr><td><i class="fas fa-receipt icon"></i> P/S (${periodLabel})</td><td class="value">${safeFormatNumber(avgPS, 2)} x</td><td><span class="comment">${commentary.avgPS}</span></td></tr>
                <tr><td><i class="fas fa-wave-square icon"></i> Hệ số Beta</td><td class="value">${safeFormatNumber(stockData.beta, 2)}</td><td><span class="comment">${commentary.betaStock}</span></td></tr>
                <tr><td><i class="fas fa-users icon"></i> Tỷ lệ CP thả nổi</td><td class="value">${safeFormatNumber((stockData.freeShares / stockData.sharesOutstanding) * 100, 1)} %</td><td><span class="comment">${commentary.floatingShareRatio}</span></td></tr>
                <tr><td><i class="fas fa-landmark icon"></i> ROA (${periodLabel})</td><td class="value">${safeFormatNumber(avgROA * 100, 1)} %</td><td><span class="comment">${commentary.avgROA}</span></td></tr>
                <tr><td><i class="fas fa-gem icon"></i> ROE (${periodLabel})</td><td class="value">${safeFormatNumber(avgROE * 100, 1)} %</td><td><span class="comment">${commentary.avgROE}</span></td></tr>
                <tr><td><i class="fas fa-file-invoice icon"></i> Doanh thu/CP (${periodLabel})</td><td class="value">${safeFormatNumber(avgSalePerShare)} đ</td><td><span class="comment">${commentary.avgSalePerShare}</span></td></tr>
                <tr><td><i class="fas fa-balance-scale icon"></i> GT Sổ sách/CP (${periodLabel})</td><td class="value">${safeFormatNumber(avgBookValuePerShare)} đ</td><td><span class="comment">${commentary.avgBookValuePerShare}</span></td></tr>
                <tr><td><i class="fas fa-building icon"></i> GTSS Hữu hình/CP (${periodLabel})</td><td class="value">${safeFormatNumber(avgTangibleBookValuePerShare)} đ</td><td><span class="comment">${commentary.avgTangibleBookValuePerShare}</span></td></tr>
                
                <tr><td colspan="3" style="background-color: #f0f0f0; text-align:center; font-weight:bold;">ƯỚC TÍNH GIÁ TRỊ HỢP LÝ (${periodLabel})</td></tr>
                <tr><td><i class="fas fa-calculator icon"></i> Định giá P/E * EPS</td><td class="value">${safeFormatNumber(pricePE_EPS)} đ</td><td><span class="comment">${commentary.pricePE_EPS}</span></td></tr>
                <tr><td><i class="fas fa-calculator icon"></i> Định giá P/S * SPS</td><td class="value">${safeFormatNumber(pricePS_SPS)} đ</td><td><span class="comment">${commentary.pricePS_SPS}</span></td></tr>
                <tr><td><i class="fas fa-calculator icon"></i> Định giá P/B * BVPS</td><td class="value">${safeFormatNumber(pricePB_BVPS)} đ</td><td><span class="comment">${commentary.pricePB_BVPS}</span></td></tr>
                <tr><td><i class="fas fa-graduation-cap icon"></i> Graham (đầy đủ)</td><td class="value">${!isNaN(priceGraham1) ? safeFormatNumber(priceGraham1) + ' đ' : 'N/A'}</td><td><span class="comment">${commentary.priceGraham1}</span></td></tr>
                <tr><td colspan="3" style="background-color: #e9f5ff; text-align:center; font-weight:bold;">KẾT LUẬN GIÁ TRỊ HỢP LÝ</td></tr>
                <tr>
                    <td><i class="fas fa-check-circle icon"></i> Định giá TB Trọng số</td>
                    <td class="value" style="font-weight: bold; font-size: 1.1em;">${safeFormatNumber(avgValuationPrice)} đ</td>
                    <td><span class="comment" style="font-weight: bold;">${commentary.avgValuationPrice}</span></td>
                </tr>
            </tbody>
        </table>
        <p style="text-align: center; font-size: 0.8em; color: #777; margin-top: 20px;">
            <i><strong>Lưu ý:</strong> Các thông tin trên chỉ nhằm mục đích tham khảo, <strong>không phải là khuyến nghị đầu tư</strong>.</i>
        </p>
    `;
}

// Các hàm tiện ích khác
function openCompanyWebsite(url) {
    if (url) {
        let cleanUrl = url.replace(/www\./gi, '').replace(/\s+/g, '');
        if (!/^https?:\/\//i.test(cleanUrl)) cleanUrl = `https://${cleanUrl}`;
        window.open(cleanUrl, '_blank');
    }
}

// Định nghĩa ánh xạ nền tảng → hàm sinh URL
const baseUrls = {
  fireant: code => `https://fireant.vn/ma-chung-khoan/${code}`,
  vietstock: code => `https://finance.vietstock.vn/${code}/tin-moi-nhat.htm`,
  vcinews: code => `https://trading.vietcap.com.vn/ai-news/company?ticker=${code}&newsType=business`,
  vcievents: code => `https://trading.vietcap.com.vn/iq/company?ticker=${code}&tab=events`,
  info: code => `https://stockbiz.vn/ma-chung-khoan//${code}`,
};

// Hàm tổng quát thay thế nhiều hàm riêng lẻ
function openPlatform(platform, code) {
  if (baseUrls[platform] && code) window.open(baseUrls[platform](code), '_blank');
}

function openTradingView(exchange, code) {
     if (code && exchange && exchange !== 'N/A') {
         let tvExchange = exchange.toUpperCase() === 'HSX' ? 'HOSE' : exchange.toUpperCase();
         window.open(`https://vn.tradingview.com/chart/?symbol=${tvExchange}:${code}`, '_blank');
     } else if (code) {
         window.open(`https://vn.tradingview.com/symbols/${code}/`, '_blank');
     }
}