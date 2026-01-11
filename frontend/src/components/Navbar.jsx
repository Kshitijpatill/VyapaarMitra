import { Link } from "react-router-dom";
import { Megaphone, Zap, BarChart3, User, MessageSquare } from "lucide-react"; // Added icons for better UX
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary sticky-top py-1">
      <div className="container">
        {/* BRAND LOGO SECTION */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-3"
          to="/"
        >
          <img
            src={logo}
            alt="Vyapaar Mitra Logo"
            style={{ width: "32px", height: "32px", objectFit: "contain" }}
          />
          Vyapaar<span className="text-danger">Mitra</span>
        </Link>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVIGATION LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            
            {/* HACKS & TIPS */}
            <li className="nav-item">
              <Link className="nav-link px-3 text-secondary d-flex align-items-center gap-1" to="/tips">
                <Zap size={16} /> Hacks
              </Link>
            </li>

            {/* AI ADS GENERATOR (NEWLY UPDATED) */}
            <li className="nav-item">
              <Link 
                className="nav-link px-3 text-secondary d-flex align-items-center gap-1" 
                to="/ads" // Path updated to match AdsGenerator route
              >
                <Megaphone size={16} /> AI Ads
              </Link>
            </li>
            
            {/* BUSINESS ANALYTICS */}
            <li className="nav-item">
              <Link className="nav-link px-3 text-secondary d-flex align-items-center gap-1" to="/analytics">
                <BarChart3 size={16} /> Analytics
              </Link>
            </li>

            {/* PROFILE PAGE */}
            <li className="nav-item">
              <Link className="nav-link px-3 text-secondary d-flex align-items-center gap-1" to="/profile">
                <User size={16} /> Profile
              </Link>
            </li>

            {/* CTA: AI AGENT */}
            <li className="nav-item ms-lg-2">
              <Link
                to="/agent"
                className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2"
              >
                <MessageSquare size={18} /> Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;