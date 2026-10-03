import { AssessmentQuestion } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // STUDENT QUESTIONS (1 to 4)
  {
    id: 'sq1_practical_passion',
    target: 'student',
    categoryTitle: 'Student Aptitude & Hands-On Passion',
    question: 'What kind of practical daily work excites you the most?',
    questionHindi: 'आपको किस प्रकार का व्यावहारिक और तकनीकी काम सबसे ज्यादा पसंद है?',
    subtext: 'Choose the hands-on activity that feels natural and enjoyable to you.',
    options: [
      {
        id: 'opt_electrical',
        label: 'Electrical Circuits, Wiring & Green Solar Power',
        labelHindi: 'इलेक्ट्रिकल वायरिंग, सर्किट, ट्रांसफार्मर और सोलर पैनल',
        description: 'Working with wires, multimeters, transformers, and renewable rooftop solar panels.',
        iconName: 'Zap',
        recommendedTradeIds: ['electrical-technician', 'solar-renewable-technician']
      },
      {
        id: 'opt_automotive',
        label: 'Vehicles, Electric Motors & EV Diagnostics',
        labelHindi: 'गाड़ियों के इंजन, इलेक्ट्रिक वाहन (EV) और बैटरी सिस्टम',
        description: 'Diagnosing electric cars, bike motors, electronic fuel injection, and battery packs.',
        iconName: 'Car',
        recommendedTradeIds: ['automobile-ev-technician']
      },
      {
        id: 'opt_cnc_manufacturing',
        label: 'Computerized Precision Machinery (CNC & Tools)',
        labelHindi: 'कंप्यूटरीकृत सीएनसी मशीनें, टूलिंग और डिफेंस उपकरण',
        description: 'Programming G-codes and operating high-precision automated metal cutting machines.',
        iconName: 'Settings',
        recommendedTradeIds: ['precision-cnc-operator', 'welder-fabrication-specialist']
      },
      {
        id: 'opt_healthcare',
        label: 'Healthcare, Patient Care & Hospital Support',
        labelHindi: 'मरीजों की देखभाल, अस्पताल सहायता और मेडिकल रिकॉर्ड',
        description: 'Checking vital signs, assisting doctors and patients in hospital wards and ICUs.',
        iconName: 'HeartPulse',
        recommendedTradeIds: ['general-duty-assistant-healthcare']
      },
      {
        id: 'opt_drone_agri',
        label: 'Smart Agriculture, Kisan Drones & Sensors',
        labelHindi: 'किसान ड्रोन पायलट, स्मार्ट कृषि और मिट्टी के सेंसर',
        description: 'Piloting DGCA-certified agricultural spraying drones and operating automated pumps.',
        iconName: 'Compass',
        recommendedTradeIds: ['smart-agriculture-drone-technician', 'plumber-piping-specialist']
      },
      {
        id: 'opt_it_digital',
        label: 'IT Hardware, Computer Networks & Cybersecurity',
        labelHindi: 'कंप्यूटर नेटवर्किंग, हार्डवेयर और तकनीकी सहायता',
        description: 'Assembling PCs, managing office LAN networks, configuring routers and cloud systems.',
        iconName: 'Laptop',
        recommendedTradeIds: ['it-support-network-associate']
      }
    ]
  },
  {
    id: 'sq2_learning_format',
    target: 'student',
    categoryTitle: 'Preferred Learning Style',
    question: 'How do you learn best and achieve peak performance?',
    questionHindi: 'आप किस तरीके से सबसे बेहतर सीखते हैं?',
    subtext: 'Vocational training prioritizes workshop practice over heavy book memorization.',
    options: [
      {
        id: 'opt_learn_70_30',
        label: '70% Practical Workshop + 30% Theory (ITI CTS)',
        labelHindi: '70% वर्कशॉप प्रैक्टिकल + 30% थ्योरी (सरकारी आईटीआई)',
        description: 'Two years of solid workshop practice leading to a government NCVT certificate.',
        recommendedTradeIds: ['electrical-technician', 'automobile-ev-technician', 'precision-cnc-operator']
      },
      {
        id: 'opt_learn_fast_track',
        label: 'Fast-Track 3-6 Months + Paid Apprenticeship (PMKVY/NAPS)',
        labelHindi: '3 से 6 महीने की ट्रेनिंग + तुरंत पेड अप्रेंटिसशिप',
        description: 'Focused skill bootcamps with quick placement in solar or healthcare sectors.',
        recommendedTradeIds: ['solar-renewable-technician', 'general-duty-assistant-healthcare', 'smart-agriculture-drone-technician']
      },
      {
        id: 'opt_learn_polytechnic',
        label: 'ITI First → Lateral Entry into 2nd-Year Polytechnic Diploma',
        labelHindi: 'पहले आईटीआई → फिर सीधे सेकंड ईयर पॉलिटेक्निक डिप्लोमा',
        description: 'A structured ladder bridging practical skills with higher engineering qualifications.',
        recommendedTradeIds: ['electrical-technician', 'precision-cnc-operator', 'rac-technician']
      }
    ]
  },
  {
    id: 'sq3_work_location',
    target: 'student',
    categoryTitle: 'Mobility & Career Location',
    question: 'Where would you prefer to work during your first 3 years?',
    questionHindi: 'शुरुआती 3 वर्षों में आप कहां काम करना पसंद करेंगे?',
    subtext: 'Job availability differs across rural blocks and metro hubs.',
    options: [
      {
        id: 'opt_loc_home',
        label: 'Home District or Surrounding Towns (Max Family Savings)',
        labelHindi: 'अपने ही जिले या नजदीकी कस्बे में (घर के पास रहकर बचत)',
        description: 'Rooftop solar, local DISCOM, authorized service centers, or agricultural drones.',
        recommendedTradeIds: ['solar-renewable-technician', 'smart-agriculture-drone-technician', 'plumber-piping-specialist', 'electrical-technician']
      },
      {
        id: 'opt_loc_state_cluster',
        label: 'State Industrial Corridors & Manufacturing Belts (+15% pay)',
        labelHindi: 'राज्य के प्रमुख औद्योगिक क्षेत्र (जैसे नोएडा, कानपुर, पुणे)',
        description: 'High-volume auto plants, precision tooling toolrooms, and defense suppliers.',
        recommendedTradeIds: ['automobile-ev-technician', 'precision-cnc-operator', 'welder-fabrication-specialist']
      },
      {
        id: 'opt_loc_metro_abroad',
        label: 'Metros or International/Gulf Mobility (Top earnings)',
        labelHindi: 'मेट्रो शहर या विदेश/गल्फ प्रोजेक्ट्स (अधिकतम वेतन)',
        description: 'High-pressure pipe welding, international HVAC, or metro railway networks.',
        recommendedTradeIds: ['welder-fabrication-specialist', 'rac-technician', 'it-support-network-associate']
      }
    ]
  },

  // PARENT QUESTIONS (4 to 7)
  {
    id: 'pq1_income_expectation',
    target: 'parent',
    categoryTitle: 'Parent Financial Expectations',
    question: 'What is your family’s target for monthly income and growth?',
    questionHindi: 'आपके परिवार की मासिक आय और भविष्य की क्या अपेक्षाएं हैं?',
    subtext: 'Helps us match trades that fulfill household financial responsibilities.',
    options: [
      {
        id: 'opt_inc_immediate',
        label: 'Guaranteed Paid Stipend during training + Starting ₹16k - ₹22k/mo',
        labelHindi: 'ट्रेनिंग के दौरान स्टाइपेंड + शुरुआत में ₹16,000 - ₹22,000 प्रति माह',
        description: 'Immediate financial relief through NAPS corporate stipends (₹8.5k - ₹12k/mo).',
        recommendedTradeIds: ['electrical-technician', 'solar-renewable-technician', 'general-duty-assistant-healthcare']
      },
      {
        id: 'opt_inc_high_growth',
        label: 'High 5-Year Growth: Scaling to ₹40k - ₹75k/mo with Supervisor License',
        labelHindi: '5 वर्षों में तेज बढ़ोतरी: सुपरवाइजर बनकर ₹40,000 - ₹75,000+ प्रति माह',
        description: 'Trades where authorized state licensing commands major supervisor wage premiums.',
        recommendedTradeIds: ['precision-cnc-operator', 'automobile-ev-technician', 'welder-fabrication-specialist', 'rac-technician']
      },
      {
        id: 'opt_inc_contractor',
        label: 'Self-Employment & Independent Contractor Potential (₹50k+/mo)',
        labelHindi: 'स्वयं का व्यवसाय / सरकारी ठेकेदारी क्षमता (₹50,000+ प्रति माह)',
        description: 'Licensed wireman contractor, solar EPC vendor, or customized drone spraying service.',
        recommendedTradeIds: ['solar-renewable-technician', 'electrical-technician', 'smart-agriculture-drone-technician', 'plumber-piping-specialist']
      }
    ]
  },
  {
    id: 'pq2_security_priority',
    target: 'parent',
    categoryTitle: 'Job Security & Government Pathways',
    question: 'What degree of job permanence and security does your family seek?',
    questionHindi: 'आपके परिवार के लिए नौकरी की सुरक्षा और स्थायित्व कितना महत्वपूर्ण है?',
    subtext: 'Verified datasets show which trades have mandatory government & corporate backing.',
    options: [
      {
        id: 'opt_sec_govt_quota',
        label: 'Critical: Must be eligible for Indian Railways (RRB), DISCOM & Defense Quotas',
        labelHindi: 'अत्यंत आवश्यक: रेलवे (RRB), बिजली विभाग और रक्षा भर्ती में कोटा अनिवार्य',
        description: 'Trades with thousands of annual Central and State Government technical vacancies.',
        recommendedTradeIds: ['electrical-technician', 'welder-fabrication-specialist', 'automobile-ev-technician']
      },
      {
        id: 'opt_sec_formal_epfo',
        label: 'Formal Corporate Social Security: Mandatory PF, ESIC & Insurance',
        labelHindi: 'संगठित क्षेत्र की नौकरी: पीएफ (EPFO), ईएसआईसी और मेडिकल बीमा अनिवार्य',
        description: 'Multi-year formal contracts with top brands (Tata, Maruti, Daikin, Apollo).',
        recommendedTradeIds: ['automobile-ev-technician', 'precision-cnc-operator', 'general-duty-assistant-healthcare']
      },
      {
        id: 'opt_sec_perpetual_demand',
        label: 'Perpetual Market Need: Essential services that never close down',
        labelHindi: 'सदाबहार मांग: ऐसे क्षेत्र जो मंदी में भी कभी बंद नहीं होते',
        description: 'Hospitals, drinking water supply (Jal Jeevan), and electricity maintenance.',
        recommendedTradeIds: ['general-duty-assistant-healthcare', 'electrical-technician', 'plumber-piping-specialist']
      }
    ]
  },
  {
    id: 'pq3_dignity_safety',
    target: 'parent',
    categoryTitle: 'Social Dignity & Workplace Safety',
    question: 'What work environment gives your family the greatest peace of mind?',
    questionHindi: 'किस प्रकार का कार्य वातावरण आपके परिवार को सबसे अधिक संतुष्टि और सम्मान देगा?',
    subtext: 'Modern vocational trades have transitioned far beyond outdated stereotypes.',
    options: [
      {
        id: 'opt_env_clean_hightech',
        label: 'Modern Air-Conditioned Corporate Hubs with Uniforms & Laptops',
        labelHindi: 'साफ-सुथरे कॉरपोरेट सेंटर, यूनिफॉर्म, लैपटॉप और आधुनिक उपकरण',
        description: 'Authorized OEM service centers, IT parks, and hospital healthcare units.',
        recommendedTradeIds: ['automobile-ev-technician', 'it-support-network-associate', 'general-duty-assistant-healthcare']
      },
      {
        id: 'opt_env_precision_enclosed',
        label: 'Enclosed Automated Toolrooms with 100% Interlocked Safety Shields',
        labelHindi: 'पूर्णतः सुरक्षित स्वचालित मशीनें (इंटरलाक्ड सेफ्टी केबिन)',
        description: 'Precision CNC machining with automatic chip conveyors and zero high-speed contact.',
        recommendedTradeIds: ['precision-cnc-operator']
      },
      {
        id: 'opt_env_community_leader',
        label: 'Modern High-Tech Community Leadership (Kisan Drone & Solar)',
        labelHindi: 'ग्रामीण इलाके में आधुनिक तकनीकी लीडर (ड्रोन पायलट / सोलर एक्सपर्ट)',
        description: 'Admired scientific service commanding respect across all surrounding villages.',
        recommendedTradeIds: ['smart-agriculture-drone-technician', 'solar-renewable-technician']
      }
    ]
  }
];
