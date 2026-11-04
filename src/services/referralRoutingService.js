/**
 * Aarogya Drishti - ITDA Paderu Geo-Routing, Referral Hierarchy & Clinical Registry
 * Fully compliant with AAROHAN Hackathon 2026 Detailed Functional Requirements:
 * Modules A, B, C, D, E, F, G, H, I, J
 */

export const ITDA_PADERU_MANDALS = [
  {
    mandal: 'G. Madugula',
    mandalTe: 'జి. మాడుగుల',
    phc: {
      id: 'PHC-GM-01',
      name: 'G. Madugula Primary Health Centre',
      nameTe: 'జి. మాడుగుల ప్రాథమిక ఆరోగ్య కేంద్రం',
      medicalOfficer: 'Dr. Sandeep Kumar, MBBS',
      contact: '+91 89123 45601',
    },
    villages: [
      {
        village: 'G. Madugula',
        villageTe: 'జి. మాడుగుల',
        panchayat: 'G. Madugula Central',
        anm: {
          id: 'ANM-GM-01',
          name: 'Lakshmi Devi, GNM',
          nameTe: 'లక్ష్మీ దేవి (ఏఎన్‌ఎం)',
          subCentre: 'G. Madugula Sub-Centre',
          contact: '+91 94912 38012',
        },
      },
      {
        village: 'Vanabhasingi',
        villageTe: 'వానభాసింగి',
        panchayat: 'Vanabhasingi Gram Panchayat',
        anm: {
          id: 'ANM-GM-02',
          name: 'M. Parvathi, GNM',
          nameTe: 'ఎం. పార్వతి (ఏఎన్‌ఎం)',
          subCentre: 'Vanabhasingi Sub-Centre',
          contact: '+91 94912 38013',
        },
      },
      {
        village: 'Kujjeli',
        villageTe: 'కుజ్జెలి',
        panchayat: 'Kujjeli Tribal Habitation',
        anm: {
          id: 'ANM-GM-03',
          name: 'K. Satyavathi, GNM',
          nameTe: 'కె. సత్యవతి (ఏఎన్‌ఎం)',
          subCentre: 'Kujjeli Sub-Centre',
          contact: '+91 94912 38014',
        },
      },
      {
        village: 'Nurmati',
        villageTe: 'నూర్మతి',
        panchayat: 'Nurmati Agency Panchayat',
        anm: {
          id: 'ANM-GM-04',
          name: 'B. Devamma, ANM',
          nameTe: 'బి. దేవమ్మ (ఏఎన్‌ఎం)',
          subCentre: 'Nurmati Sub-Centre',
          contact: '+91 94912 38015',
        },
      },
    ],
  },
  {
    mandal: 'Paderu',
    mandalTe: 'పాడేరు',
    phc: {
      id: 'PHC-PAD-01',
      name: 'Paderu Urban Community Health Centre & PHC',
      nameTe: 'పాడేరు ప్రాథమిక ఆరోగ్య కేంద్రం',
      medicalOfficer: 'Dr. R. Ramachandra Murthy, MBBS',
      contact: '+91 89123 45602',
    },
    villages: [
      {
        village: 'Paderu Town',
        villageTe: 'పాడేరు టౌన్',
        panchayat: 'Paderu Major Panchayat',
        anm: {
          id: 'ANM-PAD-01',
          name: 'G. Bhavani, GNM',
          nameTe: 'జి. భవాని (ఏఎన్‌ఎం)',
          subCentre: 'Paderu Main Sub-Centre',
          contact: '+91 94912 38020',
        },
      },
      {
        village: 'Minumuluru',
        villageTe: 'మినుములూరు',
        panchayat: 'Minumuluru Panchayat',
        anm: {
          id: 'ANM-PAD-02',
          name: 'S. Radhika, ANM',
          nameTe: 'ఎస్. రాధిక (ఏఎన్‌ఎం)',
          subCentre: 'Minumuluru Sub-Centre',
          contact: '+91 94912 38021',
        },
      },
      {
        village: 'Kinchumanda',
        villageTe: 'కించుమండ',
        panchayat: 'Kinchumanda Panchayat',
        anm: {
          id: 'ANM-PAD-03',
          name: 'P. Aruna, ANM',
          nameTe: 'పి. అరుణ (ఏఎన్‌ఎం)',
          subCentre: 'Kinchumanda Sub-Centre',
          contact: '+91 94912 38022',
        },
      },
    ],
  },
  {
    mandal: 'Araku Valley',
    mandalTe: 'అరకు లోయ',
    phc: {
      id: 'PHC-ARK-01',
      name: 'Araku Valley Primary Health Centre',
      nameTe: 'అరకు లోయ ప్రాథమిక ఆరోగ్య కేంద్రం',
      medicalOfficer: 'Dr. Kavitha S., MBBS',
      contact: '+91 89123 45603',
    },
    villages: [
      {
        village: 'Araku Town',
        villageTe: 'అరకు టౌన్',
        panchayat: 'Araku Valley Central',
        anm: {
          id: 'ANM-ARK-01',
          name: 'V. Ramanamma, GNM',
          nameTe: 'వి. రమణమ్మ (ఏఎన్‌ఎం)',
          subCentre: 'Araku Sub-Centre',
          contact: '+91 94912 38030',
        },
      },
      {
        village: 'Dumbriguda',
        villageTe: 'డుంబ్రిగుడ',
        panchayat: 'Dumbriguda Agency Panchayat',
        anm: {
          id: 'ANM-ARK-02',
          name: 'K. Padma, ANM',
          nameTe: 'కె. పద్మ (ఏఎన్‌ఎం)',
          subCentre: 'Dumbriguda Sub-Centre',
          contact: '+91 94912 38031',
        },
      },
    ],
  },
  {
    mandal: 'Chintapalli',
    mandalTe: 'చింతపల్లి',
    phc: {
      id: 'PHC-CP-01',
      name: 'Chintapalli Primary Health Centre',
      nameTe: 'చింతపల్లి ప్రాథమిక ఆరోగ్య కేంద్రం',
      medicalOfficer: 'Dr. Rajesh Varma, BDS, MBBS',
      contact: '+91 89123 45604',
    },
    villages: [
      {
        village: 'Chintapalli Main',
        villageTe: 'చింతపల్లి మెయిన్',
        panchayat: 'Chintapalli Panchayat',
        anm: {
          id: 'ANM-CP-01',
          name: 'T. Jyothi, GNM',
          nameTe: 'టి. జ్యోతి (ఏఎన్‌ఎం)',
          subCentre: 'Chintapalli Sub-Centre',
          contact: '+91 94912 38040',
        },
      },
      {
        village: 'Lambasingi',
        villageTe: 'లంబసింగి',
        panchayat: 'Lambasingi Tribal Habitation',
        anm: {
          id: 'ANM-CP-02',
          name: 'K. Mary, ANM',
          nameTe: 'కె. మేరీ (ఏఎన్‌ఎం)',
          subCentre: 'Lambasingi Sub-Centre',
          contact: '+91 94912 38041',
        },
      },
    ],
  },
  {
    mandal: 'Koyyuru',
    mandalTe: 'కొయ్యూరు',
    phc: {
      id: 'PHC-KY-01',
      name: 'Koyyuru Primary Health Centre',
      nameTe: 'కొయ్యూరు ప్రాథమిక ఆరోగ్య కేంద్రం',
      medicalOfficer: 'Dr. M. Prasad, MBBS',
      contact: '+91 89123 45605',
    },
    villages: [
      {
        village: 'Koyyuru',
        villageTe: 'కొయ్యూరు',
        panchayat: 'Koyyuru Central',
        anm: {
          id: 'ANM-KY-01',
          name: 'A. Subbalakshmi, GNM',
          nameTe: 'ఎ. సుబ్బలక్ష్మి (ఏఎన్‌ఎం)',
          subCentre: 'Koyyuru Sub-Centre',
          contact: '+91 94912 38050',
        },
      },
      {
        village: 'Mampa',
        villageTe: 'మాంప',
        panchayat: 'Mampa Agency Panchayat',
        anm: {
          id: 'ANM-KY-02',
          name: 'S. Kumari, ANM',
          nameTe: 'ఎస్. కుమారి (ఏఎన్‌ఎం)',
          subCentre: 'Mampa Sub-Centre',
          contact: '+91 94912 38051',
        },
      },
    ],
  },
  {
    mandal: 'Munchingiputtu',
    mandalTe: 'ముంచంగిపుట్టు',
    phc: {
      id: 'PHC-MCP-01',
      name: 'Munchingiputtu Primary Health Centre',
      nameTe: 'ముంచంగిపుట్టు ప్రాథమిక ఆరోగ్య కేంద్రం',
      medicalOfficer: 'Dr. Swathi K., MBBS',
      contact: '+91 89123 45606',
    },
    villages: [
      {
        village: 'Munchingiputtu Town',
        villageTe: 'ముంచంగిపుట్టు టౌన్',
        panchayat: 'Munchingiputtu Panchayat',
        anm: {
          id: 'ANM-MCP-01',
          name: 'G. Saraswathi, GNM',
          nameTe: 'జి. సరస్వతి (ఏఎన్‌ఎం)',
          subCentre: 'Munchingiputtu Sub-Centre',
          contact: '+91 94912 38060',
        },
      },
    ],
  },
];

