# AI Smart Contract Auditor

A full-stack web application that analyzes Solidity smart contract source code, detects common risky patterns, and generates a deterministic audit result with a risk score.

The project demonstrates integration between a React frontend, a Node.js backend, and Ethereum-compatible tooling.

---

## Overview

Smart contracts are immutable once deployed, making pre-deployment analysis critical.  
This project provides a lightweight static analysis tool that helps developers quickly identify potentially unsafe patterns in Solidity code before deployment.

---

## Features

- Static analysis of Solidity source code  
- Detection of common risky patterns:
  - Low-level calls (`.call`)
  - `tx.origin` usage  
- Deterministic contract hashing using `keccak256`  
- Numerical risk score generation  
- Simple web interface for analysis  
- Modular backend architecture for future extensions  

---

## Project Structure
```
ai-auditor/
├── frontend/ # React + Vite frontend
├── backend/ # Node.js + Express backend
├── hardhat/ # Solidity contracts and Hardhat setup
├── README.md
└── .gitignore
```

---

## Tech Stack

### Frontend
- React
- Vite
- Axios

### Backend
- Node.js
- Express
- ethers.js (v6)

### Smart Contracts
- Solidity
- Hardhat

---

## How It Works

1. User inputs Solidity source code in the frontend  
2. Frontend sends the source code to the backend API  
3. Backend:
   - Analyzes the source code
   - Detects predefined risky patterns
   - Generates a cryptographic hash
   - Calculates a risk score  
4. The audit result is returned and displayed in the UI  

---

## Example Response

```json
{
  "contractHash": "0x617d8050d3bf5f283d036d38e81fe4d1a24ae87a9ab3b0695d7bcfe944395fc2",
  "summary": "Low-level call detected (MEDIUM)",
  "riskScore": 40
}
```
---

## Backend Setup

```cd backend
npm install
node index.js
```
Backend runs at:

```
http://localhost:3001
```
---

## Frontend Setup
```cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```
---

## Notes

This project uses rule-based static analysis for demonstration purposes.
The backend is structured to allow easy integration of more advanced analysis techniques.
Sensitive files such as .env are excluded using .gitignore.

---

## License

This project is provided for learning and demonstration purposes.

---

## Author

Adnr7
```
GitHub: https://github.com/Adnr7
```
---



