import { Trade, SourceMetadata, Counsellor, ParentConcernCategory } from '../types';

export const DATA_SOURCES: Record<string, SourceMetadata> = {
  dgt_ncvt: {
    id: 'src_dgt',
    agencyName: 'Directorate General of Training (DGT)',
    portalOrReport: 'NCVT MIS Portal Annual Placement Survey',
    datasetName: 'Craftsmen Training Scheme (CTS) Outcomes 2023-2024',
    lastUpdated: '15 Oct 2024',
    dataPeriod: 'Academic Year 2022-2024',
    methodology: 'State-audited ITI graduate employment tracking and NCVT certification records',
    verificationStatus: 'Verified Government',
    geoCoverage: 'All 36 States & UTs (Pan-India)',
    url: 'https://ncvtmis.gov.in'
  },
  naps_apprenticeship: {
    id: 'src_naps',
    agencyName: 'Ministry of Skill Development and Entrepreneurship (MSDE)',
    portalOrReport: 'National Apprenticeship Promotion Scheme (NAPS)',
    datasetName: 'NAPS Registered Contracts & Stipend Disbursals',
    lastUpdated: 'Yesterday, 18:30 IST',
    dataPeriod: 'Rolling 12 Months',
    methodology: 'Direct portal API tally of formal corporate and SME apprenticeship contracts',
    verificationStatus: 'Verified Government',
    geoCoverage: 'Pan-India district level',
    url: 'https://apprenticeshipindia.gov.in'
  },
  nsdc_market: {
    id: 'src_nsdc',
    agencyName: 'National Skill Development Corporation (NSDC)',
    portalOrReport: 'Sector Skill Council Intelligence Reports & ASEEM Portal',
    datasetName: 'Quarterly Skilled Labor Demand Outlook',
    lastUpdated: '28 Sep 2024',
    dataPeriod: 'Q2 FY 2024-25',
    methodology: 'Employer demand aggregation across 37 Sector Skill Councils and job listings',
    verificationStatus: 'Verified Industry',
    geoCoverage: 'National & High-Demand Industrial Clusters',
    url: 'https://nsdcindia.org'
  },
  job_market_agg: {
    id: 'src_jobs',
    agencyName: 'National Career Service (NCS) & Partner Job Portals',
    portalOrReport: 'NCS Live Vacancy Feed',
    datasetName: 'Vocational & Technical Verified Openings',
    lastUpdated: '2 hours ago',
    dataPeriod: 'Active 30 Days',
    methodology: 'De-duplicated active job openings verified with GST/PAN registered employers',
    verificationStatus: 'Latest Portal Aggregate',
    geoCoverage: 'District and Tier-2/3 Industrial Zones',
    url: 'https://ncs.gov.in'
  },
  search_trends: {
    id: 'src_trends',
    agencyName: 'Google Trends & Search Intelligence Data',
    portalOrReport: 'Search Interest Index (Vocational Education)',
    datasetName: 'Public Search Interest by Region & Trade Keyword',
    lastUpdated: 'Today at 06:00 IST',
    dataPeriod: 'Past 12 Months',
    methodology: 'Normalized search volume index (0-100). NOTE: Reflects consumer/student interest, NOT direct employer job vacancies.',
    verificationStatus: 'Latest Portal Aggregate',
    geoCoverage: 'State and Metro sub-regions'
  },
  demo_disclaimer: {
    id: 'src_demo',
    agencyName: 'KaushalSetu Prototype Intelligence Engine',
    portalOrReport: 'Synthesis of MSDE, NSDC & Industry Benchmark Data',
    datasetName: 'Representative Demonstration Vocational Model',
    lastUpdated: 'Today',
    dataPeriod: 'Simulation Baseline',
    methodology: 'Curated by vocational career experts to reflect typical Indian market distributions for demonstration purposes.',
    verificationStatus: 'Demo Data (Prototype)',
    geoCoverage: 'Representative Indian States'
  }
};

