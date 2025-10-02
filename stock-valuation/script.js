// --- Global variables to store fetched data ---
let globalStockData = {};
let globalFinancialDataQuarter = [];
let globalFinancialDataYear = [];
let globalBonds = {};
let globalStockTransaction = {};
let globalDividendEvents = [];
let globalStockProfile = {};

// --- NEW: Central configuration for analysis periods ---
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
    const selectedTab = document.querySelector(`.tab[onclick="showTab('${tabId}')"]`);
     if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

// Hàm lấy khoảng thời gian lọc sự kiện (10 năm trước đến 1 năm sau)
function getFilterDate() {
    let date = new Date();
    let fromDate = new Date(date.getFullYear() - 10, 0, 1);
    let toDate = new Date(date.getFullYear() + 1, 11, 31);

    function formatDateToISO(d) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return [formatDateToISO(fromDate), formatDateToISO(toDate)];
}

// Hàm chính để gọi API
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
    const apiKey = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDA5MTc4MDczLCJuYmYiOjE3MDkxNzgwNzMsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIzMWYzYzU5Ny1jYjZlLTQzYWEtYmRlZS01NjkyYjM3YWNiM2EiLCJhdXRoX3RpbWUiOjE3MDkxNzgwNzMsImlkcCI6Imlkc3J2IiwibmFtZSI6InZvZGFuZzI3MDJAZ21haWwuY29tIiwic2VjdXJpdHlfc3RhbXAiOiJlNjA5NTEzYy05ZDFmLTQ4NGUtOTAyNi01MTA0ZDVlNmYzNTMiLCJqdGkiOiIwNzc0MDRiNmE1ZmM3MjQ4ZmMyMmNlYmEzYjUzYjlhZCIsImFtciI6WyJwYXNzd29yZCJdfQ.yhyKMefOxXhxIFTD9YCAUnQYqGAnA7-m89g-EWX3B3N51m614d2uj3IhEMH6kl8W-zhgdWu1yfIY7PgiwIUqAKL4M-LG93roNzTN0F0tk_WCFbrpxyc3Z4Cv1uTi4A10EGCkqwnZ3sZV8ValCmzfxmDvXDoQRFuy91nznmiUFEg_YVnukVsZyASetLh6-_jYC-FsuW9ZCLAXo4QNkr6_DsJKbIywZkkofn7IsfWFMDBoa5dEiPyxfG8zMq3F3pydh_fKPjaz-oUWmewjIRwm0ohfNwvTJqs4jU0Pz4t4QmFYvRj_yrILxTc_59ewZvKb_fvuE8q3l1E7dXvIb7SYIg';
    resultDiv.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Đang tải và phân tích dữ liệu...</p>';

    const [dateFrom, dateTo] = getFilterDate();
    const urls = [
        `https://restv2.fireant.vn/symbols/${stockCode}/fundamental`,
        `https://restv2.fireant.vn/symbols/${stockCode}/financial-data?type=Q&count=4`,
        `https://restv2.fireant.vn/symbols/${stockCode}/financial-data?type=Y&count=5`,
        'https://sbcharts.investing.com/bond_charts/bonds_chart_72.json',
        `https://webproxy.vodang2702.workers.dev/?url=https://iboard-query.ssi.com.vn/stock/${stockCode}`,
        `https://restv2.fireant.vn/events/search?symbol=${stockCode}&orderBy=1&type=0&startDate=${dateFrom}&endDate=${dateTo}&offset=0&limit=20`,
        `https://restv2.fireant.vn/symbols/${stockCode}/profile`
    ];

    const headers = { 'accept': 'application/json', 'authorization': apiKey };
    const headersSSI = { 'accept': 'application/json' };

    try {
        const requests = urls.map((url, index) => {
             const currentHeaders = url.includes('iboard-query.ssi.com.vn') ? headersSSI : headers;
             if (url.includes('investing.com')) return fetch(url);
             return fetch(url, { headers: currentHeaders });
        });

        const responses = await Promise.all(requests);

        for (const response of responses) {
            if (!response.ok) {
                 let errorMsg = `Lỗi ${response.status}: ${response.statusText}`;
                 try {
                     const errorData = await response.json();
                     errorMsg += ` - ${errorData.message || JSON.stringify(errorData)}`;
                 } catch (e) { /* Ignore */ }
                 throw new Error(`Không thể tải dữ liệu cho mã ${stockCode}. ${errorMsg}`);
            }
        }

        // Store data in global variables
        [
            globalStockData,
            globalFinancialDataQuarter,
            globalFinancialDataYear,
            globalBonds,
            globalStockTransaction,
            globalDividendEvents,
            globalStockProfile
        ] = await Promise.all(responses.map(res => res.json()));

        // --- UPDATED: Smartly select the default period ---
        const q_count = globalFinancialDataQuarter.length;
        const y_count = globalFinancialDataYear.length;

        const availablePeriods = PERIODS.filter(p => {
            const source_count = p.source === 'q' ? q_count : y_count;
            return source_count >= p.required;
        });
        
        // Default to the longest available period, or fallback to 1Q
        // const defaultPeriod = availablePeriods.length > 0 ? availablePeriods[availablePeriods.length - 1].id : '1Q';
        // Default to 1Y if available, else longest available, else 1Q
        const defaultPeriod = availablePeriods.find(p => p.id === '1Y') ? '1Y' : (availablePeriods.length > 0 ? availablePeriods[availablePeriods.length - 1].id : '1Q');

        updateValuationUI(defaultPeriod);

    } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
        resultDiv.innerHTML = `<p class="placeholder-text error-text"><i class="fas fa-exclamation-circle"></i> Có lỗi xảy ra: ${error.message}. Vui lòng thử lại hoặc kiểm tra mã cổ phiếu.</p>`;
    }
}

