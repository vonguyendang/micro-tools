/**
 * tab-investor-support.js
 * Chứa mã nguồn cho chức năng Tab 7: Hỗ trợ Nhà Đầu Tư.
 * Cập nhật: Tích hợp tính năng Theo dõi Danh mục Đầu tư và khóa giá.
 */

// --- KHỞI TẠO KHI TẢI TRANG ---
document.addEventListener('DOMContentLoaded', () => {
    // Các hàm khởi tạo cho các tab con cũ
    addProfitLossRow();
    addAvgPriceRow();
    document.getElementById('profit-loss-table').addEventListener('input', calculateTotalProfitLoss);
    document.getElementById('avg-price-table').addEventListener('input', calculateAveragePrice);
    
    const feeToggle = document.getElementById('fee-toggle');
    feeToggle.addEventListener('change', () => {
        toggleFeeColumn(feeToggle.checked); 
        calculateTotalProfitLoss();
    });
    toggleFeeColumn(feeToggle.checked);

    // Khởi tạo cho tab danh mục
    initializePortfolioTab();
});

/**
 * Hiển thị tab con được chọn trong mục Hỗ trợ NĐT.
 * @param {string} subTabId - ID của tab con cần hiển thị.
 */
function showInvestorSubTab(subTabId) {
    document.querySelectorAll('.investor-sub-container').forEach(c => c.classList.remove('active'));
    document.getElementById(subTabId).classList.add('active');
    document.querySelectorAll('#tab7 .period-tab').forEach(b => b.classList.remove('active'));
    document.querySelector(`#tab7 .period-tab[onclick="showInvestorSubTab('${subTabId}')"]`).classList.add('active');
    
    if (subTabId === 'investor-portfolio') {
        checkLoginState();
    }
}

// =================================================================
// CHỨC NĂNG 1: TÍNH LÃI/LỖ
// =================================================================

/**
 * HÀM MỚI: Chuyển đổi trạng thái khóa/mở khóa của một ô giá.
 * @param {HTMLElement} btn - Nút khóa được nhấn.
 */
function togglePriceLock(btn) {
    const icon = btn.querySelector('i');
    const row = btn.closest('tr');
    const sellPriceInput = row.querySelector('.sell-price');

    if (icon.classList.contains('fa-lock-open')) {
        // Khóa lại
        icon.classList.remove('fa-lock-open');
        icon.classList.add('fa-lock');
        sellPriceInput.disabled = true;
        btn.setAttribute('title', 'Mở khóa để cập nhật giá');
    } else {
        // Mở khóa
        icon.classList.remove('fa-lock');
        icon.classList.add('fa-lock-open');
        sellPriceInput.disabled = false;
        btn.setAttribute('title', 'Khóa để không cập nhật giá');
    }
}


function toggleFeeColumn(isChecked) {
    const table = document.getElementById('profit-loss-table');
    const feeInputs = table.querySelectorAll('.fee');
    const feeCells = table.querySelectorAll('.fee-cell');
    const feeHeader = table.querySelector('.fee-header');
    const displayStyle = isChecked ? 'table-cell' : 'none';

    if (feeHeader) feeHeader.style.display = displayStyle;
    feeCells.forEach(cell => cell.style.display = displayStyle);
    feeInputs.forEach(input => {
        input.disabled = !isChecked;
        input.style.backgroundColor = isChecked ? '#f8f9fa' : '#f0f0f0';
    });
}

function addProfitLossRow() {
    const tableBody = document.getElementById('profit-loss-table').querySelector('tbody');
    const newRow = tableBody.insertRow();
    const isChecked = document.getElementById('fee-toggle')?.checked || false;
    newRow.innerHTML = `
        <td><input type="text" class="stock-code" placeholder="HPG"></td>
        <td><input type="number" class="volume" placeholder="100"></td>
        <td><input type="number" class="buy-price" placeholder="25000"></td>
        <td><input type="number" class="sell-price" placeholder="Để trống = giá hiện tại"></td>
        <td style="text-align: center; vertical-align: middle;">
            <button class="lock-btn" onclick="togglePriceLock(this)" title="Khóa để không cập nhật giá">
                <i class="fas fa-lock-open"></i>
            </button>
        </td>
        <td class="fee-cell"><input type="number" class="fee" value="0.15" step="0.01"></td>
        <td class="profit-loss-result">0</td>
        <td class="profit-loss-percent-result">-</td>
        <td><button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash-alt"></i></button></td>`;
    toggleFeeColumn(isChecked);
}

