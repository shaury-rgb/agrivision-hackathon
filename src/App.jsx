import { useMemo, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DiseaseDetection from './components/DiseaseDetection';
import MarketPrices from './components/MarketPrices';
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
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const CurrentView = useMemo(() => {
    return tabConfig[activeTab]?.component ?? Dashboard;
  }, [activeTab]);

  return (
    <div className="app-shell">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="content-shell">
        <header className="top-hero">
          <p className="hero-eyebrow">AgriVision MVP</p>
          <h1>{tabConfig[activeTab].title}</h1>
          <p className="hero-subtitle">{tabConfig[activeTab].subtitle}</p>
        </header>

        <CurrentView />
      </main>
    </div>
  );
}

export default App;
