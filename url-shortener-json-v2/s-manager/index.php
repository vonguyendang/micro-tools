<?php
// /s-manager/index.php
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: login.php');
    exit;
}
// Nếu đã đăng nhập, hiển thị nội dung trang quản lý
require 'manager_content.php';
?>