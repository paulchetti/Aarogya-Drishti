import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Branding & Header
    appTitle: 'AAROGYA DRISHTI',
    appSubtitle: 'AI-Assisted Oral Cancer Detection & Patient Care Platform',
    itdaBadge: 'ITDA Paderu • Alluri Sitharama Raju District',
    switchLang: 'తెలుగు',
    currentLang: 'English',
    onlineStatus: 'Online (ABDM Cloud)',
    offlineStatus: 'Offline Mode (Edge Storage)',
    syncStatus: 'Sync Queue: 0 Pending',

    // Roles & Portals
    phcDoctor: 'PHC Medical Officer',
    specialist: 'Oral Oncology Specialist',
    districtAdmin: 'District Administrator (DMHO)',
    systemAdmin: 'System & Security Administrator',
    anmWorker: 'ANM Village Health Worker',
    citizen: 'Citizen Care Portal',

    // Actions & Buttons
    openDashboard: 'Open Dashboard',
    startScreening: 'Start AI Oral Screening',
    capturePhoto: 'Capture Oral Photo',
    retakePhoto: 'Retake Photo',
    switchCamera: 'Switch Camera',
    analyzeLesion: 'Analyze Oral Lesion with Gemini AI →',
    analyzing: 'Analyzing with Gemini AI...',
    urgentReferral: 'Initiate Urgent Referral Request →',
    routineFollowup: 'Log Routine Follow-up',
    printReport: 'Print Clinical Summary',
    loadDemoCase: '🎯 Load Hackathon Demo Case (G. Madugula)',
    uploadDevice: 'Upload Photo from Device',
    quickBenchmarks: 'Quick Clinical Benchmarks:',
    reExamine: '← Re-examine / Retake',

    // Anatomical Sites
    siteSelection: 'Select Oral Cavity Anatomical Site for Examination:',
    buccalMucosa: 'Buccal Mucosa (Cheek)',
    lateralTongue: 'Lateral Tongue',
    gingivaGums: 'Gingiva / Gums',
    hardSoftPalate: 'Hard & Soft Palate',
    floorOfMouth: 'Floor of Mouth',
    labialMucosa: 'Labial Mucosa / Lower Lip',

    // Habits & Exposures
    habitSelection: 'Reported High-Risk Habit (NOCR / ACS):',
    tobaccoChewing: 'Tobacco Chewing (Gutkha/Khaini/Paan)',
    arecaNut: 'Areca Nut / Betel Quid without Tobacco (OSMF Etiology)',
    reverseSmoking: 'Reverse Smoking (Adda Poga / Chutta - Tribal Agency)',
    bidiSmoking: 'Bidi / Cigarette Smoking',
    alcoholTobacco: 'Alcohol + Tobacco (High Synergistic Risk)',
    noHabits: 'Non-User / No Known Habits',

    // Symptoms
    symptomsTitle: 'Oral Symptoms Under Assessment:',
    ulcer14Days: 'Persistent Ulcer > 14 Days',
    whiteRedPatch: 'White or Red Mucosal Patch',
    trismus: 'Restricted Mouth Opening (Trismus)',
    burningSensation: 'Burning Sensation with Spices',
    painBleeding: 'Local Pain or Unprovoked Bleeding',
    swallowingDifficulty: 'Difficulty in Swallowing / Dysphagia',

    // Clinical Quality & Warnings
    frameLesion: 'ALIGN LESION IN FOCUS',
    liveFeed: 'LIVE FEED',
    connectingCamera: 'Connecting to Camera...',
    cameraNotice: 'Camera Access Notice',
    allowCamera: 'Start Camera',
    useSample: 'Use Clinical Sample',
    darkCaptureWarning: 'Camera Captured A Dark / Black Image',
    darkCaptureAdvice: 'Please open laptop privacy shutter or use good ambient lighting.',
    lightingOptimal: 'Optimal',
    lightingLow: 'Low Light',
    lightingDark: 'Dark / Obstructed',
    focusClear: 'Clear Focus',
    glareControlled: 'Controlled',

    // Classifications & Results
    triageClassification: 'TRIAGE CLASSIFICATION',
    clinicalImpression: 'CLINICAL IMPRESSION',
    diagnosticConcordance: 'DIAGNOSTIC CONCORDANCE',
    visualBiomarkers: 'Multimodal Visual Biomarkers',
    habitCorrelation: 'Habit & Epidemiological Risk Correlation (NOCR)',
    malignancyRisk: 'Malignant Progression Assessment (ScienceDirect / ACS)',
    clinicalActionPlan: 'Recommended Clinical Action Plan',
    differentialDiagnosis: 'Differential Diagnoses Considered',
    clinicalDisclaimer: 'NOT FOR UNINSPECTED FINAL DIAGNOSIS • Photographs supplement, and never replace, full physical clinical examination and indicated biopsy.',
    scientificGrounding: 'Scientific Grounding: WHO 5th Ed • NOCR India • ScienceDirect (pii/S2772906024001390) • Cleveland Clinic • American Cancer Society',

    // Accessibility
    listenAudio: 'Listen to Clinical Advice (Audio)',
    fontSizeToggle: 'Text Size',
    accessibilityMenu: 'Accessibility',
  },

  te: {
    // Branding & Header
    appTitle: 'ఆరోగ్య దృష్టి',
    appSubtitle: 'ఏఐ ఆధారిత నోటి క్యాన్సర్ ముందస్తు గుర్తింపు &amp; టెలిమెడిసిన్ వేదిక',
    itdaBadge: 'ఐటీడీఏ పాడేరు • అల్లూరి సీతారామరాజు జిల్లా',
    switchLang: 'English',
    currentLang: 'తెలుగు',
    onlineStatus: 'ఆన్‌లైన్ (ABDM క్లౌడ్)',
    offlineStatus: 'ఆఫ్‌లైన్ మోడ్ (స్థానిక నిల్వ)',
    syncStatus: 'సింక్ వరుస: 0 పెండింగ్',

    // Roles & Portals
    phcDoctor: 'పీహెచ్‌సీ వైద్యాధికారి (MO)',
    specialist: 'ఓరల్ ఆంకాలజీ నిపుణుడు',
    districtAdmin: 'జిల్లా వైద్యాధికారి (DMHO పాడేరు)',
    systemAdmin: 'సిస్టమ్ &amp; సైబర్ సెక్యూరిటీ అడ్మిన్',
    anmWorker: 'ఏఎన్‌ఎం / గ్రామ ఆరోగ్య కార్యకర్త',
    citizen: 'పౌర సంరక్షణ పోర్టల్',

    // Actions & Buttons
    openDashboard: 'డాష్‌బోర్డ్ తెరవండి',
    startScreening: 'ఏఐ నోటి స్క్రీనింగ్ ప్రారంభించండి',
    capturePhoto: 'నోటి ఫోటో తీయండి',
    retakePhoto: 'మళ్ళీ ఫోటో తీయండి',
    switchCamera: 'కెమెరా మార్చండి',
    analyzeLesion: 'జెమినీ ఏఐతో నోటి పుండును విశ్లేషించండి →',
    analyzing: 'జెమినీ ఏఐ విశ్లేషిస్తోంది...',
    urgentReferral: 'అత్యవసర నిపుణుల రిఫరల్ పంపండి →',
    routineFollowup: 'సాధారణ తనిఖీని నమోదు చేయండి',
    printReport: 'క్లినికల్ నివేదికను ప్రింట్ చేయండి',
    loadDemoCase: '🎯 హ్యాకథాన్ డెమో కేస్ (జి. మాడుగుల)',
    uploadDevice: 'పరికరం నుండి ఫోటోను ఎంచుకోండి',
    quickBenchmarks: 'త్వరిత క్లినికల్ నమూనాలు:',
    reExamine: '← మళ్ళీ తనిఖీ చేయండి',

    // Anatomical Sites
    siteSelection: 'పరీక్ష కోసం నోటి శరీర భాగాన్ని ఎంచుకోండి:',
    buccalMucosa: 'బుక్కల్ మ్యూకోసా (బుగ్గ లోపలి భాగం)',
    lateralTongue: 'నాలుక ప్రక్క భాగాలు (అంచులు)',
    gingivaGums: 'చిగుళ్ళు (చిగుళ్ల ప్రాంతం)',
    hardSoftPalate: 'అంగిలి (గట్టి &amp; మెత్తని తాలవ్యము)',
    floorOfMouth: 'నోటి నేల భాగం (నాలుక కింద)',
    labialMucosa: 'పెదవి లోపలి భాగం (క్రింది పెదవి)',

    // Habits & Exposures
    habitSelection: 'రోగి అలవాట్లు (NOCR / ACS మార్గదర్శకాలు):',
    tobaccoChewing: 'పొగాకు నమలడం (గుట్కా / ఖైనీ / పాన్ మసాలా)',
    arecaNut: 'వక్క / తమలపాకులు నమలడం (OSMF కారణం)',
    reverseSmoking: 'అడ్డా పొగ / చుట్ట తిరగబెట్టి కాల్చడం (గిరిజన ప్రాంతాల అలవాటు)',
    bidiSmoking: 'బీడీ / సిగరెట్ ధూమపానం',
    alcoholTobacco: 'మద్యపానం + పొగాకు (అత్యంత ప్రమాదకరం)',
    noHabits: 'ఎటువంటి అలవాట్లు లేనివారు',

    // Symptoms
    symptomsTitle: 'లక్షణాలు మరియు వ్యవధి:',
    ulcer14Days: '14 రోజులకు పైగా తగ్గని నోటి పుండు',
    whiteRedPatch: 'తెల్లటి లేదా ఎర్రటి మచ్చ (ల్యూకోప్లాకియా / ఎరిత్రోప్లాకియా)',
    trismus: 'నోరు సరిగ్గా తెరవలేకపోవడం (ట్రిస్మస్ / OSMF)',
    burningSensation: 'కారం తిన్నప్పుడు నోరు తీవ్రంగా మండడం',
    painBleeding: 'నోటిలో అకస్మాత్తుగా నొప్పి లేదా రక్తస్రావం',
    swallowingDifficulty: 'ఆహారం మింగడంలో తీవ్రమైన ఇబ్బంది',

    // Clinical Quality & Warnings
    frameLesion: 'పుండును కెమెరా ఫ్రేమ్‌లో ఉంచండి',
    liveFeed: 'లైవ్ కెమెరా ఫీడ్',
    connectingCamera: 'కెమెరాకు కనెక్ట్ అవుతోంది...',
    cameraNotice: 'కెమెరా అనుమతి గమనిక',
    allowCamera: 'కెమెరాను ప్రారంభించండి',
    useSample: 'క్లినికల్ నమూనాను వాడండి',
    darkCaptureWarning: 'కెమెరా చిత్రం చాలా చీకటిగా వచ్చింది',
    darkCaptureAdvice: 'దయచేసి ల్యాప్‌టాప్ షట్టర్ తెరవండి లేదా మంచి వెలుతురులో ఫోటో తీయండి.',
    lightingOptimal: 'సరైన వెలుతురు',
    lightingLow: 'తక్కువ వెలుతురు',
    lightingDark: 'చీకటి / అడ్డంకి',
    focusClear: 'స్పష్టమైన ఫోకస్',
    glareControlled: 'నియంత్రిత కాంతి',

    // Classifications & Results
    triageClassification: 'ట్రయాజ్ వర్గీకరణ',
    clinicalImpression: 'క్లినికల్ నిర్ధారణ / అభిప్రాయం',
    diagnosticConcordance: 'రోగనిర్ధారణ కచ్చితత్వం (ఏఐ స్కోరు)',
    visualBiomarkers: 'గుర్తించిన దృశ్య బయోమార్కర్లు',
    habitCorrelation: 'అలవాట్లు మరియు మహమ్మారి శాస్త్ర ప్రమాదం (NOCR)',
    malignancyRisk: 'కేన్సర్‌గా మారే ప్రమాద అంచనా (సైన్స్‌డైరెక్ట్ / ACS)',
    clinicalActionPlan: 'సిఫార్సు చేసిన వైద్య కార్యాచరణ ప్రణాళిక',
    differentialDiagnosis: 'పరిశీలించిన ఇతర రోగనిర్ధారణలు',
    clinicalDisclaimer: 'ఇది తుది వైద్య నిర్ధారణ కాదు • ఫోటోలు పూర్తి శారీరక పరీక్ష మరియు బయాప్సీకి ప్రత్యామ్నాయం కావు.',
    scientificGrounding: 'శాస్త్రీయ ఆధారాలు: డబ్ల్యూహెచ్‌ఓ (5వ ఎడిషన్) • NOCR ఇండియా • సైన్స్‌డైరెక్ట్ • క్లీవ్‌ల్యాండ్ క్లినిక్ • అమెరికన్ క్యాన్సర్ సొసైటీ',

    // Accessibility
    listenAudio: 'సలహాను తెలుగులో వినండి (ఆడియో)',
    fontSizeToggle: 'అక్షరాల పరిమాణం',
    accessibilityMenu: 'యాక్సెసిబిలిటీ',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aarogya_language');
      if (saved === 'te' || saved === 'en') return saved;
    }
    return 'en';
  });

  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'large' | 'xlarge'

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

  const t = (key, fallback = '') => {
    return translations[language]?.[key] || translations.en?.[key] || fallback || key;
  };

  // Text to Speech for low-literacy tribal citizens
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
      language: 'en',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key, fallback = '') => translations.en?.[key] || fallback || key,
      isOffline: false,
      fontSize: 'normal',
      setFontSize: () => {},
      speakText: () => {},
    };
  }
  return context;
}