// --- Main function to calculate and render the valuation UI ---
function updateValuationUI(period = '4Q') {
    const resultDiv = document.getElementById('resultValuation');
    if (!globalStockProfile || !globalStockProfile.symbol) {
        resultDiv.innerHTML = `<p class="placeholder-text error-text">Không có dữ liệu để hiển thị. Vui lòng thực hiện tính toán trước.</p>`;
        return;
    }

    // --- Check data availability and manage tab states ---
    const q_count = globalFinancialDataQuarter.length;
    const y_count = globalFinancialDataYear.length;

    const availablePeriods = PERIODS.filter(p => {
        const source_count = p.source === 'q' ? q_count : y_count;
        return source_count >= p.required;
    });
    
    // If no data is available for any period, show an error.
    if (availablePeriods.length === 0) {
        renderBaseUI(); 
        const assessmentContainer = document.getElementById('assessment-container');
        if(assessmentContainer) {
            assessmentContainer.innerHTML = `<p class="placeholder-text error-text" style="margin-top:15px;">Không có đủ dữ liệu tài chính để phân tích. Cổ phiếu có thể quá mới.</p>`;
        }
        return;
    }

    const selectedPeriodIsValid = availablePeriods.some(p => p.id === period);
    if (!selectedPeriodIsValid) {
        period = availablePeriods[availablePeriods.length - 1].id;
    }


    // --- Select data based on the chosen period ---
    let dataToProcess = [];
    const selectedPeriodInfo = PERIODS.find(p => p.id === period);
    const periodLabel = selectedPeriodInfo.name;

    if (selectedPeriodInfo.source === 'q') {
        dataToProcess = globalFinancialDataQuarter.slice(0, selectedPeriodInfo.required);
    } else {
        dataToProcess = globalFinancialDataYear.slice(0, selectedPeriodInfo.required);
    }

    // --- Render Base UI (once) ---
    renderBaseUI();

    // --- Calculate and Render Assessment UI ---
    renderAssessmentUI(dataToProcess, period, periodLabel, availablePeriods);
}


function renderBaseUI() {
    const resultDiv = document.getElementById('resultValuation');
    const transactionData = globalStockTransaction.data || {};
    const profileData = globalStockProfile || {};
    const dividendEvents = globalDividendEvents || [];
    const stockCode = profileData.symbol;
    const stockExchange = (transactionData.exchange ?? profileData.exchange ?? 'N/A').toUpperCase();
    const stockNameVi = (transactionData.companyNameVi ?? profileData.companyName ?? 'Không rõ').toUpperCase();
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

    resultDiv.innerHTML = `
        <style>.result .comment { font-style: italic; color: #555; } .error-text { color: var(--error-color); font-weight: bold; }</style>
        <table class="hidden-border">
             <tbody>
                <tr><th colspan="5" class="center">THÔNG TIN THAM KHẢO THÊM VỀ ${stockNameVi} (${stockCode})</th></tr>
                <tr><td colspan="5" class="center"><div class="button-container">
                    <button class="action-button external-link-button" onclick="openCompanyWebsite('${companyWebsite}')"><i class="fas fa-external-link-alt"></i> Website DN</button>
                    <button class="action-button external-link-button" onclick="openFireant('${stockCode}')"><i class="fas fa-external-link-alt"></i> Fireant</button>
                    <button class="action-button external-link-button" onclick="openVietstock('${stockCode}')"><i class="fas fa-external-link-alt"></i> Vietstock</button>
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
        ${dividendEvents && dividendEvents.length > 0 ? `
        <table>
            <thead>
                <tr><th colspan="3" class="center">SỰ KIỆN CỔ TỨC GẦN ĐÂY (${formatDate(dateFrom)} - ${formatDate(dateTo)})</th></tr>
                <tr><th class="center">Ngày GDKHQ</th><th>Nội dung</th><th class="center">Ngày Thực Hiện</th></tr>
            </thead>
            <tbody>
                ${dividendEvents.map(event => `
                    <tr>
                        <td class="center">${formatDate(event.recordDate)}</td>
                        <td>${event.title}</td>
                        <td class="center">${formatDate(event.executionDate)}</td>
                    </tr>`).join('')}
            </tbody>
        </table>` : ''}
        <div id="assessment-container"></div>
    `;
}

