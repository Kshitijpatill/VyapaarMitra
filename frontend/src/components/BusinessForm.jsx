import React, { useState } from 'react';

const BusinessForm = ({ onAddEntry }) => {
  const [formData, setFormData] = useState({
    day: '',
    revenue: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.day || !formData.revenue) return alert("Please fill all fields");
    
    onAddEntry(formData);
    setFormData({ day: '', revenue: '' }); // Clear form
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-bold small text-muted text-uppercase">Day (e.g., Sun)</label>
        <input 
          name="day"
          value={formData.day}
          className="form-control bg-light border-0 p-3"
          onChange={handleChange} 
          placeholder="Enter day"
          style={{ borderRadius: '12px' }}
        />
      </div>
      <div className="mb-4">
        <label className="form-label fw-bold small text-muted text-uppercase">Revenue (₹)</label>
        <input 
          name="revenue"
          type="number"
          value={formData.revenue}
          className="form-control bg-light border-0 p-3"
          onChange={handleChange} 
          placeholder="Enter revenue"
          style={{ borderRadius: '12px' }}
        />
      </div>
      <button type="submit" className="btn btn-red w-100 py-3 fw-bold shadow-sm">
        Update Dashboard
      </button>
    </form>
  );
};

export default BusinessForm;