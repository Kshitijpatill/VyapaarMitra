import React from 'react';
import { 
  Rocket, 
  Lightbulb, 
  MessageSquare, 
  Plus, 
  Clock, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Zap 
} from 'lucide-react'; // Added icons for the new sections
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* --- 1. HERO SECTION (Current Content Reserved) --- */}
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

      {/* --- 2. WHAT IT IS SECTION (Personalized Customer Care) --- */}
      <section className="py-5 bg-white border-top">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              {/* Mock Mobile UI representing image_066bc7.png */}
              <div className="p-4 bg-dark rounded-5 shadow-lg position-relative overflow-hidden" style={{ minHeight: '380px' }}>
                <div className="d-flex flex-column gap-3 mt-4">
                  <div className="badge bg-primary rounded-pill p-3 align-self-end shadow-sm" style={{ maxWidth: '80%', fontSize: '0.9rem' }}>
                    Do you have gluten-free cupcakes?
                  </div>
                  <div className="badge rounded-pill p-3 align-self-start shadow-sm" style={{ maxWidth: '80%', backgroundColor: '#f1f5f9', color: '#1a202c', fontSize: '0.9rem' }}>
                    Our vanilla cupcakes are gluten free.
                  </div>
                </div>
                <div className="position-absolute top-50 start-50 translate-middle">
                   <div className="bg-white rounded-circle p-4 shadow-lg pulse">
                      <MessageSquare className="text-danger" size={40} />
                   </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h1 className="fw-bold mb-4" style={{ fontSize: '3rem' }}>
                What it is: <br />
                <span className="text-danger">Personalized customer care</span>
              </h1>
              <p className="text-muted fs-5 lh-lg">
                Vyapaar Mitra uses AI to answer customer questions via text messages, 
                and seamlessly hands the conversation over to you or a team member when it needs help.
              </p>
              <div className="d-flex align-items-center gap-2 text-danger fw-bold mt-4">
                <CheckCircle2 size={20} /> Fully Automated Replies
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. FEATURES SECTION --- */}
      <section className="py-5" style={{ backgroundColor: '#fdf5d7' }}>
        <div className="container py-5">
          <h1 className="text-danger fw-bold mb-5 display-4">Features</h1>
          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white hover-shadow transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80" 
                  className="card-img-top" 
                  alt="Simple setup" 
                  style={{ height: '240px', objectFit: 'cover' }} 
                />
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3 fs-4">Simple setup</h5>
                  <p className="text-muted mb-4">
                    Setting up your customized Business Assistant is easy. To get started, answer a few simple questions and it's off and running.
                  </p>
                  <div className="d-flex justify-content-end">
                    <div className="border border-dark rounded-circle p-1  px-2 pb-2">
                      <Plus size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white hover-shadow transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
                  className="card-img-top" 
                  alt="Seamless assistance" 
                  style={{ height: '240px', objectFit: 'cover' }} 
                />
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3 fs-4">Seamless assistance</h5>
                  <p className="text-muted mb-4">
                    AI handles the repetitive tasks while you focus on scaling your business, building products, and managing customer relationships.
                  </p>
                  <div className="d-flex justify-content-end">
                    <div className="border border-dark rounded-circle p-1  px-2 pb-2">
                      <Plus size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white hover-shadow transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                  className="card-img-top" 
                  alt="Intelligent insights" 
                  style={{ height: '240px', objectFit: 'cover' }} 
                />
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3 fs-4">Intelligent insights</h5>
                  <p className="text-muted mb-4">
                    With each customer interaction, your Business Assistant gets smarter and provides valuable insights to help you level up your business.
                  </p>
                  <div className="d-flex justify-content-end">
                    <div className="border border-dark rounded-circle p-1  px-2 pb-2">
                      <Plus size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. BENEFITS SECTION --- */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <h1 className="text-danger fw-bold mb-5 display-4">Benefits</h1>
          <div className="row g-4 text-center">
            {/* Benefit 1 */}
            <div className="col-6 col-lg-3">
              <div className="p-4 rounded-4 h-100 d-flex flex-column align-items-center justify-content-center gap-3 shadow-sm hover-shadow transition-all" style={{ backgroundColor: '#fdfcf0', border: '1px solid #f1f5f9' }}>
                <Users className="text-danger" size={40} />
                <h5 className="fw-bold mb-0 px-2">Connect with your customers</h5>
                <Plus className="text-muted mt-2 opacity-50" size={16} />
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="col-6 col-lg-3">
              <div className="p-4 rounded-4 h-100 d-flex flex-column align-items-center justify-content-center gap-3 shadow-sm hover-shadow transition-all" style={{ backgroundColor: '#fdfcf0', border: '1px solid #f1f5f9' }}>
                <Clock className="text-danger" size={40} />
                <h5 className="fw-bold mb-0 px-2">Save time</h5>
                <Plus className="text-muted mt-2 opacity-50" size={16} />
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="col-6 col-lg-3">
              <div className="p-4 rounded-4 h-100 d-flex flex-column align-items-center justify-content-center gap-3 shadow-sm hover-shadow transition-all" style={{ backgroundColor: '#fdfcf0', border: '1px solid #f1f5f9' }}>
                <Zap className="text-danger" size={40} />
                <h5 className="fw-bold mb-0 px-2">Boost customer engagement</h5>
                <Plus className="text-muted mt-2 opacity-50" size={16} />
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="col-6 col-lg-3">
              <div className="p-4 rounded-4 h-100 d-flex flex-column align-items-center justify-content-center gap-3 shadow-sm hover-shadow transition-all" style={{ backgroundColor: '#fdfcf0', border: '1px solid #f1f5f9' }}>
                <TrendingUp className="text-danger" size={40} />
                <h5 className="fw-bold mb-0 px-2">Gain actionable insights</h5>
                <Plus className="text-muted mt-2 opacity-50" size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. FINAL CTA --- */}
      <section className="py-5 text-center bg-dark text-white">
        <div className="container py-5">
           <h2 className="fw-bold mb-4 display-6">Ready to empower your business with AI?</h2>
           <p className="text-secondary mb-5 fs-5">Join thousands of MSMEs growing with Vyapaar Mitra.</p>
           <button 
              className="btn btn-red rounded-pill px-5 py-3 fw-bold fs-5 shadow pulse"
              onClick={() => navigate('/agent')}
            >
              Start Free Demo
           </button>
        </div>
      </section>
    </div>
  );
};

export default Home;