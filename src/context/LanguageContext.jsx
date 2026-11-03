import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const LanguageContext = createContext();

// Master Comprehensive Dictionary mapping ANY English string/phrase across the app to Telugu
export const MASTER_TELUGU_DICTIONARY = {
  // Brand & Header
  'AAROGYA DRISHTI': 'ఆరోగ్య దృష్టి',
  'Arogya Drishti': 'ఆరోగ్య దృష్టి',
  'Aarogya Drishti': 'ఆరోగ్య దృష్టి',
  'EARLY CARE. BETTER TOMORROWS.': 'ముందస్తు సంరక్షణ • మెరుగైన రేపు.',
  'Early Care. Better Tomorrows.': 'ముందస్తు సంరక్షణ • మెరుగైన రేపు.',
  'CITIZEN CARE PORTAL': 'పౌర సంరక్షణ పోర్టల్',
  'Citizen Care Portal': 'పౌర సంరక్షణ పోర్టల్',
  'Citizen Portal': 'పౌర పోర్టల్',
  'PHC Dashboard': 'ప్రాథమిక ఆరోగ్య కేంద్రం (PHC) డాష్‌బోర్డ్',
  'Specialist Dashboard': 'స్పెషలిస్ట్ డాష్‌బోర్డ్',
  'District Administrator Dashboard': 'జిల్లా అడ్మినిస్ట్రేటర్ డాష్‌బోర్డ్',
  'System Administrator Dashboard': 'సిస్టమ్ అడ్మినిస్ట్రేటర్ డాష్‌బోర్డ్',
  'ANM Portal': 'ఏఎన్‌ఎం (ANM) పోర్టల్',
  'Doctor Portal': 'వైద్యుల పోర్టల్',
  'ITDA Paderu • Alluri Sitharama Raju District': 'ఐటీడీఏ పాడేరు • అల్లూరి సీతారామరాజు జిల్లా',
  'Online (ABDM Cloud)': 'ఆన్‌లైన్ (ABDM క్లౌడ్)',
  'Offline Mode (Edge Storage)': 'ఆఫ్‌లైన్ మోడ్ (ఎడ్జ్ స్టోరేజ్)',
  'Sync Queue: 0 Pending': 'సమకాలీకరణ క్యూ: 0 పెండింగ్',
  'Open Dashboard': 'డాష్‌బోర్డ్ తెరవండి',
  'Select Dashboard / Portal': 'డాష్‌బోర్డ్ / పోర్టల్ ఎంచుకోండి',
  'Quick Access': 'శీఘ్ర ప్రవేశం',
  'Menu': 'మెనూ',
  'Logout': 'లాగౌట్',
  'Log out of citizen portal': 'పౌర పోర్టల్ నుండి లాగౌట్ అవ్వండి',
  'Need help?': 'సహాయం కావాలా?',
  'Your information is protected': 'మీ సమాచారం భద్రంగా రక్షించబడింది',
  'Accessibility': 'యాక్సెసిబిలిటీ',
  'Text Size': 'అక్షరాల పరిమాణం',

  // Auth & Login
  'WELCOME BACK': 'తిరిగి స్వాగతం',
  'Good to see you again.': 'మిమ్మల్ని మళ్ళీ కలవడం ఆనందంగా ఉంది.',
  'Good to see': 'మిమ్మల్ని మళ్ళీ కలవడం',
  'you again.': 'ఆనందంగా ఉంది.',
  'Sign in to continue to your secure healthcare workspace.': 'మీ సురక్షిత ఆరోగ్య కార్యస్థలానికి లాగిన్ అవ్వండి.',
  'Email address': 'ఈమెయిల్ చిరునామా',
  'Enter your email': 'మీ ఈమెయిల్ నమోదు చేయండి',
  'Password': 'పాస్‌వర్డ్',
  'Enter your password': 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
  'Show': 'చూపించు',
  'Hide': 'దాచు',
  'Forgot password?': 'పాస్‌వర్డ్ మర్చిపోయారా?',
  'Remember me': 'నన్ను గుర్తుంచుకో',
  'Log in securely': 'సురక్షితంగా లాగిన్ అవ్వండి',
  'Log in securely →': 'సురక్షితంగా లాగిన్ అవ్వండి →',
  '⚡ Demo Citizen Login': '⚡ పౌర డెమో లాగిన్',
  '⚡ Demo Doctor Login': '⚡ వైద్యుల డెమో లాగిన్',
  'or continue with': 'లేదా వీటితో లాగిన్ అవ్వండి',
  'A HEALTHIER TOMORROW STARTS HERE': 'ఆరోగ్యవంతమైన రేపటి ప్రయాణం ఇక్కడే ప్రారంభం',
  'Hello, there!': 'నమస్కారం, హలో!',
  'Hello,': 'నమస్కారం,',
  'there!': 'హలో!',
  'New to Aarogya Drishti? Create an account to get started.': 'ఆరోగ్య దృష్టికి కొత్తవారా? ఖాతా సృష్టించండి.',
  'Citizen login': 'పౌర లాగిన్',
  'Employee login': 'సిబ్బంది లాగిన్',
  'Welcome back!': 'తిరిగి స్వాగతం!',
  'Welcome': 'స్వాగతం',
  'back!': 'తిరిగి!',
  'YOUR HEALTH, IN FOCUS': 'మీ ఆరోగ్యం, మా దృష్టి',
  'Sign in and stay connected to your care journey.': 'మీ ఆరోగ్య సంరక్షణ ప్రయాణంతో అనుసంధానమై ఉండండి.',
  'Compassionate care. Connected communities.': 'ఆత్మీయ సంరక్షణ • అనుసంధానిత గిరిజన సమాజాలు.',
  'CREATE YOUR ACCOUNT': 'మీ ఖాతాను సృష్టించండి',
  'Join our care community.': 'మా సంరక్షణ సంఘంలో చేరండి.',
  'Create a secure account to access your healthcare journey.': 'మీ ఆరోగ్య సంరక్షణ ప్రయాణాన్ని ప్రారంభించడానికి సురక్షితమైన ఖాతాను సృష్టించండి.',
  'Full name': 'పూర్తి పేరు',
  'Enter your full name': 'మీ పూర్తి పేరును నమోదు చేయండి',
  'Create password': 'పాస్‌వర్డ్ సృష్టించండి',
  'At least 8 characters': 'కనీసం 8 అక్షరాలు',
  'Create account': 'ఖాతా సృష్టించండి',
  'Create account →': 'ఖాతా సృష్టించండి →',
  'Already have an account?': 'ఇప్పటికే ఖాతా ఉందా?',
  'Log in': 'లాగిన్ అవ్వండి',
  "Don't have an account?": 'ఖాతా లేదా?',

  // Citizen Portal
  'Select an Aarogya Drishti citizen healthcare service:': 'ఆరోగ్య దృష్టి పౌర ఆరోగ్య సంరక్షణ సేవను ఎంచుకోండి:',
  'Patient Intake & Registration': 'రోగి నమోదు & ప్రవేశం',
  'Patient Intake &': 'రోగి నమోదు &',
  'Registration': 'ప్రవేశం (రిజిస్ట్రేషన్)',
  'ABHA Registration & Citizen Intake': 'ఆభా (ABHA) నమోదు & పౌర వివరాలు',
  'EHR History & Active Prescriptions': 'ఈహెచ్ఆర్ (EHR) చరిత్ర & మందుల చీటీలు',
  'EHR History &': 'ఈహెచ్ఆర్ చరిత్ర &',
  'Active Prescriptions': 'మందుల చీటీలు',
  'Health Records & Active Medications': 'ఆరోగ్య రికార్డులు & క్రియాశీల మందులు',
  'Scheduled Consultations': 'షెడ్యూల్ చేసిన సంప్రదింపులు',
  'Scheduled': 'షెడ్యూల్ చేసిన',
  'Consultations': 'సంప్రదింపులు',
  'Doctor Appointments & Booking': 'వైద్యుల అపాయింట్‌మెంట్లు & బుకింగ్',
  'Clinical Intake Questionnaire & Triage': 'క్లినికల్ ప్రశ్నాపత్రం & ట్రయాజ్',
  'Clinical Intake': 'క్లినికల్ ప్రవేశం',
  'Questionnaire & Triage': 'ప్రశ్నాపత్రం & ట్రయాజ్',
  'Pre-Consultation Symptom Assessment': 'సంప్రదింపుల పూర్వ లక్షణాల అంచనా',
  'Teleconsultation Suite': 'టెలికన్సల్టేషన్ విభాగం',
  'Encrypted WebRTC Telehealth': 'సురక్షిత వీడియో వైద్య సంప్రదింపులు',
  'AI Oral Screening': 'ఏఐ నోటి స్క్రీనింగ్',
  'AI Oral Health & Oral Cancer Screening': 'ఏఐ నోటి ఆరోగ్యం & నోటి క్యాన్సర్ స్క్రీనింగ్',
  'Back to Dashboard': 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి',
  'Citizen Rahul': 'పౌరుడు రాహుల్',

  // Dashboard Common & Banners
  'Welcome Back,': 'నమస్కారం, స్వాగతం,',
  'Welcome Back': 'నమస్కారం, స్వాగతం',
  'Early Detection Saves Lives': 'ముందస్తు గుర్తింపు ప్రాణాలను కాపాడుతుంది',
  'Connecting Rural Communities to Specialist Care': 'గ్రామీణ ప్రజలను స్పెషలిస్ట్ వైద్యంతో అనుసంధానించడం',
  'Recent Admissions / Registrations': 'ఇటీవలి నమోదులు / రిజిస్ట్రేషన్లు',
  'Total Outbound Referrals': 'మొత్తం రెఫరల్స్ (బయటకు పంపినవి)',
  'Pending Follow-ups': 'పెండింగ్‌లో ఉన్న ఫాలో-అప్‌లు',
  'Completed Follow-ups': 'పూర్తయిన ఫాలో-అప్‌లు',
  'vs. last month': 'గత నెలతో పోలిస్తే',
  'vs. last week': 'గత వారంతో పోలిస్తే',
  'this month': 'ఈ నెలలో',
  'View All Admissions / Registrations': 'అన్ని నమోదులు చూడండి',
  'Patient ID': 'రోగి ఐడి',
  'Name': 'పేరు',
  'Age / Sex': 'వయస్సు / లింగం',
  'Village': 'గ్రామం',
  'Screening Date': 'స్క్రీనింగ్ తేదీ',
  'Status': 'స్థితి',
  'Normal': 'సాధారణం (Normal)',
  'Under Review': 'సమీక్షలో ఉంది (Review)',
  'Suspicious': 'అనుమానాస్పదం (Suspicious)',
  'Follow-up': 'ఫాలో-అప్ (Follow-up)',
  'Urgent': 'అత్యవసరం (Urgent)',

  // Sidebar Menu Items
  'Direct / Walk-in Registration': 'ప్రత్యక్ష రోగి నమోదు (వాక్-ఇన్)',
  'EHR Clinical Documentation': 'ఈహెచ్ఆర్ క్లినికల్ రికార్డులు',
  'Diagnostic & Triage Assessment': 'నోటి పరీక్ష & ఏఐ ట్రయాజ్ అంచనా',
  'Care Continuity Tracking': 'నిరంతర సంరక్షణ & ఫాలో-అప్',
  'Appointment Scheduling & Slot Management': 'అపాయింట్‌మెంట్లు & షెడ్యూలింగ్',
  'Facility Utilization & Clinical Reports': 'క్లినికల్ వినియోగం & నివేదికలు',
  'Virtual Consultation Queue': 'వీడియో టెలికన్సల్టేషన్ క్యూ',
  'Clinician Profile & Credentials': 'వైద్యుల ప్రొఫైల్ & వివరాలు',
  'Initiate Referral Request': 'రెఫరల్ అభ్యర్థన ప్రారంభించండి',
  'Quick Links': 'శీఘ్ర లింకులు',

  // Specialist Dashboard Items
  'Inbound Referral Triage Queue': 'ఇన్‌బౌండ్ రెఫరల్ ట్రయాజ్ క్యూ',
  'High-Acuity Priority Cases': 'అత్యవసర ప్రాధాన్యత కేసులు (హై-అక్యూటీ)',
  'Longitudinal EMR Records': 'దీర్ఘకాలిక ఈఎంఆర్ (EMR) రికార్డులు',
  'Clinical Encounter Notes': 'క్లినికల్ సంప్రదింపు నోట్స్',
  'Diagnostic Orders & Lab Workups': 'రోగనిర్ధారణ ఆదేశాలు & ల్యాబ్ వర్కప్స్',
  'Inter-Provider Clinical Feedback': 'వైద్యుల మధ్య క్లినికల్ ఫీడ్‌బ్యాక్',
  'Specialist Consultation Schedule': 'స్పెషలిస్ట్ సంప్రదింపుల షెడ్యూల్',
  'Diagnostic Summary Report': 'రోగనిర్ధారణ సారాంశ నివేదిక',
  'Telehealth Video Gateway': 'టెలిహెల్త్ వీడియో గేట్‌వే',
  'Specialist Directory & Availability Settings': 'స్పెషలిస్ట్ డైరెక్టరీ & లభ్యత సెట్టింగ్‌లు',
  'Specialist Referral Triage & Teleconsults': 'స్పెషలిస్ట్ రెఫరల్ ట్రయాజ్ & టెలికన్సల్ట్స్',
  'Weekly referrals triaged from 11 ITDA Paderu PHCs': '11 ఐటీడీఏ పాడేరు పీహెచ్‌సీల నుండి వచ్చిన వారపు రెఫరల్స్',
  'Monthly Inflow': 'నెలవారీ రాక',
  'Histopathological Case Distribution': 'హిస్టోపాథాలజీ కేసుల పంపిణీ',
  'Confirmed lesion stages from punch biopsy workups': 'పంచ్ బయాప్సీ ద్వారా నిర్ధారించబడిన లెసియన్ దశలు',

  // District Admin Dashboard Items
  'Jurisdictional Macro-Analytics & Surveillance Dashboard': 'అధికార పరిధి స్థూల-విశ్లేషణలు & నిఘా డాష్‌బోర్డ్',
  'Jurisdictional Macro-Analytics, Screening Quotas & Backlog Tracker': 'అధికార పరిధి స్థూల-విశ్లేషణలు, స్క్రీనింగ్ కోటాలు & బ్యాక్‌లాగ్ ట్రాకర్',
  'Mobile Van GPS Fleet Status': 'మొబైల్ వ్యాన్ జీపీఎస్ ఫ్లీట్ స్థితి',
  'District DMHO Administrative Options': 'జిల్లా డీఎంహెచ్‌ఓ పరిపాలనా ఆప్షన్స్',
  'Mandal-wise Screening Target vs Achievement': 'మండలాల వారీ స్క్రీనింగ్ లక్ష్యం vs సాధన',
  'Habit & Etiological Prevalence': 'అలవాట్లు & కారణాల ప్రాబల్యం',
  'Adda Poga (Reverse Smoking) Hotspots': 'అడ్డ పొగ (రివర్స్ స్మోకింగ్) ప్రభావిత ప్రాంతాలు',
  'Tribal Agency Population Coverage': 'గిరిజన ప్రాంత జనాభా కవరేజ్',

  // System Admin Dashboard Items
  'Identity and Access Management (IAM) & Provisioning Console': 'ఐడెంటిటీ అండ్ యాక్సెస్ మేనేజ్‌మెంట్ (IAM) & కేటాయింపు కన్సోల్',
  'Identity and Access Management (IAM) & System Audit Event Log': 'ఐడెంటిటీ & యాక్సెస్ మేనేజ్‌మెంట్ (IAM) & సిస్టమ్ ఆడిట్ ఈవెంట్ లాగ్',
  'System Admin Operations Console': 'సిస్టమ్ అడ్మిన్ ఆపరేషన్స్ కన్సోల్',
  'Edge-to-Cloud Sync Status': 'ఎడ్జ్-టు-క్లౌడ్ సమకాలీకరణ స్థితి',
  'ABHA RSA Cryptographic Health': 'ఆభా (ABHA) ఆర్‌ఎస్ఏ క్రిప్టోగ్రాఫిక్ భద్రత',
  'Zero-Trust Access Gateway': 'జీరో-ట్రస్ట్ యాక్సెస్ గేట్‌వే',
  'AI Multi-Model Inference Health': 'ఏఐ మల్టీ-మోడల్ ఇన్ఫరెన్స్ ఆరోగ్యం',

  // Screening & Clinical Terms
  'Select Oral Cavity Anatomical Site for Examination:': 'పరీక్ష కోసం నోటిలోని భాగాన్ని ఎంచుకోండి:',
  'Reported High-Risk Habit (NOCR / ACS):': 'రోగి నివేదించిన అధిక-ప్రమాదకర అలవాటు:',
  'Oral Symptoms Under Assessment:': 'పరిశీలనలో ఉన్న నోటి లక్షణాలు:',
  'Persistent Ulcer > 14 Days': '14 రోజులకు పైగా తగ్గని పుండు',
  'White or Red Mucosal Patch': 'తెలుపు లేదా ఎరుపు రంగు పాచ్',
  'Restricted Mouth Opening (Trismus)': 'నోరు తెరవడంలో ఇబ్బంది (ట్రిస్మస్)',
  'Burning Sensation with Spices': 'కారంతో మంట మండే అనుభూతి',
  'Local Pain or Unprovoked Bleeding': 'నోటి నొప్పి లేదా రక్తస్రావం',
  'Difficulty in Swallowing / Dysphagia': 'మింగడంలో ఇబ్బంది',
  'Buccal Mucosa (Cheek)': 'బుగ్గ లోపలి భాగం (బుక్కల్ మ్యూకోసా)',
  'Lateral Tongue': 'నాలుక పక్క భాగం',
  'Gingiva / Gums': 'చిగుళ్ళు (గమ్స్)',
  'Hard & Soft Palate': 'అంగిలి (గట్టి & మెత్తటి అంగిలి)',
  'Floor of Mouth': 'నాలుక కింద భాగం (ఫ్లోర్ ఆఫ్ మౌత్)',
  'Labial Mucosa / Lower Lip': 'పెదవి లోపలి భాగం / క్రింది పెదవి',
  'Tobacco Chewing (Gutkha/Khaini/Paan)': 'పొగాకు నమలడం (గుట్కా/ఖైనీ/పాన్)',
  'Areca Nut / Betel Quid without Tobacco (OSMF Etiology)': 'వక్క / తమలపాకులు (OSMF కారణం)',
  'Reverse Smoking (Adda Poga / Chutta - Tribal Agency)': 'రివర్స్ స్మోకింగ్ (అడ్డ పొగ / చుట్ట - గిరిజన ప్రాంతం)',
  'Bidi / Cigarette Smoking': 'బీడీ / సిగరెట్ తాగడం',
  'Alcohol + Tobacco (High Synergistic Risk)': 'మద్యం + పొగాకు (అత్యంత ప్రమాదకరం)',
  'Non-User / No Known Habits': 'ఏ అలవాట్లు లేని వ్యక్తి',
  'ALIGN LESION IN FOCUS': 'లెసియన్‌ను కెమెరా ఫోకస్‌లో ఉంచండి',
  'LIVE FEED': 'లైవ్ కెమెరా',
  'Start Camera': 'కెమెరా ప్రారంభించండి',
  'Capture Oral Photo': 'నోటి ఫోటో తీయండి',
  'Retake Photo': 'మళ్ళీ ఫోటో తీయండి',
  'Switch Camera': 'కెమెరా మార్చండి',
  'Upload Photo from Device': 'డివైజ్ నుండి ఫోటో అప్‌లోడ్ చేయండి',
  'Use Clinical Sample': 'క్లినికల్ నమూనాను ఉపయోగించండి',
  'Analyze Oral Lesion with Gemini AI →': 'జెమిని ఏఐతో నోటి లెసియన్‌ను విశ్లేషించండి →',
  'Analyzing with Gemini AI...': 'జెమిని ఏఐతో విశ్లేషిస్తోంది...',
  'Initiate Urgent Referral Request →': 'అత్యవసర రెఫరల్ అభ్యర్థన ప్రారంభించండి →',
  'Log Routine Follow-up': 'సాధారణ ఫాలో-అప్‌గా నమోదు చేయండి',
  'Print Clinical Summary': 'క్లినికల్ సారాంశాన్ని ముద్రించండి',
  '🎯 Load Hackathon Demo Case (G. Madugula)': '🎯 హాకథాన్ డెమో కేస్ లోడ్ చేయండి (జి. మాడుగుల)',
  'Load Hackathon Demo Case (G. Madugula)': 'హాకథాన్ డెమో కేస్ లోడ్ చేయండి (జి. మాడుగుల)',
  'Listen to Clinical Advice (Audio)': 'సలహాను తెలుగులో వినండి (ఆడియో)',
  'TRIAGE CLASSIFICATION': 'ట్రయాజ్ వర్గీకరణ',
  'CLINICAL IMPRESSION': 'క్లినికల్ నిర్ధారణ / అభిప్రాయం',
  'DIAGNOSTIC CONCORDANCE': 'రోగనిర్ధారణ కచ్చితత్వం (ఏఐ స్కోరు)',
  'Multimodal Visual Biomarkers': 'గుర్తించిన దృశ్య బయోమార్కర్లు',
  'Habit & Epidemiological Risk Correlation (NOCR)': 'అలవాట్లు మరియు మహమ్మారి శాస్త్ర ప్రమాదం (NOCR)',
  'Malignant Progression Assessment (ScienceDirect / ACS)': 'కేన్సర్‌గా మారే ప్రమాద అంచనా (సైన్స్‌డైరెక్ట్ / ACS)',
  'Recommended Clinical Action Plan': 'సిఫార్సు చేసిన వైద్య కార్యాచరణ ప్రణాళిక',
  'Differential Diagnoses Considered': 'పరిశీలించిన ఇతర రోగనిర్ధారణలు',
  'Camera Access Notice': 'కెమెరా యాక్సెస్ నోటీసు',
  'Clear Focus': 'స్పష్టమైన ఫోకస్',
  'Controlled': 'నియంత్రిత కాంతి',
  'Optimal': 'అనుకూలమైన కాంతి',
  'Low Light': 'తక్కువ కాంతి',

  // AI Copilot
  'Drishti AI Copilot': 'దృష్టి ఏఐ కోపైలట్',
  'Ask Drishti AI clinical copilot...': 'దృష్టి ఏఐ క్లినికల్ కోపైలట్‌ను అడగండి...',
  'Ask Drishti AI...': 'దృష్టి ఏఐని అడగండి...',
  'Send': 'పంపండి',
  'Offline Ready': 'ఆఫ్‌లైన్ సిద్ధంగా ఉంది',
  'AI Engine: Gemini 2.5 Flash Multimodal': 'ఏఐ ఇంజిన్: జెమిని 2.5 ఫ్లాష్ మల్టీమోడల్',
  'How can I assist you today?': 'ఈరోజు నేను మీకు ఎలా సహాయపడగలను?',
  'Just now': 'ఇప్పుడే',
  'Online': 'ఆన్‌లైన్',
  'Active': 'యాక్టివ్',
  'Options': 'ఎంపికలు',
};