async function updateLivePricesAndCalculate() {
    const rows = Array.from(document.getElementById('profit-loss-table').querySelectorAll('tbody tr'));
    const updateButton = document.querySelector('button[onclick="updateLivePricesAndCalculate()"]');
    const originalButtonText = updateButton.innerHTML;
    updateButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Đang cập nhật...`;
    updateButton.disabled = true;

    const priceRequests = rows.map(row => {
        const sellPriceInput = row.querySelector('.sell-price');
        
        // Bỏ qua nếu ô giá đã bị khóa
        if (sellPriceInput.disabled) {
            return Promise.resolve();
        }

        const stockCode = row.querySelector('.stock-code').value.trim().toUpperCase();
        if (stockCode) {
            return fetch(`api/proxy.php?endpoint=stock_price&code=${stockCode}`)
                .then(response => response.ok ? response.json() : null)
                .then(data => {
                    if (data?.data?.matchedPrice) {
                        sellPriceInput.value = data.data.matchedPrice;
                        sellPriceInput.style.backgroundColor = '#e8f5e9';
                    } else {
                         sellPriceInput.style.backgroundColor = '#fff3f3';
                    }
                }).catch(err => {
                    console.error(`Lỗi lấy giá ${stockCode}:`, err);
                    sellPriceInput.style.backgroundColor = '#fff3f3';
                });
        }
        return Promise.resolve();
    });
    
    await Promise.all(priceRequests);
    
    updateButton.innerHTML = originalButtonText;
    updateButton.disabled = false;
    calculateTotalProfitLoss();
}

function calculateTotalProfitLoss() {
    const rows = document.getElementById('profit-loss-table').querySelectorAll('tbody tr');
    const feeEnabled = document.getElementById('fee-toggle').checked; 
    let totalProfitLoss = 0;

    rows.forEach(row => {
        const volume = parseFloat(row.querySelector('.volume').value) || 0;
        const buyPrice = parseFloat(row.querySelector('.buy-price').value) || 0;
        const sellPrice = parseFloat(row.querySelector('.sell-price').value) || 0;
        const feePercent = feeEnabled ? (parseFloat(row.querySelector('.fee').value) || 0) : 0;
        
        const resultCell = row.querySelector('.profit-loss-result');
        const percentCell = row.querySelector('.profit-loss-percent-result');

        if (volume > 0 && buyPrice > 0 && sellPrice > 0) {
            const buyValue = volume * buyPrice;
            const sellValue = volume * sellPrice;
            const buyFee = buyValue * (feePercent / 100);
            const sellFee = sellValue * (feePercent / 100);
            const profitLoss = sellValue - buyValue - buyFee - sellFee;
            totalProfitLoss += profitLoss;
            
            resultCell.textContent = formatNumber(profitLoss, 0);
            resultCell.className = `profit-loss-result ${profitLoss >= 0 ? 'price-up' : 'price-down'}`;
            
            const profitLossPercent = buyValue > 0 ? (profitLoss / buyValue) * 100 : 0;
            percentCell.textContent = `${profitLossPercent.toFixed(2)}%`;
            percentCell.className = `profit-loss-percent-result ${profitLoss >= 0 ? 'price-up' : 'price-down'}`;
        } else {
            resultCell.textContent = '0';
            resultCell.className = 'profit-loss-result';
            percentCell.textContent = '-';
            percentCell.className = 'profit-loss-percent-result';
        }
    });

    const summaryDiv = document.getElementById('profit-loss-summary');
    const profitClass = totalProfitLoss >= 0 ? 'total-profit' : 'total-loss';
    const toggleHTML = summaryDiv.querySelector('.fee-toggle-container')?.outerHTML || '';
    summaryDiv.innerHTML = `${toggleHTML}<p><strong>Tổng Lãi/Lỗ:</strong> <span class="${profitClass}">${formatNumber(totalProfitLoss, 0)} VNĐ</span></p>`;
    
    const newToggle = document.getElementById('fee-toggle');
    if (newToggle && !newToggle.dataset.listenerAttached) {
         newToggle.addEventListener('change', () => {
            toggleFeeColumn(newToggle.checked);
            calculateTotalProfitLoss();
         });
         newToggle.dataset.listenerAttached = 'true';
    }
}

// =================================================================
// CHỨC NĂNG 2: TÍNH GIÁ VỐN TRUNG BÌNH (Không thay đổi)
// =================================================================
function addAvgPriceRow() {
    const tableBody = document.getElementById('avg-price-table').querySelector('tbody');
    tableBody.insertRow().innerHTML = `<td><input type="number" class="volume" placeholder="100"></td><td><input type="number" class="buy-price" placeholder="25000"></td><td><button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash-alt"></i></button></td>`;
}

