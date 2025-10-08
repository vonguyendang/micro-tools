// Hàm tạo iframes vẫn giữ nguyên
function createIframes() {
    const container = document.getElementById('iframe-container');
    const screenCountInput = document.getElementById('screen-count');
    let count = parseInt(screenCountInput.value, 10);

    if (isNaN(count) || count < 1) {
        count = 1;
        screenCountInput.value = 1;
    }
    if (count > 8) {
        count = 8;
        screenCountInput.value = 8;
    }
    
    container.innerHTML = '';
    const url = "https://smoney.vodang2702.workers.dev/phan-tich-ky-thuat";

    for (let i = 1; i <= count; i++) {
        const panel = document.createElement('div');
        panel.className = 'panel';
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.title = `Kỹ thuật ${i}`;
        panel.appendChild(iframe);
        container.appendChild(panel);
    }
}

// Gắn sự kiện sau khi DOM đã được tải
document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.getElementById('update-btn');
    const maxButton = document.getElementById('max-btn');
    const screenCountInput = document.getElementById('screen-count');
    
    // --- PHẦN LOGIC MỚI ĐỂ ẨN/HIỆN BẢNG ĐIỀU KHIỂN ---
    const toggleBtn = document.getElementById('toggle-controls-btn');
    const controlsPanel = document.querySelector('.controls');

    // 1. Khi bấm nút ⚙️, hiện/ẩn bảng điều khiển
    toggleBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
        controlsPanel.classList.toggle('visible');
    });

    // 2. Khi bấm vào chính bảng điều khiển, không làm gì cả
    controlsPanel.addEventListener('click', function(event) {
        event.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    });

    // 3. Khi bấm vào bất cứ đâu khác trên trang, ẩn bảng điều khiển đi
    window.addEventListener('click', function() {
        if (controlsPanel.classList.contains('visible')) {
            controlsPanel.classList.remove('visible');
        }
    });
    // --- KẾT THÚC PHẦN LOGIC MỚI ---

    // Gắn sự kiện cho các nút trong bảng điều khiển
    updateButton.addEventListener('click', createIframes);
    maxButton.addEventListener('click', function() {
        screenCountInput.value = 8;
        createIframes();
    });
    
    // Tự động chạy lần đầu
    createIframes();
});