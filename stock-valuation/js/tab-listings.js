/**
 * tab-listings.js
 * Chứa mã nguồn cho chức năng Tab 3: Niêm yết Mới.
 */

/**
 * Hiển thị tab con được chọn (Đăng ký hoặc Chấp thuận).
 * @param {string} subTabId - ID của tab con cần hiển thị.
 */
function showListingSubTab(subTabId) {
    document.querySelectorAll('.listing-sub-container').forEach(c => c.classList.remove('active'));
    document.getElementById(subTabId).classList.add('active');
    
    document.querySelectorAll('#tab3 .period-tab').forEach(b => b.classList.remove('active'));
    document.querySelector(`#tab3 .period-tab[onclick="showListingSubTab('${subTabId}')"]`).classList.add('active');
}

/**
 * Khởi tạo và tải dữ liệu cho cả hai bảng trong tab Niêm yết Mới.
 */
async function initializeListingTabs() {
    // Cấu hình các cột cho bảng "Đăng ký niêm yết"
    const registeredColumns = [
        { header: '#', key: 'stt', searchable: false, render: (item, i) => i },
        { header: 'Tên DN', key: 'name', searchable: true, render: item => item.name },
        { header: 'Ngày nộp HS', key: 'listDate', searchable: true, render: item => formatDate(item.listDate) },
        { header: 'Ngày cập nhật', key: 'updatedDate', searchable: true, render: item => formatDate(item.listingdbSecuritiesInfo?.slice(-1)[0]?.updatedDate) },
        { header: 'KL đăng ký', key: 'listingVolume', searchable: true, render: item => formatNumber(item.listingVolume) }
    ];
    
    // Cấu hình các cột cho bảng "Được chấp thuận"
    const approvedColumns = [
        { header: '#', key: 'stt', searchable: false, render: (item, i) => i },
        { header: 'Mã CK', key: 'code', searchable: true, render: item => item.code },
        { header: 'Tên DN', key: 'name', searchable: true, render: item => item.name },
        { header: 'KL đăng ký', key: 'listingVolume', searchable: true, render: item => formatNumber(item.listingVolume) },
        { header: 'Ngày nộp HS', key: 'listDate', searchable: true, render: item => formatDate(item.listDate) },
        { header: 'Ngày chấp thuận', key: 'acceptDate', searchable: true, render: item => formatDate(item.acceptDate) },
        { header: 'Ngày GD đầu tiên', key: 'ftdate', searchable: true, render: item => formatDate(item.ftdate) }
    ];

    // Khởi tạo các đối tượng DataTable
    registeredTable = new DataTable('table-registered', 'search-registered', 'pagination-registered', registeredColumns, 'listDate');
    approvedTable = new DataTable('table-approved', 'search-approved', 'pagination-approved', approvedColumns, 'acceptDate');

    try {
        const corsProxyUrl = 'https://webproxy.vodang2702.workers.dev/?url=';
        const registeredUrl = `https://api.hsx.vn/l/api/v1/1/securities?pageIndex=1&pageSize=100&newListingStatusId=0`;
        const approvedUrl = `https://api.hsx.vn/l/api/v1/1/securities?pageIndex=1&pageSize=100&newListingStatusId=8`;

        const [registeredRes, approvedRes] = await Promise.all([
            fetch(corsProxyUrl + encodeURIComponent(registeredUrl), { cache: 'no-store' }),
            fetch(corsProxyUrl + encodeURIComponent(approvedUrl), { cache: 'no-store' })
        ]);
        
        const registeredData = await registeredRes.json();
        const approvedData = await approvedRes.json();
        
        if (registeredData.error || approvedData.error) {
            throw new Error("Lỗi tải dữ liệu niêm yết từ server.");
        }

        registeredTable.loadData(registeredData.data.list || []);
        approvedTable.loadData(approvedData.data.list || []);
    } catch(e) {
        console.error("Lỗi tải dữ liệu niêm yết:", e);
        document.getElementById('listing-registered').innerHTML = '<p class="placeholder-text error-text">Không thể tải dữ liệu.</p>';
        document.getElementById('listing-approved').innerHTML = '<p class="placeholder-text error-text">Không thể tải dữ liệu.</p>';
    }
}