/**
 * Aarogya Drishti - ITDA Paderu Geo-Routing & Referral Hierarchy Service
 * Compliant with AAROHAN Hackathon 2026 Problem Statement (Modules A, D, E, F)
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
      nameTe: 'అరకు వ్యాలీ ప్రాథమిక ఆరోగ్య కేంద్రం',
      medicalOfficer: 'Dr. K. Swetha, MBBS',
      contact: '+91 89123 45603',
    },
    villages: [
      {
        village: 'Araku',
        villageTe: 'అరకు',
        panchayat: 'Araku Central',
        anm: {
          id: 'ANM-ARK-01',
          name: 'M. Nirmala, GNM',
          nameTe: 'ఎం. నిర్మల (ఏఎన్‌ఎం)',
          subCentre: 'Araku Sub-Centre',
          contact: '+91 94912 38030',
        },
      },
      {
        village: 'Padmapuram',
        villageTe: 'పద్మాపురం',
        panchayat: 'Padmapuram Panchayat',
        anm: {
          id: 'ANM-ARK-02',
          name: 'T. Vasantha, ANM',
          nameTe: 'టి. వసంత (ఏఎన్‌ఎం)',
          subCentre: 'Padmapuram Sub-Centre',
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
      medicalOfficer: 'Dr. V. Rajesh, MBBS',
      contact: '+91 89123 45604',
    },
    villages: [
      {
        village: 'Chintapalli',
        villageTe: 'చింతపల్లి',
        panchayat: 'Chintapalli Main',
        anm: {
          id: 'ANM-CP-01',
          name: 'P. Radha, GNM',
          nameTe: 'పి. రాధ (ఏఎన్‌ఎం)',
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
      medicalOfficer: 'Dr. M. Srinivasa Rao, MBBS',
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
  specialistContact: '+91 89123 45999',
  address: 'ITDA Agency Area Hospital Campus, Paderu - 531024',
};

// Initial Synthetic Patient Callset - Compulsory Demonstration Case from Hackathon PDF
const INITIAL_DEMO_PATIENTS = [
  {
    id: 'ADP-2026-0046',
    name: 'Appa Rao (Compulsory Hackathon Demo)',
    nameTe: 'అప్పారావు (హాకథాన్ డెమో కేస్)',
    ageSex: '46 / M',
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
    exposureHistory: [
      {
        type: 'chewing_tobacco',
        label: 'Tobacco Chewing (Gutkha/Khaini)',
        labelTe: 'పొగాకు నమలడం (గుట్కా/ఖైనీ)',
        durationYears: 18,
        frequencyPerDay: '6-8 pouches daily',
        active: true,
      },
      {
        type: 'reverse_smoking',
        label: 'Reverse Smoking (Adda Poga / Chutta)',
        labelTe: 'రివర్స్ స్మోకింగ్ (అడ్డ పొగ / చుట్ట)',
        durationYears: 10,
        frequencyPerDay: '2-3 chuttas daily',
        active: true,
      },
    ],
    symptoms: [
      {
        type: 'white_patch',
        label: 'Persistent White Cheek Patch (> 8 weeks)',
        labelTe: 'తగ్గని తెల్లటి మచ్చ (> 8 వారాలు)',
        durationWeeks: 8,
        notes: 'Non-scrapable homogeneous white patch on right buccal mucosa with local erythema',
      },
      {
        type: 'burning',
        label: 'Burning Sensation on Eating Spices',
        labelTe: 'కారంతో మంట మండే అనుభూతి',
        durationWeeks: 4,
        notes: 'Intense local burning upon chili consumption',
      },
    ],
    consents: {
      examinationConsent: true,
      photoConsent: true,
      teleconsultConsent: true,
      dataProcessingConsent: true,
    },
    status: 'referred_to_specialist',
    statusTe: 'స్పెషలిస్ట్‌కు రెఫర్ చేయబడింది',
    registeredDate: 'Today, 09:15 AM',
    oralPhotos: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
    ],
    aiAssessment: {
      triageClassification: 'High Suspicion - Potentially Malignant',
      triageClassificationTe: 'అధిక అనుమానం - కేన్సర్‌గా మారే అవకాశం (హై-సస్పిషన్)',
      concordanceScore: 89,
      impression: 'Oral Leukoplakia / Verrucous Precancerous Plaque',
      actionPlan: 'Immediate tertiary referral for diagnostic punch biopsy and tele-oncology consult',
    },
    referral: {
      referralId: 'REF-ITDA-2026-9041',
      referralDate: 'Today, 11:30 AM',
      priority: 'urgent',
      priorityLabel: 'URGENT (Action within 48-72h)',
      priorityLabelTe: 'అత్యవసరం (48-72 గంటల్లోపు చర్య)',
      referringDoctor: 'Dr. Sandeep Kumar (G. Madugula PHC)',
      destinationHospital: TERTIARY_SPECIALIST_CENTER.hospitalName,
      specialistName: TERTIARY_SPECIALIST_CENTER.specialistName,
      clinicalRationale:
        '46yo male from G. Madugula with 18yr tobacco chew history. Right buccal mucosa exhibits an indurated 2.2cm non-scrapable white lesion. Gemini AI concordance 89% (High Suspicion). Immediate teleconsultation and punch biopsy required.',
      indicatedProcedures: ['Punch Biopsy (Histopathology)', 'Vital Toluidine Blue Staining', 'Complete Hemogram'],
    },
    teleconsult: {
      sessionId: 'ROOM-PADERU-7821',
      sessionPin: '904128',
      scheduledTime: 'Today, 02:00 PM',
      mode: '3-way', // '3-way' (Specialist + PHC + Patient) | '2-way' (Specialist + Patient) | '2-way-doc' (Specialist + PHC)
      status: 'scheduled',
      participants: [
        { role: 'specialist', name: 'Dr. Ananya Varma, MD (Specialist Host)', ready: true },
        { role: 'doctor', name: 'Dr. Sandeep Kumar (PHC Medical Officer)', ready: true },
        { role: 'patient', name: 'Appa Rao & ANM Lakshmi Devi (Patient Edge)', ready: true },
      ],
    },
  },
  {
    id: 'ADP-2026-0047',
    name: 'Lakshmi Devi',
    nameTe: 'లక్ష్మీ దేవి',
    ageSex: '42 / F',
    contact: '+91 94401 23456',
    guardian: 'K. Someswara Rao',
    mandal: 'G. Madugula',
    village: 'Vanabhasingi',
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
    exposureHistory: [{ type: 'areca_nut', label: 'Areca Nut / Betel Quid', durationYears: 8, active: true }],
    symptoms: [{ type: 'trismus', label: 'Restricted Mouth Opening (2 fingers)', durationWeeks: 12 }],
    oralPhotos: [],
    aiAssessment: null,
    referral: null,
    teleconsult: null,
  },
  {
    id: 'ADP-2026-0048',
    name: 'Savitri K.',
    nameTe: 'సావిత్రి కె.',
    ageSex: '38 / F',
    contact: '+91 98492 34567',
    guardian: 'N. Rama Rao',
    mandal: 'Paderu',
    village: 'Minumuluru',
    assignedAnm: {
      id: 'ANM-PAD-02',
      name: 'S. Radhika, ANM',
      subCentre: 'Minumuluru Sub-Centre',
      contact: '+91 94912 38021',
    },
    assignedPhc: {
      id: 'PHC-PAD-01',
      name: 'Paderu Urban Community Health Centre & PHC',
      medicalOfficer: 'Dr. R. Ramachandra Murthy, MBBS',
    },
    status: 'pending_anm_review',
    statusTe: 'గ్రామ ఏఎన్‌ఎం పరిశీలనలో ఉంది',
    registeredDate: 'Yesterday, 04:20 PM',
    exposureHistory: [{ type: 'none', label: 'No Habits', durationYears: 0, active: false }],
    symptoms: [{ type: 'aphthous_ulcer', label: 'Minor Traumatic Ulcer', durationWeeks: 1 }],
    oralPhotos: [],
    aiAssessment: null,
    referral: null,
    teleconsult: null,
  },
];

const STORAGE_KEY = 'aarogya_patients_db';

// Initialize and retrieve all patients
export function getAllPatients() {
  if (typeof window === 'undefined') return INITIAL_DEMO_PATIENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_PATIENTS));
      return INITIAL_DEMO_PATIENTS;
    }
    return JSON.parse(raw);
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
    window.dispatchEvent(new CustomEvent('aarogya_patients_updated', { detail: { count: list.length } }));
  } catch (e) {
    console.error('Error saving patients:', e);
  }
}

// Find designated ANM and PHC based on Mandal and Village
export function resolveGeoRouting(mandalName, villageName) {
  const mandalObj = ITDA_PADERU_MANDALS.find(
    (m) => m.mandal.toLowerCase() === (mandalName || '').toLowerCase()
  );
  if (!mandalObj) {
    // Default to G. Madugula if unknown
    const defaultMandal = ITDA_PADERU_MANDALS[0];
    return {
      phc: defaultMandal.phc,
      anm: defaultMandal.villages[0].anm,
      panchayat: defaultMandal.villages[0].panchayat,
      tertiaryHospital: TERTIARY_SPECIALIST_CENTER,
    };
  }

  const villageObj = mandalObj.villages.find(
    (v) => v.village.toLowerCase() === (villageName || '').toLowerCase()
  ) || mandalObj.villages[0];

  return {
    phc: mandalObj.phc,
    anm: villageObj.anm,
    panchayat: villageObj.panchayat,
    tertiaryHospital: TERTIARY_SPECIALIST_CENTER,
  };
}

// Register a new patient (from Citizen Portal or ANM Portal)
export function registerPatient(patientFormData) {
  const all = getAllPatients();
  const nextSeq = 1000 + all.length + 1;
  const newId = `ADP-2026-${nextSeq}`;

  // Automatically resolve geo-hierarchy
  const routing = resolveGeoRouting(patientFormData.mandal, patientFormData.village);

  const newPatient = {
    id: newId,
    name: patientFormData.name || 'Citizen Patient',
    nameTe: patientFormData.nameTe || patientFormData.name || 'పౌరుడు',
    ageSex: `${patientFormData.age || 40} / ${patientFormData.sex === 'Male' ? 'M' : 'F'}`,
    contact: patientFormData.contact || '+91 90000 00000',
    guardian: patientFormData.guardian || 'Family Guardian',
    abhaId: patientFormData.abhaId || `14-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
    mandal: patientFormData.mandal || 'G. Madugula',
    village: patientFormData.village || 'G. Madugula',
    panchayat: routing.panchayat,
    assignedAnm: routing.anm,
    assignedPhc: routing.phc,
    exposureHistory: patientFormData.exposureHistory || [],
    symptoms: patientFormData.symptoms || [],
    consents: patientFormData.consents || {
      examinationConsent: true,
      photoConsent: true,
      teleconsultConsent: true,
      dataProcessingConsent: true,
    },
    status: 'phc_triage',
    statusTe: 'పీహెచ్‌సీ ట్రయాజ్ సమీక్షలో ఉంది',
    registeredDate: 'Just now',
    oralPhotos: patientFormData.oralPhotos || [],
    aiAssessment: patientFormData.aiAssessment || null,
    referral: null,
    teleconsult: null,
  };

  const updated = [newPatient, ...all];
  savePatients(updated);
  return newPatient;
}

// Retrieve patients assigned to a specific PHC or Mandal
export function getPatientsByPHC(phcNameOrMandal) {
  const all = getAllPatients();
  if (!phcNameOrMandal) return all;
  return all.filter((p) => {
    const pMandal = (p.mandal || '').toLowerCase();
    const target = phcNameOrMandal.toLowerCase();
    return pMandal.includes(target) || (p.assignedPhc?.name || '').toLowerCase().includes(target);
  });
}

// Retrieve patients assigned to a specific ANM / Village
export function getPatientsByANM(villageOrAnmName) {
  const all = getAllPatients();
  if (!villageOrAnmName) return all;
  return all.filter((p) => {
    const v = (p.village || '').toLowerCase();
    const anm = (p.assignedAnm?.name || '').toLowerCase();
    const target = villageOrAnmName.toLowerCase();
    return v.includes(target) || anm.includes(target);
  });
}

// Initiate Specialist Referral from PHC to Area Hospital Paderu
export function initiateSpecialistReferral(patientId, referralDetails) {
  const all = getAllPatients();
  const index = all.findIndex((p) => p.id === patientId);
  if (index === -1) return null;

  const target = all[index];
  const referralId = `REF-ITDA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const updatedReferral = {
    referralId,
    referralDate: 'Just now',
    priority: referralDetails.priority || 'urgent',
    priorityLabel: referralDetails.priority === 'urgent' ? 'URGENT (Action within 48-72h)' : 'ROUTINE SPECIALIST REVIEW',
    priorityLabelTe: referralDetails.priority === 'urgent' ? 'అత్యవసరం (48-72 గంటల్లోపు)' : 'సాధారణ స్పెషలిస్ట్ సమీక్ష',
    referringDoctor: referralDetails.referringDoctor || 'Dr. Sandeep Kumar (G. Madugula PHC)',
    destinationHospital: TERTIARY_SPECIALIST_CENTER.hospitalName,
    specialistName: TERTIARY_SPECIALIST_CENTER.specialistName,
    clinicalRationale: referralDetails.clinicalRationale || 'Suspicious oral lesion detected on visual examination and AI review. Advised for tertiary teleconsultation and histopathological punch biopsy.',
    indicatedProcedures: referralDetails.indicatedProcedures || ['Punch Biopsy (Histopathology)', 'Cytology Review'],
  };

  // Also auto-schedule a multi-party teleconsultation room
  const teleconsultSession = {
    sessionId: `ROOM-${Math.floor(1000 + Math.random() * 9000)}`,
    sessionPin: `${Math.floor(100000 + Math.random() * 900000)}`,
    scheduledTime: 'Today, Next Available Slot',
    mode: '3-way', // 3-way default: Specialist + PHC Doctor + Patient/ANM
    status: 'scheduled',
    participants: [
      { role: 'specialist', name: TERTIARY_SPECIALIST_CENTER.specialistName, ready: true },
      { role: 'doctor', name: referralDetails.referringDoctor || 'Dr. Sandeep Kumar', ready: true },
      { role: 'patient', name: `${target.name} (Patient & Village ANM)`, ready: true },
    ],
  };

  target.status = 'referred_to_specialist';
  target.statusTe = 'స్పెషలిస్ట్‌కు రెఫర్ చేయబడింది';
  target.referral = updatedReferral;
  target.teleconsult = teleconsultSession;

  all[index] = target;
  savePatients(all);
  return target;
}

// Retrieve all escalated referrals for Specialist Review Queue
export function getSpecialistReferrals() {
  const all = getAllPatients();
  return all.filter((p) => p.status === 'referred_to_specialist' && p.referral);
}

