import { Rocket, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section min-vh-100 d-flex flex-column align-items-center justify-content-center text-center">
      <div className="hero-glow"></div>

      <div className="container z-1">
        <h1 className="hero-title fw-bold mb-3">
          Smart Business Growth <br />
          <span className="accent-text">At Any Scale</span>
        </h1>
        
        <p className="hero-subtitle text-secondary mb-5 mx-auto">
          Vyapaar Mitra powers the next generation of MSMEs with advanced AI <br className="d-none d-md-block" />
          strategies, business hacks, and automated growth technology.
        </p>
        
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <button 
            className="btn btn-red rounded-pill d-flex align-items-center gap-2"
            onClick={() => navigate('/agent')}
          >
            <Rocket size={20} /> Try Demo Agent
          </button>
          
          <button 
            className="btn btn-outline-dark rounded-pill d-flex align-items-center gap-2"
            onClick={() => navigate('/tips')}
          >
            <Lightbulb size={20} /> Business Hacks & Tips
          </button>
        </div>
      </div>

   
    </div>
  );
};

export default Home;