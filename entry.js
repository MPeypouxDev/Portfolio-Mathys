let musicState = "stopped";
let currentPlaylistData = null;

document.addEventListener("DOMContentLoaded", function () {
  console.log("Script d'entrée chargé");
  initMusicButton();
  checkSavedMusic();
  initRain();
});

function checkSavedMusic() {
  const savedMusicState = localStorage.getItem("musicState");
  const savedMusicData = localStorage.getItem("musicData");

  if (savedMusicState && savedMusicData && savedMusicState !== "stopped") {
    try {
      currentPlaylistData = JSON.parse(savedMusicData);
      musicState = savedMusicState;

      const musicButton = document.getElementById("musicButton");
      if (musicState === "minimized") {
        musicButton.innerHTML = "🎧";
        musicButton.style.background =
          "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)";
        musicButton.style.animation = "pulse 2s infinite";
        musicButton.title = "Musique en cours - Cliquer pour arrêter";
        showNotification("🎵 Musique restaurée", "success");
      }
    } catch (error) {
      console.error("Erreur restauration musique:", error);
      clearMusicStorage();
    }
  }
}

// CORRECTION: Nom de fonction (était savedMusicState au lieu de saveMusicState)
function saveMusicState() {
  if (musicState !== "stopped" && currentPlaylistData) {
    localStorage.setItem("musicState", musicState);
    localStorage.setItem("musicData", JSON.stringify(currentPlaylistData));
    localStorage.setItem("musicTimestamp", Date.now().toString());
    console.log("État musique sauvegardé:", musicState);
  }
}

function clearMusicStorage() {
  localStorage.removeItem("musicState");
  localStorage.removeItem("musicData");
  localStorage.removeItem("musicTimestamp");
  console.log("Stockage musique nettoyé");
}

function initMusicButton() {
  const musicButton = document.getElementById("musicButton");
  console.log("Bouton musique trouvé:", musicButton);

  if (!musicButton) {
    console.error("Bouton musique non trouvé!");
    return;
  }

  const playlistData = {
    url: "https://www.youtube.com/watch?v=sF80I-TQiW0&list=PLnYQHW31BxfUXA6rD3b6zqbhXJHSKxrgQ",
    title: "Ma Playlist de Dev 🎧",
    description: "Musique pour coder et se concentrer",
  };

  currentPlaylistData = playlistData;

  musicButton.addEventListener("click", function () {

    this.style.transform = "scale(0.9)";
    setTimeout(() => {
      this.style.transform = "scale(1.1)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 100);
    }, 150);

    if (musicState === "stopped") {
      showMusicModal(playlistData);
      musicState = "playing";
      saveMusicState();
    } else if (musicState === "playing") {
      const existingModal = document.querySelector("#musicModal");
      if (existingModal && existingModal.style.display !== "none") {
        minimizePlayer();
      }
    } else if (musicState === "minimized") {
      stopMusic();
    }
  });
}

function showMusicModal(playlistData) {

  const existingModal = document.querySelector("#musicModal");
  if (existingModal) {
    document.body.removeChild(existingModal);
  }

  const playlistId = extractPlaylistId(playlistData.url);

  const modal = document.createElement("div");
  modal.id = "musicModal";
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
    `;

  modal.innerHTML = `
        <div style="
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 1.5rem;
            max-width: 800px;
            width: 95%;
            max-height: 85vh;
            text-align: center;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-shrink: 0;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="font-size: 1.5rem;">🎵</span>
                    <h3 style="color: white; margin: 0;">${
                      playlistData.title
                    }</h3>
                </div>
                <button id="closeMusicPlayer" style="
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 8px;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                ">✕</button>
            </div>
            
            <div style="
                background: #000;
                border-radius: 12px;
                overflow: hidden;
                margin-bottom: 1rem;
                flex-shrink: 0;
            ">
                ${
                  playlistId
                    ? `<iframe 
                        width="100%" 
                        height="350" 
                        src="https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&loop=1" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen
                        style="border-radius: 12px;">
                    </iframe>`
                    : `<div style="height: 350px; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
                        <p>URL de playlist non valide</p>
                    </div>`
                }
            </div>
            
            <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; flex-shrink: 0;">
                <button id="minimizePlayer" style="
                    padding: 0.75rem 1.25rem;
                    background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    color: white;
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                ">📐 Réduire</button>
                
                <button id="openInYoutube" style="
                    padding: 0.75rem 1.25rem;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    color: #e2e8f0;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                ">🔗 YouTube</button>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.style.opacity = "1";
    modal.querySelector("div").style.transform = "scale(1)";
  }, 10);

  const closeModal = () => {
    modal.style.opacity = "0";
    modal.querySelector("div").style.transform = "scale(0.8)";
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
      stopMusic();
    }, 300);
  };

  modal
    .querySelector("#closeMusicPlayer")
    .addEventListener("click", closeModal);
  modal
    .querySelector("#minimizePlayer")
    .addEventListener("click", minimizePlayer);
  modal.querySelector("#openInYoutube").addEventListener("click", () => {
    window.open(playlistData.url, "_blank");
    showNotification("🔗 Ouvert sur YouTube", "info");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) minimizePlayer();
  });
}

