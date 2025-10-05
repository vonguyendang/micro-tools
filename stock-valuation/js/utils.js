/**
 * utils.js
 * Chứa các hàm tiện ích và các lớp có thể tái sử dụng.
 */

/**
 * Lấy khoảng thời gian mặc định cho các lệnh gọi API (10 năm trước đến 1 năm sau).
 * @returns {Array<string>} Mảng chứa ngày bắt đầu và ngày kết thúc ở định dạng 'YYYY-MM-DD'.
 */
function getFilterDate() {
    let date = new Date();
    let fromDate = new Date(2000, 0, 1);
    let toDate = new Date(date.getFullYear() + 1, 11, 31);

    function formatDateToISO(d) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return [formatDateToISO(fromDate), formatDateToISO(toDate)];
}

/**
 * Định dạng một số thành chuỗi theo kiểu Việt Nam.
 * @param {number} num - Số cần định dạng.
 * @param {number} decimals - Số chữ số sau dấu phẩy.
 * @returns {string} Chuỗi đã được định dạng.
 */
function formatNumber(num, decimals = 0) {
    if (typeof num !== 'number' || isNaN(num) || num === null) return '0';
    const roundedNum = num.toFixed(decimals);
    const parts = roundedNum.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
}

/**
 * Định dạng ngày tháng từ nhiều loại input (string, timestamp) sang "dd/mm/yyyy".
 * @param {string|number} input - Dữ liệu ngày tháng đầu vào.
 * @returns {string} Chuỗi ngày tháng đã được định dạng.
 */
function formatDate(input) {
    if (!input) return 'N/A';
    let dateObj;

    if (typeof input === 'number' || /^\d{10,}$/.test(input.toString())) {
        dateObj = new Date(Number(input) * 1000);
    } 
    else if (typeof input === 'string') {
        dateObj = new Date(input.split('T')[0]);
    } 
    else {
        return 'N/A';
    }

    if (isNaN(dateObj.getTime())) return 'N/A';

    let day = String(dateObj.getDate()).padStart(2, '0');
    let month = String(dateObj.getMonth() + 1).padStart(2, '0');
    let year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
}


/**
 * Chuyển đổi chuỗi số kiểu Việt Nam thành số.
 * @param {string} inputStr - Chuỗi cần chuyển đổi.
 * @returns {number} Số đã được chuyển đổi.
 */
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

/**
 * Lấy class CSS phù hợp dựa trên giá.
 * @returns {string} Tên class CSS.
 */
function getPriceClass(current, ref, ceil, floor) {
    if (current === ceil && current > ref) return 'ceiling-price';
    if (current === floor && current < ref) return 'floor-price';
    if (current > ref) return 'price-up';
    if (current < ref) return 'price-down';
    return 'reference-price';
}

/**
 * Tạo chuỗi HTML để hiển thị đánh giá bằng sao.
 * @returns {string} Chuỗi HTML.
 */
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

/**
 * Lớp DataTable
 */
class DataTable {
    constructor(tableId, searchId, paginationId, columns, defaultSortColumn) {
        this.tableElem = document.getElementById(tableId);
        this.searchElem = document.getElementById(searchId);
        this.paginationElem = document.getElementById(paginationId);
        this.columns = columns;
        this.allData = [];
        this.filteredData = [];
        this.currentPage = 1;
        this.rowsPerPage = 10;
        this.sortColumn = defaultSortColumn;
        this.sortDirection = 'desc';

        this.searchElem.addEventListener('input', () => this.search());
    }

    loadData(data) {
        this.allData = data || [];
        this.filteredData = [...this.allData];
        this.setSort(this.sortColumn, this.sortDirection);
    }

    render() {
        this.tableElem.innerHTML = '';
        this.paginationElem.innerHTML = '';
        if (!this.tableElem) return;

        const thead = this.tableElem.createTHead();
        const headerRow = thead.insertRow();
        this.columns.forEach(col => {
            const th = document.createElement('th');
            th.innerHTML = `${col.header} <span class="sort-icon"><i class="fas fa-sort"></i></span>`;
            th.dataset.key = col.key;
            th.addEventListener('click', () => this.setSort(col.key));
            if (col.key === this.sortColumn) {
                th.classList.add(this.sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
                th.querySelector('.sort-icon').innerHTML = this.sortDirection === 'asc' ? '<i class="fas fa-sort-up"></i>' : '<i class="fas fa-sort-down"></i>';
            }
            headerRow.appendChild(th);
        });

        const tbody = this.tableElem.createTBody();
        const start = (this.currentPage - 1) * this.rowsPerPage;
        const end = start + this.rowsPerPage;
        const pageData = this.filteredData.slice(start, end);

        if (pageData.length === 0) {
            const row = tbody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = this.columns.length;
            cell.textContent = 'Không có dữ liệu phù hợp.';
            cell.style.textAlign = 'center';
        } else {
            pageData.forEach((item, index) => {
                const row = tbody.insertRow();
                this.columns.forEach(col => {
                    const cell = row.insertCell();
                    cell.innerHTML = col.render(item, start + index + 1);
                });
            });
        }
        
        this.renderPagination();
    }
    
    renderPagination() {
        const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);
        if (totalPages <= 1) return;

        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&laquo; Trước';
        prevButton.disabled = this.currentPage === 1;
        prevButton.addEventListener('click', () => {
            this.currentPage--;
            this.render();
        });

        const pageInfo = document.createElement('span');
        pageInfo.id = 'page-info';
        pageInfo.textContent = `Trang ${this.currentPage} / ${totalPages}`;

        const nextButton = document.createElement('button');
        nextButton.innerHTML = 'Sau &raquo;';
        nextButton.disabled = this.currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            this.currentPage++;
            this.render();
        });

        this.paginationElem.append(prevButton, pageInfo, nextButton);
    }
    
    search() {
        const query = this.searchElem.value.toLowerCase().trim();
        this.filteredData = this.allData.filter(item => {
            return this.columns.some(col => {
                 if (!col.searchable) return false;
                 const rawValue = col.render(item, 0);
                 const value = (rawValue || '').toString().toLowerCase();
                 return value.includes(query);
            });
        });
        this.currentPage = 1;
        this.sort();
    }

    setSort(key, direction) {
        if (direction) {
            this.sortDirection = direction;
        } else if (this.sortColumn === key) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortDirection = 'desc';
        }
        this.sortColumn = key;
        this.currentPage = 1;
        this.sort();
    }

    sort() {
        const col = this.columns.find(c => c.key === this.sortColumn);
        this.filteredData.sort((a, b) => {
            let valA, valB;
             if (this.sortColumn === 'updatedDate') {
                valA = a.listingdbSecuritiesInfo?.slice(-1)[0]?.updatedDate;
                valB = b.listingdbSecuritiesInfo?.slice(-1)[0]?.updatedDate;
             } else {
                valA = a[col.key];
                valB = b[col.key];
             }

            if (col.key.toLowerCase().includes('date')) {
                valA = valA ? new Date(valA).getTime() : 0;
                valB = valB ? new Date(valB).getTime() : 0;
            }

            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
            
            valA = valA || 0;
            valB = valB || 0;

            if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        this.render();
    }
}