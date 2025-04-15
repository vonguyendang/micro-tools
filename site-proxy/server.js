const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

// Cấu hình CORS mở rộng
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware kiểm tra URL
const validateProxyRequest = (req, res, next) => {
  if (!req.query.url) {
    return res.status(400).json({ error: 'Thiếu tham số URL' });
  }
  
  try {
    const targetUrl = new URL(decodeURIComponent(req.query.url));
    
    // Bảo mật: Giới hạn domain (tùy chọn)
    const ALLOWED_DOMAINS = ['api.example.com', 'trusted-domain.com','www.cskh.evnspc.vn','lichcupdien.org','iboard-query.ssi.com.vn'];
    if (ALLOWED_DOMAINS.length && !ALLOWED_DOMAINS.includes(targetUrl.hostname)) {
      return res.status(403).json({ error: 'Domain không được phép' });
    }
    
    next();
  } catch (e) {
    return res.status(400).json({ error: 'URL không hợp lệ' });
  }
};

// Proxy middleware
app.use('/proxy', validateProxyRequest, (req, res, next) => {
  const targetUrl = decodeURIComponent(req.query.url);
  
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    selfHandleResponse: true,
    followRedirects: true,
    secure: false,
    onProxyReq: (proxyReq, req) => {
      // Thêm header nếu cần
      if (req.headers['content-type']) {
        proxyReq.setHeader('Content-Type', req.headers['content-type']);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      // Xử lý header conflict
      const headers = { ...proxyRes.headers };
      
      // Fix lỗi Content-Length và Transfer-Encoding
      if (headers['transfer-encoding']) {
        delete headers['content-length'];
      }
      
      // Loại bỏ header không cần thiết
      ['connection', 'keep-alive'].forEach(h => delete headers[h]);
      
      // Thiết lập CORS headers
      headers['access-control-allow-origin'] = '*';
      headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      
      res.writeHead(proxyRes.statusCode, headers);
      proxyRes.pipe(res);
    },
    onError: (err, req, res) => {
      console.error('Lỗi proxy:', err);
      res.status(500).json({ 
        error: 'Lỗi proxy',
        message: err.message
      });
    }
  })(req, res, next);
});

// Trang chủ hướng dẫn
app.get('/', (req, res) => {
  res.send(`
    <h1>Proxy Service</h1>
    <p><strong>Cách sử dụng:</strong></p>
    <code>/proxy?url=${encodeURIComponent('https://api.example.com/data')}</code>
    <p><strong>Ví dụ JavaScript:</strong></p>
    <pre>
fetch('https://your-project.glitch.me/proxy?url=${
  encodeURIComponent('https://api.example.com/data')}')
  .then(response => response.json())
  .then(data => console.log(data));
    </pre>
  `);
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server đang chạy trên cổng ${PORT}`);
});