export const MOCK_TRADES: Trade[] = [
  {
    id: 'electrical-technician',
    name: 'Electrical Technician',
    nameHindi: 'इलेक्ट्रीशियन / विद्युत तकनीशियन',
    nameBengali: 'ইলেকট্রিশিয়ান / বৈদ্যুতিক টেকনিশিয়ান',
    category: 'Engineering & Technical',
    tagline: 'High job stability with government, industrial, and self-employment pathways',
    description: 'Specializes in electrical wiring, commercial circuit maintenance, transformer operations, industrial motor controls, and solar power installations.',
    nsqfLevel: 4,
    trainingOptions: [
      {
        type: 'ITI CTS',
        durationMonths: 24,
        eligibility: 'Class 10 Pass (with Science & Maths)',
        approxFeeInr: 2400,
        stipendAvailable: true,
        typicalStipendInr: 8500,
        certificationBody: 'NCVT / DGT Government of India',
        nsqfLevel: 4
      },
      {
        type: 'Apprenticeship NAPS',
        durationMonths: 12,
        eligibility: 'ITI Electrician Pass',
        approxFeeInr: 0,
        stipendAvailable: true,
        typicalStipendInr: 10500,
        certificationBody: 'MSDE / Board of Apprenticeship Training',
        nsqfLevel: 4
      },
      {
        type: 'Polytechnic Diploma',
        durationMonths: 24, // Lateral entry after ITI
        eligibility: 'ITI Electrician Pass (Lateral Entry to 2nd Year)',
        approxFeeInr: 18000,
        stipendAvailable: false,
        certificationBody: 'State Board of Technical Education',
        nsqfLevel: 5
      }
    ],
    monthlyStartingSalary: [14000, 22000],
    monthlyMidCareerSalary: [32000, 58000],
    placementRatePercentage: 81,
    activeOpeningsCount: 14250,
    projectedAnnualHiringGrowth: 21.5,
    localAvailabilityRating: 'High',
    requiredSkills: ['Wiring & Earthing', 'PLC Basics', 'Safety Circuitry (IS Code)', 'Blueprint Reading', 'Multimeter Diagnostics'],
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Class 10 / 12 Foundation',
        qualification: 'Secondary School Certification',
        duration: 'Baseline',
        roles: ['Student Aspirant'],
        monthlyEarningRange: [0, 0],
        keySkills: ['Basic Mathematics', 'Physics / Science Fundamentals', 'Problem Solving'],
        nextMilestone: 'Enrollment in Govt / Private ITI'
      },
      {
        stepNumber: 2,
        title: 'ITI Electrician CTS Training',
        qualification: 'National Trade Certificate (NTC)',
        duration: '2 Years (24 Months)',
        roles: ['Trainee Electrician'],
        monthlyEarningRange: [0, 2500],
        keySkills: ['Domestic & Industrial Wiring', 'AC/DC Machines', 'Transformers', 'Safety Protocols'],
        nextMilestone: 'NAPS Industrial Apprenticeship'
      },
      {
        stepNumber: 3,
        title: 'Formal Apprenticeship (NAPS)',
        qualification: 'National Apprenticeship Certificate (NAC)',
        duration: '1 Year (12 Months)',
        roles: ['Apprentice Electrician at DISCOM / Railways / Tata / L&T'],
        monthlyEarningRange: [9500, 13500],
        keySkills: ['Live Maintenance', 'Substation Assisting', 'Industrial Safety Compliance'],
        nextMilestone: 'Full-time Certified Maintenance Technician'
      },
      {
        stepNumber: 4,
        title: 'Entry-Level Industrial Technician',
        qualification: 'NAC / Certified Technician',
        duration: 'Years 1 - 3',
        roles: ['Junior Plant Electrician', 'Maintenance Technician', 'Facility Wireman'],
        monthlyEarningRange: [16000, 24000],
        keySkills: ['Switchgear Operations', 'Preventive Maintenance', 'Emergency Troubleshooting'],
        nextMilestone: 'Senior Specialist or Lateral Diploma in Electrical'
      },
      {
        stepNumber: 5,
        title: 'Senior Technician / Electrical Supervisor',
        qualification: 'State Electrical Supervisor License / Diploma',
        duration: 'Years 4 - 7',
        roles: ['Site Electrical Supervisor', 'Chief Maintenance Technician', 'Licensed Contractor'],
        monthlyEarningRange: [32000, 52000],
        keySkills: ['Team Leadership', 'State Grid Regulatory Approvals', 'Energy Auditing Basics'],
        nextMilestone: 'Independent Contracting or Plant Electrical Engineer',
        higherEducationBridge: 'B.Tech Electrical (via Lateral Diploma) or Certified Energy Auditor',
        governmentExamsEligible: ['Indian Railways (RRB ALP / Technician)', 'State Electricity Boards (DISCOMs)', 'DRDO / ISRO Technician B', 'BHEL / NTPC Artisan']
      }
    ],
    parentConcernAnswers: [
      {
        concern: 'Job Security & Permanence',
        evidenceSummary: 'Electricity distribution and industrial maintenance require mandatory licensed technicians by law. Every factory, hospital, commercial complex, and housing society must retain certified wiremen.',
        metrics: [
          { label: 'Active Pan-India Openings', value: '14,250 verified jobs', sourceId: 'src_jobs' },
          { label: 'DISCOM & Railway Eligibility', value: '100% eligible for RRB & State Power Boards', sourceId: 'src_dgt' },
          { label: 'Average Placement Rate', value: '81% within 6 months of ITI', sourceId: 'src_dgt' }
        ]
      },
      {
        concern: 'Income & Salary Growth',
        evidenceSummary: 'Starting salary is typically ₹14k-₹22k during early years, but with a State Supervisory Wireman License or experience, earnings jump to ₹35k-₹60k. Independent licensed electrical contractors earn ₹50,000+ per month.',
        metrics: [
          { label: 'Entry Earning', value: '₹14,000 - ₹22,000 / mo', sourceId: 'src_nsdc' },
          { label: 'Mid-Career Earning', value: '₹32,000 - ₹58,000 / mo', sourceId: 'src_nsdc' },
          { label: 'Licensed Contractor Median', value: '₹45,000 - ₹80,000 / mo', sourceId: 'src_demo' }
        ]
      },
      {
        concern: 'Higher Education Pathways',
        evidenceSummary: 'Students are NOT locked into a dead end. DGT has signed MoUs allowing ITI pass students to directly enter the 2nd year of 3-Year Polytechnic Diploma (Lateral Entry), and then onward to B.Tech Engineering.',
        metrics: [
          { label: 'Polytechnic Lateral Entry', value: 'Direct Admission to 2nd Year Diploma', sourceId: 'src_dgt' },
          { label: 'NIOS 12th Equivalence', value: 'Eligible for Class 12 Certificate with 1 Language Exam', sourceId: 'src_dgt' }
        ]
      },
      {
        concern: 'Government Job Opportunities',
        evidenceSummary: 'Electrician is one of the highest recruited trades in Indian Railways (RRB ALP & Technician), Metro Rail Corporations (DMRC, UPMRC), State Electricity Boards (DISCOMs), and Defense establishments (MES, Navy Dockyard).',
        metrics: [
          { label: 'Railway Vacancy Quota', value: 'Over 18,000 ITI technician positions annually', sourceId: 'src_dgt' },
          { label: 'Public Sector Units', value: 'NTPC, BHEL, SAIL, ONGC regular apprentice batches', sourceId: 'src_naps' }
        ]
      }
    ],
    sources: [DATA_SOURCES.dgt_ncvt, DATA_SOURCES.naps_apprenticeship, DATA_SOURCES.nsdc_market, DATA_SOURCES.job_market_agg],
    topEmployers: ['Tata Power', 'Larsen & Toubro (L&T)', 'Indian Railways', 'State DISCOMs', 'Schneider Electric', 'Havells India'],
    governmentSchemes: ['Pradhan Mantri Kaushal Vikas Yojana (PMKVY)', 'National Apprenticeship Promotion Scheme (NAPS)', 'National Apprenticeship Training Scheme (NATS)'],
    femaleParticipationTrend: 'Rising steadily: 14% of current ITI Electrician batch are women technicians, supported by special state stipends.'
  },
  {
    id: 'solar-renewable-technician',
    name: 'Solar & Renewable Energy Technician',
    nameHindi: 'सोलर और नवीकरणीय ऊर्जा तकनीशियन',
    nameBengali: 'সৌর ও পুনর্নবীকরণযোগ্য শক্তি টেকনিশিয়ান',
    category: 'Renewable Energy & Solar',
    tagline: 'Rapidly expanding green sector backed by PM Surya Ghar national scheme',
    description: 'Installs, tests, commissions, and maintains rooftop solar PV systems, inverters, net meters, battery storage, and solar water pump installations.',
    nsqfLevel: 4,
    trainingOptions: [
      {
        type: 'PMKVY Short-term',
        durationMonths: 3,
        eligibility: 'Class 10 Pass or ITI Pass',
        approxFeeInr: 0,
        stipendAvailable: true,
        typicalStipendInr: 6000,
        certificationBody: 'Skill Council for Green Jobs (SCGJ)',
        nsqfLevel: 4
      },
      {
        type: 'ITI CTS',
        durationMonths: 12,
        eligibility: 'Class 10 Pass (Science/Maths)',
        approxFeeInr: 1800,
        stipendAvailable: true,
        typicalStipendInr: 8000,
        certificationBody: 'NCVT / DGT',
        nsqfLevel: 4
      }
    ],
    monthlyStartingSalary: [15000, 24000],
    monthlyMidCareerSalary: [34000, 65000],
    placementRatePercentage: 86,
    activeOpeningsCount: 9800,
    projectedAnnualHiringGrowth: 34.2,
    localAvailabilityRating: 'High',
    requiredSkills: ['PV Panel Sizing', 'Inverter Calibration', 'Grid Sync & Earthing', 'Working at Heights Safety', 'IoT Generation Monitoring'],
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Class 10 / 12 Foundation',
        qualification: 'Secondary School',
        duration: 'Baseline',
        roles: ['Student Candidate'],
        monthlyEarningRange: [0, 0],
        keySkills: ['Electrical Basics', 'Tool Handling', 'Mathematics'],
        nextMilestone: 'Suryamitra / Solar ITI Course'
      },
      {
        stepNumber: 2,
        title: 'Suryamitra / Solar PV Training',
        qualification: 'Solar PV Installer (Suryamitra) NSQF 4',
        duration: '3 to 12 Months',
        roles: ['Trainee Solar Installer'],
        monthlyEarningRange: [0, 8000],
        keySkills: ['Solar Panel Structure Fixing', 'DC Cabling', 'Battery Storage Systems'],
        nextMilestone: 'Field Apprenticeship with EPC Contractor'
      },
      {
        stepNumber: 3,
        title: 'Certified Solar Rooftop Installer',
        qualification: 'SCGJ Certified Solar Technician',
        duration: 'Years 1 - 2',
        roles: ['Rooftop Installation Technician', 'Solar O&M Executive'],
        monthlyEarningRange: [16000, 25000],
        keySkills: ['Net Metering Setup', 'String Testing', 'Preventive Washing & Maintenance'],
        nextMilestone: 'Site In-Charge / Project Supervisor'
      },
      {
        stepNumber: 4,
        title: 'Solar Site Supervisor & Commissioning Lead',
        qualification: 'Advanced Diploma / Project Management',
        duration: 'Years 3 - 5',
        roles: ['Solar Project Site Engineer', 'Quality & Safety Officer'],
        monthlyEarningRange: [32000, 55000],
        keySkills: ['AutoCAD Solar Layouts', 'Vendor Coordination', 'Grid Inspection Protocols'],
        nextMilestone: 'Solar EPC Entrepreneur / Renewable Consultant'
      }
    ],
    parentConcernAnswers: [
      {
        concern: 'Job Security & Permanence',
        evidenceSummary: 'The Government of India has committed ₹75,000 Crores to the "PM Surya Ghar: Muft Bijli Yojana" targeting 1 Crore rooftop solar homes. Every installation mandates verified technicians for 25-year service cycles.',
        metrics: [
          { label: 'Government Mandate', value: '1 Crore solar rooftops by 2027', sourceId: 'src_nsdc' },
          { label: 'Annual Hiring Growth', value: '+34.2% YoY growth rate', sourceId: 'src_jobs' },
          { label: 'Local District Demand', value: 'Available in virtually every rural and urban block', sourceId: 'src_nsdc' }
        ]
      },
      {
        concern: 'Migration vs Local Work',
        evidenceSummary: 'Unlike heavy manufacturing which is concentrated in metro industrial belts, solar installations happen locally on village rooftops, agricultural solar pumps (PM-KUSUM), and local schools.',
        metrics: [
          { label: 'Home District Placement', value: '68% technicians work within home district', sourceId: 'src_demo' },
          { label: 'Self-Employment Potential', value: 'High eligibility for Mudra Loan up to ₹10 Lakhs', sourceId: 'src_dgt' }
        ]
      }
    ],
    sources: [DATA_SOURCES.nsdc_market, DATA_SOURCES.job_market_agg, DATA_SOURCES.naps_apprenticeship],
    topEmployers: ['Tata Power Solar', 'Adani Solar', 'Waaree Energies', 'Vikram Solar', 'Local Certified EPC Vendors'],
    governmentSchemes: ['PM Surya Ghar: Muft Bijli Yojana', 'PM-KUSUM Solar Pump Scheme', 'Suryamitra Skill Development Programme'],
    femaleParticipationTrend: 'Encouraging: 18% women participation in solar module testing and regional service customer dispatch.'
  },
  {
    id: 'automobile-ev-technician',
    name: 'Automobile & EV Technician',
    nameHindi: 'ऑटोमोबाइल और इलेक्ट्रिक वाहन (EV) तकनीशियन',
    nameBengali: 'অটোমোবাইল ও ইভি টেকনিশিয়ান',
    category: 'Automotive & EV',
    tagline: 'Bridging conventional mechanics with high-voltage electric vehicle technology',
    description: 'Diagnoses and repairs internal combustion engines, electronic fuel injection (EFI), regenerative braking, lithium battery packs, and EV electric powertrains.',
    nsqfLevel: 4,
    trainingOptions: [
      {
        type: 'ITI CTS',
        durationMonths: 24,
        eligibility: 'Class 10 Pass (Science & Maths)',
        approxFeeInr: 2800,
        stipendAvailable: true,
        typicalStipendInr: 9000,
        certificationBody: 'NCVT / DGT',
        nsqfLevel: 4
      },
      {
        type: 'Apprenticeship NAPS',
        durationMonths: 12,
        eligibility: 'Mechanic Motor Vehicle ITI',
        approxFeeInr: 0,
        stipendAvailable: true,
        typicalStipendInr: 12000,
        certificationBody: 'Automotive Skills Development Council (ASDC)',
        nsqfLevel: 4
      }
    ],
    monthlyStartingSalary: [16000, 25000],
    monthlyMidCareerSalary: [35000, 70000],
    placementRatePercentage: 84,
    activeOpeningsCount: 11400,
    projectedAnnualHiringGrowth: 26.8,
    localAvailabilityRating: 'High',
    requiredSkills: ['OBD-II Computer Scanners', 'Battery Management Systems (BMS)', 'Engine Overhauling', 'Hydraulic Brakes', 'High-Voltage Safety PPE'],
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Class 10 Pass',
        qualification: 'Secondary School',
        duration: 'Baseline',
        roles: ['Aspirant'],
        monthlyEarningRange: [0, 0],
        keySkills: ['Mechanical aptitude', 'Basic tools'],
        nextMilestone: 'ITI Mechanic Motor Vehicle'
      },
      {
        stepNumber: 2,
        title: 'ITI Mechanic Motor Vehicle / Auto Electrical',
        qualification: 'NTC Certificate',
        duration: '2 Years',
        roles: ['Trainee Auto Mechanic'],
        monthlyEarningRange: [0, 3000],
        keySkills: ['Transmission Systems', 'Fuel Injection', 'Chassis Repair'],
        nextMilestone: 'OEM OEM NAPS Apprenticeship (Maruti, Tata, Hero)'
      },
      {
        stepNumber: 3,
        title: 'OEM Factory / Dealership Apprenticeship',
        qualification: 'NAC Certificate',
        duration: '1 Year',
        roles: ['Automotive Service Apprentice'],
        monthlyEarningRange: [11000, 15000],
        keySkills: ['Dealer Management Software', 'Fast Lube Service', 'Warranty Diagnostics'],
        nextMilestone: 'Certified Dealership Technician'
      },
      {
        stepNumber: 4,
        title: 'Certified EV & Auto Diagnostics Specialist',
        qualification: 'ASDC Certified EV Specialist',
        duration: 'Years 2 - 4',
        roles: ['Master Auto Technician', 'EV Fleet Maintenance Executive'],
        monthlyEarningRange: [22000, 38000],
        keySkills: ['High Voltage Isolations', 'Motor Controller Tuning', 'Telematics Diagnostics'],
        nextMilestone: 'Service Workshop Manager or Independent Auto Hub'
      }
    ],
    parentConcernAnswers: [
      {
        concern: 'Social Status & Respect',
        evidenceSummary: 'Modern automotive workshops are no longer roadside "grease monkey" shacks. Technicians work in air-conditioned, digitized service hubs of Maruti, Tata Motors, and Ather Energy using laptops and diagnostic tablets in corporate uniforms.',
        metrics: [
          { label: 'Work Environment', value: 'Digitized Authorized Service Centers (ASCs)', sourceId: 'src_nsdc' },
          { label: 'Corporate Employers', value: 'Tata, Mahindra, Maruti Suzuki, Hyundai, Hero', sourceId: 'src_dgt' }
        ]
      },
      {
        concern: 'Income & Salary Growth',
        evidenceSummary: 'EV powertrain diagnostics specialists command high wage premiums because electric two-wheelers and commercial three-wheelers are growing at 45% annual sales rates.',
        metrics: [
          { label: 'Starting Range', value: '₹16,000 - ₹25,000 / mo', sourceId: 'src_jobs' },
          { label: 'Senior Diagnostics Lead', value: '₹40,000 - ₹75,000 / mo', sourceId: 'src_jobs' }
        ]
      }
    ],
    sources: [DATA_SOURCES.dgt_ncvt, DATA_SOURCES.nsdc_market, DATA_SOURCES.job_market_agg],
    topEmployers: ['Tata Motors', 'Maruti Suzuki', 'Mahindra & Mahindra', 'Ola Electric', 'Ather Energy', 'Hero MotoCorp'],
    governmentSchemes: ['FAME-II Scheme', 'PLI for Automobile & Auto Components', 'NAPS Apprenticeship'],
    femaleParticipationTrend: 'Rapidly rising: Leading auto plants (Bajaj, Ola Futurefactory) run all-women vehicle assembly and service lines.'
  },
  {
    id: 'rac-technician',
    name: 'AC & Refrigeration (RAC) Technician',
    nameHindi: 'रेफ्रिजरेशन और एयर कंडीशनिंग (RAC) तकनीशियन',
    nameBengali: 'রেফ্রিজারেশন ও এসি টেকনিশিয়ান',
    category: 'Electronics & Appliances',
    tagline: 'Indispensable trade with booming cold chain and urban HVAC demand',
    description: 'Installs, services, brazes, evacuates, and troubleshoots inverter air conditioners, commercial chillers, supermarket cold rooms, and refrigerated transport.',
    nsqfLevel: 4,
    trainingOptions: [
      {
        type: 'ITI CTS',
        durationMonths: 24,
        eligibility: 'Class 10 Pass (Science & Maths)',
        approxFeeInr: 2200,
        stipendAvailable: true,
        typicalStipendInr: 8500,
        certificationBody: 'NCVT / DGT',
        nsqfLevel: 4
      },
      {
        type: 'PMKVY Short-term',
        durationMonths: 4,
        eligibility: 'Class 10 Pass',
        approxFeeInr: 0,
        stipendAvailable: true,
        typicalStipendInr: 5000,
        certificationBody: 'Electronics Sector Skills Council of India (ESSCI)',
        nsqfLevel: 4
      }
    ],
    monthlyStartingSalary: [14000, 22000],
    monthlyMidCareerSalary: [30000, 60000],
    placementRatePercentage: 83,
    activeOpeningsCount: 8900,
    projectedAnnualHiringGrowth: 23.4,
    localAvailabilityRating: 'High',
    requiredSkills: ['Copper Pipe Brazing', 'Vacuum Testing & Leak Detection', 'Eco-friendly Refrigerants (R32, R410A)', 'Inverter PCB Testing', 'Commercial Chiller Basics'],
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Class 10 Baseline',
        qualification: 'Secondary School',
        duration: 'Baseline',
        roles: ['Aspirant'],
        monthlyEarningRange: [0, 0],
        keySkills: ['Basic Science', 'Physical Measurement'],
        nextMilestone: 'ITI Mechanic RAC'
      },
      {
        stepNumber: 2,
        title: 'ITI RAC 2-Year Program',
        qualification: 'National Trade Certificate',
        duration: '2 Years',
        roles: ['Trainee RAC Technician'],
        monthlyEarningRange: [0, 2500],
        keySkills: ['Thermodynamics cycle', 'Electrical components', 'Compressor mechanics'],
        nextMilestone: 'Brand Apprenticeship (Daikin, Voltas, Blue Star)'
      },
      {
        stepNumber: 3,
        title: 'Authorized Brand Service Specialist',
        qualification: 'NAC / Certified HVAC Technician',
        duration: 'Years 1 - 3',
        roles: ['HVAC Installation Technician', 'Commercial Cold Storage Executive'],
        monthlyEarningRange: [16000, 26000],
        keySkills: ['VRF/VRV Multi-split systems', 'Gas charging', 'Customer Relations'],
        nextMilestone: 'HVAC Supervisor / Chiller Plant In-Charge'
      },
      {
        stepNumber: 4,
        title: 'Senior HVAC Project Manager / Cold Chain Contractor',
        qualification: 'Diploma / ISHRAE Certified Professional',
        duration: 'Years 4 - 7',
        roles: ['Facility HVAC Lead', 'Independent Service Center Owner'],
        monthlyEarningRange: [35000, 65000],
        keySkills: ['Ducting Design', 'Energy Efficiency Optimization', 'Team Oversight'],
        nextMilestone: 'Turnkey HVAC Contracting'
      }
    ],
    parentConcernAnswers: [
      {
        concern: 'Income & Salary Growth',
        evidenceSummary: 'AC and cold chain demand in India has grown by over 18% CAGR due to rising summer heatwaves and agricultural food preservation. Skilled technicians earn both a fixed salary plus substantial seasonal service bonuses.',
        metrics: [
          { label: 'Fixed Base Pay', value: '₹15,000 - ₹25,000 / mo', sourceId: 'src_jobs' },
          { label: 'Seasonal Service Earnings', value: '₹20,000 - ₹40,000 extra per peak quarter', sourceId: 'src_demo' },
          { label: 'Placement Rate', value: '83% placement across authorized brand centers', sourceId: 'src_dgt' }
        ]
      },
      {
        concern: 'Job Security & Permanence',
        evidenceSummary: 'Hospitals, data centers, pharmaceutical factories, and food warehouses cannot run for even one hour without operational cooling. HVAC maintenance contracts are perpetual and year-round.',
        metrics: [
          { label: 'Commercial Contract Stability', value: 'Multi-year AMC agreements', sourceId: 'src_nsdc' },
          { label: 'Overseas Opportunities', value: 'High demand in Gulf / Middle East (Dubai, Oman, Qatar)', sourceId: 'src_dgt' }
        ]
      }
    ],
    sources: [DATA_SOURCES.dgt_ncvt, DATA_SOURCES.job_market_agg, DATA_SOURCES.nsdc_market],
    topEmployers: ['Voltas', 'Blue Star', 'Daikin India', 'Carrier Midea', 'Samsung Electronics', 'Snowman Logistics'],
    governmentSchemes: ['Ozone Depleting Substances Phase-Out Training', 'NAPS Apprenticeship Scheme'],
    femaleParticipationTrend: 'Expanding into electronic diagnostic testing and precision customer technical support.'
  },
  {
    id: 'precision-cnc-operator',
    name: 'Precision CNC Operator & Machinist',
    nameHindi: 'सीएनसी ऑपरेटर और मशीनिस्ट',
    nameBengali: 'সিএনসি অপারেটর ও মেশিনিস্ট',
    category: 'Manufacturing & CNC',
    tagline: 'High-tech computerized manufacturing for aerospace, defense, and automotive parts',
    description: 'Sets up, programs with G-codes/M-codes, and operates Computer Numerical Control (CNC) milling, turning, and EDM machines producing precision metal parts with micron tolerances.',
    nsqfLevel: 5,
    trainingOptions: [
      {
        type: 'ITI CTS',
        durationMonths: 24,
        eligibility: 'Class 10 Pass (Science & Maths)',
        approxFeeInr: 2500,
        stipendAvailable: true,
        typicalStipendInr: 9500,
        certificationBody: 'NCVT / DGT',
        nsqfLevel: 4
      },
      {
        type: 'PMKVY Short-term',
        durationMonths: 6,
        eligibility: 'Class 10 or ITI Machinist',
        approxFeeInr: 0,
        stipendAvailable: true,
        typicalStipendInr: 6500,
        certificationBody: 'Capital Goods Skill Council (CGSC)',
        nsqfLevel: 5
      }
    ],
    monthlyStartingSalary: [16500, 26000],
    monthlyMidCareerSalary: [38000, 75000],
    placementRatePercentage: 88,
    activeOpeningsCount: 10200,
    projectedAnnualHiringGrowth: 24.1,
    localAvailabilityRating: 'Medium',
    requiredSkills: ['G-Code & M-Code Programming', 'Dial Gauge & Micrometer Inspection', 'CAD/CAM Basics', 'Tool Wear Offsetting', 'Geometric Dimensioning & Tolerancing (GD&T)'],
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Class 10 Foundation',
        qualification: 'Secondary School',
        duration: 'Baseline',
        roles: ['Aspirant'],
        monthlyEarningRange: [0, 0],
        keySkills: ['Mathematics & Geometry', 'Drawing interpretation'],
        nextMilestone: 'ITI Machinist / Turner'
      },
      {
        stepNumber: 2,
        title: 'ITI Machinist / Tool & Die',
        qualification: 'National Trade Certificate',
        duration: '2 Years',
        roles: ['Trainee Machinist'],
        monthlyEarningRange: [0, 3000],
        keySkills: ['Lathe, Milling, Shaper operations', 'Metrology instruments'],
        nextMilestone: 'CNC Advanced Programming Course'
      },
      {
        stepNumber: 3,
        title: 'CNC Machine Operator & Setter',
        qualification: 'NSQF Level 4/5 Machinist',
        duration: 'Years 1 - 2',
        roles: ['CNC Milling Operator', 'CNC Lathe Setter', 'Quality Control Inspector'],
        monthlyEarningRange: [18000, 27000],
        keySkills: ['Machine Setup', 'Zero Point Calibration', 'Tolerance inspection within 10 microns'],
        nextMilestone: 'CNC Programmer & Production Supervisor'
      },
      {
        stepNumber: 4,
        title: 'Senior CNC Programmer / Tool Room Head',
        qualification: 'Advanced Diploma in Tool & Die (CIPET/NTTF)',
        duration: 'Years 3 - 6',
        roles: ['CAM Programmer', 'Production Shop-Floor Manager'],
        monthlyEarningRange: [38000, 75000],
        keySkills: ['Mastercam / Siemens NX', 'Multi-axis 5-Axis CNC machining', 'Lean Manufacturing'],
        nextMilestone: 'Plant Operations Head or Independent Precision Component Unit'
      }
    ],
    parentConcernAnswers: [
      {
        concern: 'Job Security & Permanence',
        evidenceSummary: 'India is rapidly becoming a global manufacturing hub with Apple iPhone factories, defense aerospace suppliers, and semiconductor equipment tooling. CNC machinists are indispensable.',
        metrics: [
          { label: 'Placement Rate', value: '88% placement across auto & defense clusters', sourceId: 'src_dgt' },
          { label: 'Active Jobs', value: '10,200 verified industrial openings', sourceId: 'src_jobs' }
        ]
      },
      {
        concern: 'Workplace Safety & Health',
        evidenceSummary: 'Modern CNC machines are completely enclosed automated pods with safety interlocks, mist extractors, and automated chip conveyors. No direct contact with high-speed cutters.',
        metrics: [
          { label: 'Safety Enclosure', value: '100% interlocked CE-marked safety machines', sourceId: 'src_nsdc' },
          { label: 'Clean Factory Work', value: 'Climate-controlled precision toolrooms', sourceId: 'src_demo' }
        ]
      }
    ],
    sources: [DATA_SOURCES.dgt_ncvt, DATA_SOURCES.job_market_agg, DATA_SOURCES.nsdc_market],
    topEmployers: ['Bharat Forge', 'Godrej Aerospace', 'HAL (Hindustan Aeronautics)', 'Tata Advanced Systems', 'LMW (Lakshmi Machine Works)', 'Motherson Group'],
    governmentSchemes: ['Make in India Initiative', 'Defense Industrial Corridors (UP & TN)', 'Capital Goods Skill Council Certifications'],
    femaleParticipationTrend: 'Rapidly growing: 22% of precision tool room programmers in modern electronics manufacturing plants are women.'
  },
  {
    id: 'general-duty-assistant-healthcare',
    name: 'Healthcare Assistant (GDA)',
    nameHindi: 'जनरल ड्यूटी असिस्टेंट / हेल्थकेयर सहायक',
    nameBengali: 'জেনারেল ডিউটি অ্যাসিস্ট্যান্ট (স্বাস্থ্যসেবা)',
    category: 'Healthcare & Wellness',
    tagline: 'High empathy, respected noble profession with stable hospital employment',
    description: 'Provides direct patient care support in hospitals, eldercare facilities, and intensive care units including vitals monitoring, hygiene, medication management, and medical record keeping.',
    nsqfLevel: 4,
    trainingOptions: [
      {
        type: 'PMKVY Short-term',
        durationMonths: 6,
        eligibility: 'Class 10 Pass',
        approxFeeInr: 0,
        stipendAvailable: true,
        typicalStipendInr: 6000,
        certificationBody: 'Healthcare Sector Skill Council (HSSC)',
        nsqfLevel: 4
      },
      {
        type: 'ITI CTS',
        durationMonths: 12,
        eligibility: 'Class 10 Pass',
        approxFeeInr: 1500,
        stipendAvailable: true,
        typicalStipendInr: 7500,
        certificationBody: 'NCVT / DGT (Health Sanitary Inspector)',
        nsqfLevel: 4
      }
    ],
    monthlyStartingSalary: [13500, 20000],
    monthlyMidCareerSalary: [28000, 48000],
    placementRatePercentage: 89,
    activeOpeningsCount: 16800,
    projectedAnnualHiringGrowth: 28.5,
    localAvailabilityRating: 'High',
    requiredSkills: ['Vital Signs Monitoring (BP, SpO2, Temp)', 'Infection Control Protocols', 'Basic First Aid & CPR', 'Patient Mobility Support', 'Bio-Medical Waste Management'],
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Class 10 Pass Baseline',
        qualification: 'Secondary School',
        duration: 'Baseline',
        roles: ['Aspirant'],
        monthlyEarningRange: [0, 0],
        keySkills: ['Communication', 'Compassion', 'Basic Science'],
        nextMilestone: 'HSSC Certified GDA Course'
      },
      {
        stepNumber: 2,
        title: 'GDA Skill Certification',
        qualification: 'Healthcare Sector Skill Council Certificate',
        duration: '6 Months',
        roles: ['Trainee Healthcare Assistant'],
        monthlyEarningRange: [0, 4000],
        keySkills: ['Patient Handling', 'Sterilization', 'Emergency Reporting'],
        nextMilestone: 'Hospital Internship & Clinical Rotation'
      },
      {
        stepNumber: 3,
        title: 'Hospital Patient Care Executive',
        qualification: 'Certified GDA',
        duration: 'Years 1 - 2',
        roles: ['Ward Assistant', 'ICU Patient Support Assistant', 'Home Healthcare Specialist'],
        monthlyEarningRange: [14000, 22000],
        keySkills: ['Electronic Health Records input', 'Specialized geriatric care'],
        nextMilestone: 'Nursing Assistant Certification or GNM Nursing bridge'
      },
      {
        stepNumber: 4,
        title: 'Senior Healthcare Unit Lead / Nursing Supervisor',
        qualification: 'Diploma in General Nursing (GNM) / Emergency Medical Tech',
        duration: 'Years 3 - 6',
        roles: ['Patient Care Coordinator', 'Ward Floor Supervisor'],
        monthlyEarningRange: [28000, 48000],
        keySkills: ['Staff Scheduling', 'NABH Quality Compliance', 'Patient Advocacy'],
        nextMilestone: 'Hospital Administration / International Healthcare Mobility'
      }
    ],
    parentConcernAnswers: [
      {
        concern: 'Social Status & Respect',
        evidenceSummary: 'Healthcare workers are widely respected as "Seva" providers in Indian culture. Wearing clean hospital scrubs and badges in premier hospitals like Apollo, Fortis, and Max gives immense family pride.',
        metrics: [
          { label: 'Family Social Standing', value: 'High cultural respect and community pride', sourceId: 'src_demo' },
          { label: 'Accredited Hospitals', value: 'Apollo, Max, Fortis, AIIMS outsourced roles', sourceId: 'src_nsdc' }
        ]
      },
      {
        concern: 'Job Security & Permanence',
        evidenceSummary: 'India has an acute shortage of over 2 Million allied healthcare professionals according to WHO benchmarks. Healthcare facilities never close down regardless of economic downturns.',
        metrics: [
          { label: 'Demand Surge', value: '16,800+ current openings nationwide', sourceId: 'src_jobs' },
          { label: 'Placement Ratio', value: '89% batch placement record', sourceId: 'src_dgt' }
        ]
      }
    ],
    sources: [DATA_SOURCES.nsdc_market, DATA_SOURCES.job_market_agg, DATA_SOURCES.dgt_ncvt],
    topEmployers: ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Manipal Hospitals', 'Portea Medical', 'Narayana Health'],
    governmentSchemes: ['Ayushman Bharat PM-JAY Expansion', 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)'],
    femaleParticipationTrend: 'Very strong: 65% women participation with safe transport, hostel allowances, and healthcare benefits.'
  },
  {
    id: 'it-support-network-associate',
    name: 'IT Support & Network Associate',
    nameHindi: 'आईटी सपोर्ट और नेटवर्क एसोसिएट',
    nameBengali: 'আইটি সাপোর্ট ও নেটওয়ার্ক সহযোগী',
    category: 'IT & Digital Services',
    tagline: 'Entry point into the tech sector with hardware, cloud, and cybersecurity support',
    description: 'Installs and configures computer systems, troubleshoots OS software and hardware, configures local LAN routers and switches, and assists users with cybersecurity compliance.',
    nsqfLevel: 4,
    trainingOptions: [
      {
        type: 'ITI CTS',
        durationMonths: 12,
        eligibility: 'Class 10 Pass',
        approxFeeInr: 2000,
        stipendAvailable: true,
        typicalStipendInr: 8000,
        certificationBody: 'NCVT / DGT (COPA / ICTSM)',
        nsqfLevel: 4
      },
      {
        type: 'PMKVY Short-term',
        durationMonths: 4,
        eligibility: 'Class 12 Pass',
        approxFeeInr: 0,
        stipendAvailable: true,
        typicalStipendInr: 5000,
        certificationBody: 'IT-ITeS Sector Skills Council (NASSCOM)',
        nsqfLevel: 4
      }
    ],
    monthlyStartingSalary: [15000, 24000],
    monthlyMidCareerSalary: [35000, 68000],
    placementRatePercentage: 82,
    activeOpeningsCount: 13500,
    projectedAnnualHiringGrowth: 22.0,
    localAvailabilityRating: 'High',
    requiredSkills: ['Windows/Linux Administration', 'LAN/WAN IP Configuration', 'PC Hardware Assembly', 'Cloud Basics (AWS/Azure)', 'Customer Support Ticketing'],
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Class 10 / 12 Pass',
        qualification: 'Secondary / Senior Secondary',
        duration: 'Baseline',
        roles: ['Aspirant'],
        monthlyEarningRange: [0, 0],
        keySkills: ['Computer Literacy', 'English Communication'],
        nextMilestone: 'ITI COPA or ICTSM Trade'
      },
      {
        stepNumber: 2,
        title: 'ITI Computer Operator (COPA) / ICTSM',
        qualification: 'NTC Certificate',
        duration: '1 - 2 Years',
        roles: ['Trainee IT Technician'],
        monthlyEarningRange: [0, 3000],
        keySkills: ['MS Office Suite', 'Network cables & crimping', 'Database basics'],
        nextMilestone: 'Corporate IT Helpdesk Apprenticeship'
      },
      {
        stepNumber: 3,
        title: 'Desktop Support Engineer',
        qualification: 'NASSCOM Certified IT Support Associate',
        duration: 'Years 1 - 2',
        roles: ['IT Helpdesk Technician', 'Hardware Service Engineer', 'Field Network Support'],
        monthlyEarningRange: [16000, 25000],
        keySkills: ['Active Directory User Management', 'Troubleshooting VPNs', 'Asset Management'],
        nextMilestone: 'Cloud & Network Administrator'
      },
      {
        stepNumber: 4,
        title: 'Senior Systems & Cloud Infrastructure Engineer',
        qualification: 'BCA (Distance/Lateral) or CompTIA / Cisco CCNA',
        duration: 'Years 3 - 6',
        roles: ['Network Administrator', 'Cybersecurity Analyst', 'Cloud Support Specialist'],
        monthlyEarningRange: [38000, 72000],
        keySkills: ['Firewall Configurations', 'Cloud Server Backups', 'Incident Response'],
        nextMilestone: 'IT Infrastructure Manager'
      }
    ],
    parentConcernAnswers: [
      {
        concern: 'Social Status & Respect',
        evidenceSummary: 'IT jobs enjoy top social prestige in India. Working in modern office corporate parks wearing formal attire with laptop access meets every family dream for a white-collar career environment.',
        metrics: [
          { label: 'Work Environment', value: 'Corporate IT Parks and Air-conditioned Offices', sourceId: 'src_nsdc' },
          { label: 'Career Prestige', value: 'Highly revered family status in tier-2/3 towns', sourceId: 'src_demo' }
        ]
      },
      {
        concern: 'Higher Education Pathways',
        evidenceSummary: 'Students can easily pursue online or distance BCA / MCA degrees while working full-time in IT support, accelerating their trajectory into software development and cloud operations.',
        metrics: [
          { label: 'Distance BCA Eligibility', value: '100% eligible for UGC-approved distance degrees', sourceId: 'src_dgt' },
          { label: 'Certifications Pathway', value: 'Cisco CCNA, AWS Cloud Practitioner, Microsoft Azure', sourceId: 'src_nsdc' }
        ]
      }
    ],
    sources: [DATA_SOURCES.nsdc_market, DATA_SOURCES.job_market_agg, DATA_SOURCES.dgt_ncvt],
    topEmployers: ['TCS iON Centers', 'Wipro Facility Management', 'HCL Tech Support', 'CMS Info Systems', 'TeamLease Digital', 'Concentrix'],
    governmentSchemes: ['Digital India Capacity Building', 'PMKVY Tech & Digital Literacy'],
    femaleParticipationTrend: 'High: 38% women representation in IT helpdesk and remote network diagnostics roles.'
  },
  {
    id: 'welder-fabrication-specialist',
    name: 'Welder & Structural Fabrication Specialist',
    nameHindi: 'वेल्डर और स्ट्रक्चरल फैब्रिकेशन विशेषज्ञ',
    nameBengali: 'ওয়েল্ডার ও স্ট্রাকচারাল ফ্যাব্রিকেশন বিশেষজ্ঞ',
    category: 'Manufacturing & CNC',
    tagline: 'High international demand, high earning potential with TIG/MIG/Pipe certifications',
    description: 'Performs shielded metal arc (SMAW), gas metal arc (MIG/MAG), and tungsten inert gas (TIG) welding on pressure vessels, bridges, pipelines, and structural frameworks.',
    nsqfLevel: 4,
    trainingOptions: [
      {
        type: 'ITI CTS',
        durationMonths: 12,
        eligibility: 'Class 8 or 10 Pass',
        approxFeeInr: 1500,
        stipendAvailable: true,
        typicalStipendInr: 8500,
        certificationBody: 'NCVT / DGT',
        nsqfLevel: 3
      },
      {
        type: 'Apprenticeship NAPS',
        durationMonths: 12,
        eligibility: 'ITI Welder Pass',
        approxFeeInr: 0,
        stipendAvailable: true,
        typicalStipendInr: 10000,
        certificationBody: 'Indian Iron and Steel Sector Skill Council (IISSC)',
        nsqfLevel: 4
      }
    ],
    monthlyStartingSalary: [16000, 26000],
    monthlyMidCareerSalary: [38000, 85000],
    placementRatePercentage: 87,
    activeOpeningsCount: 11200,
    projectedAnnualHiringGrowth: 19.8,
    localAvailabilityRating: 'High',
    requiredSkills: ['TIG / Argon Welding', 'MIG / CO2 Welding', 'Radiographic Quality Joint Testing', 'Blueprint Reading', 'Pipeline 6G Position'],
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Class 8 / 10 Pass',
        qualification: 'Middle / Secondary School',
        duration: 'Baseline',
        roles: ['Aspirant'],
        monthlyEarningRange: [0, 0],
        keySkills: ['Hand-eye coordination', 'Patience'],
        nextMilestone: 'ITI Welder 1-Year Program'
      },
      {
        stepNumber: 2,
        title: 'ITI Welder Training',
        qualification: 'NTC Certificate',
        duration: '1 Year',
        roles: ['Trainee Welder'],
        monthlyEarningRange: [0, 2500],
        keySkills: ['SMAW Arc Welding', 'Gas Cutting', 'Joint Preparation'],
        nextMilestone: 'Heavy Engineering Apprenticeship (L&T, BHEL, Shipyards)'
      },
      {
        stepNumber: 3,
        title: 'TIG / 6G Pipe Certified Welder',
        qualification: 'ASME / AWS Certified Welder',
        duration: 'Years 1 - 3',
        roles: ['High-Pressure Pipe Welder', 'Boiler Welder', 'Shipyard Fabrication Specialist'],
        monthlyEarningRange: [22000, 36000],
        keySkills: ['6G Pipe Welding', 'Argon Backing', 'Zero-Defect X-ray Inspection'],
        nextMilestone: 'Welding Inspector (CSWIP / AWS-CWI) or Gulf/Overseas Placement'
      },
      {
        stepNumber: 4,
        title: 'Certified Welding Inspector / Fabrication Supervisor',
        qualification: 'CSWIP 3.1 / AWS Certified Welding Inspector',
        duration: 'Years 4 - 8',
        roles: ['Quality Assurance Welding Inspector', 'Fabrication Yard Manager'],
        monthlyEarningRange: [45000, 95000],
        keySkills: ['Non-Destructive Testing (NDT)', 'Ultrasonic & Dye Penetrant Test', 'ASME Code Compliance'],
        nextMilestone: 'International Oil & Gas Pipeline Specialist (Dubai, Saudi Aramco, Singapore)'
      }
    ],
    parentConcernAnswers: [
      {
        concern: 'Income & Salary Growth',
        evidenceSummary: 'Certified high-pressure TIG and 6G pipeline welders are among the highest paid vocational specialists globally. While domestic entry starts at ₹16k-₹26k, certified 6G welders in infrastructure projects earn ₹50,000+ in India and ₹1.2 to ₹2.5 Lakhs/month in Gulf oil & gas projects.',
        metrics: [
          { label: 'Domestic 6G Welder', value: '₹38,000 - ₹85,000 / mo', sourceId: 'src_nsdc' },
          { label: 'Overseas Contract Earnings', value: '₹1,20,000 - ₹2,50,000 / mo (Gulf/Maritime)', sourceId: 'src_demo' }
        ]
      },
      {
        concern: 'Workplace Safety & Health',
        evidenceSummary: 'Modern industrial safety standards (OSHA / Factory Acts) mandate auto-darkening helmets, powered air purifying respirators (PAPR), flame-retardant leather suites, and local exhaust fume extractors.',
        metrics: [
          { label: 'Certified PPE Standard', value: 'Auto-darkening electronic helmets standard', sourceId: 'src_nsdc' },
          { label: 'Medical Insurance', value: 'Mandatory ESIC & corporate workmen compensation', sourceId: 'src_dgt' }
        ]
      }
    ],
    sources: [DATA_SOURCES.dgt_ncvt, DATA_SOURCES.job_market_agg, DATA_SOURCES.naps_apprenticeship],
    topEmployers: ['Larsen & Toubro (L&T)', 'Mazagon Dock Shipbuilders', 'BHEL', 'Jindal Steel & Power', 'Tata Steel', 'Indian Oil Corporation'],
    governmentSchemes: ['Skill India International Mobility Centres', 'DGT Specialized Advanced Welding Centers'],
    femaleParticipationTrend: 'Pioneered by DGT with all-women specialized TIG welding batches in aerospace components.'
  },
  {
    id: 'smart-agriculture-drone-technician',
    name: 'Smart Agriculture & Drone Technician',
    nameHindi: 'स्मार्ट कृषि और ड्रोन तकनीशियन',
    nameBengali: 'স্মার্ট কৃষি ও ড্রোন টেকনিশিয়ান',
    category: 'Modern Agriculture & Drones',
    tagline: 'High-tech rural livelihood combining DGCA certified drone pilot skills and precision farming',
    description: 'Pilots DGCA-certified agricultural drones for fertilizer and pesticide spraying, performs drone maintenance, inspects soil sensor telemetry, and operates micro-irrigation automation.',
    nsqfLevel: 4,
    trainingOptions: [
      {
        type: 'PMKVY Short-term',
        durationMonths: 3,
        eligibility: 'Class 10 Pass + 18 Years age',
        approxFeeInr: 0,
        stipendAvailable: true,
        typicalStipendInr: 7000,
        certificationBody: 'DGCA Certified Remote Pilot Training Org (RPTO)',
        nsqfLevel: 4
      },
      {
        type: 'ITI CTS',
        durationMonths: 12,
        eligibility: 'Class 10 Pass (Science)',
        approxFeeInr: 2000,
        stipendAvailable: true,
        typicalStipendInr: 8000,
        certificationBody: 'NCVT / DGT (Drone Service Technician)',
        nsqfLevel: 4
      }
    ],
    monthlyStartingSalary: [17000, 28000],
    monthlyMidCareerSalary: [40000, 80000],
    placementRatePercentage: 85,
    activeOpeningsCount: 7400,
    projectedAnnualHiringGrowth: 41.5,
    localAvailabilityRating: 'High',
    requiredSkills: ['DGCA Remote Pilot License (RPL)', 'LiPo Battery Safety & Charging', 'GPS Flight Mission Planning', 'Nozzle & Spray Calibration', 'Multispectral NDVI Crop Analysis'],
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Class 10 Pass Baseline',
        qualification: 'Secondary School',
        duration: 'Baseline',
        roles: ['Aspirant'],
        monthlyEarningRange: [0, 0],
        keySkills: ['Basic English/Regional reading', 'Spatial awareness'],
        nextMilestone: 'DGCA Remote Pilot Training (RPTO)'
      },
      {
        stepNumber: 2,
        title: 'DGCA Certified Drone Pilot Training',
        qualification: 'Remote Pilot Certificate (RPC)',
        duration: '3 Months',
        roles: ['Trainee Agri-Drone Pilot'],
        monthlyEarningRange: [0, 6000],
        keySkills: ['Flight simulator drills', 'Airspace regulations (DigiSky)', 'Pre-flight checklists'],
        nextMilestone: 'FPO / Agri-Tech Company Field Deployment'
      },
      {
        stepNumber: 3,
        title: 'Agri-Drone Pilot & Field Service Specialist',
        qualification: 'Certified Commercial Drone Operator',
        duration: 'Years 1 - 2',
        roles: ['Drone Spraying Pilot', 'Drone Repair & Maintenance Tech', 'FPO Service Lead'],
        monthlyEarningRange: [20000, 32000],
        keySkills: ['Acreage coverage spraying', 'Motor and ESC troubleshooting', 'Farmer Advisory'],
        nextMilestone: 'Drone Fleet Manager or Custom Hiring Center Entrepreneur'
      },
      {
        stepNumber: 4,
        title: 'Drone Fleet Lead / Agri-Tech Entrepreneur',
        qualification: 'Advanced GIS Mapping & Fleet Operations',
        duration: 'Years 3 - 6',
        roles: ['Regional Drone Operations Head', 'Custom Hiring Center (CHC) Owner'],
        monthlyEarningRange: [42000, 85000],
        keySkills: ['Land Survey Mapping', 'Drone Swarm Management', 'Government Subsidy Coordination'],
        nextMilestone: 'Autonomous Agriculture Service Enterprise'
      }
    ],
    parentConcernAnswers: [
      {
        concern: 'Migration vs Local Work',
        evidenceSummary: 'This is the ideal high-income local career. Instead of migrating to metro city slums, the youth stays in their home village or district, earning city-grade income while managing local agricultural drone spraying for hundreds of surrounding farmers.',
        metrics: [
          { label: 'Work Location', value: '100% Home District & Rural Cluster based', sourceId: 'src_demo' },
          { label: 'Farmer Service Rate', value: '₹400 - ₹600 per acre spraying fee', sourceId: 'src_nsdc' }
        ]
      },
      {
        concern: 'Social Status & Respect',
        evidenceSummary: 'Piloting a high-tech flying drone commands instant admiration and awe across the entire village. Youth are regarded as modern scientific farming leaders, not traditional manual farmhands.',
        metrics: [
          { label: 'Community Prestige', value: 'Recognized as "Kisan Drone Specialist"', sourceId: 'src_demo' },
          { label: 'Govt Recognition', value: 'Namo Drone Didi & Kisan Drone Schemes', sourceId: 'src_dgt' }
        ]
      }
    ],
    sources: [DATA_SOURCES.nsdc_market, DATA_SOURCES.job_market_agg, DATA_SOURCES.dgt_ncvt],
    topEmployers: ['Garuda Aerospace', 'IoTechWorld Avigation', 'Dhaksha Unmanned Systems', 'IFFCO Kisan', 'Syngenta India', 'Regional Farmer Producer Orgs (FPOs)'],
    governmentSchemes: ['Sub-Mission on Agricultural Mechanization (SMAM)', 'Namo Drone Didi Scheme', 'Kisan Drone Subsidy'],
    femaleParticipationTrend: 'National spotlight: Over 15,000 women being trained under the Namo Drone Didi scheme with 80% capital subsidies.'
  },
  {
    id: 'plumber-piping-specialist',
    name: 'Plumber & Public Health Piping Specialist',
    nameHindi: 'प्लंबर और पाइपिंग विशेषज्ञ',
    nameBengali: 'প্লাম্বার ও পাবলিক হেলথ পাইপিং বিশেষজ্ঞ',
    category: 'Construction & Infrastructure',
    tagline: 'Fueled by Jal Jeevan Mission national clean water piping in every village and town',
    description: 'Installs and maintains domestic potable water lines, PVC/CPVC pipes, solar water heaters, drainage wastewater treatment, and civic water distribution networks.',
    nsqfLevel: 4,
    trainingOptions: [
      {
        type: 'ITI CTS',
        durationMonths: 12,
        eligibility: 'Class 8 or 10 Pass',
        approxFeeInr: 1200,
        stipendAvailable: true,
        typicalStipendInr: 8000,
        certificationBody: 'NCVT / DGT',
        nsqfLevel: 3
      },
      {
        type: 'PMKVY Short-term',
        durationMonths: 3,
        eligibility: 'Class 8 Pass',
        approxFeeInr: 0,
        stipendAvailable: true,
        typicalStipendInr: 5000,
        certificationBody: 'Indian Plumbing Skills Council (IPSC)',
        nsqfLevel: 4
      }
    ],
    monthlyStartingSalary: [13000, 20000],
    monthlyMidCareerSalary: [28000, 55000],
    placementRatePercentage: 80,
    activeOpeningsCount: 9100,
    projectedAnnualHiringGrowth: 20.5,
    localAvailabilityRating: 'High',
    requiredSkills: ['CPVC & PPR Solvent Joining', 'Pressure Testing & Flow Balancing', 'Sanitary Fixture Installation', 'Water Metering', 'Pump Station Plumbing'],
    pathwaySteps: [
      {
        stepNumber: 1,
        title: 'Class 8 / 10 Pass',
        qualification: 'School Certification',
        duration: 'Baseline',
        roles: ['Aspirant'],
        monthlyEarningRange: [0, 0],
        keySkills: ['Basic measuring', 'Physical stamina'],
        nextMilestone: 'ITI Plumber 1-Year Course'
      },
      {
        stepNumber: 2,
        title: 'ITI Plumber Certification',
        qualification: 'NTC Certificate',
        duration: '1 Year',
        roles: ['Trainee Plumber'],
        monthlyEarningRange: [0, 2500],
        keySkills: ['Pipe threading', 'Sanitary layout drawings', 'Water tanks'],
        nextMilestone: 'Civic Jal Jeevan / Construction Apprenticeship'
      },
      {
        stepNumber: 3,
        title: 'Certified Piping & Sanitation Specialist',
        qualification: 'IPSC Certified Plumber',
        duration: 'Years 1 - 3',
        roles: ['Infrastructure Piping Technician', 'JJM Maintenance Executive', 'Residential Master Plumber'],
        monthlyEarningRange: [15000, 25000],
        keySkills: ['Pressure regulators', 'Concealed bath fittings', 'Sewage line gradient'],
        nextMilestone: 'Public Works Plumbing Contractor / Site Supervisor'
      },
      {
        stepNumber: 4,
        title: 'Senior Plumbing Supervisor / Water Works Contractor',
        qualification: 'IPSC Master Plumber / Diploma Civil',
        duration: 'Years 4 - 7',
        roles: ['Commercial High-Rise Plumbing Lead', 'Independent Government Registered Contractor'],
        monthlyEarningRange: [32000, 65000],
        keySkills: ['STP Plant Plumbing', 'Water Distribution Hydraulics', 'Billing & Estimation'],
        nextMilestone: 'Turnkey Public Health Engineering Enterprise'
      }
    ],
    parentConcernAnswers: [
      {
        concern: 'Job Security & Permanence',
        evidenceSummary: 'The Government of India has committed over ₹3.6 Lakh Crores to Har Ghar Jal under the Jal Jeevan Mission, bringing piped water to over 15 Crore rural households. Plumbers are required for both installation and ongoing operations.',
        metrics: [
          { label: 'National Mission Outlay', value: '₹3.6 Lakh Crore Jal Jeevan Mission', sourceId: 'src_nsdc' },
          { label: 'Universal Need', value: 'Every new home, hospital and school requires plumbing', sourceId: 'src_demo' }
        ]
      },
      {
        concern: 'Course Cost & Hidden Fees',
        evidenceSummary: 'Government ITI tuition for Plumber trade is as low as ₹50 to ₹150 per month, with full fee waivers for SC/ST and economically weaker families, plus free toolkits provided under PM Vishwakarma Yojana.',
        metrics: [
          { label: 'Government ITI Fee', value: 'Almost free (₹1,200/yr total with subsidies)', sourceId: 'src_dgt' },
          { label: 'PM Vishwakarma Toolkit', value: '₹15,000 free modern tool voucher', sourceId: 'src_dgt' }
        ]
      }
    ],
    sources: [DATA_SOURCES.dgt_ncvt, DATA_SOURCES.job_market_agg, DATA_SOURCES.nsdc_market],
    topEmployers: ['L&T Construction', 'Shapoorji Pallonji', 'Jal Jeevan State Water Missions', 'Jaquar & Co.', 'Astral Pipes', 'Ashirvad Pipes'],
    governmentSchemes: ['Jal Jeevan Mission (Har Ghar Jal)', 'PM Vishwakarma Yojana', 'AMRUT 2.0 Urban Water Mission'],
    femaleParticipationTrend: 'Emerging: All-women Jal Sahayika groups operating village water testing and tap maintenance.'
  }
];

