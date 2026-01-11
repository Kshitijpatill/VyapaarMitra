import React, { useState, useRef } from 'react';
import { 
  User, Building, Phone, MapPin, 
  Camera, Save, CheckCircle2, 
  Briefcase, Users, Target, Info
} from 'lucide-react';

const Profile = () => {
  const fileInputRef = useRef(null);
  
  // Initialize state from localStorage
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('vyapaarProfile');
    return saved ? JSON.parse(saved) : {
      name: localStorage.getItem('vyapaarUserName') || "Owner",
      businessName: "",
      category: "Select Category",
      phone: "",
      location: "",
      profilePic: null,
      customerType: "",
      businessGoals: ""
    };
  });

  const [showSavedToast, setShowSavedToast] = useState(false);

  // Calculate Profile Completeness %
  const completeness = Object.values(profile).filter(v => v && v !== "").length;
  const totalFields = Object.keys(profile).length;
  const percentComplete = Math.round((completeness / totalFields) * 100);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('vyapaarProfile', JSON.stringify(profile));
    localStorage.setItem('vyapaarUserName', profile.name); // Sync with AI Agent
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="container py-5">
      {/* 1. TOAST NOTIFICATION - MOVED TO BOTTOM RIGHT */}
      {showSavedToast && (
        <div className="position-fixed bottom-0 end-0 m-4 p-3 bg-success text-white rounded-3 shadow-lg z-3 d-flex align-items-center gap-2 animate__animated animate__fadeInUp">
          <CheckCircle2 size={20} /> Business Profile Saved!
        </div>
      )}

      <div className="row justify-content-center">
        {/* REDUCED WIDTH: From col-lg-11 to col-lg-8 for a more focused look */}
        <div className="col-lg-8">
          
          {/* 2. COMPACT HEADER CARD */}
          <div className="card border-0 shadow-sm overflow-hidden mb-4" style={{ borderRadius: '24px' }}>
            <div className="bg-red p-4" style={{ height: '100px' }}>
               <div className="text-white d-flex align-items-center justify-content-between">
                  <span className="small fw-bold text-uppercase opacity-75">Profile Strength</span>
                  <span className="small fw-bold">{percentComplete}%</span>
               </div>
               <div className="progress mt-2" style={{ height: '6px', background: 'rgba(255,255,255,0.2)' }}>
                  <div className="progress-bar bg-white" style={{ width: `${percentComplete}%` }}></div>
               </div>
            </div>
            
            <div className="card-body pt-0 text-center position-relative">
              <div className="mt-n5 mb-3 position-relative d-inline-block">
                <div className="rounded-circle border border-4 border-white shadow-sm overflow-hidden bg-white" style={{ width: '110px', height: '110px' }}>
                  {profile.profilePic ? (
                    <img src={profile.profilePic} alt="Profile" className="w-100 h-100 object-fit-cover" />
                  ) : (
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light text-secondary">
                      <User size={40} />
                    </div>
                  )}
                </div>
                <input type="file" ref={fileInputRef} className="d-none" accept="image/*" onChange={handleImageUpload} />
                <button 
                  className="btn btn-dark btn-sm rounded-circle position-absolute bottom-0 end-0 p-2 shadow"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Camera size={14} />
                </button>
              </div>
              <h4 className="fw-bold mb-1">{profile.name}</h4>
              <p className="text-muted small">{profile.businessName || "Your Business Mitra"}</p>
            </div>
          </div>

          {/* 3. BUSINESS DISCOVERY & DATA FORM */}
          <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '24px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <Briefcase size={20} className="text-danger" /> Business Details
              </h5>
              <button className="btn btn-red rounded-pill px-4 fw-bold shadow-sm" onClick={handleSave}>
                <Save size={18} className="me-2" /> Update Profile
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="small fw-bold text-muted text-uppercase mb-1">Contact Name</label>
                <input className="form-control bg-light border-0 py-2" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
              </div>
              <div className="col-md-6">
                <label className="small fw-bold text-muted text-uppercase mb-1">Business Category</label>
                <select className="form-select bg-light border-0 py-2" value={profile.category} onChange={e => setProfile({...profile, category: e.target.value})}>
                  <option>Select Category</option>
                  <option>Grocery/Kirana</option>
                  <option>Fashion/Boutique</option>
                  <option>Cafe/Restaurant</option>
                  <option>Consulting/Service</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="small fw-bold text-muted text-uppercase mb-1">Phone Number</label>
                <input className="form-control bg-light border-0 py-2" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} placeholder="+91" />
              </div>
              <div className="col-md-6">
                <label className="small fw-bold text-muted text-uppercase mb-1">City/Location</label>
                <input className="form-control bg-light border-0 py-2" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
              </div>
              
              <div className="col-12 mt-3 pt-3 border-top">
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <Target size={18} className="text-danger" /> Growth Insights
                </h6>
                <div className="mb-3">
                  <label className="small fw-bold text-muted text-uppercase mb-1">Target Customers</label>
                  <textarea 
                    className="form-control bg-light border-0" 
                    rows="2" 
                    placeholder="Who is your main customer? (e.g. Young professionals in Pune)"
                    value={profile.customerType}
                    onChange={e => setProfile({...profile, customerType: e.target.value})}
                  />
                </div>
                <div>
                  <label className="small fw-bold text-muted text-uppercase mb-1">Main Business Goal</label>
                  <textarea 
                    className="form-control bg-light border-0" 
                    rows="2" 
                    placeholder="E.g. I want to increase my monthly sales by 20% using WhatsApp marketing."
                    value={profile.businessGoals}
                    onChange={e => setProfile({...profile, businessGoals: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;