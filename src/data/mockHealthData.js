export const initialStats = {
  totalPatients: "1644+",
  totalPatientsTrend: "+10%",
  oldPatients: "300+",
  oldPatientsTrend: "-15%",
  newPatients: "100+",
  newPatientsTrend: "+24%",
  appointments: "355+",
  appointmentsTrend: "+10%"
};

export const initialPatients = [
  {
    id: "P-101",
    name: "Ethan Walker",
    age: "25 years",
    gender: "Male",
    dateTime: "9 Nov 2025 - 6:15PM",
    appointedFor: "Partial Paralysis",
    doctor: "Dr. Andrew Sharma",
    department: "Neurology",
    status: "Confirmed",
    report: "Available (PDF)",
    abhaId: "91-4829-1029-4501",
    phone: "+91 98765 43210",
    email: "ethan.walker@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    vitals: { bp: "125/82", hr: "74 bpm", spo2: "98%", temp: "98.4°F" }
  },
  {
    id: "P-102",
    name: "Liam Carter",
    age: "45 years",
    gender: "Male",
    dateTime: "7 Nov 2025 - 8:30PM",
    appointedFor: "Statin therapy",
    doctor: "Dr. Priya Nair",
    department: "Cardiology",
    status: "In Progress",
    report: "Available (PDF)",
    abhaId: "91-3829-4412-8821",
    phone: "+91 98112 34567",
    email: "liam.carter@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    vitals: { bp: "135/88", hr: "80 bpm", spo2: "97%", temp: "98.6°F" }
  },
  {
    id: "P-103",
    name: "Ava Mitchell",
    age: "20 years",
    gender: "Female",
    dateTime: "6 Nov 2025 - 3:45PM",
    appointedFor: "Angioplasty",
    doctor: "Dr. Andrew Sharma",
    department: "Cardiology",
    status: "Completed",
    report: "Available (PDF)",
    abhaId: "91-1928-3341-9920",
    phone: "+91 97234 56789",
    email: "ava.m@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    vitals: { bp: "118/76", hr: "70 bpm", spo2: "99%", temp: "98.2°F" }
  },
  {
    id: "P-104",
    name: "Noah Patel",
    age: "30 years",
    gender: "Male",
    dateTime: "4 Nov 2025 - 7:00PM",
    appointedFor: "Muscle weakness",
    doctor: "Dr. Rajesh Iyer",
    department: "Physiotherapy",
    status: "Confirmed",
    report: "Available (PDF)",
    abhaId: "91-8842-1920-3341",
    phone: "+91 98450 12345",
    email: "noah.patel@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    vitals: { bp: "122/80", hr: "72 bpm", spo2: "98%", temp: "98.6°F" }
  },
  {
    id: "P-105",
    name: "Sophia Reyes",
    age: "18 years",
    gender: "Female",
    dateTime: "4 Nov 2025 - 6:45PM",
    appointedFor: "Decreased Brain Fog",
    doctor: "Dr. Andrew Sharma",
    department: "Neurology",
    status: "Pending",
    report: "Available (PDF)",
    abhaId: "91-7721-9012-4411",
    phone: "+91 99012 34567",
    email: "sophia.reyes@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
    vitals: { bp: "114/72", hr: "68 bpm", spo2: "99%", temp: "98.4°F" }
  },
  {
    id: "P-106",
    name: "Harper Kim",
    age: "26 years",
    gender: "Female",
    dateTime: "2 Nov 2025 - 1:15PM",
    appointedFor: "Seizures",
    doctor: "Dr. Andrew Sharma",
    department: "Neurology",
    status: "Completed",
    report: "Available (PDF)",
    abhaId: "91-6651-3329-8801",
    phone: "+91 97890 12345",
    email: "harper.kim@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    vitals: { bp: "120/78", hr: "76 bpm", spo2: "98%", temp: "98.5°F" }
  },
  {
    id: "P-107",
    name: "Mason Lee",
    age: "28 years",
    gender: "Male",
    dateTime: "9 Nov 2025 - 6:15PM",
    appointedFor: "Antenatal partner care",
    doctor: "Dr. Sunita Sen",
    department: "Obstetrics",
    status: "Confirmed",
    report: "Available (PDF)",
    abhaId: "91-4412-9901-5520",
    phone: "+91 98123 45678",
    email: "mason.lee@example.com",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    vitals: { bp: "128/82", hr: "78 bpm", spo2: "98%", temp: "98.7°F" }
  }
];