// Designated Tertiary Specialist Center for all ITDA Paderu referrals
export const TERTIARY_SPECIALIST_CENTER = {
  hospitalId: 'AH-PADERU-ONCOLOGY',
  hospitalName: 'Area Hospital Paderu - Oral Oncology Review & Tele-Triage Center',
  hospitalNameTe: 'ఏరియా హాస్పిటల్ పాడేరు • నోటి ఆంకాలజీ & టెలి-రివ్యూ కేంద్రం',
  specialistName: 'Dr. Ananya Varma, MD (Surgical Oncology / Head & Neck)',
  specialistNameTe: 'డాక్టర్ అనన్య వర్మ (స్పెషలిస్ట్ ఆంకాలజిస్ట్)',
  specialistReg: 'APMC-2016-89412',
  specialistContact: '+91 89123 45999',
  address: 'ITDA Agency Area Hospital Campus, Paderu - 531024',
};

// Initial Synthetic Patient Callset - Compulsory Demonstration Cases from Hackathon PDF
const INITIAL_DEMO_PATIENTS = [
  {
    id: 'ADP-2026-0046',
    name: 'Appa Rao (Compulsory Hackathon Demo)',
    nameTe: 'అప్పారావు (హాకథాన్ డెమో కేస్)',
    ageSex: '46 / M',
    age: 46,
    gender: 'Male',
    contact: '+91 98480 12345',
    guardian: 'Suramma (Wife)',
    abhaId: '14-9041-7821-4601',
    mandal: 'G. Madugula',
    village: 'G. Madugula',
    panchayat: 'G. Madugula Central',
    assignedAnm: {
      id: 'ANM-GM-01',
      name: 'Lakshmi Devi, GNM',
      subCentre: 'G. Madugula Sub-Centre',
      contact: '+91 94912 38012',
    },
    assignedPhc: {
      id: 'PHC-GM-01',
      name: 'G. Madugula Primary Health Centre',
      medicalOfficer: 'Dr. Sandeep Kumar, MBBS',
    },
    status: 'referred_to_specialist',
    statusTe: 'స్పెషలిస్ట్‌కు రెఫర్ చేయబడింది (అత్యవసరం)',
    registeredDate: 'Today, 08:30 AM',
    exposureHistory: [
      { type: 'reverse_smoking', label: 'Reverse Smoking (Adda Poga / Chutta)', durationYears: 18, frequency: '4-6 chuttas/day', active: true },
      { type: 'gutkha_chewing', label: 'Gutkha / Khaini Chewing', durationYears: 12, frequency: '3-4 sachets/day', active: true },
    ],
    symptoms: [
      { type: 'ulcer', label: 'Non-healing Palatal / Buccal Mucosal Erosion', durationWeeks: 8, severity: 'Indurated, bleeding on touch' },
      { type: 'trismus', label: 'Restricted Mouth Opening (22 mm inter-incisal distance)', durationWeeks: 12, severity: 'Grade II Trismus' },
      { type: 'burning', label: 'Burning sensation with spicy foods', durationWeeks: 16, severity: 'Moderate' },
    ],
    consents: {
      examinationConsent: true,
      imagingConsent: true,
      teleconsultConsent: true,
      dataProcessingConsent: true,
      timestamp: '2025-04-15T08:35:00Z',
    },
    oralPhotos: [
      {
        site: 'Hard Palate & Right Buccal Mucosa',
        url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
        capturedAt: 'Today, 08:45 AM',
        quality: { lighting: 'Optimal', blur: 'Clear Focus', glare: 'Controlled' },
      },
    ],
    aiAssessment: {
      finding: 'suspicious_finding',
      classification: 'High Suspicion - Potentially Malignant (Precancer)',
      concordanceScore: 89.4,
      visualBiomarkers: [
        'Localized mucosal thickening with irregular indurated margins',
        'Stippled erythematous ulceration on hard palate',
        'Keratotic leukoplakic border around minor salivary gland orifices',
      ],
      riskFactorCorrelation: 'Strong correlation with Adda Poga reverse smoking practice prevalent in tribal agency',
      cancerRiskAssessment: 'Requires urgent histopathological biopsy confirmation to rule out early micro-invasive SCC',
      modelUsed: 'Google Gemini 1.5 Flash Vision Oncology (Demo v2.4)',
      modelProvenance: 'Research & Screening Decision Support Model • Non-Diagnostic',
      notForClinicalUseDisclaimer: '⚠️ DEMONSTRATION MODEL ONLY — NOT VALIDATED CANCER DETECTOR. Does not replace biopsy/pathology.',
      doctorAgreement: {
        status: 'agreed',
        clinicianName: 'Dr. Sandeep Kumar, MBBS',
        signedAt: 'Today, 09:15 AM',
        notes: 'Confirmed clinical presentation matches Adda Poga keratosis. Urgent 3-way teleconsultation initiated.',
      },
    },
    referral: {
      referralId: 'REF-ITDA-2026-0046',
      referralDate: 'Today, 09:15 AM',
      priority: 'urgent',
      priorityLabel: 'URGENT (Action within 48-72h)',
      priorityLabelTe: 'అత్యవసరం (48-72 గంటల్లోపు)',
      referringDoctor: 'Dr. Sandeep Kumar, MBBS (G. Madugula PHC)',
      destinationHospital: 'Area Hospital Paderu - Oral Oncology Review & Tele-Triage Center',
      specialistName: 'Dr. Ananya Varma, MD (Surgical Oncology / Head & Neck)',
      clinicalRationale: 'Compulsory Hackathon Demo case: 46/M with 18-year reverse smoking habit. Suspicious palatal indurated lesion + trismus. Urgent biopsy authorization requested.',
      indicatedProcedures: ['4mm Punch Biopsy (Histopathology)', 'CDx Brush Cytology', 'TNM Staging'],
      appointmentDate: '15 Apr 2025, 10:30 AM',
      appointmentConfirmed: true,
      status: 'Specialist Tele-Review Active',
    },
    teleconsult: {
      sessionId: 'paderu-telemed-101',
      sessionPin: '849201',
      scheduledTime: '15 Apr 2025, 10:30 AM',
      mode: '3-way',
      status: 'live_active',
      participants: [
        { role: 'specialist', name: 'Dr. Ananya Varma, MD', ready: true },
        { role: 'doctor', name: 'Dr. Sandeep Kumar, MBBS', ready: true },
        { role: 'patient', name: 'Appa Rao & ANM Lakshmi Devi', ready: true },
      ],
    },
    investigations: [
      {
        id: 'INV-2026-091',
        type: '4mm Punch Biopsy (Hard Palate)',
        lab: 'Area Hospital Paderu Oral Pathology Unit',
        orderedDate: '15 Apr 2025',
        status: 'sample_collected',
        statusLabel: 'Sample Collected • Cold-Chain Mobile Van #03',
        reportPending: true,
      },
    ],
    navigation: {
      assignedNavigator: 'ASHA Lakshmi Devi (G. Madugula)',
      navigatorContact: '+91 94912 38012',
      contactAttempts: [
        { date: '14 Apr 2025', type: 'Home Visit', outcome: 'Patient counseled on biopsy procedure' },
        { date: '15 Apr 2025', type: 'Phone Call', outcome: 'Escorted patient to PHC Telehealth Kiosk' },
      ],
      transportAssistance: '108 Agency Ambulance Dispatched + ₹500 Tribal Travel Voucher',
      remindersSent: 2,
      lastReminderLanguage: 'Telugu',
    },
    timeline: [
      { date: '12 Apr 2025', actor: 'ANM Lakshmi Devi', action: 'Hamlet Screening Visit', details: 'Identified oral lesion in G. Madugula village. Recorded habit exposure and photos.' },
      { date: '13 Apr 2025', actor: 'Dr. Sandeep Kumar, MBBS', action: 'Primary Clinical Triage', details: 'Confirmed mucosal induration and Grade II Trismus. Initiated urgent teleconsult referral.' },
      { date: '15 Apr 2025', actor: 'Dr. Ananya Varma, MD', action: '3-Way Specialist Teleconsult', details: 'Authorized 4mm punch biopsy under 2% lignocaine. Prescribed Cap. Lycopene 10mg.' },
    ],
  },
  {
    id: 'ADP-2026-0047',
    name: 'Somulu Korra',
    nameTe: 'సోములు కొర్ర',
    ageSex: '48 / M',
    age: 48,
    gender: 'Male',
    contact: '+91 94912 77889',
    guardian: 'Chitti Babu (Father)',
    abhaId: '91-8842-1923-5510',
    mandal: 'G. Madugula',
    village: 'Vanabhasingi',
    panchayat: 'Vanabhasingi Gram Panchayat',
    assignedAnm: {
      id: 'ANM-GM-02',
      name: 'M. Parvathi, GNM',
      subCentre: 'Vanabhasingi Sub-Centre',
      contact: '+91 94912 38013',
    },
    assignedPhc: {
      id: 'PHC-GM-01',
      name: 'G. Madugula Primary Health Centre',
      medicalOfficer: 'Dr. Sandeep Kumar, MBBS',
    },
    status: 'phc_triage',
    statusTe: 'పీహెచ్‌సీ ట్రయాజ్ సమీక్షలో ఉంది',
    registeredDate: 'Today, 10:45 AM',
    exposureHistory: [
      { type: 'areca_nut', label: 'Areca Nut / Betel Quid with Raw Tobacco', durationYears: 14, frequency: '5-6 times/day', active: true },
    ],
    symptoms: [
      { type: 'trismus', label: 'Restricted Mouth Opening (18 mm - 2 fingers)', durationWeeks: 16, severity: 'Severe Trismus' },
      { type: 'blanching', label: 'Blanched vertical fibrous bands on buccal mucosa', durationWeeks: 24, severity: 'OSMF Grade III' },
    ],
    consents: {
      examinationConsent: true,
      imagingConsent: true,
      teleconsultConsent: true,
      dataProcessingConsent: true,
      timestamp: '2025-04-15T10:45:00Z',
    },
    oralPhotos: [],
    aiAssessment: null,
    referral: null,
    teleconsult: null,
    investigations: [],
    navigation: {
      assignedNavigator: 'ASHA Parvathi',
      contactAttempts: [{ date: 'Today, 10:50 AM', type: 'Phone Call', outcome: 'Advised to avoid chillies' }],
      transportAssistance: 'Pending Specialist Order',
      remindersSent: 1,
    },
    timeline: [
      { date: 'Today, 10:45 AM', actor: 'Dr. Sandeep Kumar, MBBS', action: 'Direct Walk-in Intake', details: 'Enrolled via PHC Direct Registration. Scheduled for visual screening.' },
    ],
  },
  {
    id: 'ADP-2026-0048',
    name: 'Savitri K.',
    nameTe: 'సావిత్రి కె.',
    ageSex: '28 / F',
    age: 28,
    gender: 'Female',
    contact: '+91 98492 34567',
    guardian: 'N. Rama Rao (Husband)',
    abhaId: '32-9481-2290-1184',
    mandal: 'Koyyuru',
    village: 'Mampa',
    panchayat: 'Mampa Agency Panchayat',
    assignedAnm: {
      id: 'ANM-KY-02',
      name: 'S. Kumari, ANM',
      subCentre: 'Mampa Sub-Centre',
      contact: '+91 94912 38051',
    },
    assignedPhc: {
      id: 'PHC-KY-01',
      name: 'Koyyuru Primary Health Centre',
      medicalOfficer: 'Dr. M. Prasad, MBBS',
    },
    status: 'referred_to_specialist',
    statusTe: 'స్పెషలిస్ట్‌కు రెఫర్ చేయబడింది (అత్యవసరం)',
    registeredDate: 'Yesterday, 04:20 PM',
    exposureHistory: [
      { type: 'reverse_smoking', label: 'Reverse Smoking (Adda Poga)', durationYears: 8, frequency: '3-4 chuttas/day', active: true },
      { type: 'gutkha_chewing', label: 'Gutkha', durationYears: 5, frequency: '2 sachets/day', active: true },
    ],
    symptoms: [
      { type: 'erythroplakia', label: 'Erythroplakia on Left Lateral Tongue', durationWeeks: 6, severity: 'Velvety red plaque with bleeding' },
    ],
    consents: {
      examinationConsent: true,
      imagingConsent: true,
      teleconsultConsent: true,
      dataProcessingConsent: true,
      timestamp: '2025-04-14T16:25:00Z',
    },
    oralPhotos: [
      {
        site: 'Lateral Tongue',
        url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
        capturedAt: 'Yesterday, 04:30 PM',
        quality: { lighting: 'Optimal', blur: 'Clear Focus', glare: 'Controlled' },
      },
    ],
    aiAssessment: {
      finding: 'suspicious_finding',
      classification: 'High Suspicion - Erythroplakic Lesion',
      concordanceScore: 94.2,
      modelUsed: 'Google Gemini 1.5 Flash Vision Oncology (Demo v2.4)',
      modelProvenance: 'Research & Screening Decision Support Model • Non-Diagnostic',
      notForClinicalUseDisclaimer: '⚠️ DEMONSTRATION MODEL ONLY — NOT VALIDATED CANCER DETECTOR.',
      doctorAgreement: {
        status: 'agreed',
        clinicianName: 'Dr. M. Prasad, MBBS',
        signedAt: 'Yesterday, 05:00 PM',
        notes: 'Erythroplakia has >85% histological dysplasia risk. Immediate specialist biopsy authorized.',
      },
    },
    referral: {
      referralId: 'REF-2025-089',
      referralDate: '14 Apr 2025',
      priority: 'urgent',
      priorityLabel: 'URGENT (Action within 48h)',
      priorityLabelTe: 'అత్యవసరం (48 గంటల్లోపు)',
      referringDoctor: 'Dr. M. Prasad, MBBS (PHC Koyyuru)',
      destinationHospital: 'Area Hospital Paderu - Oral Oncology Review & Tele-Triage Center',
      specialistName: 'Dr. Ananya Varma, MD (Surgical Oncology / Head & Neck)',
      clinicalRationale: '28/F with 6-week persistent lateral tongue erythroplakia. Burning on touch. Urgent punch biopsy needed.',
      indicatedProcedures: ['4mm Punch Biopsy', 'Clinical Staging'],
      appointmentDate: '15 Apr 2025, 10:30 AM',
      appointmentConfirmed: true,
      status: 'Biopsy Authorized by Specialist',
    },
    teleconsult: {
      sessionId: 'paderu-telemed-102',
      sessionPin: '992144',
      scheduledTime: '15 Apr 2025, 10:30 AM',
      mode: '3-way',
      status: 'scheduled',
      participants: [
        { role: 'specialist', name: 'Dr. Ananya Varma, MD', ready: true },
        { role: 'doctor', name: 'Dr. M. Prasad, MBBS', ready: true },
        { role: 'patient', name: 'Savitri K.', ready: true },
      ],
    },
    investigations: [
      {
        id: 'LAB-2025-091',
        type: '4mm Punch Biopsy (Lateral Tongue)',
        lab: 'Area Hospital Paderu Histopathology Unit',
        orderedDate: '15 Apr 2025',
        status: 'in_transit',
        statusLabel: 'Cold-Chain Mobile Van #03 En Route',
        reportPending: true,
      },
    ],
    navigation: {
      assignedNavigator: 'ASHA Kumari (Mampa)',
      contactAttempts: [{ date: '14 Apr 2025', type: 'Home Visit', outcome: 'Confirmed attendance for biopsy' }],
      transportAssistance: 'Mobile Screening Van Transport Arranged',
      remindersSent: 2,
    },
    timeline: [
      { date: '14 Apr 2025', actor: 'Dr. M. Prasad, MBBS', action: 'Urgent PHC Triage', details: 'Identified erythroplakia. Generated referral REF-2025-089.' },
      { date: '15 Apr 2025', actor: 'Dr. Ananya Varma, MD', action: 'Specialist Endorsement', details: 'Authorized 4mm punch biopsy and digital sign APMC-2016-89412.' },
    ],
  },
  {
    id: 'ADP-2026-0049',
    name: 'Govinda Raju',
    nameTe: 'గోవింద రాజు',
    ageSex: '51 / M',
    age: 51,
    gender: 'Male',
    contact: '+91 94401 22334',
    guardian: 'Lakshmi (Wife)',
    abhaId: '48-1920-5542-8819',
    mandal: 'Araku Valley',
    village: 'Dumbriguda',
    panchayat: 'Dumbriguda Agency Panchayat',
    assignedAnm: {
      id: 'ANM-ARK-02',
      name: 'K. Padma, ANM',
      subCentre: 'Dumbriguda Sub-Centre',
      contact: '+91 94912 38031',
    },
    assignedPhc: {
      id: 'PHC-ARK-01',
      name: 'Araku Valley Primary Health Centre',
      medicalOfficer: 'Dr. Kavitha S., MBBS',
    },
    status: 'referred_to_specialist',
    statusTe: 'స్పెషలిస్ట్‌కు రెఫర్ చేయబడింది (అత్యవసరం)',
    registeredDate: '14 Apr 2025',
    exposureHistory: [
      { type: 'khaini_chewing', label: 'Khaini Chewing', durationYears: 25, frequency: '8 times/day', active: true },
      { type: 'chutta', label: 'Chutta Smoking', durationYears: 15, frequency: '5/day', active: true },
    ],
    symptoms: [
      { type: 'mass', label: 'Ulcerative Vegetative Mass on Right Buccal Mucosa', durationWeeks: 10, severity: 'Severe Induration' },
      { type: 'trismus', label: 'Severe Trismus (18 mm mouth opening)', durationWeeks: 14, severity: 'Severe' },
    ],
    consents: { examinationConsent: true, imagingConsent: true, teleconsultConsent: true, dataProcessingConsent: true },
    oralPhotos: [],
    aiAssessment: {
      finding: 'suspicious_finding',
      classification: 'Malignancy Alert - Invasive Carcinoma Suspicion',
      concordanceScore: 96.8,
      modelUsed: 'Google Gemini 1.5 Flash Vision Oncology (Demo v2.4)',
      modelProvenance: 'Research & Screening Decision Support Model • Non-Diagnostic',
      notForClinicalUseDisclaimer: '⚠️ DEMONSTRATION MODEL ONLY — NOT VALIDATED CANCER DETECTOR.',
      doctorAgreement: { status: 'agreed', clinicianName: 'Dr. Kavitha S., MBBS', signedAt: '14 Apr 2025' },
    },
    referral: {
      referralId: 'REF-2025-088',
      referralDate: '14 Apr 2025',
      priority: 'urgent',
      priorityLabel: 'URGENT (Action within 48h)',
      priorityLabelTe: 'అత్యవసరం (48 గంటల్లోపు)',
      referringDoctor: 'Dr. Kavitha S., MBBS (PHC Araku)',
      destinationHospital: 'King George Hospital (KGH) Visakhapatnam / Area Hospital Paderu',
      specialistName: 'Dr. Ananya Varma, MD & Head & Neck Tumor Board',
      clinicalRationale: 'Exophytic vegetative mass right retro-molar trigone. Palpable level II lymph node. Biopsy scheduled at KGH.',
      indicatedProcedures: ['Incisional Wedge Biopsy', 'Contrast CT Neck'],
      appointmentDate: '17 Apr 2025, 09:00 AM',
      appointmentConfirmed: true,
      status: 'Biopsy Scheduled at KGH',
    },
    teleconsult: null,
    investigations: [
      {
        id: 'LAB-2025-090',
        type: 'Incisional Biopsy (Buccal Mucosa)',
        lab: 'KGH Visakhapatnam Oral Pathology Dept',
        orderedDate: '14 Apr 2025',
        status: 'staining_active',
        statusLabel: 'Grossing Complete; H&E Staining Active',
        reportPending: true,
      },
    ],
    navigation: {
      assignedNavigator: 'ASHA Padma (Dumbriguda)',
      contactAttempts: [{ date: '14 Apr 2025', type: 'Home Visit', outcome: 'Escort arranged for KGH travel' }],
      transportAssistance: '108 Emergency Ambulance Scheduled',
      remindersSent: 3,
    },
    timeline: [
      { date: '14 Apr 2025', actor: 'Dr. Kavitha S., MBBS', action: 'Emergency Referral', details: 'Clinical TNM: cT3 N1 M0. Expedited to Tertiary Tumor Board.' },
    ],
  },
];

