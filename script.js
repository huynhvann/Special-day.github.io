   document.addEventListener("DOMContentLoaded", () => {

  /* ===== SCROLL ===== */
  window.scrollToSection = function () {
    const target = document.getElementById("main-content");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* ===== STAR EFFECT ===== */
  const starContainer = document.getElementById("star-container");
  if (starContainer) {
    for (let i = 0; i < 50; i++) {
      const star = document.createElement("span");
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDuration = Math.random() * 3 + 2 + "s";
      starContainer.appendChild(star);
    }
  }

  /* ===== HEART RAIN ===== */
  const heartContainer = document.getElementById("heart-container");
  if (heartContainer) {
    const hearts = ["💖", "💗", "💘", "💕", "💞"];
    for (let i = 0; i < 20; i++) {
      const span = document.createElement("span");
      span.innerText = hearts[Math.floor(Math.random() * hearts.length)];
      span.style.left = Math.random() * 100 + "%";
      span.style.animationDuration = Math.random() * 5 + 3 + "s";
      span.style.top = "-" + Math.random() * 20 + "px";
      heartContainer.appendChild(span);
    }
  }
 /* ===== AUDIO PLAYER ===== */
  const audio = document.getElementById("mainAudio");
  if (!audio) return;

  const playlists = {
  playlists01: [
 
  ],
  playlists02: [
    { title: "Aishiteru – 愛してる", src: "assets/music/Maco  愛してる [aishiteru] (Lyric Video).mp3" },
    { title: "First Love – 宇多田ヒカル", src: "assets/music/Hikaru Utada - First Love  The Netflix Series First Love 初恋.mp3" },
    { title: "愛結び – Novelbright", src: "assets/music/Novelbright - 愛結び [Official Music Video].mp3" },
    { title: "I LOVE YOU – クリスハート", src: "assets/music/クリスハート - I LOVE YOU.mp3" }
  ],
  playlists03: [
    { title: "Can't Help Falling In Love – Andrea Bocelli", src: "assets/music/Can't Help Falling In Love.mp3" },
    { title: "I'm Yours – Jason Mraz", src: "assets/music/Jason Mraz - I'm Yours (Lyrics).mp3" },
    { title: "Just The Way You Are – Bruno Mars", src: "assets/music/Bruno Mars - Just The Way You Are (Official Music Video).mp3" },
    { title: "Perfect – Ed Sheeran", src: "assets/music/Ed Sheeran - Perfect (Official Music Video).mp3" },
    { title: "Wherever you are – ONE OK ROCK", src: "assets/music/Wherever you are.mp3" }
  ],
  playlists04: [
    { title: "Không Điều Kiện – Cá Hồi Hoang", src: "assets/music/Cá Hồi Hoang - Không Điều Kiện.mp3" },
    { title: "Xúc Cảm Bộ Máy – Cá Hồi Hoang x Phùng Khánh Linh", src: "assets/music/Cá Hồi Hoang x Phùng Khánh Linh - Xúc Cảm Bộ Máy (Official Lyric Video).mp3" },
    { title: "Ngày Ấy Và Sau Này – Cá Hồi Hoang", src: "assets/music/Cá Hồi Hoang - Ngày Ấy Và Sau Này.mp3" },
    { title: "Một Ngày Mãi Mãi – TÙNG x TRANG", src: "assets/music/TÙNG x TRANG - Một Ngày Mãi Mãi.mp3" },
    { title: "Y6U – Rhymastic", src: "assets/music/Rhymastic - Y6U (Official Audio).mp3" },
    { title: "Cho mình em – BINZ x ĐEN", src: "assets/music/BINZ x ĐEN - CHO MÌNH EM (Studio Session).mp3" }
  ],
  playlists05: [
    { title: "Ngổn Ngang – Rhymastic", src: "assets/music/Rhymastic - Ngổn Ngang (Official Audio).mp3" },
    { title: "HUSH OF SUNSET – 10CM", src: "assets/music/[MV] 10CM - Hush of Sunset(노을).mp3" },
    { title: "What Am I – Why Don't We", src: "assets/music/Why Don't We - What Am I [Official Video].mp3" },
    { title: "Thinking Out Loud – Ed Sheeran", src: "assets/music/Vietsub  Thinking Out Loud - Ed Sheeran  Lyrics Video.mp3" },
    { title: "ALL MY LOVE – Coldplay", src: "assets/music/[Lyrics + Vietsub] ALL MY LOVE - Coldplay [RutaAAXJ51U].mp3" },
    { title: "Flashlight – Jessie J", src: "assets/music/Jessie J - Flashlight (from Pitch Perfect 2) (Official Video).mp3" },
    { title: "I Will Always Love You – Whitney Houston", src: "assets/music/Whitney Houston - I Will Always Love You (Official 4K Video).mp3" },
    { title: "Aloha – Cool", src: "assets/music/[MV Lyric] Aloha - Cool.mp3" },
    { title: "Love You With All My Heart – Crush", src: "assets/music/Vietsub  Lyrics  Crush  Love You With All My Heart '미안해 미워해 사랑해' (Queen of Tears OST Part.4).mp3" }
  ],
  playlists06: [
    { title: "Nothing's Going to Change My Love For You – Westlife", src: "assets/music/Westlife - Nothing's Going to Change My Love For You (Audio).mp3" },
    { title: "My love – Westlife", src: "assets/music/Westlife - My Love (Lyrics).mp3" }
  ]
};

let currentPlaylist = [];
let currentIndex = 0;
let isShuffle = false;
let isRepeat = false;
function updatePlayButton(isPlaying) {
  const btn = document.getElementById("playBtn");
  const icon = btn.querySelector("i");

  if (isPlaying) {
    icon.classList.replace("fa-play", "fa-pause");
    btn.classList.add("active");
  } else {
    icon.classList.replace("fa-pause", "fa-play");
    btn.classList.remove("active");
  }
}

/* đổi playlist */
function changePlaylist() {
  const key = document.getElementById("playlistSelect").value;
  if (!key) return;

  currentPlaylist = [...playlists[key]];
  currentIndex = 0;

  renderSongList();
  playSong(0);
}

/* render list */
function renderSongList() {
  const list = document.getElementById("songList");
  list.innerHTML = "";

  currentPlaylist.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerText = song.title;
    li.onclick = () => playSong(index);
    list.appendChild(li);
  });
}

/* play bài */
function playSong(index) {
  currentIndex = index;
  audio.src = currentPlaylist[index].src;

  audio.play().then(() => {
    updatePlayButton(true);
  });

  document.getElementById("nowPlaying").innerText =
    "🎧 Đang phát: " + currentPlaylist[index].title;

  document.getElementById("nowPlaying").style.animation = "none";
  void document.getElementById("nowPlaying").offsetWidth;
  document.getElementById("nowPlaying").style.animation = "fadeIn 0.4s ease";

  highlightSong();
}

/* highlight */
function highlightSong() {
  document.querySelectorAll("#songList li").forEach((li, i) => {
    li.classList.toggle("active", i === currentIndex);
  });
}

/* play / pause */
function togglePlay() {
  if (audio.paused) {
    audio.play();
    updatePlayButton(true);
  } else {
    audio.pause();
    updatePlayButton(false);
  }
}

/* next / prev */
function nextSong() {
  if (isShuffle) {
    currentIndex = Math.floor(Math.random() * currentPlaylist.length);
  } else {
    currentIndex = (currentIndex + 1) % currentPlaylist.length;
  }
  playSong(currentIndex);
}

function prevSong() {
  currentIndex =
    currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
  playSong(currentIndex);
}

/* shuffle */
function toggleShuffle(btn) {
  isShuffle = !isShuffle;
  btn.classList.toggle("active", isShuffle);
}



function toggleRepeat(btn) {
  isRepeat = !isRepeat;
  btn.classList.toggle("active", isRepeat);
}
audio.addEventListener("ended", () => {
  if (isRepeat) {

    playSong(currentIndex);
  } else {
  
    nextSong();
  }
});
 let i = 0;
let typingTimer = null;

const message = `Hơi zô tri nhưng Mai hãy đọc nhaaa

Mai nè, 

Có lẽ đây là lần đầu tiên Văn làm những điều như thế này, nên có lẽ Văn không biết nên bắt đầu từ đâu cho nó trọn vẹn và hoàn hảo cả. Chỉ biết rằng từ ngày đầu tiên về Long Thành, trái tim Văn đã bắt đầu rung động lúc nào hong hay. 

Trong khoản thời gian đó, suy nghĩ của Văn là lúc nào cũng muốn được thấy Mai, muốn gặp Mai, muốn ở bên và tìm hiểu Mai nhiều hơn. Ròiiiii dần dần, những cảm xúc ấy lớn lên thành mong muốn được bảo vệ, chăm sóc và quan tâm Mai nhiều hơn nữa.

Xin lũi nếu điều đó được cho là tham lam =)))

Chính vì vậy mà mỗi ngày trôi qua, Văn luôn tìm cho mình một lý do để được gần Mai hơn một chút. Những khoảng khắc bên cạnh Mai, dù chỉ là những điều rất đơn giản, cũng đủ khiến Văn cảm thấy vui và hạnh phúc.

Văn không dám nói trước tương lai sẽ thế nào, nhưng ở thời điểm hiện tại, Văn chỉ mong Mai hiểu rằng:

"Dù có chuyện gì xảy ra, Văn sẽ luôn ở đây, yêu Mai hết mình và làm hết khả năng để Mai luôn thật vui vẻ và thật hạnh phúc"

💫 Con nợ tên Văn, không giỏi văn cho lắm, nên bạn Mike bỏ qua nha =))))

💫 Nhưng con nợ lại rất giỏi… yêu chủ nợ thoiiiii =))))) 💖`;

function typeMessage() {
  const typedMessage = document.getElementById('typedMessage');
  if (i < message.length) {
    typedMessage.innerHTML += message.charAt(i);
    i++;
    typingTimer = setTimeout(typeMessage, 100);
  }
}

function showPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'flex';
  popup.style.animation = 'fadeIn 1s ease';

  clearTimeout(typingTimer);
  i = 0;
  document.getElementById('typedMessage').innerHTML = "";
  typeMessage();
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';

  clearTimeout(typingTimer);  
  i = 0;                      
  document.getElementById('typedMessage').innerHTML = "";
}




    
function showRatingMessage() {
    const value = document.getElementById("rating-select").value;

    const messages = {
      "Tuyệt": "🎀 Tuyệt tới mức Mai không biết phải nói gì nữa, chỉ muốn ôm! 🥺",
      "Rất đẹp": "🌷 Rất đẹp cảm ơn Văn =)))",
      "Đủ wow": "🌟 Đủ wow rồi đó, cảm ơn Văn nhèo =))))",
      "Không điểm chê": "💎 Không điểm chê thật hở 😏 Văn xúc động quá! =)))"
    };

    if (value) {
      Swal.fire({
        title: '💖 Cảm ơn Mai đã chọn💖',
        text: messages[value],
        icon: 'success',
        confirmButtonText: 'Hihi biết rùi nè 😊',
        confirmButtonColor: '#f48fb1',
        background: '#fff0f7',
        color: '#c94c9f'
      });
    }
  }
  /* ===== QUIZ MỞ THIỆP ===== */