export const upcomingAppointments = [
  {
    id: "UA-1",
    name: "Cody Fisher",
    time: "8:30 AM",
    status: "Offline",
    date: "4 Nov 2025",
    specialty: "General Physician",
    mode: "In-Person",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "UA-2",
    name: "Marvin McKinney",
    time: "8:45 AM",
    status: "Offline",
    date: "4 Nov 2025",
    specialty: "Orthopedic",
    mode: "In-Person",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "UA-3",
    name: "Bessie Cooper",
    time: "9:00 AM",
    status: "Online",
    date: "4 Nov 2025",
    specialty: "Telecardiology",
    mode: "Teleconsult",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "UA-4",
    name: "Jane Cooper",
    time: "9:15 AM",
    status: "Offline",
    date: "4 Nov 2025",
    specialty: "Dermatology",
    mode: "In-Person",
    avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "UA-5",
    name: "Theresa Webb",
    time: "9:30 AM",
    status: "Offline",
    date: "4 Nov 2025",
    specialty: "Endocrinology",
    mode: "In-Person",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "UA-6",
    name: "Guy Hawkins",
    time: "9:45 AM",
    status: "Offline",
    date: "4 Nov 2025",
    specialty: "Neurology",
    mode: "In-Person",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80"
  }
];

export const activePrescriptions = [
  {
    id: "RX-401",
    medicine: "Metformin Hydrochloride",
    dosage: "500 mg",
    frequency: "Twice daily after meals",
    timing: "Morning & Night",
    prescribedBy: "Dr. Andrew Sharma",
    specialty: "Internal Medicine",
    startDate: "15 Oct 2025",
    duration: "30 days",
    daysRemaining: 14,
    totalPills: 60,
    status: "Active",
    instructions: "Take with food to minimize gastric discomfort. Monitor fasting blood glucose.",
    refillsLeft: 2
  },
  {
    id: "RX-402",
    medicine: "Atorvastatin Calcium",
    dosage: "20 mg",
    frequency: "Once daily at bedtime",
    timing: "Night",
    prescribedBy: "Dr. Priya Nair",
    specialty: "Cardiology",
    startDate: "01 Oct 2025",
    duration: "60 days",
    daysRemaining: 30,
    totalPills: 60,
    status: "Active",
    instructions: "Avoid grapefruit juice. Routine liver function panel scheduled next month.",
    refillsLeft: 3
  },
  {
    id: "RX-403",
    medicine: "Telmisartan",
    dosage: "40 mg",
    frequency: "Once daily in the morning",
    timing: "Morning",
    prescribedBy: "Dr. Andrew Sharma",
    specialty: "Cardiology",
    startDate: "20 Oct 2025",
    duration: "30 days",
    daysRemaining: 19,
    totalPills: 30,
    status: "Active",
    instructions: "Monitor blood pressure weekly and log in Aarogya Drishti health diary.",
    refillsLeft: 1
  },
  {
    id: "RX-404",
    medicine: "Pantoprazole Gastro-resistant",
    dosage: "40 mg",
    frequency: "Once daily before breakfast",
    timing: "Morning (Empty stomach)",
    prescribedBy: "Dr. Rajesh Iyer",
    specialty: "Gastroenterology",
    startDate: "28 Oct 2025",
    duration: "14 days",
    daysRemaining: 11,
    totalPills: 14,
    status: "Active",
    instructions: "Take 30 minutes before first meal with a full glass of water.",
    refillsLeft: 0
  }
];

