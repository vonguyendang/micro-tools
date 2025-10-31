// script.js
let loggedInUser = null;
let jwtToken = null;
let userConfigurations = {};
const API_URL = './api.php';

// --- HELPER & UI FUNCTIONS ---
const getCurrentConfig = () => ({
    rows: document.getElementById("rows").value,
    cols: document.getElementById("cols").value,
    urlMode: document.querySelector('input[name="url-mode"]:checked').value,
    singleUrl: document.getElementById("single-url").value,
    urls: Array.from(document.querySelectorAll('#multi-url-inputs input')).map(input => input.value)
});

const applyConfig = (config) => {
    if (!config) return;
    document.getElementById("rows").value = config.rows;
    document.getElementById("cols").value = config.cols;
    const urlModeRadio = document.querySelector(`input[name="url-mode"][value="${config.urlMode}"]`);
    if (urlModeRadio) {
        urlModeRadio.checked = true;
        urlModeRadio.dispatchEvent(new Event('change'));
    }
    document.getElementById('single-url').value = config.singleUrl;
    if (config.urlMode === 'multiple') {
        setTimeout(() => {
            const multiUrlInputs = document.querySelectorAll('#multi-url-inputs input');
            config.urls.forEach((url, index) => {
                if (multiUrlInputs[index]) multiUrlInputs[index].value = url;
            });
            createIframes();
        }, 0);
    } else {
        createIframes();
    }
};

const populateConfigSelect = () => {
    const select = document.getElementById('config-select');
    select.innerHTML = '<option value="">-- Chọn cấu hình --</option>';
    for (const name in userConfigurations) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
    }
};

const updateUIAfterLogin = (username, configurations) => {
    document.getElementById('auth-form').classList.add('hidden');
    document.getElementById('user-status').classList.remove('hidden');
    document.getElementById('welcome-message').textContent = `Chào, ${username}!`;
    userConfigurations = configurations || {};
    populateConfigSelect();
};

const updateUIAfterLogout = () => {
    document.getElementById('auth-form').classList.remove('hidden');
    document.getElementById('user-status').classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    loggedInUser = null;
    jwtToken = null;
    userConfigurations = {};
};

// --- API REQUEST HANDLER ---
async function handleApiRequest(action, data) {
    try {
        const headers = { 'Content-Type': 'application/json' };
        if (jwtToken) headers['Authorization'] = `Bearer ${jwtToken}`;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ action, ...data }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Có lỗi xảy ra.');
        return result;
    } catch (error) {
        alert(`Lỗi: ${error.message}`);
        return null;
    }
}

// --- CORE GRID FUNCTIONS (ĐÃ CẬP NHẬT ĐỂ DÙNG PROXY) ---
function createIframes() {
    const container = document.getElementById("iframe-container");
    const rowsInput = document.getElementById("rows");
    const colsInput = document.getElementById("cols");
    const urlMode = document.querySelector('input[name="url-mode"]:checked').value;
    const singleUrl = document.getElementById("single-url").value;
    let rows = parseInt(rowsInput.value, 10);
    let cols = parseInt(colsInput.value, 10);
    rows = Math.max(1, Math.min(8, isNaN(rows) ? 1 : rows));
    cols = Math.max(1, Math.min(8, isNaN(cols) ? 1 : cols));
    rowsInput.value = rows;
    colsInput.value = cols;
    const count = rows * cols;
    container.innerHTML = "";
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    const multiUrlInputs = document.querySelectorAll('#multi-url-inputs input');
    for (let i = 0; i < count; i++) {
        const panel = document.createElement("div");
        panel.className = "panel";
        const iframe = document.createElement("iframe");
        
        const originalSrc = urlMode === 'single' ? singleUrl : (multiUrlInputs[i] ? multiUrlInputs[i].value : "");
        
        // Luôn sử dụng proxy.php để tải nội dung
        if (originalSrc) {
            iframe.src = `proxy.php?url=${encodeURIComponent(originalSrc)}`;
        } else {
            iframe.src = "";
        }
        
        iframe.title = `Khung ${i + 1}`;
        // Không cần sandbox khi dùng proxy kiểu này
        panel.appendChild(iframe);
        container.appendChild(panel);
    }
}

