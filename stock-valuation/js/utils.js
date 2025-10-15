/**
 * utils.js
 * Chứa các hàm tiện ích và các lớp có thể tái sử dụng.
 * Cập nhật: Thêm hàm md5 để hỗ trợ mã hóa mật khẩu.
 */

/**
 * Lấy khoảng thời gian mặc định cho các lệnh gọi API (từ năm 2000 đến 1 năm sau).
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
 * HÀM MỚI: Mã hóa MD5 (Cần thiết cho tính năng danh mục)
 */
var md5=function(string){function rotateLeft(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits));}
function addUnsigned(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4){return(lResult^0x80000000^lX8^lY8);}
if(lX4|lY4){if(lResult&0x40000000){return(lResult^0xC0000000^lX8^lY8);}else{return(lResult^0x40000000^lX8^lY8);}}else{return(lResult^lX8^lY8);}}
function F(x,y,z){return(x&y)|((~x)&z);}
function G(x,y,z){return(x&z)|(y&(~z));}
function H(x,y,z){return(x^y^z);}
function I(x,y,z){return(y^(x|(~z)));}
function FF(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(F(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};function GG(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(G(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};function HH(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(H(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};function II(a,b,c,d,x,s,ac){a=addUnsigned(a,addUnsigned(addUnsigned(I(b,c,d),x),ac));return addUnsigned(rotateLeft(a,s),b);};function convertToWordArray(string){var lWordCount;var lMessageLength=string.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));lByteCount++;}
lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray;};function wordToHex(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);}
return WordToHexValue;};function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}
else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}
else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}
return utftext;};var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string=Utf8Encode(string);x=convertToWordArray(string);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=addUnsigned(a,AA);b=addUnsigned(b,BB);c=addUnsigned(c,CC);d=addUnsigned(d,DD);}
var temp=wordToHex(a)+wordToHex(b)+wordToHex(c)+wordToHex(d);return temp.toLowerCase();}

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