function askQuestion() {
  Swal.fire({
    title: '💌 Đố Mai nha 💌',
    text: 'Đối với Văn, ngày đặc biệt nhất và ý nghĩa nhất là ngày bao nhiêu?',
    input: 'text',
    confirmButtonText: 'Trả lời 💖',
    confirmButtonColor: '#f48fb1',
    background: '#fff0f7',
    color: '#c94c9f',
    showCancelButton: true,
    cancelButtonText: 'Thôi để nghĩ lại 😆'
  }).then((result) => {
    if (!result.isConfirmed) return;

    const answer = result.value.trim().toLowerCase();

    const correctAnswers = [
      '06/09',
      '6-9',
      '06-09',
      '06-9',
      '6-09',
      '06/9',
      '6 tháng 9',
      '6/09',
      'ngày Văn gặp Mai',
      '0609',
      'ngày văn gặp mai'
    ];

    if (correctAnswers.includes(answer)) {
      Swal.fire({
        title: '🎉 Đúng rồi đó 🎉',
        text: 'Bạn Mai giỏi quá, mở thiệp nha 💕',
        icon: 'success',
        confirmButtonText: 'Mở thiệp nè 🥰',
        confirmButtonColor: '#f48fb1',
        background: '#fff0f7',
        color: '#c94c9f'
      }).then(() => {
        showPopup(); 
      });
    } else {
      Swal.fire({
        title: '😝 Sai rồi nha',
        html: `
          <p>Gợi ý nè 👉</p>
          <b>📅 Một ngày rất đặc biệt trong tháng 9…</b>
        `,
        icon: 'warning',
        confirmButtonText: 'Để trả lời lại 💭',
        confirmButtonColor: '#f48fb1',
        background: '#fff0f7',
        color: '#c94c9f'
      });
    }
  });
}
















