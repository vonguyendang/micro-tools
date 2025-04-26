document.addEventListener('DOMContentLoaded', () => {
    // --- Lấy các phần tử DOM ---
    const correctAnswersInput = document.getElementById('correct-answers-input');
    const saveKeyButton = document.getElementById('save-key-button');
    const newKeyButton = document.getElementById('new-key-button');
    const keyStatus = document.getElementById('key-status');
    const formattedKeySection = document.getElementById('formatted-key-section');
    const formattedCorrectAnswers = document.getElementById('formatted-correct-answers');

    const studentAnswersInput = document.getElementById('student-answers-input');
    const gradeButton = document.getElementById('grade-button');
    const clearSubmissionButton = document.getElementById('clear-submission-button');

    const resultsSection = document.getElementById('results-section');
    const formattedStudentAnswersSection = document.getElementById('formatted-student-answers-section');
    const formattedStudentAnswers = document.getElementById('formatted-student-answers');
    const scoreDetails = document.getElementById('score-details');
    const totalScore = document.getElementById('total-score');
    const incorrectAnswersList = document.getElementById('incorrect-answers-list');
    const incorrectAnswersSection = document.getElementById('incorrect-answers-section');
    const missingAnswersList = document.getElementById('missing-answers-list');
    const missingAnswersSection = document.getElementById('missing-answers-section');

    const pasteButtons = document.querySelectorAll('.paste-button');

    // --- Biến trạng thái ---
    let correctAnswersMap = new Map();
    let totalQuestions = 0;

    // --- Hàm chung để xử lý (parse) văn bản đáp án ---
    function parseAnswers(rawText) {
        const answers = new Map();
        if (!rawText) return answers;

        // Regex cải tiến: (Optional "Câu") (Số câu) (Phân cách .) (Đáp án A/B/C/D)
        // Chấp nhận nhiều loại phân cách và khoảng trắng
        const regex = /(?:Câu|Cau)?\s*(\d+)\s*[\.:\-\s]*\s*([A-D])(?![a-zA-Z])/gi;

        // Chuẩn hóa khoảng trắng và loại bỏ dấu chấm cuối đáp án (vd: C.)
        let cleanedText = rawText.replace(/([A-D])\.\s*/gi, '$1 ').replace(/\s+/g, ' ').trim();

        let match;
        while ((match = regex.exec(cleanedText)) !== null) {
            try {
                const questionNum = parseInt(match[1], 10);
                // Chỉ lấy đáp án nếu số câu > 0
                if (questionNum > 0) {
                    const answer = match[2].toUpperCase();
                    // Chỉ ghi lại câu trả lời đầu tiên tìm thấy cho mỗi câu hỏi
                    if (!answers.has(questionNum)) {
                        answers.set(questionNum, answer);
                    }
                }
            } catch (e) {
                console.error("Lỗi khi xử lý match:", match[0], e);
            }
        }
        return answers;
    }

    // --- Hàm chung để hiển thị đáp án đã định dạng ---
    function displayFormattedAnswers(answerMap, targetElement, sectionElement) {
        targetElement.textContent = ''; // Xóa nội dung cũ
        sectionElement.style.display = 'none'; // Mặc định ẩn

        if (answerMap.size === 0) {
             targetElement.textContent = 'Không có dữ liệu.'; // Hiển thị thông báo nếu map rỗng
             sectionElement.style.display = 'block'; // Vẫn hiển thị section để thấy thông báo
            return;
        }

        // Sắp xếp key (số câu) theo thứ tự tăng dần
        const sortedKeys = Array.from(answerMap.keys()).sort((a, b) => a - b);
        let formattedString = "";
        let count = 0;

        sortedKeys.forEach((key, index) => {
            formattedString += `${key}${answerMap.get(key) || '_'}`; // Dùng _ nếu giá trị rỗng (hiếm khi xảy ra với map)
            count++;
            // Xuống dòng sau mỗi 10 câu, trừ câu cuối cùng
            if (count % 10 === 0 && index < sortedKeys.length - 1) {
                formattedString += ",\n";
            } else if (index < sortedKeys.length - 1) {
                // Thêm dấu phẩy và cách nếu không phải cuối dòng và không phải cuối cùng
                formattedString += ", ";
            }
        });

        targetElement.textContent = formattedString;
        sectionElement.style.display = 'block'; // Hiển thị section
    }

    // --- Xử lý Đáp án chuẩn ---
    saveKeyButton.addEventListener('click', () => {
        const rawKey = correctAnswersInput.value.trim();
        correctAnswersMap = parseAnswers(rawKey);

        if (correctAnswersMap.size === 0) {
            showKeyStatus('Lỗi: Không tìm thấy đáp án hợp lệ nào. Vui lòng kiểm tra lại.', false);
            totalQuestions = 0;
            gradeButton.disabled = true;
            formattedKeySection.style.display = 'none'; // Ẩn hiển thị key cũ
        } else {
            // Lấy số câu hỏi lớn nhất làm tổng số câu (hoặc dùng size nếu muốn tính điểm dựa trên số câu có đáp án)
            // totalQuestions = Math.max(...correctAnswersMap.keys()); // Cách 1: Dựa vào số câu lớn nhất
            totalQuestions = correctAnswersMap.size; // Cách 2: Dựa vào số lượng đáp án có trong key
            showKeyStatus(`Đã lưu ${totalQuestions} đáp án chuẩn thành công!`, true);
            gradeButton.disabled = false; // Kích hoạt nút chấm điểm
            displayFormattedAnswers(correctAnswersMap, formattedCorrectAnswers, formattedKeySection);
        }
    });

    // --- Xử lý nút Tạo mới đáp án ---
    newKeyButton.addEventListener('click', () => {
        correctAnswersInput.value = '';
        correctAnswersMap = new Map();
        totalQuestions = 0;
        keyStatus.textContent = '';
        keyStatus.className = 'status';
        gradeButton.disabled = true;
        formattedKeySection.style.display = 'none';
        resultsSection.style.display = 'none'; // Ẩn kết quả cũ
        studentAnswersInput.value = ''; // Xóa luôn bài làm TS cũ
        console.log("Đã tạo mới đáp án chuẩn.");
        correctAnswersInput.focus(); // Focus vào ô nhập key
    });

    function showKeyStatus(message, isSuccess) {
        keyStatus.textContent = message;
        keyStatus.className = `status ${isSuccess ? 'success' : 'error'}`;
    }

    // --- Xử lý Chấm điểm ---
    gradeButton.addEventListener('click', () => {
        if (correctAnswersMap.size === 0) {
            alert("Lỗi: Chưa có đáp án chuẩn được lưu. Vui lòng lưu đáp án chuẩn trước.");
            return;
        }

        const rawStudentAnswers = studentAnswersInput.value.trim();
        if (!rawStudentAnswers) {
            alert("Vui lòng nhập bài làm của thí sinh.");
            studentAnswersInput.focus();
            return;
        }

        // 1. Parse bài làm thí sinh
        const studentAnswersMap = parseAnswers(rawStudentAnswers);

        // 2. Thực hiện chấm điểm
        let correctCount = 0;
        const incorrectAnswers = [];
        const missingAnswers = [];
        const studentFormattedMap = new Map(); // Map để hiển thị bài làm TS chuẩn hóa

        const sortedCorrectKeys = Array.from(correctAnswersMap.keys()).sort((a, b) => a - b);

        sortedCorrectKeys.forEach(questionNum => {
            const correctAnswer = correctAnswersMap.get(questionNum);
            const studentAnswer = studentAnswersMap.get(questionNum);

            studentFormattedMap.set(questionNum, studentAnswer || '_'); // Lưu để hiển thị, '_' nếu bỏ trống

            if (studentAnswer) {
                if (studentAnswer === correctAnswer) {
                    correctCount++;
                } else {
                    incorrectAnswers.push({ num: questionNum, student: studentAnswer, correct: correctAnswer });
                }
            } else {
                missingAnswers.push({ num: questionNum, correct: correctAnswer });
            }
        });

        // 3. Hiển thị kết quả
        resultsSection.style.display = 'block';

        // 3.1 Hiển thị bài làm thí sinh đã định dạng
        displayFormattedAnswers(studentFormattedMap, formattedStudentAnswers, formattedStudentAnswersSection);

        // 3.2 Tính điểm và hiển thị tổng kết
        // Sử dụng totalQuestions đã lưu khi bấm "Lưu đáp án chuẩn"
        const scorePerQuestion = totalQuestions > 0 ? (10 / totalQuestions) : 0;
        const finalScore = correctCount * scorePerQuestion;

        scoreDetails.textContent = `Số câu trả lời đúng: ${correctCount} / ${totalQuestions} câu`;
        totalScore.textContent = `Tổng điểm: ${correctCount} * ${scorePerQuestion.toFixed(2)} = ${finalScore.toFixed(2)} điểm`; // Làm tròn 2 chữ số

        // 3.3 Hiển thị các câu sai
        incorrectAnswersList.innerHTML = ''; // Xóa danh sách cũ
        incorrectAnswersSection.style.display = incorrectAnswers.length > 0 ? 'block' : 'none'; // Hiển thị nếu có
        incorrectAnswers.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Câu ${item.num}: Thí sinh chọn ${item.student}. Đáp án đúng là ${item.correct}.`;
            incorrectAnswersList.appendChild(li);
        });

         // 3.4 Hiển thị các câu bị bỏ trống/không nhận dạng được (so với key)
        missingAnswersList.innerHTML = ''; // Xóa danh sách cũ
        missingAnswersSection.style.display = missingAnswers.length > 0 ? 'block' : 'none'; // Hiển thị nếu có
         missingAnswers.forEach(item => {
             const li = document.createElement('li');
             li.textContent = `Câu ${item.num}: Thí sinh không trả lời hoặc định dạng không đúng. Đáp án đúng là ${item.correct}.`;
             missingAnswersList.appendChild(li);
         });

         // Cuộn xuống khu vực kết quả để người dùng dễ thấy
         resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // --- Xử lý nút Xóa bài làm ---
    clearSubmissionButton.addEventListener('click', () => {
        studentAnswersInput.value = '';
        resultsSection.style.display = 'none';
        console.log("Đã xóa nội dung bài làm của thí sinh.");
        studentAnswersInput.focus();
    });

    // --- Xử lý nút Paste ---
    pasteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            // LƯU LẠI THAM CHIẾU NÚT NGAY LẬP TỨC
            const clickedButton = event.currentTarget;
            const targetId = clickedButton.getAttribute('data-target');
            const targetTextarea = document.getElementById(targetId);

            if (!targetTextarea) {
                console.error("Không tìm thấy textarea mục tiêu:", targetId);
                return;
            }

            // Kiểm tra hỗ trợ Clipboard API cơ bản
            if (!navigator.clipboard || !navigator.clipboard.readText) {
                 alert("Tính năng dán tự động không được hỗ trợ hoặc bị chặn trên trình duyệt/trang này. Vui lòng sử dụng Ctrl+V (hoặc Cmd+V trên Mac) để dán thủ công.");
                 targetTextarea.focus();
                 return;
            }

            try {
                // Cố gắng đọc từ clipboard
                const clipboardText = await navigator.clipboard.readText();

                // SỬ DỤNG BIẾN clickedButton THAY VÌ event.currentTarget
                const originalButtonText = clickedButton.textContent;

                targetTextarea.value = clipboardText;
                targetTextarea.dispatchEvent(new Event('input', { bubbles: true }));
                console.log(`Đã dán vào ${targetId}`);

                // Phản hồi trực quan ngắn gọn - SỬ DỤNG clickedButton
                clickedButton.textContent = 'Đã dán!';
                clickedButton.disabled = true;

                setTimeout(() => {
                    // SỬ DỤNG clickedButton trong setTimeout
                    if (clickedButton) { // Kiểm tra lại cho chắc chắn
                       clickedButton.textContent = originalButtonText;
                       clickedButton.disabled = false;
                    }
                }, 1000); // Reset nút sau 1 giây

            } catch (err) {
                console.error('Lỗi khi dán từ clipboard:', err);
                 if (err.name === 'NotAllowedError') {
                     alert('Quyền truy cập clipboard đã bị từ chối. Vui lòng cấp quyền trong cài đặt trình duyệt hoặc dán thủ công (Ctrl+V).');
                 } else if (err.name === 'SecurityError') {
                    alert('Không thể truy cập clipboard do cài đặt bảo mật hoặc trang không phải HTTPS/localhost. Vui lòng dán thủ công (Ctrl+V).');
                 } else {
                      alert('Đã xảy ra lỗi khi cố gắng dán từ clipboard. Vui lòng dán thủ công (Ctrl+V).');
                 }
                 targetTextarea.focus();
            }
        });
    });
}); // Kết thúc DOMContentLoaded