function calculateAveragePrice() {
    const rows = document.getElementById('avg-price-table').querySelectorAll('tbody tr');
    let totalValue = 0, totalVolume = 0;
    rows.forEach(row => {
        const volume = parseFloat(row.querySelector('.volume').value) || 0;
        const buyPrice = parseFloat(row.querySelector('.buy-price').value) || 0;
        if (volume > 0 && buyPrice > 0) {
            totalValue += volume * buyPrice;
            totalVolume += volume;
        }
    });
    const avgPrice = totalVolume > 0 ? totalValue / totalVolume : 0;
    document.getElementById('avg-price-summary').innerHTML = `<p><strong>Giá Vốn Trung Bình:</strong> <span class="avg-price-result">${formatNumber(avgPrice, 0)} VNĐ/CP</span></p>`;
}

// =================================================================
// CHỨC NĂNG 3: THEO DÕI DANH MỤC (Cập nhật với PHP)
// =================================================================
const ADMIN_PASS_HASH = "5f4dcc3b5aa765d61d8327deb882cf99"; 
let portfolios = {};
let activePortfolio = null;
let loggedInAs = null;

async function initializePortfolioTab() {
    await loadPortfoliosFromServer();
    checkLoginState();
    
    const passwordInput = document.getElementById('portfolio-password');
    passwordInput.addEventListener('keyup', (event) => {
        if (event.key === "Enter") loginPortfolio();
    });
}

async function loadPortfoliosFromServer() {
    try {
        const response = await fetch('api/load-portfolios.php', { cache: "no-store" }); // no-store để tránh cache
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        portfolios = await response.json();
    } catch (error) {
        console.error('Lỗi tải danh mục:', error);
        alert('Lỗi kết nối đến máy chủ để tải dữ liệu danh mục. Vui lòng kiểm tra lại môi trường server.');
        portfolios = {};
    }
}

async function savePortfoliosToServer() {
    try {
        const response = await fetch('api/save-portfolios.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(portfolios),
        });
        if (!response.ok) {
             const errData = await response.json();
             throw new Error(errData.message || 'Lỗi không xác định từ server.');
        }
        const result = await response.json();
        console.log('Server response:', result.message);
    } catch (error) {
        console.error('Lỗi lưu danh mục:', error);
        alert('Lỗi lưu dữ liệu: ' + error.message);
    }
}

function checkLoginState() {
    loggedInAs = sessionStorage.getItem('portfolio_loggedInAs');
    activePortfolio = sessionStorage.getItem('portfolio_active');
    
    if (loggedInAs) {
        document.getElementById('portfolio-login-view').style.display = 'none';
        document.getElementById('portfolio-main-view').style.display = 'block';
        renderPortfolioSelector();
        renderPortfolio();
    } else {
        document.getElementById('portfolio-login-view').style.display = 'block';
        document.getElementById('portfolio-main-view').style.display = 'none';
    }
}

