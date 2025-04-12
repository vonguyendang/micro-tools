// Chỉnh sửa hàm initPagination để nhận tham số tools
export function initPagination(initialTools, toolsPerPage, initialPage, displayToolsCallback) {
    let currentPage = initialPage;
    const pageNumbersContainer = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!pageNumbersContainer || !prevBtn || !nextBtn) return { updatePagination: () => {} };

    function updatePaginationDisplay(currentTools) {
        pageNumbersContainer.innerHTML = '';
        const totalPages = Math.ceil(currentTools.length / toolsPerPage);

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) endPage = Math.min(5, totalPages);
        if (currentPage >= totalPages - 2) startPage = Math.max(totalPages - 4, 1);

        function createPageNumber(number, isActive = false) {
            const pageNumber = document.createElement('span');
            pageNumber.className = `page-number ${isActive ? 'active' : ''}`;
            pageNumber.textContent = number;
            pageNumber.addEventListener('click', () => {
                currentPage = number;
                displayToolsCallback(currentPage, localStorage.getItem('language') || 'en', currentTools);
                updatePaginationDisplay(currentTools);
            });
            pageNumbersContainer.appendChild(pageNumber);
        }

        if (startPage > 1) {
            createPageNumber(1);
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-number';
                ellipsis.textContent = '...';
                pageNumbersContainer.appendChild(ellipsis);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            createPageNumber(i, i === currentPage);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-number';
                ellipsis.textContent = '...';
                pageNumbersContainer.appendChild(ellipsis);
            }
            createPageNumber(totalPages);
        }

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayToolsCallback(currentPage, localStorage.getItem('language') || 'en', initialTools);
            updatePaginationDisplay(initialTools);
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(initialTools.length / toolsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayToolsCallback(currentPage, localStorage.getItem('language') || 'en', initialTools);
            updatePaginationDisplay(initialTools);
        }
    });

    updatePaginationDisplay(initialTools);
    return { updatePagination: updatePaginationDisplay };
}