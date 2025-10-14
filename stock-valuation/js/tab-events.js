/**
 * tab-events.js
 * Chứa mã nguồn cho chức năng Tab 4: Lịch Sự kiện.
 */

// Đã xóa khai báo biến trùng lặp ở đây.

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
    const apiKey = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDA5MTc4MDczLCJuYmYiOjE3MDkxNzgwNzMsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIzMWYzYzU5Ny1jYjZlLTQzYWEtYmRlZS01NjkyYjM3YWNiM2EiLCJhdXRoX3RpbWUiOjE3MDkxNzgwNzMsImlkcCI6Imlkc3J2IiwibmFtZSI6InZvZGFuZzI3MDJAZ21haWwuY29tIiwic2VjdXJpdHlfc3RhbXAiOiJlNjA5NTEzYy05ZDFmLTQ4NGUtOTAyNi01MTA0ZDVlNmYzNTMiLCJqdGkiOiIwNzc0MDRiNmE1ZmM3MjQ4ZmMyMmNlYmEzYjUzYjlhZCIsImFtciI6WyJwYXNzd29yZCJdfQ.yhyKMefOxXhxIFTD9YCAUnQYqGAnA7-m89g-EWX3B3N51m614d2uj3IhEMH6kl8W-zhgdWu1yfIY7PgiwIUqAKL4M-LG93roNzTN0F0tk_WCFbrpxyc3Z4Cv1uTi4A10EGCkqwnZ3sZV8ValCmzfxmDvXDoQRFuy91nznmiUFEg_YVnukVsZyASetLh6-_jYC-FsuW9ZCLAXo4QNkr6_DsJKbIywZkkofn7IsfWFMDBoa5dEiPyxfG8zMq3F3pydh_fKPjaz-oUWmewjIRwm0ohfNwvTJqs4jU0Pz4t4QmFYvRj_yrILxTc_59ewZvKb_fvuE8q3l1E7dXvIb7SYIg';
    const headers = { 'accept': 'application/json', 'authorization': apiKey };

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

    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);

    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(today.getMonth() + 3);

    const formatDateToISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    const startDate = formatDateToISO(threeMonthsAgo);
    const endDate = formatDateToISO(threeMonthsLater);
    
    const url = `https://restv2.fireant.vn/events/search?symbol=&orderBy=1&type=0&startDate=${startDate}&endDate=${endDate}&offset=0&limit=500`;

    try {
        const res = await fetch(url, { headers });
        const data = await res.json();
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
    const proxy = 'https://webproxy.vodang2702.workers.dev/?url=';
    
    const hoseEventColumns = [
        { header: '#', key: 'stt', searchable: false, render: (item, i) => i },
        { header: 'Mã CK', key: 'code', searchable: true, render: item => item.code },
        { header: 'Ngày GDKHQ', key: 'postedDate', searchable: true, render: item => formatDate(item.postedDate) },
        { header: 'Loại sự kiện', key: 'catName', searchable: true, render: item => item.catName },
    ];
    
    hoseEventsTable = new DataTable('table-events-hose', 'search-events-hose', 'pagination-events-hose', hoseEventColumns, 'postedDate');

    const today = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);

    const startDate = `${threeDaysAgo.getFullYear()}-${String(threeDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(threeDaysAgo.getDate()).padStart(2, '0')}`;
    const endDate = `${today.getFullYear()}-12-31`;
    
    const url = `${proxy}https://api.hsx.vn/n/api/v1/1/news/newstype/0/3?pageIndex=1&pageSize=200&startDate=${startDate}&endDate=${endDate}&aliasCate=su-kien`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        
        const filteredList = (data.data.list || []).filter(item => {
            const isStock = item.code && item.code.length === 3;
            const isNotAdditionalListing = item.catName !== 'IN: Giao dịch bổ sung cổ phiếu';
            const eventDate = new Date(Number(item.postedDate) * 1000);
            eventDate.setHours(0, 0, 0, 0);
            threeDaysAgo.setHours(0, 0, 0, 0);
            const isWithinDateRange = eventDate >= threeDaysAgo;
            return isStock && isNotAdditionalListing && isWithinDateRange;
        });

        hoseEventsTable.loadData(filteredList); 
    } catch(e) {
        console.error("Lỗi tải dữ liệu sự kiện HOSE:", e);
        document.getElementById('table-events-hose').innerHTML = '<tbody><tr><td colspan="4"><p class="placeholder-text error-text">Không thể tải dữ liệu.</p></td></tr></tbody>';
    }
}