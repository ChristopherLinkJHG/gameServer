const API_BASE = "http://localhost:5000";

const form = document.getElementById("scoreForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    playerName: document.getElementById("player").value,
    game: document.getElementById("game").value,
    score: Number(document.getElementById("score").value),
  };

  try {
    const res = await fetch(`${API_BASE}/api/scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (json.success) {
      status.textContent = "Score submitted!";
      form.reset();
    } else {
      status.textContent = "Error submitting score.";
    }
  } catch (err) {
    status.textContent = "Server unreachable.";
  }
});
