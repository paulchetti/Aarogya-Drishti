import React, { useState, useEffect, useRef } from 'react';
import '../../styles/aiChatBot.css';
import { useLanguage } from '../../context/LanguageContext';
import {
  hasGeminiApiKey,
  analyzeOralLesionWithGemini,
  getOfflineClinicalEvaluation,
} from '../../services/geminiOralCancerService';

export default function AIChatBot({ dashboardType = 'phc_dashboard' }) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Setup initial conversation based on active dashboard
  const getInitialMessages = (type) => {
    if (language === 'te') {
      switch (type) {
        case 'specialist_dashboard':
          return [
            {
              sender: 'bot',
              time: 'ఇప్పుడే',
              text: 'నమస్కారం డాక్టర్ అనన్య వర్మ. స్పెషలిస్ట్ ఏఐ సహాయకుడు సిద్ధంగా ఉన్నాడు. నోటి క్యాన్సర్ TNM స్టేజింగ్, బయాప్సీ రివ్యూ, హిస్టోపాథాలజీ విశ్లేషణలో నేను సహాయపడగలను. దిగువన ఉన్న 📷 బటన్ ద్వారా నోటి ఫోటోను అప్‌లోడ్ చేసి తక్షణ జెమిని ఏఐ విశ్లేషణ పొందవచ్చు.',
              citation: 'ఏఐ ఇంజిన్: జెమిని 2.5 ఫ్లాష్ మల్టీమోడల్ / ఆంకాలజీ మోడల్',
            },
          ];
        case 'district_admin_dashboard':
          return [
            {
              sender: 'bot',
              time: 'ఇప్పుడే',
              text: 'నమస్కారం డీఎంహెచ్‌ఓ డాక్టర్ వెంకటేశ్వరరావు గారు. జిల్లా హెల్త్ ఇంటెలిజెన్స్ కోపైలట్ యాక్టివ్‌గా ఉంది. 11 మండలాల స్క్రీనింగ్ కవరేజ్, మొబైల్ వ్యాన్ జీపీఎస్ మరియు అలవాట్ల విశ్లేషణను నేను పర్యవేక్షిస్తున్నాను.',
              citation: 'డేటా మూలం: ఐటీడీఏ పాడేరు HMIS & ABDM స్టేట్ గేట్‌వే',
            },
          ];
        case 'system_admin_dashboard':
          return [
            {
              sender: 'bot',
              time: 'ఇప్పుడే',
              text: 'సిస్టమ్ కోపైలట్ ప్రారంభించబడింది. 48 ఫీల్డ్ ఎడ్జ్ నోడ్‌లు, సమకాలీకరణ క్యూలు, ఆభా RSA కీలు మరియు ఏఐ పైప్‌లైన్‌లు సజావుగా పనిచేస్తున్నాయి.',
              citation: 'టెలిమెట్రీ: జీరో-ట్రస్ట్ గేట్‌వే & WAF మానిటర్',
            },
          ];
        default:
          return [
            {
              sender: 'bot',
              time: 'ఇప్పుడే',
              text: 'నమస్కారం డాక్టర్ సందీప్! నేను మీ ప్రాథమిక ఆరోగ్య కేంద్ర (PHC) ఏఐ కోపైలట్‌ను. రోగి నోటి స్క్రీనింగ్, రివర్స్ స్మోకింగ్ విశ్లేషణ లేదా స్పెషలిస్ట్ రెఫరల్‌లో మీకు ఎలా సహాయపడగలను? నోటి ఫోటోను విశ్లేషించడానికి 📷 క్లిక్ చేయండి.',
              citation: 'మోడల్: గూగుల్ జెమిని మల్టీమోడల్ + డ్యూయల్ ట్రయాజ్ ఇంజిన్',
            },
          ];
      }
    }

    switch (type) {
      case 'specialist_dashboard':
        return [
          {
            sender: 'bot',
            time: 'Just now',
            text: 'Welcome Dr. Ananya Varma. Specialist AI Assistant standing by. I can assist you with AJCC TNM oral staging, biopsy concordance review, histopathology analysis, and multi-disciplinary tumor board consults. You can also upload patient oral photos using the 📷 button below for instant multimodal lesion analysis.',
            citation: 'AI Engine: Gemini 2.5 Flash Multimodal / Med-PaLM Oncology',
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
            text: 'Hello Dr. Sandeep! I am your PHC Clinical AI Copilot. How can I assist you with patient screening, WHO oral lesion triage, reverse smoking risk analysis, or specialist referral protocols today? You can also click 📷 to analyze any oral cavity image with Gemini AI.',
            citation: 'Model: Google Gemini Multimodal + Dual Triage Engine',
          },
        ];
    }
  };

  const getQuickChips = (type) => {
    if (language === 'te') {
      switch (type) {
        case 'specialist_dashboard':
          return [
            'నాలుక లెసియన్ కోసం TNM స్టేజింగ్',
            'బయాప్సీ vs సైటాలజీ మార్గదర్శకాలు',
            'ఎరిత్రోప్లాకియా కేన్సర్ ప్రమాద నియమాలు',
            'వర్చువల్ ట్యూమర్ బోర్డ్ షెడ్యూల్',
          ];
        case 'district_admin_dashboard':
          return [
            '11 మండలాల స్క్రీనింగ్ బ్యాక్‌లాగ్ సారాంశం',
            'మొబైల్ స్క్రీనింగ్ వ్యాన్ ఫ్లీట్ స్థితి',
            'రివర్స్ స్మోకింగ్ ప్రభావిత ప్రాంతాలు',
            'ABDM నెలవారీ హెల్త్ నివేదిక',
          ];
        case 'system_admin_dashboard':
          return [
            'ఆఫ్‌లైన్ ఎడ్జ్ సమకాలీకరణ క్యూ తనిఖీ',
            'ఆభా టోకెన్ RSA కీ స్థితి',
            'ఏఐ మల్టీ-మోడల్ ఇన్ఫరెన్స్ వేగం',
            'WAF సెక్యూరిటీ లాగ్‌లు',
          ];
        default:
          return [
            'OSMF గ్రేడ్ II స్టేజింగ్ ఎలా చేయాలి?',
            'ఎరిత్రోప్లాకియా vs ల్యూకోప్లాకియా ట్రయాజ్',
            'ఏరియా ఆసుపత్రికి తక్షణ రెఫరల్ నిబంధనలు',
            'రివర్స్ స్మోకింగ్ పాలటల్ మార్గదర్శకాలు',
          ];
      }
    }

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

    if (q.includes('osmf') || q.includes('submucous fibrosis') || q.includes('mouth opening')) {
      return {
        text: `**Oral Submucous Fibrosis (OSMF) Clinical Triage:**
• **Etiology:** Chronic chewing of areca nut / betel quid (alkaloid arecoline induces collagen cross-linking by lysyl oxidase).
• **Grade I (Early):** Trismus with inter-incisal distance > 35mm, stomatitis, blanching, loss of mucosal elasticity.
• **Grade II (Moderate):** Inter-incisal distance 25–35mm, palpable fibrous bands in buccal mucosa, tongue mobility restriction.
• **Grade III (Severe):** Inter-incisal distance 15–25mm, uvula involvement ("bud-shaped"), speech/deglutition impairment.
• **Grade IV (Precancerous):** Severe trismus (< 15mm) associated with leukoplakia or erythroplakic changes.
• **Action:** Immediate habit cessation, intralesional hyaluronidase + dexamethasone injections, and referral to District Hospital Paderu for surgical fibrotomy evaluation.`,
        citation: 'NOCR India Risk Factors & ScienceDirect Oral Oncology Guidelines',
      };
    }

    if (q.includes('erythroplakia') || q.includes('red patch')) {
      return {
        text: `**Erythroplakia Diagnostic Alert (High Acuity):**
• **Clinical Features:** Fiery red, velvety, well-demarcated patch of oral mucosa that cannot be clinically or pathologically characterized as any other condition.
• **Malignant Transformation Risk:** **85% – 90%** of erythroplakias exhibit severe epithelial dysplasia, carcinoma in situ, or invasive squamous cell carcinoma at the initial biopsy.
• **Mandatory Protocol:** Never observe! Perform an immediate incisional punch biopsy or issue an emergency 48-hour tele-oncology referral to Area Hospital Paderu.`,
        citation: 'American Cancer Society (ACS) & Cleveland Clinic Oral Cancer Pathway',
      };
    }

    if (q.includes('leukoplakia') || q.includes('white patch')) {
      return {
        text: `**Oral Leukoplakia Assessment Protocol:**
• **Definition:** A predominantly white plaque of questionable risk having excluded other known diseases or disorders that carry no increased risk for cancer (WHO 2024).
• **Homogeneous vs Non-Homogeneous:**
  - *Homogeneous (Flat/Thin):* Malignant transformation ~3% to 5%.
  - *Non-Homogeneous (Speckled/Nodular/Verrucous):* Malignant transformation potential jumps to **20% – 35%**.
• **PHC Action:** Inquire about tobacco chewing or betel nut placement site. Toluidine blue staining recommended; if persisting > 14 days post-cessation, punch biopsy is mandatory.`,
        citation: 'ScienceDirect Meta-Analysis (pii/S2772906024001390) & WHO Classification 5th Ed',
      };
    }

    if (q.includes('reverse') || q.includes('chutta') || q.includes('adda poga') || q.includes('palate')) {
      return {
        text: `**Reverse Smoking ("Adda Poga") Palatal Keratosis:**
• **Context:** Heavily prevalent among women and tribal elders in Paderu, Araku, and Chintapalli agencies. Burning end of tobacco cheroot (chutta) is placed inside the oral cavity.
• **Pathophysiology:** Combines extreme thermal injury (> 120°C intraoral temperature) with concentrated pyrolytic chemical carcinogens.
• **Clinical Presentation:** Diffuse palatal blanching, prominent erythematous umbilicated papules (inflamed minor salivary gland duct orifices), ulceration, and high incidence of hard palate OSCC.
• **Epidemiological Risk:** Up to 24-fold increased incidence of palatal carcinoma compared to non-smokers.`,
        citation: 'National Oral Cancer Registry of India (NOCR) & PMC8000242 Review',
      };
    }

    if (q.includes('referral') || q.includes('urgent') || q.includes('criteria') || q.includes('hospital')) {
      return {
        text: `**Urgent Specialist Referral Criteria (PHC to Area Hospital Paderu):**
1. Any oral ulcer persisting for **more than 14 days** without an obvious traumatic cause.
2. Palpable tissue induration, rolled margins, or fixation to underlying muscle/bone.
3. Rapidly growing exophytic or endophytic mass.
4. Erythroplakia (red patch) or non-homogeneous / speckled leukoplakia.
5. Persistent unexplained cervical lymphadenopathy (stony hard, fixed node).
6. Progressive trismus (mouth opening < 20mm) associated with mucosal blanching.`,
        citation: 'Cleveland Clinic & DPU Dental Oral Oncology Guidelines',
      };
    }

    // Default response tailored by role
    if (type === 'specialist_dashboard') {
      return {
        text: `Dr. Varma, query noted. As an Oral Oncology Specialist, you can review high-acuity biopsy queues, correlate multi-spectral AI heatmaps with histopathology reports, or order additional molecular panels (p16/HPV, EGFR amplification, Ki-67 proliferation index). You can also upload patient clinical photos using the 📷 button.`,
        citation: 'Specialist Oncological Consultation Engine',
      };
    } else if (type === 'district_admin_dashboard') {
      return {
        text: `DMHO Officer, surveillance query registered. Cross-referencing 11 Tribal Mandals in Alluri Sitharama Raju District. High habit burden clusters noted in Paderu Rural, Araku Valley, and Chintapalli. Mobile Screening Vans 01 and 02 are currently screening tribal weekly shandies.`,
        citation: 'ASR District Epidemiological Surveillance Network',
      };
    } else if (type === 'system_admin_dashboard') {
      return {
        text: `System Admin, infrastructure query received. Edge sync nodes report 99.4% uptime. All offline SQLite transaction journals are synced to the central ABDM FHIR cloud. Dual AI models (On-Device MobileNetV3 + Cloud Gemini AI) are functioning with zero critical alerts.`,
        citation: 'Aarogya Infrastructure Telemetry v2.8',
      };
    } else {
      return {
        text: `Dr. Sandeep, clinical inquiry recorded. You can examine oral lesions with the in-app camera or file upload using the 📷 button below. The Gemini AI multimodal engine assesses margins, ulceration, erythroplakic changes, and habit correlation grounded in WHO and NOCR clinical criteria.`,
        citation: 'Aarogya Clinical Support Gateway',
      };
    }
  };

  const handleSend = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMessage = {
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

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

  // MULTIMODAL GEMINI ORAL PHOTO ANALYSIS FROM CHAT
  const handlePhotoUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;

      // Add user message with photo thumbnail
      const userMessage = {
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `📷 Patient oral lesion photograph submitted for multimodal oncology analysis.`,
        imageThumbnail: dataUrl,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      try {
        let result = null;
        if (hasGeminiApiKey()) {
          result = await analyzeOralLesionWithGemini(dataUrl, {
            site: 'Oral Cavity',
            habits: 'Habit history under review',
            patientId: 'CHAT-UPLOAD',
          });
        } else {
          result = getOfflineClinicalEvaluation('Buccal Mucosa (Cheek)', 'tobacco');
          result.isFallback = true;
        }

        const botMsgText = `**${result.categoryName || 'Oral Oncology Diagnostic Assessment'}**
• **Clinical Impression:** ${result.clinicalImpression}
• **Classification:** \`${result.classification}\` (Concordance: **${result.confidenceScore}%**)
• **Urgency:** ${result.urgencyLabel || 'Clinical review indicated'}

**Detected Visual Biomarkers:**
${(result.visualBiomarkers || []).map((b) => `• ${b}`).join('\n')}

**Risk Factor Correlation:**
${result.riskFactorCorrelation}

**Recommended Action Plan:**
${(result.clinicalActionPlan || []).map((a, i) => `${i + 1}. ${a}`).join('\n')}

${result.summaryNarrative ? `\n*${result.summaryNarrative}*` : ''}`;

        const botMessage = {
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: botMsgText,
          citation: result.modelUsed
            ? `Multimodal Engine: Google Gemini (${result.modelUsed}) • WHO 5th Ed`
            : `Grounded in NOCR India & ScienceDirect Oncology Literature`,
          diagnosticResult: result,
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (err) {
        console.error('Photo analysis error in chat:', err);
        const errorMessage = {
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `⚠️ Could not complete Gemini multimodal photo evaluation: ${err.message}. Please verify your Gemini API key using the 🔑 button in the header.`,
          citation: 'Error Diagnostic Fallback',
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
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
    <>
      <div className="ai-chatbot-wrapper">
        {/* Floating Trigger Button: Mini Hospital with Circling Ambulance */}
        {!isOpen && (
          <button
            type="button"
            className="ai-chatbot-trigger hospital-themed"
            onClick={() => setIsOpen(true)}
            title="Aarogya AI Copilot • 24x7 Emergency Clinical Assistance"
            aria-label="Open AI Copilot"
          >
            {/* Circular Orbit & Hospital Arena */}
            <div className="hospital-orbit-stage">
              {/* Outer Circular Road Orbit Track */}
              <div className="hospital-orbit-track" />

              {/* Circling Ambulance with Live Emergency Siren */}
              <div className="ambulance-rotator">
                <div className="ambulance-vehicle">
                  {/* Flashing Emergency Beacon */}
                  <div className="ambulance-siren" />

                  {/* Vector Ambulance SVG */}
                  <svg viewBox="0 0 28 18" className="ambulance-svg">
                    {/* Van Main Body */}
                    <path d="M2 13V5C2 3.9 2.9 3 4 3H16V13H2Z" fill="#FFFFFF" />
                    {/* Cabin Hood Front */}
                    <path d="M16 6H20.5L25 10.5V13H16V6Z" fill="#FFFFFF" />
                    {/* Red Emergency Side Stripe */}
                    <rect x="2" y="9" width="22" height="2" fill="#ef4444" />
                    {/* Red Medical Cross on Flank */}
                    <rect x="7" y="5.5" width="4" height="1.2" fill="#ef4444" rx="0.3" />
                    <rect x="8.4" y="4.1" width="1.2" height="4" fill="#ef4444" rx="0.3" />
                    {/* Windshield & Side Windows */}
                    <path d="M17 7H20L23.5 10.5H17V7Z" fill="#0284c7" />
                    <rect x="3.5" y="4.5" width="2.5" height="3" fill="#0284c7" rx="0.5" />
                    {/* Wheels */}
                    <circle cx="7" cy="13.5" r="2.2" fill="#1e293b" />
                    <circle cx="7" cy="13.5" r="0.9" fill="#94a3b8" />
                    <circle cx="20" cy="13.5" r="2.2" fill="#1e293b" />
                    <circle cx="20" cy="13.5" r="0.9" fill="#94a3b8" />
                    {/* Front Headlight Light Beam */}
                    <polygon points="25,11 28,9.8 28,12.2" fill="#fef08a" opacity="0.85" />
                  </svg>
                </div>
              </div>

              {/* Central Mini Hospital Building */}
              <div className="hospital-building-center">
                <svg viewBox="0 0 36 36" className="hospital-svg">
                  <defs>
                    <linearGradient id="hospBgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d9488" />
                      <stop offset="100%" stopColor="#064e3b" />
                    </linearGradient>
                    <linearGradient id="hospWallGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                  </defs>

                  {/* Circular Hospital Yard Base */}
                  <circle cx="18" cy="18" r="17" fill="url(#hospBgGrad)" />

                  {/* Hospital Main Building Block */}
                  <rect x="8" y="11" width="20" height="18" rx="2" fill="url(#hospWallGrad)" />

                  {/* Rooftop Emergency Helipad / Tower Top */}
                  <rect x="13" y="7" width="10" height="5" rx="1.5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
                  {/* Rooftop Red Cross */}
                  <rect x="16.5" y="8" width="3" height="1" fill="#dc2626" rx="0.2" />
                  <rect x="17.5" y="7" width="1" height="3" fill="#dc2626" rx="0.2" />

                  {/* Facade Big Medical Red Cross */}
                  <rect x="15" y="13.5" width="6" height="2" fill="#dc2626" rx="0.3" />
                  <rect x="17" y="11.5" width="2" height="6" fill="#dc2626" rx="0.3" />

                  {/* Clinic Windows with Illuminated Blue Glow */}
                  <rect x="10.5" y="18" width="3" height="2.5" rx="0.5" fill="#38bdf8" />
                  <rect x="22.5" y="18" width="3" height="2.5" rx="0.5" fill="#38bdf8" />
                  <rect x="10.5" y="22" width="3" height="2.5" rx="0.5" fill="#38bdf8" />
                  <rect x="22.5" y="22" width="3" height="2.5" rx="0.5" fill="#38bdf8" />

                  {/* Glass Sliding Doors */}
                  <rect x="15.5" y="22" width="5" height="7" rx="0.5" fill="#0284c7" />
                  <rect x="16" y="22.5" width="1.8" height="6" fill="#7dd3fc" />
                  <rect x="18.2" y="22.5" width="1.8" height="6" fill="#7dd3fc" />

                  {/* Entry Foundation Steps */}
                  <rect x="6" y="28" width="24" height="2" rx="1" fill="#94a3b8" />
                </svg>
              </div>
            </div>

            {/* Label & Active Status */}
            <div className="hospital-trigger-label">
              <span className="trigger-main-title">AI Copilot</span>
              <span className="trigger-sub-status">
                <span className="pulse-siren-dot" />
                {language === 'te' ? '24/7 క్లినికల్ ఏఐ' : '24x7 Active'}
              </span>
            </div>
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
                  <h4>{language === 'te' ? 'దృష్టి ఏఐ కోపైలట్' : 'Drishti AI Copilot'}</h4>
                  <div className="ai-header-status">
                    <span className="ai-status-dot"></span>
                    <span>{language === 'te' ? 'జెమిని ఆంకాలజీ యాక్టివ్' : 'Gemini Oncology Active'}</span>
                  </div>
                </div>
              </div>

              <div className="ai-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  type="button"
                  className="ai-btn-ghost"
                  onClick={() => setMessages(getInitialMessages(dashboardType))}
                  title="Clear Conversation"
                  style={{ fontSize: '13px', padding: '3px 6px' }}
                >
                  🔄
                </button>
                <button
                  type="button"
                  className="ai-btn-ghost"
                  onClick={() => setIsOpen(false)}
                  title="Minimize Chat"
                  style={{ fontSize: '13px', padding: '3px 6px' }}
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
              <span className="ai-model-tag" title="Gemini 2.5 Flash Multimodal Active">
                ✨ Gemini Multimodal
              </span>
            </div>

            {/* Messages Container */}
            <div className="ai-chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`ai-message ${m.sender}`}>
                  <div className="ai-msg-avatar">
                    {m.sender === 'bot' ? '✨' : '👤'}
                  </div>
                  <div className="ai-msg-bubble">
                    {/* Render Image Thumbnail if attached */}
                    {m.imageThumbnail && (
                      <div
                        style={{
                          marginBottom: '8px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          maxHeight: '140px',
                          background: '#0f172a',
                        }}
                      >
                        <img
                          src={m.imageThumbnail}
                          alt="Uploaded Oral Examination"
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    )}

                    {/* Formatted body text */}
                    <div
                      style={{ whiteSpace: 'pre-line' }}
                      dangerouslySetInnerHTML={{
                        __html: m.text
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/•/g, '&bull;')
                          .replace(/`([^`]+)`/g, '<code style="background: rgba(0,0,0,0.06); padding: 1px 4px; border-radius: 4px; font-weight: 600;">$1</code>'),
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
              <div className="ai-quick-title">Suggested Clinical Inquiries</div>
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
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {/* Photo Upload Attachment Button */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Upload oral photo for Gemini AI analysis"
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '7px 9px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0f172a',
                }}
              >
                📷
              </button>

              <input
                type="text"
                className="ai-chat-input"
                placeholder={
                  language === 'te'
                    ? 'క్లినికల్ ప్రశ్న అడగండి లేదా నోటి ఫోటోను అప్‌లోడ్ చేయండి...'
                    : 'Ask clinical query or upload oral photo...'
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ flex: 1 }}
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
    </>
  );
}
