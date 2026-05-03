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
 
const sessions = [
  {
    id: 1,
    nutritionist: "Dr. Fatima L.",
    date: "Apr 14, 2026",
    time: "10:00 AM",
    status: "upcoming",
    notes: null,
  },
  {
    id: 2,
    nutritionist: "Dr. Fatima L.",
    date: "Mar 28, 2026",
    time: "10:00 AM",
    status: "completed",
    notes: "Adjusted protein intake. Increased water goal.",
  },
  {
    id: 3,
    nutritionist: "Dr. Fatima L.",
    date: "Mar 14, 2026",
    time: "11:30 AM",
    status: "completed",
    notes: "Initial assessment. Set goal: lose 8kg in 3 months.",
  },
];
 
const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];
 
const DAYS   = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
 
function Sidebar({ isOpen, setIsOpen }) {
  return (
    <aside className={`nc-sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="nc-sidebar-top">
        <button className="nc-toggle" onClick={() => setIsOpen(!isOpen)}>☰</button>
        <div className="nc-brand">
          <img src={brandlogo} alt="Perfect Body" className="nc-logo-img" />
          {isOpen && (
            <span className="nc-logo-text">Perfect <em>Body</em></span>
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
 
/* ── CALENDAR ── */
function Calendar({ selectedDate, onSelect }) {
  const today = new Date(2026, 4, 2); // May 2, 2026
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
 
  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };
 
  const firstDay   = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev  = new Date(viewYear, viewMonth, 0).getDate();
 
  const cells = [];
  // prev-month filler
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ day: daysInPrev - i, current: false });
  // current month
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, current: true });
  // next-month filler
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++)
    cells.push({ day: d, current: false });
 
  const isToday = (d) =>
    d.current &&
    d.day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();
 
  const isSelected = (d) =>
    d.current &&
    selectedDate &&
    selectedDate.day === d.day &&
    selectedDate.month === viewMonth &&
    selectedDate.year === viewYear;
 
  const isPast = (d) => {
    if (!d.current) return true;
    const cellDate = new Date(viewYear, viewMonth, d.day);
    return cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };
 
  return (
    <div className="cal-wrap">
      <div className="cal-header">
        <button className="cal-nav" onClick={prevMonth}>‹</button>
        <span className="cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
        <button className="cal-nav" onClick={nextMonth}>›</button>
      </div>
      <div className="cal-grid">
        {DAYS.map(d => <div key={d} className="cal-day-name">{d}</div>)}
        {cells.map((cell, i) => (
          <button
            key={i}
            disabled={isPast(cell) || !cell.current}
            className={[
              "cal-cell",
              !cell.current   ? "other-month" : "",
              isToday(cell)   ? "today"        : "",
              isSelected(cell)? "selected"     : "",
              isPast(cell)    ? "past"         : "",
            ].join(" ")}
            onClick={() =>
              cell.current && !isPast(cell) &&
              onSelect({ day: cell.day, month: viewMonth, year: viewYear })
            }
          >
            {cell.day}
          </button>
        ))}
      </div>
    </div>
  );
}
 
/* ── BOOKING MODAL ── */
function BookingModal({ onClose, onConfirm }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmed,    setConfirmed]    = useState(false);
 
  const dateLabel = selectedDate
    ? `${MONTHS[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`
    : null;
 
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    setConfirmed(true);
    setTimeout(() => {
      onConfirm({ date: dateLabel, time: selectedTime });
      onClose();
    }, 1400);
  };
 
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">Book a Session</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
 
        <div className="modal-body">
          {/* Calendar panel */}
          <div className="modal-panel">
            <h3 className="modal-panel-title">Pick a Date</h3>
            <Calendar selectedDate={selectedDate} onSelect={(d) => { setSelectedDate(d); setSelectedTime(null); }} />
          </div>
 
          {/* Time panel */}
          <div className="modal-panel">
            <h3 className="modal-panel-title">Select Time &amp; Confirm</h3>
            {!selectedDate ? (
              <p className="modal-hint">Select a date to see available time slots.</p>
            ) : confirmed ? (
              <div className="modal-success">
                <div className="modal-success-icon">✓</div>
                <p className="modal-success-text">Session booked!</p>
                <p className="modal-success-sub">{dateLabel} · {selectedTime}</p>
              </div>
            ) : (
              <>
                <p className="modal-date-display">{dateLabel}</p>
                <div className="time-grid">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      className={`time-slot ${selectedTime === t ? "selected" : ""}`}
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button
                  className={`confirm-btn ${!selectedTime ? "disabled" : ""}`}
                  disabled={!selectedTime}
                  onClick={handleConfirm}
                >
                  Confirm Booking
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 
/* ── MAIN PAGE ── */
export default function Consultations() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal,   setShowModal]   = useState(false);
  const [sessionList, setSessionList] = useState(sessions);
 
  const handleConfirm = ({ date, time }) => {
    setSessionList(prev => [{
      id: Date.now(),
      nutritionist: "Dr. Fatima L.",
      date,
      time,
      status: "upcoming",
      notes: null,
    }, ...prev]);
  };
 
  return (
    <div className="nc-layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
 
      <main className="nc-main">
        <div className="co-content">
          {/* Page heading */}
          <div className="co-page-header">
            <div>
              <h1 className="co-title">My Consultations</h1>
              <p className="co-sub">Book and manage your sessions with nutritionists.</p>
            </div>
            <button className="co-book-btn" onClick={() => setShowModal(true)}>
              + Book Session
            </button>
          </div>
 
          {/* Session history table */}
          <div className="co-card">
            <h2 className="co-card-title">Session History</h2>
            <table className="co-table">
              <thead>
                <tr>
                  <th>NUTRITIONIST</th>
                  <th>DATE</th>
                  <th>TIME</th>
                  <th>STATUS</th>
                  <th>NOTES / ACTION</th>
                </tr>
              </thead>
              <tbody>
                {sessionList.map((s) => (
                  <tr key={s.id}>
                    <td className="co-td-name">{s.nutritionist}</td>
                    <td>{s.date}</td>
                    <td>{s.time}</td>
                    <td>
                      <span className={`co-badge co-badge-${s.status}`}>
                        {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      {s.status === "upcoming" ? (
                        <button className="co-zoom-btn">Join Zoom</button>
                      ) : (
                        <span className="co-notes">{s.notes}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
 
      {showModal && (
        <BookingModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
