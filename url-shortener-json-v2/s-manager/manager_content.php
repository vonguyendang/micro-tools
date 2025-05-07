<?php
// manager_content.php
// Session đã được bắt đầu ở file s-manager/index.php gọi file này.
?>
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý Liên kết</title>
    <link rel="icon" href="../android-chrome-192x192.png" type="image/png">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
</head>

<body>
    <div class="container" id="manager-container">
        <div class="user-info-logout" id="user-area">
            <span>Xin chào, <strong id="admin-username-display"><?php echo htmlspecialchars($_SESSION['username']); ?></strong>!</span>
            <a href="logout.php" id="logout-button">Đăng xuất</a>
        </div>

        <h1 id="page-title-manager">Quản lý Liên kết</h1>

        <div class="table-controls" id="table-controls-container">
            <input type="text" id="search-input" placeholder="Tìm kiếm Short URL (Alias) hoặc Original URL...">
        </div>

        <form id="add-link-form">
            <input type="text" id="add-form-short-url" name="short_url_admin" placeholder="Nhập Short URL (Alias)"> <input type="url" id="add-form-original-url" name="original_url_admin" placeholder="Nhập Original URL (Link gốc)" required>
            <button type="submit" id="add-link-submit-button">
                <i class="fas fa-plus-circle"></i> Thêm Liên kết
            </button>
        </form>

        <div class="table-responsive" id="links-table-wrapper">
            <table id="links-table">
                <thead id="links-table-head">
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Short URL (Alias)</th>
                        <th>Original URL</th>
                        <th>Số click</th>
                        <th>Ngày tạo</th>
                        <th>Ngày sửa</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody id="links-table-body">
                </tbody>
            </table>
        </div>
        <div id="pagination-controls" style="text-align: center; margin-top: 20px;">
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    <script src="script.js"></script>
</body>

</html>