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

const DIETARY_GOALS = [
  { value: "weight-loss",      label: "Weight Loss"      },
  { value: "muscle-gain",      label: "Muscle Gain"      },
  { value: "maintenance",      label: "Maintenance"      },
  { value: "manage-condition", label: "Manage Condition" },
];

function getBmiInfo(bmi) {
  const n = parseFloat(bmi);
  if (n < 18.5) return { label: "Underweight", color: "#60c2f0" };
  if (n < 25)   return { label: "Normal range", color: "#22c97a" };
  if (n < 30)   return { label: "Overweight",   color: "#f0a500" };
  return           { label: "Obese",            color: "#e05c5c" };
}

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <aside className={`nc-sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="nc-sidebar-top">
        <button className="nc-toggle" onClick={() => setIsOpen(!isOpen)}>☰</button>
        <div className="nc-brand">
          <img src={brandlogo} alt="Perfect Body" className="nc-logo-img" />
          {isOpen && <span className="nc-logo-text">Perfect <em>Body</em></span>}
        </div>
      </div>

      {isOpen && (
        <>
          <div className="nc-section-label">VIEW AS</div>
          <div className="nc-view-as">
            <button className="nc-view-btn active">User</button>
            <button className="nc-view-btn">Nutri</button>
            <button className="nc-view-btn">Admin</button>
          </div>
          <div className="nc-section-label">MENU</div>
        </>
      )}

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

/* ─────────────────────────────────────────
   PERSONAL INFO CARD
   editing/setEditing come from the parent.
───────────────────────────────────────── */
function PersonalInfoCard({ editing, setEditing }) {
  const [saved, setSaved] = useState(false);

  const [firstName, setFirstName] = useState("John");
  const [lastName,  setLastName]  = useState("Doe");
  const [email,     setEmail]     = useState("john@example.com");
  const [dob,       setDob]       = useState("1995-10-04");

  const [draft, setDraft] = useState({ firstName, lastName, email, dob });

  // Keep draft in sync when editing starts (handled by parent calling setEditing)
  // We sync the draft whenever editing flips to true
  const handleSave = (e) => {
    e.preventDefault();
    setFirstName(draft.firstName);
    setLastName(draft.lastName);
    setEmail(draft.email);
    setDob(draft.dob);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fmt = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${m}/${d}/${y}`;
  };

  return (
    <div className="pf-card">
      <div className="pf-card-header">
        <h2 className="pf-card-title">Personal Info</h2>
      </div>

      {saved && <div className="pf-toast">✓ Changes saved successfully</div>}

      <form className="pf-form" onSubmit={handleSave}>
        <div className="pf-row">
          <div className="pf-field">
            <label className="pf-label">FIRST NAME</label>
            {editing
              ? <input className="pf-input" value={draft.firstName}
                  onChange={(e) => setDraft(d => ({ ...d, firstName: e.target.value }))} />
              : <div className="pf-readonly">{firstName}</div>
            }
          </div>
          <div className="pf-field">
            <label className="pf-label">LAST NAME</label>
            {editing
              ? <input className="pf-input" value={draft.lastName}
                  onChange={(e) => setDraft(d => ({ ...d, lastName: e.target.value }))} />
              : <div className="pf-readonly">{lastName}</div>
            }
          </div>
        </div>

        <div className="pf-field">
          <label className="pf-label">EMAIL</label>
          {editing
            ? <input className="pf-input" type="email" value={draft.email}
                onChange={(e) => setDraft(d => ({ ...d, email: e.target.value }))} />
            : <div className="pf-readonly">{email}</div>
          }
        </div>

        <div className="pf-field">
          <label className="pf-label">DATE OF BIRTH</label>
          {editing
            ? <input className="pf-input pf-input-date" type="date" value={draft.dob}
                onChange={(e) => setDraft(d => ({ ...d, dob: e.target.value }))} />
            : <div className="pf-readonly">{fmt(dob)}</div>
          }
        </div>

        {editing && (
          <button className="pf-save-btn" type="submit">Save Changes</button>
        )}
      </form>
    </div>
  );
}

/* ─────────────────────────────────────────
   HEALTH DATA CARD
   editing/setEditing come from the parent.
───────────────────────────────────────── */
function HealthDataCard({ editing }) {
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("178");
  const [goal,   setGoal]   = useState("manage-condition");

  const bmi = (() => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h) return null;
    return (w / (h * h)).toFixed(1);
  })();

  const bmiInfo  = bmi ? getBmiInfo(bmi) : null;
  const bmiThumb = bmi
    ? Math.min(Math.max(((parseFloat(bmi) - 10) / 30) * 100, 2), 98)
    : 0;

  return (
    <div className="pf-card">
      <h2 className="pf-card-title pf-health-title">Health Data</h2>

      <div className="pf-row">
        <div className="pf-field">
          <label className="pf-label">WEIGHT (KG)</label>
          {editing
            ? <input className="pf-input" type="number" min="20" max="300"
                value={weight} onChange={(e) => setWeight(e.target.value)} />
            : <div className="pf-readonly">{weight} kg</div>
          }
        </div>
        <div className="pf-field">
          <label className="pf-label">HEIGHT (CM)</label>
          {editing
            ? <input className="pf-input" type="number" min="50" max="250"
                value={height} onChange={(e) => setHeight(e.target.value)} />
            : <div className="pf-readonly">{height} cm</div>
          }
        </div>
      </div>

      <div className="pf-field">
        <label className="pf-label">DIETARY GOAL</label>
        {editing ? (
          <div className="pf-select-wrap">
            <select className="pf-select" value={goal} onChange={(e) => setGoal(e.target.value)}>
              {DIETARY_GOALS.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
            <span className="pf-select-arrow">▾</span>
          </div>
        ) : (
          <div className="pf-readonly">
            {DIETARY_GOALS.find(g => g.value === goal)?.label}
          </div>
        )}
      </div>

      {bmi && (
        <div className="pf-bmi-box">
          <p className="pf-bmi-label">BMI Estimate</p>
          <p className="pf-bmi-value" style={{ color: bmiInfo.color }}>{bmi}</p>

          <div className="pf-bmi-gauge">
            <div
              className="pf-bmi-thumb"
              style={{ left: `${bmiThumb}%`, background: bmiInfo.color }}
            />
          </div>

          <div className="pf-bmi-zones">
            <span style={{ color: "#60c2f0" }}>Underweight</span>
            <span style={{ color: "#22c97a" }}>Normal</span>
            <span style={{ color: "#f0a500" }}>Overweight</span>
            <span style={{ color: "#e05c5c" }}>Obese</span>
          </div>

          <p className="pf-bmi-cat" style={{ color: bmiInfo.color }}>
            {bmiInfo.label}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE — owns editing state
───────────────────────────────────────── */
export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="nc-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="nc-main">
        <div className="pf-content">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h1 className="pf-title">My Profile</h1>
              <p className="pf-sub">Manage your personal information and health data.</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
              {editing ? (
                <button className="pf-action-btn pf-cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              ) : (
                <button className="pf-action-btn pf-edit-btn" onClick={handleEdit}>
                  Edit
                </button>
              )}
            </div>
          </div>

          <div className="pf-panels">
            <PersonalInfoCard editing={editing} setEditing={setEditing} />
            <HealthDataCard   editing={editing} />
          </div>
        </div>
      </main>
    </div>
  );
}