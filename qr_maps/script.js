let map;
let marker;

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. KHAI BÁO CÁC LỚP BẢN ĐỒ ---
    const standardMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    });

    const satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri',
        maxZoom: 19
    });

    const topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    const minimalistMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });

    const transportLayer = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '© <a href="http://www.thunderforest.com/">Thunderforest</a>, © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: '<your-thunderforest-api-key>',
        maxZoom: 22
    });

    const baseLayers = {
        "Bản đồ Tiêu chuẩn": standardMap,
        "Bản đồ Vệ tinh": satelliteMap,
        "Bản đồ Địa hình": topoMap,
        "Bản đồ Tối giản": minimalistMap,
    };

    const overlayLayers = {
        "Giao thông Công cộng": transportLayer
    };

    // --- 2. KHỞI TẠO BẢN ĐỒ VÀ CÁC SỰ KIỆN ---
    const defaultCoords = [10.0182668, 105.7644361]; // Tọa độ Cần Thơ
    map = L.map('map', {
        layers: [standardMap]
    }).setView(defaultCoords, 13);
    
    L.control.layers(baseLayers, overlayLayers).addTo(map);

    // ⭐ LOGIC NHẤN GIỮ ĐÃ SỬA LỖI CHO DI ĐỘNG
        const placeMarker = (e) => {
        if (feedbackPopup) { map.closePopup(feedbackPopup); }
        const coords = e.latlng;
        if (!marker) {
            marker = L.marker(coords, { draggable: true }).addTo(map);
        } else {
            marker.setLatLng(coords);
        }
        document.getElementById('generate-qr-button').style.display = 'block';
    };

    // --- Logic cho MÁY TÍNH (Sự kiện chuột) ---
    let mousePressTimer = null;

    const handleMouseDown = (e) => {
        // Nếu nhấn chuột phải thì bỏ qua
        if (e.originalEvent.button === 2) return;
        
        clearTimeout(mousePressTimer);
        mousePressTimer = setTimeout(() => {
            placeMarker(e);
        }, 2000); // 2 giây
    };

    const handleMouseUpOrMove = () => {
        // Bất kỳ hành động nhả chuột hay di chuyển chuột đều hủy timer
        clearTimeout(mousePressTimer);
    };

    map.on('mousedown', handleMouseDown);
    map.on('mouseup mousemove', handleMouseUpOrMove);

    // --- Logic cho DI ĐỘNG (Sự kiện chạm) ---
    let touchPressTimer = null;
    let feedbackPopup = null; 

    const handleTouchStart = (e) => {
        // Nếu là cử chỉ đa điểm (zoom), hủy mọi thứ và để Leaflet xử lý
        if (e.originalEvent.touches.length > 1) {
            handleTouchEnd();
            return;
        }
        
        // Với 1 ngón tay, bắt đầu khóa và đếm giờ
        map.dragging.disable();
        
        feedbackPopup = L.popup({ closeButton: false, autoClose: false, closeOnClick: false })
            .setLatLng(e.latlng)
            .setContent('Giữ yên để ghim...')
            .openOn(map);

        clearTimeout(touchPressTimer);
        touchPressTimer = setTimeout(() => {
            placeMarker(e);
            map.dragging.enable(); // Bật lại kéo sau khi ghim thành công
        }, 2000); // 2 giây
    };

    const handleTouchEnd = () => {
        clearTimeout(touchPressTimer);
        map.dragging.enable(); // Luôn bật lại kéo khi kết thúc chạm
        if (feedbackPopup) {
            map.closePopup(feedbackPopup);
        }
    };
    
    map.on('touchstart', handleTouchStart);
    map.on('touchend touchcancel', handleTouchEnd); // Chỉ hủy khi nhả hoặc bị hủy

    // Ngăn menu mặc định
    map.on('contextmenu', (e) => e.originalEvent.preventDefault());
    // ⭐ KẾT THÚC LOGIC

    // Gán sự kiện cho các nút
    document.getElementById('search-button').addEventListener('click', searchAddress);
    document.getElementById('address-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchAddress();
    });
    document.getElementById('generate-qr-button').addEventListener('click', generateAllQRCodes);
});

// --- 3. CÁC HÀM LOGIC CHÍNH ---
async function searchAddress() {
    const address = document.getElementById('address-input').value;
    if (!address) { alert('Vui lòng nhập địa chỉ.'); return; }
    const endpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data && data.length > 0) {
            const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            map.setView(coords, 17);
            if (!marker) {
                marker = L.marker(coords, { draggable: true }).addTo(map);
            } else {
                marker.setLatLng(coords);
            }
            document.getElementById('generate-qr-button').style.display = 'block';
        } else {
            alert('Không tìm thấy địa chỉ chính xác.\n\nMẸO: Hãy thử tìm tên đường, phường, hoặc một địa danh lớn gần đó.');
        }
    } catch (error) {
        console.error('Lỗi khi tìm kiếm:', error);
        alert('Đã xảy ra lỗi kết nối.');
    }
}

function generateAllQRCodes() {
    if (!marker) { alert('Chưa có vị trí nào được chọn trên bản đồ.'); return; }
    const position = marker.getLatLng();
    const lat = position.lat;
    const lng = position.lng;
    const urls = {
        google: `https://www.google.com/maps?q=${lat},${lng}`,
        apple: `http://maps.apple.com/?q=${lat},${lng}`,
        osm: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`,
        cdn: `${lat},${lng}`
    };
    const wrapper = document.getElementById('qrcode-container-wrapper');
    wrapper.innerHTML = '';
    wrapper.style.display = 'flex';
    createQrCard('Google Maps', urls.google, 'google');
    createQrCard('Apple Maps', urls.apple, 'apple');
    createQrCard('OpenStreetMap', urls.osm, 'osm');
    createQrCard('Tọa độ', urls.cdn, 'cdn');
}

function getTimestamp() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}${month}${year}-${hours}${minutes}${seconds}`;
}

function createQrCard(title, url, service) {
    const wrapper = document.getElementById('qrcode-container-wrapper');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'qr-code-item';
    const titleH3 = document.createElement('h3');
    titleH3.textContent = title;
    const qrImageContainer = document.createElement('div');
    qrImageContainer.className = 'qr-image-container';
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'qr-actions';
    const downloadLink = document.createElement('button');
    downloadLink.className = 'btn btn-download';
    downloadLink.textContent = 'Tải về';
    actionsDiv.appendChild(downloadLink);

    // ⭐ CHỈ THÊM NÚT "MỞ" NẾU URL LÀ LIÊN KẾT WEB
    if (url.startsWith('http')) {
        const openLink = document.createElement('a');
        openLink.className = 'btn btn-open';
        openLink.textContent = 'Mở';
        openLink.href = url;
        openLink.target = '_blank';
        actionsDiv.appendChild(openLink);
    }

    itemDiv.appendChild(titleH3);
    itemDiv.appendChild(qrImageContainer);
    itemDiv.appendChild(actionsDiv);
    wrapper.appendChild(itemDiv);

    const qrCode = new QRCodeStyling({
        width: 1200, height: 1200, data: url, image: "",
        dotsOptions: { color: "#000000", type: "square" },
        backgroundOptions: { color: "#ffffff" },
        margin: 80, qrOptions: { errorCorrectionLevel: 'H' }
    });
    qrCode.append(qrImageContainer);

    downloadLink.addEventListener('click', () => {
        const timestamp = getTimestamp();
        const fileName = `qr-${service}-${timestamp}`; // Đã bỏ "-maps" để tên file gọn hơn
        qrCode.download({ name: fileName, extension: 'png' });
    });
}