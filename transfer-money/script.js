document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const loadingIndicator = document.getElementById('loading-indicator');
    const mainContent = document.getElementById('main-content');
    const languageSwitcherContainer = document.getElementById('language-switcher');
    const contactList = document.getElementById('contact-list');
    const currentYearSpan = document.getElementById('current-year');
    const socialIconsContainer = document.querySelector('#social-links .social-icons-container'); 
    const donationContainer = document.querySelector('#donation-section .donation-options-container'); 
    const contactForm = document.getElementById('contact-form'); 
    const contactNameInput = document.getElementById('contact-name');
    const contactSubjectInput = document.getElementById('contact-subject');
    const contactMessageInput = document.getElementById('contact-message');
    const contactSubmitBtn = document.getElementById('contact-submit-btn');
    const formStatusMsg = document.getElementById('form-status-message');
    const toastContainer = document.getElementById('toast-container'); 
    // --- Popup Elements ---
    const qrPopup = document.getElementById('qr-popup');
    const qrPopupCloseBtn = document.getElementById('popup-close-btn');
    const qrPopupImage = document.getElementById('popup-qr-image');
    const qrPopupBankName = document.getElementById('popup-bank-name');
    const qrPopupAccountInfo = document.getElementById('popup-account-info');

    // --- Global state ---
    let currentLanguage = 'vi'; 
    let translations = {};
    let paymentCategories = [];
    let contactInfo = {};
    let socialLinks = {}; 
    let donationLinks = {}; 
    let availableLanguages = {};
    let defaultLang = 'vi';
    let contactFormRecipient = ''; 

    // --- Translation Helper ---
    function __(key, fallback = key) { 
        return translations[currentLanguage]?.[key] || translations[defaultLang]?.[key] || fallback;
    }

    // --- Color Helper Functions ---
    function hexToRgb(hex){ const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null; }
    function getLuminance(hexColor){ const rgb = hexToRgb(hexColor); if (!rgb) return 0; const { r, g, b } = rgb; const RsRGB = r / 255, GsRGB = g / 255, BsRGB = b / 255; const R = RsRGB <= 0.03928 ? RsRGB / 12.92 : Math.pow(((RsRGB + 0.055) / 1.055), 2.4); const G = GsRGB <= 0.03928 ? GsRGB / 12.92 : Math.pow(((GsRGB + 0.055) / 1.055), 2.4); const B = BsRGB <= 0.03928 ? BsRGB / 12.92 : Math.pow(((BsRGB + 0.055) / 1.055), 2.4); return 0.2126 * R + 0.7152 * G + 0.0722 * B; }
    function isDarkBackground(hexColor){ if (!hexColor) return false; const lum = getLuminance(hexColor); return lum < 0.4; }
    function isLightBackground(hexColor){ if (!hexColor) return false; const lum = getLuminance(hexColor); return lum > 0.5; }


    // --- Hàm tạo HTML cho một phương thức thanh toán ---
    function createPaymentMethodHTML(method, categoryId) {
        // Lấy tên theo ngôn ngữ
        let methodName = method.name; 
        if (currentLanguage === 'vi' && method.nameVi) { methodName = method.nameVi; } 
        else if (currentLanguage !== 'vi' && method.nameEn) { methodName = method.nameEn; } 
        else if (method.nameVi) { methodName = method.nameVi; } 
        else if (method.nameEn) { methodName = method.nameEn; } 
        else if (!methodName && method.nameVi) { methodName = method.nameVi; } 
        else if (!methodName && method.nameEn) { methodName = method.nameEn; }
        methodName = methodName || 'Unknown Method'; 

        // Xử lý màu nền khối và class inactive ban đầu
        let blockStyleAttribute = ''; 
        let blockAdditionalClass = '';
        if (method.themeColor) { 
            blockStyleAttribute = `style="background-color: ${method.themeColor};"`; 
            if (isDarkBackground(method.themeColor)) { blockAdditionalClass = 'dark-background'; }
        }
        // --- Xử lý trạng thái Inactive ---
        let inactiveOverlayHTML = '';
        if (method.isActive === false) {
            blockAdditionalClass += ' payment-method-inactive'; // Thêm class inactive
            const statusTextKey = method.inactiveStatusKey || 'statusMaintenance';
            const statusText = __(statusTextKey);
            inactiveOverlayHTML = `
                <i class="fa-solid fa-lock inactive-lock-icon" aria-hidden="true"></i>
                <p class="inactive-status" data-i18n="${statusTextKey}">${statusText}</p>
            `;
        }
        // -----------------------------

        // Tạo HTML chi tiết (chỉ khi active)
        let detailsHTML = ''; 
        let accountNumber = ''; 
        let accountHolder = ''; 
        if (method.isActive !== false && Array.isArray(method.details)) { 
             method.details.forEach((detail, index) => {
                 const copyTargetId = `copy-${categoryId}-${method.idSuffix || methodName.toLowerCase().replace(/\s+/g, '-')}-${index}`; 
                 const label = detail.labelKey ? __(detail.labelKey) : ''; 
                 const value = detail.valueKey ? __(detail.valueKey) : detail.value; 
                 if(detail.labelKey === 'accountNumberLabel') accountNumber = value;
                 if(detail.labelKey === 'accountHolderLabel') accountHolder = value;
                 detailsHTML += `<p>`;
                 if (label) { detailsHTML += `<strong>${label}:</strong> `; }
                 if (detail.isCopyable && value) {
                     const copyButtonText = __('copyButtonText'); 
                     const iconSrc = "images/copy-icon.svg"; 
                     const itemNameForToast = accountNumber || methodName; // Ưu tiên STK cho toast
                     detailsHTML += `<span id="${copyTargetId}">${value}</span> <button type="button" class="copy-btn" data-copy-target="#${copyTargetId}" data-item-name="${itemNameForToast}"><img src="${iconSrc}" alt="${copyButtonText}" class="copy-icon"> ${copyButtonText}</button>`;
                 } else if (value) { detailsHTML += value; }
                 detailsHTML += `</p>`;
            });
        }

        const appName = method.appName || methodName; 
        
        // Tạo HTML các nút (chỉ khi active)
        let appButtonHTML = '';
        let interbankButtonHTML = '';
        let qrButtonHTML = '';
        let webButtonHTML = '';

        if (method.isActive !== false) {
            // Nút Mở ứng dụng chính
            const openAppText = `${__('openAppButtonText')} ${appName}`;
            let buttonStyleAttribute = ''; let buttonAdditionalClass = '';
            if (method.buttonColor) { buttonStyleAttribute = `style="background: ${method.buttonColor};"`; if (isLightBackground(method.buttonColor)) buttonAdditionalClass = 'light-button-background'; }
            appButtonHTML = method.appLink ? `<a href="${method.appLink}" target="_blank" rel="noopener noreferrer" class="open-app-btn ${buttonAdditionalClass}" ${buttonStyleAttribute}>${openAppText}</a>` : '';

            // Nút Mở ứng dụng liên ngân hàng
            if (categoryId === 'bank-transfer' && method.interbankAppLink) { interbankButtonHTML = `<a href="${method.interbankAppLink}" target="_blank" rel="noopener noreferrer" class="open-interbank-btn">${__(method.interbankAppNameKey || 'openInterbankAppButtonText')}</a>`; }
             
            // Nút Mã QR
            if (categoryId === 'bank-transfer' && method.qrCodeUrl) {
                 const qrButtonText = __('showQrCodeButtonText');
                 qrButtonHTML = `<button type="button" class="show-qr-btn" data-qr-url="${method.qrCodeUrl}" data-bank-name="${methodName || ''}" data-account-number="${accountNumber || ''}" data-account-holder="${accountHolder || ''}"><i class="fa-solid fa-qrcode"></i> ${qrButtonText}</button>`;
            }

            // Nút Web Link
            webButtonHTML = method.webLink ? `<a href="${method.webLink}" target="_blank" rel="noopener noreferrer" class="open-web-btn">Truy cập ${appName} Web</a>` : '';
        }

        // Trả về HTML hoàn chỉnh
        return `
            <div class="payment-method animate-on-scroll ${blockAdditionalClass}" ${blockStyleAttribute}> 
                ${method.logo ? `<img src="${method.logo}" alt="Logo ${methodName}" class="logo">` : ''}
                <h3>${methodName}</h3> 
                ${detailsHTML}
                <div class="app-buttons-container"> ${appButtonHTML} ${interbankButtonHTML} ${qrButtonHTML} </div>
                ${webButtonHTML}   
                ${inactiveOverlayHTML}
            </div>`;
            /* Thêm overlay inactive vào inactiveOverlayHTML nếu có */
    }

    // --- Hàm tạo HTML cho một danh mục thanh toán ---
    function createPaymentCategoryHTML(category) {
        const title = category.titleKey ? __(category.titleKey) : 'Category'; 
        const validMethods = Array.isArray(category.methods) ? category.methods.filter(m => typeof m === 'object' && m !== null) : [];
        const methodsHTML = validMethods.map(method => createPaymentMethodHTML(method, category.id)).join('');
        return `
            <section id="${category.id}" class="payment-category animate-on-scroll"> 
                <h2 data-i18n="${category.titleKey || ''}"> ${category.iconClass ? `<i class="${category.iconClass}"></i> ` : ''} ${title} </h2>
                <div class="payment-methods-container"> ${methodsHTML} </div>
            </section>`;
    }
    
    // --- Hàm Render Social Links ---
    function renderSocialLinks() {
        if (!socialIconsContainer || !socialLinks) return;
        socialIconsContainer.innerHTML = ''; 
        const platformInfo = {
            zalo: { icon: 'images/social/icon-zalo.png', alt: 'Zalo' }, 
            facebook: { icon: 'images/social/icon-facebook.png', alt: 'Facebook' }, 
            messenger: { icon: 'images/social/icon-messenger.png', alt: 'Messenger' }, 
            website: { icon: 'images/social/icon-web.png', alt: 'Website' }, 
            instagram: { icon: 'images/social/icon-instagram.png', alt: 'Instagram' }, 
            telegram: { icon: 'images/social/icon-telegram.png', alt: 'Telegram' },
            github: { icon: 'images/social/icon-github.png', alt: 'GitHub' },
            dev:{icon: 'images/social/icon-dev.png',alt:'Dev'}
        };
        for (const platform in socialLinks) {
            const url = socialLinks[platform];
            const info = platformInfo[platform];
            if (url && info && info.icon) { // Chỉ render nếu có url và icon
                const link = document.createElement('a');
                link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
                link.setAttribute('aria-label', `Link to ${info.alt}`); 
                const img = document.createElement('img');
                // Kiểm tra nếu là icon website thì không cần bo tròn (ví dụ)
                if (platform === 'website') {
                     img.style.borderRadius = '6px'; // Hoặc bỏ hẳn bo tròn
                }
                img.src = info.icon; 
                img.alt = info.alt; 
                img.classList.add('social-icon-img'); 
                // Thêm onerror để xử lý nếu ảnh icon bị lỗi
                img.onerror = function() { this.style.display='none'; console.warn(`Không tải được icon: ${this.src}`); }; 
                link.appendChild(img);
                socialIconsContainer.appendChild(link);
            } else if (url && !info?.icon) {
                 console.warn(`Thiếu thông tin icon cho platform: ${platform}`);
            }
        }
    }

     // --- Hàm Render Donation Links ---
     function renderDonationLinks() {
        if (!donationContainer || !donationLinks || !Array.isArray(donationLinks.options)) return;
        donationContainer.innerHTML = ''; 
        donationLinks.options.forEach(option => {
            if (!option.link) return; 
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('donation-option'); // Luôn có class này
            let contentHTML = '';
            let hasIconAndButton = false; // Biến cờ

            if (option.isQR && option.link) {
                contentHTML = `<a href="${option.link}" target="_blank" rel="noopener noreferrer" title="Mở ảnh QR ${option.name || ''}"><img src="${option.link}" alt="QR Code ${option.name || ''}" class="donation-qr" onerror="this.style.display='none'; console.warn('Không tải được ảnh QR: ${this.src}');"></a>`;
            } else if (option.link) {
                 const iconHTML = option.icon ? `<img src="${option.icon}" alt="${option.name || ''}" class="donation-icon" onerror="this.style.display='none'; console.warn('Không tải được icon donate: ${this.src}');">` : '';
                 // Chỉ tạo nút nếu không phải là QR
                 const buttonHTML = `<a href="${option.link}" target="_blank" rel="noopener noreferrer" class="donate-link-btn">${option.name || 'Donate'}</a>`;
                 contentHTML = `${iconHTML}${buttonHTML}`;
                 // Đặt cờ nếu có cả icon và nút (không phải QR)
                 if(option.icon){
                     hasIconAndButton = true; 
                     optionDiv.classList.add('has-icon-and-button'); // <-- THÊM CLASS
                 }
            }

            optionDiv.innerHTML = contentHTML;

            // Chỉ thêm tên (h4) nếu là QR hoặc không có icon (tránh lặp tên ở nút)
            if (option.isQR && option.name){ 
                optionDiv.insertAdjacentHTML('beforeend', `<h4>${option.name}</h4>`); 
            } else if (!option.isQR && !option.icon && option.name) {
                optionDiv.insertAdjacentHTML('afterbegin', `<h4>${option.name}</h4>`);
            }

            donationContainer.appendChild(optionDiv);
        });
     }
    // --- Hàm Render lại toàn bộ nội dung động ---
    function renderContent() {
        if (!mainContent) { console.error("renderContent: Không tìm thấy #main-content!"); return; }
        let allCategoriesHTML = '';
         if (Array.isArray(paymentCategories)) { 
             paymentCategories.forEach(category => { 
                 if (typeof category === 'object' && category !== null) { 
                    allCategoriesHTML += createPaymentCategoryHTML(category); 
                 } else { console.error("Dữ liệu category không hợp lệ:", category); }
            }); 
        } else { console.error("Lỗi: paymentCategories không phải là mảng!", paymentCategories); }
        mainContent.innerHTML = allCategoriesHTML; 

        if (contactList && contactInfo) {
             contactList.innerHTML = ''; 
             if (contactInfo.phoneZalo) { contactList.innerHTML += `<li class="phone"><strong>${__('contactPhoneLabel')}:</strong> ${contactInfo.phoneZalo}</li>`; }
             if (contactInfo.email) { contactList.innerHTML += `<li class="email"><strong>${__('contactEmailLabel')}:</strong> ${contactInfo.email}</li>`; }
         }
        renderSocialLinks(); 
        renderDonationLinks(); 
        observeElements(); 
    }

    // --- Hàm cập nhật các text tĩnh ---
    function updateStaticTexts() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (key) {
                 const translation = __(key);
                 if(element.tagName === 'TITLE'){ document.title = translation; } 
                 else if (element.placeholder) { element.placeholder = translation; } 
                 else {
                      if (!element.classList.contains('copy-btn') && !element.parentElement?.classList.contains('copy-btn') && !element.classList.contains('inactive-status')) { 
                          if (element.matches('#social-links h2') && element.firstChild?.nodeName === 'I'){ element.innerHTML = `<i class="fa-solid fa-share-nodes"></i> ${translation}`; } 
                          else if (element.matches('#donation-section h2') && element.firstChild?.nodeName === 'I'){ element.innerHTML = `<i class="fa-solid fa-hand-holding-dollar"></i> ${translation}`; }
                          else { element.textContent = translation; }
                      }
                 }
            }
        });
         document.querySelectorAll('.copy-btn').forEach(btn => {
             if(!btn.disabled) { 
                 const originalCopyText = __('copyButtonText');
                 const iconSrc = "images/copy-icon.svg"; 
                 const itemName = btn.dataset.itemName || __('accountNumberLabel'); // Dùng STK hoặc tên NH/Ví
                 const iconHTML = `<img src="${iconSrc}" alt="${originalCopyText} ${itemName}" class="copy-icon">`; 
                 btn.innerHTML = `${iconHTML} ${originalCopyText}`;
             }
         });
         document.querySelectorAll('.inactive-status[data-i18n]').forEach(el => { el.textContent = __(el.dataset.i18n); });
         if (qrPopup?.style.display === 'flex') { const hintElement = qrPopup.querySelector('.popup-scan-hint'); if(hintElement) hintElement.textContent = __('scanQrHint'); }
         const submitBtn = document.getElementById('contact-submit-btn'); if(submitBtn) submitBtn.textContent = __('sendButtonText');
         const attachHint = document.querySelector('small[data-i18n="attachmentMailtoHint"]'); if(attachHint) attachHint.textContent = __('attachmentMailtoHint');
         if (loadingIndicator && !loadingIndicator.classList.contains('hidden')) { const loadingTextElement = loadingIndicator.querySelector('p'); if (loadingTextElement) loadingTextElement.textContent = __('loadingText'); }
    }


    // --- Hàm đặt ngôn ngữ ---
    function setLanguage(lang) {
        if (!translations[lang]) { console.warn(`Lang ${lang} not found, fallback to ${defaultLang}`); lang = defaultLang; }
        currentLanguage = lang;
        document.documentElement.lang = lang; 
        localStorage.setItem('preferredLanguage', lang); 
        updateStaticTexts(); 
        renderContent();    
        if (languageSwitcherContainer) { languageSwitcherContainer.querySelectorAll('button').forEach(button => { button.classList.toggle('active', button.dataset.lang === lang); }); }
    }

    // --- Hàm khởi tạo Language Switcher ---
    function initLanguageSwitcher() {
        if (!languageSwitcherContainer || !availableLanguages) return;
        languageSwitcherContainer.innerHTML = ''; 
        Object.keys(availableLanguages).forEach(langCode => {
            const button = document.createElement('button');
            button.dataset.lang = langCode;
            button.textContent = availableLanguages[langCode] || langCode.toUpperCase(); 
            button.addEventListener('click', () => { setLanguage(langCode); });
            languageSwitcherContainer.appendChild(button);
        });
    }

    // --- Intersection Observer ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries, observer) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); };
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    function observeElements() { const elementsToObserve = document.querySelectorAll('.animate-on-scroll'); elementsToObserve.forEach(el => { el.classList.remove('is-visible'); scrollObserver.observe(el); }); }

    // --- Hàm hiển thị Toast Message ---
     function showToast(message, type = 'success', duration = 3000) {
         if (!toastContainer) return;
         const toast = document.createElement('div');
         toast.classList.add('toast', `toast-${type}`); 
         toast.textContent = message;
         toastContainer.appendChild(toast);
         toast.offsetHeight; // Force reflow
         toast.classList.add('show');
         setTimeout(() => {
             toast.classList.remove('show');
             toast.addEventListener('transitionend', () => { if (toast.parentNode === toastContainer) { toastContainer.removeChild(toast); } }, { once: true }); 
         }, duration);
     }
     
    // --- Hàm hiển thị Loading Indicator ---
    function showLoading(show = true) {
        if (!loadingIndicator) return;
        const loadingTextElement = loadingIndicator.querySelector('p');
        if (loadingTextElement) { loadingTextElement.textContent = __('loadingText'); }
        if (show) {
            mainContent.style.visibility = 'hidden'; 
            loadingIndicator.classList.remove('hidden');
            loadingIndicator.style.opacity = '1'; 
            loadingIndicator.style.pointerEvents = 'auto';
        } else {
            loadingIndicator.style.opacity = '0';
            loadingIndicator.style.pointerEvents = 'none';
            setTimeout(() => {
                 loadingIndicator.classList.add('hidden');
                 mainContent.style.visibility = 'visible';
            }, 500); 
        }
    }

    // --- Tải dữ liệu JSON ban đầu ---
    showLoading(true); 
    fetch('payment-data.json')
        .then(response => { 
            if (!response.ok) { return response.text().then(text => { throw new Error(`HTTP error! status: ${response.status}, message: ${text || 'No error message'}`); }); }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) { return response.json(); } 
            else { return response.text().then(text => { throw new Error(`Expected JSON but received ${contentType}. Content: ${text}`); }); }
        })
        .then(data => {
            translations = data.translations || {};
            paymentCategories = data.paymentCategories || [];
            contactInfo = data.contactInfo || {};
            socialLinks = data.socialLinks || {}; 
            donationLinks = data.donationLinks || {}; 
            availableLanguages = data.languages || {};
            defaultLang = data.defaultLang || 'vi';
            contactFormRecipient = data.contactFormRecipient || ''; 
            if (!Array.isArray(paymentCategories)) { console.error("Lỗi JSON: paymentCategories không phải mảng!", paymentCategories); paymentCategories = []; }
            initLanguageSwitcher();
            const savedLang = localStorage.getItem('preferredLanguage');
            const initialLang = availableLanguages[savedLang] ? savedLang : defaultLang;
            setLanguage(initialLang); 
        })
        .catch(error => {
            console.error('Lỗi tải hoặc xử lý JSON:', error);
            const errorContainer = document.getElementById('main-content') || document.body;
            const errorMsg = __( 'errorLoading', 'Error loading payment information.'); 
            errorContainer.innerHTML = `<p style="color: red; text-align: center; padding: 20px;">${errorMsg} Details: ${error.message}</p>`;
            mainContent.style.visibility = 'visible'; 
        })
        .finally(() => {
             showLoading(false); 
        });

     // --- Event Listener Chung (Copy + QR Popup + Form Submit) ---
     document.body.addEventListener('click', (event) => {
         // --- Xử lý nút Sao chép ---
         const copyButton = event.target.closest('.copy-btn'); 
         if (copyButton) {
              const targetSelector = copyButton.dataset.copyTarget;
              const targetElement = document.querySelector(targetSelector);
              const itemName = copyButton.dataset.itemName || __('accountNumberLabel'); // Lấy tên item
              if (targetElement) {
                  const textToCopy = targetElement.innerText;
                  navigator.clipboard.writeText(textToCopy).then(() => {
                      const toastMsgTemplate = __('copiedToastMessage'); 
                      const toastMsg = toastMsgTemplate.replace('{itemName}', itemName); 
                      showToast(toastMsg, 'success'); 
                  }).catch(err => { 
                      console.error('Lỗi sao chép: ', err); 
                      showToast(__('errorCopying'), 'error'); 
                  });
              } else { console.error('Không tìm thấy:', targetSelector); }
              return; 
         }

         // --- Xử lý nút mở Popup QR Code ---
         const qrButton = event.target.closest('.show-qr-btn');
         if (qrButton && qrPopup) { 
             const qrUrl = qrButton.dataset.qrUrl; const bankName = qrButton.dataset.bankName;
             const accNum = qrButton.dataset.accountNumber; const accHolder = qrButton.dataset.accountHolder;
             if (qrUrl && qrPopupImage && qrPopupBankName && qrPopupAccountInfo) {
                 qrPopupBankName.textContent = bankName || '';
                 qrPopupAccountInfo.textContent = `${__('accountNumberLabel')}: ${accNum} | ${__('accountHolderLabel')}: ${accHolder}`; 
                 qrPopupImage.src = qrUrl; qrPopupImage.alt = `QR Code ${bankName} - ${accNum}`; 
                 qrPopup.style.display = 'flex'; 
                 const hintElement = qrPopup.querySelector('.popup-scan-hint');
                  if(hintElement) hintElement.textContent = __('scanQrHint');
             } else { console.error("Thiếu URL QR hoặc phần tử popup."); }
             return; 
         }

          // --- Xử lý nút Gửi Form Liên Hệ (mailto:) ---
          const submitButton = event.target.closest('#contact-submit-btn');
          if(submitButton && contactForm) {
              let isValid = true;
              [contactNameInput, contactSubjectInput, contactMessageInput].forEach(input => input?.classList.remove('invalid'));
              formStatusMsg.textContent = ''; formStatusMsg.className = 'form-status';

              [contactNameInput, contactSubjectInput, contactMessageInput].forEach(input => {
                   if (!input?.value.trim()) { input?.classList.add('invalid'); isValid = false; } 
              });

              if (!isValid) {
                   if (formStatusMsg) { formStatusMsg.textContent = __('formValidationError'); formStatusMsg.classList.add('error'); setTimeout(() => { if(formStatusMsg) formStatusMsg.textContent = ''; }, 3000); }
                   showToast(__('formValidationError'), 'error'); 
                   return; 
              }
              
              const name = contactNameInput.value.trim();
              const subject = contactSubjectInput.value.trim();
              const message = contactMessageInput.value.trim();
              const recipientEmail = contactFormRecipient;
              if (!recipientEmail) { console.error("Lỗi: Chưa cấu hình contactFormRecipient."); showToast("Lỗi cấu hình gửi email.", 'error'); return; }
              const emailBody = `Chào bạn,\n\nTôi là: ${name}\n\nNội dung:\n${message}\n\n------------------\n(${__('attachmentMailtoHint')})`;
              const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
              
              if (formStatusMsg) { formStatusMsg.textContent = __('formSuccessMessage'); setTimeout(() => { if(formStatusMsg) formStatusMsg.textContent = ''; }, 3000); }
              
              window.location.href = mailtoLink;
              
              return; 
          }

     }); // Kết thúc event listener click body

    // --- Xử lý đóng Popup QR Code ---
    function closeQrPopup() { if (qrPopup) { qrPopup.style.display = 'none'; if(qrPopupImage) qrPopupImage.src = ''; } }
    if (qrPopupCloseBtn) { qrPopupCloseBtn.addEventListener('click', closeQrPopup); }
    if (qrPopup) { qrPopup.addEventListener('click', (event) => { if (event.target === qrPopup) { closeQrPopup(); } }); }
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && qrPopup?.style.display === 'flex') { closeQrPopup(); } });
    // --- Hết xử lý Popup ---

    // --- Cập nhật năm hiện tại trong Footer ---
    if (currentYearSpan) { currentYearSpan.textContent = new Date().getFullYear(); }

}); // End DOMContentLoaded
