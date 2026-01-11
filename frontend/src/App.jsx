import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Agent from './pages/Agent';
import Analytics from './pages/Analytics';
import Tips from './pages/Tips';
import Profile from './pages/Profile';
import AdsGenerator from './pages/AdsGenerator';

function App() {
  return (
    <Router>
      {/* min-vh-100 ensures the cream background covers the whole screen */}
      <div className="min-vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/ads" element={<AdsGenerator />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/analytics" element={<Analytics />} />
          <Route path="/tips" element={<div className="p-5">Hacks Section...</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;