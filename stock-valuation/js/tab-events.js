/**
 * tab-events.js
 * Chứa mã nguồn cho chức năng Tab 4: Lịch Sự kiện.
 */

/**
 * Khởi tạo và tải dữ liệu cho bảng Lịch sự kiện.
 */
async function initializeEventsTab() {
    const proxy = 'https://webproxy.vodang2702.workers.dev/?url=';
    
    // Cấu hình các cột cho bảng
    const eventColumns = [
        { header: '#', key: 'stt', searchable: false, render: (item, i) => i },
        { header: 'Mã CK', key: 'code', searchable: true, render: item => item.code },
        { header: 'Ngày GDKHQ', key: 'postedDate', searchable: true, render: item => formatDate(item.postedDate) },
        { header: 'Loại sự kiện', key: 'catName', searchable: true, render: item => item.catName },
    ];
    
    // Khởi tạo đối tượng DataTable
    eventsTable = new DataTable('table-events', 'search-events', 'pagination-events', eventColumns, 'postedDate');

    // === THAY ĐỔI MỚI: TÍNH TOÁN NGÀY BẮT ĐẦU LÀ 3 NGÀY TRƯỚC ===
    const today = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3); // Đặt ngày thành 3 ngày trước

    // Lấy ngày bắt đầu là 3 ngày trước theo định dạng YYYY-MM-DD
    const startDate = `${threeDaysAgo.getFullYear()}-${String(threeDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(threeDaysAgo.getDate()).padStart(2, '0')}`;
    
    // Lấy ngày kết thúc là ngày cuối cùng của năm nay
    const endDate = `${today.getFullYear()}-12-31`;
    // ==========================================================
    
    const url = `${proxy}https://api.hsx.vn/n/api/v1/1/news/newstype/0/3?pageIndex=1&pageSize=200&startDate=${startDate}&endDate=${endDate}&aliasCate=su-kien`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        
        // Lọc dữ liệu trước khi hiển thị
        const filteredList = (data.data.list || []).filter(item => {
            // Điều kiện 1: Mã CK phải có đúng 3 ký tự
            const isStock = item.code && item.code.length === 3;
            // Điều kiện 2: Loại sự kiện không phải là "Giao dịch bổ sung cổ phiếu"
            const isNotAdditionalListing = item.catName !== 'IN: Giao dịch bổ sung cổ phiếu';
            // Điều kiện 3: Ngày GDKHQ phải lớn hơn hoặc bằng ngày bắt đầu (3 ngày trước)
            // Chuyển đổi timestamp sang đối tượng Date để so sánh
            const eventDate = new Date(Number(item.postedDate) * 1000);
            // Đặt giờ, phút, giây về 0 để chỉ so sánh ngày
            eventDate.setHours(0, 0, 0, 0);
            threeDaysAgo.setHours(0, 0, 0, 0);
            const isWithinDateRange = eventDate >= threeDaysAgo;

            // Chỉ giữ lại những dòng thỏa mãn tất cả điều kiện
            return isStock && isNotAdditionalListing && isWithinDateRange;
        });

        // Tải dữ liệu đã lọc vào bảng
        eventsTable.loadData(filteredList); 
    } catch(e) {
        console.error("Lỗi tải dữ liệu sự kiện:", e);
        document.getElementById('table-events').innerHTML = '<p class="placeholder-text error-text">Không thể tải dữ liệu.</p>';
    }
}