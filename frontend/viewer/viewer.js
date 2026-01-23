const API_BASE = "http://localhost:5000"; // dev phase only

const gameSelect = document.getElementById("gameSelect");
const loadBtn = document.getElementById("loadBtn");
const tableBody = document.getElementById("scores");

let refreshInterval;

// Populate dropdown with games dynamically
async function loadGames() {
  try {
    const res = await fetch(`${API_BASE}/api/scores`);
    const scores = await res.json();

    const games = Array.from(new Set(scores.map(s => s.game)));
    games.forEach(game => {
      const option = document.createElement("option");
      option.value = game;
      option.textContent = game;
      gameSelect.appendChild(option);
    });
  } catch {
    alert("Failed to load games.");
  }
}

// Load top scores for selected game or all games
async function loadScores() {
  const game = gameSelect.value;
  tableBody.innerHTML = "";

  try {
    let url = `${API_BASE}/api/scores?limit=50`; // fetch more to sort ourselves
    if (game) {
      url += `&game=${encodeURIComponent(game)}`;
    }

    const res = await fetch(url);
    const scores = await res.json();

    let sorted;
    if (game) {
      // Top 10 for this game
      sorted = scores.sort((a, b) => b.score - a.score).slice(0, 10);
    } else {
      // All games combined: sort by score descending, pick top 10
      sorted = scores.sort((a, b) => b.score - a.score).slice(0, 10);
    }

    sorted.forEach((s, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${s.player_name}</td>
        <td>${s.game}</td>
        <td>${s.score}</td>
        <td>${new Date(s.created_at).toLocaleString()}</td>
      `;
      tableBody.appendChild(row);
    });

  } catch {
    alert("Failed to load scores.");
  }
}

// Start live updating
function startAutoRefresh() {
  if (refreshInterval) clearInterval(refreshInterval);
  refreshInterval = setInterval(loadScores, 5000); // every 5 seconds
}

// Event listeners
loadBtn.addEventListener("click", () => {
  loadScores();
  startAutoRefresh();
});

// Init
loadGames();
