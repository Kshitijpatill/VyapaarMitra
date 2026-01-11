import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, color, footerText }) => {
  // Check if growth is positive or negative for the icon color
  const isPositive = footerText?.includes('+');

  return (
    <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '16px' }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1 small uppercase fw-bold">{title}</p>
            <h3 className="mb-0 fw-bold">{value}</h3>
          </div>
          <div className={`p-2 rounded bg-light text-${color}`}>
            <Icon size={24} />
          </div>
        </div>
        
        {/* Render real dynamic footer text instead of hardcoded 12% */}
        {footerText && (
          <div className="mt-3 small">
            <span className={isPositive ? "text-success fw-bold" : "text-danger fw-bold"}>
              {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} 
              {footerText}
            </span>
            <span className="text-muted ms-1">Than yesterday</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;