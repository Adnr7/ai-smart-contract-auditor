import { useState } from "react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3001/analyze", {
        source: code
      });
      setResult(res.data);
    } catch (err) {
      alert("Backend not reachable. Is it running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="root">
      <header className="center" aria-labelledby="app-title">
        <h1 id="app-title" className="pulse">AI Smart Contract Auditor</h1>
        <p className="read-the-docs">Paste your Solidity contract below and analyze security risks.</p>
      </header>

      <main>
        <div className="card" role="region" aria-label="Input card">
          <label className="card-title" htmlFor="source">Source Code</label>
          <textarea
            id="source"
            rows="14"
            className="terminal"
            placeholder="Paste Solidity code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button
              className="btn btn-ghost"
              onClick={() => { setCode(''); setResult(null); }}
              type="button"
            >
              Reset
            </button>

            <button
              className="btn btn-primary"
              onClick={analyze}
              disabled={loading}
              type="button"
            >
              {loading ? "Analyzing..." : "Analyze Contract"}
            </button>
          </div>
        </div>

        {result && (
          <div className="card" style={{ marginTop: '1rem' }} role="region" aria-label="Audit results">
            <h3 className="card-title">Audit Result</h3>
            <pre className="terminal" aria-live="polite">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="stack" aria-hidden="true">
          <span className="chip">AI</span>
          <span className="chip">Security</span>
          <span className="chip">Smart Contracts</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