export const MOCK_COUNSELLORS: Counsellor[] = [
  {
    id: 'counsellor-1',
    name: 'Dr. Sunita Sharma',
    title: 'Senior Vocational Career Psychologist',
    experienceYears: 14,
    languages: ['Hindi', 'English', 'Punjabi'],
    specializations: ['Engineering & Technical', 'Renewable Energy & Solar', 'Automotive & EV'],
    rating: 4.9,
    reviewsCount: 342,
    location: 'Lucknow, Uttar Pradesh',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    availableSlots: ['Today 03:00 PM', 'Today 05:30 PM', 'Tomorrow 11:00 AM'],
    affiliatedCenter: 'Regional Directorate of Skill Development & Entrepreneurship (RDSDE)'
  },
  {
    id: 'counsellor-2',
    name: 'Rajesh Mukherjee',
    title: 'Vocational Training & Apprenticeship Specialist',
    experienceYears: 11,
    languages: ['Bengali', 'Hindi', 'English'],
    specializations: ['Manufacturing & CNC', 'Healthcare & Wellness', 'IT & Digital Services'],
    rating: 4.8,
    reviewsCount: 289,
    location: 'Kolkata, West Bengal',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    availableSlots: ['Today 04:15 PM', 'Tomorrow 10:30 AM', 'Tomorrow 02:00 PM'],
    affiliatedCenter: 'National Skill Training Institute (NSTI), Dasnagar'
  },
  {
    id: 'counsellor-3',
    name: 'Ananya Deshmukh',
    title: 'Family Alignment & Rural Youth Counsellor',
    experienceYears: 9,
    languages: ['Marathi', 'Hindi', 'English'],
    specializations: ['Modern Agriculture & Drones', 'Renewable Energy & Solar', 'Healthcare & Wellness'],
    rating: 4.9,
    reviewsCount: 215,
    location: 'Pune, Maharashtra',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    availableSlots: ['Today 06:00 PM', 'Tomorrow 12:00 PM', 'Tomorrow 04:30 PM'],
    affiliatedCenter: 'Maharashtra State Skill Development Society'
  },
  {
    id: 'counsellor-4',
    name: 'M. Senthil Nathan',
    title: 'Industrial Apprenticeship & Placement Officer',
    experienceYears: 16,
    languages: ['Tamil', 'Telugu', 'English'],
    specializations: ['Automotive & EV', 'Manufacturing & CNC', 'Engineering & Technical'],
    rating: 4.9,
    reviewsCount: 410,
    location: 'Coimbatore, Tamil Nadu',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    availableSlots: ['Tomorrow 09:30 AM', 'Tomorrow 03:00 PM'],
    affiliatedCenter: 'Coimbatore District Industrial Centre & ITI Placement Cell'
  }
];

