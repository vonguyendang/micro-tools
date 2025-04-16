/// console.log("script.js đã được tải!");

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

    let provinceId;
    let districtId;

    // Load danh sách huyện khi chọn tỉnh
    $('#province').change(function() {
        const provinceCode = $(this).val();
        $('#district').html('<option value=""><i class="fas fa-spinner fa-spin me-2"></i>Đang tải...</option>');
        $('#ward').html('<option value="">-- Chọn Xã/Phường --</option>'); // Reset ward dropdown
        $('#loadingUnit').html(`
            <div class="text-center py-3">
                <div class="spinner-border text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2"><i class="fas fa-sync-alt fa-spin me-2"></i>Đang tải danh sách quận/huyện...</p>
            </div>
        `).show();

        if (provinceCode) {
            let districtRetryCount = 0;
            function loadDistricts() {
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
                        $('#district').html(data);
                        $('#loadingUnit').hide();
                        $('#district').prepend('<option value="" selected><i class="fas fa-map-marker-alt me-2"></i>-- Chọn Quận/Huyện --</option>');
                        districtRetryCount = 0;

                        // Lấy ID tỉnh
                        const provinceName = $('#province option:selected').text();
                        const provinceWords = provinceName.split(' ');
                        const provinceQuery = provinceWords.slice(-2).join(' ');
                        $.ajax({
                            url: `https://open.oapi.vn/location/provinces?page=0&size=30&query=${encodeURIComponent(provinceQuery)}`,
                            method: 'GET',
                            success: function(provinceData) {
                                if (provinceData.code === 'success' && provinceData.data.length > 0) {
                                    provinceId = provinceData.data[0].id;
                                } else {
                                    console.error("Không tìm thấy ID tỉnh:", provinceQuery);
                                    provinceId = null;
                                }
                            },
                            error: function(error) {
                                console.error("Lỗi khi lấy ID tỉnh:", error);
                                provinceId = null;
                            }
                        });

                    },
                    error: function() {
                        console.error("Lỗi khi tải danh sách quận/huyện");
                        if (districtRetryCount < 10) {
                            districtRetryCount++;
                            console.log(`Thử lại tải danh sách quận/huyện lần thứ ${districtRetryCount}...`);
                            setTimeout(loadDistricts, 1000);
                        } else {
                            $('#loadingUnit').html(`
                                <div class="alert alert-danger">
                                    <i class="fas fa-exclamation-triangle me-2"></i>Có lỗi xảy ra khi tải danh sách quận/huyện sau nhiều lần thử
                                </div>
                            `);
                            $('#district').html('<option value=""><i class="fas fa-times-circle me-2"></i>Không tải được dữ liệu</option>');
                            setTimeout(() => $('#loadingUnit').hide(), 3000);
                            districtRetryCount = 0;
                        }
                    }
                });
            }
            loadDistricts();
        } else {
            $('#district').html('<option value=""><i class="fas fa-map-marker-alt me-2"></i>-- Chọn Quận/Huyện --</option>');
            $('#loadingUnit').hide();
        }
    });

    // Load danh sách xã/phường khi chọn huyện
    $('#district').change(function() {
        const districtName = $(this).find("option:selected").text();
        $('#ward').html('<option value=""><i class="fas fa-spinner fa-spin me-2"></i>Đang tải...</option>');
        if (districtName && provinceId) {
            const districtWords = districtName.split(' ');
            const districtQuery = districtWords.slice(-2).join(' ');
            $.ajax({
                url: `https://open.oapi.vn/location/districts/${provinceId}?page=0&size=30&query=${encodeURIComponent(districtQuery)}`,
                method: 'GET',
                success: function(districtData) {
                    if (districtData.code === 'success' && districtData.data.length > 0) {
                        districtId = districtData.data[0].id;
                        // Lấy danh sách xã/phường
                        $.ajax({
                            url: `https://open.oapi.vn/location/wards/${districtId}?page=0&size=1000&query=`,
                            method: 'GET',
                            success: function(wardData) {
                                if (wardData.code === 'success' && wardData.data.length > 0) {
                                    let wardOptions = '<option value="" selected>-- Tất cả Xã/Phường --</option>';
                                    wardData.data.forEach(ward => {
                                        wardOptions += `<option value="${ward.name}">${ward.name}</option>`;
                                    });
                                    $('#ward').html(wardOptions);
                                } else {
                                    $('#ward').html('<option value="">-- Không có Xã/Phường --</option>');
                                }
                            },
                            error: function(error) {
                                console.error("Lỗi khi lấy danh sách xã/phường:", error);
                                $('#ward').html('<option value="">-- Lỗi tải Xã/Phường --</option>');
                            }
                        });
                    } else {
                        console.error("Không tìm thấy ID huyện:", districtQuery);
                        districtId = null;
                        $('#ward').html('<option value="">-- Không có Xã/Phường --</option>');
                    }
                },
                error: function(error) {
                    console.error("Lỗi khi lấy ID huyện:", error);
                    districtId = null;
                    $('#ward').html('<option value="">-- Lỗi tải Xã/Phường --</option>');
                }
            });
        } else {
            $('#ward').html('<option value="">-- Chọn Xã/Phường --</option>');
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

        // Format lại ngày từ<\ctrl3348>-MM-DD sang DD-MM-YYYY
        const fromDateFormatted = formatDateForAPI(fromDate);
        const toDateFormatted = formatDateForAPI(toDate);

        let customerRetryCount = 0;
        function searchCustomerData() {
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
                    customerRetryCount = 0; // Reset retry count on success

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
                    if (customerRetryCount < 10) {
                        customerRetryCount++;
                        console.log(`Thử lại tra cứu theo mã khách hàng lần thứ ${customerRetryCount}...`);
                        setTimeout(searchCustomerData, 1000); // Chờ 1 giây trước khi thử lại
                    } else {
                        $('#loadingCustomer').html(`
                            <div class="alert alert-danger">
                                <i class="fas fa-times-circle me-2"></i>
                                Có lỗi xảy ra khi tra cứu sau nhiều lần thử. Vui lòng thử lại sau.
                            </div>
                        `);
                        setTimeout(() => $('#loadingCustomer').hide(), 3000);
                        customerRetryCount = 0; // Reset retry count on final failure
                    }
                }
            });
        }
        searchCustomerData();
    });

    // Tra cứu theo đơn vị cấp điện
    $('#searchUnit').click(function() {
        const districtCode = $('#district').val();
        const fromDate = $('#fromDateUnit').val();
        const toDate = $('#toDateUnit').val();
        const selectedWard = $('#ward').val(); // Lấy xã/phường đã chọn

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

        $('#loadingUnit').html(`
            <div class="text-center py-4">
                <div class="spinner-border text-danger" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3"><i class="fas fa-search me-2"></i>Đang tìm kiếm thông tin...</p>
            </div>
        `).show();

        $('#unitResult').html('');

        const fromDateFormatted = formatDateForAPI(fromDate);
        const toDateFormatted = formatDateForAPI(toDate);

        let unitRetryCount = 0;
        function searchUnitData() {
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
                    $('#loadingUnit').hide();
                    unitRetryCount = 0;

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
                        const resultHtml = createUnitResultView(data, districtName, fromDate, toDate, selectedWard); // Truyền selectedWard
                        $('#unitResult').html(resultHtml);
                    }
                },
                error: function() {
                    console.error("Lỗi khi tra cứu theo đơn vị cấp điện");
                    if (unitRetryCount < 10) {
                        unitRetryCount++;
                        console.log(`Thử lại tra cứu theo đơn vị cấp điện lần thứ ${unitRetryCount}...`);
                        setTimeout(searchUnitData, 1000);
                    } else {
                        $('#loadingUnit').html(`
                            <div class="alert alert-danger">
                                <i class="fas fa-times-circle me-2"></i>
                                Có lỗi xảy ra khi tra cứu sau nhiều lần thử. Vui lòng thử lại sau.
                            </div>
                        `);
                        setTimeout(() => $('#loadingUnit').hide(), 3000);
                        unitRetryCount = 0;
                    }
                }
            });
        }
        searchUnitData();
    });

    // Hàm chuyển đổi định dạng ngày từ<\ctrl3348>-MM-DD sang DD-MM-YYYY
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

    // Hàm chuyển đổi định dạng ngày từ<\ctrl3348>-MM-DD sang DD-MM-YYYY
    function formatDateToDDMMYYYY(dateString) {
        const parts = dateString.split('-');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    // Hàm tạo view kết quả cho đơn vị cấp điện (dạng bảng)
    // Hàm tạo view kết quả cho đơn vị cấp điện (dạng bảng)
    function createUnitResultView(data, districtName, fromDate, toDate, wardName) {
        // Tạo một DOM ảo để phân tích HTML
        const parser = new DOMParser();
        const wardWords = wardName ? wardName.split(' ') : [];
        const wardQuery = wardWords.slice(-2).join(' ');
        const doc = parser.parseFromString(data, 'text/html');
        // Lấy tất cả các dòng trong bảng
        const rows = doc.querySelectorAll('table tbody tr');
        // Lấy các dòng trong bảng có chứa phường xã đã chọn
        const filteredRows = Array.from(rows).filter(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3 && wardQuery) {
                const location = decodeHtmlEntities(cells[2].textContent.trim())
                    .replace(/Mất điện:/g, '')
                    .trim()
                    .toLowerCase(); // Chuyển về chữ thường
                
                return location.includes(wardQuery.toLowerCase()); // So sánh chữ thường
            }
            return true;
        });
        let tableRows = '';
        let hasResults = false;

        filteredRows.forEach(row => {
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

                hasResults = true;
                tableRows += `
                    <tr>
                        <td>
                            <div class="d-flex flex-column">
                                <div class="d-flex align-items-center">
                                    <i class="fas fa-calendar-day table-icon me-2"></i>
                                    <span>${startParts[0]}</span>
                                </div>
                                <div class="d-flex align-items-center mt-1">
                                    <i class="fas fa-clock table-icon me-2"></i>
                                    <span>${startParts[1] || ''}</span>
                                </div>
                                <div class="d-flex align-items-center mt-1">
                                    <i class="fas fa-history table-icon me-2"></i>
                                    <span>${endParts[1] || ''}</span>
                                </div>
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

        if (!hasResults && wardName) {
            return `
                <div class="result-container">
                    <div class="result-header">
                        <i class="fas fa-bolt"></i>
                        <span>LỊCH CÚP ĐIỆN</span>
                    </div>
                    <div class="p-3 bg-light">
                        <div><strong>Khu vực:</strong> ${districtName}</div>
                        <div><strong>Thời gian tra cứu:</strong> Từ ${fromDate} đến ${toDate}</div>
                        <div><strong>Xã/Phường:</strong> ${wardName}</div>
                    </div>
                    <div class="alert alert-info mt-3">
                        <i class="fas fa-info-circle me-2"></i>Không có lịch cúp điện nào phù hợp với xã/phường đã chọn.
                    </div>
                </div>
            `;
        }

        return `
            <div class="result-container">
                <div class="result-header">
                    <i class="fas fa-bolt"></i>
                    <span>LỊCH CÚP ĐIỆN</span>
                </div>
                <div class="p-3 bg-light">
                    <div><strong>Khu vực:</strong> ${districtName}</div>
                    <div><strong>Thời gian tra cứu:</strong> Từ ${fromDate} đến ${toDate}</div>
                    ${wardName ? `<div><strong>Xã/Phường:</strong> ${wardName}</div>` : ''}
                </div>
                <div class="table-responsive">
                    <table class="result-table">
                        <thead>
                            <tr>
                                <th>Thời gian</th>
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