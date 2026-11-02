import React, { useState, useEffect, useRef } from 'react';
import '../../styles/aiChatBot.css';

export default function AIChatBot({ dashboardType = 'phc_dashboard' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Setup initial conversation based on active dashboard
  const getInitialMessages = (type) => {
    switch (type) {
      case 'specialist_dashboard':
        return [
          {
            sender: 'bot',
            time: 'Just now',
            text: 'Welcome Dr. Ananya Varma. Specialist AI Assistant standing by. I can assist you with AJCC TNM oral staging, biopsy concordance review, histopathology analysis, and multi-disciplinary tumor board consults.',
            citation: 'AI Engine: Med-PaLM 2 / Multi-Spectral Oral ROI v3.4',
          },
        ];
      case 'district_admin_dashboard':
        return [
          {
            sender: 'bot',
            time: 'Just now',
            text: 'Namaskaram DMHO Dr. Venkateswara Rao. District Intelligence Copilot active. I have real-time monitoring on screening coverage across all 11 Mandals, Mobile Van GPS dispatches, and tribal habit epidemiology.',
            citation: 'Data Feed: ITDA Paderu HMIS & ABDM State Gateway',
          },
        ];
      case 'system_admin_dashboard':
        return [
          {
            sender: 'bot',
            time: 'Just now',
            text: 'System Copilot initialized. S. Ramakrishna, all 48 field edge nodes, SQLite-to-PostgreSQL sync queues, ABHA RSA cryptographic keys, and AI inference pipelines are operational.',
            citation: 'Telemetry: Zero-Trust Gateway & WAF Monitor',
          },
        ];
      default: // phc_dashboard
        return [
          {
            sender: 'bot',
            time: 'Just now',
            text: 'Hello Dr. Sandeep! I am your PHC Clinical AI Copilot. How can I assist you with patient screening, WHO oral lesion triage, reverse smoking risk analysis, or specialist referral protocols today?',
            citation: 'Model: On-Device MobileNetV3 + Cloud Dual Triage',
          },
        ];
    }
  };

  const getQuickChips = (type) => {
    switch (type) {
      case 'specialist_dashboard':
        return [
          'TNM Staging for Lateral Tongue Lesion',
          'Biopsy vs Brush Cytology Indications',
          'Erythroplakia Malignant Risk Protocol',
          'Schedule Virtual Tumor Board',
        ];
      case 'district_admin_dashboard':
        return [
          'Summarize 11-Mandal Screening Backlog',
          'Mobile Screening Van Fleet Status',
          'Reverse Smoking Epidemiological Hotspots',
          'Export ABDM Monthly Health Rollup',
        ];
      case 'system_admin_dashboard':
        return [
          'Verify Offline Edge Sync Queue',
          'Check ABHA Token RSA Key Status',
          'AI Multi-Model Ensemble Latency',
          'Inspect WAF Blocked IP Security Logs',
        ];
      default: // phc_dashboard
        return [
          'How to stage OSMF Grade II?',
          'Erythroplakia vs Leukoplakia triage',
          'Criteria for urgent Area Hospital referral',
          'Reverse smoking palatal keratosis guidelines',
        ];
    }
  };

  const [messages, setMessages] = useState(() => getInitialMessages(dashboardType));

  // Reset or re-greet when dashboard type changes
  useEffect(() => {
    setMessages(getInitialMessages(dashboardType));
  }, [dashboardType]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Intelligent domain knowledge responder
  const generateAIResponse = (query, type) => {
    const q = query.toLowerCase();

    // 1. OSMF (Oral Submucous Fibrosis)
    if (q.includes('osmf') || q.includes('fibrosis') || q.includes('trismus') || q.includes('mouth opening')) {
      return {
        text: `**Oral Submucous Fibrosis (OSMF) Clinical Triage:**
• **Etiology:** Chronic consumption of areca nut / betel quid with slaked lime.
• **Grading System:**
  - *Grade I:* Mild blanching, inter-incisal distance > 35 mm.
  - *Grade II:* Palpable vertical fibrous bands, inter-incisal distance 25–35 mm.
  - *Grade III:* Severe trismus, mouth opening 15–25 mm with burning sensation.
  - *Grade IV:* Extreme trismus < 15 mm, premalignant changes detected.
• **Recommended Actions:**
  1. Complete areca nut cessation counseling.
  2. Initiate antioxidant therapy (Lycopene 8mg + Micronutrients).
  3. Red-flag referral to Area Hospital Paderu if mouth opening is < 25 mm.`,
        citation: 'ICD-10-CM K13.5 | WHO Oral Health Guidelines',
      };
    }

    // 2. Erythroplakia / Leukoplakia
    if (q.includes('erythroplakia') || q.includes('leukoplakia') || q.includes('red patch') || q.includes('white patch')) {
      return {
        text: `**Oral Pre-Cancerous Lesion Comparison:**
• **Erythroplakia (Highest Malignant Risk):**
  - Clinical appearance: Fiery, velvety red patch with sharply demarcated borders.
  - **Malignant Transformation:** 85%–90% display severe dysplasia or carcinoma in situ at biopsy.
  - **Protocol:** Mandates immediate referral for punch biopsy at Specialist Center within 48 hours.
• **Leukoplakia:**
  - Homogeneous (flat, low risk ~5%) vs. Non-Homogeneous (speckled/verrucous, risk 15–25%).
  - Cannot be scraped off (distinguishes from oral candidiasis).
• **Action:** Capture multi-angle photos with color calibration, flag for Area Hospital Oncology review.`,
        citation: 'WHO Classification of Head & Neck Tumours 5th Ed.',
      };
    }

    // 3. Reverse Smoking (Chutta / Tribal specific)
    if (q.includes('reverse smoking') || q.includes('chutta') || q.includes('palatal') || q.includes('pika')) {
      return {
        text: `**Reverse Smoking ("Adda Poga / Chutta") Protocol:**
• **Habit Profile:** Common among tribal women and elders in Paderu and Araku valleys. The lighted end of the crude cigar is held inside the mouth.
• **Pathophysiology:**
  - Intense intra-oral combustion heat (120°C–140°C) coupled with concentrated tobacco pyrolysis toxins.
  - Direct mucosal insult targets the hard and soft palate.
• **Key Pathological Stages:**
  1. *Palatal Keratosis / Stomatitis Nicotina* (diffuse white palatal blanching with red ductal spots).
  2. *Palatal Ulceration / Reverse Smoker's Palate* (high risk of squamous cell carcinoma of hard palate).
• **Directive:** High-priority red-flag referral for any indurated or ulcerated palatal lesion.`,
        citation: 'Indian Journal of Cancer & ITDA Tribal Health Study',
      };
    }

    // 4. Referral / Specialist criteria
    if (q.includes('referral') || q.includes('criteria') || q.includes('urgent') || q.includes('red flag')) {
      return {
        text: `**Aarogya Drishti Outbound Referral Criteria:**
• **Immediate Red-Flag Triage (< 48 hrs):**
  1. Any non-healing oral ulcer lasting > 14 days without traumatic cause.
  2. Persistent red velvety lesion (Erythroplakia) or mixed speckled lesion.
  3. Palpable painless regional lymphadenopathy (cervical Level I/II nodes).
  4. Induration or fixation of underlying tissue upon palpation.
• **Referral Workflow:**
  - Generate ABHA M3 Referral Token.
  - Teleconsultation auto-queued for Dr. Ananya Varma at Area Hospital Paderu.
  - Patient SMS confirmation dispatched in Telugu and English.`,
        citation: 'Standard Treatment Guidelines - MoHFW India',
      };
    }

    // 5. TNM Staging
    if (q.includes('tnm') || q.includes('staging') || q.includes('tongue') || q.includes('buccal')) {
      return {
        text: `**AJCC 8th Edition TNM Staging (Oral Cavity):**
• **T (Tumor Size & Depth of Invasion - DOI):**
  - **T1:** Tumor ≤ 2 cm, DOI ≤ 5 mm.
  - **T2:** Tumor ≤ 2 cm with DOI > 5 mm, or 2–4 cm with DOI ≤ 10 mm.
  - **T3:** Tumor > 4 cm, or any tumor with DOI > 10 mm.
  - **T4a:** Moderately advanced local disease (invading cortical bone, tongue muscle).
• **N (Regional Nodes):** Evaluates ipsilateral vs contralateral nodes with Extranodal Extension (ENE).
• **Recommendation:** Multi-Disciplinary Tumor Board review with contrast CT of neck.`,
        citation: 'AJCC Cancer Staging Manual 8th Edition',
      };
    }

    // 6. Mobile Screening Van Fleet
    if (q.includes('van') || q.includes('fleet') || q.includes('mobile') || q.includes('camp')) {
      return {
        text: `**Live Mobile Screening Fleet Status (ITDA Paderu):**
• **VAN 01:** Araku Valley Agency (Hamlets 14–19) • 84 Screened today • Active.
• **VAN 02:** Chintapalli Agency Camp • 62 Screened today • En route to Gudem.
• **VAN 03:** Munchingiputtu Remote Border Transit • Setting up evening clinic.
• **VAN 04:** Paderu District HQ Base • Routine equipment sterilization & restock.
• **Equipment:** Each van is fitted with high-resolution oral endoscopes, offline edge AI tablet, and biopsy transport cold chain.`,
        citation: 'ITDA Mobile Healthcare Telemetry (Live GPS)',
      };
    }

    // 7. Offline Edge Sync & Infrastructure
    if (q.includes('sync') || q.includes('edge') || q.includes('offline') || q.includes('sqlite') || q.includes('latency')) {
      return {
        text: `**Zero-Connectivity Offline Edge Sync Architecture:**
• **Edge Node Protocol:** In remote tribal hamlets lacking cellular reception, oral scans and demographic EHR records are stored locally in an encrypted SQLite database on the health worker tablet.
• **AI Inference:** MobileNetV3 runs locally on WebAssembly with ~420ms inference latency.
• **Sync Mechanism:** When the vehicle reconnects to 4G/WAN, the MQTT edge broker executes a delta sync:
  - 342 offline batches uploaded today with 0% dropped packets.
  - Cloud PostgreSQL receives AES-256 GCM encrypted FHIR Observation resources.`,
        citation: 'Architecture Specification: ABDM Offline M2 Specification',
      };
    }

    // 8. ABHA, Security, Keys
    if (q.includes('abha') || q.includes('key') || q.includes('security') || q.includes('waf') || q.includes('rsa')) {
      return {
        text: `**ABDM Security & Cryptographic Compliance:**
• **Key Rotation:** 2048-bit RSA key pairs automatically rotated every 30 days via HashiCorp Vault HSM transit engine.
• **Compliance Status:** 100% compliant with ABDM M1, M2, and M3 milestones and DISHA healthcare privacy rules.
• **Firewall (WAF):** Zero unauthorized intrusion events. 1 external probe blocked and blacklisted at 09:58 AM today.`,
        citation: 'National Health Authority (NHA) Security Standards',
      };
    }

    // 9. District / Mandal Coverage
    if (q.includes('mandal') || q.includes('coverage') || q.includes('target') || q.includes('backlog')) {
      return {
        text: `**ITDA Paderu Mandal Screening Performance:**
• **District Total:** 14,820 of 18,000 target achieved (82.3% completion).
• **Top Performing Mandals:**
  1. *Paderu Central:* 87.5% (2,450 screened)
  2. *Araku Valley:* 84.8% (2,120 screened)
  3. *Chintapalli:* 83.6% (1,840 screened)
• **Focus Area:** Munchingiputtu (74.7%) requires Mobile Van #03 deployment for backlog clearance.`,
        citation: 'DMHO Monthly Health Intelligence Briefing',
      };
    }

    // Default Fallback
    return {
      text: `**Aarogya Drishti Clinical Analysis:**
Regarding your query on "${query}":
• **Context:** Active in ${type.replace('_', ' ').toUpperCase()} workflow.
• **Clinical Action:** Ensure patient ABHA ID is linked, capture standardized oral images under adequate lighting, and document lesion texture, borders, and habit history.
• **System Status:** All telemetry, specialist queues, and encrypted ABDM data conduits are operational.`,
      citation: 'Aarogya Drishti Clinical AI Engine v3.4',
    };
  };

  const handleSend = (textToSend = null) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMessage = {
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate clinical reasoning delay
    setTimeout(() => {
      const botResponse = generateAIResponse(text, dashboardType);
      const aiMessage = {
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: botResponse.text,
        citation: botResponse.citation,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 550);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const contextLabel = {
    phc_dashboard: 'PHC Medical Officer Copilot',
    specialist_dashboard: 'Oral Oncology Specialist Copilot',
    district_admin_dashboard: 'District Health Intelligence Copilot',
    system_admin_dashboard: 'Cloud Security & AI Ops Copilot',
  }[dashboardType] || 'Clinical AI Copilot';

  const quickChips = getQuickChips(dashboardType);

  return (
    <div className="ai-chatbot-wrapper">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          className="ai-chatbot-trigger"
          onClick={() => setIsOpen(true)}
          title="Open Drishti AI Copilot"
        >
          <div className="ai-trigger-icon">✨</div>
          <span>AI Copilot</span>
          <span className="ai-trigger-badge">Active</span>
        </button>
      )}

      {/* Main Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-left">
              <div className="ai-avatar-badge">
                <img
                  src="/logo.png"
                  alt="Aarogya Drishti"
                  className="ai-avatar-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="ai-header-meta">
                <h4>Drishti AI Copilot</h4>
                <div className="ai-header-status">
                  <span className="ai-status-dot"></span>
                  <span>Clinical Engine Active</span>
                </div>
              </div>
            </div>

            <div className="ai-header-actions">
              <button
                type="button"
                className="ai-btn-ghost"
                onClick={() => setMessages(getInitialMessages(dashboardType))}
                title="Clear Conversation"
              >
                🔄
              </button>
              <button
                type="button"
                className="ai-btn-ghost"
                onClick={() => setIsOpen(false)}
                title="Minimize Chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Context Banner */}
          <div className="ai-context-banner">
            <span className="ai-context-tag">
              <span>🩺</span> {contextLabel}
            </span>
            <span className="ai-model-tag">Med-AI 3.4</span>
          </div>

          {/* Messages Container */}
          <div className="ai-chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-message ${m.sender}`}>
                <div className="ai-msg-avatar">
                  {m.sender === 'bot' ? '✨' : '👤'}
                </div>
                <div className="ai-msg-bubble">
                  {/* Formatted body text */}
                  <div
                    style={{ whiteSpace: 'pre-line' }}
                    dangerouslySetInnerHTML={{
                      __html: m.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/•/g, '&bull;'),
                    }}
                  />
                  {m.citation && (
                    <div className="ai-citation-pill">
                      📑 {m.citation}
                    </div>
                  )}
                  <div className="ai-msg-time">{m.time}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-typing-indicator">
                <div className="ai-typing-dot"></div>
                <div className="ai-typing-dot"></div>
                <div className="ai-typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="ai-quick-chips-wrap">
            <div className="ai-quick-title">Suggested Inquiries</div>
            <div className="ai-quick-chips">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="ai-chip"
                  onClick={() => handleSend(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            className="ai-chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="ai-chat-input"
              placeholder="Ask Drishti AI clinical or system query..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="ai-chat-send-btn"
              disabled={!inputText.trim()}
              title="Send Message"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
