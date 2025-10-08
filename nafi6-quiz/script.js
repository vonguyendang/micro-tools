// script.js

// === KHAI BÁO CÁC BIẾN TOÀN CỤC VÀ HẰNG SỐ ===

// Giả định các hằng số này (originalQuestions, NUM_QUESTIONS, DEFAULT_QUIZ_DURATION)
// đã được khai báo và load từ file data.js hoặc trong thẻ <script> trước đó.

let selectedQuestions = [];
let ALL_QUESTIONS = []; // Mảng chứa tất cả câu hỏi đã gộp
let timeLeft = -1; // -1: không giới hạn thời gian (mặc định)
let timerInterval;
let quizSubmitted = false;
const ADDED_QUESTIONS_FILE = 'add-quiz.json'; // Tên file trên server

const quizForm = document.getElementById('quiz-form');
const timerDisplay = document.getElementById('timer');
const startTimerBtn = document.getElementById('start-timer-btn');
const setTimerBtn = document.getElementById('set-timer-btn');
const setTimeModal = document.getElementById('setTimeModal');

// Mảng cố định để đánh số thứ tự hiển thị cho các lựa chọn (A, B, C, D)
const DISPLAY_KEYS = ['A', 'B', 'C', 'D'];


// === HÀM HỖ TRỢ ===

/**
 * Hàm xáo trộn mảng (Fisher-Yates)
 * @param {Array} array - Mảng cần xáo trộn
 * @returns {Array} Mảng đã xáo trộn
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Tải và gộp tất cả câu hỏi từ data.js và add-quiz.json trên server
 */
async function loadAllQuestions() {
    // 1. Lấy dữ liệu từ data.js (đã load sẵn trong biến global originalQuestions)
    let mergedList = [...originalQuestions]; 

    // 2. Lấy dữ liệu từ file add-quiz.json trên server
    try {
        const response = await fetch(ADDED_QUESTIONS_FILE);
        if (response.ok) {
            const added = await response.json();
            if (Array.isArray(added)) {
                mergedList = mergedList.concat(added);
            }
        } else {
            console.warn(`Không thể tải file ${ADDED_QUESTIONS_FILE}. Server trả về status: ${response.status}`);
        }
    } catch (e) {
        console.error(`Lỗi khi fetch file ${ADDED_QUESTIONS_FILE}. Vui lòng kiểm tra file có tồn tại không.`, e);
    }
    
    // Gán danh sách đã gộp vào biến toàn cục
    ALL_QUESTIONS = mergedList;
    
    // Cập nhật tổng số câu hỏi có sẵn trên giao diện quiz
    const totalAvailableQuestionsElement = document.getElementById('total-available-questions');
    if(totalAvailableQuestionsElement) {
        if(document.getElementById('results').classList.contains('hidden')) {
            totalAvailableQuestionsElement.textContent = ALL_QUESTIONS.length;
        }
    }
}


// === HÀM KHỞI TẠO VÀ HIỂN THỊ QUIZ ===

/**
 * Khởi tạo bài kiểm tra: chọn câu ngẫu nhiên, xáo trộn nội dung đáp án và hiển thị.
 */
async function initializeQuiz() {
    // BƯỚC 1: Tải và gộp tất cả câu hỏi (sử dụng await)
    await loadAllQuestions(); 

    // 2. Chọn ngẫu nhiên 70 câu từ ALL_QUESTIONS
    const shuffledQuestions = shuffleArray([...ALL_QUESTIONS]); 
    const numToSelect = Math.min(NUM_QUESTIONS, ALL_QUESTIONS.length);
    selectedQuestions = shuffledQuestions.slice(0, numToSelect);

    // 3. Xáo trộn thứ tự nội dung đáp án
    selectedQuestions.forEach(q => {
        const answerKeys = Object.keys(q.answers); 
        const answersContent = answerKeys.map(key => ({
            originalKey: key,         
            text: q.answers[key]      
        }));

        const shuffledContent = shuffleArray(answersContent);
        
        q.shuffledAnswers = shuffledContent.map((item, index) => ({
            displayKey: DISPLAY_KEYS[index], 
            originalKey: item.originalKey,   
            text: item.text                  
        }));
    });

    // 4. Hiển thị câu hỏi
    renderQuiz();
    
    // 5. Thiết lập trạng thái ban đầu cho timer
    const defaultDuration = typeof QUIZ_DURATION !== 'undefined' ? QUIZ_DURATION : 40 * 60;
    updateTimerDisplay(true);
    updateStartTimerButton(defaultDuration);
    
    // Cập nhật tổng số câu hỏi có sẵn
    document.getElementById('total-available-questions').textContent = selectedQuestions.length;
}

