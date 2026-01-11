import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  Megaphone,
  Download,
  Sparkles,
  Image as ImageIcon,
  Loader2,
  Share2,
  Instagram,
  Facebook,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";

const AdsGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [productInput, setProductInput] = useState("");
  const [copied, setCopied] = useState(false);

  // Default placeholder state to show something beautiful on first load
  const [adData, setAdData] = useState({
    headline: "Premium Quality Items",
    tagline: "Experience the best Indian craftsmanship at your doorstep.",
    imagePrompt:
      "Professional studio photo of traditional Indian handicrafts on a wooden table, warm sunlight, marigold petals, cinematic lighting, 8k resolution",
    footerText: "Contact us on WhatsApp",
  });

  const adRef = useRef(null);

  // 1. Generate Ad Concept using AI
  const handleGenerateConcept = async () => {
    if (!productInput.trim())
      return alert("Please describe your product first.");
    setLoading(true);
    try {
      const response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate an ad image concept for: "${productInput}". Use ADS_MODE logic.`,
          userName: localStorage.getItem("vyapaarUserName") || "Owner",
        }),
      });

      const data = await response.json();

      // IMPROVED REGEX: Find anything between { and } across multiple lines
      const jsonMatch = data.output.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        // Remove any accidental markdown like ```json if it's inside the match
        const cleanJson = jsonMatch[0].replace(/```json|```/g, "").trim();
        const parsedData = JSON.parse(cleanJson);
        setAdData(parsedData);
      } else {
        // If it fails, log the raw response to help us debug
        console.error("RAW AI OUTPUT:", data.output);
        throw new Error("AI output was not in JSON format.");
      }
    } catch (error) {
      console.error("Parsing Error:", error);
      alert(
        "The AI sent a message I couldn't understand. Try clicking 'Generate' again."
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. Download Functionality
  const handleDownloadImage = async () => {
    if (adRef.current === null) return;
    try {
      const dataUrl = await toPng(adRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `VyapaarAd-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  // 3. Sharing & Copy Logic
  const handleCopyCaption = () => {
    const fullCaption = `${adData.headline}: ${adData.tagline} ${adData.footerText}`;
    navigator.clipboard.writeText(fullCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `${adData.headline}\n${adData.tagline}\n\n${adData.footerText}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

  // Image URL constructed with refined Indian-market prompts
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    adData.imagePrompt
  )}?width=1024&height=1024&model=flux&nologo=true`;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">
          AI <span className="text-danger">Ad Studio</span>
        </h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Create professional, Indian-themed social media posts in one click.
        </p>
      </div>

      <div className="row g-5">
        {/* LEFT: INPUT FORM */}
        <div className="col-lg-5">
          <div
            className="card border-0 shadow-sm p-4 h-100"
            style={{ borderRadius: "24px" }}
          >
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <Megaphone size={22} className="text-danger" /> Create New Ad
            </h5>
            <div className="mb-4">
              <textarea
                className="form-control bg-light border-0 p-3"
                rows="5"
                placeholder="Describe your offer (e.g. 20% discount on Diwali sweets...)"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                style={{ borderRadius: "15px", resize: "none" }}
              />
            </div>
            <button
              className="btn btn-danger w-100 py-3 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2 shadow"
              onClick={handleGenerateConcept}
              disabled={loading}
            >
              {loading ? (
                <Loader2
                  size={20}
                  className="spinner-border spinner-border-sm"
                />
              ) : (
                <Sparkles size={20} />
              )}
              {loading ? "AI is Designing..." : "Generate Magic Ad"}
            </button>
          </div>
        </div>

        {/* RIGHT: PREVIEW & SHARING */}
        <div className="col-lg-7">
          <div className="d-flex flex-column align-items-center">
            {/* THE AD CANVAS */}
            <div
              ref={adRef}
              className="ad-canvas shadow-lg position-relative overflow-hidden mb-4"
              style={{
                width: "100%",
                maxWidth: "450px",
                aspectRatio: "1/1",
                borderRadius: "25px",
              }}
            >
              <img
                src={imageUrl}
                alt="AI Generated"
                className="w-100 h-100 object-fit-cover"
                crossOrigin="anonymous"
              />
              {/* Overlays styled for MSME professional branding */}
              <div
                className="position-absolute bottom-0 start-0 w-100 p-4"
                style={{
                  background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                  color: "white",
                }}
              >
                <h2 className="fw-bold mb-1" style={{ fontSize: "1.6rem" }}>
                  {adData.headline}
                </h2>
                <p className="small mb-2 opacity-90">{adData.tagline}</p>
                <span className="badge bg-danger px-3 py-2 rounded-pill small fw-bold">
                  {adData.footerText}
                </span>
              </div>
            </div>

            <div className="d-flex gap-2 mb-5">
              <button
                className="btn btn-dark rounded-pill px-4 fw-bold d-flex align-items-center gap-2"
                onClick={handleDownloadImage}
              >
                <Download size={18} /> Download PNG
              </button>
            </div>

            {/* SHARING SECTION */}
            <div className="w-100 border-top pt-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <Share2 size={18} className="text-danger" /> Instant Post to
                Social Media
              </h6>

              <div
                className="card bg-light border-0 p-3 mb-4"
                style={{ borderRadius: "15px" }}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="small fw-bold text-muted text-uppercase">
                    Generated Caption
                  </span>
                  <button
                    className="btn btn-sm btn-outline-dark border-0 p-1"
                    onClick={handleCopyCaption}
                  >
                    {copied ? (
                      <Check size={16} className="text-success" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                <p className="small mb-0 text-dark fst-italic">
                  "{adData.headline}: {adData.tagline} {adData.footerText}"
                </p>
              </div>

              <div className="d-flex gap-2 flex-wrap">
                <button
                  onClick={shareOnWhatsApp}
                  className="btn btn-success rounded-pill d-flex align-items-center gap-2 px-3 fw-bold shadow-sm"
                >
                  <MessageCircle size={18} /> WhatsApp
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="btn btn-primary rounded-pill d-flex align-items-center gap-2 px-3 fw-bold shadow-sm"
                  style={{ backgroundColor: "#1877F2" }}
                >
                  <Facebook size={18} /> Facebook
                </button>
                <button
                  onClick={() => window.open("https://instagram.com", "_blank")}
                  className="btn btn-danger rounded-pill d-flex align-items-center gap-2 px-3 fw-bold shadow-sm"
                  style={{
                    background:
                      "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  }}
                >
                  <Instagram size={18} /> Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsGenerator;
