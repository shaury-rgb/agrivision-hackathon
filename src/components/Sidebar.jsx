import { useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '◫' },
  { id: 'disease', label: 'Disease Detection', icon: '✦' },
  { id: 'market', label: 'Market Prices', icon: '◈' },
  { id: 'voice', label: 'Voice Assistant', icon: '◉' },
  { id: 'planner', label: 'Profile & Planner', icon: '⌁' },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">AI</span>
          {!collapsed && <span className="logo-text">AgriVision</span>}
        </div>
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            title={item.label}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
            {activeTab === item.id && <span className="active-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="sidebar-badge">
            <span className="badge-dot" />
            <span>AI Engine Active</span>
          </div>
        )}
      </div>
    </aside>
  );
}
