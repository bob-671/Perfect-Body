
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './dashboards/User';
import AiTracker from './dashboards/AiTracker';
import MealPlan from './dashboards/MealPlan';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
          <Route path="/User" element={<User />} />
          <Route path="/AiTracker" element={<AiTracker />} />
          <Route path="/MealPlan" element={<MealPlan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;