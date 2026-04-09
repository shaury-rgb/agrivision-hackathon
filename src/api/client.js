const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function parseResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export async function fetchMarketPrices(cropQuery = '') {
  const query = cropQuery ? `?crop=${encodeURIComponent(cropQuery)}` : '';
  const response = await fetch(`${API_BASE}/market-prices${query}`);
  return parseResponse(response);
}

export async function fetchWeather() {
  const response = await fetch(`${API_BASE}/weather`);
  return parseResponse(response);
}

export async function fetchSoil() {
  const response = await fetch(`${API_BASE}/soil`);
  return parseResponse(response);
}

export async function fetchCropRecommendations() {
  const response = await fetch(`${API_BASE}/crops/recommendations`);
  return parseResponse(response);
}

export async function fetchDashboardSummary(mobile) {
  const response = await fetch(`${API_BASE}/dashboard/summary/${encodeURIComponent(mobile)}`);
  return parseResponse(response);
}

export async function askAssistant(payload) {
  const response = await fetch(`${API_BASE}/assistant/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function analyzeDisease(payload) {
  const response = await fetch(`${API_BASE}/disease/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function fetchIrrigationPlan(payload) {
  const response = await fetch(`${API_BASE}/wow/irrigation-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function demoLogin(payload) {
  const response = await fetch(`${API_BASE}/auth/demo-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function saveProfile(payload) {
  const response = await fetch(`${API_BASE}/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function fetchProfile(mobile) {
  const response = await fetch(`${API_BASE}/profile/${encodeURIComponent(mobile)}`);
  return parseResponse(response);
}

export async function fetchDiseaseHistory(mobile) {
  const response = await fetch(`${API_BASE}/disease/history/${encodeURIComponent(mobile)}`);
  return parseResponse(response);
}

export async function createSeasonPlan(payload) {
  const response = await fetch(`${API_BASE}/planner/season-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}
