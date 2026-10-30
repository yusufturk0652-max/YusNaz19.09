// ❤️ Firebase Kütüphanelerini İçe Aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

// 🚀 Firebase Yapılandırman
const firebaseConfig = {
  apiKey: "AIzaSyBguWz2mShwdzekWPcs6kq9hsaKBNqMfd4",
  authDomain: "yusufnazli-97f9a.firebaseapp.com",
  projectId: "yusufnazli-97f9a",
  storageBucket: "yusufnazli-97f9a.firebasestorage.app",
  messagingSenderId: "587206596394",
  appId: "1:587206596394:web:e053ee52ad6ac45ed6b053",
  measurementId: "G-3PG0C0752Q"
};

// Firebase Başlatma
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// ❤️ Açılış Ekranı Buton Fonksiyonu (Buraya basıldığında müzik de otomatik başlar)
window.enterSite = function() {
    const screen = document.getElementById("welcomeScreen");
    if (screen) {
        screen.style.transition = "opacity 0.8s ease";
        screen.style.opacity = "0";
        setTimeout(() => { 
            screen.style.display = "none"; 
            screen.style.pointerEvents = "none";
        }, 800);
    }

    // 🎵 "Hikayemize Başla" denildiği an müzik çalmaya başlar
    let music = document.getElementById("loveMusic");
    let btn = document.getElementById("playBtn");
    if (music) {
        music.play().then(() => {
            playing = true;
            if(btn) btn.innerHTML = "⏸";
        }).catch(e => {
            console.log("Tarayıcı otomatik müziğe izin vermedi, sağ üstten çalınabilir.");
        });
    }
};

// ❤️ Tarih Sayaçları (19 Eylül 2024 - 19:30)
const startDate = new Date("2024-09-19T19:30:00");
function updateCounter() {
    const now = new Date();
    const difference = now - startDate;
    if (difference < 0) return;
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if(document.getElementById("days")) {
        document.getElementById("days").innerHTML = days.toLocaleString("tr-TR");
        document.getElementById("hours").innerHTML = (hours % 24).toLocaleString("tr-TR");
        document.getElementById("minutes").innerHTML = (minutes % 60).toLocaleString("tr-TR");
        document.getElementById("seconds").innerHTML = (seconds % 60).toLocaleString("tr-TR");
    }
}
setInterval(updateCounter, 1000);
updateCounter();

// Kalp Yağmuru Animasyonu
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 12 + "px";
    heart.style.animationDuration = Math.random() * 4 + 4 + "s";
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 8000);
}
setInterval(createHeart, 350);

// Sayfa Sekme Değiştirme
window.showPage = function(pageId) {
    document.querySelectorAll(".page").forEach(section => section.classList.add("hidden"));
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(pageId).classList.remove("hidden");
    if(window.event && window.event.target) {
        window.event.target.classList.add("active");
    }
};

// 🎵 Müzik Çalar Buton Kontrolü
let music = document.getElementById("loveMusic");
let playing = false;
window.playMusic = function() {
    let btn = document.getElementById("playBtn");
    if (playing) {
        if(music) music.pause();
        if(btn) btn.innerHTML = "▶️";
        playing = false;
    } else {
        if(music) music.play();
        if(btn) btn.innerHTML = "⏸";
        playing = true;
    }
};

// 💌 Aşk Mektupları Listesi
const loveMessages = [
    "Hayatıma girdiğin 19.09.2024 tarihinden beri her günüm seninle daha renkli, daha anlamlı...",
    "Nazlı'm... Gözlerine baktığımda huzuru buluyorum. İyi ki benim kaderim sensin...",
    "Dünyanın en güzel gülüşüne sahip sevgilim, iyi ki varsın...",
    "Hayatıma girdiğin günden beri, takvimdeki en güzel yaprak seninle uyandığım sabahlar oldu. İyi ki varsın sevgilim, iyi ki kaderim seninle yazıldı...",
    "Gözlerinin kahvesinden ömrüme bir ömür damladı sanki... Seninle geçen her saniye, hayatın bana sunduğu en büyük ödül. Seni çok seviyorum Nazlı'm...",
    "Bazen sadece ellerini tutmak, dünyanın tüm gürültüsünü susturmaya yetiyor. Sen benim bu hayattaki en huzurlu sığınağımsın...",
    "Yıldızlara bakarken seni düşünüyorum, çünkü ikiniz de parlıyorsunuz ve ikiniz de benim için çok uzakta ama bir o kadar kalbimin içindesiniz. İyi ki benimsin...",
    "Seninle gülmeyi, seninle susmayı, kısacası hayatı seninle paylaşmayı o kadar çok seviyorum ki... Sonsuzluğum, her şeyim sensin...",
    "Dünyanın en güzel tesadüfü seninle karşılaşmak, en büyük şansımsa seni sevmekti. Yusuf'un kalbi son nefesine kadar sadece senin için atacak..."
];

