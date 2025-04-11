// Khởi tạo PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

document.addEventListener('DOMContentLoaded', function() {
    // Thêm nút làm mới
    const refreshBtn = document.getElementById('refresh-btn');
    
    refreshBtn.addEventListener('click', function() {
        // Hiệu ứng loading
        this.classList.add('refreshing');
        
        // Làm mới trang
        setTimeout(() => {
            location.reload();
        }, 500);
    });
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Merge PDF functionality
    const mergeUploadArea = document.getElementById('merge-upload');
    const mergeInput = document.getElementById('merge-input');
    const mergeFilesList = document.getElementById('merge-files');
    const mergeBtn = document.getElementById('merge-btn');
    const previewMergeBtn = document.getElementById('preview-merge');
    let mergeFilename = 'merged.pdf';
    
    let mergeFiles = [];
    
    // Drag and drop for merge
    setupDragAndDrop(mergeUploadArea, mergeInput, files => {
        handleMergeFiles(files);
    });
    
    // File input change for merge
    mergeInput.addEventListener('change', () => {
        handleMergeFiles(mergeInput.files);
    });
    
    function handleMergeFiles(files) {
        const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');
        
        if (pdfFiles.length === 0) {
            alert('Vui lòng chọn file PDF');
            return;
        }
        
        mergeFiles = [...mergeFiles, ...pdfFiles];
        updateMergeFilesList();
        
        if (mergeFiles.length > 0) {
            mergeBtn.disabled = false;
            previewMergeBtn.disabled = false;
            document.getElementById('merge-options').style.display = 'block';
        }
    }
    
    function updateMergeFilesList() {
        mergeFilesList.innerHTML = '';
        
        mergeFiles.forEach((file, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${file.name}</span>
                <div>
                    <i class="fas fa-arrow-up move-up" data-index="${index}"></i>
                    <i class="fas fa-arrow-down move-down" data-index="${index}"></i>
                    <i class="fas fa-times remove-file" data-index="${index}"></i>
                </div>
            `;
            mergeFilesList.appendChild(li);
        });
        
        // Add event listeners for buttons
        document.querySelectorAll('.move-up').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                if (index > 0) {
                    [mergeFiles[index], mergeFiles[index - 1]] = [mergeFiles[index - 1], mergeFiles[index]];
                    updateMergeFilesList();
                }
            });
        });
        
        document.querySelectorAll('.move-down').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                if (index < mergeFiles.length - 1) {
                    [mergeFiles[index], mergeFiles[index + 1]] = [mergeFiles[index + 1], mergeFiles[index]];
                    updateMergeFilesList();
                }
            });
        });
        
        document.querySelectorAll('.remove-file').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                mergeFiles.splice(index, 1);
                updateMergeFilesList();
                
                if (mergeFiles.length === 0) {
                    mergeBtn.disabled = true;
                    previewMergeBtn.disabled = true;
                    document.getElementById('merge-options').style.display = 'none';
                }
            });
        });
    }
    
    // Split PDF functionality
    const splitUploadArea = document.getElementById('split-upload');
    const splitInput = document.getElementById('split-input');
    const splitFileList = document.getElementById('split-file-list');
    const splitFileName = document.getElementById('split-file-name');
    const splitRange = document.getElementById('split-range');
    const splitBtn = document.getElementById('split-btn');
    const previewSplitBtn = document.getElementById('preview-split');
    
    let splitFile = null;
    
    // Drag and drop for split
    setupDragAndDrop(splitUploadArea, splitInput, files => {
        handleSplitFile(files[0]);
    });
    
    // File input change for split
    splitInput.addEventListener('change', () => {
        if (splitInput.files.length > 0) {
            handleSplitFile(splitInput.files[0]);
        }
    });
    
    function handleSplitFile(file) {
        if (file.type !== 'application/pdf') {
            alert('Vui lòng chọn file PDF');
            return;
        }
        
        splitFile = file;
        splitFileName.textContent = file.name;
        splitFileList.style.display = 'block';
        splitBtn.disabled = false;
        previewSplitBtn.disabled = false;
    }
    
    // Modal functionality
    const modal = document.getElementById('preview-modal');
    const closeBtn = document.querySelector('.close-btn');
    const downloadBtn = document.getElementById('download-btn');
    const downloadAllBtn = document.getElementById('download-all-btn');
    const pdfPreviewContainer = document.getElementById('pdf-preview-container');
    const pdfPreview = document.getElementById('pdf-preview');
    const previewPageInfo = document.querySelector('.preview-page-info');
    
    let currentPdfBytes = null;
    let currentSplitResults = [];
    let currentPreviewIndex = 0;
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    downloadBtn.addEventListener('click', () => {
        if (currentSplitResults.length > 0) {
            downloadPdf(currentSplitResults[currentPreviewIndex].data, currentSplitResults[currentPreviewIndex].name);
        } else if (currentPdfBytes) {
            downloadPdf(currentPdfBytes, mergeFilename);
        }
    });
    
    downloadAllBtn.addEventListener('click', async () => {
        if (currentSplitResults.length <= 1) return;
        
        const zip = new JSZip();
        currentSplitResults.forEach(result => {
            zip.file(result.name, result.data);
        });
        
        const zipContent = await zip.generateAsync({ type: 'blob' });
        const zipUrl = URL.createObjectURL(zipContent);
        
        const a = document.createElement('a');
        a.href = zipUrl;
        a.download = `${splitFile.name.replace(/\.pdf$/i, '')}-split.zip`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(zipUrl);
        }, 100);
    });
    
    // Merge button click
    mergeBtn.addEventListener('click', async () => {
        if (mergeFiles.length < 1) {
            alert('Vui lòng chọn ít nhất 1 file PDF');
            return;
        }
        
        // Lấy tên file từ input
        const filenameInput = document.getElementById('merge-filename').value.trim();
        mergeFilename = filenameInput 
            ? (filenameInput.endsWith('.pdf') ? filenameInput : `${filenameInput}.pdf`)
            : 'merged.pdf';
        
        try {
            const mergedPdf = await mergePdfs(mergeFiles);
            currentPdfBytes = mergedPdf;
            currentSplitResults = [];
            downloadPdf(mergedPdf, mergeFilename);
        } catch (error) {
            console.error('Lỗi khi gộp PDF:', error);
            alert('Đã xảy ra lỗi khi gộp PDF');
        }
    });
    
    // Preview merge button click
    previewMergeBtn.addEventListener('click', async () => {
        if (mergeFiles.length < 1) {
            alert('Vui lòng chọn ít nhất 1 file PDF');
            return;
        }
        
        // Lấy tên file từ input
        const filenameInput = document.getElementById('merge-filename').value.trim();
        mergeFilename = filenameInput 
            ? (filenameInput.endsWith('.pdf') ? filenameInput : `${filenameInput}.pdf`)
            : 'merged.pdf';
        
        try {
            const mergedPdf = await mergePdfs(mergeFiles);
            currentPdfBytes = mergedPdf;
            currentSplitResults = [];
            downloadAllBtn.style.display = 'none'; // Ẩn nút ZIP khi preview gộp file
            showPdfPreview(mergedPdf);
        } catch (error) {
            console.error('Lỗi khi xem trước PDF:', error);
            alert('Đã xảy ra lỗi khi xem trước PDF');
        }
    });
    
    // Split button click
    splitBtn.addEventListener('click', async () => {
        if (!splitFile) {
            alert('Vui lòng chọn file PDF');
            return;
        }
        
        const rangeText = splitRange.value.trim();
        if (!rangeText) {
            alert('Vui lòng nhập trang cần tách');
            return;
        }
        
        try {
            const splitResults = await splitPdf(splitFile, rangeText);
            
            if (splitResults.length === 1) {
                downloadPdf(splitResults[0].data, splitResults[0].name);
            } else {
                const zip = new JSZip();
                splitResults.forEach(result => {
                    zip.file(result.name, result.data);
                });
                
                const zipContent = await zip.generateAsync({ type: 'blob' });
                const zipUrl = URL.createObjectURL(zipContent);
                
                const a = document.createElement('a');
                a.href = zipUrl;
                a.download = `${splitFile.name.replace(/\.pdf$/i, '')}-split.zip`;
                document.body.appendChild(a);
                a.click();
                
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(zipUrl);
                }, 100);
            }
        } catch (error) {
            console.error('Lỗi khi tách PDF:', error);
            alert('Đã xảy ra lỗi khi tách PDF: ' + error.message);
        }
    });
    
    // Preview split button click
    previewSplitBtn.addEventListener('click', async () => {
        if (!splitFile) {
            alert('Vui lòng chọn file PDF');
            return;
        }
        
        const rangeText = splitRange.value.trim();
        if (!rangeText) {
            alert('Vui lòng nhập trang cần tách');
            return;
        }
        
        try {
            const splitResults = await splitPdf(splitFile, rangeText);
            downloadAllBtn.style.display = splitResults.length > 1 ? 'flex' : 'none';
            showSplitPreview(splitResults);
        } catch (error) {
            console.error('Lỗi khi xem trước PDF:', error);
            alert('Đã xảy ra lỗi khi xem trước PDF: ' + error.message);
        }
    });
    
    // Helper functions
    function setupDragAndDrop(dropArea, fileInput, callback) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            dropArea.classList.add('highlight');
        }
        
        function unhighlight() {
            dropArea.classList.remove('highlight');
        }
        
        dropArea.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length > 0) {
                callback(files);
            }
        }
    }
    
    async function mergePdfs(pdfFiles) {
        const { PDFDocument } = PDFLib;
        
        const mergedPdf = await PDFDocument.create();
        
        for (const file of pdfFiles) {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            pages.forEach(page => mergedPdf.addPage(page));
        }
        
        const mergedPdfBytes = await mergedPdf.save();
        return mergedPdfBytes;
    }
    
    async function splitPdf(pdfFile, rangeText) {
        const { PDFDocument } = PDFLib;
        
        // Parse range text (e.g., "1-2,3" → [[1,2], [3]])
        const pageGroups = parseRange(rangeText);
        if (pageGroups.length === 0) {
            throw new Error('Không có trang hợp lệ để tách');
        }
        
        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const totalPages = pdfDoc.getPageCount();
        
        // Validate page numbers
        for (const group of pageGroups) {
            for (const pageNum of group) {
                if (pageNum < 1 || pageNum > totalPages) {
                    throw new Error(`Trang ${pageNum} không tồn tại (PDF chỉ có ${totalPages} trang)`);
                }
            }
        }
        
        // Create a PDF for each group of pages
        const pdfPromises = pageGroups.map(async (group) => {
            const newPdf = await PDFDocument.create();
            const pageIndices = group.map(num => num - 1); // Convert to 0-based index
            const pages = await newPdf.copyPages(pdfDoc, pageIndices);
            pages.forEach(page => newPdf.addPage(page));
            
            const pdfBytes = await newPdf.save();
            return {
                name: generateSplitFileName(pdfFile.name, group),
                data: pdfBytes
            };
        });
        
        return Promise.all(pdfPromises);
    }
    
    function generateSplitFileName(originalName, pageGroup) {
        const baseName = originalName.replace(/\.pdf$/i, '');
        const pageRange = pageGroup.length > 1 
            ? `${pageGroup[0]}-${pageGroup[pageGroup.length-1]}`
            : `${pageGroup[0]}`;
        return `${baseName}-split-${pageRange}.pdf`;
    }
    
    function parseRange(rangeText) {
        const parts = rangeText.split(',');
        const pageGroups = [];
        
        for (const part of parts) {
            if (part.includes('-')) {
                const [start, end] = part.split('-').map(num => parseInt(num.trim()));
                if (!isNaN(start) && !isNaN(end)) {
                    // Tạo một nhóm mới cho mỗi khoảng trang
                    const group = [];
                    const min = Math.min(start, end);
                    const max = Math.max(start, end);
                    for (let i = min; i <= max; i++) {
                        group.push(i);
                    }
                    pageGroups.push(group);
                }
            } else {
                const num = parseInt(part.trim());
                if (!isNaN(num)) {
                    // Mỗi trang đơn lẻ là một nhóm riêng
                    pageGroups.push([num]);
                }
            }
        }
        
        return pageGroups;
    }
    
    function showSplitPreview(results) {
        currentSplitResults = results;
        currentPdfBytes = null;
        
        // Tạo tabs
        const previewTabs = document.getElementById('preview-tabs');
        previewTabs.innerHTML = '';
        
        results.forEach((result, index) => {
            const tab = document.createElement('div');
            tab.className = `preview-tab ${index === 0 ? 'active' : ''}`;
            tab.textContent = `File ${index + 1} (trang ${result.name.replace(/^.*-split-/, '').replace('.pdf', '')})`;
            tab.dataset.index = index;
            tab.addEventListener('click', () => switchPreviewTab(index));
            previewTabs.appendChild(tab);
        });
        
        // Hiển thị file đầu tiên
        switchPreviewTab(0);
    }
    
    function switchPreviewTab(index) {
        currentPreviewIndex = index;
        
        // Cập nhật active tab
        document.querySelectorAll('.preview-tab').forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Hiển thị PDF tương ứng
        showPdfPreview(currentSplitResults[index].data, index);
    }
    
    function showPdfPreview(pdfBytes, fileIndex = 0) {
        const container = document.getElementById('pdf-preview');
        container.innerHTML = '<div class="loading"><div class="loading-spinner"></div>Đang tải preview...</div>';
        
        // Cập nhật thông tin file
        if (currentSplitResults.length > 0) {
            previewPageInfo.textContent = currentSplitResults[fileIndex].name;
            previewPageInfo.style.display = 'block';
        } else {
            previewPageInfo.textContent = mergeFilename;
            previewPageInfo.style.display = 'block';
        }

        // Tải PDF trực tiếp từ dữ liệu bytes
        const loadingTask = pdfjsLib.getDocument({data: pdfBytes});
        
        loadingTask.promise.then(function(pdf) {
            container.innerHTML = ''; // Xóa thông báo loading
            
            // Hiển thị tất cả các trang
            const renderPromises = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                renderPromises.push(
                    pdf.getPage(i).then(function(page) {
                        const viewport = page.getViewport({ scale: 1.0 });
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        
                        // Đặt kích thước canvas
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        canvas.style.display = 'block';
                        canvas.style.margin = '0 auto 20px auto';
                        
                        container.appendChild(canvas);
                        
                        // Render trang PDF
                        return page.render({
                            canvasContext: context,
                            viewport: viewport
                        }).promise;
                    })
                );
            }
            
            return Promise.all(renderPromises);
        }).catch(function(error) {
            console.error('Lỗi khi tải PDF:', error);
            container.innerHTML = '<div class="error">Không thể hiển thị PDF. Lỗi: ' + error.message + '</div>';
        });
        
        // Hiển thị modal
        modal.style.display = 'block';
    }
    
    // Tải file PDF
    function downloadPdf(pdfBytes, filename) {
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'document.pdf';
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    // Thêm hàm reset ứng dụng (nếu muốn làm mới không cần reload trang)
    function resetApp() {
        // Reset tab gộp
        mergeFiles = [];
        mergeFilename = 'merged.pdf';
        document.getElementById('merge-files').innerHTML = '';
        document.getElementById('merge-options').style.display = 'none';
        document.getElementById('merge-filename').value = '';
        mergeBtn.disabled = true;
        previewMergeBtn.disabled = true;
        
        // Reset tab tách
        splitFile = null;
        document.getElementById('split-file-list').style.display = 'none';
        document.getElementById('split-file-name').textContent = '';
        document.getElementById('split-range').value = '';
        splitBtn.disabled = true;
        previewSplitBtn.disabled = true;
        
        // Reset preview
        modal.style.display = 'none';
        currentPdfBytes = null;
        currentSplitResults = [];
        document.getElementById('pdf-preview').innerHTML = '';
        document.getElementById('preview-tabs').innerHTML = '';
        
        console.log('Đã làm mới ứng dụng');
    }

    // Nếu muốn dùng resetApp thay vì reload trang:
    // refreshBtn.addEventListener('click', resetApp);
});