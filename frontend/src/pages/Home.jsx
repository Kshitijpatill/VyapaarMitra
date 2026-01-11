import React from 'react';
import { 
  Rocket, 
  Lightbulb, 
  MessageSquare, 
  Plus, 
  Clock, 
  TrendingUp, 
  Zap,
  Layout,
  FileText,
  Languages,
  CheckCircle2,
  Sparkles
} from 'lucide-react'; // Comprehensive icon imports for all sections
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* --- 1. HERO SECTION (Original Content Preserved) --- */}
      <div className="hero-section min-vh-100 d-flex flex-column align-items-center justify-content-center text-center px-3">
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
              className="btn btn-red rounded-pill d-flex align-items-center gap-2 shadow" 
              onClick={() => navigate('/agent')}
            >
              <Rocket size={20} /> Try Demo Agent
            </button>
            <button 
              className="btn btn-outline-dark rounded-pill d-flex align-items-center gap-2 shadow-sm" 
              onClick={() => navigate('/tips')}
            >
              <Lightbulb size={20} /> Business Hacks & Tips
            </button>
          </div>
        </div>
      </div>

      {/* --- 2. WHAT IT IS: CURATED BUSINESS SCENARIO --- */}
      <section className="py-5 bg-white border-top">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              {/* Responsive Chat Interface with Modern Styling */}
              <div className="p-3 p-md-5 bg-dark rounded-5 shadow-lg position-relative overflow-hidden chat-container" style={{ minHeight: '350px' }}>
                <div className="d-flex flex-column gap-4 mt-2 opacity-50">
                  {/* User Message */}
                  <div className="chat-bubble user-bubble align-self-end shadow-sm fw-medium">
                    Write a polite payment reminder for Rahul for ₹5000.
                  </div>

                  {/* Mitra AI Agent Message */}
                  <div className="chat-bubble agent-bubble align-self-start shadow-sm">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Sparkles size={14} className="text-danger" />
                      <span className="small fw-bold text-danger text-uppercase" style={{ letterSpacing: '1px' }}>Mitra AI</span>
                    </div>
                    <p className="mb-0 fw-medium">
                      "Namaste Rahul ji, hope you are well. Just a gentle reminder for the pending payment of ₹5000. Dhanyawad!"
                    </p>
                  </div>

                  {/* Follow-up User Message */}
                  <div className="chat-bubble user-bubble align-self-end shadow-sm fw-medium">
                    Perfect! Now make a Diwali sale post for my shop.
                  </div>
                </div>
                
                {/* Visual Accent for Desktop */}
                <div className="position-absolute top-50 start-50 translate-middle d-none d-md-block">
                   <div className="bg-white rounded-circle p-3 shadow-lg pulse">
                      <MessageSquare className="text-danger" size={32} />
                   </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 px-4">
              <h2 className="fw-bold mb-4 display-5">Your AI <span className="text-danger">Business Partner</span></h2>
              <p className="text-muted fs-5 lh-lg">
                Vyapaar Mitra isn't just a chatbot; it's a dedicated assistant that understands <strong>Hinglish</strong>. 
                From drafting professional WhatsApp messages to analyzing sales trends, it speaks your language and solves your daily business headaches.
              </p>
              <ul className="list-unstyled mt-4">
                <li className="d-flex align-items-center gap-2 mb-2 text-dark fw-medium"><CheckCircle2 className="text-success" size={18}/> Voice commands in Hinglish</li>
                <li className="d-flex align-items-center gap-2 mb-2 text-dark fw-medium"><CheckCircle2 className="text-success" size={18}/> Automated Customer Support</li>
                <li className="d-flex align-items-center gap-2 text-dark fw-medium"><CheckCircle2 className="text-success" size={18}/> Smart Task Planning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. PROJECT FEATURES SECTION --- */}
      <section className="py-5" style={{ backgroundColor: '#fdf5d7' }}>
        <div className="container py-5">
          <h2 className="text-danger fw-bold mb-5 display-4 text-center text-md-start">Powerful Features</h2>
          <div className="row g-4">
            {/* Feature 1: AI Agent */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white hover-shadow transition-all">
                <div className="p-4 bg-danger-subtle text-danger d-flex justify-content-center">
                  <Languages size={80} strokeWidth={1.5} />
                </div>
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">Multilingual AI Agent</h4>
                  <p className="text-muted mb-0">
                    Talk to your assistant in Hindi, English, or Hinglish. Get instant advice on marketing, legal compliance, and customer service.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2: AI Ad Studio */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white hover-shadow transition-all">
                <div className="p-4 bg-warning-subtle text-warning d-flex justify-content-center">
                  <Layout size={80} strokeWidth={1.5} />
                </div>
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">AI Ad Studio</h4>
                  <p className="text-muted mb-0">
                    Generate professional social media ads with AI-created images and catchy captions specifically tuned for the Indian market.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3: Smart Analytics */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white hover-shadow transition-all">
                <div className="p-4 bg-success-subtle text-success d-flex justify-content-center">
                  <FileText size={80} strokeWidth={1.5} />
                </div>
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">Document Analytics</h4>
                  <p className="text-muted mb-0">
                    Simply upload a photo of your sales register or bills. Our AI extracts data to show you real-time revenue trends and growth insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. PROJECT BENEFITS SECTION --- */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <h2 className="text-danger fw-bold mb-5 display-4 text-center">Why Choose Us?</h2>
          <div className="row g-4 text-center">
            {[
              { icon: Zap, label: "Save 2+ Hours Daily", desc: "Automate manual typing & planning." },
              { icon: Rocket, label: "Professional Branding", desc: "Compete with big brands using AI Ads." },
              { icon: TrendingUp, label: "Financial Clarity", desc: "Never lose track of your udhaari or daily sales." },
              { icon: Languages, label: "Hinglish Support", desc: "No complex English or technical skills required." }
            ].map((b, i) => (
              <div key={i} className="col-sm-6 col-lg-3">
                <div className="p-4 rounded-4 h-100 d-flex flex-column align-items-center gap-3 shadow-sm hover-shadow transition-all" style={{ backgroundColor: '#fdfcf0', border: '1px solid #f1f5f9' }}>
                  <b.icon className="text-danger" size={40} />
                  <h5 className="fw-bold mb-1">{b.label}</h5>
                  <p className="small text-muted mb-0">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. FINAL CALL TO ACTION --- */}
      <section className="py-5 text-center bg-dark text-white">
        <div className="container py-5">
           <h2 className="fw-bold mb-4 display-6">Ready to Scale Your Vyapaar?</h2>
           <p className="text-secondary mb-5 fs-5">Join the next generation of smart Indian business owners.</p>
           <button 
              className="btn btn-red rounded-pill px-5 py-3 fw-bold fs-5 shadow pulse" 
              onClick={() => navigate('/agent')}
            >
              Get Started for Free
           </button>
        </div>
      </section>
    </div>
  );
};

export default Home;