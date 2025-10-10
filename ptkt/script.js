// Hàm tạo iframes dựa trên hàng và cột
function createIframes() {
    const container = document.getElementById("iframe-container");
    const rowsInput = document.getElementById("rows");
    const colsInput = document.getElementById("cols");

    let rows = parseInt(rowsInput.value, 10);
    let cols = parseInt(colsInput.value, 10);

    // Giới hạn giá trị nhập vào từ 1 đến 8
    if (isNaN(rows) || rows < 1) {
        rows = 1;
        rowsInput.value = 1;
    }
    if (rows > 8) {
        rows = 8;
        rowsInput.value = 8;
    }
    if (isNaN(cols) || cols < 1) {
        cols = 1;
        colsInput.value = 1;
    }
    if (cols > 8) {
        cols = 8;
        colsInput.value = 8;
    }

    const count = rows * cols;
    container.innerHTML = "";
    const url = "https://smoney.vodang2702.workers.dev/phan-tich-ky-thuat";

    // Thiết lập grid layout cho container
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 1; i <= count; i++) {
        const panel = document.createElement("div");
        panel.className = "panel";
        const iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.title = `Kỹ thuật ${i}`;
        panel.appendChild(iframe);
        container.appendChild(panel);
    }
}

// Gắn sự kiện sau khi DOM đã được tải
document.addEventListener("DOMContentLoaded", function () {
    const updateButton = document.getElementById("update-btn");
    const maxButton = document.getElementById("max-btn");
    const rowsInput = document.getElementById("rows");
    const colsInput = document.getElementById("cols");

    const toggleBtn = document.getElementById("toggle-controls-btn");
    const controlsPanel = document.querySelector(".controls");

    toggleBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        controlsPanel.classList.toggle("visible");
    });

    controlsPanel.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    window.addEventListener("click", function () {
        if (controlsPanel.classList.contains("visible")) {
            controlsPanel.classList.remove("visible");
        }
    });

    updateButton.addEventListener("click", createIframes);
    maxButton.addEventListener("click", function () {
        rowsInput.value = 8;
        colsInput.value = 8;
        createIframes();
    });

    createIframes();
});