export const MOCK_SUCCESS_STORIES = [
  {
    studentName: 'Rohan Verma',
    parentName: 'Ramesh Verma (Farmer)',
    location: 'Varanasi, Uttar Pradesh',
    trade: 'Solar & Renewable Energy Technician',
    storyHeadline: 'From uncertainty about farming to leading a 6-person solar installation crew',
    quote: '"My father was anxious whether a 1-year solar course would provide stable food on the table. With KaushalSetu, we saw verified local rooftop data and PM Surya Ghar subsidies. Today I earn ₹38,000/month in my own district."',
    startingSalary: '₹15,000 / mo',
    currentSalary: '₹38,000 / mo',
    trainingInstitution: 'Govt ITI Chandauli & Suryamitra SCGJ',
    employer: 'Adani Solar Regional EPC Partner',
    yearOfPassing: '2023'
  },
  {
    studentName: 'Priya Karmakar',
    parentName: 'Aparna Karmakar (Tailor)',
    location: 'Hooghly, West Bengal',
    trade: 'Precision CNC Operator & Machinist',
    storyHeadline: 'Overcoming neighborhood doubts to become a defense component programmer',
    quote: '"People in our locality told my mother that manufacturing is not for girls. KaushalSetu showed us the clean, enclosed high-tech CNC toolrooms and defense corridor incentives. Now I program 5-axis machines at ₹32,000/month."',
    startingSalary: '₹17,000 / mo',
    currentSalary: '₹32,000 / mo',
    trainingInstitution: 'Women ITI Burdwan & Advanced Training Institute (NSTI)',
    employer: 'Aerospace Precision Components Pvt Ltd',
    yearOfPassing: '2022'
  },
  {
    studentName: 'Mohd. Imran',
    parentName: 'Abdul Rashid (Auto Rickshaw Driver)',
    location: 'Bhopal, Madhya Pradesh',
    trade: 'Automobile & EV Technician',
    storyHeadline: 'Transforming roadside mechanic dreams into certified Tata Motors EV specialist',
    quote: '"My father drove an auto for 25 years and wanted me to become a clerk. When we saw that EV technicians are certified by ASDC and work in air-conditioned OEM centers with clear supervisor ladders, he blessed my choice."',
    startingSalary: '₹16,000 / mo',
    currentSalary: '₹35,000 / mo',
    trainingInstitution: 'Govt ITI Govindpura Bhopal',
    employer: 'Tata Motors Authorized EV Hub',
    yearOfPassing: '2023'
  }
];

