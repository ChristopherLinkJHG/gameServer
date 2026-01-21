const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS middleware (THIS IS ENOUGH)
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

app.post("/api", (req, res) => {
  console.log("POST /api received:", req.body);

  res.json({
    status: "ok",
    received: req.body
  });
});

app.listen(5000, () => {
  console.log("✅ API running at http://localhost:5000");
});
