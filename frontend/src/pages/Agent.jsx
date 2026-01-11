import React, { useState, useEffect, useRef } from 'react';
import { Mic, Sparkles, Copy, CheckCircle, RotateCcw, Paperclip, FileText, X } from 'lucide-react';
import { marked } from 'marked'; 

const Agent = () => {
  // --- State Management ---
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userName, setUserName] = useState('Owner');
  const [file, setFile] = useState(null); // New: Store the uploaded file
  const [showOutput, setShowOutput] = useState(false);

  // --- Refs for Voice and File Input ---
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  // --- 1. Initialization (Name & Voice) ---
  useEffect(() => {
    const storedName = localStorage.getItem('vyapaarUserName');
    if (storedName) {
      setUserName(storedName);
    } else {
      const name = prompt("Namaste! What is your name (or Business Name)?");
      const finalName = name?.trim() || "Owner";
      localStorage.setItem('vyapaarUserName', finalName);
      setUserName(finalName);
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };
    }
  }, []);

  // --- 2. Action: Toggle Listening ---
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice input not supported in this browser.");
      return;
    }
    try {
      if (isListening) recognitionRef.current.stop();
      else recognitionRef.current.start();
    } catch (e) {
      recognitionRef.current.stop();
    }
  };

  // --- 3. Action: Handle File Selection ---
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      alert("File is too large. Please upload a file smaller than 5MB.");
      return;
    }
    setFile(selectedFile);
  };

  // --- 4. Action: Call Netlify Function (Multimodal Support) ---
  const handleGenerate = async () => {
    if (!input.trim() && !file) {
      alert("Please describe your scenario or upload a file first.");
      return;
    }

    setIsLoading(true);
    setShowOutput(false);

    try {
      let fileData = null;
      let mimeType = null;

      // If a file is attached, convert it to Base64 for Gemini
      if (file) {
        const reader = new FileReader();
        fileData = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(file);
        });
        mimeType = file.type;
      }

      const response = await fetch('/.netlify/functions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input || "Analyze this business document/image and provide advice.",
          userName: userName,
          fileData: fileData, // Added for Multimodal support
          mimeType: mimeType   // Added for Multimodal support
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Server Error");

      setOutput(marked.parse(data.output));
      setShowOutput(true);
    } catch (error) {
      console.error("Error:", error);
      setOutput(`<div class="alert alert-danger">Error: ${error.message}</div>`);
      setShowOutput(true);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 5. Action: Reset and Copy ---
  const handleReset = () => {
    const name = prompt("Enter Your Name:");
    if (name) {
      localStorage.setItem('vyapaarUserName', name);
      setUserName(name);
    }
  };

  const handleCopy = () => {
    const textOnly = output.replace(/<[^>]*>/g, '');
    navigator.clipboard.writeText(textOnly);
    alert("Copied to clipboard!");
  };

  // --- Quick Actions with Red Accent Icons ---
  const quickActions = [
    { label: 'Sale Post', icon: 'fa-brands fa-whatsapp', text: 'Write a catchy WhatsApp sale message for ' },
    { label: 'Payment Reminder', icon: 'fa-solid fa-indian-rupee-sign', text: 'Draft a polite message asking for pending payment of Rs ' },
    { label: 'Handle Complaint', icon: 'fa-solid fa-comments', text: 'Draft a polite professional reply to this angry customer: ' },
    { label: 'Analyze Data', icon: 'fa-solid fa-chart-line', text: 'Analyze these sales numbers and give me insights: ' },
    { label: 'Festival Wish', icon: 'fa-solid fa-gift', text: 'Write a short festival greeting message for ' }
  ];

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2">AI Business <span className="accent-text">Assistant</span></h1>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <span className="text-muted fw-medium">Welcome, {userName}</span>
          <button className="btn btn-sm text-danger p-0 border-0" onClick={handleReset} title="Change Name">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: '950px', borderRadius: '24px', backgroundColor: '#ffffff' }}>
        <div className="card-body p-4 p-md-5">
          <label className="fw-bold small text-uppercase text-muted mb-3 d-block">Describe your business scenario</label>
          
          <div className="position-relative mb-4">
            <textarea 
              className="form-control border-0 bg-light p-4" 
              rows="5"
              placeholder="Type here, use voice, or upload a bill..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ borderRadius: '15px', resize: 'none', fontSize: '1.1rem', paddingBottom: '60px' }}
            />
            
            {/* File Upload Trigger & Preview */}
            <div className="position-absolute bottom-0 start-0 m-3 d-flex align-items-center gap-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="d-none" 
                onChange={onFileChange} 
                accept="image/*,.pdf,.txt" 
              />
              <button 
                className="btn btn-sm btn-white rounded-circle shadow-sm border" 
                onClick={() => fileInputRef.current.click()}
                title="Attach Document or Image"
              >
                <Paperclip size={20} className="text-secondary" />
              </button>
              
              {file && (
                <div className="badge bg-white text-dark border d-flex align-items-center gap-2 px-3 py-2 shadow-sm rounded-pill">
                  <FileText size={14} className="text-danger" /> 
                  <span className="small">{file.name.length > 15 ? file.name.substring(0, 12) + "..." : file.name}</span>
                  <X size={14} className="text-danger cursor-pointer" onClick={() => setFile(null)} />
                </div>
              )}
            </div>

            <button 
              className={`btn position-absolute bottom-0 end-0 m-3 rounded-circle shadow-sm ${isListening ? 'bg-danger text-white pulse' : 'bg-white text-danger border'}`}
              onClick={toggleListening}
              style={{ width: '45px', height: '45px' }}
            >
              <Mic size={24} />
            </button>
          </div>

          <div className="mb-4">
            <label className="form-label text-muted small fw-bold mb-2">Quick Actions (Click to fill)</label>
            <div className="prompt-scroll-container">
              {quickActions.map((action) => (
                <div 
                  key={action.label} 
                  className="prompt-chip" 
                  onClick={() => setInput(action.text)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Using Brand Red for icons */}
                  <i className={`${action.icon} me-2`} style={{ color: "var(--accent-red)" }}></i>
                  {action.label}
                </div>
              ))}
            </div>
          </div>

          <button 
            className="btn btn-red w-100 py-3 fs-5 shadow-sm fw-bold d-flex align-items-center justify-content-center gap-2"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? <><span className="spinner-border spinner-border-sm"></span> Analyzing Data...</> : <><Sparkles size={20} /> Generate Smart Advice</>}
          </button>
        </div>
      </div>

      {showOutput && (
        <div className="card shadow border-0 mx-auto mt-4" style={{ maxWidth: '950px', borderRadius: '20px', overflow: 'hidden' }}>
          <div className="card-header bg-success text-white py-3 px-4 d-flex justify-content-between align-items-center border-0">
            <div className="d-flex align-items-center gap-2">
              <CheckCircle size={20} /> <span className="fw-bold">AI Suggestion</span>
            </div>
            <button className="btn btn-sm btn-light text-success fw-bold rounded-pill" onClick={handleCopy}>
              <Copy size={16} className="me-1" /> Copy
            </button>
          </div>
          <div className="card-body p-4 p-md-5 bg-white">
            <div className="output-markdown" dangerouslySetInnerHTML={{ __html: output }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Agent;