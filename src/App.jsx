import { useMemo, useState } from 'react';
import './App.css';
import { demoLogin } from './api/client';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DiseaseDetection from './components/DiseaseDetection';
import MarketPrices from './components/MarketPrices';
import ProfilePlanner from './components/ProfilePlanner';
import VoiceAssistant from './components/VoiceAssistant';

const tabConfig = {
  dashboard: {
    title: 'Farm Intelligence Console',
    subtitle: 'One place for field health, crop planning, and income decisions.',
    component: Dashboard,
  },
  disease: {
    title: 'Plant Health Scan',
    subtitle: 'Capture a leaf image and get treatment recommendations in seconds.',
    component: DiseaseDetection,
  },
  market: {
    title: 'Market Price Radar',
    subtitle: 'Compare MSP and mandi prices to decide the right sell timing.',
    component: MarketPrices,
  },
  voice: {
    title: 'Farmer Voice Copilot',
    subtitle: 'Ask for weather, fertilizer, crop, and disease help in plain language.',
    component: VoiceAssistant,
  },
  planner: {
    title: 'Farmer Profile and Season Planner',
    subtitle: 'Save farmer details, generate crop economics, and review scan history.',
    component: ProfilePlanner,
  },
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileInput, setMobileInput] = useState('9999999999');
  const [authError, setAuthError] = useState('');
  const [session, setSession] = useState(() => {
    const raw = window.localStorage.getItem('agrivision-session');
    return raw ? JSON.parse(raw) : null;
  });

  const onLogin = async () => {
    setAuthError('');
    try {
      const response = await demoLogin({ mobile: mobileInput.trim() });
      window.localStorage.setItem('agrivision-session', JSON.stringify(response));
      setSession(response);
    } catch {
      setAuthError('Unable to login. Start backend using npm run server.');
    }
  };

  const onLogout = () => {
    window.localStorage.removeItem('agrivision-session');
    setSession(null);
  };

  const CurrentView = useMemo(() => {
    return tabConfig[activeTab]?.component ?? Dashboard;
  }, [activeTab]);

  if (!session) {
    return (
      <main className="auth-shell">
        <section className="auth-card">
          <p className="hero-eyebrow">AgriVision MVP</p>
          <h1>Farmer Login</h1>
          <p className="hero-subtitle">Use mobile number to continue with the demo account.</p>

          <label className="field">
            <span>Mobile Number</span>
            <input value={mobileInput} onChange={(event) => setMobileInput(event.target.value)} />
          </label>

          <button type="button" className="primary-btn" onClick={onLogin}>
            Login
          </button>

          {authError ? <p className="auth-error">{authError}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="content-shell">
        <header className="top-hero">
          <p className="hero-eyebrow">AgriVision MVP</p>
          <h1>{tabConfig[activeTab].title}</h1>
          <p className="hero-subtitle">{tabConfig[activeTab].subtitle}</p>
          <div className="session-meta">
            <span>Logged in: {session.user.name} ({session.user.mobile})</span>
            <button type="button" className="chip-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </header>

        <CurrentView userMobile={session.user.mobile} />
      </main>
    </div>
  );
}

export default App;
