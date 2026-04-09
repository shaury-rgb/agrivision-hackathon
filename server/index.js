import cors from 'cors';
import express from 'express';
import {
  cropRecommendations,
  diseaseDatabase,
  marketPrices,
  soilData,
  weatherData,
} from './data.js';
import { readStore, writeStore } from './store.js';

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

app.get('/api/profile/:mobile', async (req, res) => {
  const mobile = (req.params.mobile || '').toString();
  const db = await readStore();
  const user = db.users.find((item) => item.mobile === mobile);
  const field = user ? db.fields.find((item) => item.userId === user.id) : null;

  if (!user) {
    res.status(404).json({ message: 'Profile not found' });
    return;
  }

  res.json({ user, field });
});

app.post('/api/profile', async (req, res) => {
  const payload = req.body || {};
  const mobile = (payload.mobile || '').toString().trim();

  if (!mobile) {
    res.status(400).json({ message: 'mobile is required' });
    return;
  }

  const db = await readStore();
  const existing = db.users.find((item) => item.mobile === mobile);

  const userId = existing?.id || `farmer-${Date.now()}`;
  const user = {
    id: userId,
    name: payload.name || existing?.name || 'Farmer',
    mobile,
    region: payload.region || existing?.region || 'Unknown',
    farmSizeAcres: Number(payload.farmSizeAcres ?? existing?.farmSizeAcres ?? 1),
    preferredLanguage: payload.preferredLanguage || existing?.preferredLanguage || 'English',
    updatedAt: new Date().toISOString(),
  };

  const field = {
    id: existing ? db.fields.find((item) => item.userId === userId)?.id || `field-${Date.now()}` : `field-${Date.now()}`,
    userId,
    soilType: payload.soilType || 'Loamy',
    irrigationType: payload.irrigationType || 'Drip',
    currentCrop: payload.currentCrop || 'Rice',
    updatedAt: new Date().toISOString(),
  };

  const nextUsers = db.users.filter((item) => item.mobile !== mobile);
  nextUsers.push(user);

  const nextFields = db.fields.filter((item) => item.userId !== userId);
  nextFields.push(field);

  await writeStore({
    ...db,
    users: nextUsers,
    fields: nextFields,
  });

  res.json({ message: 'Profile saved', user, field });
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

app.post('/api/disease/analyze', async (req, res) => {
  const crop = (req.body?.crop || '').toString().trim().toLowerCase();

  const matched = diseaseDatabase.find((item) => item.crop.toLowerCase().includes(crop));
  const disease = matched ?? diseaseDatabase[0];

  const response = {
    requestId: `scan-${Date.now()}`,
    input: {
      crop: req.body?.crop || 'Unknown',
      imageName: req.body?.imageName || 'unknown.jpg',
    },
    diagnosis: disease,
  };

  const db = await readStore();
  const scanItem = {
    id: response.requestId,
    mobile: req.body?.mobile || '9999999999',
    crop: response.input.crop,
    imageName: response.input.imageName,
    diagnosis: disease.name,
    confidence: disease.confidence,
    severity: disease.severity,
    createdAt: new Date().toISOString(),
  };

  await writeStore({
    ...db,
    scans: [scanItem, ...db.scans].slice(0, 50),
  });

  res.json(response);
});

app.get('/api/disease/history/:mobile', async (req, res) => {
  const mobile = (req.params.mobile || '').toString();
  const db = await readStore();
  const rows = db.scans.filter((item) => item.mobile === mobile);
  res.json(rows);
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

app.post('/api/planner/season-plan', async (req, res) => {
  const payload = req.body || {};
  const acres = Number(payload.farmSizeAcres ?? 2);
  const crop = (payload.crop || 'Rice').toString();
  const budgetPerAcre = crop.toLowerCase().includes('rice') ? 18000 : 14000;
  const estimatedRevenuePerAcre = crop.toLowerCase().includes('rice') ? 34000 : 27000;

  const plan = {
    id: `plan-${Date.now()}`,
    mobile: payload.mobile || '9999999999',
    crop,
    farmSizeAcres: acres,
    estimatedCost: acres * budgetPerAcre,
    estimatedRevenue: acres * estimatedRevenuePerAcre,
    activities: [
      'Week 1: Soil prep and nutrient balancing',
      'Week 2: Seed treatment and sowing',
      'Week 3-6: Irrigation and pest monitoring',
      'Week 7+: Market tracking and harvest planning',
    ],
    createdAt: new Date().toISOString(),
  };

  const db = await readStore();
  await writeStore({
    ...db,
    plans: [plan, ...db.plans].slice(0, 50),
  });

  res.json(plan);
});

app.get('/api/dashboard/summary/:mobile', async (req, res) => {
  const mobile = (req.params.mobile || '').toString();
  const db = await readStore();

  const scans = db.scans.filter((item) => item.mobile === mobile);
  const plans = db.plans.filter((item) => item.mobile === mobile);

  res.json({
    totalScans: scans.length,
    severeAlerts: scans.filter((item) => ['High', 'Critical'].includes(item.severity)).length,
    totalPlans: plans.length,
    lastPlan: plans[0] || null,
  });
});

app.listen(port, () => {
  console.log(`AgriVision API listening on http://localhost:${port}`);
});
