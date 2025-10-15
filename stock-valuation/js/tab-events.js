/**
 * tab-events.js
 * Chứa mã nguồn cho chức năng Tab 4: Lịch Sự kiện.
 */

/**
 * Hiển thị tab con được chọn (Tổng hợp hoặc HOSE).
 * @param {string} subTabId - ID của tab con cần hiển thị.
 */
function showEventSubTab(subTabId) {
    document.querySelectorAll('#tab4 .listing-sub-container').forEach(c => c.classList.remove('active'));
    document.getElementById(subTabId).classList.add('active');

    document.querySelectorAll('#tab4 .period-tab').forEach(b => b.classList.remove('active'));
    document.querySelector(`#tab4 .period-tab[onclick="showEventSubTab('${subTabId}')"]`).classList.add('active');
}

/**
 * Khởi tạo và tải dữ liệu cho cả hai bảng trong tab Lịch sự kiện.
 */
async function initializeEventsTabs() {
    await Promise.all([
        initializeGeneralEventsTab(),
        initializeHoseEventsTab()
    ]);
}

/**
 * Khởi tạo và tải dữ liệu cho bảng sự kiện Tổng hợp.
 */
async function initializeGeneralEventsTab() {
    const generalEventColumns = [
        { header: '#', key: 'stt', searchable: false, render: (item, i) => i },
        { header: 'Mã CK', key: 'symbol', searchable: true, render: item => item.symbol },
        { header: 'Tên doanh nghiệp', key: 'name', searchable: true, render: item => item.name },
        { header: 'Nội dung', key: 'title', searchable: true, render: item => item.title },
        { header: 'Ngày GDKHQ', key: 'recordDate', searchable: true, render: item => formatDate(item.recordDate) },
        { header: 'Ngày ĐKCC', key: 'registrationDate', searchable: true, render: item => formatDate(item.registrationDate) },
        { header: 'Ngày thực hiện', key: 'executionDate', searchable: true, render: item => formatDate(item.executionDate) },
    ];
    
    generalEventsTable = new DataTable('table-events-general', 'search-events-general', 'pagination-events-general', generalEventColumns, 'recordDate');
    
    try {
        const res = await fetch(`api/proxy.php?endpoint=events_general`);
        const data = await res.json();
        if (data.error) throw new Error(data.message);
        generalEventsTable.loadData(data || []);
    } catch(e) {
        console.error("Lỗi tải dữ liệu sự kiện tổng hợp:", e);
        document.getElementById('table-events-general').innerHTML = '<tbody><tr><td colspan="7"><p class="placeholder-text error-text">Không thể tải dữ liệu.</p></td></tr></tbody>';
    }
}

/**
 * Khởi tạo và tải dữ liệu cho bảng Lịch sự kiện HOSE.
 */
async function initializeHoseEventsTab() {
    const hoseEventColumns = [
        { header: '#', key: 'stt', searchable: false, render: (item, i) => i },
        { header: 'Mã CK', key: 'code', searchable: true, render: item => item.code },
        { header: 'Ngày GDKHQ', key: 'postedDate', searchable: true, render: item => formatDate(item.postedDate) },
        { header: 'Loại sự kiện', key: 'catName', searchable: true, render: item => item.catName },
    ];
    
    hoseEventsTable = new DataTable('table-events-hose', 'search-events-hose', 'pagination-events-hose', hoseEventColumns, 'postedDate');
    
    try {
        const res = await fetch(`api/proxy.php?endpoint=events_hose`);
        const data = await res.json();
         if (data.error) throw new Error(data.message);
        
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        threeDaysAgo.setHours(0, 0, 0, 0);

        const filteredList = (data.data.list || []).filter(item => {
            const isStock = item.code && item.code.length === 3;
            const isNotAdditionalListing = item.catName !== 'IN: Giao dịch bổ sung cổ phiếu';
            const eventDate = new Date(Number(item.postedDate) * 1000);
            eventDate.setHours(0, 0, 0, 0);
            const isWithinDateRange = eventDate >= threeDaysAgo;
            return isStock && isNotAdditionalListing && isWithinDateRange;
        });

        hoseEventsTable.loadData(filteredList); 
    } catch(e) {
        console.error("Lỗi tải dữ liệu sự kiện HOSE:", e);
        document.getElementById('table-events-hose').innerHTML = '<tbody><tr><td colspan="4"><p class="placeholder-text error-text">Không thể tải dữ liệu.</p></td></tr></tbody>';
    }
}