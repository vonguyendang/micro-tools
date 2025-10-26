// script.js (đã cập nhật hoàn toàn)

const NUM_QUESTIONS = 70;
const QUIZ_DURATION = 40 * 60; 

let selectedQuestions = []; // Chỉ chứa câu hỏi, không có đáp án
let timeLeft = -1;
let timerInterval;
let quizSubmitted = false;

const quizForm = document.getElementById('quiz-form');
const timerDisplay = document.getElementById('timer');
const startTimerBtn = document.getElementById('start-timer-btn');
const setTimerBtn = document.getElementById('set-timer-btn');
const setTimeModal = document.getElementById('setTimeModal');

const DISPLAY_KEYS = ['A', 'B', 'C', 'D'];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function initializeQuiz() {
    try {
        const response = await fetch('quiz-api.php?action=start');
        if (!response.ok) {
            throw new Error('Không thể bắt đầu bài kiểm tra từ server.');
        }
        selectedQuestions = await response.json();

        selectedQuestions.forEach(q => {
            const answersContent = Object.keys(q.answers).map(key => ({
                originalKey: key, text: q.answers[key]
            }));
            const shuffledContent = shuffleArray(answersContent);
            q.shuffledAnswers = shuffledContent.map((item, index) => ({
                displayKey: DISPLAY_KEYS[index],
                originalKey: item.originalKey,
                text: item.text
            }));
        });

        renderQuiz();
        updateTimerDisplay(true);
        updateStartTimerButton(QUIZ_DURATION);
        document.getElementById('total-available-questions').textContent = selectedQuestions.length;

    } catch (error) {
        console.error("Lỗi khi khởi tạo bài thi:", error);
        quizForm.innerHTML = `<p style='color:red;'>${error.message}</p>`;
    }
}

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

async function submitQuiz(isAutoSubmit = false) {
    if (quizSubmitted) return;
    quizSubmitted = true;
    clearInterval(timerInterval);

    const userAnswers = {};
    const formData = new FormData(quizForm);
    for (const [key, value] of formData.entries()) {
        if (key.startsWith('question_')) {
            const qId = parseInt(key.split('_')[1]);
            userAnswers[qId] = value;
        }
    }

    try {
        const response = await fetch('quiz-api.php?action=submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userAnswers)
        });

        if (!response.ok) {
            throw new Error('Lỗi khi nộp bài. Vui lòng thử lại.');
        }

        const result = await response.json();
        displayResults(result.score, result.reviewData, userAnswers);

    } catch (error) {
        console.error("Lỗi khi nộp bài:", error);
        alert(error.message);
    }
}

function displayResults(score, reviewData, userAnswers) {
    let reviewHtml = '';

    // Tạo một map để tra cứu shuffledAnswers của mỗi câu hỏi
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
            let answerClass = '';
            if (isCorrectAnswer) answerClass = 'correct-answer-highlight';
            else if (isUserChoice) answerClass = 'incorrect-choice-highlight';
            
            reviewHtml += `
                <div class="answer-option ${answerClass}">
                    <input type="radio" disabled ${isUserChoice ? 'checked' : ''}/>
                    <span class="answer-key">${ans.displayKey}.</span> ${ans.text} 
                    ${isCorrectAnswer ? '✅ (Đáp án đúng)' : ''}
                    ${isUserChoice && !isCorrectAnswer ? '❌ (Bạn đã chọn)' : ''}
                </div>
            `;
        });
        reviewHtml += `</div>`;
    });

    document.querySelectorAll('#quiz-form input').forEach(input => input.disabled = true);
    startTimerBtn.disabled = true;
    setTimerBtn.disabled = true;
    
    document.getElementById('score').textContent = score;
    document.getElementById('total-available-questions').textContent = reviewData.length;
    document.getElementById('review-area').innerHTML = reviewHtml;
    
    quizForm.classList.add('hidden');
    document.getElementById('submit-btn').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
}


// --- Các hàm xử lý timer và modal không thay đổi ---
function updateTimerDisplay(isInitial = false) {
    if (isInitial || timeLeft === -1) timerDisplay.textContent = 'Không giới hạn';
    else {
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
    if (quizSubmitted) return;
    clearInterval(timerInterval);
    timeLeft = durationSeconds;
    startTimerBtn.disabled = true;
    setTimerBtn.disabled = true;
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Hết giờ';
            alert("Hết giờ! Bài kiểm tra sẽ tự động được nộp.");
            submitQuiz(true);
            return;
        }
        timeLeft--;
        updateTimerDisplay();
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
    if (isNaN(minutes) || minutes <= 0 || minutes > 180) {
        alert("Vui lòng nhập số phút hợp lệ (tối đa 180 phút).");
        return;
    }
    closeSetTimeModal();
    const durationSeconds = minutes * 60;
    updateStartTimerButton(durationSeconds);
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:00`;
    alert(`Đã đặt thời gian làm bài là ${minutes} phút. Nhấn nút "Bắt đầu Tính giờ" để bắt đầu.`);
}

// Khởi tạo bài kiểm tra khi trang load
window.onload = initializeQuiz;