/**
 * Hiển thị các câu hỏi đã chọn lên HTML
 */
function renderQuiz() {
    let htmlContent = selectedQuestions.map((q, index) => {
        const questionNumber = index + 1;
        const answerOptions = q.shuffledAnswers.map(ans => `
            <label class="answer-option" for="q${q.id}_${ans.originalKey}">
                <input type="radio" 
                       name="question_${q.id}" 
                       id="q${q.id}_${ans.originalKey}" 
                       value="${ans.originalKey}" 
                />
                <span class="answer-key">${ans.displayKey}.</span> ${ans.text}
            </label>
        `).join('');

        return `
            <div class="question-item" data-question-id="${q.id}">
                <p class="question-text">Câu ${questionNumber}: ${q.question}</p>
                ${answerOptions}
            </div>
        `;
    }).join('');

    quizForm.innerHTML = htmlContent;
}


// === HÀM QUẢN LÝ VIEW (ĐƠN GIẢN HÓA) ===

/**
 * Hiển thị phần nội dung được chọn (chỉ dành cho trang index.html)
 */
function showSection(sectionId) {
    const sections = ['quiz-main-section'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.add('hidden');
        }
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
    }
}


// === HÀM XỬ LÝ THỜI GIAN (ĐÃ SỬA LỖI MODAL) ===

/**
 * Cập nhật hiển thị thời gian
 */
function updateTimerDisplay(isInitial = false) {
    if (isInitial || timeLeft === -1) {
        timerDisplay.textContent = 'Không giới hạn';
    } else {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

/**
 * Cập nhật nút bắt đầu tính giờ với thời gian mới
 */
function updateStartTimerButton(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    startTimerBtn.textContent = `Bắt đầu Tính giờ (${minutes} phút)`;
    startTimerBtn.onclick = () => startTimer(durationSeconds);
}


/**
 * Bắt đầu đếm ngược thời gian
 */
function startTimer(durationSeconds) {
    if (quizSubmitted) return;
    
    clearInterval(timerInterval); 
    
    timeLeft = durationSeconds;
    
    // Vô hiệu hóa các nút điều khiển thời gian khi đang chạy
    startTimerBtn.disabled = true;
    setTimerBtn.disabled = true;

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Hết giờ';
            alert("Hết giờ! Bài kiểm tra sẽ tự động được nộp.");
            submitQuiz(true); // Tự động nộp bài khi hết giờ
            return;
        }

        updateTimerDisplay();
        timeLeft--;
    }, 1000);
}


// === HÀM XỬ LÝ MODAL ĐẶT GIỜ (ĐÃ SỬA LỖI) ===

function openSetTimeModal() {
    if (timerInterval) {
        alert("Đang trong quá trình tính giờ. Vui lòng nộp bài để đặt lại thời gian.");
        return;
    }
    // HIỂN THỊ MODAL
    setTimeModal.classList.remove('hidden');
    const defaultDuration = typeof QUIZ_DURATION !== 'undefined' ? QUIZ_DURATION : 40 * 60;
    document.getElementById('timeInput').value = Math.floor(defaultDuration / 60); 
}

// HÀM TẮT MODAL (QUAN TRỌNG)
function closeSetTimeModal() {
    // ẨN MODAL
    setTimeModal.classList.add('hidden');
}

function setCustomTime() {
    const minutes = parseInt(document.getElementById('timeInput').value);
    
    if (isNaN(minutes) || minutes <= 0 || minutes > 180) {
        alert("Vui lòng nhập số phút hợp lệ (tối đa 180 phút).");
        return;
    }
    
    closeSetTimeModal(); // Đóng modal sau khi xác nhận
    const durationSeconds = minutes * 60;
    
    updateStartTimerButton(durationSeconds);
    
    const minutesStr = String(minutes).padStart(2, '0');
    timerDisplay.textContent = `${minutesStr}:00`;

    alert(`Đã đặt thời gian làm bài là ${minutes} phút. Nhấn nút "Bắt đầu Tính giờ" để bắt đầu.`);
}


