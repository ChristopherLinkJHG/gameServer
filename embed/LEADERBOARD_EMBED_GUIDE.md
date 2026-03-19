# Leaderboard Embed Anleitung

Diese Anleitung zeigt dir, wie du das Leaderboard in eine andere Website einbettest und Scores aus deinem Spiel sendest.

## 1) Dateien in dein Zielprojekt kopieren

Kopiere diese Datei in dein Zielprojekt:
- `leaderboard-embed.js`

Optional:
- Du kannst auch den Inhalt aus `leaderboard-embed.html` als Snippet verwenden.

## 2) HTML-Snippet in deine Zielseite einfügen

Füge den Inhalt an der Stelle ein, wo das Leaderboard angezeigt werden soll (z. B. in `index.html`):

<p id="gs-status" role="status" aria-live="polite"></p>

<section
  id="gs-leaderboard"
  data-api-base="http://localhost:5000"
  data-game="my-game"
  data-limit="10"
  data-refresh-ms="5000"
>
  <h2>Leaderboard</h2>
  <ol id="gs-leaderboard-list"></ol>
</section>

<script src="leaderboard-embed.js" defer></script>

Wichtig:
- `src="leaderboard-embed.js"` muss zu deinem tatsächlichen Dateipfad passen.
- Wenn die Datei in einem Unterordner liegt, passe den Pfad an (z. B. `./scripts/leaderboard-embed.js`).

## 3) Konfiguration über data-Attribute

Am `<section id="gs-leaderboard">` kannst du diese Werte ändern:
- `data-api-base`: URL deines Backends
- `data-game`: Spielname für Filter und Submit
- `data-limit`: Anzahl der Einträge
- `data-refresh-ms`: Aktualisierungsintervall in Millisekunden

Beispiel Produktion:

<section
  id="gs-leaderboard"
  data-api-base="https://dein-backend.example.com"
  data-game="runner"
  data-limit="20"
  data-refresh-ms="3000"
>

## 4) Score aus deinem Spiel senden

Die JS-Datei stellt global diese Funktion bereit:

- `window.submitGameScore(playerName, score, game)`

Beispiel:

await window.submitGameScore("Chris", 12345, "my-game");

Parameter:
- `playerName` (string): Name des Spielers
- `score` (number): Punkte
- `game` (string, optional): Spielname; wenn leer, wird `data-game` verwendet

## 5) Verhalten

- Das Leaderboard wird beim Laden der Seite sofort geladen.
- Das Leaderboard aktualisiert sich automatisch im Intervall von `data-refresh-ms`.
- Nach erfolgreichem Submit wird das Leaderboard direkt neu geladen.
- Status- und Fehlermeldungen erscheinen in `#gs-status`.

## 6) Backend-Anforderung

Die Einbettung erwartet diese API-Endpunkte:
- `POST /api/scores` mit JSON `{ playerName, game, score }`
- `GET /api/scores?game=<name>&limit=<n>`

Wenn nichts geladen wird, prüfe zuerst:
- Stimmt `data-api-base`?
- Ist CORS für deine Domain erlaubt?
- Ist der JS-Dateipfad im `<script>` korrekt?
