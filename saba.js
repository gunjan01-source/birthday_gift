// --- GLOBAL DATA ---
const confettiColors = ['#FFC0CB', '#b5e4eaff', '#ff8ac4ff', '#FBE7C6', '#AEC6CF']; 
let isLit = false;
let lyricIndex = 0;
let lyricInterval = null;

const lyricsData = [
    [0.0, ""],
    [39.10, "I remember when I first noticed that you liked me back"],
    [50.0, "We were sitting down in a restaurant, waiting for the check"],
    [60.0, "We had made love earlier that day with no strings attached"],
    [70.0, "But I could tell that something had changed, how you looked at me then"],
    [80.0, "Kristen, come right back"],
    [90.0, "I've been waiting for you to slip back in bed"],
    [100.0, "When you light the candle"],
    [120.0, "& on the Lower East Side you're dancing with me now"],
    [135.0, "& I'm taking pictures of you with flowers on the wall"],
    [145.0, "Think I like you best when you're dressed in black from head to toe"],
    [155.0, "Think I like you best when you're just with me and no one else"],
    [165.0, "Kristen, come right back"],
    [170.0, "I've been waiting for you to slip back in bed"],
    [180.0, "When you light the candle"],
    [205.0, "And I'm kissing you, lying in my room"],
    [220.0, "Holding you until you fall asleep"],
    [231.0, "And it's just as good as I knew it would be"], 
    [236.0, "Stay with me, I don't want you to leave"],
    [263.0, "Kristen, come right back"],
    [267.0, "I've been waiting for you to slip back in bed"],
    [275.0, "When you light the candle"],
    [280.0, "Happy Birthday, my soulmate!"]
];

// --- FUNCTIONS ---

function revealSite() {
    const overlay = document.getElementById('overlay-screen');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.style.display = 'none'; }, 800);
    }
}

function syncLyrics() {
    const song = document.getElementById('bday-song');
    const lyricElement = document.getElementById('current-lyric');
    if (!song || !lyricElement || song.paused) return;
    
    if (lyricIndex < lyricsData.length && song.currentTime >= lyricsData[lyricIndex][0]) {
        lyricElement.textContent = lyricsData[lyricIndex][1];
        lyricElement.style.opacity = '1';
        lyricIndex++;
    }
}

function launchConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return; 
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * 5)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(confetti);
    }
    setTimeout(() => { container.innerHTML = ''; }, 5000);
}

// --- DOM CONTENT LOADED ---

document.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('bday-song');
    const introOverlay = document.getElementById('intro-overlay');
    const loadingPage = document.getElementById('loading-page');
    const envelope = document.getElementById("envelope");
    const candle = document.getElementById('candle-click-target');

    // 1. Loading Logic
    if (loadingPage) {
        setTimeout(() => {
            document.body.classList.add('loaded');
            setTimeout(() => { loadingPage.style.display = 'none'; }, 500);
        }, 3000);
    }

    // 2. Main Page Music & Lyrics
    if (introOverlay && song) {
        introOverlay.addEventListener('click', () => {
            song.play();
            lyricInterval = setInterval(syncLyrics, 100);
            introOverlay.style.transform = 'translateY(-100%)';
            setTimeout(() => { introOverlay.style.display = 'none'; }, 1000);
        });
    }

    // 3. Envelope Interaction (For cat.html)
    if (envelope) {
        envelope.addEventListener("click", () => {
            envelope.classList.toggle("open");
        });
    }

    // 4. Candle Interaction
    if (candle) {
        candle.addEventListener('click', () => {
            const flame = document.getElementById('flame');
            if (!isLit) {
                flame.classList.add('lit');
                launchConfetti();
                isLit = true;
            } else {
                flame.classList.remove('lit');
                isLit = false;
            }
        });
    }

    // 5. Aesthetic Mouse Sparkles
    document.addEventListener('mousemove', (e) => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '💗';
        sparkle.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; pointer-events:none; z-index:10000; color:#ff7293; font-size:20px;`;
        document.body.appendChild(sparkle);
        sparkle.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(20px)' }], { duration: 800 });
        setTimeout(() => sparkle.remove(), 800);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('intro-overlay');
    const main = document.getElementById('main-content');
    const song = document.getElementById('bday-song');

    if (overlay) {
        overlay.addEventListener('click', () => {
            // Start Music
            song.play().catch(e => console.log("Audio play blocked by browser."));

            // Slide the disc up and out
            overlay.style.transform = 'translateY(-100%)';
            
            // Show Heading and start Lyrics
            setTimeout(() => {
                overlay.style.display = 'none';
                main.style.display = 'block';
                document.body.style.overflow = 'auto'; // Re-enable scrolling if needed
                
                // Initialize Lyrics Synchronization
                lyricIndex = 0;
                if (typeof syncLyrics === "function") {
                    setInterval(syncLyrics, 100);
                }
            }, 1000);
        });
    }
});