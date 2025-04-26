<?php
// templates/api_help.php

// Biến $baseUrl được truyền từ Controller
$baseUrl = $baseUrl ?? ''; // Đảm bảo biến tồn tại
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Tra Cứu Địa Giới Hành Chính Việt Nam</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; line-height: 1.6; padding: 20px; max-width: 900px; margin: auto; color: #333; }
        h1, h2, h3 { color: #0056b3; border-bottom: 1px solid #eee; padding-bottom: 5px;}
        code { background-color: #eef; padding: 0.2em 0.4em; margin: 0; font-size: 85%; border-radius: 3px; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace; }
        pre { background-color: #f8f9fa; padding: 15px; border: 1px solid #eee; border-radius: 5px; overflow-x: auto; }
        pre code { background-color: transparent; padding: 0; border-radius: 0; }
        .endpoint { border: 1px solid #eee; border-left: 4px solid #0056b3; padding: 15px; margin-bottom: 25px; border-radius: 4px; background-color: #fff;}
        /* Thêm ID để scroll tới */
        .endpoint { scroll-margin-top: 20px; /* Khoảng đệm khi scroll tới */ }
        .endpoint-path { font-weight: bold; font-size: 1.1em; margin-bottom: 5px; color: #1a1a1a; }
        .params th, .params td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 0.95em;}
        .params th { background-color: #f2f2f2; font-weight: 600;}
        .response { margin-top: 10px; }
        .response strong { display: block; margin-bottom: 5px; font-size: 0.95em; color: #555; }
        a { color: #0056b3; text-decoration: none; }
        a:hover { text-decoration: underline; }
        hr { border: 0; border-top: 1px solid #eee; margin: 30px 0;}
        footer { margin-top: 30px; font-size: 0.9em; color: #777; text-align: center; border-top: 1px solid #eee; padding-top: 15px;}
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        /* CSS cho Menu */
        #api-menu {
            background-color: #f8f9fa;
            padding: 15px;
            margin-bottom: 30px;
            border: 1px solid #eee;
            border-radius: 5px;
        }
        #api-menu h3 {
            margin-top: 0;
            border-bottom: none;
            font-size: 1.2em;
            margin-bottom: 10px;
        }
        #api-menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
            columns: 2; /* Hiển thị thành 2 cột nếu đủ rộng */
            -webkit-columns: 2;
            -moz-columns: 2;
        }
        #api-menu li {
            margin-bottom: 8px;
        }
         #api-menu a {
            display: block; /* Để dễ nhấn hơn */
         }
    </style>
</head>
<body>
    <h1>API Tra Cứu Địa Giới Hành Chính Việt Nam</h1>
    <p>API này cung cấp dữ liệu về Tỉnh/Thành phố, Quận/Huyện, Phường/Xã của Việt Nam, được lấy từ dữ liệu nguồn bạn cung cấp.</p>
    <p>Tất cả các phản hồi thành công đều ở định dạng JSON (UTF-8).</p>
    <p>Base URL của API: <code><?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?></code></p>

    <nav id="api-menu">
        <h3>Mục lục API Endpoints</h3>
        <ul>
            <li><a href="#endpoint-provinces-list">GET /provinces</a></li>
            <li><a href="#endpoint-province-detail">GET /provinces/{code}</a></li>
            <li><a href="#endpoint-districts">GET /provinces/{code}/districts</a></li>
            <li><a href="#endpoint-wards">GET /wards?province_code=...</a></li>
            <li><a href="#endpoint-search">GET /search?q=...</a></li>
        </ul>
    </nav>
    <hr>

    <h2>Các Endpoints</h2>

    <div class="endpoint" id="endpoint-provinces-list"> <div class="endpoint-path">GET <?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/provinces</div>
        <p>Lấy danh sách tất cả các Tỉnh/Thành phố. Trả về mảng các đối tượng, mỗi đối tượng chứa <code>code</code> và <code>name</code>.</p>
        <p><strong>Ví dụ:</strong> <a href="<?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/provinces" target="_blank"><?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/provinces</a></p>
        <div class="response">
            <strong>Phản hồi mẫu:</strong>
            <pre><code class="language-json">[
    { "code": 1, "name": "Thành phố Hà Nội" },
    { "code": 79, "name": "Thành phố Hồ Chí Minh" },
    { "code": 86, "name": "Tỉnh Vĩnh Long" }
    ...
]</code></pre>
        </div>
    </div>

     <div class="endpoint" id="endpoint-province-detail"> <div class="endpoint-path">GET <?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/provinces/{province_code}</div>
        <p>Lấy thông tin chi tiết của một Tỉnh/Thành phố dựa vào mã tỉnh (<code>province_code</code>).</p>
        <p><strong>Ví dụ:</strong> <a href="<?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/provinces/86" target="_blank"><?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/provinces/86</a> (Lấy thông tin tỉnh Vĩnh Long)</p>
         <div class="response">
            <strong>Phản hồi mẫu:</strong>
            <pre><code class="language-json">{
    "name": "Tỉnh Vĩnh Long",
    "code": 86,
    "codename": "tinh_vinh_long",
    "division_type": "tỉnh",
    "phone_code": 270
}</code></pre>
        </div>
    </div>

    <div class="endpoint" id="endpoint-districts"> <div class="endpoint-path">GET <?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/provinces/{province_code}/districts</div>
        <p>Lấy danh sách các Quận/Huyện thuộc một Tỉnh/Thành phố cụ thể (dựa vào <code>province_code</code>). Trả về mảng các đối tượng huyện (code, name).</p>
         <p><strong>Cách khác (dùng Query Parameter):</strong> <code><?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/districts?province_code={province_code}</code></p>
        <p><strong>Ví dụ:</strong> <a href="<?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/provinces/86/districts" target="_blank"><?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/provinces/86/districts</a> (Lấy huyện của Vĩnh Long)</p>
         <p><strong>Ví dụ (Query Param):</strong> <a href="<?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/districts?province_code=86" target="_blank"><?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/districts?province_code=86</a></p>
        <div class="response">
            <strong>Phản hồi mẫu:</strong>
            <pre><code class="language-json">[
    { "code": 883, "name": "Thành phố Vĩnh Long" },
    { "code": 885, "name": "Huyện Long Hồ" },
    { "code": 887, "name": "Thị xã Bình Minh" },
    ...
]</code></pre>
        </div>
    </div>

    <div class="endpoint" id="endpoint-wards"> <div class="endpoint-path">GET <?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/wards</div>
        <p>Lấy danh sách các Phường/Xã thuộc một Quận/Huyện cụ thể. Cần cung cấp <strong>cả hai</strong> tham số <code>province_code</code> và <code>district_code</code>.</p>
        <p><strong>Tham số bắt buộc (Query Parameters):</strong></p>
        <table class="params">
            <thead><tr><th>Tham số</th><th>Mô tả</th><th>Ví dụ</th></tr></thead>
            <tbody>
                <tr><td><code>province_code</code></td><td>Mã của Tỉnh/Thành phố chứa quận/huyện</td><td><code>86</code> (Vĩnh Long)</td></tr>
                <tr><td><code>district_code</code></td><td>Mã của Quận/Huyện cần lấy phường/xã</td><td><code>887</code> (Thị xã Bình Minh)</td></tr>
            </tbody>
        </table>
        <p><strong>Ví dụ:</strong> <a href="<?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/wards?province_code=86&district_code=887" target="_blank"><?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/wards?province_code=86&district_code=887</a> (Lấy xã/phường của TX. Bình Minh, Vĩnh Long)</p>
         <div class="response">
            <strong>Phản hồi mẫu:</strong>
            <pre><code class="language-json">[
    { "code": 30217, "name": "Phường Cái Vồn" },
    { "code": 30218, "name": "Phường Đông Thuận" },
    { "code": 30223, "name": "Xã Thuận An" },
    ...
]</code></pre>
        </div>
    </div>

     <div class="endpoint" id="endpoint-search"> <div class="endpoint-path">GET <?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/search</div>
        <p>Tìm kiếm địa danh (Tỉnh/Huyện/Xã) theo tên. Hỗ trợ tìm kiếm bằng tiếng Việt có dấu và không dấu.</p>
         <p><strong>Tham số (Query Parameters):</strong></p>
         <table class="params">
            <thead><tr><th>Tham số</th><th>Bắt buộc?</th><th>Mô tả</th><th>Ví dụ</th></tr></thead>
             <tbody>
                <tr><td><code>q</code></td><td>Có</td><td>Chuỗi ký tự cần tìm kiếm.</td><td><code>vinh long</code>, <code>bình minh</code>, <code>ha noi</code></td></tr>
                <tr><td><code>type</code></td><td>Không</td><td>Loại địa danh (<code>province</code>, <code>district</code>, <code>ward</code>). Bỏ qua để tìm tất cả.</td><td><code>district</code></td></tr>
                 <tr><td><code>limit</code></td><td>Không</td><td>Số lượng kết quả tối đa (mặc định 20, tối đa 100).</td><td><code>10</code></td></tr>
            </tbody>
        </table>
         <p><strong>Ví dụ:</strong></p>
         <ul>
            <li><a href="<?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/search?q=binh+minh" target="_blank"><?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/search?q=binh+minh</a></li>
             <li><a href="<?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/search?q=vinh+long&type=province" target="_blank"><?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/search?q=vinh+long&type=province</a></li>
             <li><a href="<?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/search?q=đông+thuận&type=ward&limit=5" target="_blank"><?php echo htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8'); ?>/search?q=đông+thuận&type=ward&limit=5</a></li>
         </ul>
         <div class="response">
            <strong>Phản hồi mẫu (khi tìm <code>q=minh</code>):</strong>
            <pre><code class="language-json">[
    {
        "level": "province",
        "code": 79,
        "name": "Thành phố Hồ Chí Minh",
        "full_name": "Thành phố Hồ Chí Minh"
    },
    {
        "level": "district",
        "code": 887,
        "name": "Thị xã Bình Minh",
        "full_name": "Thị xã Bình Minh, Tỉnh Vĩnh Long",
        "province_code": 86,
        "province_name": "Tỉnh Vĩnh Long"
    },
    // ... other results like "U Minh", "Minh Hóa", etc.
]</code></pre>
        </div>
    </div>

    <hr>
    <footer>
        API được cung cấp bởi [DangVo/location-api.dangvo.io.vn].
        Dữ liệu gốc: vn-location.json (Cập nhật lần cuối: [20/04/2025]).
    </footer>

</body>
</html>