function generateUrlInputs() {
    const multiUrlContainer = document.getElementById("multi-url-inputs");
    const rows = parseInt(document.getElementById("rows").value, 10);
    const cols = parseInt(document.getElementById("cols").value, 10);
    const count = rows * cols;
    multiUrlContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `URL cho khung ${i + 1}`;
        multiUrlContainer.appendChild(input);
    }
}

// --- EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const toggleBtn = document.getElementById("toggle-controls-btn");
    const controlsPanel = document.querySelector(".controls");

    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        controlsPanel.classList.toggle("visible");
    });
    controlsPanel.addEventListener("click", (e) => {
        e.stopPropagation();
    });
    window.addEventListener("click", () => {
        if (controlsPanel.classList.contains("visible")) {
            controlsPanel.classList.remove("visible");
        }
    });

    document.getElementById("register-btn").addEventListener("click", async () => {
        const result = await handleApiRequest('register', { username: usernameInput.value, password: passwordInput.value });
        if (result) alert(result.message);
    });

    document.getElementById("login-btn").addEventListener("click", async () => {
        const result = await handleApiRequest('login', { username: usernameInput.value, password: passwordInput.value });
        if (result && result.token) {
            alert(result.message);
            loggedInUser = usernameInput.value;
            jwtToken = result.token;
            updateUIAfterLogin(loggedInUser, result.configurations);
        }
    });

    document.getElementById("logout-btn").addEventListener("click", () => {
        updateUIAfterLogout();
        alert("Bạn đã đăng xuất.");
    });

    document.getElementById("save-btn").addEventListener("click", async () => {
        const name = document.getElementById('config-name').value;
        if (!name) {
            alert("Vui lòng nhập tên cho cấu hình.");
            return;
        }
        const config = getCurrentConfig();
        const result = await handleApiRequest('save_config', { name, config });
        if (result) {
            alert(result.message);
            userConfigurations[name] = config;
            populateConfigSelect();
            document.getElementById('config-name').value = '';
            document.getElementById('config-select').value = name;
        }
    });

    document.getElementById("load-btn").addEventListener("click", () => {
        const name = document.getElementById('config-select').value;
        if (name && userConfigurations[name]) {
            applyConfig(userConfigurations[name]);
        } else {
            alert("Vui lòng chọn một cấu hình để tải.");
        }
    });

    document.getElementById("delete-btn").addEventListener("click", async () => {
        const name = document.getElementById('config-select').value;
        if (!name) {
            alert("Vui lòng chọn một cấu hình để xóa.");
            return;
        }
        if (confirm(`Bạn có chắc muốn xóa cấu hình "${name}" không?`)) {
            const result = await handleApiRequest('delete_config', { name });
            if (result) {
                alert(result.message);
                delete userConfigurations[name];
                populateConfigSelect();
            }
        }
    });

    document.getElementById("update-btn").addEventListener("click", createIframes);
    document.getElementById("max-btn").addEventListener("click", () => {
        document.getElementById("rows").value = 8;
        document.getElementById("cols").value = 8;
        createIframes();
    });
    document.querySelectorAll('input[name="url-mode"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const singleUrlInput = document.getElementById('single-url-input');
            const multiUrlInputs = document.getElementById('multi-url-inputs');
            if (e.target.value === 'single') {
                singleUrlInput.style.display = 'flex';
                multiUrlInputs.style.display = 'none';
            } else {
                singleUrlInput.style.display = 'none';
                multiUrlInputs.style.display = 'grid';
                generateUrlInputs();
            }
            createIframes();
        });
    });

    // Initial Setup
    document.querySelector('input[name="url-mode"]:checked').dispatchEvent(new Event('change'));
    createIframes();
});