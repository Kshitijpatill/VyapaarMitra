import React, { useState, useMemo, useRef } from 'react';
import AnalyticsChart from '../components/AnalyticsChart';
import BusinessForm from '../components/BusinessForm';
import StatsCard from '../components/StatsCard';
import { TrendingUp, ShoppingCart, DollarSign, Trash2, FileUp, Sparkles } from 'lucide-react';

const Analytics = () => {
  const initialData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 6890 },
    { name: 'Sat', sales: 8390 },
  ];

  const [salesData, setSalesData] = useState(initialData);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);

  // --- CALCULATE DYNAMIC STATS ---
  const stats = useMemo(() => {
    const totalRevenue = salesData.reduce((acc, curr) => acc + Number(curr.sales), 0);
    const totalSalesCount = salesData.length;
    
    let growth = 0;
    if (salesData.length >= 2) {
      const current = salesData[salesData.length - 1].sales;
      const previous = salesData[salesData.length - 2].sales;
      growth = (((current - previous) / previous) * 100).toFixed(1);
    }

    return {
      totalRevenue: totalRevenue.toLocaleString('en-IN'),
      totalSalesCount,
      growth: growth > 0 ? `+${growth}%` : `${growth}%`
    };
  }, [salesData]);

  // --- SMART IMPORT LOGIC ---
  const handleImportClick = () => fileInputRef.current.click();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);
    try {
      // Convert file to Base64 for the API
      const reader = new FileReader();
      const base64Data = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
      });

      const response = await fetch('/.netlify/functions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: "Analyze this file and extract sales data. Return ONLY a JSON array of objects with 'day' and 'revenue' keys. Example: [{'day':'Mon', 'revenue':500}]",
          userName: "DataAnalyst",
          fileData: base64Data,
          mimeType: file.type
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Extract JSON array from AI response
      const jsonMatch = data.output.match(/\[.*\]/s);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        const formattedEntries = parsedData.map(item => ({
          name: item.day || item.name,
          sales: Number(item.revenue || item.sales)
        }));
        setSalesData(prev => [...prev, ...formattedEntries]);
      } else {
        throw new Error("Could not find sales data in the file.");
      }
    } catch (err) {
      alert("Smart Import failed: " + err.message);
    } finally {
      setIsImporting(false);
      event.target.value = null; // Reset input
    }
  };

  const addSalesEntry = (newEntry) => {
    setSalesData([...salesData, { name: newEntry.day, sales: parseInt(newEntry.revenue) }]);
  };

  const clearChart = () => {
    if (window.confirm("Are you sure you want to clear all chart data?")) {
      setSalesData([]);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h1 className="fw-bold mb-0">Business <span className="accent-text">Analytics</span></h1>
        
        <div className="d-flex gap-2">
          {/* Smart Import Button */}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="d-none" 
            onChange={handleFileChange} 
            accept="image/*,.csv,.txt,.pdf" 
          />
          <button 
            className="btn btn-dark rounded-pill d-flex align-items-center gap-2 fw-bold shadow-sm"
            onClick={handleImportClick}
            disabled={isImporting}
          >
            {isImporting ? <span className="spinner-border spinner-border-sm"></span> : <FileUp size={18} />}
            Smart Import
          </button>

          <button 
            className="btn btn-outline-danger rounded-pill d-flex align-items-center gap-2 fw-bold shadow-sm"
            onClick={clearChart}
          >
            <Trash2 size={18} /> Clear Chart
          </button>
        </div>
      </div>
      
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <StatsCard title="Total Revenue" value={`₹${stats.totalRevenue}`} icon={DollarSign} color="danger" />
        </div>
        <div className="col-md-4">
          <StatsCard title="Entries" value={stats.totalSalesCount} icon={ShoppingCart} color="dark" />
        </div>
        <div className="col-md-4">
          <StatsCard title="Last Growth" value={stats.growth} icon={TrendingUp} color="danger" footerText={stats.growth} />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '20px' }}>
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <Sparkles size={20} className="text-danger" /> Update Sales
            </h4>
            <BusinessForm onAddEntry={addSalesEntry} />
          </div>
        </div>
        
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '20px' }}>
            {salesData.length > 0 ? (
              <AnalyticsChart data={salesData} />
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted py-5">
                <Trash2 size={48} className="mb-3 opacity-25" />
                <p className="mb-0">No data available. Use Smart Import or add manually.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;