require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

// ---------- BASIC HEALTH CHECK ----------
app.get("/", (req, res) => {
  res.send("AI Auditor backend running");
});

// ---------- SIMPLE AUDIT LOGIC ----------
function analyze(source) {
  let score = 20;
  let issues = [];

  if (source.includes("tx.origin")) {
    score += 30;
    issues.push("Use of tx.origin (HIGH)");
  }

  if (source.includes(".call")) {
    score += 20;
    issues.push("Low-level call detected (MEDIUM)");
  }

  return {
    summary: issues.join(", ") || "No major issues detected",
    riskScore: score
  };
}

// ---------- ANALYZE ENDPOINT ----------
app.post("/analyze", (req, res) => {
  try {
    const { source } = req.body;

    if (!source) {
      return res.status(400).json({ error: "No source provided" });
    }

    const hash = ethers.keccak256(
      ethers.toUtf8Bytes(source)
    );

    const result = analyze(source);

    res.json({
      contractHash: hash,
      summary: result.summary,
      riskScore: result.riskScore
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------- START SERVER ----------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