// Fast lookup helper
export function getTeluguTranslation(englishText) {
  if (!englishText || typeof englishText !== 'string') return englishText;
  const trimmed = englishText.trim();
  if (MASTER_TELUGU_DICTIONARY[trimmed]) {
    return MASTER_TELUGU_DICTIONARY[trimmed];
  }
  // Try case-insensitive lookup
  const lower = trimmed.toLowerCase();
  for (const [key, val] of Object.entries(MASTER_TELUGU_DICTIONARY)) {
    if (key.toLowerCase() === lower) {
      return val;
    }
  }
  return englishText;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aarogya_language');
      if (saved === 'te' || saved === 'en') return saved;
    }
    return 'te'; // Default to Telugu so every user gets seamless vernacular experience!
  });

  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [fontSize, setFontSize] = useState('normal');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aarogya_language', language);
    }
  }, [language]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  // The universal translation function
  const t = (keyOrText, fallback = '') => {
    if (language === 'te') {
      if (MASTER_TELUGU_DICTIONARY[keyOrText]) {
        return MASTER_TELUGU_DICTIONARY[keyOrText];
      }
      const match = getTeluguTranslation(keyOrText);
      if (match !== keyOrText) return match;
    }
    return fallback || keyOrText;
  };

  // Text to Speech in Telugu/English
  const speakText = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'te' ? 'te-IN' : 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis unavailable:', e);
    }
  };

  // UNIVERSAL DOM TRANSLATION ENGINE
  // Automatically traverses all visible text nodes, buttons, headings, and input placeholders
  // and translates EVERY English string into Telugu when language === 'te'!
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const originalMap = new WeakMap();
    let isTranslating = false;

    // Sort dictionary keys by descending length so full sentences match first
    const sortedDictionaryKeys = Object.keys(MASTER_TELUGU_DICTIONARY).sort(
      (a, b) => b.length - a.length
    );

    const translateNode = (node) => {
      if (!node) return;

      if (node.nodeType === Node.TEXT_NODE) {
        const raw = node.nodeValue;
        if (!raw || !raw.trim()) return;
        const trimmed = raw.trim();

        if (language === 'te') {
          // Direct phrase check
          if (MASTER_TELUGU_DICTIONARY[trimmed]) {
            if (!originalMap.has(node)) {
              originalMap.set(node, raw);
            }
            node.nodeValue = raw.replace(trimmed, MASTER_TELUGU_DICTIONARY[trimmed]);
            return;
          }

          // Substring sentence replacement
          let replaced = raw;
          let changed = false;
          for (const phrase of sortedDictionaryKeys) {
            if (replaced.includes(phrase)) {
              replaced = replaced.replaceAll(phrase, MASTER_TELUGU_DICTIONARY[phrase]);
              changed = true;
            }
          }
          if (changed) {
            if (!originalMap.has(node)) {
              originalMap.set(node, raw);
            }
            node.nodeValue = replaced;
          }
        } else if (language === 'en') {
          if (originalMap.has(node)) {
            node.nodeValue = originalMap.get(node);
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Skip scripts, styles, pre, code
        if (['SCRIPT', 'STYLE', 'CODE', 'PRE', 'NOSCRIPT'].includes(node.tagName)) return;

        // Input Placeholders
        if (node.placeholder) {
          const pTrim = node.placeholder.trim();
          if (language === 'te') {
            const te = getTeluguTranslation(pTrim);
            if (te && te !== pTrim) {
              if (!node.dataset.origPlaceholder) {
                node.dataset.origPlaceholder = node.placeholder;
              }
              node.placeholder = te;
            }
          } else if (node.dataset.origPlaceholder) {
            node.placeholder = node.dataset.origPlaceholder;
          }
        }

        // Title tooltips
        if (node.title) {
          const tTrim = node.title.trim();
          if (language === 'te') {
            const te = getTeluguTranslation(tTrim);
            if (te && te !== tTrim) {
              if (!node.dataset.origTitle) {
                node.dataset.origTitle = node.title;
              }
              node.title = te;
            }
          } else if (node.dataset.origTitle) {
            node.title = node.dataset.origTitle;
          }
        }

        // Traverse children
        node.childNodes.forEach(translateNode);
      }
    };

    // Perform translation on entire document body
    translateNode(document.body);

    // Live MutationObserver for dynamically injected modals, cards, tabs, and tables
    const observer = new MutationObserver((mutations) => {
      if (isTranslating) return;
      isTranslating = true;
      try {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(translateNode);
          }
        }
      } finally {
        isTranslating = false;
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isOffline,
        fontSize,
        setFontSize,
        speakText,
      }}
    >
      <div className={`app-root-lang app-font-${fontSize}`}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'te',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key, fallback = '') => getTeluguTranslation(key) || fallback || key,
      isOffline: false,
      fontSize: 'normal',
      setFontSize: () => {},
      speakText: () => {},
    };
  }
  return context;
}
