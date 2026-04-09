import { useEffect, useMemo, useState } from 'react';
import { createSeasonPlan, fetchDiseaseHistory, fetchProfile, saveProfile } from '../api/client';

const defaultForm = {
  name: 'Demo Farmer',
  mobile: '9999999999',
  region: 'Pune',
  farmSizeAcres: 3,
  preferredLanguage: 'Hindi',
  soilType: 'Loamy',
  irrigationType: 'Drip',
  currentCrop: 'Rice',
};

export default function ProfilePlanner({ userMobile = '9999999999' }) {
  const [form, setForm] = useState({ ...defaultForm, mobile: userMobile });
  const [status, setStatus] = useState('Fill profile and generate a plan.');
  const [history, setHistory] = useState([]);
  const [plan, setPlan] = useState(null);

  const profit = useMemo(() => {
    if (!plan) return 0;
    return plan.estimatedRevenue - plan.estimatedCost;
  }, [plan]);

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setForm((prev) => ({ ...prev, mobile: userMobile }));
  }, [userMobile]);

  const handleSave = async () => {
    try {
      await saveProfile(form);
      setStatus('Profile saved successfully.');
    } catch {
      setStatus('Profile save failed. Backend may be offline.');
    }
  };

  const handleLoad = async () => {
    try {
      const payload = await fetchProfile(form.mobile);
      const user = payload.user || {};
      const field = payload.field || {};

      setForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        region: user.region || prev.region,
        farmSizeAcres: user.farmSizeAcres || prev.farmSizeAcres,
        preferredLanguage: user.preferredLanguage || prev.preferredLanguage,
        soilType: field.soilType || prev.soilType,
        irrigationType: field.irrigationType || prev.irrigationType,
        currentCrop: field.currentCrop || prev.currentCrop,
      }));

      setStatus('Profile loaded from backend.');
    } catch {
      setStatus('No profile found or backend unavailable.');
    }
  };

  const handlePlan = async () => {
    try {
      const response = await createSeasonPlan({
        mobile: form.mobile,
        crop: form.currentCrop,
        farmSizeAcres: Number(form.farmSizeAcres),
      });
      setPlan(response);
      setStatus('Season plan generated.');
    } catch {
      setStatus('Plan generation failed. Backend may be offline.');
    }
  };

  const handleHistory = async () => {
    try {
      const response = await fetchDiseaseHistory(form.mobile);
      setHistory(response);
      setStatus(`Loaded ${response.length} disease scan records.`);
    } catch {
      setStatus('Unable to load history. Backend may be offline.');
    }
  };

  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>Farmer Profile and Planner</h1>
        <p>Save farmer details, generate cost-revenue plans, and review disease scan history.</p>
      </div>

      <div className="feature-card">
        <div className="input-grid profile-grid">
          <label className="field">
            <span>Farmer Name</span>
            <input value={form.name} onChange={(event) => onChange('name', event.target.value)} />
          </label>

          <label className="field">
            <span>Mobile</span>
            <input value={form.mobile} onChange={(event) => onChange('mobile', event.target.value)} />
          </label>

          <label className="field">
            <span>Region</span>
            <input value={form.region} onChange={(event) => onChange('region', event.target.value)} />
          </label>

          <label className="field">
            <span>Farm Size (acres)</span>
            <input
              type="number"
              min="1"
              value={form.farmSizeAcres}
              onChange={(event) => onChange('farmSizeAcres', Number(event.target.value))}
            />
          </label>

          <label className="field">
            <span>Language</span>
            <select
              value={form.preferredLanguage}
              onChange={(event) => onChange('preferredLanguage', event.target.value)}
            >
              <option>Hindi</option>
              <option>English</option>
              <option>Marathi</option>
            </select>
          </label>

          <label className="field">
            <span>Current Crop</span>
            <select value={form.currentCrop} onChange={(event) => onChange('currentCrop', event.target.value)}>
              <option>Rice</option>
              <option>Wheat</option>
              <option>Soybean</option>
              <option>Maize</option>
            </select>
          </label>

          <label className="field">
            <span>Soil Type</span>
            <select value={form.soilType} onChange={(event) => onChange('soilType', event.target.value)}>
              <option>Loamy</option>
              <option>Clay</option>
              <option>Sandy Loam</option>
              <option>Black Soil</option>
            </select>
          </label>

          <label className="field">
            <span>Irrigation</span>
            <select
              value={form.irrigationType}
              onChange={(event) => onChange('irrigationType', event.target.value)}
            >
              <option>Drip</option>
              <option>Sprinkler</option>
              <option>Canal</option>
              <option>Rainfed</option>
            </select>
          </label>
        </div>

        <div className="action-row">
          <button type="button" className="primary-btn" onClick={handleSave}>
            Save Profile
          </button>
          <button type="button" className="chip-btn" onClick={handleLoad}>
            Load Profile
          </button>
          <button type="button" className="chip-btn" onClick={handlePlan}>
            Generate Season Plan
          </button>
          <button type="button" className="chip-btn" onClick={handleHistory}>
            Load Disease History
          </button>
        </div>

        <p className="input-note">{status}</p>
      </div>

      {plan ? (
        <div className="result-card">
          <div className="result-title-row">
            <h2>Season Plan</h2>
            <span className="severity-badge medium">Planned</span>
          </div>

          <div className="plan-kpis">
            <div className="kpi-box">
              <p className="price-label">Estimated Cost</p>
              <p className="price-value">INR {plan.estimatedCost}</p>
            </div>
            <div className="kpi-box">
              <p className="price-label">Estimated Revenue</p>
              <p className="price-value">INR {plan.estimatedRevenue}</p>
            </div>
            <div className="kpi-box">
              <p className="price-label">Projected Profit</p>
              <p className="price-value">INR {profit}</p>
            </div>
          </div>

          <h3>Activity Timeline</h3>
          <ul>
            {plan.activities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="feature-card">
        <h2>Disease Scan History</h2>
        {history.length === 0 ? (
          <p className="input-note">No records yet.</p>
        ) : (
          <div className="history-table">
            {history.map((item) => (
              <article key={item.id} className="history-row">
                <p>
                  <strong>{item.crop}</strong> - {item.diagnosis}
                </p>
                <p className="input-note">
                  Severity: {item.severity} | Confidence: {item.confidence}% | Image: {item.imageName}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
