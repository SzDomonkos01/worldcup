const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const worldCupWinners = {
  1930: { winner: 'Uruguay', runnerUp: 'Argentina', host: 'Uruguay', goals: 70 },
  1934: { winner: 'Italy', runnerUp: 'Czechoslovakia', host: 'Italy', goals: 70 },
  1938: { winner: 'Italy', runnerUp: 'Hungary', host: 'France', goals: 84 },
  1950: { winner: 'Uruguay', runnerUp: 'Brazil', host: 'Brazil', goals: 88 },
  1954: { winner: 'West Germany', runnerUp: 'Hungary', host: 'Switzerland', goals: 140 },
  1958: { winner: 'Brazil', runnerUp: 'Sweden', host: 'Sweden', goals: 126 },
  1962: { winner: 'Brazil', runnerUp: 'Czechoslovakia', host: 'Chile', goals: 89 },
  1966: { winner: 'England', runnerUp: 'West Germany', host: 'England', goals: 89 },
  1970: { winner: 'Brazil', runnerUp: 'Italy', host: 'Mexico', goals: 95 },
  1974: { winner: 'West Germany', runnerUp: 'Netherlands', host: 'West Germany', goals: 97 },
  1978: { winner: 'Argentina', runnerUp: 'Netherlands', host: 'Argentina', goals: 102 },
  1982: { winner: 'Italy', runnerUp: 'West Germany', host: 'Spain', goals: 146 },
  1986: { winner: 'Argentina', runnerUp: 'West Germany', host: 'Mexico', goals: 132 },
  1990: { winner: 'West Germany', runnerUp: 'Argentina', host: 'Italy', goals: 115 },
  1994: { winner: 'Brazil', runnerUp: 'Italy', host: 'USA', goals: 141 },
  1998: { winner: 'France', runnerUp: 'Brazil', host: 'France', goals: 171 },
  2002: { winner: 'Brazil', runnerUp: 'Germany', host: 'Japan/South Korea', goals: 161 },
  2006: { winner: 'Italy', runnerUp: 'France', host: 'Germany', goals: 147 },
  2010: { winner: 'Spain', runnerUp: 'Netherlands', host: 'South Africa', goals: 145 },
  2014: { winner: 'Germany', runnerUp: 'Argentina', host: 'Brazil', goals: 171 },
  2018: { winner: 'France', runnerUp: 'Croatia', host: 'Russia', goals: 169 },
  2022: { winner: 'Argentina', runnerUp: 'France', host: 'Qatar', goals: 172 },
};

app.get('/api/winner/:year', (req, res) => {
  const year = parseInt(req.params.year);
  const data = worldCupWinners[year];
  if (!data) {
    return res.status(404).json({ error: `No World Cup data found for ${year}` });
  }
  res.json({ year, ...data });
});

app.get('/api/years', (req, res) => {
  const years = Object.keys(worldCupWinners).map(Number).sort((a, b) => a - b);
  res.json({ years });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