function loginPortfolio() {
    if (typeof md5 !== 'function') { alert("Lỗi: Hàm md5 không tồn tại."); return; }
    const password = document.getElementById('portfolio-password').value;
    if (!password) { alert("Vui lòng nhập mật khẩu."); return; }
    const passHash = md5(password);

    if (passHash === ADMIN_PASS_HASH) {
        loggedInAs = 'admin';
        sessionStorage.setItem('portfolio_loggedInAs', 'admin');
        const portfolioKeys = Object.keys(portfolios);
        activePortfolio = portfolioKeys.length > 0 ? portfolioKeys[0] : null;
        sessionStorage.setItem('portfolio_active', activePortfolio);
        checkLoginState();
        return;
    }

    for (const name in portfolios) {
        if (portfolios[name].passwordHash === passHash) {
            loggedInAs = 'user';
            activePortfolio = name;
            sessionStorage.setItem('portfolio_loggedInAs', 'user');
            sessionStorage.setItem('portfolio_active', activePortfolio);
            checkLoginState();
            return;
        }
    }
    alert("Mật khẩu không đúng!");
}

function logoutPortfolio() {
    loggedInAs = null;
    activePortfolio = null;
    sessionStorage.removeItem('portfolio_loggedInAs');
    sessionStorage.removeItem('portfolio_active');
    document.getElementById('portfolio-password').value = '';
    checkLoginState();
}

function showCreatePortfolioModal() {
    document.getElementById('new-portfolio-name').value = '';
    document.getElementById('new-portfolio-password').value = '';
    showModal('create-portfolio-modal');
}

async function createPortfolio() {
    const name = document.getElementById('new-portfolio-name').value.trim();
    const password = document.getElementById('new-portfolio-password').value;

    if (!name || !password) { alert("Tên danh mục và mật khẩu không được để trống."); return; }
    if (portfolios[name]) { alert("Tên danh mục này đã tồn tại."); return; }

    portfolios[name] = { passwordHash: md5(password), stocks: [] };
    await savePortfoliosToServer(); 

    alert(`Đã tạo danh mục "${name}" thành công.`);
    closeModal('create-portfolio-modal');
    
    loggedInAs = 'user';
    activePortfolio = name;
    sessionStorage.setItem('portfolio_loggedInAs', 'user');
    sessionStorage.setItem('portfolio_active', activePortfolio);
    checkLoginState();
}

function renderPortfolioSelector() {
    const selector = document.getElementById('portfolio-selector');
    selector.innerHTML = '';
    let availablePortfolios = (loggedInAs === 'admin') ? Object.keys(portfolios) : (loggedInAs === 'user' && activePortfolio) ? [activePortfolio] : [];
    
    selector.style.display = availablePortfolios.length > 1 ? 'inline-block' : 'none';
    
    availablePortfolios.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        if (name === activePortfolio) option.selected = true;
        selector.appendChild(option);
    });
}

function switchPortfolio() {
    activePortfolio = document.getElementById('portfolio-selector').value;
    sessionStorage.setItem('portfolio_active', activePortfolio);
    renderPortfolio();
}