window.openLetter = function() {
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    document.getElementById("randomLetterText").innerHTML = loveMessages[randomIndex];
    document.getElementById("letterModal").classList.remove("hidden");
};
window.closeLetter = function() {
    document.getElementById("letterModal").classList.add("hidden");
};

// ❤️ VERİTABANI: Sevgi Seviyesi (Canlı)
let lovePercentage = 100;
async function fetchLoveLevel() {
    try {
        const loveRef = doc(db, "settings", "loveLevel");
        const docSnap = await getDoc(loveRef);
        if (docSnap.exists()) {
            lovePercentage = docSnap.data().value;
        } else {
            await setDoc(loveRef, { value: 100 });
        }
        updateLoveBarUI();
    } catch (e) {
        console.log("Hata:", e);
    }
}
fetchLoveLevel();

window.changeLove = async function(amount) {
    lovePercentage += amount;
    if (lovePercentage > 100) lovePercentage = 100;
    if (lovePercentage < 10) lovePercentage = 10;

    const loveRef = doc(db, "settings", "loveLevel");
    await setDoc(loveRef, { value: lovePercentage });
    updateLoveBarUI();
};

function updateLoveBarUI() {
    const bar = document.getElementById("loveProgress");
    const statusText = document.getElementById("loveStatusText");
    if(!bar || !statusText) return;

    bar.style.width = lovePercentage + "%";
    bar.innerHTML = lovePercentage + "%";

    if (lovePercentage >= 100) statusText.innerHTML = "Sonsuz Sevgi & Bağlılık ♾️❤️";
    else if (lovePercentage >= 70) statusText.innerHTML = "Harikayız, aşkımız tam gaz devam ediyor! 🥰";
    else if (lovePercentage >= 40) statusText.innerHTML = "Ufak atışmalar aşkın tuzu biberidir 😉❤️";
    else statusText.innerHTML = "Barışmak şart oldu, hemen sarılın! 🥺💕";
}

// 📖 VERİTABANI: Notlar (Aşk Defteri)
window.addNote = async function() {
    const input = document.getElementById("noteText");
    const text = input.value.trim();
    if (!text) return alert("Lütfen bir not yazın ❤️");

    await addDoc(collection(db, "notes"), {
        text: text,
        date: new Date().toLocaleString("tr-TR"),
        createdAt: Date.now()
    });
    input.value = "";
};

function loadNotes() {
    const list = document.getElementById("notesList");
    if (!list) return;
    onSnapshot(collection(db, "notes"), (snapshot) => {
        list.innerHTML = "";
        if (snapshot.empty) {
            list.innerHTML = "<p style='text-align:center; color:#ffccd5;'>Henüz eklenmiş özel bir not yok ❤️</p>";
            return;
        }
        let notesArr = [];
        snapshot.forEach(docSnap => {
            notesArr.push({ id: docSnap.id, ...docSnap.data() });
        });
        notesArr.sort((a, b) => b.createdAt - a.createdAt);

        notesArr.forEach(note => {
            list.innerHTML += `
                <div class="note-item">
                    <div class="note-text">${note.text}</div>
                    <div class="note-date">📅 ${note.date}</div>
                    <div class="note-actions">
                        <button class="delete-btn" onclick="deleteNote('${note.id}')">🗑️ Sil</button>
                    </div>
                </div>`;
        });
    });
}
loadNotes();

window.deleteNote = async function(id) {
    if (confirm("Silmek istediğinize emin misiniz?")) {
        await deleteDoc(doc(db, "notes", id));
    }
};

// 🎯 VERİTABANI: Yapılacaklar (Bucket List)
window.addTodo = async function() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();
    if (!text) return;

    await addDoc(collection(db, "todos"), {
        text: text,
        completed: false,
        createdAt: Date.now()
    });
    input.value = "";
};

window.toggleTodo = async function(id, currentStatus) {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { completed: !currentStatus });
};

window.deleteTodo = async function(id) {
    await deleteDoc(doc(db, "todos", id));
};