export const CONCERN_CATEGORIES: {
  category: ParentConcernCategory;
  shortDesc: string;
  iconName: string;
  typicalParentQuote: string;
  primaryEvidenceTypes: string[];
}[] = [
  {
    category: 'Income & Salary Growth',
    shortDesc: 'Will my child earn enough to support our family now and in 5-10 years?',
    iconName: 'TrendingUp',
    typicalParentQuote: 'ITI ke baad shuruwat me kitna milega aur 5 saal baad kya badhega?',
    primaryEvidenceTypes: ['Starting vs mid-career EPFO-verified wage bands', 'Overtime & incentive rules', 'Contractor earning potential']
  },
  {
    category: 'Job Security & Permanence',
    shortDesc: 'Is this job temporary or can my child be laid off anytime?',
    iconName: 'ShieldCheck',
    typicalParentQuote: 'Yeh private job permanent hoti hai ya kabhi bhi nikal sakte hain?',
    primaryEvidenceTypes: ['EPFO formal payroll registration stats', 'Government & PSU reservation quotas', 'Multi-year corporate AMC requirements']
  },
  {
    category: 'Social Status & Respect',
    shortDesc: 'Will our relatives and community look down upon vocational manual work?',
    iconName: 'Award',
    typicalParentQuote: 'Log kahenge ki beta college nahi gaya, chota kaam kar raha hai.',
    primaryEvidenceTypes: ['Modern digitized workshop photos', 'Corporate uniforms & badges', 'Skill India national honors']
  },
  {
    category: 'Workplace Safety & Health',
    shortDesc: 'Is there risk of electrocution, cuts, burns, or hazardous chemicals?',
    iconName: 'HeartHandshake',
    typicalParentQuote: 'Kaam me koi khatra ya chot lagne ka darr toh nahi hai?',
    primaryEvidenceTypes: ['Mandatory OSHA/IS safety protocols', 'Enclosed automated machinery', 'ESIC medical insurance coverage']
  },
  {
    category: 'Migration vs Local Work',
    shortDesc: 'Will my child have to leave our village/town for distant expensive cities?',
    iconName: 'MapPin',
    typicalParentQuote: 'Bache ko door Mumbai ya Bangalore akele bhejenge toh kharcha aur dhyan kaun rakhega?',
    primaryEvidenceTypes: ['Home district job vacancy count', 'Local MSME & agricultural demand', 'Net savings comparison']
  },
  {
    category: 'Training Quality & Fraud',
    shortDesc: 'Are private institutes scamming us with fake certificates?',
    iconName: 'CheckCircle2',
    typicalParentQuote: 'Faltu coaching wale paise le lete hain aur certificate nakli nikalta hai.',
    primaryEvidenceTypes: ['NCVT/DGT government portal affiliation search', 'Skill India digital QR badge verification', 'Government ITI fee structures']
  },
  {
    category: 'Course Cost & Hidden Fees',
    shortDesc: 'Can our family afford this without falling into high-interest debt?',
    iconName: 'BadgeIndianRupee',
    typicalParentQuote: 'Admission me kitna kharcha aayega? Koi chupa hua fee toh nahi hai?',
    primaryEvidenceTypes: ['Govt ITI fee breakdown (under ₹2,500/year)', 'NAPS paid apprenticeship stipends', 'State SC/ST/OBC scholarship links']
  },
  {
    category: 'Higher Education Pathways',
    shortDesc: 'Can my child still get a degree or diploma later in life?',
    iconName: 'GraduationCap',
    typicalParentQuote: 'Kya baad me engineering diploma ya BA/B.Tech kar sakte hain?',
    primaryEvidenceTypes: ['Lateral entry to 2nd year Polytechnic Diploma', 'NIOS Class 12 equivalence bridge', 'IGNOU/BCA distance options']
  },
  {
    category: 'Government Job Opportunities',
    shortDesc: 'Can my child apply for Indian Railways, Defense, or State Electricity Boards?',
    iconName: 'Building2',
    typicalParentQuote: 'Sarkari naukri (Railways/DISCOM/Defense) me ITI wale ja sakte hain kya?',
    primaryEvidenceTypes: ['Railway RRB technician eligibility rules', 'State electricity board junior wireman exams', 'DRDO/ISRO Technician-B criteria']
  }
];