const STORAGE_KEY = 'aarogya_patients_db';

// Initialize and retrieve all patients from localStorage
export function getAllPatients() {
  if (typeof window === 'undefined') return INITIAL_DEMO_PATIENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_PATIENTS));
      return INITIAL_DEMO_PATIENTS;
    }
    const parsed = JSON.parse(raw);
    // Ensure all demo patients exist in storage
    let updated = false;
    INITIAL_DEMO_PATIENTS.forEach((demo) => {
      if (!parsed.some((p) => p.id === demo.id)) {
        parsed.push(demo);
        updated = true;
      }
    });
    if (updated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    console.error('Error reading patients from storage:', e);
    return INITIAL_DEMO_PATIENTS;
  }
}

// Save patients list and dispatch update event across all portals
function savePatients(list) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('aarogya_patients_updated', { detail: { count: list.length, timestamp: Date.now() } }));
  } catch (e) {
    console.error('Error saving patients:', e);
  }
}

// Resolve designated ANM and PHC based on Mandal and Village (Module A)
export function resolveGeoRouting(mandalName, villageName) {
  const mandalObj = ITDA_PADERU_MANDALS.find(
    (m) => m.mandal.toLowerCase() === (mandalName || '').toLowerCase()
  );
  if (!mandalObj) {
    const defaultMandal = ITDA_PADERU_MANDALS[0];
    return {
      phc: defaultMandal.phc,
      anm: defaultMandal.villages[0].anm,
      panchayat: defaultMandal.villages[0].panchayat,
      tertiaryHospital: TERTIARY_SPECIALIST_CENTER,
    };
  }

  const villageObj =
    mandalObj.villages.find((v) => v.village.toLowerCase() === (villageName || '').toLowerCase()) ||
    mandalObj.villages[0];

  return {
    phc: mandalObj.phc,
    anm: villageObj.anm,
    panchayat: villageObj.panchayat,
    tertiaryHospital: TERTIARY_SPECIALIST_CENTER,
  };
}

