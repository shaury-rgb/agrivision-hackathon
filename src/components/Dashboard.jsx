import { useEffect, useMemo, useState } from 'react';
import { fetchIrrigationPlan } from '../api/client';
import {
  fetchWeather,
  fetchSoil,
  fetchCropRecommendations,
  fetchDashboardSummary,
} from '../api/client';
import { weatherData, cropRecommendations, dashboardStats, soilData } from '../data/mockData';

function StatCard({ stat }) {
  return (
    <div className="stat-card" style={{ '--accent': stat.color }}>
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-info">
        <span className="stat-value">{stat.value}</span>
        <span className="stat-label">{stat.label}</span>
      </div>
      <span className="stat-change">{stat.change}</span>
    </div>
  );
}

function WeatherWidget({ data }) {
  return (
    <div className="weather-widget glass-card">
      <div className="weather-header">
        <h3>🌤️ Weather</h3>
        <span className="weather-location">{data.location}</span>
      </div>
      <div className="weather-main">
        <div className="weather-temp">
          <span className="temp-value">{data.temperature}°</span>
          <span className="temp-condition">{data.condition}</span>
        </div>
        <div className="weather-details">
          <div className="weather-detail">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{data.humidity}%</span>
          </div>
          <div className="weather-detail">
            <span className="detail-label">Rainfall</span>
            <span className="detail-value">{data.rainfall}mm</span>
          </div>
          <div className="weather-detail">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{data.windSpeed} km/h</span>
          </div>
        </div>
      </div>
      <div className="weather-forecast">
        {data.forecast.map((day) => (
          <div key={day.day} className="forecast-day">
            <span className="forecast-label">{day.day}</span>
            <span className="forecast-icon">{day.icon}</span>
            <span className="forecast-temp">{day.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SoilWidget({ data }) {
  const soilItems = [
    { label: 'Nitrogen (N)', value: data.nitrogen, max: 100, unit: 'kg/ha', color: '#10b981' },
    { label: 'Phosphorus (P)', value: data.phosphorus, max: 80, unit: 'kg/ha', color: '#3b82f6' },
    { label: 'Potassium (K)', value: data.potassium, max: 100, unit: 'kg/ha', color: '#8b5cf6' },
    { label: 'pH Level', value: data.ph, max: 14, unit: '', color: '#f59e0b' },
    { label: 'Moisture', value: data.moisture, max: 100, unit: '%', color: '#06b6d4' },
  ];

  return (
    <div className="soil-widget glass-card">
      <h3>🧪 Soil Analysis</h3>
      <div className="soil-bars">
        {soilItems.map((item) => (
          <div key={item.label} className="soil-bar-item">
            <div className="soil-bar-header">
              <span>{item.label}</span>
              <span className="soil-bar-value">{item.value} {item.unit}</span>
            </div>
            <div className="soil-bar-track">
              <div
                className="soil-bar-fill"
                style={{
                  width: `${(item.value / item.max) * 100}%`,
                  background: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CropCard({ crop }) {
  return (
    <div className="crop-card glass-card" style={{ '--crop-color': crop.color }}>
      <div className="crop-header">
        <span className="crop-icon">{crop.icon}</span>
        <div className="crop-confidence">
          <svg viewBox="0 0 36 36" className="confidence-ring">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={crop.color}
              strokeWidth="3"
              strokeDasharray={`${crop.confidence}, 100`}
              strokeLinecap="round"
            />
          </svg>
          <span className="confidence-text">{crop.confidence}%</span>
        </div>
      </div>
      <h4 className="crop-name">{crop.name}</h4>
      <div className="crop-details">
        <span>🗓️ {crop.season}</span>
        <span>💧 {crop.waterReq}</span>
        <span>🌍 {crop.soilType}</span>
        <span>📦 {crop.expectedYield}</span>
      </div>
    </div>
  );
}

function AutomationLab() {
  const [waterStress, setWaterStress] = useState(42);
  const [rainProbability, setRainProbability] = useState(33);
  const [remotePlan, setRemotePlan] = useState(null);

  const plan = useMemo(() => {
    const needIrrigation = waterStress > 55 && rainProbability < 45;
    const litersPerAcre = Math.max(1800, 3000 - rainProbability * 12 + waterStress * 9);
    const dieselSaved = needIrrigation ? 16 : 7;
    const yieldUplift = Math.max(3, Math.round((waterStress + (100 - rainProbability)) / 18));

    return {
      needIrrigation,
      litersPerAcre,
      dieselSaved,
      yieldUplift,
      decision: needIrrigation ? 'Irrigate tonight' : 'Delay irrigation and monitor for 24h',
    };
  }, [waterStress, rainProbability]);

  useEffect(() => {
    let isMounted = true;

    const loadPlan = async () => {
      try {
        const response = await fetchIrrigationPlan({ waterStress, rainProbability });
        if (isMounted) {
          setRemotePlan(response);
        }
      } catch {
        if (isMounted) {
          setRemotePlan(null);
        }
      }
    };

    loadPlan();

    return () => {
      isMounted = false;
    };
  }, [waterStress, rainProbability]);

  const finalPlan = remotePlan ?? plan;

  return (
    <div className="automation-lab glass-card">
      <h3>Auto-Irrigation Copilot</h3>
      <p className="lab-subtitle">WOW Feature: Simulates irrigation actions using weather and soil stress.</p>

      <div className="slider-group">
        <label htmlFor="waterStress">Water stress index: {waterStress}</label>
        <input
          id="waterStress"
          type="range"
          min="0"
          max="100"
          value={waterStress}
          onChange={(event) => setWaterStress(Number(event.target.value))}
        />
      </div>

      <div className="slider-group">
        <label htmlFor="rainProbability">Rain probability (%): {rainProbability}</label>
        <input
          id="rainProbability"
          type="range"
          min="0"
          max="100"
          value={rainProbability}
          onChange={(event) => setRainProbability(Number(event.target.value))}
        />
      </div>

      <div className="lab-output">
        <p className="decision-line">
          Decision: {finalPlan.decision}
        </p>
        <div className="lab-metrics">
          <span>Water Plan: {finalPlan.litersPerAcre} L/acre</span>
          <span>Fuel Saved: {finalPlan.dieselSaved}%</span>
          <span>Expected Yield Lift: +{finalPlan.yieldUplift}%</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ userMobile = '9999999999' }) {
  const [weather, setWeather] = useState(weatherData);
  const [soil, setSoil] = useState(soilData);
  const [crops, setCrops] = useState(cropRecommendations);
  const [stats, setStats] = useState(dashboardStats);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const [weatherResponse, soilResponse, cropsResponse, summaryResponse] = await Promise.all([
          fetchWeather(),
          fetchSoil(),
          fetchCropRecommendations(),
          fetchDashboardSummary(userMobile),
        ]);

        if (!isMounted) return;

        setWeather(weatherResponse || weatherData);
        setSoil(soilResponse || soilData);
        setCrops(Array.isArray(cropsResponse) && cropsResponse.length ? cropsResponse : cropRecommendations);

        setStats((prev) => {
          const next = [...prev];
          next[0] = { ...next[0], value: String(summaryResponse?.totalPlans ?? next[0].value), label: 'Season Plans' };
          next[1] = { ...next[1], value: String(summaryResponse?.totalScans ?? next[1].value), label: 'Scans Logged' };
          next[2] = { ...next[2], value: String(summaryResponse?.severeAlerts ?? next[2].value), label: 'Severe Alerts' };
          return next;
        });
      } catch {
        // Keep fallback mock values if backend is unavailable.
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [userMobile]);

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Farm Dashboard</h1>
          <p className="page-subtitle">Real-time insights for smarter farming</p>
        </div>
        <div className="header-actions">
          <span className="live-badge">
            <span className="live-dot" />
            Live
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        <WeatherWidget data={weather} />
        <SoilWidget data={soil} />
      </div>

      <div className="dashboard-grid">
        <AutomationLab />
      </div>

      {/* Crop Recommendations */}
      <div className="section">
        <h2 className="section-title">🌾 AI Crop Recommendations</h2>
        <p className="section-subtitle">Based on your soil data, weather patterns, and historical yields</p>
        <div className="crops-grid">
          {crops.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      </div>
    </div>
  );
}
