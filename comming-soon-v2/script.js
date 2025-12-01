// Tạo particles ngẫu nhiên
const particles = document.querySelector('.particles');
const count = 50;
for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDelay = (Math.random() * 16) + 's';
    p.style.opacity = Math.random() * 0.7 + 0.3;
    p.style.transform = 'translateY(' + (Math.random() * 110) + 'vh)';
    particles.appendChild(p);
}

// Countdown thật: 60 ngày từ lúc mở trang
// const targetTime = new Date();
// targetTime.setDate(targetTime.getDate() + 60);
// Countdown tới 01/03/2026 00:00:00 GMT+7
const targetTime = new Date('2026-03-01T00:00:00+07:00');
function updateCountdown() {
    const now = new Date();
    const diff = targetTime - now;

    if (diff <= 0) {
        // Hết thời gian
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = String(d).padStart(2, '0');
    document.getElementById('hours').textContent = String(h).padStart(2, '0');
    document.getElementById('minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('seconds').textContent = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000); // cập nhật mỗi giây

// Modal Logic
const notifyBtn = document.querySelector('.btn-primary');
const modal = document.getElementById('notifyModal');
const closeBtn = document.querySelector('.modal-close');
const notifyForm = document.getElementById('notifyForm');
const successMessage = document.getElementById('successMessage');

function openModal() {
    modal.classList.add('active');
    document.getElementById('email').focus();
}

function closeModal() {
    modal.classList.remove('active');
    // Reset form after delay
    setTimeout(() => {
        notifyForm.reset();
        notifyForm.hidden = false;
        successMessage.hidden = true;
    }, 300);
}

notifyBtn.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

notifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    const btn = notifyForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok || response.status === 200) {
            notifyForm.hidden = true;
            successMessage.hidden = false;
            document.getElementById('successText').textContent = data.message || 'Thanks! We\'ll notify you when we\'re live.';
        } else {
            alert(data.error || 'Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to server.');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
});