function stopMusic() {
  console.log("Arrêt de la musique");

  const existingModal = document.querySelector("#musicModal");
  if (existingModal) {
    document.body.removeChild(existingModal);
  }

  const musicButton = document.querySelector("#musicButton");
  if (musicButton) {
    musicButton.innerHTML = "🎵";
    musicButton.style.background = "rgba(255, 255, 255, 0.1)";
    musicButton.style.animation = "none";
    musicButton.title = "Écouter de la musique";
  }

  musicState = "stopped";
  clearMusicStorage();
  showNotification("🔇 Musique arrêtée", "info");
}

function minimizePlayer() {
  console.log("Minimisation du lecteur");

  const modal = document.querySelector("#musicModal");
  if (modal) {
    modal.style.opacity = "0";
    modal.querySelector("div").style.transform = "scale(0.8)";
    setTimeout(() => {
      modal.style.display = "none";
      const musicButton = document.querySelector("#musicButton");
      if (musicButton) {
        musicButton.innerHTML = "🎧";
        // CORRECTION: Syntaxe CSS correcte
        musicButton.style.background =
          "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)";
        musicButton.style.animation = "pulse 2s infinite";
        musicButton.title = "Musique en cours - Cliquer pour arrêter";
      }

      musicState = "minimized";
      saveMusicState(); // CORRECTION: Appel correct de la fonction
      showNotification("🎵 Musique en arrière-plan", "info");
    }, 300);
  }
}

function extractPlaylistId(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("list");
  } catch (error) {
    console.error("URL playlist invalide:", error);
    return null;
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 30px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        color: white;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
    `;

  if (type === "success") {
    notification.style.borderLeft = "4px solid #10b981";
  } else if (type === "error") {
    notification.style.borderLeft = "4px solid #ec4899";
  } else {
    notification.style.borderLeft = "4px solid #06b6d4";
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Variables pour l'effet code
let rainOn = true;
let rainTimer;

// Lignes de code à afficher
const codeSnippets = [
  'console.log("Hello World");',
  "function createApp() {",
  "const data = await fetch();",
  "return response.json();",
  "if (condition === true) {",
  "for (let i = 0; i < 10; i++) {",
  "const element = document.querySelector();",
  'addEventListener("click", handler);',
  "npm install react",
  'git commit -m "feat: add feature"',
  "background: linear-gradient();",
  "display: flex; align-items: center;",
  "const [state, setState] = useState();",
  "useEffect(() => {}, []);",
  "export default function App() {",
  'import React from "react";',
  'let musicState = "stopped";',
  "setTimeout(() => {}, 1000);",
  "margin: 0; padding: 0;",
  "position: absolute; top: 0;",
  "border-radius: 50%; opacity: 0.8;",
  "transition: all 0.3s ease;",
  "z-index: 1000; cursor: pointer;",
  "backdrop-filter: blur(20px);",
  "transform: translateY(-50%);",
];

function initRain() {
  // Démarrer l'effet code
  startRain();

  // Ajouter l'événement au bouton de contrôle
  const rainToggle = document.getElementById("rainToggle");
  if (rainToggle) {
    rainToggle.textContent = "💻"; // Changer l'icône

    rainToggle.addEventListener("click", function () {
      if (rainOn) {
        stopRain();
        this.style.opacity = "0.5";
        this.textContent = "💻 OFF";
      } else {
        startRain();
        this.style.opacity = "1";
        this.textContent = "💻 ON";
      }
      rainOn = !rainOn;
    });
  }
}

function startRain() {
  rainTimer = setInterval(function () {
    createCodeLine();
  }, 200);
}

function stopRain() {
  clearInterval(rainTimer);
  const container = document.getElementById("rainContainer");
  if (container) {
    container.innerHTML = "";
  }
}

function createCodeLine() {
  const container = document.getElementById("rainContainer");
  if (!container) return;

  const codeLine = document.createElement("div");
  codeLine.className = "codeline";

  // Choisir une ligne de code aléatoire
  const randomCode =
    codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  codeLine.textContent = randomCode;

  // Position horizontale aléatoire
  codeLine.style.left = Math.random() * (window.innerWidth - 200) + "px";

  // Durée d'animation aléatoire
  codeLine.style.animationDuration = Math.random() * 5 + 3 + "s";
  codeLine.style.top = "-50px";

  container.appendChild(codeLine);

  setTimeout(function () {
    if (container.contains(codeLine)) {
      container.removeChild(codeLine);
    }
  }, 10000);
}
