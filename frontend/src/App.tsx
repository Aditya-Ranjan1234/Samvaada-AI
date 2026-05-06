import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Supervisor from './pages/Supervisor';

import Landing from './pages/Landing';
import CitizenLogin from './pages/CitizenLogin';
import CitizenDashboard from './pages/CitizenDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/supervisor" element={<Supervisor />} />
        <Route path="/citizen/login" element={<CitizenLogin />} />
        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