export const ehrRecords = [
  {
    id: "EHR-801",
    date: "28 Oct 2025",
    type: "Diagnostic Lab Report",
    title: "Comprehensive Metabolic & Lipid Panel",
    facility: "Aarogya Central Diagnostic Lab",
    doctor: "Dr. Priya Nair",
    summary: "Total Cholesterol 185 mg/dL (Normal). Fasting Glucose 96 mg/dL. HbA1c 5.7%. Renal markers within normal limits.",
    status: "Normal",
    fileSize: "1.8 MB"
  },
  {
    id: "EHR-802",
    date: "15 Oct 2025",
    type: "Clinical Encounter Note",
    title: "Cardio-Metabolic Quarterly Review",
    facility: "Aarogya Drishti Telehealth Hub",
    doctor: "Dr. Andrew Sharma",
    summary: "Patient reports steady energy. Blood pressure stable at 122/80 mmHg. Continued on Telmisartan and Metformin.",
    status: "Stable",
    fileSize: "640 KB"
  },
  {
    id: "EHR-803",
    date: "22 Sep 2025",
    type: "Radiology Report",
    title: "Chest X-Ray (PA View)",
    facility: "National Imaging & Diagnostics Center",
    doctor: "Dr. Sunita Sen",
    summary: "Bilateral lung fields clear. Cardiac silhouette normal in size. No pleural effusion or focal consolidation seen.",
    status: "Clear",
    fileSize: "4.2 MB"
  },
  {
    id: "EHR-804",
    date: "10 Aug 2025",
    type: "Vaccination & Immunization",
    title: "Adult Tdap Booster & Annual Influenza",
    facility: "Primary Health Center, Sector 4",
    doctor: "Dr. Rajesh Iyer",
    summary: "Administered Tdap booster (Lot #T4491) and Quadrivalent Influenza vaccine in left deltoid.",
    status: "Completed",
    fileSize: "320 KB"
  }
];

export const availableDoctors = [
  {
    id: "DOC-1",
    name: "Dr. Andrew Sharma",
    title: "MD, DM (Cardiology), Chief Teleconsultant",
    specialty: "Cardiology & Telemedicine",
    rating: 4.9,
    reviews: 248,
    experience: "15+ Years",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    fee: "Free (Govt. Ayushman Bharat)",
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    slots: ["09:00 AM", "10:30 AM", "02:00 PM", "04:30 PM", "06:15 PM"]
  },
  {
    id: "DOC-2",
    name: "Dr. Priya Nair",
    title: "MBBS, MD (General Medicine)",
    specialty: "Internal Medicine & Chronic Care",
    rating: 4.8,
    reviews: 194,
    experience: "12 Years",
    avatar: "https://images.unsplash.com/photo-1594824813576-857e4e0477bf?w=150&auto=format&fit=crop&q=80",
    fee: "Free (Govt. Ayushman Bharat)",
    availableDays: ["Mon", "Wed", "Fri"],
    slots: ["10:00 AM", "11:30 AM", "03:00 PM", "05:00 PM"]
  },
  {
    id: "DOC-3",
    name: "Dr. Rajesh Iyer",
    title: "MS (Orthopedics), DNB",
    specialty: "Orthopedics & Sports Rehab",
    rating: 4.9,
    reviews: 312,
    experience: "18 Years",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
    fee: "Free (Govt. Ayushman Bharat)",
    availableDays: ["Tue", "Thu", "Sat"],
    slots: ["09:30 AM", "11:00 AM", "02:30 PM", "04:00 PM"]
  },
  {
    id: "DOC-4",
    name: "Dr. Sunita Sen",
    title: "MD, DGO (Obstetrics & Gynecology)",
    specialty: "Maternal Health & Antenatal Care",
    rating: 4.9,
    reviews: 275,
    experience: "14 Years",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    fee: "Free (Govt. Ayushman Bharat)",
    availableDays: ["Mon", "Tue", "Thu", "Sat"],
    slots: ["10:00 AM", "01:00 PM", "03:30 PM", "05:30 PM"]
  }
];

