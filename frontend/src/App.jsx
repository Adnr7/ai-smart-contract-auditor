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
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h1>AI Smart Contract Auditor</h1>
      <p>Paste your Solidity contract below and analyze security risks.</p>

      <textarea
        rows="14"
        style={{ width: "100%", fontFamily: "monospace" }}
        placeholder="Paste Solidity code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br /><br />

      <button onClick={analyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Contract"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Audit Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