function renderPortfolio() {
    if (!activePortfolio || !portfolios[activePortfolio]) {
        document.getElementById('portfolio-name-display').textContent = 'Không có danh mục nào';
        document.getElementById('portfolio-table').querySelector('tbody').innerHTML = `<tr><td colspan="9" class="placeholder-text">Vui lòng tạo hoặc chọn một danh mục.</td></tr>`;
        document.getElementById('portfolio-summary').innerHTML = '';
        document.querySelector('.delete-portfolio-btn').style.display = 'none';
        return;
    }
    
    document.querySelector('.delete-portfolio-btn').style.display = 'inline-flex';
    document.getElementById('portfolio-name-display').textContent = `Danh mục: ${activePortfolio}`;
    const tableBody = document.getElementById('portfolio-table').querySelector('tbody');
    tableBody.innerHTML = '';
    const currentPortfolio = portfolios[activePortfolio];

    if (currentPortfolio.stocks.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="9" class="placeholder-text">Danh mục trống.</td></tr>`;
        updatePortfolioSummary();
        return;
    }

    currentPortfolio.stocks.forEach((stock, index) => {
        const row = tableBody.insertRow();
        const totalCost = stock.volume * stock.price;
        const marketValue = stock.marketPrice ? stock.volume * stock.marketPrice : 0;
        const profitLoss = marketValue > 0 ? marketValue - totalCost : 0;
        const profitLossPercent = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

        row.innerHTML = `<td>${stock.code.toUpperCase()}</td><td>${formatNumber(stock.volume)}</td><td>${formatNumber(stock.price)}</td><td>${formatNumber(totalCost)}</td><td class="market-price-cell">${stock.marketPrice?formatNumber(stock.marketPrice):'N/A'}</td><td class="market-value-cell">${marketValue>0?formatNumber(marketValue):'N/A'}</td><td class="profit-loss-cell ${profitLoss>=0?'price-up':'price-down'}">${marketValue>0?formatNumber(profitLoss):'N/A'}</td><td class="profit-percent-cell ${profitLoss>=0?'price-up':'price-down'}">${marketValue>0?profitLossPercent.toFixed(2)+'%':'N/A'}</td><td><button class="edit-btn" onclick="showEditStockModal(${index})"><i class="fas fa-edit"></i></button> <button class="delete-btn" onclick="deleteStock(${index})"><i class="fas fa-trash-alt"></i></button></td>`;
    });
    updatePortfolioSummary();
}

async function updatePortfolioPrices() {
    if (!activePortfolio || !portfolios[activePortfolio] || portfolios[activePortfolio].stocks.length === 0) { alert("Không có cổ phiếu để cập nhật."); return; }
    const updateButton = document.getElementById('update-prices-btn');
    const originalButtonHTML = updateButton.innerHTML;
    updateButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Đang cập nhật...`;
    updateButton.disabled = true;

    const stocksToUpdate = portfolios[activePortfolio].stocks;
    const priceRequests = stocksToUpdate.map(stock => 
        fetch(`api/proxy.php?endpoint=stock_price&code=${stock.code}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => ({ code: stock.code, marketPrice: data?.data?.matchedPrice || stock.marketPrice || null }))
        .catch(err => { console.error(`Lỗi lấy giá ${stock.code}:`, err); return { code: stock.code, marketPrice: stock.marketPrice || null }; })
    );
    const updatedPrices = await Promise.all(priceRequests);
    
    let hasChanged = false;
    updatedPrices.forEach(update => {
        const stockIndex = portfolios[activePortfolio].stocks.findIndex(s => s.code === update.code);
        if (stockIndex !== -1 && update.marketPrice && portfolios[activePortfolio].stocks[stockIndex].marketPrice !== update.marketPrice) {
            portfolios[activePortfolio].stocks[stockIndex].marketPrice = update.marketPrice;
            hasChanged = true;
        }
    });

    if (hasChanged) {
        await savePortfoliosToServer();
    }
    
    renderPortfolio();
    updateButton.innerHTML = originalButtonHTML;
    updateButton.disabled = false;
}

function updatePortfolioSummary() {
     if (!activePortfolio || !portfolios[activePortfolio]) { document.getElementById('portfolio-summary').innerHTML = ''; return; }
    const stocks = portfolios[activePortfolio].stocks;
    let totalInvestment = stocks.reduce((sum, s) => sum + s.volume * s.price, 0);
    let totalMarketValue = stocks.reduce((sum, s) => sum + (s.marketPrice ? s.volume * s.marketPrice : 0), 0);
    const totalProfitLoss = totalMarketValue > 0 ? totalMarketValue - totalInvestment : 0;
    const totalProfitLossPercent = totalInvestment > 0 ? (totalProfitLoss / totalInvestment) * 100 : 0;
    const profitClass = totalProfitLoss >= 0 ? 'total-profit' : 'total-loss';

    document.getElementById('portfolio-summary').innerHTML = `<p><strong>Tổng vốn đầu tư:</strong> ${formatNumber(totalInvestment)} VNĐ</p><p><strong>Giá trị thị trường:</strong> ${totalMarketValue>0?formatNumber(totalMarketValue):'N/A'} VNĐ</p><p><strong>Tổng Lãi/Lỗ:</strong> <span class="${profitClass}">${totalMarketValue>0?formatNumber(totalProfitLoss):'N/A'} VNĐ (${totalMarketValue>0?totalProfitLossPercent.toFixed(2)+'%':'N/A'})</span></p>`;
}

function showAddStockModal() {
    document.getElementById('stock-modal-title').textContent = 'Thêm Cổ phiếu';
    document.getElementById('edit-stock-index').value = '';
    document.getElementById('stock-modal-code').value = '';
    document.getElementById('stock-modal-volume').value = '';
    document.getElementById('stock-modal-price').value = '';
    showModal('add-stock-modal');
}

function showEditStockModal(index) {
    const stock = portfolios[activePortfolio].stocks[index];
    document.getElementById('stock-modal-title').textContent = 'Sửa Cổ phiếu';
    document.getElementById('edit-stock-index').value = index;
    document.getElementById('stock-modal-code').value = stock.code;
    document.getElementById('stock-modal-volume').value = stock.volume;
    document.getElementById('stock-modal-price').value = stock.price;
    showModal('add-stock-modal');
}

async function saveStock() {
    const code = document.getElementById('stock-modal-code').value.trim().toUpperCase();
    const volume = parseFloat(document.getElementById('stock-modal-volume').value);
    const price = parseFloat(document.getElementById('stock-modal-price').value);
    const index = document.getElementById('edit-stock-index').value;

    if (!code || isNaN(volume) || isNaN(price) || volume <= 0 || price <= 0) { alert("Vui lòng nhập đầy đủ và chính xác thông tin."); return; }
    const newStock = { code, volume, price, marketPrice: null };

    if (index !== '') {
        newStock.marketPrice = portfolios[activePortfolio].stocks[parseInt(index)].marketPrice;
        portfolios[activePortfolio].stocks[parseInt(index)] = newStock;
    } else {
        portfolios[activePortfolio].stocks.push(newStock);
    }
    
    await savePortfoliosToServer();
    renderPortfolio();
    closeModal('add-stock-modal');
}

async function deleteStock(index) {
    if (confirm(`Bạn có chắc muốn xóa cổ phiếu ${portfolios[activePortfolio].stocks[index].code} khỏi danh mục?`)) {
        portfolios[activePortfolio].stocks.splice(index, 1);
        await savePortfoliosToServer();
        renderPortfolio();
    }
}

async function deleteCurrentPortfolio() {
    if(!activePortfolio) return;
    if (confirm(`!!! CẢNH BÁO !!!\nBạn có chắc chắn muốn XÓA vĩnh viễn danh mục "${activePortfolio}" không? Hành động này không thể hoàn tác.`)) {
        delete portfolios[activePortfolio];
        await savePortfoliosToServer();
        
        if (loggedInAs === 'admin') {
            const portfolioKeys = Object.keys(portfolios);
            activePortfolio = portfolioKeys.length > 0 ? portfolioKeys[0] : null;
            sessionStorage.setItem('portfolio_active', activePortfolio);
            checkLoginState();
        } else {
            logoutPortfolio();
        }
    }
}

function showModal(modalId) {
    document.getElementById('portfolio-modal-backdrop').style.display = 'block';
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById('portfolio-modal-backdrop').style.display = 'none';
    document.getElementById(modalId).style.display = 'none';
}

// =================================================================
// CHỨC NĂNG 4: LỢI NHUẬN MỤC TIÊU (Không thay đổi)
// =================================================================
async function calculateTargetProfitSessions() {
    const stockCode = document.getElementById('target-stock-code').value.trim().toUpperCase();
    const buyPrice = parseFloat(document.getElementById('target-buy-price').value) || 0;
    const targetPrice = parseFloat(document.getElementById('target-price').value) || 0;
    const summaryDiv = document.getElementById('target-summary');

    if (!stockCode || buyPrice <= 0 || targetPrice <= 0) {
        summaryDiv.innerHTML = `<p class="error-text">Vui lòng nhập đủ Mã cổ phiếu, Giá mua và Giá mục tiêu.</p>`;
        return;
    }

    summaryDiv.innerHTML = `<p><i class="fas fa-spinner fa-spin"></i> Đang lấy giá và sàn của ${stockCode}...</p>`;

    let currentPriceForProfit = 0, startPriceForRoadmap = 0, exchange = '';
    try {
        const response = await fetch(`api/proxy.php?endpoint=stock_price&code=${stockCode}`);
        if (!response.ok) throw new Error('Không tìm thấy mã cổ phiếu.');
        const data = await response.json();
        if (data.error || !data?.data?.matchedPrice || !data?.data?.exchange) throw new Error('Không lấy được dữ liệu giá hoặc sàn.');
        
        exchange = data.data.exchange.toLowerCase();
        currentPriceForProfit = data.data.matchedPrice; 
        startPriceForRoadmap = (exchange === 'upcom' && data.data.avgPrice) ? data.data.avgPrice : data.data.matchedPrice;

    } catch (error) {
        summaryDiv.innerHTML = `<p class="error-text">Lỗi: ${error.message}</p>`;
        return;
    }
    
    if (targetPrice <= currentPriceForProfit) {
        summaryDiv.innerHTML = `<p>Giá hiện tại (${formatNumber(currentPriceForProfit, 0)} VNĐ) đã cao hơn hoặc bằng giá mục tiêu của bạn.</p>`;
        return;
    }
    
    let maxChange = (exchange === 'hnx') ? 0.10 : (exchange === 'upcom') ? 0.15 : 0.07;

    const profitLossPercent = ((currentPriceForProfit / buyPrice) - 1) * 100;
    const targetProfitPercent = ((targetPrice / buyPrice) - 1) * 100;
    let profitLossString = profitLossPercent >= 0 ? `bạn đang lãi <span class="price-up">${profitLossPercent.toFixed(2)}%</span>` : `bạn đang lỗ <span class="price-down">${Math.abs(profitLossPercent).toFixed(2)}%</span>`;

    let breakEvenSessions = 0;
    if (currentPriceForProfit < buyPrice) {
        let tempPrice = currentPriceForProfit;
        while (tempPrice < buyPrice && breakEvenSessions <= 20) {
            breakEvenSessions++;
            tempPrice = Math.round((tempPrice * (1 + maxChange)) / 100) * 100;
        }
    }

    let targetSessions = 0, currentPrice = startPriceForRoadmap, roadmapHTML = '';
    while (currentPrice < targetPrice && targetSessions <= 20) {
        targetSessions++;
        const previousPrice = currentPrice;
        currentPrice = Math.round((currentPrice * (1 + maxChange)) / 100) * 100;
        const isFinalStep = currentPrice >= targetPrice ? 'final-step' : '';
        roadmapHTML += `<li class="roadmap-step ${isFinalStep}" data-session="${targetSessions}"><h5>Phiên ${targetSessions} (Tham chiếu: ${formatNumber(previousPrice, 0)})</h5><p>Tăng giá: <span class="price-change">+${formatNumber(currentPrice - previousPrice, 0)} VNĐ (${(maxChange * 100).toFixed(0)}%)</span></p><p>Giá cuối phiên (giá trần): <span class="final-price">${formatNumber(currentPrice, 0)} VNĐ</span></p></li>`;
    }

    let summaryMessage = `<p class="target-summary-header">Từ giá hiện tại <strong>${formatNumber(currentPriceForProfit, 0)} VNĐ</strong> (Sàn: ${exchange.toUpperCase()}), ${profitLossString}. `;
    summaryMessage += (currentPriceForProfit < buyPrice) ? `Cần ${breakEvenSessions > 20 ? 'hơn 20' : `khoảng <strong>${breakEvenSessions}</strong>`} phiên tăng trần để hòa vốn và ` : `Bạn đã hòa vốn. Cần `;
    summaryMessage += `${targetSessions > 20 ? 'hơn 20' : `<strong>${targetSessions}</strong>`} phiên tăng trần liên tiếp để đạt giá <span class="breakeven-highlight">${formatNumber(targetPrice, 0)} VNĐ</span> (ước tính lợi nhuận mục tiêu đạt ${targetProfitPercent.toFixed(2)}%).</p>`;
    
    summaryDiv.innerHTML = summaryMessage + `<ul class="target-roadmap">${roadmapHTML}</ul>`;
}

// =================================================================
// HÀM CHUNG
// =================================================================
function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    const table = row.closest('table');
    row.parentNode.removeChild(row);
    if (table.id === 'profit-loss-table') calculateTotalProfitLoss();
    else if (table.id === 'avg-price-table') calculateAveragePrice();
}