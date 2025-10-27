// script.js (đã cập nhật để cho phép chọn đề khác sau khi nộp bài)

const QUIZ_DURATION = 40 * 60; 

let selectedQuestions = [];
let timeLeft = -1;
let timerInterval;
let quizSubmitted = false;
let currentDeckNumber = 0; // Biến để lưu đề hiện tại

// Khai báo các thành phần DOM
const quizForm = document.getElementById('quiz-form');
const timerDisplay = document.getElementById('timer');
const startTimerBtn = document.getElementById('start-timer-btn');
const setTimerBtn = document.getElementById('set-timer-btn');
const setTimeModal = document.getElementById('setTimeModal');
const deckSelectionSection = document.getElementById('deck-selection-section');
const quizMainSection = document.getElementById('quiz-main-section');
const deckSelectionArea = document.getElementById('deck-selection-area');
const totalBankQuestionsDisplay = document.getElementById('total-bank-questions');
const resultsSection = document.getElementById('results');

const DISPLAY_KEYS = ['A', 'B', 'C', 'D'];

// Hàm xáo trộn mảng
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Hàm tải danh sách các đề thi
async function listDecks() {
    try {
        const response = await fetch('quiz-api.php?action=list_decks');
        if (!response.ok) throw new Error('Không thể tải danh sách đề thi.');
        
        const data = await response.json();
        totalBankQuestionsDisplay.textContent = data.totalQuestions;
        deckSelectionArea.innerHTML = '';

        for (let i = 1; i <= data.totalDecks; i++) {
            const deckButton = document.createElement('button');
            deckButton.className = 'btn btn-primary';
            deckButton.textContent = `Đề số ${i}`;
            deckButton.onclick = () => initializeQuiz(i);
            deckSelectionArea.appendChild(deckButton);
        }
    } catch (error) {
        console.error("Lỗi:", error);
        deckSelectionArea.innerHTML = `<p style='color:red;'>${error.message}</p>`;
    }
}

// Hàm reset trạng thái giao diện để chuẩn bị cho bài thi mới
function resetUIForNewQuiz() {
    quizSubmitted = false;
    clearInterval(timerInterval);
    timeLeft = -1;
    timerInterval = null;

    quizForm.innerHTML = '';
    document.getElementById('review-area').innerHTML = '';
    resultsSection.classList.add('hidden');
    
    quizForm.classList.remove('hidden');
    document.getElementById('submit-btn').classList.remove('hidden');
    startTimerBtn.disabled = false;
    setTimerBtn.disabled = false;
    
    updateTimerDisplay(true);
}

// Hàm quay lại màn hình chọn đề
function returnToDeckSelection() {
    quizMainSection.classList.add('hidden');
    deckSelectionSection.classList.remove('hidden');
}

