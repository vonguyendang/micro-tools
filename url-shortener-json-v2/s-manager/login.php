<?php
// /s-manager/login.php
session_start();
require_once '../config.php'; // Đường dẫn tới file config.php ở thư mục gốc

$login_error = '';

// Chuyển hướng nếu đã đăng nhập
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    header('Location: index.php'); // Chuyển đến trang quản lý chính (index.php thay vì index.html)
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Nếu bạn hash mật khẩu trong config.php:
    // if ($username === ADMIN_USERNAME && password_verify($password, ADMIN_PASSWORD_HASH)) {
    if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) { // Sử dụng so sánh đơn giản nếu không hash
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header('Location: index.php'); // Chuyển hướng đến trang quản lý chính (index.php)
        exit;
    } else {
        $login_error = 'Tên đăng nhập hoặc mật khẩu không đúng!';
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng nhập Quản Trị</title>
    <link rel="icon" href="../android-chrome-192x192.png" type="image/png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Poppins', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Gradient giống trang chủ */
            padding: 20px;
        }
        .login-container {
            background: #fff;
            padding: 40px 35px; /* Tăng padding một chút */
            border-radius: 12px; /* Bo góc mềm mại hơn */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); /* Shadow rõ nét hơn */
            text-align: center;
            width: 100%;
            max-width: 420px; /* Tăng nhẹ max-width */
            transition: transform 0.3s ease;
        }
        .login-container:hover {
            transform: translateY(-5px); /* Hiệu ứng nhấc nhẹ khi hover */
        }
        .login-container h1 {
            margin-bottom: 30px; /* Tăng khoảng cách dưới tiêu đề */
            color: #2c3e50; /* Màu tiêu đề đậm hơn */
            font-size: 1.8rem; /* Kích thước tiêu đề */
            font-weight: 600;
        }
        .form-group {
            margin-bottom: 20px; /* Khoảng cách giữa các input group */
            position: relative; /* Để đặt icon (nếu có) */
        }
        .login-container input[type="text"],
        .login-container input[type="password"] {
            width: 100%;
            padding: 14px 18px; /* Padding cho input */
            /* padding-left: 45px;  Nếu dùng icon bên trong input */
            font-size: 1rem;
            font-family: 'Poppins', sans-serif;
            border: 1px solid #dfe4ea;
            border-radius: 8px; /* Bo góc cho input */
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            outline: none;
        }
        .login-container input[type="text"]::placeholder,
        .login-container input[type="password"]::placeholder {
            color: #999;
        }
        .login-container input[type="text"]:focus,
        .login-container input[type="password"]:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.15);
        }
        /* CSS cho icon (nếu dùng Font Awesome)
        .form-group .icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #aaa;
            font-size: 1.1rem;
        }
        .login-container input[type="text"]:focus + .icon,
        .login-container input[type="password"]:focus + .icon {
            color: #007bff;
        }
        */

        .login-container button[type="submit"] {
            width: 100%;
            padding: 14px 20px;
            font-size: 1.05rem;
            font-weight: 500;
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(to right, #007bff, #0056b3); /* Gradient cho button */
            color: #fff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
        }
        .login-container button[type="submit"]:hover {
            background: linear-gradient(to right, #0056b3, #004085);
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .login-container button[type="submit"]:active {
            transform: translateY(0);
            box-shadow: none;
        }
        .login-container .error {
            color: #e74c3c; /* Màu đỏ dễ chịu hơn */
            background-color: rgba(231, 76, 60, 0.1); /* Nền đỏ nhạt */
            border: 1px solid rgba(231, 76, 60, 0.2);
            padding: 10px;
            margin-top: 20px; /* Khoảng cách với nút */
            border-radius: 6px; /* Bo góc cho thông báo lỗi */
            font-size: 0.9rem;
            text-align: left; /* Căn trái text trong box lỗi */
        }
        .app-logo { /* Tùy chọn: Thêm logo nếu muốn */
            width: 80px; /* Điều chỉnh kích thước logo */
            height: auto;
            margin-bottom: 20px;
        }

    </style>
</head>
<body>
    <div class="login-container">
        <h1>Đăng nhập Quản Trị</h1>
        <form method="POST" action="login.php" novalidate>
            <div class="form-group">
                <input type="text" name="username" placeholder="Tên đăng nhập" required autocomplete="username">
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="Mật khẩu" required autocomplete="current-password">
            </div>
            <button type="submit">Đăng nhập</button>
            <?php if ($login_error): ?>
                <p class="error"><?php echo htmlspecialchars($login_error); // Nên dùng htmlspecialchars để tránh XSS ?></p>
            <?php endif; ?>
        </form>
    </div>
</body>
</html>