// === HÀM NỘP BÀI VÀ CHẤM ĐIỂM ===

/**
 * Xử lý nộp bài, chấm điểm và hiển thị kết quả chi tiết
 */
function submitQuiz(isAutoSubmit = false) {
    if (quizSubmitted) return; 
    quizSubmitted = true;
    clearInterval(timerInterval); 
    
    let score = 0;
    const userAnswers = {};
    const reviewArea = document.getElementById('review-area');
    let reviewHtml = '';

    const formData = new FormData(quizForm);
    for (const [key, value] of formData.entries()) {
        if (key.startsWith('question_')) {
            const qId = parseInt(key.split('_')[1]);
            userAnswers[qId] = value;
        }
    }
    
    const totalQuestionsInQuiz = selectedQuestions.length;
    document.getElementById('total-available-questions').textContent = totalQuestionsInQuiz;
    
    selectedQuestions.forEach((q, index) => {
        const questionNumber = index + 1;
        const userAnswerKey = userAnswers[q.id]; 
        const correctAnswerKey = q.correctAnswer; 
        const isCorrect = userAnswerKey === correctAnswerKey;

        if (isCorrect) {
            score++;
        }
        
        const correctDisplayKey = q.shuffledAnswers.find(a => a.originalKey === correctAnswerKey)?.displayKey || 'N/A';
        const userDisplayKey = q.shuffledAnswers.find(a => a.originalKey === userAnswerKey)?.displayKey || 'N/A';
        
        const correctChoiceText = q.answers[correctAnswerKey];

        reviewHtml += `<div class="question-item ${isCorrect ? 'correct-review' : 'incorrect-review'}">`;
        reviewHtml += `<p class="question-text">Câu ${questionNumber}: ${q.question}</p>`;
        
        q.shuffledAnswers.forEach(ans => {
            const isUserChoice = ans.originalKey === userAnswerKey;
            const isCorrectAnswer = ans.originalKey === correctAnswerKey;
            
            let answerClass = '';
            if (isCorrectAnswer) {
                answerClass = 'correct-answer-highlight'; 
            } else if (isUserChoice && !isCorrectAnswer) {
                answerClass = 'incorrect-choice-highlight'; 
            }
            
            reviewHtml += `
                <div class="answer-option ${answerClass}">
                    <input type="radio" disabled ${isUserChoice ? 'checked' : ''}/>
                    <span class="answer-key">${ans.displayKey}.</span> ${ans.text} 
                    ${isCorrectAnswer ? '✅ (Đáp án đúng)' : ''}
                    ${isUserChoice && !isCorrectAnswer ? '❌ (Bạn đã chọn)' : ''}
                </div>
            `;
        });
        
        reviewHtml += `<p style="font-weight:bold; margin-top: 10px;">`;
        if (isCorrect) {
            reviewHtml += `Kết quả: <span style="color:#28a745;">Đúng!</span>`;
        } else {
            const userChoiceText = userAnswerKey ? q.answers[userAnswerKey] : 'Chưa trả lời';
        reviewHtml += `
            <div>Kết quả: <span style="color:#dc3545;">Sai.</span> Bạn đã chọn: ${userDisplayKey} (${userChoiceText}).</div>
            <div>Đáp án đúng: ${correctDisplayKey} (${correctChoiceText})</div>
        `;        }
        reviewHtml += `</p></div>`;
    });

    document.querySelectorAll('.answer-option input').forEach(input => input.disabled = true);
    startTimerBtn.disabled = true;
    setTimerBtn.disabled = true;
    
    document.getElementById('score').textContent = score;
    reviewArea.innerHTML = reviewHtml;
    
    quizForm.classList.add('hidden');
    document.getElementById('submit-btn').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
}


// Khởi tạo bài kiểm tra khi trang load
window.onload = initializeQuiz;