function loadTodos() {
    const list = document.getElementById("todoList");
    if (!list) return;
    onSnapshot(collection(db, "todos"), (snapshot) => {
        list.innerHTML = "";
        let todosArr = [];
        snapshot.forEach(docSnap => {
            todosArr.push({ id: docSnap.id, ...docSnap.data() });
        });
        todosArr.sort((a, b) => a.createdAt - b.createdAt);

        todosArr.forEach(todo => {
            list.innerHTML += `
                <li class="todo-item ${todo.completed ? 'completed' : ''}">
                    <span onclick="toggleTodo('${todo.id}', ${todo.completed})">${todo.completed ? '✅' : '⭕'} ${todo.text}</span>
                    <button onclick="deleteTodo('${todo.id}')">🗑️</button>
                </li>`;
        });
    });
}
loadTodos();

// 🧩 ANI PUZZLE OYUNU
let puzzleImage = "1.jpg"; 
let gridSize = 3; 
let firstPiece = null;
let puzzleTimer = null;
let secondsElapsed = 0;
let isPlayingPuzzle = false;

window.setDifficulty = function(size) {
    gridSize = size;
    document.querySelectorAll('.btn-diff').forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }
    startPuzzle();
};

function startPuzzle() {
    const puzzle = document.getElementById("puzzle");
    if(!puzzle) return;
    
    puzzle.innerHTML = "";
    document.getElementById("winMessage").innerHTML = "";
    
    let boardSize = gridSize === 3 ? 330 : 360;
    puzzle.style.width = boardSize + "px";
    puzzle.style.height = boardSize + "px";

    let totalPieces = gridSize * gridSize;
    let pieces = [];
    for(let i = 0; i < totalPieces; i++) pieces.push(i);
    pieces.sort(() => Math.random() - 0.5);

    let pieceSize = boardSize / gridSize;

    pieces.forEach(num => {
        let piece = document.createElement("div");
        piece.className = "piece";
        piece.style.width = pieceSize + "px";
        piece.style.height = pieceSize + "px";
        piece.dataset.correct = num;
        piece.style.backgroundImage = `url(${puzzleImage})`;
        piece.style.backgroundSize = `${boardSize}px ${boardSize}px`;

        let x = num % gridSize;
        let y = Math.floor(num / gridSize);
        piece.style.backgroundPosition = `-${x * pieceSize}px -${y * pieceSize}px`;
        
        piece.onclick = () => selectPiece(piece);
        puzzle.appendChild(piece);
    });

    clearInterval(puzzleTimer);
    secondsElapsed = 0;
    const timerElem = document.getElementById("timerText");
    if(timerElem) timerElem.innerHTML = "⏱️ Süre: 0s";
    isPlayingPuzzle = true;
    
    puzzleTimer = setInterval(() => {
        if(isPlayingPuzzle) {
            secondsElapsed++;
            if(timerElem) timerElem.innerHTML = `⏱️ Süre: ${secondsElapsed}s`;
        }
    }, 1000);
}

function selectPiece(piece) {
    if (!firstPiece) {
        firstPiece = piece;
        piece.classList.add("selected");
    } else {
        let temp = firstPiece.style.backgroundPosition;
        firstPiece.style.backgroundPosition = piece.style.backgroundPosition;
        piece.style.backgroundPosition = temp;
        firstPiece.classList.remove("selected");
        firstPiece = null;
        checkPuzzle();
    }
}

function checkPuzzle() {
    let pieces = document.querySelectorAll(".piece");
    let win = true;
    let boardSize = gridSize === 3 ? 330 : 360;
    let pieceSize = boardSize / gridSize;

    pieces.forEach(piece => {
        let correct = Number(piece.dataset.correct);
        let x = correct % gridSize;
        let y = Math.floor(correct / gridSize);
        let correctPos = `-${x * pieceSize}px -${y * pieceSize}px`;
        if (piece.style.backgroundPosition !== correctPos) win = false;
    });

    if (win) {
        isPlayingPuzzle = false;
        clearInterval(puzzleTimer);
        document.getElementById("winMessage").innerHTML = `🎉❤️ Harika! ${secondsElapsed} saniyede tamamladın! ❤️🎉`;
        puzzleHeartExplosion();
    }
}

function puzzleHeartExplosion() {
    for (let i = 0; i < 35; i++) {
        let heart = document.createElement("div");
        heart.innerHTML = "💖";
        heart.className = "success-heart";
        heart.style.left = Math.random() * 80 + 10 + "vw";
        heart.style.top = "60vh";
        document.body.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 2000);
    }
}

startPuzzle();

// 🌙 Tema Değiştirme
window.changeTheme = function() {
    document.body.classList.toggle("night");
    document.body.classList.toggle("day");
    let btn = document.getElementById("themeBtn");
    btn.innerHTML = document.body.classList.contains("day") ? "🌙 Gece Modu" : "☀️ Gündüz Modu";
};