// Hàm khởi tạo bài thi
async function initializeQuiz(deckNumber) {
    resetUIForNewQuiz();
    currentDeckNumber = deckNumber;

    deckSelectionSection.classList.add('hidden');
    quizMainSection.classList.remove('hidden');

    try {
        const response = await fetch(`quiz-api.php?action=start&de=${deckNumber}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Lỗi không xác định từ server.');
        }
        selectedQuestions = await response.json();

        selectedQuestions.forEach(q => {
            const answersContent = Object.keys(q.answers).map(key => ({ originalKey: key, text: q.answers[key] }));
            const shuffledContent = shuffleArray(answersContent);
            q.shuffledAnswers = shuffledContent.map((item, index) => ({
                displayKey: DISPLAY_KEYS[index],
                originalKey: item.originalKey,
                text: item.text
            }));
        });

        renderQuiz();
    } catch (error) {
        console.error(`Lỗi khi khởi tạo Đề ${deckNumber}:`, error);
        quizForm.innerHTML = `<p style='color:red;'>Lỗi: ${error.message}. Vui lòng thử lại.</p>`;
        document.getElementById('timer-controls').classList.add('hidden');
        document.getElementById('submit-btn').classList.add('hidden');
    }
}

// Hàm hiển thị câu hỏi
function renderQuiz() {
    let htmlContent = selectedQuestions.map((q, index) => {
        const answerOptions = q.shuffledAnswers.map(ans => `
            <label class="answer-option" for="q${q.id}_${ans.originalKey}">
                <input type="radio" name="question_${q.id}" id="q${q.id}_${ans.originalKey}" value="${ans.originalKey}" />
                <span class="answer-key">${ans.displayKey}.</span> ${ans.text}
            </label>
        `).join('');

        return `
            <div class="question-item" data-question-id="${q.id}">
                <p class="question-text">Câu ${index + 1}: ${q.question}</p>
                ${answerOptions}
            </div>
        `;
    }).join('');
    quizForm.innerHTML = htmlContent;
}

// Hàm nộp bài
async function submitQuiz() {
    if (quizSubmitted) return;
    if (!confirm('Bạn có chắc chắn muốn nộp bài không?')) return;

    quizSubmitted = true;
    clearInterval(timerInterval);

    const userAnswers = {};
    const formData = new FormData(quizForm);
    for (const [key, value] of formData.entries()) {
        const qId = parseInt(key.split('_')[1]);
        userAnswers[qId] = value;
    }

    try {
        const response = await fetch('quiz-api.php?action=submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userAnswers)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Lỗi khi nộp bài.');
        }

        const result = await response.json();
        displayResults(result.score, result.reviewData, userAnswers);

    } catch (error) {
        console.error("Lỗi:", error);
        alert(error.message);
        quizSubmitted = false;
    }
}

// Hàm hiển thị kết quả
function displayResults(score, reviewData, userAnswers) {
    let reviewHtml = '';
    const questionMap = new Map(selectedQuestions.map(q => [q.id, q]));

    reviewData.forEach((q, index) => {
        const userAnswerKey = userAnswers[q.id];
        const isCorrect = userAnswerKey === q.correctAnswer;
        const questionClientData = questionMap.get(q.id);
        if (!questionClientData) return;

        reviewHtml += `<div class="question-item ${isCorrect ? 'correct-review' : 'incorrect-review'}">`;
        reviewHtml += `<p class="question-text">Câu ${index + 1}: ${q.question}</p>`;
        
        questionClientData.shuffledAnswers.forEach(ans => {
            const isUserChoice = ans.originalKey === userAnswerKey;
            const isCorrectAnswer = ans.originalKey === q.correctAnswer;
            let answerClass = isCorrectAnswer ? 'correct-answer-highlight' : (isUserChoice ? 'incorrect-choice-highlight' : '');
            
            reviewHtml += `<div class="answer-option ${answerClass}"><input type="radio" disabled ${isUserChoice ? 'checked' : ''}/><span class="answer-key">${ans.displayKey}.</span> ${ans.text}</div>`;
        });

        if (!isCorrect) {
            const correctClientAnswer = questionClientData.shuffledAnswers.find(a => a.originalKey === q.correctAnswer);
            reviewHtml += `<p style="margin-top: 10px; font-weight: bold; color: #28a745;">Đáp án đúng là: ${correctClientAnswer.displayKey}</p>`;
        }
        reviewHtml += `</div>`;
    });

    document.getElementById('score').textContent = score;
    document.getElementById('total-quiz-questions').textContent = reviewData.length;
    document.getElementById('review-area').innerHTML = reviewHtml;
    
    // Gán sự kiện cho các nút mới
    document.getElementById('redo-deck-btn').onclick = () => initializeQuiz(currentDeckNumber);
    document.getElementById('choose-another-deck-btn').onclick = returnToDeckSelection;
    
    quizForm.classList.add('hidden');
    document.getElementById('submit-btn').classList.add('hidden');
    resultsSection.classList.remove('hidden');
}

// --- Các hàm xử lý timer và modal ---
function updateTimerDisplay(isInitial = false) {
    if (isInitial || timeLeft < 0) {
        timerDisplay.textContent = 'Không giới hạn';
    } else {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function updateStartTimerButton(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    startTimerBtn.textContent = `Bắt đầu Tính giờ (${minutes} phút)`;
    startTimerBtn.onclick = () => startTimer(durationSeconds);
}

function startTimer(durationSeconds) {
    if (quizSubmitted || timerInterval) return;
    timeLeft = durationSeconds;
    startTimerBtn.disabled = true;
    setTimerBtn.disabled = true;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Hết giờ';
            alert("Hết giờ! Bài kiểm tra sẽ tự động được nộp.");
            submitQuiz();
        }
    }, 1000);
}

function openSetTimeModal() {
    if (timerInterval) return;
    setTimeModal.classList.remove('hidden');
    document.getElementById('timeInput').value = Math.floor(QUIZ_DURATION / 60);
}

function closeSetTimeModal() {
    setTimeModal.classList.add('hidden');
}

function setCustomTime() {
    const minutes = parseInt(document.getElementById('timeInput').value);
    if (isNaN(minutes) || minutes < 1 || minutes > 180) {
        alert("Vui lòng nhập số phút hợp lệ (từ 1 đến 180).");
        return;
    }
    closeSetTimeModal();
    const durationSeconds = minutes * 60;
    updateStartTimerButton(durationSeconds);
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:00`;
}

// Khởi động ứng dụng bằng cách hiển thị danh sách đề
window.onload = listDecks;