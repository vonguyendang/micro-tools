<?php
// config/config.php

// Đường dẫn đến thư mục cache
define('CACHE_PATH', __DIR__ . '/../cache');

// Đường dẫn đến file dữ liệu JSON gốc
define('DATA_JSON_PATH', __DIR__ . '/../data/vn-location.json');

// Tên file cache dữ liệu PHP
define('DATA_CACHE_FILE', CACHE_PATH . '/location_data.php');

// Có thể thêm các cấu hình khác ở đây

// --- Error Reporting (Development vs Production) ---
// error_reporting(E_ALL);
// ini_set('display_errors', '1'); // Bật khi phát triển
ini_set('display_errors', '0'); // Tắt khi triển khai production
ini_set('log_errors', '1');
// ini_set('error_log', CACHE_PATH . '/../logs/php_errors.log'); // Ghi log lỗi vào file

// --- Timezone ---
date_default_timezone_set('Asia/Ho_Chi_Minh');

// Api cập nhật dữ liệu vn-location.json
// Nếu bạn muốn tự động cập nhật dữ liệu từ vn-location.json, bạn có thể thêm logic ở đây
// https://provinces.open-api.vn/api/?depth=3