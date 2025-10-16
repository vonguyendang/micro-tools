/**
 * tab-gdkhq.js
 * Chứa mã nguồn cho chức năng Tab 2: Tính giá điều chỉnh ngày GDKHQ.
 */

/**
 * Tính toán giá tham chiếu điều chỉnh vào ngày giao dịch không hưởng quyền.
 */
async function calculateAdjustedPrice() {
    // Lấy các element từ DOM
    const preGDKHQInputElem = document.getElementById('preGDKHQInput');
    const paInputElem = document.getElementById('Pa');
    const phtRatioInputElem = document.getElementById('phtRatioInput');
    const cashDividendInputElem = document.getElementById('cashDividendInput');
    const stockDividendRatioInputElem = document.getElementById('stockDividendRatioInput');
    const resultDiv = document.getElementById('resultGDKHQ');
    const loadingDiv = document.getElementById('loadingGDKHQ');

    // Reset giao diện
    resultDiv.innerHTML = '';
    resultDiv.classList.remove('show');
    loadingDiv.style.display = 'none';

    // Lấy giá trị từ các ô input
    const preGDKHQValue = preGDKHQInputElem.value.trim();
    const paValue = Math.max(0, parseVietnameseFloat(paInputElem.value) || 0);
    const phtRatioStr = phtRatioInputElem.value;
    const cashDividendStr = cashDividendInputElem.value;
    const stockDividendRatioStr = stockDividendRatioInputElem.value;

    let P = 0; // Giá trước GDKHQ

    // --- Xử lý giá trị đầu vào cho "Giá trước GDKHQ" ---
    if (!preGDKHQValue) {
        resultDiv.innerText = 'Lỗi: Vui lòng nhập Giá trước GDKHQ hoặc Mã Cổ phiếu.';
        resultDiv.classList.add('show');
        preGDKHQInputElem.focus();
        return;
    }

    const isStockCode = /^[A-Z0-9]{3,10}$/i.test(preGDKHQValue);
    const parsedPrice = parseVietnameseFloat(preGDKHQValue);

    // Nếu người dùng nhập mã cổ phiếu, gọi API để lấy giá thị trường
    if (isStockCode && isNaN(parsedPrice)) {
        loadingDiv.style.display = 'block';
        try {
            const stockCode = preGDKHQValue.toUpperCase();
            const corsProxyUrl = 'https://webproxy.vodang2702.workers.dev/?url=';
            const url = `https://iboard-query.ssi.com.vn/stock/${stockCode}`;
            const response = await fetch(corsProxyUrl + encodeURIComponent(url), { cache: 'no-store' });
            
            if (!response.ok) throw new Error(`Không tìm thấy mã CK "${stockCode}"`);
            const stockTransaction = await response.json();
            if (stockTransaction.error || !stockTransaction.data || stockTransaction.data.matchedPrice == null) {
                 throw new Error(`Không lấy được giá cho mã ${stockCode}.`);
            }
            P = parseFloat(stockTransaction.data.matchedPrice);
            if (isNaN(P) || P <= 0) throw new Error(`Giá nhận được không hợp lệ.`);
            preGDKHQInputElem.value = formatNumber(P, 0); // Cập nhật lại ô input với giá vừa lấy
        } catch (error) {
            resultDiv.innerText = `Lỗi: ${error.message}`;
            resultDiv.classList.add('show');
            return;
        } finally {
             loadingDiv.style.display = 'none';
        }
    } else {
        // Nếu người dùng nhập giá trực tiếp
        P = parsedPrice;
        if (isNaN(P) || P <= 0) {
            resultDiv.innerText = 'Lỗi: Giá trị nhập vào không hợp lệ.';
            resultDiv.classList.add('show');
            preGDKHQInputElem.focus();
            return;
        }
         preGDKHQInputElem.value = formatNumber(P, 0);
    }
    
    // Kiểm tra giá trị hợp lệ
    if (P <= 1000) {
        resultDiv.innerText = `Lỗi: Giá trước GDKHQ (${formatNumber(P, 0)} VNĐ) phải lớn hơn 1.000 VNĐ.`;
        resultDiv.classList.add('show');
        preGDKHQInputElem.focus();
        return;
    }

     // --- Chuyển đổi và kiểm tra các tỷ lệ ---
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

    // --- Áp dụng công thức tính giá điều chỉnh ---
    // P' = (P + Pa*a - C) / (1 + a + B)
    const denominator = 1 + a + B;
    if (denominator <= 0) {
         resultDiv.innerText = 'Lỗi: Mẫu số tính toán <= 0.';
         resultDiv.classList.add('show');
         return;
    }

    let P_prime = Math.max(0, (P + (paValue * a) - C) / denominator);
    
    // Cải thiện giao diện phần kết quả
    resultDiv.innerHTML = `
        <div class="gdkhq-result-box">
            <p class="gdkhq-label">GIÁ THAM CHIẾU SAU ĐIỀU CHỈNH</p>
            <p class="gdkhq-price price-up">${formatNumber(P_prime, 0)} VNĐ</p>
            <p class="gdkhq-formula">Công thức: (P + Pa*a - C) / (1 + a + B)</p>
            <p class="gdkhq-formula-detail">
                P: ${formatNumber(P, 0)} | 
                Pa: ${formatNumber(paValue, 0)} | 
                a: ${a.toFixed(4)} | 
                C: ${formatNumber(C, 0)} | 
                B: ${B.toFixed(4)}
            </p>
        </div>
    `;
    resultDiv.classList.add('show');
}

/**
 * Chuyển đổi các định dạng tỷ lệ (VD: '10%', '10:100', '2000') thành số.
 * @param {string} inputString - Chuỗi đầu vào.
 * @param {string} type - Loại tỷ lệ ('cash' hoặc 'ratio').
 * @param {number} parValue - Mệnh giá cổ phiếu (mặc định 10000).
 * @returns {number} Tỷ lệ đã được chuyển đổi.
 */
function parseRatioInput(inputString, type, parValue = 10000) {
    if (!inputString || typeof inputString !== 'string') {
        return 0;
    }
    const str = inputString.trim();
    if (str === "") return 0;

    // Định dạng phần trăm (VD: '10%')
    if (str.endsWith('%')) {
        const percentage = parseVietnameseFloat(str.slice(0, -1));
        if (isNaN(percentage)) return NaN;
        const ratio = percentage / 100;
        return type === 'cash' ? ratio * parValue : ratio;
    }

    // Định dạng tỷ lệ (VD: '10:100' hoặc '1:10')
    let delimiter = str.includes(':') ? ':' : null;
    if (delimiter) {
        const parts = str.split(delimiter);
        if (parts.length !== 2) return NaN;
        const x = parseVietnameseFloat(parts[0]);
        const y = parseVietnameseFloat(parts[1]);
        if (isNaN(x) || isNaN(y) || x === 0) return NaN;
        
        return y / x;
    }

    // Định dạng số trực tiếp (chỉ cho cổ tức tiền mặt)
    const directValue = parseVietnameseFloat(str);
    if (type === 'cash') {
        return isNaN(directValue) ? NaN : directValue;
    }

    // Nếu không phải định dạng nào ở trên, coi như không hợp lệ
    return directValue === 0 ? 0 : NaN;
}