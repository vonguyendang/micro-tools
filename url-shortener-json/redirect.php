<?php
$shortUrl = $_GET['code'];
$linksFile = 'links.json';

if (file_exists($linksFile)) {
    $links = json_decode(file_get_contents($linksFile), true);

    if (isset($links[$shortUrl])) {
        header('Location: ' . $links[$shortUrl]['originalUrl']);
        exit;
    }
}

header('HTTP/1.0 404 Not Found');
echo 'Shortlink không tồn tại';
exit;
?>