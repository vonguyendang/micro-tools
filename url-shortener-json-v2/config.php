<?php
// config.php
define('ADMIN_USERNAME', 'admin'); // Thay bằng username bạn muốn
define('ADMIN_PASSWORD', 'admin'); // Thay bằng mật khẩu mạnh

// Để bảo mật hơn, bạn nên hash mật khẩu này:
// Ví dụ: define('ADMIN_PASSWORD_HASH', password_hash('your_secure_password', PASSWORD_DEFAULT));
// Và khi kiểm tra thì dùng password_verify($submitted_password, ADMIN_PASSWORD_HASH)
?>