import cors from 'cors';
import express from 'express';
import {
  cropRecommendations,
  diseaseDatabase,
  marketPrices,
  soilData,
  weatherData,
} from './data.js';

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'AgriVision API', timestamp: new Date().toISOString() });
});

app.post('/api/auth/demo-login', (req, res) => {
  const { mobile = '9999999999' } = req.body || {};

  res.json({
    token: 'demo-token-agrivision',
    user: {
      id: 'farmer-001',
      name: 'Demo Farmer',
      mobile,
      region: 'Pune',
    },
  });
});

app.get('/api/weather', (_req, res) => {
  res.json(weatherData);
});

app.get('/api/soil', (_req, res) => {
  res.json(soilData);
});

app.get('/api/crops/recommendations', (_req, res) => {
  res.json(cropRecommendations);
});

app.get('/api/market-prices', (req, res) => {
  const query = (req.query.crop || '').toString().trim().toLowerCase();

  if (!query) {
    res.json(marketPrices);
    return;
  }

  const filtered = marketPrices.filter((item) => item.crop.toLowerCase().includes(query));
  res.json(filtered);
});

app.post('/api/disease/analyze', (req, res) => {
  const crop = (req.body?.crop || '').toString().trim().toLowerCase();

  const matched = diseaseDatabase.find((item) => item.crop.toLowerCase().includes(crop));
  const disease = matched ?? diseaseDatabase[0];

  res.json({
    requestId: `scan-${Date.now()}`,
    input: {
      crop: req.body?.crop || 'Unknown',
      imageName: req.body?.imageName || 'unknown.jpg',
    },
    diagnosis: disease,
  });
});

app.post('/api/wow/irrigation-plan', (req, res) => {
  const waterStress = Number(req.body?.waterStress ?? 40);
  const rainProbability = Number(req.body?.rainProbability ?? 30);

  const litersPerAcre = Math.max(1800, 3000 - rainProbability * 12 + waterStress * 9);
  const needIrrigation = waterStress > 55 && rainProbability < 45;
  const dieselSaved = needIrrigation ? 16 : 7;
  const yieldUplift = Math.max(3, Math.round((waterStress + (100 - rainProbability)) / 18));

  res.json({
    decision: needIrrigation ? 'Irrigate tonight' : 'Delay irrigation and monitor for 24h',
    litersPerAcre,
    dieselSaved,
    yieldUplift,
  });
});

app.listen(port, () => {
  console.log(`AgriVision API listening on http://localhost:${port}`);
});
