# 🤝 Vyapaar Mitra (Business Friend)

**An AI-Powered Smart Business Assistant for Indian MSMEs.**

Vyapaar Mitra is a "Zero-Touch" AI copilot designed to help Indian shopkeepers, freelancers, and small business owners manage their daily operations. It bridges the gap between complex AI technology and non-technical users by offering a simple, mobile-first interface that understands **Hinglish**, business context, and voice commands.

![Project Status](https://img.shields.io/badge/Status-Prototype-orange)
![Tech Stack](https://img.shields.io/badge/Stack-HTML%20%7C%20Netlify%20Functions%20%7C%20Gemini%20AI-blue)

## 🚀 Key Features

* **🗣️ Voice-First Interface:** Built-in voice recognition optimized for Indian English accents, allowing users to speak instead of type.
* **🧠 4 Intelligent Modes (Auto-Detect):**
    * **📢 Marketing Mode:** Generates WhatsApp/Instagram posts with emojis, hashtags, and price anchoring. Includes DPDP compliance (Opt-out footers).
    * **📊 Data Analyst Mode:** Turns messy text/numbers into clear insights (Total Revenue, Top Items) and flags "Credit Gaps" or "Low Profit Margins".
    * **💬 Customer Reply Mode:** Drafts professional responses to angry or inquiring customers (Formal vs. Friendly options).
    * **✅ Task Planner Mode:** Organizes random thoughts into a prioritized To-Do list.
* **⚡ Quick Actions:** One-tap "Chips" for common tasks like "Payment Reminder", "Festival Wish", or "Handle Complaint".
* **🇮🇳 Localized Context:** Specifically tuned to speak "Hinglish" (Hindi + English) and use respectful Indian business terminology ("Boss", "Sir/Ma'am").
* **🔒 Secure Architecture:** API keys are hidden server-side using Netlify Functions, ensuring security.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Bootstrap 5), Client-side JavaScript.
* **Backend:** Node.js (Netlify Serverless Functions).
* **AI Model:** Google Gemini API (Flash Model).
* **Tools:** `marked.js` (Markdown rendering), Web Speech API.

## 📂 Project Structure

```bash
VyapaarMitra/
├── index.html                 # Main frontend UI (Chat interface)
├── package.json               # Dependencies (@google/generative-ai)
├── netlify/
│   └── functions/
│       └── generate.js        # Serverless backend (Handles API calls securely)
└── README.md                  # Project documentation
