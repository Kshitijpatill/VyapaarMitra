import React, { useState } from "react";
import {
  Zap,
  Lightbulb,
  Newspaper,
  Globe,
  MapPin,
  ExternalLink,
  Sparkles,
  BookOpen,
  Briefcase,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const Tips = () => {
  const [loadingHack, setLoadingHack] = useState(false);
  const [aiHack, setAiHack] = useState("");
  const userName = localStorage.getItem("vyapaarUserName") || "Partner";

  // Mock Data for News & Articles
  const businessNews = [
    {
      title: "New GST relaxation for MSMEs with turnover under 2Cr",
      source: "Economic Times",
      time: "2h ago",
      tag: "Regulation",
    },
    {
      title: "Digital India: 5M Small Businesses moved online in 2025",
      source: "LiveMint",
      time: "5h ago",
      tag: "Digital",
    },
    {
      title: "How to apply for SIDBI's new low-interest growth loan",
      source: "Business Standard",
      time: "1d ago",
      tag: "Finance",
    },
  ];

  const localNews = [
    {
      title: "Pune Market Association announces weekly Sunday cleanup",
      source: "Local News",
      area: "Pune",
      time: "3h ago",
    },
    {
      title: "New Wholesale Hub opening near PCMC next month",
      source: "Market Update",
      area: "PCMC",
      time: "1d ago",
    },
  ];

  // Function to generate a random "Smart Hack" using your existing logic
  const generateDailyHack = async () => {
    setLoadingHack(true);
    try {
      const response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            "Give me one specific, high-impact 'Business Hack' for an Indian MSME owner. Keep it under 100 words. Focus on either Marketing, Saving Money, or Customer Loyalty.",
          userName: userName,
        }),
      });
      const data = await response.json();
      setAiHack(data.output);
    } catch (error) {
      setAiHack(
        "Stay consistent with your WhatsApp Status updates to keep customers engaged!"
      );
    } finally {
      setLoadingHack(false);
    }
  };

  return (
    <div className="container py-5">
      {/* 1. HERO SECTION */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">
          Vyapaar <span className="accent-text">Hacks & Market Insights</span>
        </h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Everything {userName} needs to grow, stay informed, and lead the
          market.
        </p>
      </div>

      <div className="row g-4">
        {/* LEFT COLUMN: HACKS & TOOLKIT */}
        <div className="col-lg-8">
          {/* AI HACK GENERATOR */}
          <div
            className="card border-0 shadow-sm mb-4 p-4"
            style={{ borderRadius: "24px", background: "#ffffff" }}
          >
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-danger-subtle p-3 rounded-circle text-danger">
                <Zap size={28} />
              </div>
              <div>
                <h4 className="fw-bold mb-0">AI Growth Hack</h4>
                <p className="text-muted small mb-0">
                  Personalized strategy for your scale
                </p>
              </div>
            </div>
            {aiHack ? (
              <div
                className="alert bg-light border-0 p-4 mb-3"
                style={{ borderRadius: "15px" }}
              >
                <div dangerouslySetInnerHTML={{ __html: aiHack }} />
              </div>
            ) : (
              <p className="text-muted">
                Need a fresh idea to boost your sales today?
              </p>
            )}
            <button
              className="btn btn-red w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
              onClick={generateDailyHack}
              disabled={loadingHack}
            >
              {loadingHack ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <Sparkles size={18} />
              )}
              {aiHack ? "Generate Another Hack" : "Get My Daily Hack"}
            </button>
          </div>

          {/* CURATED TIPS GRID */}
          <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
            <Lightbulb className="text-warning" /> Pro Vyapaar Tips
          </h4>
          <div className="row g-3 mb-5">
            {[
              {
                title: "Price Anchoring",
                desc: "Show a higher 'MRP' next to your selling price to make the deal look irresistible.",
                icon: TrendingUp,
              },
              {
                title: "WhatsApp Lists",
                desc: "Use Broadcast lists instead of groups to maintain customer privacy and direct touch.",
                icon: BookOpen,
              },
              {
                title: "Combo Deals",
                desc: "Pair slow-moving items with bestsellers to clear inventory faster.",
                icon: Briefcase,
              },
            ].map((tip, i) => (
              <div key={i} className="col-md-4">
                <div
                  className="card h-100 border-0 shadow-sm p-3"
                  style={{ borderRadius: "18px" }}
                >
                  <tip.icon className="text-danger mb-2" size={24} />
                  <h6 className="fw-bold">{tip.title}</h6>
                  <p className="small text-muted mb-0">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FOUNDER'S TOOLKIT (SUPPORTING ARTICLES) */}
          <h4 className="fw-bold mb-4">
            Founder's <span className="accent-text">Toolkit</span>
          </h4>
          <div className="list-group list-group-flush shadow-sm rounded-4 overflow-hidden border-0 mb-5">
            {[
              {
                name: "MSME Udyam Registration Portal",
                link: "https://udyamregistration.gov.in/",
              },
              { name: "GST Portal Login", link: "https://www.gst.gov.in/" },
              { name: "Digital Marketing Guide for MSMEs", link: "#" },
              { name: "Compliance Checklist (DPDP Rules)", link: "#" },
            ].map((tool, i) => (
              <a
                key={i}
                href={tool.link}
                target="_blank"
                rel="noreferrer"
                className="list-group-item list-group-item-action p-3 d-flex justify-content-between align-items-center"
              >
                <span className="fw-medium">{tool.name}</span>
                <ExternalLink size={16} className="text-muted" />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: NEWS FEEDS */}
        <div className="col-lg-4">
          {/* MARKET NEWS */}
          <div
            className="card border-0 shadow-sm p-4 mb-4"
            style={{ borderRadius: "24px" }}
          >
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <Globe size={20} className="text-primary" /> Market News
            </h5>
            {businessNews.map((news, i) => (
              <div
                key={i}
                className="mb-4 pb-3 border-bottom last-child-border-0"
              >
                <span className="badge bg-primary-subtle text-primary mb-2">
                  {news.tag}
                </span>
                <h6 className="fw-bold mb-1 lh-base">{news.title}</h6>
                <div className="d-flex justify-content-between small text-muted">
                  <span>{news.source}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            ))}
            <button className="btn btn-outline-dark w-100 rounded-pill">
              View All News
            </button>
          </div>

          {/* LOCAL BUSINESS UPDATES */}
          <div
            className="card border-0 shadow-sm p-4"
            style={{ borderRadius: "24px", backgroundColor: "#fff" }}
          >
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <MapPin size={20} className="text-success" /> Local Updates
            </h5>
            {localNews.map((news, i) => (
              <div key={i} className="mb-3 p-3 bg-light rounded-3">
                <h6 className="fw-bold mb-1 small">{news.title}</h6>
                <div className="d-flex gap-2 small text-muted">
                  <span className="fw-bold text-success">{news.area}</span>
                  <span>•</span>
                  <span>{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
