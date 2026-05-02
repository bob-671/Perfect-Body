import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import brandlogo from "../assets/brandlogo.png";
 
const menuItems = [
  { name: "Overview", path: "/User", icon: "📊" },
  { name: "AI Tracker", path: "/AiTracker", icon: "🤖" },
  { name: "Meal Plan", path: "/MealPlan", icon: "🍽️" },
  { name: "Consultations", path: "/consultations", icon: "📅" },
  { name: "Profile", path: "/profile", icon: "👤" },
];
 
const meals = [
  { name: "Breakfast — Oatmeal Bowl", time: "08:00", kcal: 320 },
  { name: "Lunch — Grilled Chicken + Salad", time: "13:00", kcal: 620 },
  { name: "Snack — Greek Yogurt", time: "16:00", kcal: 180 },
  { name: "Dinner — Lentil Soup", time: "19:30", kcal: 720 },
];
 
const GOAL_PERCENT = 72;
 
function RingProgress({ percent }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div className="pb-ring">
      <svg viewBox="0 0 100 100" width="110" height="110">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#ffffff33" strokeWidth="9" />
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="#c8f04a"
          strokeWidth="9"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="pb-ring-inner">
        <span className="pb-ring-val">{percent}%</span>
        <span className="pb-ring-label">Daily goal</span>
      </div>
    </div>
  );
}
 
function Sidebar({ isOpen, setIsOpen }) {
  return (
    <aside className={`nc-sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="nc-sidebar-top">
        <button className="nc-toggle" onClick={() => setIsOpen(!isOpen)}>☰</button>
        <div className="nc-brand">
          <img src={brandlogo} alt="Perfect Body logo" className="nc-logo-img" />
          <span className="nc-logo-text">
              Perfect <em>Body</em>
            </span>
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
          <span className="nc-nav-icon">🏠</span>
          {isOpen && <span className="nc-nav-label">Back to Home</span>}
        </button>
      </div>
    </aside>
  );
}
 
function HeroBanner() {
  return (
    <div className="pb-dash-hero">
      <div className="pb-hero-content">
        <span className="pb-eyebrow">Thursday · April 30</span>
        <h1>Welcome back, <em>John</em>.</h1>
        <p>You're {GOAL_PERCENT}% to today's goal. One mindful meal at a time — keep going.</p>
        <div className="pb-dash-hero-actions">
          <button className="pb-btn pb-btn-gold">Log a meal →</button>
          <button className="pb-btn pb-btn-light">View plan</button>
        </div>
      </div>
      <RingProgress percent={GOAL_PERCENT} />
    </div>
  );
}
 
function StatCard({ icon, value, label, color }) {
  return (
    <div className="nc-stat-card">
      <span className="nc-stat-icon">{icon}</span>
      <div className="nc-stat-value" style={{ color }}>{value}</div>
      <div className="nc-stat-label">{label}</div>
    </div>
  );
}
 
export default function User() {
  const [isOpen, setIsOpen] = useState(true);
 
  return (
    <div className="nc-layout">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
 
      <main className="nc-main">
        <div className="nc-content">
          {/* Hero banner */}
          <HeroBanner />
 
          
 
          {/* Stats row */}
          <div className="nc-stats-row">
            <StatCard icon="🔥" value="1,840" label="Calories Today" color="#22c97a" />
            <StatCard icon="💧" value="1.8 L" label="Water Intake" color="#22c97a" />
            <StatCard icon="⚖️" value="74 kg" label="Current Weight" color="#22c97a" />
            <StatCard icon="🎯" value="82%" label="Goal Progress" color="#22c97a" />
          </div>
 
          {/* Bottom panels */}
          <div className="nc-panels">
            {/* Meals */}
            <div className="nc-card nc-meals">
              <div className="nc-card-header">
                <h3>Today's Meals</h3>
                <button className="nc-log-btn">+ Log Meal</button>
              </div>
              <table className="nc-meals-table">
                <thead>
                  <tr>
                    <th>MEAL</th>
                    <th>TIME</th>
                    <th>CALORIES</th>
                  </tr>
                </thead>
                <tbody>
                  {meals.map((m) => (
                    <tr key={m.name}>
                      <td>{m.name}</td>
                      <td>{m.time}</td>
                      <td><span className="nc-kcal-badge">{m.kcal} kcal</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
 
            {/* Consultation */}
            <div className="nc-card nc-consult">
              <h3>Next Consultation</h3>
              <div className="nc-consult-card">
                <div className="nc-doctor-name">Dr. Fatima L.</div>
                <div className="nc-consult-time">April 14, 2026 — 10:00 AM</div>
                <div className="nc-consult-via">via Zoom</div>
                <div className="nc-consult-actions">
                  <button className="nc-zoom-btn">Join Zoom</button>
                  <button className="nc-viewall-btn">View All</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}