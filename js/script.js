document.addEventListener('DOMContentLoaded', () => {
    createStars();
    setTimeout(() => {
        switchPage('loading-page', 'code-page');
    }, 3000);
    document.getElementById('submitCode').addEventListener('click', handleCodeSubmission);
});

async function sendInvitationViaBot(teacherName) {
    console.log(`Sending invitation for ${teacherName} via Bot...`);
    const serverUrl = 'http://localhost:5000/generate-and-send';
    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ teacherName: teacherName })
        });
        const result = await response.json();
        if (result.success) {
            console.log('Successfully requested image generation. Bot will send the image.');
        } else {
            console.error('Backend Error:', result.message);
        }
    } catch (error) {
        console.error('Error connecting to Backend Server:', error);
    }
}

async function handleCodeSubmission() {
    const codeInput = document.getElementById('codeInput').value.trim().toUpperCase();
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        if (data[codeInput]) {
            const teacher = data[codeInput];
            updateInvitation(teacher);
            switchPage('code-page', 'invitation-page');
            sendInvitationViaBot(teacher.name);
        } else {
            alert('Invalid code. Please try again.');
        }
    } catch (error) {
        console.error('Error loading teacher data:', error);
        alert('An error occurred. Please try again.');
    }
}

function updateInvitation(teacher) {
    const greeting = document.getElementById('greeting');
    const title = teacher.gender === 'male' ? 'ဆရာ' : 'ဆရာမ';
    const formality = teacher.gender === 'male' ? 'ခင်ဗျာ' : 'ရှင်';
    greeting.innerHTML = `ချစ်ခင်လေးစားရပါသော ${title} <span class="teacher-name">${teacher.name}</span> ${formality}...`;
}

function switchPage(fromId, toId) {
    const fromPage = document.getElementById(fromId);
    const toPage = document.getElementById(toId);
    fromPage.classList.remove('active');
    toPage.classList.add('active');
    if (toId === 'invitation-page') {
        startFireworks();
        animateInvitationElements();
    }
}

function animateInvitationElements() {
    const elements = document.querySelectorAll('#invitation-page .animate-item, #invitation-page .animate-zoom');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('is-visible');
        }, index * 200);
    });
}

// --- Star and Firework Functions (မပြောင်းလဲပါ) ---
function createStars() { const starsContainer = document.createElement('div'); starsContainer.className = 'stars'; for (let i = 0; i < 50; i++) { const star = document.createElement('div'); star.className = 'star'; star.style.left = `${Math.random() * 100}%`; star.style.top = `${Math.random() * 100}%`; star.style.animationDelay = `${Math.random() * 2}s`; starsContainer.appendChild(star); } document.body.appendChild(starsContainer); }
let fireworksInterval = null; const fireworksContainer = document.getElementById('fireworks-container'); function createFirework() { const x = Math.random() * window.innerWidth; const y = Math.random() * window.innerHeight * 0.7; const particleCount = 50; const hue = Math.random() * 360; for (let i = 0; i < particleCount; i++) { createParticle(x, y, hue); } } function createParticle(x, y, hue) { const particle = document.createElement('div'); particle.className = 'particle'; const size = Math.random() * 3 + 1; particle.style.width = `${size}px`; particle.style.height = `${size}px`; const color = `hsl(${hue}, 100%, 70%)`; particle.style.backgroundColor = color; particle.style.left = `${x}px`; particle.style.top = `${y}px`; fireworksContainer.appendChild(particle); const angle = Math.random() * Math.PI * 2; const distance = Math.random() * 80 + 20; const targetX = distance * Math.cos(angle); const targetY = distance * Math.sin(angle); setTimeout(() => { particle.style.transform = `translate(${targetX}px, ${targetY}px)`; particle.style.opacity = '0'; }, 10); setTimeout(() => { particle.remove(); }, 1500); } function startFireworks() { if (!fireworksInterval) { fireworksInterval = setInterval(createFirework, 2000); } }