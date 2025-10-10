/**
 * tab-investor-support.js
 * Chứa mã nguồn cho chức năng Tab 7: Hỗ trợ Nhà Đầu Tư.
 */

// --- KHỞI TẠO KHI TẢI TRANG ---
document.addEventListener('DOMContentLoaded', () => {
    addProfitLossRow();
    addAvgPriceRow();
    document.getElementById('profit-loss-table').addEventListener('input', calculateTotalProfitLoss);
    document.getElementById('avg-price-table').addEventListener('input', calculateAveragePrice);
    
    // Thêm listener cho toggle phí
    const feeToggle = document.getElementById('fee-toggle');
    feeToggle.addEventListener('change', () => {
        // Cập nhật lại trạng thái ẩn/hiện cột và vô hiệu hóa input
        toggleFeeColumn(feeToggle.checked); 
        // Tính toán lại lợi nhuận ngay lập tức
        calculateTotalProfitLoss();
    });

    // Chạy lần đầu để đảm bảo trạng thái đúng (mặc định OFF)
    // Gọi hàm này sau khi thêm dòng đầu tiên để đảm bảo header và cell tồn tại
    // Việc này sẽ được gọi lại sau khi addProfitLossRow() chạy.
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
    if (subTabId === 'investor-portfolio') updatePortfolio();
}

// =================================================================
// CHỨC NĂNG 1: TÍNH LÃI/LỖ
// =================================================================

/**
 * Hiển thị/ẩn cột phí giao dịch và vô hiệu hóa input khi cần.
 * @param {boolean} isChecked - Trạng thái của toggle (true: hiện/bật phí, false: ẩn/tắt phí).
 */
function toggleFeeColumn(isChecked) {
    const table = document.getElementById('profit-loss-table');
    const feeInputs = table.querySelectorAll('.fee');
    const feeCells = table.querySelectorAll('.fee-cell');
    const feeHeader = table.querySelector('.fee-header');
    const displayStyle = isChecked ? 'table-cell' : 'none';

    // 1. Cập nhật header
    if (feeHeader) {
        feeHeader.style.display = displayStyle;
    }

    // 2. Cập nhật các ô dữ liệu
    feeCells.forEach(cell => {
        cell.style.display = displayStyle;
    });

    // 3. Vô hiệu hóa/kích hoạt input 
    feeInputs.forEach(input => {
        input.disabled = !isChecked;
        input.style.backgroundColor = isChecked ? '#f8f9fa' : '#f0f0f0';
    });
}

function addProfitLossRow() {
    const tableBody = document.getElementById('profit-loss-table').querySelector('tbody');
    const newRow = tableBody.insertRow();
    const isChecked = document.getElementById('fee-toggle')?.checked || false;
    // Bổ sung class 'fee-cell' cho cột phí
    newRow.innerHTML = `<td><input type="text" class="stock-code" placeholder="HPG"></td><td><input type="number" class="volume" placeholder="100"></td><td><input type="number" class="buy-price" placeholder="25000"></td><td><input type="number" class="sell-price" placeholder="Để trống = giá hiện tại"></td><td class="fee-cell"><input type="number" class="fee" value="0.15" step="0.01"></td><td class="profit-loss-result">0</td><td><button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash-alt"></i></button></td>`;
    
    // Áp dụng trạng thái ẩn/hiện ngay lập tức cho dòng mới
    toggleFeeColumn(isChecked);
}

async function updateLivePricesAndCalculate() {
    const rows = Array.from(document.getElementById('profit-loss-table').querySelectorAll('tbody tr'));
    const priceRequests = rows.map(row => {
        const sellPriceInput = row.querySelector('.sell-price');
        const stockCode = row.querySelector('.stock-code').value.trim().toUpperCase();
        if (!sellPriceInput.value && stockCode) {
            return fetch(`https://webproxy.vodang2702.workers.dev/?url=https://iboard-query.ssi.com.vn/stock/${stockCode}`)
                .then(response => response.ok ? response.json() : null)
                .then(data => {
                    // Dùng giá khớp lệnh hiện tại để tính lãi/lỗ
                    if (data?.data?.matchedPrice) {
                        sellPriceInput.value = data.data.matchedPrice;
                        sellPriceInput.style.backgroundColor = '#e8f5e9';
                    }
                }).catch(err => console.error(`Lỗi lấy giá ${stockCode}:`, err));
        }
        return Promise.resolve();
    });
    await Promise.all(priceRequests);
    calculateTotalProfitLoss();
}

function calculateTotalProfitLoss() {
    const rows = document.getElementById('profit-loss-table').querySelectorAll('tbody tr');
    // Đọc trạng thái toggle để quyết định có tính phí hay không
    const feeEnabled = document.getElementById('fee-toggle').checked; 
    let totalProfitLoss = 0;
    rows.forEach(row => {
        const volume = parseFloat(row.querySelector('.volume').value) || 0;
        const buyPrice = parseFloat(row.querySelector('.buy-price').value) || 0;
        const sellPrice = parseFloat(row.querySelector('.sell-price').value) || 0;
        // Chỉ tính phí nếu toggle được bật, nếu không thì feePercent là 0
        const feePercent = feeEnabled ? (parseFloat(row.querySelector('.fee').value) || 0) : 0;
        
        if (volume > 0 && buyPrice > 0 && sellPrice > 0) {
            const buyValue = volume * buyPrice, sellValue = volume * sellPrice;
            const buyFee = buyValue * (feePercent / 100);
            const sellFee = sellValue * (feePercent / 100);
            const profitLoss = sellValue - buyValue - buyFee - sellFee;
            
            totalProfitLoss += profitLoss;
            const resultCell = row.querySelector('.profit-loss-result');
            resultCell.textContent = formatNumber(profitLoss, 0);
            resultCell.className = `profit-loss-result ${profitLoss >= 0 ? 'price-up' : 'price-down'}`;
        } else {
            row.querySelector('.profit-loss-result').textContent = '0';
            row.querySelector('.profit-loss-result').className = 'profit-loss-result';
        }
    });
    const summaryDiv = document.getElementById('profit-loss-summary');
    const profitClass = totalProfitLoss >= 0 ? 'total-profit' : 'total-loss';
    const toggleContainer = summaryDiv.querySelector('.fee-toggle-container');
    const toggleHTML = toggleContainer ? toggleContainer.outerHTML : '';
    summaryDiv.innerHTML = `${toggleHTML}<p><strong>Tổng Lãi/Lỗ:</strong> <span class="${profitClass}">${formatNumber(totalProfitLoss, 0)} VNĐ</span></p>`;
    // Đảm bảo toggle vẫn ở đó nếu nó bị mất do gán lại innerHTML
    if (!toggleContainer && document.getElementById('fee-toggle')) {
         document.getElementById('fee-toggle').closest('.fee-toggle-container').remove(); // Remove old one if exists
         const newToggleContainer = document.createElement('div');
         newToggleContainer.className = 'fee-toggle-container';
         newToggleContainer.innerHTML = '<span>Bao gồm phí giao dịch?</span><label class="switch"><input type="checkbox" id="fee-toggle" ' + (feeEnabled ? 'checked' : '') + '><span class="slider round"></span></label>';
         summaryDiv.prepend(newToggleContainer);
         document.getElementById('fee-toggle').addEventListener('change', () => {
            toggleFeeColumn(document.getElementById('fee-toggle').checked);
            calculateTotalProfitLoss();
         });
    }
}

// =================================================================
// CÁC CHỨC NĂNG KHÁC (Không thay đổi)
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

function updatePortfolio() {
    document.getElementById('portfolio-table').querySelector('tbody').innerHTML = `<tr><td colspan="6" class="placeholder-text">Chức năng đang được phát triển.</td></tr>`;
    document.getElementById('portfolio-summary').innerHTML = `<p>Tổng giá trị danh mục: 0 VNĐ</p><p>Tổng lãi/lỗ: 0 VNĐ</p>`;
}
function exportPortfolio() { alert('Chức năng xuất Excel đang được phát triển!'); }

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
        const response = await fetch(`https://webproxy.vodang2702.workers.dev/?url=https://iboard-query.ssi.com.vn/stock/${stockCode}`);
        if (!response.ok) throw new Error('Không tìm thấy mã cổ phiếu.');
        const data = await response.json();
        if (!data?.data?.matchedPrice || !data?.data?.exchange) throw new Error('Không lấy được dữ liệu giá hoặc sàn.');
        
        exchange = data.data.exchange.toLowerCase();
        currentPriceForProfit = data.data.matchedPrice; // Dùng matchedPrice để tính lãi lỗ hiện tại

        // LOGIC CẬP NHẬT CHO UPCOM: Sử dụng Giá Trung bình (avgPrice) làm giá tham chiếu cho Phiên 1
        if (exchange === 'upcom' && data.data.avgPrice) {
            startPriceForRoadmap = data.data.avgPrice; 
        } else {
            startPriceForRoadmap = data.data.matchedPrice; // Các sàn khác dùng matchedPrice
        }

    } catch (error) {
        summaryDiv.innerHTML = `<p class="error-text">Lỗi: ${error.message}</p>`;
        return;
    }
    
    if (targetPrice <= currentPriceForProfit) {
        summaryDiv.innerHTML = `<p>Giá hiện tại (${formatNumber(currentPriceForProfit, 0)} VNĐ) đã cao hơn hoặc bằng giá mục tiêu của bạn.</p>`;
        return;
    }
    
    let maxChange;
    switch (exchange) {
        case 'hnx': maxChange = 0.10; break;
        case 'upcom': maxChange = 0.15; break;
        default: maxChange = 0.07;
    }

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
    if (currentPriceForProfit < buyPrice) {
        summaryMessage += `Cần ${breakEvenSessions > 20 ? 'hơn 20' : `khoảng <strong>${breakEvenSessions}</strong>`} phiên tăng trần để hòa vốn và `;
    } else {
        summaryMessage += `Bạn đã hòa vốn. Cần `;
    }
    summaryMessage += `${targetSessions > 20 ? 'hơn 20' : `<strong>${targetSessions}</strong>`} phiên tăng trần liên tiếp để đạt giá <span class="breakeven-highlight">${formatNumber(targetPrice, 0)} VNĐ</span> (ước tính lợi nhuận mục tiêu đạt ${targetProfitPercent.toFixed(2)}%).</p>`;
    
    summaryDiv.innerHTML = summaryMessage + `<ul class="target-roadmap">${roadmapHTML}</ul>`;
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    const table = row.closest('table');
    row.parentNode.removeChild(row);
    if (table.id === 'profit-loss-table') calculateTotalProfitLoss();
    else if (table.id === 'avg-price-table') calculateAveragePrice();
}