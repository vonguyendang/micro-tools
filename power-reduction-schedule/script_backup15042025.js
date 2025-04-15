// console.log("script.js đã được tải!");

$(document).ready(function() {
    // console.log("Document đã sẵn sàng!");

    // Đặt ngày mặc định
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    $('#fromDateCustomer').val(formatDate(today));
    $('#toDateCustomer').val(formatDate(nextWeek));
    $('#fromDateUnit').val(formatDate(today));
    $('#toDateUnit').val(formatDate(nextWeek));

    // Load danh sách huyện khi chọn tỉnh
    $('#province').change(function() {
        // console.log("Sự kiện change trên dropdown tỉnh/thành phố được kích hoạt.");
        const provinceCode = $(this).val();
        // console.log("Mã tỉnh/thành phố đã chọn:", provinceCode);
        if (provinceCode) {
            // Thêm biểu tượng loading
            $('#loadingUnit').html(`
                <div class="text-center py-3">
                    <div class="spinner-border text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2"><i class="fas fa-sync-alt fa-spin me-2"></i>Đang tải danh sách quận/huyện...</p>
                </div>
            `).show();
            
            $('#district').html('<option value=""><i class="fas fa-spinner fa-spin me-2"></i>Đang tải...</option>');

            $.ajax({
                url: 'https://site-proxy.glitch.me/proxy?url=https://www.cskh.evnspc.vn/TraCuu/GetDanhMucDienLuc',
                method: 'GET',
                data: {
                    pMA_DVICTREN: provinceCode
                },
                headers: {
                    'Accept': 'text/html, */*; q=0.01',
                },
                success: function(data) {
                    // console.log("Dữ liệu quận/huyện đã nhận được:", data);
                    $('#district').html(data);
                    $('#loadingUnit').hide();
                    
                    // Thêm biểu tượng cho dropdown sau khi tải xong
                    $('#district').prepend('<option value=""><i class="fas fa-map-marker-alt me-2"></i>-- Chọn Quận/Huyện --</option>');
                },
                error: function() {
                    console.error("Lỗi khi tải danh sách quận/huyện");
                    $('#loadingUnit').html(`
                        <div class="alert alert-danger">
                            <i class="fas fa-exclamation-triangle me-2"></i>Có lỗi xảy ra khi tải danh sách quận/huyện
                        </div>
                    `);
                    
                    $('#district').html('<option value=""><i class="fas fa-times-circle me-2"></i>Không tải được dữ liệu</option>');
                    setTimeout(() => $('#loadingUnit').hide(), 3000);
                }
            });
        } else {
            $('#district').html('<option value=""><i class="fas fa-map-marker-alt me-2"></i>-- Chọn Quận/Huyện --</option>');
        }
    });

    // Tra cứu theo mã khách hàng
    $('#searchCustomer').click(function() {
        // console.log("Nút Tra cứu theo mã khách hàng đã được nhấn.");
        const customerCode = $('#customerCode').val().trim();
        const fromDate = $('#fromDateCustomer').val();
        const toDate = $('#toDateCustomer').val();

        if (!customerCode) {
            Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Vui lòng nhập mã khách hàng',
                confirmButtonColor: '#d32f2f'
            });
            return;
        }

        if (!fromDate || !toDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Vui lòng chọn khoảng thời gian',
                confirmButtonColor: '#d32f2f'
            });
            return;
        }

        // Hiển thị loading với biểu tượng đẹp
        $('#loadingCustomer').html(`
            <div class="text-center py-4">
                <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3"><i class="fas fa-search me-2"></i>Đang tìm kiếm thông tin...</p>
            </div>
        `).show();
        
        $('#customerResult').html('');

        // Format lại ngày từ YYYY-MM-DD sang DD-MM-YYYY
        const fromDateFormatted = formatDateForAPI(fromDate);
        const toDateFormatted = formatDateForAPI(toDate);

        $.ajax({
            url: 'https://site-proxy.glitch.me/proxy?url=https://www.cskh.evnspc.vn/TraCuu/GetThongTinLichNgungGiamCungCapDien',
            method: 'GET',
            data: {
                tuNgay: fromDateFormatted,
                denNgay: toDateFormatted,
                maKH: customerCode,
                ChucNang: 'MaKhachHang'
            },
            headers: {
                'Accept': 'text/html, */*; q=0.01',
            },
            success: function(data) {
                // console.log("Raw data:", data);
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                // console.log("Parsed HTML:", doc);
                const rows = doc.querySelectorAll('table tbody tr');
                // console.log("Found rows:", rows.length);
                rows.forEach((row, index) => {
                    // console.log(`Row ${index}:`, row.innerHTML);
                });
                // console.log("Kết quả tra cứu theo mã khách hàng:", data);
                $('#loadingCustomer').hide();
                
                if (data.includes("không có lịch ngừng giảm cung cấp điện")) {
                    $('#customerResult').html(`
                        <div class="outage-result no-outage">
                    <div class="result-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="result-content">
                        <h3>Không có lịch cúp điện</h3>
                        <p class="customer-code">
                            <i class="fas fa-user"></i> Mã khách hàng: <strong>${customerCode}</strong>
                        </p>
                        
                        <div class="time-range">
                            <div class="time-item">
                                <i class="fas fa-calendar-day"></i>
                                <span>Từ ngày: <strong>${formatDateToDDMMYYYY(fromDate)}</strong></span>
                            </div>
                            <div class="time-item">
                                <i class="fas fa-calendar-day"></i>
                                <span>Đến ngày: <strong>${formatDateToDDMMYYYY(toDate)}</strong></span>
                            </div>
                        </div>
                        
                        <div class="additional-info">
                            <i class="fas fa-info-circle"></i>
                            <h4>Quý khách có thể yên tâm sử dụng điện trong khoảng thời gian này</h4>
                        </div>
                    </div>
                </div>
                    `);
                } else {
                    const resultHtml = createCustomerResultView(data, customerCode, fromDate, toDate);
                    $('#customerResult').html(resultHtml);
                }
            },
            error: function() {
                console.error("Lỗi khi tra cứu theo mã khách hàng");
                $('#loadingCustomer').html(`
                    <div class="alert alert-danger">
                        <i class="fas fa-times-circle me-2"></i>
                        Có lỗi xảy ra khi tra cứu. Vui lòng thử lại sau.
                    </div>
                `);
                setTimeout(() => $('#loadingCustomer').hide(), 3000);
            }
        });
    });

    // Tra cứu theo đơn vị cấp điện
    $('#searchUnit').click(function() {
        // console.log("Nút Tra cứu theo đơn vị cấp điện đã được nhấn.");
        const districtCode = $('#district').val();
        const fromDate = $('#fromDateUnit').val();
        const toDate = $('#toDateUnit').val();

        if (!districtCode) {
            Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Vui lòng chọn quận/huyện',
                confirmButtonColor: '#d32f2f'
            });
            return;
        }

        if (!fromDate || !toDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Vui lòng chọn khoảng thời gian',
                confirmButtonColor: '#d32f2f'
            });
            return;
        }

        // Hiển thị loading với biểu tượng đẹp
        $('#loadingUnit').html(`
            <div class="text-center py-4">
                <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3"><i class="fas fa-search me-2"></i>Đang tìm kiếm thông tin...</p>
            </div>
        `).show();
        
        $('#unitResult').html('');

        // Format lại ngày từ YYYY-MM-DD sang DD-MM-YYYY
        const fromDateFormatted = formatDateForAPI(fromDate);
        const toDateFormatted = formatDateForAPI(toDate);

        $.ajax({
            url: 'https://site-proxy.glitch.me/proxy?url=https://www.cskh.evnspc.vn/TraCuu/GetThongTinLichNgungGiamCungCapDien',
            method: 'GET',
            data: {
                tuNgay: fromDateFormatted,
                denNgay: toDateFormatted,
                madvi: districtCode,
                ChucNang: 'MaDonVi'
            },
            headers: {
                'Accept': 'text/html, */*; q=0.01',
            },
            success: function(data) {
                // console.log("Kết quả tra cứu theo đơn vị cấp điện:", data);
                $('#loadingUnit').hide();
                
                const districtName = $('#district option:selected').text();
                
                if (data.includes("không có lịch ngừng giảm cung cấp điện")) {
                    $('#unitResult').html(`
                        <div class="text-center py-5 bg-light rounded">
                            <i class="fas fa-check-circle text-success" style="font-size: 3rem;"></i>
                            <h4 class="mt-3 text-success">Không có lịch cúp điện</h4>
                            <p>Khu vực ${districtName} không có lịch ngừng cung cấp điện từ ${fromDate} đến ${toDate}</p>
                            <p class="text-muted small mt-3"><i class="fas fa-info-circle me-2"></i>Mọi thắc mắc xin liên hệ tổng đài CSKH</p>
                        </div>
                    `);
                } else {
                    const resultHtml = createUnitResultView(data, districtName, fromDate, toDate);
                    $('#unitResult').html(resultHtml);
                }
            },
            error: function() {
                console.error("Lỗi khi tra cứu theo đơn vị cấp điện");
                $('#loadingUnit').html(`
                    <div class="alert alert-danger">
                        <i class="fas fa-times-circle me-2"></i>
                        Có lỗi xảy ra khi tra cứu. Vui lòng thử lại sau.
                    </div>
                `);
                setTimeout(() => $('#loadingUnit').hide(), 3000);
            }
        });
    });

    // Hàm chuyển đổi định dạng ngày từ YYYY-MM-DD sang DD-MM-YYYY
    function formatDateForAPI(dateString) {
        const parts = dateString.split('-');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    // Hàm decode HTML entities
    function decodeHtmlEntities(text) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }

    // Hàm tạo view kết quả cho khách hàng (dạng thông báo)
    // Hàm tạo view kết quả cho khách hàng (phiên bản cải tiến)
    function createCustomerResultView(data, customerCode, fromDate, toDate) {
        // console.log("Tạo view kết quả cho khách hàng với dữ liệu:", data);
        // console.log("Mã khách hàng:", customerCode);
        // console.log("Thời gian từ:", fromDate);
        // console.log("Thời gian đến:", toDate);
        // Kiểm tra trực tiếp nội dung HTML nếu không có bảng
        if (data.includes("không có lịch ngừng giảm cung cấp điện")) {
            return createNoOutageView(customerCode, fromDate, toDate);
        }
        
        // Xử lý trường hợp có thông báo cúp điện
        const outageItems = extractOutageInfoFromNotification(data);
        // console.log("Thông tin cúp điện đã trích xuất:", outageItems);
        
        if (outageItems.length === 0) {
            return createNoOutageView(customerCode, fromDate, toDate);
        }
        
        return createOutageResultView(outageItems, customerCode, fromDate, toDate);
    }
    
    // Hàm trích xuất thông tin từ thông báo
    function extractOutageInfoFromNotification(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const infoElements = doc.querySelectorAll('.info');
        const outages = [];
        
        infoElements.forEach(info => {
            const spans = info.querySelectorAll('span');
            if (spans.length >= 3) {
                const location = decodeHtmlEntities(spans[0].innerHTML.split('</b>')[1].trim());
                const timeText = spans[1].innerHTML;
                // console.log("Thời gian:", timeText);
                const reason = decodeHtmlEntities(spans[2].innerHTML.split('</b>')[1].trim());
                
                // Trích xuất thời gian
                // Sử dụng regex để tìm thời gian bắt đầu và kết thúc
                const regex = /<b>Thời gian bắt đầu ngừng cung cấp điện:<\/b>\s*([^\s<>]+(?:\s+[^\s<>]+)*)\s*<b>Thời gian dự kiến đóng điện trở lại:<\/b>\s*([^\s<>]+(?:\s+[^\s<>]+)*)\s*(?:&nbsp;)?/;
                const match = timeText.match(regex);
                // console.log("Thời gian bắt đầu và kết thúc:", match);

                let startTimeMatch = null;
                let endTimeMatch = null;

                if (match && match.length === 3) {
                    startTimeMatch = match[1].trim();
                    // console.log("Thời gian bắt đầu:", startTimeMatch);
                    endTimeMatch = match[2].trim();
                    // console.log("Thời gian kết thúc:", endTimeMatch);
                }
                outages.push({
                    location,
                    startTime: startTimeMatch,
                    endTime: endTimeMatch,
                    reason
                });
            }
        });
        
        return outages;
    }
    
    // Hàm tạo view khi không có cúp điện
    function createNoOutageView(customerCode, fromDate, toDate) {
        return `
            <div class="outage-result no-outage">
                    <div class="result-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="result-content">
                        <h3>Không có lịch cúp điện</h3>
                        <p class="customer-code">
                            <i class="fas fa-user"></i> Mã khách hàng: <strong>${customerCode}</strong>
                        </p>
                        
                        <div class="time-range">
                            <div class="time-item">
                                <i class="fas fa-calendar-day"></i>
                                <span>Từ ngày: <strong>${formatDateToDDMMYYYY(fromDate)}</strong></span>
                            </div>
                            <div class="time-item">
                                <i class="fas fa-calendar-day"></i>
                                <span>Đến ngày: <strong>${formatDateToDDMMYYYY(toDate)}</strong></span>
                            </div>
                        </div>
                        
                        <div class="additional-info">
                            <i class="fas fa-info-circle"></i>
                            <h4>Quý khách có thể yên tâm sử dụng điện trong khoảng thời gian này</h4>
                        </div>
                    </div>
                </div>
        `;
    }
    
    // Hàm tạo view khi có cúp điện
    function createOutageResultView(outages, customerCode, fromDate, toDate) {
        let outageItems = '';
        outages.forEach((outage, index) => {
            // console.log("Outage item:", outage);
            const [startDate, startTime] = outage.startTime.split(' ');
            // console.log("Start time:", startDate, startTime);
            const [endDate, endTime] = outage.endTime.split(' ');
            // console.log("End time:", endDate, endTime);
            
            outageItems += `
                <div class="outage-item ${outages.length > 1 ? 'multiple' : ''}">
                    ${outages.length > 1 ? `<div class="outage-number">Lần ${index + 1}</div>` : ''}
                    <div class="outage-time">
                        <span class="time-badge start">
                            <i class="fas fa-clock"></i> Bắt đầu: <strong>${startDate} ${startTime || ''}</strong>
                        </span>
                        <span class="time-badge end">
                            <i class="fas fa-history"></i> Dự kiến phục hồi: <strong>${endDate} ${endTime || ''}</strong>
                        </span>
                    </div>
                    
                    <div class="outage-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${outage.location}</span>
                    </div>
                    
                    <div class="outage-reason">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>${outage.reason}</span>
                    </div>
                    
                    ${index < outages.length - 1 ? '<hr class="outage-divider">' : ''}
                </div>
            `;
        });
        
        return `
            <div class="outage-result has-outage">
                <div class="result-header">
                    <h3><i class="fas fa-bolt"></i> Lịch cúp điện</h3>
                    <p class="customer-code">
                        <i class="fas fa-user"></i> Mã khách hàng: <strong>${customerCode}</strong>
                    </p>
                </div>
                
                <div class="outage-period">
                    <div class="period-info">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Khoảng thời gian tra cứu: <strong>${formatDateToDDMMYYYY(fromDate)}</strong> đến <strong>${formatDateToDDMMYYYY(toDate)}</strong></span>
                    </div>
                </div>
                
                <div class="outage-list">
                    ${outageItems}
                </div>
                
                <div class="outage-footer">
                    <i class="fas fa-phone-alt"></i>
                    <span>Mọi thắc mắc vui lòng liên hệ tổng đài CSKH: <strong>1900 1000</strong></span>
                </div>
            </div>
        `;
    }

    // Hàm chuyển đổi định dạng ngày từ YYYY-MM-DD sang DD-MM-YYYY
    function formatDateToDDMMYYYY(dateString) {
        const parts = dateString.split('-');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    // Hàm tạo view kết quả cho đơn vị cấp điện (dạng bảng)
    function createUnitResultView(data, districtName, fromDate, toDate) {
        // Tạo một DOM ảo để phân tích HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        
        // Lấy tất cả các dòng trong bảng
        const rows = doc.querySelectorAll('table tbody tr');
        let tableRows = '';
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 4) {
                // Xử lý thời gian
                const startTime = decodeHtmlEntities(cells[0].textContent.trim());
                const endTime = decodeHtmlEntities(cells[1].textContent.trim());
                
                // Tách ngày và giờ
                const startParts = startTime.split(' ');
                const endParts = endTime.split(' ');
                
                // Xử lý địa điểm (decode HTML entities)
                const location = decodeHtmlEntities(cells[2].textContent.trim())
                    .replace(/Mất điện:/g, '').trim();
                
                // Xử lý lý do (decode HTML entities)
                const reason = decodeHtmlEntities(cells[3].textContent.trim());
                
                tableRows += `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-calendar-day table-icon"></i>
                                <span>${startParts[0]}</span>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-clock table-icon"></i>
                                <span>${startParts[1] || ''}</span>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-history table-icon"></i>
                                <span>${endParts[1] || ''}</span>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex">
                                <i class="fas fa-map-marker-alt table-icon mt-1"></i>
                                <span>${location}</span>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex">
                                <i class="fas fa-info-circle table-icon mt-1"></i>
                                <span>${reason}</span>
                            </div>
                        </td>
                    </tr>
                `;
            }
        });
        
        return `
            <div class="result-container">
                <div class="result-header">
                    <i class="fas fa-bolt"></i>
                    <span>LỊCH CÚP ĐIỆN</span>
                </div>
                <div class="p-3 bg-light">
                    <div><strong>Khu vực:</strong> ${districtName}</div>
                    <div><strong>Thời gian tra cứu:</strong> Từ ${fromDate} đến ${toDate}</div>
                </div>
                <div class="table-responsive">
                    <table class="result-table">
                        <thead>
                            <tr>
                                <th>Ngày</th>
                                <th>Bắt đầu</th>
                                <th>Kết thúc</th>
                                <th>Khu vực</th>
                                <th>Lý do</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
});