function renderAssessmentUI(dataToProcess, period, periodLabel, availablePeriods) {
    const assessmentContainer = document.getElementById('assessment-container');
    const { data: transactionData = {} } = globalStockTransaction;
    const stockData = globalStockData || {};
    const bonds = globalBonds || {};
    const financialDataYear = globalFinancialDataYear || [];

    const safeFormatNumber = (value, decimals = 0) => formatNumber(value ?? 0, decimals);
    const marketPrice = transactionData.matchedPrice ?? 0;
    
    // --- Calculations ---
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

    const y10 = (bonds && bonds.current && bonds.current[5] && typeof bonds.current[5][1] === 'number') ? bonds.current[5][1] : 4.4;
    const riskFreeRateAdj = (y10 > 0 ? y10 : 4.4) + 0.5;

    if (!isNaN(g) && avgEPS > 0) {
        const cappedG = Math.min(Math.max(g, 0), 0.15);
        priceGraham1 = avgEPS * (8.5 + 2 * cappedG) * (4.4 / riskFreeRateAdj);
        priceGraham2 = avgEPS * (8.5 + 2 * cappedG);
        if (avgBookValuePerShare > 0) {
             priceGraham3 = Math.sqrt(20 * avgEPS * avgBookValuePerShare * 0.85);
        }
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
    
    // --- Commentary and Scoring ---
    const totalStars = 10;
    let achievedStars = 0;
    let commentary = {};

    commentary.marketPrice = `Giá trị tham khảo tại thời điểm phân tích.`;
    if (avgEPS >= 5000) { achievedStars += 1; commentary.avgEPS = `Rất tốt (${safeFormatNumber(avgEPS)}đ). Cho thấy hiệu quả sinh lời cao trên mỗi cổ phần.`; }
    else if (avgEPS >= 3000) { achievedStars += 0.75; commentary.avgEPS = `Tốt (${safeFormatNumber(avgEPS)}đ). Công ty tạo ra lợi nhuận đáng kể.`; }
    else if (avgEPS >= 1000) { achievedStars += 0.5; commentary.avgEPS = `Khá (${safeFormatNumber(avgEPS)}đ). Khả năng sinh lời ở mức chấp nhận được.`; }
    else if (avgEPS > 0) { achievedStars += 0.25; commentary.avgEPS = `Thấp (${safeFormatNumber(avgEPS)}đ). Lợi nhuận trên cổ phần còn hạn chế.`; }
    else { commentary.avgEPS = `Âm (${safeFormatNumber(avgEPS)}đ). Công ty đang thua lỗ.`; }

    if (avgPE <= 0) { commentary.avgPE = `Âm/0 (${safeFormatNumber(avgPE, 2)}x). Công ty đang thua lỗ, khó định giá.`; }
    else if (avgPE < 10) { achievedStars += 1; commentary.avgPE = `Thấp (${safeFormatNumber(avgPE, 2)}x). Hấp dẫn nếu nền tảng tốt.`; }
    else if (avgPE < 15) { achievedStars += 0.75; commentary.avgPE = `Hợp lý (${safeFormatNumber(avgPE, 2)}x). Phản ánh mức định giá vừa phải.`; }
    else if (avgPE < 25) { achievedStars += 0.5; commentary.avgPE = `Khá cao (${safeFormatNumber(avgPE, 2)}x). Cho thấy kỳ vọng tăng trưởng.`; }
    else { achievedStars += 0.25; commentary.avgPE = `Cao (${safeFormatNumber(avgPE, 2)}x). Rủi ro điều chỉnh cao.`; }

    if (avgPB <= 0) { commentary.avgPB = `Âm/0 (${safeFormatNumber(avgPB, 2)}x). Tình hình tài chính rất xấu.`; }
    else if (avgPB < 1) { achievedStars += 1; commentary.avgPB = `Thấp (<1) (${safeFormatNumber(avgPB, 2)}x). Giá thấp hơn giá trị sổ sách.`; }
    else if (avgPB < 1.5) { achievedStars += 0.75; commentary.avgPB = `Hợp lý (${safeFormatNumber(avgPB, 2)}x). Mức định giá cân bằng.`; }
    else { achievedStars += 0.5; commentary.avgPB = `Khá cao (${safeFormatNumber(avgPB, 2)}x). Thị trường đánh giá cao hơn giá trị sổ sách.`; }

    if (avgPS <= 0) { commentary.avgPS = `Âm/0 (${safeFormatNumber(avgPS, 2)}x).`; }
    else if (avgPS < 0.8) { achievedStars += 1; commentary.avgPS = `Thấp (<0.8) (${safeFormatNumber(avgPS, 2)}x). Giá rẻ so với doanh thu.`; }
    else if (avgPS < 1.5) { achievedStars += 0.75; commentary.avgPS = `Hợp lý (${safeFormatNumber(avgPS, 2)}x). Mức định giá cân bằng.`; }
    else { achievedStars += 0.5; commentary.avgPS = `Khá cao (${safeFormatNumber(avgPS, 2)}x).`; }
    
    const betaStock = stockData.beta ?? 0;
    if (betaStock < 1 && betaStock > 0) { achievedStars += 1; commentary.betaStock = `Thấp hơn thị trường (β = ${safeFormatNumber(betaStock, 2)}). Ít biến động hơn thị trường.`; }
    else if (betaStock > 1) { achievedStars += 0.5; commentary.betaStock = `Cao hơn thị trường (β = ${safeFormatNumber(betaStock, 2)}). Biến động mạnh hơn thị trường.`; }
    else { achievedStars += 0.75; commentary.betaStock = `Trung bình (β ≈ ${safeFormatNumber(betaStock, 2)}). Biến động tương đương thị trường.`; }

    const floatingShareRatio = stockData.sharesOutstanding > 0 ? stockData.freeShares / stockData.sharesOutstanding : 0;
    const fsrPercent = floatingShareRatio * 100;
    if (fsrPercent < 20) { achievedStars += 0.5; commentary.floatingShareRatio = `Thấp (${safeFormatNumber(fsrPercent, 1)}%). Thanh khoản có thể thấp.`; }
    else if (fsrPercent < 60) { achievedStars += 1; commentary.floatingShareRatio = `Trung bình (${safeFormatNumber(fsrPercent, 1)}%). Mức độ cô đặc vừa phải.`; }
    else { achievedStars += 0.75; commentary.floatingShareRatio = `Cao (${safeFormatNumber(fsrPercent, 1)}%). Thanh khoản tốt.`; }

    const avgROAPercent = avgROA * 100;
    if (avgROAPercent >= 10) { achievedStars += 1; commentary.avgROA = `Rất tốt (${safeFormatNumber(avgROAPercent, 1)}%). Hiệu quả sử dụng tài sản rất cao.`; }
    else if (avgROAPercent >= 5) { achievedStars += 0.75; commentary.avgROA = `Tốt (${safeFormatNumber(avgROAPercent, 1)}%).`; }
    else if (avgROAPercent > 0) { achievedStars += 0.5; commentary.avgROA = `Trung bình (${safeFormatNumber(avgROAPercent, 1)}%).`; }
    else { commentary.avgROA = `Thấp/Âm (${safeFormatNumber(avgROAPercent, 1)}%).`; }

    const avgROEPercent = avgROE * 100;
    if (avgROEPercent >= 20) { achievedStars += 1; commentary.avgROE = `Rất tốt (${safeFormatNumber(avgROEPercent, 1)}%). Sinh lời trên vốn chủ sở hữu vượt trội.`; }
    else if (avgROEPercent >= 15) { achievedStars += 0.75; commentary.avgROE = `Tốt (${safeFormatNumber(avgROEPercent, 1)}%).`; }
    else if (avgROEPercent > 0) { achievedStars += 0.5; commentary.avgROE = `Trung bình (${safeFormatNumber(avgROEPercent, 1)}%).`; }
    else { commentary.avgROE = `Thấp/Âm (${safeFormatNumber(avgROEPercent, 1)}%).`; }

    commentary.avgSalePerShare = `Mỗi cổ phiếu đại diện cho ${safeFormatNumber(avgSalePerShare)}đ doanh thu.`;
    commentary.avgBookValuePerShare = `Giá trị sổ sách là ${safeFormatNumber(avgBookValuePerShare)}đ. `;
    if (marketPrice > 0 && avgBookValuePerShare > marketPrice) {
         achievedStars += 0.75;
         commentary.avgBookValuePerShare += `Cao hơn thị giá.`;
    }
    commentary.avgTangibleBookValuePerShare = `GT sổ sách hữu hình là ${safeFormatNumber(avgTangibleBookValuePerShare)}đ/cp.`;

    const valuationMethodComment = (price, method) => {
        if (isNaN(price) || price <= 0) return `Không đủ dữ liệu hoặc kết quả âm cho phương pháp ${method}.`;
        let comparison = (price / marketPrice - 1) * 100;
        return `Định giá ${safeFormatNumber(price)}đ/cp (${comparison > 0 ? '+' : ''}${safeFormatNumber(comparison, 1)}% so với thị giá).`;
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
         if (diffPercent > 10) { achievedStars += 1; commentary.avgValuationPrice += `Cao hơn ${safeFormatNumber(diffPercent, 1)}% so với thị giá (tiềm năng).`; }
         else if (diffPercent < -10) { achievedStars += 0.1; commentary.avgValuationPrice += `Thấp hơn ${safeFormatNumber(Math.abs(diffPercent), 1)}% so với thị giá (có thể đắt).`; }
         else { achievedStars += 0.5; commentary.avgValuationPrice += `Quanh (${safeFormatNumber(diffPercent, 1)}%) mức thị giá (hợp lý).`; }
    }

    achievedStars = Math.min(Math.round(achievedStars * 2) / 2, totalStars);

    // --- Generate Period Tabs HTML ---
    const periodTabsHTML = PERIODS.map(p => {
        const isAvailable = availablePeriods.some(ap => ap.id === p.id);
        return `<button 
                    class="period-tab ${p.id === period ? 'active' : ''}" 
                    onclick="updateValuationUI('${p.id}')" 
                    ${!isAvailable ? 'disabled title="Không đủ dữ liệu"' : ''}>
                    ${p.name}
                </button>`;
    }).join('');

    // --- Final HTML Rendering ---
    assessmentContainer.innerHTML = `
        <table>
            <thead>
                <tr><td colspan="3" style="border:none; padding: 10px 0;"><div class="period-tabs">${periodTabsHTML}</div></td></tr>
                 <tr class="assessment-header">
                    <th class="center" style="width:40%;">ĐÁNH GIÁ TỔNG QUAN (${periodLabel})</th>
                    <th class="center" style="width:15%;">${achievedStars} / ${totalStars}</th>
                    <th class="center" id="star-rating" style="width:45%;">${generateStarRating(achievedStars, totalStars)}</th>
                </tr>
                <tr><th>Chỉ số Phân tích</th><th class="center">Giá trị</th><th>Nhận định Chi tiết</th></tr>
            </thead>
            <tbody>
                <tr><td><i class="fas fa-dollar-sign icon"></i> Giá thị trường</td><td class="value">${safeFormatNumber(marketPrice)} đ</td><td><span class="comment">${commentary.marketPrice}</span></td></tr>
                <tr><td><i class="fas fa-chart-line icon"></i> EPS (${periodLabel})</td><td class="value">${safeFormatNumber(avgEPS)} đ</td><td><span class="comment">${commentary.avgEPS}</span></td></tr>
                <tr><td><i class="fas fa-percentage icon"></i> P/E (${periodLabel})</td><td class="value">${safeFormatNumber(avgPE, 2)} x</td><td><span class="comment">${commentary.avgPE}</span></td></tr>
                <tr><td><i class="fas fa-book icon"></i> P/B (${periodLabel})</td><td class="value">${safeFormatNumber(avgPB, 2)} x</td><td><span class="comment">${commentary.avgPB}</span></td></tr>
                <tr><td><i class="fas fa-receipt icon"></i> P/S (${periodLabel})</td><td class="value">${safeFormatNumber(avgPS, 2)} x</td><td><span class="comment">${commentary.avgPS}</span></td></tr>
                <tr><td><i class="fas fa-wave-square icon"></i> Hệ số Beta</td><td class="value">${safeFormatNumber(betaStock, 2)}</td><td><span class="comment">${commentary.betaStock}</span></td></tr>
                <tr><td><i class="fas fa-users icon"></i> Tỷ lệ CP trôi nổi (FSR)</td><td class="value">${safeFormatNumber(floatingShareRatio * 100, 1)} %</td><td><span class="comment">${commentary.floatingShareRatio}</span></td></tr>
                <tr><td><i class="fas fa-landmark icon"></i> ROA (${periodLabel})</td><td class="value">${safeFormatNumber(avgROA * 100, 1)} %</td><td><span class="comment">${commentary.avgROA}</span></td></tr>
                <tr><td><i class="fas fa-gem icon"></i> ROE (${periodLabel})</td><td class="value">${safeFormatNumber(avgROE * 100, 1)} %</td><td><span class="comment">${commentary.avgROE}</span></td></tr>
                <tr><td><i class="fas fa-file-invoice icon"></i> Doanh thu/CP (${periodLabel})</td><td class="value">${safeFormatNumber(avgSalePerShare)} đ</td><td><span class="comment">${commentary.avgSalePerShare}</span></td></tr>
                <tr><td><i class="fas fa-balance-scale icon"></i> GT Sổ sách/CP (${periodLabel})</td><td class="value">${safeFormatNumber(avgBookValuePerShare)} đ</td><td><span class="comment">${commentary.avgBookValuePerShare}</span></td></tr>
                <tr><td><i class="fas fa-building icon"></i> GTSS Hữu hình/CP (${periodLabel})</td><td class="value">${safeFormatNumber(avgTangibleBookValuePerShare)} đ</td><td><span class="comment">${commentary.avgTangibleBookValuePerShare}</span></td></tr>
                <tr><td colspan="3" style="background-color: #f0f0f0; text-align:center; font-weight:bold;">ƯỚC TÍNH GIÁ TRỊ HỢP LÝ THEO CÁC PHƯƠNG PHÁP (Dựa trên ${periodLabel})</td></tr>
                <tr><td><i class="fas fa-calculator icon"></i> Định giá theo P/E * EPS</td><td class="value">${safeFormatNumber(pricePE_EPS)} đ</td><td><span class="comment">${commentary.pricePE_EPS}</span></td></tr>
                <tr><td><i class="fas fa-calculator icon"></i> Định giá theo P/S * SPS</td><td class="value">${safeFormatNumber(pricePS_SPS)} đ</td><td><span class="comment">${commentary.pricePS_SPS}</span></td></tr>
                <tr><td><i class="fas fa-calculator icon"></i> Định giá theo P/B * BVPS</td><td class="value">${safeFormatNumber(pricePB_BVPS)} đ</td><td><span class="comment">${commentary.pricePB_BVPS}</span></td></tr>
                <tr><td><i class="fas fa-graduation-cap icon"></i> Định giá theo Graham (đầy đủ)</td><td class="value">${!isNaN(priceGraham1) ? safeFormatNumber(priceGraham1) + ' đ' : 'N/A'}</td><td><span class="comment">${commentary.priceGraham1}</span></td></tr>
                <tr><td><i class="fas fa-graduation-cap icon"></i> Định giá theo Graham (rút gọn)</td><td class="value">${!isNaN(priceGraham2) ? safeFormatNumber(priceGraham2) + ' đ' : 'N/A'}</td><td><span class="comment">${commentary.priceGraham2}</span></td></tr>
                <tr><td><i class="fas fa-graduation-cap icon"></i> Định giá theo Graham (căn)</td><td class="value">${!isNaN(priceGraham3) ? safeFormatNumber(priceGraham3) + ' đ' : 'N/A'}</td><td><span class="comment">${commentary.priceGraham3}</span></td></tr>
                <tr><td colspan="3" style="background-color: #e9f5ff; text-align:center; font-weight:bold;">KẾT LUẬN GIÁ TRỊ HỢP LÝ ƯỚC TÍNH</td></tr>
                <tr>
                    <td><i class="fas fa-check-circle icon" style="color: var(--secondary-darker)"></i> Định giá Trung bình Trọng số</td>
                    <td class="value" style="font-weight: bold; font-size: 1.1em;">${safeFormatNumber(avgValuationPrice)} đ</td>
                    <td><span class="comment" style="font-weight: bold;">${commentary.avgValuationPrice}</span></td>
                </tr>
            </tbody>
        </table>
        <p style="text-align: center; font-size: 0.8em; color: #777; margin-top: 20px;">
            <i><strong>Lưu ý:</strong> Các thông tin trên chỉ nhằm mục đích tham khảo, <strong>không phải là khuyến nghị đầu tư</strong>. Nhà đầu tư cần tự chịu trách nhiệm về quyết định của mình.</i>
        </p>
    `;
}

// **FIXED** function
function openCompanyWebsite(url) {
    if (url) {
        // Xóa tất cả phần 'www.' và khoảng trắng nếu có
        let cleanUrl = url.replace(/www\./gi, '').replace(/\s+/g, '');

        // Kiểm tra xem url có bắt đầu bằng http:// hoặc https:// không
        if (!/^https?:\/\//i.test(cleanUrl)) {
            cleanUrl = `https://${cleanUrl}`;
        }
        window.open(cleanUrl, '_blank');
    }
}

function openFireant(code) { if (code) window.open(`https://fireant.vn/ma-chung-khoan/${code}`, '_blank'); }
function openVietstock(code) { if (code) window.open(`https://finance.vietstock.vn/${code}/tin-moi-nhat.htm`, '_blank'); }
function openTradingView(exchange, code) {
     if (code && exchange && exchange !== 'N/A') {
         let tvExchange = exchange.toUpperCase() === 'HSX' ? 'HOSE' : exchange.toUpperCase();
         window.open(`https://vn.tradingview.com/chart/?symbol=${tvExchange}:${code}`, '_blank');
     } else if (code) {
         window.open(`https://vn.tradingview.com/symbols/${code}/`, '_blank');
     }
}

// Hàm tính giá GDKHQ
async function calculateAdjustedPrice() {
    const preGDKHQInputElem = document.getElementById('preGDKHQInput');
    const paInputElem = document.getElementById('Pa');
    const phtRatioInputElem = document.getElementById('phtRatioInput');
    const cashDividendInputElem = document.getElementById('cashDividendInput');
    const stockDividendRatioInputElem = document.getElementById('stockDividendRatioInput');
    const resultDiv = document.getElementById('resultGDKHQ');
    const loadingDiv = document.getElementById('loadingGDKHQ');

    resultDiv.innerHTML = '';
    resultDiv.classList.remove('show');
    loadingDiv.style.display = 'none';

    const preGDKHQValue = preGDKHQInputElem.value.trim();
    const paValue = Math.max(0, parseVietnameseFloat(paInputElem.value) || 0);
    const phtRatioStr = phtRatioInputElem.value;
    const cashDividendStr = cashDividendInputElem.value;
    const stockDividendRatioStr = stockDividendRatioInputElem.value;

    let P = 0;

    if (!preGDKHQValue) {
        resultDiv.innerText = 'Lỗi: Vui lòng nhập Giá trước GDKHQ hoặc Mã Cổ phiếu.';
        resultDiv.classList.add('show');
        preGDKHQInputElem.focus();
        return;
    }

    const isStockCode = /^[A-Z0-9]{3,10}$/i.test(preGDKHQValue);
    const parsedPrice = parseVietnameseFloat(preGDKHQValue);

    if (isStockCode && isNaN(parsedPrice)) {
        loadingDiv.style.display = 'block';
        try {
             const stockCode = preGDKHQValue.toUpperCase();
             const response = await fetch(`https://webproxy.vodang2702.workers.dev/?url=https://iboard-query.ssi.com.vn/stock/${stockCode}`);
            if (!response.ok) throw new Error(`Không tìm thấy mã CK "${stockCode}"`);
            const stockTransaction = await response.json();
            if (!stockTransaction.data || stockTransaction.data.matchedPrice == null) {
                 throw new Error(`Không lấy được giá cho mã ${stockCode}.`);
            }
            P = parseFloat(stockTransaction.data.matchedPrice);
            if (isNaN(P) || P <= 0) throw new Error(`Giá nhận được không hợp lệ.`);
            preGDKHQInputElem.value = formatNumber(P, 0);
        } catch (error) {
            resultDiv.innerText = `Lỗi: ${error.message}`;
            resultDiv.classList.add('show');
            loadingDiv.style.display = 'none';
            return;
        } finally {
             loadingDiv.style.display = 'none';
        }
    } else {
        P = parsedPrice;
        if (isNaN(P) || P <= 0) {
            resultDiv.innerText = 'Lỗi: Giá trị nhập vào không hợp lệ.';
            resultDiv.classList.add('show');
            preGDKHQInputElem.focus();
            return;
        }
         preGDKHQInputElem.value = formatNumber(P, 0);
    }
    if (P <= 1000) {
        resultDiv.innerText = `Lỗi: Giá trước GDKHQ (${formatNumber(P, 0)} VNĐ) phải lớn hơn 1.000 VNĐ.`;
        resultDiv.classList.add('show');
        preGDKHQInputElem.focus();
        return;
    }

     let hasError = false;
     const errors = [];
     const a = Math.max(0, parseRatioInput(phtRatioStr, 'ratio'));
     const C = Math.max(0, parseRatioInput(cashDividendStr, 'cash'));
     const B = Math.max(0, parseRatioInput(stockDividendRatioStr, 'ratio'));

     if (isNaN(a)) { hasError = true; errors.push("Định dạng Tỷ lệ PHT không hợp lệ."); }
     if (isNaN(C)) { hasError = true; errors.push("Định dạng Cổ tức tiền mặt không hợp lệ."); }
     if (isNaN(B)) { hasError = true; errors.push("Định dạng Tỷ lệ Cổ tức CP không hợp lệ."); }

     if (hasError) {
         resultDiv.innerHTML = "Lỗi:<br>" + errors.join("<br>");
         resultDiv.classList.add('show');
         return;
     }

    const denominator = 1 + a + B;
    if (denominator <= 0) {
         resultDiv.innerText = 'Lỗi: Mẫu số tính toán <= 0.';
         resultDiv.classList.add('show');
         return;
    }

    let P_prime = Math.max(0, (P + (paValue * a) - C) / denominator);
    resultDiv.innerText = `Giá tham chiếu điều chỉnh: ${formatNumber(P_prime, 0)} VNĐ`;
    resultDiv.classList.add('show');
}


function parseRatioInput(inputString, type, parValue = 10000) {
    if (!inputString || typeof inputString !== 'string') {
        return 0; // Return 0 for empty/null input
    }
    const str = inputString.trim();
    if (str === "") return 0; // Explicitly handle empty string after trim

    // 1. Check for percentage format
    if (str.endsWith('%')) {
        const percentage = parseVietnameseFloat(str.slice(0, -1));
        if (isNaN(percentage)) return NaN;
        const ratio = percentage / 100;
        return type === 'cash' ? ratio * parValue : ratio;
    }

    // 2. Check for X:Y or X/Y format
    let delimiter = str.includes(':') ? ':' : (str.includes('/') ? '/' : null);
    if (delimiter) {
        const parts = str.split(delimiter);
        if (parts.length !== 2) return NaN;
        const x = parseVietnameseFloat(parts[0]);
        const y = parseVietnameseFloat(parts[1]);
        if (isNaN(x) || isNaN(y) || x === 0) return NaN; // Denominator can't be zero
        
        // For cash dividend like "1:1500", it should return 1500. For "100:10" (10%) it should return 1000.
        // The y/x logic covers both. 1500/1=1500. 10/100 * 10000 = 1000
        return y / x * (type === 'cash' && !str.includes('%') ? parValue : 1);
    }

    // 3. Try to parse as a direct number (only for cash dividend)
    const directValue = parseVietnameseFloat(str);
    if (type === 'cash') {
        return isNaN(directValue) ? NaN : directValue;
    }

    // If it's for a ratio and not in %, X:Y, or X/Y format, it's invalid unless it's 0.
    return directValue === 0 ? 0 : NaN;
}


function parseVietnameseFloat(inputStr) {
    if (typeof inputStr !== 'string' || !inputStr) return NaN;
    try {
        const standardString = inputStr.trim().replace(/\./g, '').replace(/,/, '.');
        if (standardString === "") return NaN;
        return parseFloat(standardString);
    } catch (error) {
        return NaN;
    }
}

function getPriceClass(current, ref, ceil, floor) {
    if (current === ceil && current > ref) return 'ceiling-price';
    if (current === floor && current < ref) return 'floor-price';
    if (current > ref) return 'price-up';
    if (current < ref) return 'price-down';
    return 'reference-price';
}

function formatNumber(num, decimals = 0) {
    if (typeof num !== 'number' || isNaN(num) || num === null) return 0;
    const roundedNum = num.toFixed(decimals);
    const parts = roundedNum.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
}

function formatDate(inputDate) {
    if (!inputDate) return 'N/A';
    try {
        let dateObj = new Date(inputDate.toString().split('T')[0]);
        if (isNaN(dateObj.getTime())) return 'N/A';
        let day = String(dateObj.getUTCDate()).padStart(2, '0');
        let month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        let year = dateObj.getUTCFullYear();
        return `${day}/${month}/${year}`;
    } catch (error) {
        return 'N/A';
    }
}

function generateStarRating(rating, total) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = total - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < fullStars; i++) starsHTML += '&nbsp;<i class="fa-solid fa-star"></i>';
    if (halfStar) starsHTML += '&nbsp;<i class="fa-solid fa-star-half-stroke"></i>';
    for (let i = 0; i < emptyStars; i++) starsHTML += '&nbsp;<i class="fa-regular fa-star"></i>';
    return starsHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    showTab('tab1');
});