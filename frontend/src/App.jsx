import { useState, useEffect } from "react";

const YEARS = [
  1930,1934,1938,1950,1954,1958,1962,1966,1970,1974,
  1978,1982,1986,1990,1994,1998,2002,2006,2010,2014,2018,2022
];

const FLAG_EMOJIS = {
  'Uruguay': '🇺🇾', 'Italy': '🇮🇹', 'West Germany': '🇩🇪', 'Germany': '🇩🇪',
  'Brazil': '🇧🇷', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Argentina': '🇦🇷', 'France': '🇫🇷',
  'Spain': '🇪🇸',
};

export default function App() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animateCard, setAnimateCard] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    if (!selectedYear) return;
    setLoading(true);
    setError(null);
    setAnimateCard(false);
    fetch(`${API_URL}/api/winner/${selectedYear}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error);
        setData(d);
        setTimeout(() => setAnimateCard(true), 50);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [selectedYear]);

  const flag = data ? (FLAG_EMOJIS[data.winner] || '🏆') : '';

  return (
    <div className="app">
      <header>
        <div className="trophy">⚽</div>
        <h1>World Cup<br /><span>Winners</span></h1>
        <p className="subtitle" color="red">Select a tournament year to reveal the champion</p>
      </header>

      <div className="year-grid">
        {YEARS.map(year => (
          <button
            key={year}
            className={`year-btn ${selectedYear === year ? 'active' : ''}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="result-area">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        )}
        {error && <div className="error-card">⚠️ {error}</div>}
        {data && !loading && (
          <div className={`winner-card ${animateCard ? 'visible' : ''}`}>
            <div className="year-badge">{data.year}</div>
            <div className="flag-large">{flag}</div>
            <div className="winner-label">WORLD CHAMPION</div>
            <div className="winner-name">{data.winner}</div>
            <div className="details">
              <div className="detail-item">
                <span className="detail-label">Runner-up</span>
                <span className="detail-value">{FLAG_EMOJIS[data.runnerUp] || '🏅'} {data.runnerUp}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Host</span>
                <span className="detail-value">📍 {data.host}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Goals scored</span>
                <span className="detail-value">⚽ {data.goals}</span>
              </div>
            </div>
          </div>
        )}
        {!selectedYear && !loading && (
          <div className="placeholder">
            <span>👆 Select a year above</span>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0f1e;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: #e8eaf0;
        }

        .app {
          max-width: 780px;
          margin: 0 auto;
          padding: 3rem 1.5rem 4rem;
        }

        header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .trophy {
          font-size: 3.5rem;
          margin-bottom: 0.75rem;
          filter: drop-shadow(0 0 24px rgba(255,215,0,0.5));
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.8rem, 8vw, 5rem);
          line-height: 0.9;
          letter-spacing: 2px;
          color: #fff;
          margin-bottom: 0.5rem;
        }

        h1 span {
          background: linear-gradient(135deg, #ffd700, #ff6b35);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          color: #7880a0;
          font-size: 0.95rem;
          margin-top: 0.75rem;
          letter-spacing: 0.5px;
        }

        .year-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
          gap: 0.6rem;
          margin-bottom: 2.5rem;
        }

        .year-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #a0a8c0;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.65rem 0.5rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.5px;
        }

        .year-btn:hover {
          background: rgba(255,215,0,0.1);
          border-color: rgba(255,215,0,0.4);
          color: #ffd700;
          transform: translateY(-2px);
        }

        .year-btn.active {
          background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,107,53,0.2));
          border-color: #ffd700;
          color: #ffd700;
          box-shadow: 0 0 20px rgba(255,215,0,0.2);
          transform: translateY(-2px);
        }

        .result-area {
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placeholder {
          color: #3a4060;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
        }

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: #7880a0;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255,215,0,0.15);
          border-top-color: #ffd700;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .error-card {
          background: rgba(255,59,48,0.1);
          border: 1px solid rgba(255,59,48,0.3);
          color: #ff6b6b;
          padding: 1.5rem 2rem;
          border-radius: 16px;
          text-align: center;
        }

        .winner-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,215,0,0.2);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          text-align: center;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
          opacity: 0;
          transform: translateY(20px) scale(0.97);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .winner-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .year-badge {
          display: inline-block;
          background: linear-gradient(135deg, #ffd700, #ff6b35);
          color: #0a0f1e;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          letter-spacing: 3px;
          padding: 0.3rem 1rem;
          border-radius: 100px;
          margin-bottom: 1.5rem;
        }

        .flag-large {
          font-size: 5rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.3));
        }

        .winner-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 4px;
          color: #ffd700;
          opacity: 0.7;
          margin-bottom: 0.4rem;
        }

        .winner-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 8vw, 3.5rem);
          letter-spacing: 2px;
          color: #fff;
          margin-bottom: 2rem;
          text-shadow: 0 0 40px rgba(255,215,0,0.3);
        }

        .details {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 1.5rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.5rem;
        }

        .detail-label {
          font-size: 0.8rem;
          color: #5a6080;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .detail-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: #c0c8e0;
        }

        @media (max-width: 480px) {
          .year-grid { grid-template-columns: repeat(4, 1fr); }
          .winner-card { padding: 2rem 1.25rem; }
        }
      `}</style>
    </div>
  );
}
