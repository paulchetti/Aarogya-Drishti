import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';
import WelcomeBanner from './WelcomeBanner';
import StatCards from './StatCards';
import AIChatBot from './AIChatBot';
import TeleconsultationSuite from '../clinical/TeleconsultationSuite';
import { getAllPatients } from '../../services/referralRoutingService';
import '../../styles/dashboard.css';
import {
  AIIcon,
  CameraIcon,
  CalendarIcon,
  ReferralIcon,
  ReportsIcon,
  HistoryIcon,
  SettingsIcon,
  TargetIcon,
  WarningIcon,
  HeartPulseIcon,
} from '../Icons';
import {
  Microscope,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Clock,
  User,
  Download,
  Printer,
  Send,
  X,
  Activity,
  Video,
  Stethoscope,
  Eye,
  ClipboardList,
  MapPin,
  Search,
  Sparkles,
  ShieldCheck,
  Check,
  FileSpreadsheet,
  Layers,
  Radio,
  FileCheck,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';

export default function SpecialistDashboard({ onToast, onSwitchDashboard, onLogout }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Modals & Views
  const [isTelehealthOpen, setIsTelehealthOpen] = useState(() => {
    const p = new URLSearchParams(window.location.search);
    return p.get('teleconsult') === 'true' || !!p.get('room');
  });
  const [selectedReviewCase, setSelectedReviewCase] = useState(null);
  const [isDiagnosticOrdersModalOpen, setIsDiagnosticOrdersModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isEmrModalOpen, setIsEmrModalOpen] = useState(false);
  const [selectedEmrPatient, setSelectedEmrPatient] = useState(null);

  // Emergency On-Call State
  const [isOnCallActive, setIsOnCallActive] = useState(true);

  // Demo fallback patient
  const demoPatient = getAllPatients().find((p) => p.id === 'ADP-2026-0046') || getAllPatients()[0];

  // Specialist Navigation Menu
  const specialistMenuItems = [
    { name: 'Inbound Referral Triage Queue', icon: <ReferralIcon /> },
    { name: 'High-Acuity Priority Cases', icon: <WarningIcon /> },
    { name: 'Longitudinal EMR Records', icon: <HistoryIcon /> },
    { name: 'Clinical Encounter Notes', icon: <ReportsIcon /> },
    { name: 'Diagnostic Orders & Lab Workups', icon: <CameraIcon /> },
    { name: 'Inter-Provider Clinical Feedback', icon: <AIIcon /> },
    { name: 'Specialist Consultation Schedule', icon: <CalendarIcon /> },
    { name: 'Diagnostic Summary Report', icon: <ReportsIcon /> },
    { name: 'Telehealth Video Gateway', icon: <HeartPulseIcon /> },
    { name: 'Specialist Directory & Availability Settings', icon: <SettingsIcon /> },
  ];

  // 4 Top Key Stats
  const specialistStats = [
    {
      title: language === 'te' ? 'వచ్చిన పీహెచ్‌సీ రిఫరల్స్' : 'Incoming PHC Referrals',
      value: '42',
      trend: '↑ 14%',
      trendColor: 'green',
      subtext: language === 'te' ? 'గత వారంతో పోలిస్తే' : 'vs. last week',
      icon: <ReferralIcon className="w-5 h-5" />,
      colorClass: 'orange',
      cardBorder: 'orange-bottom',
    },
    {
      title: language === 'te' ? 'షెడ్యూల్ చేసిన టెలికన్సల్టేషన్లు' : 'Teleconsultations Scheduled',
      value: '18',
      trend: '↑ 8%',
      trendColor: 'green',
      subtext: language === 'te' ? 'నేటి కొరకు' : 'for today',
      icon: <AIIcon className="w-5 h-5" />,
      colorClass: 'teal',
      cardBorder: 'teal-bottom',
    },
    {
      title: language === 'te' ? 'పెండింగ్‌లో ఉన్న బయాప్సీ సిఫార్సులు' : 'Biopsy Recommendations Pending',
      value: '9',
      trend: language === 'te' ? 'హై ప్రయారిటీ' : 'High Priority',
      trendColor: 'amber',
      subtext: language === 'te' ? 'ఆమోదం అవసరం' : 'requires approval',
      icon: <WarningIcon className="w-5 h-5" />,
      colorClass: 'amber',
      cardBorder: 'amber-bottom',
    },
    {
      title: language === 'te' ? 'ధృవీకరించబడిన కేసు పరిష్కారాలు' : 'Confirmed Case Closures',
      value: '64',
      trend: '↑ 22%',
      trendColor: 'green',
      subtext: language === 'te' ? 'ఈ నెలలో' : 'this month',
      icon: <TargetIcon className="w-5 h-5" />,
      colorClass: 'blue',
      cardBorder: 'blue-bottom',
    },
  ];

  // Dynamic Inbound Referral Queue
  const [referralQueue, setReferralQueue] = useState([
    {
      id: 'REF-2025-089',
      patientId: 'ADP-001246',
      name: 'Savitri K.',
      ageSex: '28 / F',
      phc: 'PHC Koyyuru',
      doctor: 'Dr. M. Prasad, MBBS',
      lesion: 'Erythroplakia (Lateral Tongue)',
      risk: 'High Suspicion',
      riskClass: 'suspicious',
      aiConfidence: '94.2%',
      triageDate: '15 Apr 2025',
      status: 'Urgent Review',
      statusClass: 'under-review',
      habits: 'Reverse Smoking (Adda Poga) 8 yrs, Gutkha 5 yrs',
      opening: '22 mm (Trismus Stage II)',
      lesionImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
      doctorNotes: 'Referred by Koyyuru PHC. Patient complains of burning sensation and contact bleeding on left lateral tongue.',
      biopsyEndorsed: false,
      tnmStage: 'cT2 N0 M0 (Stage II)',
      biopsyType: '4mm Punch Biopsy',
      labDestination: 'Area Hospital Paderu Oral Pathology Lab',
    },
    {
      id: 'REF-2025-088',
      patientId: 'ADP-001239',
      name: 'Govinda Raju',
      ageSex: '51 / M',
      phc: 'PHC Araku',
      doctor: 'Dr. Kavitha S., MBBS',
      lesion: 'Ulcerative Mass (Buccal Mucosa)',
      risk: 'Malignancy Alert',
      riskClass: 'suspicious',
      aiConfidence: '96.8%',
      triageDate: '15 Apr 2025',
      status: 'Biopsy Scheduled',
      statusClass: 'follow-up',
      habits: 'Khaini Chewing 25 yrs, Chutta 15 yrs',
      opening: '18 mm (Severe Trismus)',
      lesionImg: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
      doctorNotes: 'Referred by Araku PHC. Exophytic vegetative growth on right retro-molar trigone with indurated margins.',
      biopsyEndorsed: true,
      tnmStage: 'cT3 N1 M0 (Stage III)',
      biopsyType: 'Incisional Wedge Biopsy',
      labDestination: 'King George Hospital (KGH) Visakhapatnam',
    },
    {
      id: 'REF-2025-087',
      patientId: 'ADP-001235',
      name: 'Appala Narasamma',
      ageSex: '62 / F',
      phc: 'PHC Chintapalli',
      doctor: 'Dr. Rajesh Varma, BDS',
      lesion: 'Reverse Smoker Palatal Keratosis',
      risk: 'Moderate Risk',
      riskClass: 'follow-up',
      aiConfidence: '88.5%',
      triageDate: '14 Apr 2025',
      status: 'Tele-Consult Set',
      statusClass: 'normal',
      habits: 'Reverse Chutta smoking 40 yrs',
      opening: '32 mm (Mild restriction)',
      lesionImg: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80',
      doctorNotes: 'Extensive palatal hyperkeratosis with red petechial spots around minor salivary duct orifices.',
      biopsyEndorsed: false,
      tnmStage: 'cT1 N0 M0 (Stage I Pre-Malignant)',
      biopsyType: 'Oral CDx Brush Cytology',
      labDestination: 'Area Hospital Paderu Oral Pathology Lab',
    },
    {
      id: 'REF-2025-086',
      patientId: 'ADP-001228',
      name: 'Ramesh Babu',
      ageSex: '37 / M',
      phc: 'PHC Paderu Central',
      doctor: 'Dr. Sandeep Kumar, MBBS',
      lesion: 'Homogeneous Leukoplakia (Labial)',
      risk: 'Pre-Cancerous',
      riskClass: 'under-review',
      aiConfidence: '91.0%',
      triageDate: '14 Apr 2025',
      status: 'Pending Review',
      statusClass: 'under-review',
      habits: 'Gutkha chewing 12 yrs, alcohol 8 yrs',
      opening: '28 mm',
      lesionImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
      doctorNotes: 'Non-scrapable thick white patch on right lower labial mucosa. Advised immediate cessation counseling.',
      biopsyEndorsed: false,
      tnmStage: 'cT1 N0 M0 (Leukoplakia Stage I)',
      biopsyType: '4mm Punch Biopsy',
      labDestination: 'Area Hospital Paderu Oral Pathology Lab',
    },
    {
      id: 'REF-2025-085',
      patientId: 'ADP-001219',
      name: 'Kondala Rao',
      ageSex: '44 / M',
      phc: 'PHC Munchingiputtu',
      doctor: 'Dr. Swathi K., MBBS',
      lesion: 'Oral Submucous Fibrosis (Grade III)',
      risk: 'Trismus Detected',
      riskClass: 'follow-up',
      aiConfidence: '89.4%',
      triageDate: '13 Apr 2025',
      status: 'Second Opinion',
      statusClass: 'normal',
      habits: 'Areca nut & raw tobacco quid 18 yrs',
      opening: '16 mm (Severe)',
      lesionImg: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
      doctorNotes: 'Blanched vertical fibrous bands palpable bilaterally across anterior faucial pillars. Tongue protrusion impaired.',
      biopsyEndorsed: true,
      tnmStage: 'OSMF Grade III (Severe Trismus)',
      biopsyType: 'Incisional Biopsy & Fibrotomy Eval',
      labDestination: 'King George Hospital (KGH) Visakhapatnam',
    },
  ]);

  // Diagnostic Orders Data
  const [diagnosticOrders, setDiagnosticOrders] = useState([
    {
      id: 'LAB-2025-091',
      patient: 'Savitri K.',
      patientId: 'ADP-001246',
      phc: 'PHC Koyyuru',
      specimen: '4mm Punch Biopsy (Lateral Tongue)',
      lab: 'Area Hospital Paderu Histopathology Unit',
      orderDate: '15 Apr 2025',
      priority: 'Urgent',
      courierStatus: 'Cold-Chain Transit (Mobile Van #03)',
      status: 'In Transit',
      statusClass: 'under-review',
      findings: 'Specimen in formalin jar; grossing scheduled for 16 Apr 2025.',
    },
    {
      id: 'LAB-2025-090',
      patient: 'Govinda Raju',
      patientId: 'ADP-001239',
      phc: 'PHC Araku',
      specimen: 'Incisional Biopsy (Buccal Mucosa)',
      lab: 'KGH Visakhapatnam Oral Pathology Dept',
      orderDate: '14 Apr 2025',
      priority: 'STAT',
      courierStatus: 'Grossing Complete; H&E Staining Active',
      status: 'Staining in Lab',
      statusClass: 'follow-up',
      findings: 'Keratinizing squamous cell proliferation with focal nuclear atypia.',
    },
    {
      id: 'LAB-2025-089',
      patient: 'Appala Narasamma',
      patientId: 'ADP-001235',
      phc: 'PHC Chintapalli',
      specimen: 'Oral CDx Brush Cytology',
      lab: 'Area Hospital Paderu Histopathology Unit',
      orderDate: '14 Apr 2025',
      priority: 'Routine',
      courierStatus: 'Pathologist Verified & Signed',
      status: 'Report Ready',
      statusClass: 'normal',
      findings: 'Hyperkeratosis with mild reactive atypia; negative for invasive carcinoma.',
    },
    {
      id: 'LAB-2025-088',
      patient: 'Kondala Rao',
      patientId: 'ADP-001219',
      phc: 'PHC Munchingiputtu',
      specimen: '4mm Punch Biopsy + Trismus Staging',
      lab: 'Area Hospital Paderu Histopathology Unit',
      orderDate: '13 Apr 2025',
      priority: 'Routine',
      courierStatus: 'Pathologist Verified & Signed',
      status: 'Report Ready',
      statusClass: 'normal',
      findings: 'Subepithelial hyalinization and collagen dense bundles. Confirmed Grade III OSMF.',
    },
  ]);

  // Inter-Provider Feedback Records
  const [feedbackRecords, setFeedbackRecords] = useState([
    {
      id: 'FB-2025-042',
      date: '15 Apr 2025, 11:20 AM',
      toPhc: 'PHC Koyyuru',
      doctor: 'Dr. M. Prasad, MBBS',
      patient: 'Savitri K. (REF-2025-089)',
      subject: 'Punch Biopsy & Local Steroid Management Advisory',
      message:
        'Patient Savitri K. endorsed for 4mm punch biopsy under 2% lignocaine infiltration. Please ensure specimen is immediately placed in 10% buffered neutral formalin. Instructed ASHA Lakshmi Devi to conduct weekly home visits for wound checks.',
      urgency: 'High',
      status: 'Dispatched to PHC EMR',
    },
    {
      id: 'FB-2025-041',
      date: '14 Apr 2025, 03:45 PM',
      toPhc: 'PHC Araku',
      doctor: 'Dr. Kavitha S., MBBS',
      patient: 'Govinda Raju (REF-2025-088)',
      subject: 'Immediate Referral to Head & Neck Tumor Board',
      message:
        'Biopsy scheduled at KGH Visakhapatnam. Prescribed broad-spectrum antibiotic coverage and oral nutritional supplement (Ensure/Pro-Tin). Please expedite 108 Emergency Ambulance transfer on 17 Apr.',
      urgency: 'Critical',
      status: 'Acknowledged by MO',
    },
    {
      id: 'FB-2025-040',
      date: '13 Apr 2025, 01:10 PM',
      toPhc: 'PHC Chintapalli',
      doctor: 'Dr. Rajesh Varma, BDS',
      patient: 'Appala Narasamma (REF-2025-087)',
      subject: 'Reverse Smoking Cessation & Topically Applied Lycopene',
      message:
        'Palatal keratosis shows no immediate ulceration. Advise complete cessation of Adda Poga. Disburse 30-day course of Cap Lycopene 10mg OD and Triamcinolone 0.1% oral paste TDS. Re-screen via ANM in 30 days.',
      urgency: 'Routine',
      status: 'Acknowledged by MO',
    },
  ]);

  // Form State: New Diagnostic Order
  const [newLabOrder, setNewLabOrder] = useState({
    patient: 'Ramesh Babu',
    phc: 'PHC Paderu Central',
    specimen: '4mm Punch Biopsy (Labial Mucosa)',
    lab: 'Area Hospital Paderu Histopathology Unit',
    priority: 'Urgent',
    notes: 'Rule out early micro-invasive carcinoma in homogenous leukoplakic patch.',
  });

  // Form State: New Inter-Provider Feedback
  const [newFeedback, setNewFeedback] = useState({
    toPhc: 'PHC Paderu Central',
    doctor: 'Dr. Sandeep Kumar, MBBS',
    patient: 'Ramesh Babu (REF-2025-086)',
    subject: 'Leukoplakia Monitoring & Habit Cessation Protocol',
    message: '',
    urgency: 'High',
  });

  // Form State: Active Case Review
  const [reviewFormData, setReviewFormData] = useState({
    activeTab: 'clinical', // 'clinical' | 'staging' | 'rx' | 'notes'
    showAiHeatmap: true,
    tnmStage: 'cT2 N0 M0',
    biopsyType: '4mm Punch Biopsy',
    labDestination: 'Area Hospital Paderu Histopathology Unit',
    anesthesia: 'Local Infiltration (2% Lignocaine + 1:200,000 Epinephrine)',
    prescriptions: [
      { med: 'Cap. Lycopene 10mg', dose: '1 Capsule Once Daily (Post Meal)', duration: '30 Days' },
      { med: 'Triamcinolone Acetonide 0.1% Paste', dose: 'Topical Application TDS', duration: '14 Days' },
      { med: 'Zinc & Vitamin B-Complex with L-Lysine', dose: '1 Tablet Daily', duration: '30 Days' },
    ],
    phcAdvice:
      'Advised strict cessation of reverse smoking (Adda Poga) and Gutkha. Instruct ASHA worker to supervise compliance weekly. Schedule tele-review post-biopsy.',
  });

  // Schedule Slots State
  const [scheduleSlots, setScheduleSlots] = useState([
    {
      time: '09:30 AM - 10:15 AM',
      patient: 'Savitri K.',
      phc: 'PHC Koyyuru',
      type: 'Biopsy Confirmation Video Review',
      status: 'Live Now',
      statusClass: 'live',
    },
    {
      time: '11:45 AM - 12:30 PM',
      patient: 'Govinda Raju',
      phc: 'PHC Araku',
      type: 'Surgical Tumor Board Workup',
      status: 'Queued',
      statusClass: 'pending',
    },
    {
      time: '02:15 PM - 03:00 PM',
      patient: 'Appala Narasamma',
      phc: 'PHC Chintapalli',
      type: 'Palatal Lesion Post-Biopsy Staging',
      status: 'Upcoming',
      statusClass: 'pending',
    },
    {
      time: '03:30 PM - 04:15 PM',
      patient: 'Kondala Rao',
      phc: 'PHC Munchingiputtu',
      type: 'OSMF Fibrotomy Review & Trismus Check',
      status: 'Upcoming',
      statusClass: 'pending',
    },
  ]);

  // Multi-Specialist Directory
  const specialistDirectory = [
    {
      name: 'Dr. Ananya Varma, MD',
      role: 'Head of Oral Oncology & Tele-Triage',
      facility: 'Area Hospital Paderu',
      regId: 'APMC-2016-89412',
      status: 'Available & On-Call',
      statusClass: 'normal',
      phone: '+91 891-284-9910',
    },
    {
      name: 'Dr. K. S. Murthy, MS, MCh',
      role: 'Head & Neck Surgical Oncologist',
      facility: 'King George Hospital (KGH) Visakhapatnam',
      regId: 'APMC-2009-41102',
      status: 'In OT (Surgeries)',
      statusClass: 'under-review',
      phone: '+91 891-256-4891',
    },
    {
      name: 'Dr. P. Sujatha, MD',
      role: 'Consultant Oral & Maxillofacial Pathologist',
      facility: 'KGH Pathology Centre',
      regId: 'APMC-2012-62840',
      status: 'Reviewing Biopsy Slides',
      statusClass: 'normal',
      phone: '+91 891-256-4899',
    },
    {
      name: 'Dr. V. Madhavan, BDS, MDS',
      role: 'Oral Medicine & Radiology Specialist',
      facility: 'Mobile Unit #01 (Araku Valley)',
      regId: 'APDC-2018-19402',
      status: 'Active Field Tele-Camp',
      statusClass: 'normal',
      phone: '+91 94401-88231',
    },
  ];

  // Longitudinal EMR Data
  const longitudinalPatients = [
    {
      id: 'ADP-001246',
      name: 'Savitri K.',
      age: 28,
      gender: 'Female',
      mandal: 'Koyyuru',
      village: 'Mampa Hamlet #03',
      abha: '32-9481-2290-1184',
      primaryRisk: 'Reverse Smoking (Adda Poga) 8 yrs',
      timeline: [
        {
          date: '02 Apr 2025',
          actor: 'ANM Lakshmi Devi (Sub-Centre Mampa)',
          action: 'Door-to-Door Screening with Aarogya Drishti Mobile App',
          details: 'Captured intraoral photo. AI detected lateral tongue erythema with 94.2% Malignancy Suspicion. Escalated to Koyyuru PHC.',
          tag: 'Frontline Screening',
        },
        {
          date: '08 Apr 2025',
          actor: 'Dr. M. Prasad, MBBS (PHC Koyyuru)',
          action: 'Primary Clinical Triage & Physical Examination',
          details: 'Confirmed 1.8cm x 1.2cm red patch with indurated borders. Graded Trismus mouth opening at 22mm. Generated e-Referral REF-2025-089.',
          tag: 'PHC Doctor Triage',
        },
        {
          date: '15 Apr 2025',
          actor: 'Dr. Ananya Varma, MD (Area Hospital Paderu)',
          action: '3-Way Specialist Teleconsultation & Biopsy Endorsement',
          details: 'Conducted live high-res tele-endoscopy review with patient & MO. Formally endorsed 4mm punch biopsy under local anesthesia.',
          tag: 'Specialist Oncologist',
        },
        {
          date: '18 Apr 2025 (Expected)',
          actor: 'Oral Pathology Dept (Area Hospital Paderu)',
          action: 'Specimen Grossing, Sectioning & H&E Histopathology',
          details: 'Cold-chain transport scheduled via Mobile Oncology Van #03. Turnaround estimated within 48 hours.',
          tag: 'Lab Processing',
        },
      ],
    },
    {
      id: 'ADP-001239',
      name: 'Govinda Raju',
      age: 51,
      gender: 'Male',
      mandal: 'Araku Valley',
      village: 'Dumbriguda Border Hamlet',
      abha: '48-1920-5542-8819',
      primaryRisk: 'Khaini Chewing 25 yrs, Chutta 15 yrs',
      timeline: [
        {
          date: '28 Mar 2025',
          actor: 'Mobile Screening Van #01 (Araku)',
          action: 'Community Camp Oral Cancer Triage',
          details: 'AI Vision camera detected exophytic vegetative mass in retro-molar trigone. 96.8% Malignancy Concordance.',
          tag: 'Mobile Van Outreach',
        },
        {
          date: '04 Apr 2025',
          actor: 'Dr. Kavitha S., MBBS (PHC Araku)',
          action: 'Emergency MO Clinical Evaluation',
          details: 'Severe trismus (18mm). Palpable firm ipsilateral jugulodigastric lymph node (level II). Urgent referral issued.',
          tag: 'PHC Doctor Triage',
        },
        {
          date: '15 Apr 2025',
          actor: 'Dr. Ananya Varma, MD & Tumor Board',
          action: 'Multi-Disciplinary Tumor Board Tele-Review',
          details: 'Clinical TNM Staging: cT3 N1 M0. Incisional biopsy approved for processing at KGH Visakhapatnam.',
          tag: 'Tumor Board Workup',
        },
      ],
    },
  ];

  // Navigation Click Handler
  const handleNavSelect = (navName) => {
    setActiveNav(navName);
    if (navName === 'Telehealth Video Gateway') {
      setSelectedReviewCase(referralQueue[0]);
      setIsTelehealthOpen(true);
    } else if (navName === 'Diagnostic Orders & Lab Workups' || navName === 'Diagnostic Summary Report') {
      setIsDiagnosticOrdersModalOpen(true);
    } else if (navName === 'High-Acuity Priority Cases' || navName === 'Clinical Encounter Notes') {
      setSelectedReviewCase(referralQueue[0]);
    } else if (navName === 'Inter-Provider Clinical Feedback') {
      setIsFeedbackModalOpen(true);
    } else if (
      navName === 'Specialist Consultation Schedule' ||
      navName === 'Specialist Directory & Availability Settings'
    ) {
      setIsScheduleModalOpen(true);
    } else if (navName === 'Longitudinal EMR Records') {
      setSelectedEmrPatient(longitudinalPatients[0]);
      setIsEmrModalOpen(true);
    } else if (onToast) {
      onToast(`Navigating to ${navName}`);
    }
  };

  // Right-Sidebar Action Button Clicks
  const handleAction = (action) => {
    switch (action) {
      case 'telehealth-gateway':
        setSelectedReviewCase(referralQueue[0]);
        setIsTelehealthOpen(true);
        if (onToast) onToast('Launching Multi-Party Telehealth Video Gateway...');
        break;
      case 'diagnostic-orders':
        setIsDiagnosticOrdersModalOpen(true);
        break;
      case 'clinical-feedback':
        setIsFeedbackModalOpen(true);
        break;
      case 'directory-settings':
        setIsScheduleModalOpen(true);
        break;
      default:
        break;
    }
  };

  // 1. Authorize / Endorse Biopsy Action
  const handleEndorseBiopsy = (caseItem) => {
    setReferralQueue((prev) =>
      prev.map((c) =>
        c.id === caseItem.id
          ? {
              ...c,
              biopsyEndorsed: true,
              status: 'Biopsy Endorsed',
              statusClass: 'follow-up',
              tnmStage: reviewFormData.tnmStage,
              biopsyType: reviewFormData.biopsyType,
              labDestination: reviewFormData.labDestination,
            }
          : c
      )
    );

    // Also add to Diagnostic Orders
    const newOrder = {
      id: `LAB-2025-${Math.floor(100 + Math.random() * 900)}`,
      patient: caseItem.name,
      patientId: caseItem.patientId,
      phc: caseItem.phc,
      specimen: `${reviewFormData.biopsyType} (${caseItem.lesion})`,
      lab: reviewFormData.labDestination,
      orderDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      priority: 'Urgent',
      courierStatus: 'Cold-Chain Dispatch Authorized',
      status: 'Order Dispatched to PHC',
      statusClass: 'under-review',
      findings: `Clinical Staging: ${reviewFormData.tnmStage}. Endorsed by Dr. Ananya Varma, MD (APMC-2016-89412).`,
    };

    setDiagnosticOrders((prev) => [newOrder, ...prev]);

    if (onToast) {
      onToast(`Biopsy authorized & e-signed for ${caseItem.name}! Requisition sent to ${caseItem.phc}.`);
    }
    setSelectedReviewCase(null);
  };

  // 2. Submit New Diagnostic Order
  const handleCreateLabOrder = (e) => {
    e.preventDefault();
    if (!newLabOrder.patient) return;

    const createdOrder = {
      id: `LAB-2025-${Math.floor(100 + Math.random() * 900)}`,
      patient: newLabOrder.patient,
      patientId: 'ADP-00' + Math.floor(1000 + Math.random() * 9000),
      phc: newLabOrder.phc,
      specimen: newLabOrder.specimen,
      lab: newLabOrder.lab,
      orderDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      priority: newLabOrder.priority,
      courierStatus: 'Order Dispatched to Courier',
      status: 'Awaiting Sample',
      statusClass: 'under-review',
      findings: newLabOrder.notes || 'Routine oncological evaluation order.',
    };

    setDiagnosticOrders((prev) => [createdOrder, ...prev]);
    if (onToast) {
      onToast(`New lab order ${createdOrder.id} successfully created for ${newLabOrder.patient}!`);
    }
    setNewLabOrder({
      patient: '',
      phc: 'PHC Paderu Central',
      specimen: '4mm Punch Biopsy (Labial Mucosa)',
      lab: 'Area Hospital Paderu Histopathology Unit',
      priority: 'Urgent',
      notes: '',
    });
  };

  // 3. Submit Inter-Provider Feedback
  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.message) return;

    const record = {
      id: `FB-2025-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', Just Now',
      toPhc: newFeedback.toPhc,
      doctor: newFeedback.doctor,
      patient: newFeedback.patient,
      subject: newFeedback.subject,
      message: newFeedback.message,
      urgency: newFeedback.urgency,
      status: 'Dispatched to PHC EMR',
    };

    setFeedbackRecords((prev) => [record, ...prev]);
    if (onToast) {
      onToast(`Official Clinical Feedback dispatched to ${newFeedback.doctor} at ${newFeedback.toPhc}!`);
    }
    setNewFeedback({
      toPhc: 'PHC Paderu Central',
      doctor: 'Dr. Sandeep Kumar, MBBS',
      patient: 'Ramesh Babu (REF-2025-086)',
      subject: 'Leukoplakia Monitoring & Habit Cessation Protocol',
      message: '',
      urgency: 'High',
    });
  };

  // 4. Export Diagnostic Orders CSV
  const handleExportLabCSV = () => {
    const headers = ['Order ID', 'Patient Name', 'Patient ABHA/ID', 'Referring PHC', 'Specimen Type', 'Processing Lab', 'Date', 'Priority', 'Courier Status', 'Clinical Findings'];
    const rows = diagnosticOrders.map((o) => [
      o.id,
      `"${o.patient}"`,
      o.patientId,
      `"${o.phc}"`,
      `"${o.specimen}"`,
      `"${o.lab}"`,
      o.orderDate,
      o.priority,
      `"${o.courierStatus}"`,
      `"${o.findings}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AarogyaDrishti_Diagnostic_Lab_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onToast) onToast('Diagnostic Lab Orders exported to CSV successfully.');
  };

  return (
    <div className="dashboard-root">
      {/* Subtle Medical Caduceus Watermark in the background */}
      <div className="dashboard-watermark-bg" aria-hidden="true">
        <img
          src="/caduceus-watermark.png"
          alt="Medical Caduceus Watermark"
          className="watermark-img"
        />
      </div>

      {/* Top Navbar with clean logo in top left */}
      <DashboardNavbar
        dashboardTitle="Specialist Dashboard"
        userName="Dr. Ananya Varma, MD"
        userRole="Head of Oral Oncology & Tele-Triage"
        userAvatar="https://images.unsplash.com/photo-1594824813583-36603a110a11?auto=format&fit=crop&w=120&q=80"
        notificationCount={5}
        onSwitchDashboard={onSwitchDashboard}
        onLogout={onLogout}
      />

      {/* Main Body Grid - 100% Full Display Width */}
      <div className="dash-main-layout full-display">
        {/* Top bar row below navbar: Menu toggle button directly BELOW the logo */}
        <div className="dash-top-menu-bar">
          <Sidebar
            activeNav={activeNav}
            onNavSelect={handleNavSelect}
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
            menuTitle="Specialist Clinical Options"
            customItems={specialistMenuItems}
          />

          <div className="dash-facility-badge">
            <span className="badge-dot" style={{ backgroundColor: '#f97316' }}>●</span>
            <span>
              {language === 'te'
                ? 'స్పెషలిస్ట్ డాష్‌బోర్డ్ • ఏరియా ఆసుపత్రి పాడేరు టెలి-రివ్యూ కేంద్రం'
                : 'Specialist Dashboard • Area Hospital Paderu Tele-Review Center'}
            </span>
            <span
              style={{
                marginLeft: '12px',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: 700,
                backgroundColor: isOnCallActive ? '#dcfce7' : '#fee2e2',
                color: isOnCallActive ? '#166534' : '#991b1b',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Radio size={12} className={isOnCallActive ? 'animate-pulse' : ''} />
              {isOnCallActive ? '24x7 On-Call Active' : 'On-Call Standby'}
            </span>
          </div>
        </div>

        {/* Central Canvas Area - Fills Full Display */}
        <main className="dash-content-canvas full-display">
          <div className="dash-center-col">
            {isTelehealthOpen ? (
              <div style={{ marginBottom: '24px' }}>
                <TeleconsultationSuite
                  patientData={selectedReviewCase || demoPatient}
                  currentUserRole="specialist"
                  onEndCall={() => setIsTelehealthOpen(false)}
                />
              </div>
            ) : (
              <>
                {/* Welcome Banner */}
                <WelcomeBanner
                  doctorName={language === 'te' ? 'డాక్టర్ అనన్య వర్మ, MD' : 'Dr. Ananya Varma, MD'}
                  roleSubtitle={
                    language === 'te'
                      ? 'స్పెషలిస్ట్ డాష్‌బోర్డ్ • ఓరల్ ఆంకాలజీ విభాగం & టెర్షియరీ రివ్యూ (APMC-2016-89412)'
                      : 'Specialist Dashboard • Head of Oral Oncology & Tertiary Review (APMC-2016-89412)'
                  }
                  photoUrl="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=640&q=85"
                />

                {/* 4 Stat Metric Cards with Colored Lines */}
                <StatCards cards={specialistStats} />

                {/* Middle 2 Charts */}
                <div className="charts-dual-row">
                  {/* Left Chart: Referral Triage & Teleconsults */}
                  <div className="chart-card">
                    <div className="chart-header">
                      <div className="chart-title-wrap">
                        <h3>
                          {language === 'te'
                            ? 'స్పెషలిస్ట్ రెఫరల్ ట్రయాజ్ & టెలికన్సల్ట్స్'
                            : 'Specialist Referral Triage & Teleconsults'}
                        </h3>
                        <p>
                          {language === 'te'
                            ? '11 ఐటీడీఏ పాడేరు పీహెచ్‌సీల నుండి వచ్చిన వారపు రెఫరల్స్'
                            : 'Weekly referrals triaged from 11 ITDA Paderu PHCs'}
                        </p>
                      </div>
                      <span className="chart-badge" style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>
                        +18% Monthly Inflow
                      </span>
                    </div>

                    <div className="chart-svg-container">
                      <svg viewBox="0 0 520 180" className="chart-svg" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="specAreaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="30" x2="520" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="0" y1="75" x2="520" y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="0" y1="120" x2="520" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                        {/* Area fill */}
                        <path
                          d="M 20 140 Q 90 90, 160 110 T 300 65 T 440 40 L 500 25 L 500 160 L 20 160 Z"
                          fill="url(#specAreaGrad)"
                        />
                        {/* Trend Line */}
                        <path
                          d="M 20 140 Q 90 90, 160 110 T 300 65 T 440 40 L 500 25"
                          fill="none"
                          stroke="#ea580c"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                        />
                        {/* Secondary Bars */}
                        {[
                          { x: 50, h: 45 },
                          { x: 130, h: 70 },
                          { x: 210, h: 95 },
                          { x: 290, h: 115 },
                          { x: 370, h: 130 },
                          { x: 450, h: 145 },
                        ].map((b, i) => (
                          <rect
                            key={i}
                            x={b.x}
                            y={160 - b.h}
                            width="16"
                            height={b.h}
                            rx="4"
                            fill="#0d9488"
                            opacity="0.75"
                          />
                        ))}
                      </svg>
                    </div>

                    <div className="chart-legend">
                      <div className="legend-item">
                        <span className="legend-dot" style={{ backgroundColor: '#ea580c' }} />
                        <span>Teleconsultation Reviews</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-dot" style={{ backgroundColor: '#0d9488' }} />
                        <span>Confirmed High-Risk Interventions</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Chart: Lesion Staging Distribution */}
                  <div className="chart-card">
                    <div className="chart-header">
                      <div className="chart-title-wrap">
                        <h3>
                          {language === 'te'
                            ? 'లెసియన్ దశలు & హిస్టోపాథాలజీ పంపిణీ'
                            : 'Lesion Staging & Histopathology Distribution'}
                        </h3>
                        <p>
                          {language === 'te'
                            ? 'ప్రస్తుతం రిఫర్ చేయబడిన కేసుల విభజన'
                            : 'Current active referred cohort breakdown'}
                        </p>
                      </div>
                    </div>

                    <div className="donut-body">
                      <div className="donut-graphic">
                        <svg viewBox="0 0 160 160" className="donut-svg">
                          <circle cx="80" cy="80" r="54" fill="none" stroke="#e2e8f0" strokeWidth="22" />
                          {/* Leukoplakia (Orange) */}
                          <circle
                            cx="80"
                            cy="80"
                            r="54"
                            fill="none"
                            stroke="#f97316"
                            strokeWidth="22"
                            strokeDasharray="140 340"
                            strokeDashoffset="0"
                          />
                          {/* Erythroplakia (Teal) */}
                          <circle
                            cx="80"
                            cy="80"
                            r="54"
                            fill="none"
                            stroke="#0d9488"
                            strokeWidth="22"
                            strokeDasharray="95 340"
                            strokeDashoffset="-140"
                          />
                          {/* OSMF (Amber) */}
                          <circle
                            cx="80"
                            cy="80"
                            r="54"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="22"
                            strokeDasharray="65 340"
                            strokeDashoffset="-235"
                          />
                          {/* Malignant SCC (Red) */}
                          <circle
                            cx="80"
                            cy="80"
                            r="54"
                            fill="none"
                            stroke="#dc2626"
                            strokeWidth="22"
                            strokeDasharray="40 340"
                            strokeDashoffset="-300"
                          />
                        </svg>
                        <div className="donut-center-label">
                          <span className="donut-big-num">124</span>
                          <span className="donut-small-sub">Cases</span>
                        </div>
                      </div>

                      <div className="donut-legend-col">
                        <div className="donut-legend-row">
                          <span className="d-dot" style={{ backgroundColor: '#f97316' }} />
                          <span className="d-label">Stage I Leukoplakia (41%)</span>
                        </div>
                        <div className="donut-legend-row">
                          <span className="d-dot" style={{ backgroundColor: '#0d9488' }} />
                          <span className="d-label">Stage II Erythroplakia (28%)</span>
                        </div>
                        <div className="donut-legend-row">
                          <span className="d-dot" style={{ backgroundColor: '#f59e0b' }} />
                          <span className="d-label">OSMF Grade II/III (19%)</span>
                        </div>
                        <div className="donut-legend-row">
                          <span className="d-dot" style={{ backgroundColor: '#dc2626' }} />
                          <span className="d-label">Malignant SCC (12%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specialist Referral Table */}
                <div className="table-card">
                  <div className="table-header">
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                        {language === 'te'
                          ? 'వచ్చిన రిఫరల్ ట్రయాజ్ క్యూ (తీవ్రమైన అత్యవసర కేసులు)'
                          : 'Inbound Referral Triage Queue (High-Acuity Cases)'}
                      </h3>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                        Click any patient to open the Tertiary Oncological Review, Authorize Biopsy, or Launch 3-Way Video
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        className="view-all-link"
                        onClick={() => {
                          setSelectedEmrPatient(longitudinalPatients[0]);
                          setIsEmrModalOpen(true);
                        }}
                        style={{
                          background: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          color: '#0f172a',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <FileText size={14} />
                        <span>Longitudinal EMR Records</span>
                      </button>
                    </div>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table className="patient-table">
                      <thead>
                        <tr>
                          <th>{language === 'te' ? 'రిఫరల్ ఐడీ' : 'Ref ID'}</th>
                          <th>{language === 'te' ? 'రోగి పేరు' : 'Patient Name'}</th>
                          <th>{language === 'te' ? 'రిఫర్ చేసిన పీహెచ్‌సీ' : 'Referring PHC'}</th>
                          <th>{language === 'te' ? 'అనుమానిత గాయం' : 'Suspected Lesion'}</th>
                          <th>{language === 'te' ? 'ఏఐ కచ్చితత్వం' : 'AI Confidence'}</th>
                          <th>{language === 'te' ? 'ట్రయాజ్ స్థితి' : 'Triage Status'}</th>
                          <th style={{ textAlign: 'right' }}>{language === 'te' ? 'స్పెషలిస్ట్ చర్య' : 'Specialist Action'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referralQueue.map((r) => (
                          <tr key={r.id}>
                            <td style={{ fontWeight: 700, color: '#334155' }}>
                              <div>{r.id}</div>
                              <small style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{r.patientId}</small>
                            </td>
                            <td>
                              <div style={{ fontWeight: 700, color: '#0f172a' }}>{r.name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.ageSex}</div>
                            </td>
                            <td style={{ fontWeight: 600, color: '#0d9488' }}>
                              <div>{r.phc}</div>
                              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{r.doctor}</div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, color: '#1e293b' }}>{r.lesion}</div>
                              <span className={`status-pill ${r.riskClass}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                                {r.risk}
                              </span>
                            </td>
                            <td style={{ fontWeight: 800, color: '#ea580c' }}>{r.aiConfidence}</td>
                            <td>
                              <span className={`status-pill ${r.statusClass}`}>{r.status}</span>
                            </td>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedReviewCase(r);
                                  setIsTelehealthOpen(true);
                                  if (onToast) onToast(`Launching 3-Way Telehealth Gateway for ${r.name}`);
                                }}
                                style={{
                                  background: '#f97316',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '8px',
                                  padding: '6px 11px',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  marginRight: '6px',
                                }}
                              >
                                <Video size={13} />
                                <span>{language === 'te' ? '3-వే వీడియో' : '3-Way Video'}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedReviewCase(r);
                                  setReviewFormData({
                                    activeTab: 'clinical',
                                    showAiHeatmap: true,
                                    tnmStage: r.tnmStage || 'cT2 N0 M0',
                                    biopsyType: r.biopsyType || '4mm Punch Biopsy',
                                    labDestination: r.labDestination || 'Area Hospital Paderu Histopathology Unit',
                                    anesthesia: 'Local Infiltration (2% Lignocaine + 1:200,000 Epinephrine)',
                                    prescriptions: [
                                      { med: 'Cap. Lycopene 10mg', dose: '1 Capsule Once Daily (Post Meal)', duration: '30 Days' },
                                      { med: 'Triamcinolone Acetonide 0.1% Paste', dose: 'Topical Application TDS', duration: '14 Days' },
                                      { med: 'Zinc & Vitamin B-Complex with L-Lysine', dose: '1 Tablet Daily', duration: '30 Days' },
                                    ],
                                    phcAdvice: `Advised strict cessation of habits for ${r.name}. Instruct ASHA worker to supervise compliance weekly. Biopsy sample to be preserved in 10% neutral formalin.`,
                                  });
                                }}
                                style={{
                                  background: '#0d9488',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '8px',
                                  padding: '6px 11px',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                }}
                              >
                                <Microscope size={13} />
                                <span>{language === 'te' ? 'ఆంకాలజీ సమీక్ష' : 'Tertiary Review'}</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Action & Info Sidebar */}
          <aside className="dash-right-col">
            {/* Hero Card: Oral Oncology Care */}
            <div
              className="early-detection-hero"
              style={{ background: 'linear-gradient(135deg, #c2410c 0%, #ea580c 100%)' }}
            >
              <div className="hero-photo-layer">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=85"
                  alt="Oral Oncology Review"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=600&q=85';
                  }}
                />
              </div>

              <div className="hero-gradient-overlay" />

              <div className="hero-content">
                <h3>
                  {language === 'te' ? (
                    <>
                      స్పెషలిస్ట్ సమీక్ష <br />
                    </>
                  ) : (
                    <>
                      Tertiary Review <br />
                    </>
                  )}
                  <span>{language === 'te' ? 'ప్రాణాలను కాపాడుతుంది' : 'Saves Lives'}</span>
                </h3>
                <p>
                  {language === 'te'
                    ? 'గిరిజన పీహెచ్‌సీలను ఆధునిక ఆంకాలజీ సంరక్షణతో అనుసంధానించడం'
                    : 'Connecting Tribal PHCs to Advanced Oncology Care'}
                </p>
              </div>
            </div>

            {/* 4 Specialist Action Buttons */}
            <div className="action-buttons-group">
              <button
                type="button"
                className="btn-action-hero orange-grad"
                onClick={() => handleAction('telehealth-gateway')}
                title="Telehealth Video Gateway"
              >
                <div className="btn-left">
                  <Video className="w-4 h-4" />
                  <span>{language === 'te' ? 'టెలిహెల్త్ వీడియో గేట్‌వే' : 'Telehealth Video Gateway'}</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero teal-grad"
                onClick={() => handleAction('diagnostic-orders')}
                title="Diagnostic Orders & Lab Workups"
              >
                <div className="btn-left">
                  <Microscope className="w-4 h-4" />
                  <span>{language === 'te' ? 'రోగనిర్ధారణ ఆర్డర్లు & ల్యాబ్‌లు' : 'Diagnostic Orders & Labs'}</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', color: '#fff' }}
                onClick={() => handleAction('clinical-feedback')}
                title="Inter-Provider Clinical Feedback"
              >
                <div className="btn-left">
                  <Send className="w-4 h-4" />
                  <span>{language === 'te' ? 'పీహెచ్‌సీకి క్లినికల్ ఫీడ్‌బ్యాక్' : 'Inter-Provider Feedback'}</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>

              <button
                type="button"
                className="btn-action-hero"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)', color: '#fff' }}
                onClick={() => handleAction('directory-settings')}
                title="Specialist Directory & Availability Settings"
              >
                <div className="btn-left">
                  <Calendar className="w-4 h-4" />
                  <span>Directory & Availability</span>
                </div>
                <span className="btn-chevron">›</span>
              </button>
            </div>

            {/* Department Schedule Card */}
            <div
              className="schedule-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsScheduleModalOpen(true)}
              title="Click to manage teleconsultation schedule and on-call status"
            >
              <div className="schedule-header">
                <div>
                  <h4 style={{ margin: 0 }}>Specialist Consultation Schedule</h4>
                  <small style={{ color: '#0d9488', fontSize: '0.72rem', fontWeight: 700 }}>
                    Click to Open Full Availability Grid ↗
                  </small>
                </div>
                <span className="schedule-date">15 Apr 2025</span>
              </div>

              <div className="schedule-list">
                {scheduleSlots.slice(0, 3).map((slot, idx) => (
                  <div key={idx} className="schedule-item">
                    <div className="schedule-time">{slot.time.split(' - ')[0]}</div>
                    <div className="schedule-info">
                      <span className="patient-name">
                        {slot.patient} ({slot.phc})
                      </span>
                      <span className="consult-type">{slot.type}</span>
                    </div>
                    <span className={`slot-badge ${slot.statusClass}`}>{slot.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* Footer with Bottom-Left Orange Wave and Copyright */}
      <footer className="dash-bottom-footer">
        <div className="footer-swoosh" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <strong>AAROGYA DRISHTI</strong> &nbsp;|&nbsp; Specialist Dashboard
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          © 2026 AAROGYA DRISHTI. All rights reserved. Area Hospital Paderu.
        </div>
      </footer>

      {/* =========================================================================
          MODAL 1: SPECIALIST TERTIARY ONCOLOGY REVIEW & BIOPSY ENDORSEMENT
         ========================================================================= */}
      {selectedReviewCase && (
        <div className="dash-modal-backdrop" onClick={() => setSelectedReviewCase(null)}>
          <div className="dash-modal" style={{ maxWidth: '900px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '2px solid #ea580c' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#ea580c',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                  }}
                >
                  <Microscope size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    Tertiary Oncological Review & Biopsy Endorsement Console
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Case: <strong>{selectedReviewCase.name}</strong> ({selectedReviewCase.ageSex}) • Ref:{' '}
                    <strong>{selectedReviewCase.id}</strong> • Origin: <strong>{selectedReviewCase.phc}</strong>
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setSelectedReviewCase(null)}>
                ✕
              </button>
            </div>

            {/* Modal Body Tabs */}
            <div style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { key: 'clinical', label: '1. Clinical Presentation & AI Vision', icon: <Eye size={14} /> },
                  { key: 'staging', label: '2. TNM Staging & Biopsy Order', icon: <Microscope size={14} /> },
                  { key: 'rx', label: '3. Treatment & Pre-Op Rx', icon: <FileCheck size={14} /> },
                  { key: 'notes', label: '4. Inter-Provider PHC Advisory', icon: <Send size={14} /> },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setReviewFormData((prev) => ({ ...prev, activeTab: tab.key }))}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      background: reviewFormData.activeTab === tab.key ? '#ea580c' : '#ffffff',
                      color: reviewFormData.activeTab === tab.key ? '#ffffff' : '#475569',
                      boxShadow: reviewFormData.activeTab === tab.key ? '0 2px 4px rgba(234, 88, 12, 0.2)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '70vh', overflowY: 'auto' }}>
              {/* TAB 1: Clinical Presentation & AI Vision */}
              {reviewFormData.activeTab === 'clinical' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '16px' }}>
                  {/* Left: Lesion Photo & AI Segmentation */}
                  <div style={{ background: '#07191e', borderRadius: '12px', padding: '12px', color: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f97316' }}>
                        HIGH-RES ORAL INSPECTION
                      </span>
                      <button
                        type="button"
                        onClick={() => setReviewFormData((prev) => ({ ...prev, showAiHeatmap: !prev.showAiHeatmap }))}
                        style={{
                          background: reviewFormData.showAiHeatmap ? '#ea580c' : '#334155',
                          border: 'none',
                          color: '#fff',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Sparkles size={11} />
                        <span>AI Heatmap Overlay: {reviewFormData.showAiHeatmap ? 'ON' : 'OFF'}</span>
                      </button>
                    </div>

                    <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '220px', background: '#000' }}>
                      <img
                        src={selectedReviewCase.lesionImg}
                        alt="Oral Lesion Inspection"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {reviewFormData.showAiHeatmap && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: '18% 28% 22% 24%',
                            border: '2px dashed #ea580c',
                            borderRadius: '8px',
                            background: 'rgba(234, 88, 12, 0.25)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '6px',
                          }}
                        >
                          <span
                            style={{
                              background: '#dc2626',
                              color: '#fff',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '0.68rem',
                              fontWeight: 800,
                              alignSelf: 'flex-start',
                            }}
                          >
                            AI: {selectedReviewCase.aiConfidence} Concordance
                          </span>
                          <span
                            style={{
                              background: 'rgba(0,0,0,0.7)',
                              color: '#f97316',
                              padding: '2px 4px',
                              borderRadius: '4px',
                              fontSize: '0.64rem',
                              alignSelf: 'flex-end',
                            }}
                          >
                            Focal Margin Induration (8.4mm)
                          </span>
                        </div>
                      )}
                    </div>

                    <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
                      Gemini 1.5 Flash Vision Segmentation: Localized epithelial thickening with central erythematous erosion.
                      Margins irregular, indurated. Suggestive of high-grade dysplastic leukoerythroplakia.
                    </div>
                  </div>

                  {/* Right: History & Physical Findings */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#0f172a' }}>
                        Patient Epidemiological Exposure Profile
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px', fontSize: '0.78rem' }}>
                        <div>
                          <strong style={{ color: '#475569' }}>Habit History:</strong>{' '}
                          <span style={{ color: '#dc2626', fontWeight: 700 }}>{selectedReviewCase.habits}</span>
                        </div>
                        <div>
                          <strong style={{ color: '#475569' }}>Mouth Opening (Inter-incisal):</strong>{' '}
                          <span style={{ color: '#ea580c', fontWeight: 700 }}>{selectedReviewCase.opening}</span>
                        </div>
                        <div>
                          <strong style={{ color: '#475569' }}>Suspected Diagnosis:</strong>{' '}
                          <span style={{ color: '#0f172a', fontWeight: 700 }}>{selectedReviewCase.lesion}</span>
                        </div>
                        <div>
                          <strong style={{ color: '#475569' }}>Referring Clinician:</strong>{' '}
                          <span>
                            {selectedReviewCase.doctor} ({selectedReviewCase.phc})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ background: '#fff7ed', border: '1px solid #fdba74', borderRadius: '10px', padding: '12px' }}>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#c2410c' }}>
                        Referring Medical Officer Clinical Notes
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#7c2d12', lineHeight: 1.45 }}>
                        "{selectedReviewCase.doctorNotes}"
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsTelehealthOpen(true);
                          setSelectedReviewCase(selectedReviewCase);
                        }}
                        style={{
                          flex: 1,
                          background: '#f97316',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <Video size={16} />
                        <span>Launch 3-Way Video Consult Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TNM Staging & Biopsy Order */}
              {reviewFormData.activeTab === 'staging' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#0f172a' }}>
                      Clinical TNM Staging (AJCC 8th Edition - Oral Cavity)
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                          Tumor Size (T)
                        </label>
                        <select
                          value={reviewFormData.tnmStage.split(' ')[0]}
                          onChange={(e) =>
                            setReviewFormData((prev) => ({
                              ...prev,
                              tnmStage: `${e.target.value} ${prev.tnmStage.split(' ')[1]} ${prev.tnmStage.split(' ')[2]}`,
                            }))
                          }
                          style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                        >
                          <option value="cT1">cT1 (Lesion ≤ 2 cm, DOI ≤ 5 mm)</option>
                          <option value="cT2">cT2 (Lesion 2-4 cm, or DOI 5-10 mm)</option>
                          <option value="cT3">cT3 (Lesion &gt; 4 cm, or DOI &gt; 10 mm)</option>
                          <option value="cT4a">cT4a (Moderately advanced local disease)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                          Regional Lymph Nodes (N)
                        </label>
                        <select
                          value={reviewFormData.tnmStage.split(' ')[1]}
                          onChange={(e) =>
                            setReviewFormData((prev) => ({
                              ...prev,
                              tnmStage: `${prev.tnmStage.split(' ')[0]} ${e.target.value} ${prev.tnmStage.split(' ')[2]}`,
                            }))
                          }
                          style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                        >
                          <option value="N0">cN0 (No regional lymph node metastasis)</option>
                          <option value="N1">cN1 (Single ipsilateral node ≤ 3 cm, ENE-)</option>
                          <option value="N2a">cN2a (Single ipsilateral node 3-6 cm)</option>
                          <option value="N2b">cN2b (Multiple ipsilateral nodes ≤ 6 cm)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                          Distant Metastasis (M)
                        </label>
                        <select
                          value={reviewFormData.tnmStage.split(' ')[2]}
                          onChange={(e) =>
                            setReviewFormData((prev) => ({
                              ...prev,
                              tnmStage: `${prev.tnmStage.split(' ')[0]} ${prev.tnmStage.split(' ')[1]} ${e.target.value}`,
                            }))
                          }
                          style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                        >
                          <option value="M0">cM0 (No distant metastasis detected)</option>
                          <option value="M1">cM1 (Distant metastasis present)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Biopsy Order Details */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#0f172a' }}>
                      Diagnostic Biopsy & Histopathology Requisition
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                          Biopsy Procedure Technique
                        </label>
                        <select
                          value={reviewFormData.biopsyType}
                          onChange={(e) => setReviewFormData((prev) => ({ ...prev, biopsyType: e.target.value }))}
                          style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                        >
                          <option value="4mm Punch Biopsy">4mm Punch Biopsy (Mucosal Induration)</option>
                          <option value="Incisional Wedge Biopsy">Incisional Wedge Biopsy (Deep Tumors)</option>
                          <option value="Oral CDx Brush Cytology">Oral CDx Brush Cytology (Pre-Malignant Screening)</option>
                          <option value="Fine Needle Aspiration (FNAC)">Fine Needle Aspiration (FNAC - Neck Nodes)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                          Processing Pathology Facility
                        </label>
                        <select
                          value={reviewFormData.labDestination}
                          onChange={(e) => setReviewFormData((prev) => ({ ...prev, labDestination: e.target.value }))}
                          style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                        >
                          <option value="Area Hospital Paderu Histopathology Unit">Area Hospital Paderu Histopathology Unit (Rapid Turnaround)</option>
                          <option value="King George Hospital (KGH) Visakhapatnam">King George Hospital (KGH) Visakhapatnam (Tertiary Pathology)</option>
                        </select>
                      </div>

                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                          Recommended Anesthesia Protocol
                        </label>
                        <input
                          type="text"
                          value={reviewFormData.anesthesia}
                          onChange={(e) => setReviewFormData((prev) => ({ ...prev, anesthesia: e.target.value }))}
                          style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Treatment & Pre-Op Rx */}
              {reviewFormData.activeTab === 'rx' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a' }}>
                        Prescribed Medical Management & Chemoprevention
                      </h4>
                      <span style={{ fontSize: '0.72rem', color: '#0d9488', fontWeight: 700 }}>
                        Official Form APMC-2016-89412
                      </span>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                      <thead>
                        <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                          <th style={{ padding: '6px 8px' }}>Medication Name</th>
                          <th style={{ padding: '6px 8px' }}>Dosage & Route</th>
                          <th style={{ padding: '6px 8px' }}>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviewFormData.prescriptions.map((rx, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                            <td style={{ padding: '8px', fontWeight: 700, color: '#1e293b' }}>{rx.med}</td>
                            <td style={{ padding: '8px', color: '#475569' }}>{rx.dose}</td>
                            <td style={{ padding: '8px', color: '#0d9488', fontWeight: 700 }}>{rx.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px' }}>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '0.82rem', color: '#991b1b' }}>
                      Addiction De-Addiction Counseling Directives
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.76rem', color: '#7f1d1d' }}>
                      Direct instruction for patient {selectedReviewCase.name}: Complete avoidance of Adda Poga (reverse smoking),
                      commercial gutkha, and chillies. Provide nicotine replacement therapy (NRT 2mg gum) at Koyyuru PHC kiosk.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: Inter-Provider PHC Advisory */}
              {reviewFormData.activeTab === 'notes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#0f172a' }}>
                      Direct Advisory to {selectedReviewCase.doctor} ({selectedReviewCase.phc})
                    </h4>
                    <textarea
                      rows={5}
                      value={reviewFormData.phcAdvice}
                      onChange={(e) => setReviewFormData((prev) => ({ ...prev, phcAdvice: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.82rem',
                        fontFamily: 'inherit',
                        lineHeight: 1.5,
                      }}
                    />
                    <small style={{ color: '#64748b', fontSize: '0.74rem', marginTop: '6px', display: 'block' }}>
                      This note will be automatically dispatched to the PHC Doctor's Dashboard and the village ANM's tablet.
                    </small>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div
              style={{
                padding: '14px 20px',
                background: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Printer size={15} />
                <span>Print Clinical Encounter Document</span>
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedReviewCase(null)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    color: '#64748b',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleEndorseBiopsy(selectedReviewCase)}
                  style={{
                    background: '#ea580c',
                    border: 'none',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(234, 88, 12, 0.3)',
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>✍️ Endorse Biopsy Order & e-Sign</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: DIAGNOSTIC ORDERS & LAB WORKUPS CONSOLE
         ========================================================================= */}
      {isDiagnosticOrdersModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsDiagnosticOrdersModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '920px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '2px solid #0d9488' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#0d9488',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                  }}
                >
                  <Microscope size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    Diagnostic Orders & Histopathology Workups Console
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Cold-Chain Specimen Tracking, Area Hospital Paderu Lab Status & Microscopic Findings
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsDiagnosticOrdersModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '72vh', overflowY: 'auto' }}>
              {/* Order New Lab Workup Collapsible Form */}
              <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: '12px', padding: '16px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#0f766e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Microscope size={16} />
                  <span>Issue New Oral Pathology Lab Requisition</span>
                </h4>
                <form onSubmit={handleCreateLabOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Patient Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Babu"
                      value={newLabOrder.patient}
                      onChange={(e) => setNewLabOrder((prev) => ({ ...prev, patient: e.target.value }))}
                      style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Originating PHC
                    </label>
                    <select
                      value={newLabOrder.phc}
                      onChange={(e) => setNewLabOrder((prev) => ({ ...prev, phc: e.target.value }))}
                      style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                    >
                      <option value="PHC Paderu Central">PHC Paderu Central</option>
                      <option value="PHC Koyyuru">PHC Koyyuru</option>
                      <option value="PHC Araku">PHC Araku</option>
                      <option value="PHC Chintapalli">PHC Chintapalli</option>
                      <option value="PHC Munchingiputtu">PHC Munchingiputtu</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Specimen & Test Requested
                    </label>
                    <select
                      value={newLabOrder.specimen}
                      onChange={(e) => setNewLabOrder((prev) => ({ ...prev, specimen: e.target.value }))}
                      style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                    >
                      <option value="4mm Punch Biopsy (Mucosal)">4mm Punch Biopsy (Mucosal)</option>
                      <option value="Incisional Wedge Biopsy">Incisional Wedge Biopsy</option>
                      <option value="Oral CDx Exfoliative Brush Cytology">Oral CDx Exfoliative Brush Cytology</option>
                      <option value="High-Risk HPV-16 DNA PCR Assay">High-Risk HPV-16 DNA PCR Assay</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Processing Laboratory
                    </label>
                    <select
                      value={newLabOrder.lab}
                      onChange={(e) => setNewLabOrder((prev) => ({ ...prev, lab: e.target.value }))}
                      style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                    >
                      <option value="Area Hospital Paderu Histopathology Unit">Area Hospital Paderu Histopathology Unit</option>
                      <option value="KGH Visakhapatnam Oral Pathology Dept">KGH Visakhapatnam Oral Pathology Dept</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Priority / Turnaround
                    </label>
                    <select
                      value={newLabOrder.priority}
                      onChange={(e) => setNewLabOrder((prev) => ({ ...prev, priority: e.target.value }))}
                      style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                    >
                      <option value="Urgent">Urgent (48-Hour TAT)</option>
                      <option value="STAT">STAT (24-Hour Emergency)</option>
                      <option value="Routine">Routine (5-Day TAT)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        background: '#0d9488',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <Send size={14} />
                      <span>Dispatch Requisition</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Workup Orders Table */}
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a' }}>
                    Active District Diagnostic Pipeline ({diagnosticOrders.length} Orders)
                  </h4>
                  <button
                    type="button"
                    onClick={handleExportLabCSV}
                    style={{
                      background: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      borderRadius: '6px',
                      padding: '5px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Download size={13} />
                    <span>Export CSV</span>
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="patient-table" style={{ fontSize: '0.78rem' }}>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Patient</th>
                        <th>Referring PHC</th>
                        <th>Specimen / Test</th>
                        <th>Lab Facility</th>
                        <th>Status</th>
                        <th>Findings / Courier Telemetry</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diagnosticOrders.map((ord) => (
                        <tr key={ord.id}>
                          <td style={{ fontWeight: 700, color: '#334155' }}>{ord.id}</td>
                          <td>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{ord.patient}</div>
                            <small style={{ color: '#94a3b8' }}>{ord.patientId}</small>
                          </td>
                          <td style={{ color: '#0d9488', fontWeight: 600 }}>{ord.phc}</td>
                          <td style={{ fontWeight: 600, color: '#1e293b' }}>{ord.specimen}</td>
                          <td style={{ fontSize: '0.74rem', color: '#475569' }}>{ord.lab}</td>
                          <td>
                            <span className={`status-pill ${ord.statusClass}`} style={{ fontSize: '0.7rem' }}>
                              {ord.status}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.74rem', color: '#475569', maxWidth: '240px' }}>
                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{ord.courierStatus}</div>
                            <div>{ord.findings}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '12px 20px',
                background: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                onClick={() => setIsDiagnosticOrdersModalOpen(false)}
                style={{
                  background: '#0d9488',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Close Diagnostic Console
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: INTER-PROVIDER CLINICAL FEEDBACK CONSOLE
         ========================================================================= */}
      {isFeedbackModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsFeedbackModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '840px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '2px solid #334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#334155',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                  }}
                >
                  <Send size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    Inter-Provider Clinical Feedback & Counter-Referral System
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Direct oncological directives and guidance issued to Tribal PHC Medical Officers
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsFeedbackModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '72vh', overflowY: 'auto' }}>
              {/* Compose New Feedback Form */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#0f172a' }}>
                  Transmit New Oncological Counter-Referral Note
                </h4>
                <form onSubmit={handleSendFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                        Target PHC Facility
                      </label>
                      <select
                        value={newFeedback.toPhc}
                        onChange={(e) => setNewFeedback((prev) => ({ ...prev, toPhc: e.target.value }))}
                        style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                      >
                        <option value="PHC Paderu Central">PHC Paderu Central</option>
                        <option value="PHC Koyyuru">PHC Koyyuru</option>
                        <option value="PHC Araku">PHC Araku</option>
                        <option value="PHC Chintapalli">PHC Chintapalli</option>
                        <option value="PHC Munchingiputtu">PHC Munchingiputtu</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                        Medical Officer In-Charge
                      </label>
                      <input
                        type="text"
                        value={newFeedback.doctor}
                        onChange={(e) => setNewFeedback((prev) => ({ ...prev, doctor: e.target.value }))}
                        style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                        Referral Case
                      </label>
                      <select
                        value={newFeedback.patient}
                        onChange={(e) => setNewFeedback((prev) => ({ ...prev, patient: e.target.value }))}
                        style={{ width: '100%', padding: '7px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                      >
                        {referralQueue.map((r) => (
                          <option key={r.id} value={`${r.name} (${r.id})`}>
                            {r.name} ({r.id}) - {r.phc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      Clinical Feedback / Counter-Referral Directives
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Enter specific wound management, biopsy transport instructions, or ASHA home visit schedule..."
                      value={newFeedback.message}
                      onChange={(e) => setNewFeedback((prev) => ({ ...prev, message: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.8rem',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="submit"
                      style={{
                        background: '#334155',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Send size={14} />
                      <span>Transmit Official Advisory</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Feed of Transmitted Feedback */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a' }}>
                  Recently Transmitted Directives & Counter-Referrals
                </h4>
                {feedbackRecords.map((fb) => (
                  <div key={fb.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, color: '#334155', fontSize: '0.82rem' }}>{fb.id}</span>
                        <span style={{ color: '#0d9488', fontWeight: 700, fontSize: '0.8rem' }}>
                          To: {fb.doctor} ({fb.toPhc})
                        </span>
                        <span style={{ color: '#64748b', fontSize: '0.74rem' }}>• {fb.patient}</span>
                      </div>
                      <span
                        style={{
                          background: fb.urgency === 'Critical' ? '#fee2e2' : '#f1f5f9',
                          color: fb.urgency === 'Critical' ? '#dc2626' : '#475569',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                        }}
                      >
                        {fb.urgency} Priority
                      </span>
                    </div>

                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.8rem', marginBottom: '4px' }}>
                      {fb.subject}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', lineHeight: 1.45 }}>{fb.message}</p>
                    <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
                      <span>{fb.date}</span>
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>✓ {fb.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: '12px 20px',
                background: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                onClick={() => setIsFeedbackModalOpen(false)}
                style={{
                  background: '#334155',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Close Feedback Console
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: SPECIALIST DIRECTORY & AVAILABILITY ROSTER
         ========================================================================= */}
      {isScheduleModalOpen && (
        <div className="dash-modal-backdrop" onClick={() => setIsScheduleModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '840px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '2px solid #7c3aed' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#7c3aed',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                  }}
                >
                  <Calendar size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    Specialist Consultation Schedule & Availability Settings
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Multi-PHC Tele-Triage Rosters, Emergency Pager Status & Tertiary Oncology Coverage
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsScheduleModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '72vh', overflowY: 'auto' }}>
              {/* Emergency Pager Toggle Banner */}
              <div
                style={{
                  background: isOnCallActive ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${isOnCallActive ? '#86efac' : '#fca5a5'}`,
                  borderRadius: '12px',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Radio size={16} color={isOnCallActive ? '#16a34a' : '#dc2626'} />
                    <h4 style={{ margin: 0, fontSize: '0.9rem', color: isOnCallActive ? '#166534' : '#991b1b' }}>
                      24x7 Emergency Oncological Tele-Pager: {isOnCallActive ? 'ACTIVE (Paderu District)' : 'STANDBY'}
                    </h4>
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.76rem', color: '#475569' }}>
                    When active, urgent bleeding lesions or acute trismus cases from all 11 Mandals route directly to Dr. Ananya's phone.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOnCallActive((prev) => !prev);
                    if (onToast) onToast(`Emergency On-Call Pager set to ${!isOnCallActive ? 'ACTIVE' : 'STANDBY'}`);
                  }}
                  style={{
                    background: isOnCallActive ? '#16a34a' : '#dc2626',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {isOnCallActive ? 'Toggle Standby' : 'Activate On-Call'}
                </button>
              </div>

              {/* Consultation Slots for Today */}
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a' }}>
                    Today's Teleconsultation Appointments (15 Apr 2025)
                  </h4>
                  <span style={{ fontSize: '0.74rem', color: '#7c3aed', fontWeight: 700 }}>
                    4 Scheduled Consultations
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {scheduleSlots.map((slot, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 12px',
                        background: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', minWidth: '130px' }}>
                          <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                          {slot.time}
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.84rem', color: '#0f172a' }}>{slot.patient}</strong>
                          <span style={{ fontSize: '0.76rem', color: '#0d9488', marginLeft: '6px' }}>({slot.phc})</span>
                          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{slot.type}</div>
                        </div>
                      </div>
                      <span className={`slot-badge ${slot.statusClass}`}>{slot.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialist Directory */}
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#0f172a' }}>
                  Regional Specialist & Oncology Faculty Directory (ITDA Paderu Network)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {specialistDirectory.map((spec, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.82rem' }}>{spec.name}</div>
                      <div style={{ fontSize: '0.74rem', color: '#7c3aed', fontWeight: 600 }}>{spec.role}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{spec.facility} • {spec.regId}</div>
                      <div style={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className={`status-pill ${spec.statusClass}`} style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                          {spec.status}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#0d9488', fontWeight: 700 }}>{spec.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '12px 20px',
                background: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                style={{
                  background: '#7c3aed',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Save & Close Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: LONGITUDINAL PATIENT EMR & ONCOLOGY TIMELINE
         ========================================================================= */}
      {isEmrModalOpen && selectedEmrPatient && (
        <div className="dash-modal-backdrop" onClick={() => setIsEmrModalOpen(false)}>
          <div className="dash-modal" style={{ maxWidth: '840px' }} onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header" style={{ borderBottom: '2px solid #2563eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: '#2563eb',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                  }}
                >
                  <FileText size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                    Longitudinal Patient EMR & Clinical Timeline
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    ABDM Interoperable Health Record (FHIR) • <strong>{selectedEmrPatient.name}</strong> ({selectedEmrPatient.id})
                  </p>
                </div>
              </div>
              <button type="button" className="close-modal-btn" onClick={() => setIsEmrModalOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '72vh', overflowY: 'auto' }}>
              {/* Patient Demographics Card */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>PATIENT NAME</span>
                    <strong style={{ color: '#0f172a' }}>{selectedEmrPatient.name}</strong> ({selectedEmrPatient.age}/{selectedEmrPatient.gender})
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>ABHA HEALTH ID</span>
                    <strong style={{ color: '#2563eb' }}>{selectedEmrPatient.abha}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>JURISDICTION</span>
                    <span>{selectedEmrPatient.mandal} • {selectedEmrPatient.village}</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>CHRONIC EXPOSURE</span>
                    <span style={{ color: '#dc2626', fontWeight: 700 }}>{selectedEmrPatient.primaryRisk}</span>
                  </div>
                </div>
              </div>

              {/* Longitudinal Journey Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#0f172a' }}>
                  Chronological Care Continuum (Hamlet Outreach → PHC MO → Specialist Teleconsult → Lab)
                </h4>

                <div style={{ position: 'relative', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Vertical Line */}
                  <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: '#cbd5e1' }} />

                  {selectedEmrPatient.timeline.map((event, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      {/* Node Bullet */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '-24px',
                          top: '2px',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: '#2563eb',
                          border: '3px solid #eff6ff',
                        }}
                      />
                      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.84rem' }}>{event.action}</span>
                          <span
                            style={{
                              background: '#eff6ff',
                              color: '#2563eb',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                            }}
                          >
                            {event.tag}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#0d9488', fontWeight: 600, marginBottom: '4px' }}>
                          {event.actor} • {event.date}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', lineHeight: 1.45 }}>{event.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '12px 20px',
                background: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Printer size={14} />
                <span>Print Official ABDM EMR</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEmrModalOpen(false)}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Close EMR Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Specialist Copilot Chatbot */}
      <AIChatBot dashboardType="specialist_dashboard" />
    </div>
  );
}