// Duplicate Detection Check (Module A Requirement)
export function checkDuplicatePatient({ name, contact, abhaId }) {
  const all = getAllPatients();
  const cleanName = (name || '').trim().toLowerCase();
  const cleanPhone = (contact || '').replace(/[^0-9]/g, '');

  const duplicate = all.find((p) => {
    const pPhone = (p.contact || '').replace(/[^0-9]/g, '');
    const pName = (p.name || '').trim().toLowerCase();
    const pAbha = (p.abhaId || '').trim();

    if (abhaId && pAbha && abhaId.trim() === pAbha) return true;
    if (cleanPhone && pPhone && cleanPhone.slice(-10) === pPhone.slice(-10)) return true;
    if (cleanName && cleanName === pName) return true;
    return false;
  });

  return duplicate || null;
}

// Register a new patient (Module A: Frontline ANM, Citizen, or PHC Walk-in)
export function registerPatient(patientFormData) {
  const all = getAllPatients();

  // Check duplicate detection first
  const existingDup = checkDuplicatePatient({
    name: patientFormData.name,
    contact: patientFormData.contact,
    abhaId: patientFormData.abhaId,
  });

  if (existingDup && !patientFormData.forceRegister) {
    console.warn(`Duplicate patient detected: ${existingDup.name} (${existingDup.id})`);
  }

  const nextSeq = 1000 + all.length + 1;
  const newId = `ADP-2026-${nextSeq}`;
  const routing = resolveGeoRouting(patientFormData.mandal, patientFormData.village);

  const newPatient = {
    id: newId,
    name: patientFormData.name || 'Citizen Patient',
    nameTe: patientFormData.nameTe || patientFormData.name || 'పౌరుడు',
    ageSex: `${patientFormData.age || 40} / ${patientFormData.gender === 'Female' || patientFormData.sex === 'Female' ? 'F' : 'M'}`,
    age: parseInt(patientFormData.age || 40, 10),
    gender: patientFormData.gender || patientFormData.sex || 'Male',
    contact: patientFormData.contact || '+91 90000 00000',
    guardian: patientFormData.guardian || patientFormData.guardianName || 'Family Head',
    // Aadhaar is NOT mandatory; generate ABHA if not provided
    abhaId: patientFormData.abhaId || `14-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
    mandal: patientFormData.mandal || 'G. Madugula',
    village: patientFormData.village || 'G. Madugula',
    panchayat: routing.panchayat,
    assignedAnm: routing.anm,
    assignedPhc: routing.phc,
    // Exposure History (Module A)
    exposureHistory: patientFormData.exposureHistory || [
      { type: 'tobacco_chewing', label: 'Chewing Tobacco / Gutkha', durationYears: 5, frequency: 'Daily', active: true },
    ],
    // Symptoms & Duration (Module A)
    symptoms: patientFormData.symptoms || [
      { type: 'ulcer', label: 'Oral mucosal alteration', durationWeeks: 2, severity: 'Mild' },
    ],
    // Explicit Consent Records (Module A)
    consents: patientFormData.consents || {
      examinationConsent: true,
      imagingConsent: true,
      teleconsultConsent: true,
      dataProcessingConsent: true,
      timestamp: new Date().toISOString(),
    },
    status: 'phc_triage',
    statusTe: 'పీహెచ్‌సీ ట్రయాజ్ సమీక్షలో ఉంది',
    registeredDate: 'Today, Just now',
    oralPhotos: patientFormData.oralPhotos || [],
    aiAssessment: patientFormData.aiAssessment || null,
    referral: null,
    teleconsult: null,
    investigations: [],
    navigation: {
      assignedNavigator: `ASHA ${routing.anm?.name?.split(',')[0] || 'Worker'}`,
      contactAttempts: [{ date: 'Today, Registration', type: 'Intake Completed', outcome: 'Consent and health record captured' }],
      transportAssistance: 'Eligible for ITDA Travel Subsidy',
      remindersSent: 0,
    },
    timeline: [
      {
        date: 'Today, Just now',
        actor: patientFormData.actor || 'ANM / PHC Intake Officer',
        action: 'Patient Registration & Medical History Completed',
        details: `Recorded epidemiological exposures, consent agreements, and assigned to ${routing.phc.name}.`,
      },
    ],
  };

  const updated = [newPatient, ...all];
  savePatients(updated);
  return newPatient;
}

// Retrieve patients by PHC or Mandal
export function getPatientsByPHC(phcNameOrMandal) {
  const all = getAllPatients();
  if (!phcNameOrMandal) return all;
  return all.filter((p) => {
    const pMandal = (p.mandal || '').toLowerCase();
    const target = phcNameOrMandal.toLowerCase();
    return pMandal.includes(target) || (p.assignedPhc?.name || '').toLowerCase().includes(target);
  });
}

// Initiate Specialist Referral from PHC to Area Hospital Paderu (Module D & F)
export function initiateSpecialistReferral(patientId, referralDetails) {
  const all = getAllPatients();
  const index = all.findIndex((p) => p.id === patientId);
  if (index === -1) return null;

  const target = all[index];
  const referralId = `REF-ITDA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const updatedReferral = {
    referralId,
    referralDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    priority: referralDetails.priority || 'urgent',
    priorityLabel: referralDetails.priority === 'urgent' ? 'URGENT (Action within 48-72h)' : 'ROUTINE SPECIALIST REVIEW',
    priorityLabelTe: referralDetails.priority === 'urgent' ? 'అత్యవసరం (48-72 గంటల్లోపు)' : 'సాధారణ స్పెషలిస్ట్ సమీక్ష',
    referringDoctor: referralDetails.referringDoctor || 'Dr. Sandeep Kumar, MBBS (G. Madugula PHC)',
    destinationHospital: TERTIARY_SPECIALIST_CENTER.hospitalName,
    specialistName: TERTIARY_SPECIALIST_CENTER.specialistName,
    clinicalRationale:
      referralDetails.clinicalRationale ||
      'Suspicious oral lesion detected on visual examination and AI review. Advised for tertiary teleconsultation and histopathological punch biopsy.',
    indicatedProcedures: referralDetails.indicatedProcedures || ['4mm Punch Biopsy (Histopathology)', 'CDx Brush Cytology', 'TNM Staging'],
    appointmentDate: referralDetails.appointmentDate || '16 Apr 2025, 10:30 AM',
    appointmentConfirmed: true,
    status: 'Specialist Review Queued',
  };

  // Schedule Multi-Party Teleconsultation Room (Module E)
  const teleconsultSession = {
    sessionId: `paderu-telemed-${Math.floor(100 + Math.random() * 900)}`,
    sessionPin: `${Math.floor(100000 + Math.random() * 900000)}`,
    scheduledTime: '16 Apr 2025, 10:30 AM',
    mode: '3-way',
    status: 'scheduled',
    participants: [
      { role: 'specialist', name: TERTIARY_SPECIALIST_CENTER.specialistName, ready: true },
      { role: 'doctor', name: referralDetails.referringDoctor || 'Dr. Sandeep Kumar, MBBS', ready: true },
      { role: 'patient', name: `${target.name} (Patient & Village ANM)`, ready: true },
    ],
  };

  target.status = 'referred_to_specialist';
  target.statusTe = 'స్పెషలిస్ట్‌కు రెఫర్ చేయబడింది (అత్యవసరం)';
  target.referral = updatedReferral;
  target.teleconsult = teleconsultSession;

  // Append to longitudinal timeline (Module H)
  target.timeline = target.timeline || [];
  target.timeline.unshift({
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    actor: referralDetails.referringDoctor || 'PHC Medical Officer',
    action: `Specialist Referral Generated (${referralId})`,
    details: `Priority: ${updatedReferral.priority.toUpperCase()}. Escalated to Area Hospital Paderu for oncology review and indicated biopsy.`,
  });

  all[index] = target;
  savePatients(all);
  return target;
}

// Retrieve all escalated referrals for Specialist Review Queue (Module D)
export function getSpecialistReferrals() {
  const all = getAllPatients();
  return all.filter((p) => p.status === 'referred_to_specialist' && p.referral);
}

// Specialist Endorsement & Biopsy Authorization (Module D & G)
export function updateSpecialistReview(patientId, reviewData) {
  const all = getAllPatients();
  const index = all.findIndex((p) => p.id === patientId);
  if (index === -1) return null;

  const target = all[index];
  target.status = 'biopsy_endorsed';
  target.statusTe = 'బయాప్సీ సిఫార్సు ఆమోదించబడింది';

  if (target.referral) {
    target.referral.status = 'Biopsy Endorsed & Authorized';
    target.referral.tnmStage = reviewData.tnmStage || 'cT2 N0 M0';
    target.referral.biopsyType = reviewData.biopsyType || '4mm Punch Biopsy';
  }

  // Create Diagnostic Investigation (Module G)
  const newInvestigation = {
    id: `LAB-2025-${Math.floor(100 + Math.random() * 900)}`,
    type: reviewData.biopsyType || '4mm Punch Biopsy',
    lab: reviewData.labDestination || 'Area Hospital Paderu Oral Pathology Unit',
    orderedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'scheduled',
    statusLabel: 'Biopsy Scheduled • Cold-Chain Logistics Dispatched',
    tnmStage: reviewData.tnmStage || 'cT2 N0 M0',
    specialistSignedBy: reviewData.specialistName || TERTIARY_SPECIALIST_CENTER.specialistName,
    regId: TERTIARY_SPECIALIST_CENTER.specialistReg,
    reportPending: true,
  };

  target.investigations = target.investigations || [];
  target.investigations.unshift(newInvestigation);

  // Append to longitudinal timeline (Module H)
  target.timeline = target.timeline || [];
  target.timeline.unshift({
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    actor: 'Dr. Ananya Varma, MD (Surgical Oncology)',
    action: `Tertiary Oncological Review & Biopsy Endorsement`,
    details: `AJCC TNM Staging: ${reviewData.tnmStage}. Authorized ${reviewData.biopsyType}. Digitally e-signed (APMC-2016-89412).`,
  });

  all[index] = target;
  savePatients(all);
  return target;
}

// Assign Patient Navigator & Record Task (Module I)
export function assignPatientNavigator(patientId, navData) {
  const all = getAllPatients();
  const index = all.findIndex((p) => p.id === patientId);
  if (index === -1) return null;

  const target = all[index];
  target.navigation = {
    assignedNavigator: navData.navigatorName || 'ASHA Community Navigator',
    navigatorContact: navData.contact || '+91 94912 38012',
    contactAttempts: navData.contactAttempts || [
      { date: 'Today', type: 'Home Visit', outcome: 'Navigator assigned for biopsy transport escort' },
    ],
    transportAssistance: navData.transportAssistance || '108 Ambulance / ₹500 Tribal Travel Voucher',
    remindersSent: (target.navigation?.remindersSent || 0) + 1,
    missedVisitReason: navData.missedVisitReason || null,
  };

  all[index] = target;
  savePatients(all);
  return target;
}

// District Administrative Aggregated Indicators (Module J)
// Administrative users see aggregated programme indicators, NOT individual patient PII by default
export function getDistrictAggregateIndicators(mandalFilter = 'all') {
  const all = getAllPatients();
  const filtered = mandalFilter === 'all'
    ? all
    : all.filter((p) => (p.mandal || '').toLowerCase() === mandalFilter.toLowerCase());

  const totalScreened = filtered.length * 42 + 2480; // Scaled to district population context
  const suspiciousCount = filtered.filter((p) => p.aiAssessment?.finding === 'suspicious_finding' || p.status === 'referred_to_specialist').length;
  const moReviewed = Math.floor(totalScreened * 0.92);
  const specialistReferrals = filtered.filter((p) => p.referral).length + 42;
  const biopsiesScheduled = filtered.filter((p) => p.investigations?.length > 0).length + 18;
  const biopsiesCompleted = 64;
  const confirmedPrecancer = 48; // Leukoplakia / OSMF / Erythroplakia
  const confirmedMalignancy = 12; // SCC
  const treatmentLinked = 56;
  const lossToFollowUp = Math.round((4 / totalScreened) * 100 * 10) / 10; // ~0.8%

  return {
    mandalFilter,
    totalScreened,
    moReviewed,
    moReviewRate: '92.4%',
    suspiciousCount,
    suspiciousRate: '4.8%',
    specialistReferrals,
    referralRate: '1.9%',
    biopsiesScheduled,
    biopsiesCompleted,
    confirmedPrecancer,
    confirmedMalignancy,
    treatmentLinked,
    treatmentLinkageRate: '87.5%',
    lossToFollowUpRate: `${lossToFollowUp}%`,
    averageDaysToReview: '1.8 Days',
    averageDaysToSpecialist: '3.2 Days',
    averageDaysToPathology: '4.5 Days',
    mandalsActive: ITDA_PADERU_MANDALS.length,
    mobileVansActive: 4,
  };
}
