// build.js - Script tự động hóa tạo phiên bản production ở thư mục song song

const concat = require('concat');
const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs-extra');
const path = require('path');

// --- Cấu hình ---
// Thư mục nguồn (nơi bạn đang làm việc)
const sourceDir = __dirname; 
// Thư mục đích (song song với thư mục nguồn)
const buildDir = path.join(__dirname, '..', 'stock-valuation-obfuscate');

const jsFiles = [
    'js/utils.js', 'js/tab-valuation.js', 'js/tab-gdkhq.js',
    'js/tab-investor-support.js', 'js/tab-listings.js', 'js/tab-events.js',
    'js/tab-admin.js', 'js/main.js'
].map(f => path.join(sourceDir, f)); // Thêm đường dẫn đầy đủ cho file nguồn

const assetsToCopy = ['style.css', 'api', 'data', 'favicon_io'];

async function buildProject() {
    try {
        console.log(`🚀 Bắt đầu quá trình build...`);
        console.log(`Thư mục đích: ${buildDir}`);

        // Bước 1: Tạo thư mục build
        await fs.ensureDir(buildDir);
        console.log(`✅ Đã tạo thư mục '${path.basename(buildDir)}'.`);

        // Bước 2: Sao chép các tài sản tĩnh
        for (const asset of assetsToCopy) {
            await fs.copy(path.join(sourceDir, asset), path.join(buildDir, asset));
        }
        console.log('✅ Đã sao chép các tài sản tĩnh.');

        // Bước 3: Gộp các file JavaScript
        const bundledCode = await concat(jsFiles);
        console.log('✅ Đã gộp các file JavaScript.');

        // Bước 4: Làm rối mã đã gộp
        const obfuscationResult = JavaScriptObfuscator.obfuscate(bundledCode, {
            compact: true,
            selfDefending: true,
            disableConsoleOutput: true,
            // (Thêm các tùy chọn khác nếu bạn muốn)
        });
        const obfuscatedCode = obfuscationResult.getObfuscatedCode();
        console.log('✅ Đã làm rối mã JavaScript.');

        // Bước 5: Ghi file JS đã làm rối vào thư mục đích
        await fs.writeFile(path.join(buildDir, 'app.min.js'), obfuscatedCode);
        console.log(`✅ Đã lưu file 'app.min.js'.`);

        // Bước 6: Xử lý file index.html
        let htmlContent = await fs.readFile(path.join(sourceDir, 'index.html'), 'utf8');
        const scriptRegex = /<script\s+src="js\/.*?\.js"><\/script>/g;
        htmlContent = htmlContent.replace(scriptRegex, '');
        const finalScriptTag = '<script src="app.min.js"></script>';
        htmlContent = htmlContent.replace('</body>', `    ${finalScriptTag}\n</body>`);
        
        await fs.writeFile(path.join(buildDir, 'index.html'), htmlContent);
        console.log(`✅ Đã xử lý và lưu 'index.html'.`);

        console.log('\n🎉 Build thành công! Thư mục "stock-valuation-obfuscate" đã sẵn sàng.');

    } catch (err) {
        console.error('\n❌ Đã xảy ra lỗi trong quá trình build:', err);
    }
}

// Chạy hàm build
buildProject();