export const ADMIN_ANALYTICS_DATA = {
  totalFamiliesCounselled: 28419,
  activeCounselingSessionsToday: 412,
  averageAlignmentImprovementPercent: 32.8,
  unresolvedHumanEscalations: 24,
  resolutionRatePercent: 94.2,
  parentConcernsBreakdown: [
    { concern: 'Job Security & Permanence', percentage: 38 },
    { concern: 'Income & Salary Growth', percentage: 29 },
    { concern: 'Social Status & Respect', percentage: 14 },
    { concern: 'Government Job Pathways', percentage: 10 },
    { concern: 'Migration vs Local Work', percentage: 5 },
    { concern: 'Workplace Safety', percentage: 4 }
  ],
  topExploredTrades: [
    { tradeName: 'Electrical Technician', explorations: 8940, hiringGrowth: '+21.5%' },
    { tradeName: 'Solar & Renewable Technician', explorations: 7210, hiringGrowth: '+34.2%' },
    { tradeName: 'Healthcare Assistant (GDA)', explorations: 5890, hiringGrowth: '+28.5%' },
    { tradeName: 'Automobile & EV Technician', explorations: 5120, hiringGrowth: '+26.8%' },
    { tradeName: 'IT Support & Network Associate', explorations: 4430, hiringGrowth: '+22.0%' },
    { tradeName: 'Precision CNC Operator', explorations: 3820, hiringGrowth: '+24.1%' }
  ],
  stateActivityDistribution: [
    { state: 'Uttar Pradesh', sessions: 6840, topConcern: 'Job Security & Permanence' },
    { state: 'West Bengal', sessions: 4920, topConcern: 'Income & Salary Growth' },
    { state: 'Bihar', sessions: 4180, topConcern: 'Government Job Pathways' },
    { state: 'Maharashtra', sessions: 3910, topConcern: 'Social Status & Respect' },
    { state: 'Madhya Pradesh', sessions: 3240, topConcern: 'Migration vs Local Work' },
    { state: 'Tamil Nadu', sessions: 2820, topConcern: 'Salary Growth & Promotion' }
  ]
};
