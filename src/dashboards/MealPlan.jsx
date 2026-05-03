import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import brandlogo from "../assets/brandlogo.png";
 
const menuItems = [
  { name: "Overview", path: "/User", icon: "📊" },
  { name: "AI Tracker", path: "/AiTracker", icon: "🤖" },
  { name: "Meal Plan", path: "/MealPlan", icon: "🍽️" },
  { name: "Consultations", path: "/consultations", icon: "📅" },
  { name: "Profile", path: "/Profile", icon: "👤" },
];
const planMeta = [
  { label: "GOAL",         value: "Weight loss",   emoji: "🎯" },
  { label: "DURATION",     value: "12 weeks",      emoji: "⏱️" },
  { label: "DIET TYPE",    value: "Mediterranean", emoji: "🌿" },
  { label: "DAILY TARGET", value: "1,800 kcal",    emoji: "🔥" },
];
 
const mealSections = [
  {
    id: "breakfast",
    name: "Breakfast",
    time: "7:00 – 8:00 AM",
    emoji: "🌅",
    kcal: 325,
    items: [
      { id: "b1", name: "Oatmeal with blueberries & chia seeds", kcal: 320 },
      { id: "b2", name: "Green tea",                              kcal: 5   },
    ],
  },
  {
    id: "lunch",
    name: "Lunch",
    time: "12:00 – 1:00 PM",
    emoji: "☀️",
    kcal: 570,
    items: [
      { id: "l1", name: "Grilled chicken breast with quinoa",     kcal: 450 },
      { id: "l2", name: "Side salad with olive oil dressing",     kcal: 120 },
    ],
  },
  {
    id: "snack",
    name: "Snack",
    time: "3:30 PM",
    emoji: "🍇",
    kcal: 280,
    items: [
      { id: "s1", name: "Greek yogurt with almonds",              kcal: 200 },
      { id: "s2", name: "Apple slices",                           kcal: 80  },
    ],
  },
  {
    id: "dinner",
    name: "Dinner",
    time: "7:00 – 8:00 PM",
    emoji: "🌙",
    kcal: 490,
    items: [
      { id: "d1", name: "Baked salmon with steamed vegetables",   kcal: 380 },
      { id: "d2", name: "Brown rice (½ cup)",                     kcal: 110 },
    ],
  },
];
 
const TOTAL_ITEMS = mealSections.reduce((s, m) => s + m.items.length, 0);
 
function Sidebar({ isOpen, setIsOpen }) {
  return (
    <aside className={`nc-sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="nc-sidebar-top">
        <button className="nc-toggle" onClick={() => setIsOpen(!isOpen)}>☰</button>
        <div className="nc-brand">
          <img src={brandlogo} alt="Perfect Body" className="nc-logo-img" />
          {isOpen && (
            <span className="nc-logo-text">
              Perfect <em>Body</em>
            </span>
          )}
        </div>
      </div>
 
      
 
      <nav className="nc-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nc-nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nc-nav-icon">{item.icon}</span>
            {isOpen && <span className="nc-nav-label">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
 
      <div className="nc-sidebar-bottom">
        <button className="nc-nav-item nc-logout">
          <span className="nc-nav-icon">→</span>
          {isOpen && <span className="nc-nav-label">Log out</span>}
        </button>
      </div>
    </aside>
  );
}
 
export default function MealPlan() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [checked, setChecked]         = useState({});
 
  const toggle = (id) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
 
  const completedCount = Object.values(checked).filter(Boolean).length;
  const progressPct    = Math.round((completedCount / TOTAL_ITEMS) * 100);
 
  return (
    <div className="nc-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
 
      <main className="nc-main">
        {/* Top search bar */}
        <header className="mp-topbar">
          <div className="mp-search-wrap">
            <span className="mp-search-icon">🔍</span>
            <input
              className="mp-search"
              type="text"
              placeholder="Search meals, patients, articles..."
            />
          </div>
          <div className="mp-topbar-right">
            <button className="mp-bell">🔔</button>
            <div className="mp-avatar">J</div>
          </div>
        </header>
 
        <div className="mp-content">
          {/* Page heading */}
          <div className="mp-heading">
            <p className="mp-eyebrow">PERSONALIZED FOR YOU</p>
            <h1 className="mp-title">
              My nutrition <em>plan</em>
            </h1>
            <p className="mp-subtitle">
              A balanced Mediterranean plan tailored to your weight-loss goal.
            </p>
          </div>
 
          {/* Meta cards */}
          <div className="mp-meta-grid">
            {planMeta.map((m) => (
              <div key={m.label} className="mp-meta-card">
                <div className="mp-meta-emoji">{m.emoji}</div>
                <p className="mp-meta-label">{m.label}</p>
                <p className="mp-meta-value">{m.value}</p>
              </div>
            ))}
          </div>
 
          {/* Progress */}
          <div className="mp-progress-card">
            <div className="mp-progress-top">
              <div>
                <span className="mp-progress-title">
                  Today's <em>progress</em>
                </span>
                <p className="mp-progress-sub">
                  {completedCount} of {TOTAL_ITEMS} meals completed
                </p>
              </div>
              <span className="mp-progress-pct">{progressPct}%</span>
            </div>
            <div className="mp-bar">
              <div className="mp-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
 
          {/* Meal sections */}
          <div className="mp-meals">
            {mealSections.map((section) => (
              <div key={section.id} className="mp-meal-card">
                {/* Meal header */}
                <div className="mp-meal-header">
                  <div className="mp-meal-left">
                    <div className="mp-meal-emoji">{section.emoji}</div>
                    <div>
                      <p className="mp-meal-name">{section.name}</p>
                      <p className="mp-meal-time">{section.time}</p>
                    </div>
                  </div>
                  <span className="mp-meal-kcal">{section.kcal} kcal</span>
                </div>
 
                {/* Food items */}
                <div className="mp-items">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className={`mp-item-row ${checked[item.id] ? "checked" : ""}`}
                      onClick={() => toggle(item.id)}
                    >
                      <div className="mp-checkbox">
                        {checked[item.id] && <span className="mp-check-mark">✓</span>}
                      </div>
                      <span className="mp-item-name">{item.name}</span>
                      <span className="mp-item-kcal">{item.kcal} kcal</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}