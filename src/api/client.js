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
