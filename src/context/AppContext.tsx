import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  FamilyProfile, 
  LanguageCode, 
  Trade, 
  SourceMetadata, 
  CounsellingMessage, 
  ParentConcernCategory,
  Counsellor,
  CounsellorEscalationBrief,
  AuthUser
} from '../types';
import { MOCK_TRADES, DATA_SOURCES, CONCERN_CATEGORIES, MOCK_COUNSELLORS } from '../data/mockData';
import { TRANSLATIONS } from '../translations';

interface AppContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: typeof TRANSLATIONS['en'];
  profile: FamilyProfile;
  setProfile: React.Dispatch<React.SetStateAction<FamilyProfile>>;
  selectedTrade: Trade;
  setSelectedTrade: (trade: Trade) => void;
  comparisonTradeIds: string[];
  toggleCompareTrade: (tradeId: string) => void;
  messages: CounsellingMessage[];
  sendUserMessage: (text: string, speaker?: 'Student' | 'Parent' | 'Both') => void;
  activeSourceModal: SourceMetadata | null;
  setActiveSourceModal: (source: SourceMetadata | null) => void;
  activeEscalationModal: boolean;
  setActiveEscalationModal: (open: boolean) => void;
  activeBookingModal: Counsellor | null;
  setActiveBookingModal: (counsellor: Counsellor | null) => void;
  playTTS: (text: string) => void;
  stopTTS: () => void;
  isSpeaking: boolean;
  escalationBrief: CounsellorEscalationBrief;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  currentUser: AuthUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  activePage: string;
  setActivePage: (page: string) => void;
  goBack: () => void;
  canGoBack: boolean;
  pageHistory: string[];
}

const defaultProfile: FamilyProfile = {
  id: 'fam-demo-01',
  userRole: 'both',
  learner: {
    name: 'Aarav Sharma',
    age: 17,
    education: 'Class 10 (Secondary)',
    interests: ['Hands-on wiring', 'Machines', 'Computers'],
    skills: ['Basic electrical repair', 'Maths 72%', 'Tool handling'],
    preferredLocation: 'home_district',
    careerGoal: 'Electrical Supervisor or Solar Enterprise',
    confidenceScore: 82
  },
  parent: {
    relationship: 'Father',
    mainExpectations: ['Monthly income >= ₹20,000 within 2 years', 'Guaranteed job permanence', 'Dignity in society'],
    primaryConcerns: ['Job Security & Permanence', 'Income & Salary Growth', 'Government Job Opportunities'],
    expectedMinIncome: 18000,
    jobSecurityPriority: 'critical',
    furtherEducationDesire: true,
    confidenceScore: 43
  },
  location: {
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    subDistrictOrBlock: 'Pindra Block',
    type: 'semi-urban'
  },
  language: 'hi',
  createdAt: '2024-10-01',
  alignmentBefore: {
    learnerConfidence: 82,
    parentConfidence: 43
  },
  alignmentAfter: {
    learnerConfidence: 89,
    parentConfidence: 78
  }
};

const defaultInitialMessages: CounsellingMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    speakerLabel: 'KaushalSetu AI',
    text: 'Namaste! Welcome Aarav and Sharma ji. I am your KaushalSetu family vocational guide. How can I help address your questions regarding vocational trades, starting salaries, safety, or government job eligibility?',
    timestamp: '10:00 AM',
    suggestedPrompts: [
      'ITI ke baad mere bete ko achhi aur pakki naukri milegi?',
      'Starting salary kitni hoti hai aur 5 saal baad kitna badhega?',
      'Kya ITI ke baad engineering degree ya sarkari naukri mil sakti hai?'
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [profile, setProfile] = useState<FamilyProfile>(defaultProfile);
  const [selectedTrade, setSelectedTrade] = useState<Trade>(MOCK_TRADES[0]);
  const [comparisonTradeIds, setComparisonTradeIds] = useState<string[]>([
    'electrical-technician', 
    'solar-renewable-technician', 
    'automobile-ev-technician'
  ]);
  const [messages, setMessages] = useState<CounsellingMessage[]>(defaultInitialMessages);
  const [activeSourceModal, setActiveSourceModal] = useState<SourceMetadata | null>(null);
  const [activeEscalationModal, setActiveEscalationModal] = useState<boolean>(false);
  const [activeBookingModal, setActiveBookingModal] = useState<Counsellor | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: 'demo-user-1',
    name: 'Aarav & Ramesh Sharma',
    role: 'joint_family',
    location: 'Varanasi, UP',
    isLoggedIn: true
  });

  // Navigation stack and browser history integration
  const getInitialPage = (): string => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashPage = window.location.hash.replace('#', '');
      const validPages = [
        'home', 'assessment', 'onboarding', 'counselling', 'trades', 
        'pathways', 'compare', 'market', 'alignment', 'counsellors', 
        'summary', 'admin'
      ];
      if (validPages.includes(hashPage)) {
        return hashPage;
      }
    }
    return 'home';
  };

  const [activePage, setActivePageState] = useState<string>(getInitialPage);
  const [pageHistory, setPageHistory] = useState<string[]>([getInitialPage()]);

  // Navigate to a new page
  const setActivePage = useCallback((page: string) => {
    setActivePageState(prevActive => {
      if (prevActive === page) return prevActive;
      
      setPageHistory(prevHist => [...prevHist, page]);
      
      if (typeof window !== 'undefined') {
        window.history.pushState({ page }, '', `#${page}`);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      return page;
    });
  }, []);

  // Robust goBack function that pops history or falls back safely to 'home'
  const goBack = useCallback(() => {
    setPageHistory(prevHist => {
      if (prevHist.length > 1) {
        const nextHist = prevHist.slice(0, -1);
        const prevPage = nextHist[nextHist.length - 1] || 'home';
        setActivePageState(prevPage);
        if (typeof window !== 'undefined') {
          window.history.pushState({ page: prevPage }, '', `#${prevPage}`);
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
        return nextHist;
      } else {
        setActivePageState('home');
        if (typeof window !== 'undefined') {
          window.history.pushState({ page: 'home' }, '', '#home');
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
        return ['home'];
      }
    });
  }, []);

  // Sync with browser Back and Forward buttons (popstate event)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const pageFromState = event.state?.page;
      const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
      const targetPage = pageFromState || hash || 'home';
      
      setActivePageState(targetPage);
      setPageHistory(prev => {
        if (prev.length > 1) {
          return prev.slice(0, -1);
        }
        return [targetPage];
      });
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const canGoBack = activePage !== 'home' || pageHistory.length > 1;

  const t = TRANSLATIONS[language];

  const toggleCompareTrade = (tradeId: string) => {
    if (comparisonTradeIds.includes(tradeId)) {
      if (comparisonTradeIds.length > 2) {
        setComparisonTradeIds(prev => prev.filter(id => id !== tradeId));
      }
    } else {
      if (comparisonTradeIds.length < 4) {
        setComparisonTradeIds(prev => [...prev, tradeId]);
      }
    }
  };

  const playTTS = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (language === 'bn') {
      utterance.lang = 'bn-IN';
    } else {
      utterance.lang = 'en-IN';
    }
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopTTS = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const detectConcernCategory = (query: string): ParentConcernCategory | null => {
    const q = query.toLowerCase();
    if (q.includes('security') || q.includes('permanent') || q.includes('pakki') || q.includes('suraksha') || q.includes('job milegi') || q.includes('stability')) {
      return 'Job Security & Permanence';
    }
    if (q.includes('salary') || q.includes('income') || q.includes('paisa') || q.includes('kamayi') || q.includes('rupaye') || q.includes('earning') || q.includes('badhega')) {
      return 'Income & Salary Growth';
    }
    if (q.includes('status') || q.includes('izzat') || q.includes('respect') || q.includes('chota kaam') || q.includes('samaj') || q.includes('log kya kahenge')) {
      return 'Social Status & Respect';
    }
    if (q.includes('sarkari') || q.includes('government') || q.includes('railway') || q.includes('rrb') || q.includes('discom') || q.includes('defense')) {
      return 'Government Job Opportunities';
    }
    if (q.includes('higher') || q.includes('degree') || q.includes('diploma') || q.includes('b.tech') || q.includes('padhai') || q.includes('college')) {
      return 'Higher Education Pathways';
    }
    if (q.includes('door') || q.includes('migration') || q.includes('ghar') || q.includes('shehar') || q.includes('mumbai') || q.includes('local')) {
      return 'Migration vs Local Work';
    }
    if (q.includes('safety') || q.includes('khatra') || q.includes('chot') || q.includes('current') || q.includes('hazard')) {
      return 'Workplace Safety & Health';
    }
    if (q.includes('fees') || q.includes('kharcha') || q.includes('cost') || q.includes('paisa lagega')) {
      return 'Course Cost & Hidden Fees';
    }
    return null;
  };

  const sendUserMessage = (text: string, speaker: 'Student' | 'Parent' | 'Both' = 'Parent') => {
    const userMsg: CounsellingMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      speakerLabel: speaker,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    const detectedConcern = detectConcernCategory(text);

    setTimeout(() => {
      let aiResponseText = '';
      let evidence: any = undefined;
      let suggested: string[] = [];

      if (detectedConcern === 'Job Security & Permanence') {
        aiResponseText = `I understand your concern regarding job security and permanence. Let me present verified government and industry data for ${selectedTrade.name} in ${profile.location.state} and nationwide.`;
        evidence = {
          id: 'ev-security-01',
          title: `Job Security & Placement Evidence: ${selectedTrade.name}`,
          category: 'Job Security & Permanence' as ParentConcernCategory,
          statistic: `${selectedTrade.placementRatePercentage}% placement rate with ${selectedTrade.activeOpeningsCount.toLocaleString('en-IN')}+ active verified vacancies`,
          comparisonContext: `Annual hiring growth is projected at +${selectedTrade.projectedAnnualHiringGrowth}% due to infrastructure and industrial expansion.`,
          keyTakeaways: [
            'All public utilities, state power boards, and large industries must employ licensed technicians by law.',
            'Apprentices who complete NAPS get formal EPFO corporate social security and PF contributions.',
            'Eligible for permanent technician positions in Indian Railways (RRB), Metro Rail, and State Electricity Boards.'
          ],
          source: DATA_SOURCES.dgt_ncvt,
          applicableDistricts: [profile.location.district, 'Statewide Industrial Hubs']
        };
        suggested = [
          'Starting salary aur 5 saal baad ka increment kitna hota hai?',
          'Kya ITI ke baad aage engineering diploma kar sakte hain?',
          'Ek human counsellor se baat karke detail samajhna hai.'
        ];
      } else if (detectedConcern === 'Income & Salary Growth') {
        aiResponseText = `Here is the verified income data. Starting earnings for ${selectedTrade.name} typically begin between ₹${selectedTrade.monthlyStartingSalary[0].toLocaleString('en-IN')} and ₹${selectedTrade.monthlyStartingSalary[1].toLocaleString('en-IN')} per month during early apprenticeship/technician roles. With 4-6 years of experience and supervisor licensing, earnings increase to ₹${selectedTrade.monthlyMidCareerSalary[0].toLocaleString('en-IN')} - ₹${selectedTrade.monthlyMidCareerSalary[1].toLocaleString('en-IN')}+ per month.`;
        evidence = {
          id: 'ev-income-01',
          title: `Verified Wage Distribution: ${selectedTrade.name}`,
          category: 'Income & Salary Growth' as ParentConcernCategory,
          statistic: `₹${selectedTrade.monthlyStartingSalary[0].toLocaleString('en-IN')} - ₹${selectedTrade.monthlyStartingSalary[1].toLocaleString('en-IN')} (Starting) → ₹${selectedTrade.monthlyMidCareerSalary[0].toLocaleString('en-IN')} - ₹${selectedTrade.monthlyMidCareerSalary[1].toLocaleString('en-IN')} (Mid-Career)`,
          comparisonContext: 'Source: EPFO Formal Payroll Data & NSDC Sector Skill Council Wage Benchmark.',
          keyTakeaways: [
            'Apprentices receive monthly government-backed stipends (₹8,500 - ₹12,000) during training.',
            'Licensed supervisors and independent contractors frequently earn ₹50,000+ per month.',
            'Overtime and emergency maintenance allowances offer additional 15-25% monthly income.'
          ],
          source: DATA_SOURCES.nsdc_market
        };
        suggested = [
          'Sarkari naukri ke kya raste hain?',
          'Workplace par safety kaisi hoti hai?',
          'Dusre trades ke saath compare karke dikhao.'
        ];
      } else if (detectedConcern === 'Higher Education Pathways') {
        aiResponseText = `A common misconception is that vocational training stops further education. Under DGT and AICTE regulations, an ITI pass student can take direct Lateral Entry into the 2nd Year of a 3-Year Polytechnic Engineering Diploma, and subsequently pursue a B.Tech degree.`;
        evidence = {
          id: 'ev-edu-01',
          title: 'Higher Education Mobility Pathway',
          category: 'Higher Education Pathways' as ParentConcernCategory,
          statistic: 'Direct Lateral Entry to 2nd Year Polytechnic Diploma + NIOS 12th Equivalence',
          comparisonContext: 'Approved by AICTE and Directorate General of Training (DGT).',
          keyTakeaways: [
            'Class 10 + 2-Year ITI graduates can take 1 NIOS language exam to receive a recognized Class 12 Certificate.',
            'Can join 2nd year of Engineering Diploma without repeating Class 11 and 12.',
            'Eligible for distance BCA / B.Voc programs while working full-time.'
          ],
          source: DATA_SOURCES.dgt_ncvt
        };
        suggested = [
          'Kya humein local counsellor se milna chahiye?',
          'Is trade me training fees kitni hoti hai?'
        ];
      } else if (detectedConcern === 'Government Job Opportunities') {
        aiResponseText = `For government employment, ${selectedTrade.name} is one of the highest recruited qualifications in Indian Railways (RRB Assistant Loco Pilot & Technician), State Power Corporations (DISCOMs), Defense Ordnance & Naval Dockyards, and ISRO/DRDO Technician positions.`;
        evidence = {
          id: 'ev-govt-01',
          title: 'Government & PSU Recruitment Quota',
          category: 'Government Job Opportunities' as ParentConcernCategory,
          statistic: '18,000+ Annual Railway & PSU Vacancies exclusively reserved for ITI/NTC Holders',
          comparisonContext: 'Recruiting bodies: RRB, DMRC, NTPC, BHEL, State Power Boards.',
          keyTakeaways: [
            'Apprenticeship in Railway workshops gives up to 20% reservation weightage in RRB Level 1 recruitment.',
            'Pension and medical facilities under Central/State government service rules apply.',
            'Lower competition compared to general non-technical graduate exams.'
          ],
          source: DATA_SOURCES.dgt_ncvt
        };
        suggested = [
          'Hamare district me kaun se acche Govt ITI hain?',
          'Family alignment summary check karein.'
        ];
      } else {
        aiResponseText = `I have noted your question: "${text}". Based on verified NSQF Level ${selectedTrade.nsqfLevel} data and the National Career Service registry, ${selectedTrade.name} currently has ${selectedTrade.activeOpeningsCount.toLocaleString('en-IN')} verified openings with an 81% average placement rate. Would you like to review specific concerns regarding income, safety, education pathways, or talk with a human vocational counsellor?`;
        suggested = [
          'Job security aur placement rate kitna hai?',
          'Salary kitni milegi aur growth kaise hogi?',
          'Talk to a human counsellor'
        ];
      }

      const aiMsg: CounsellingMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        speakerLabel: 'KaushalSetu AI',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        detectedConcern: detectedConcern || undefined,
        evidenceCard: evidence,
        suggestedPrompts: suggested
      };

      setMessages(prev => [...prev, aiMsg]);

      // If parent asked about human counsellor, trigger modal
      if (text.toLowerCase().includes('counsellor') || text.toLowerCase().includes('talk to a human')) {
        setActiveEscalationModal(true);
      }
    }, 600);
  };

  const escalationBrief: CounsellorEscalationBrief = {
    learnerName: profile.learner.name,
    education: profile.learner.education,
    interestedTrades: [selectedTrade.name, 'Solar & Renewable Energy Technician'],
    parentConcerns: profile.parent.primaryConcerns,
    informationDiscussed: [
      `Reviewed verified starting salary (₹${selectedTrade.monthlyStartingSalary[0].toLocaleString('en-IN')} - ₹${selectedTrade.monthlyStartingSalary[1].toLocaleString('en-IN')})`,
      `Reviewed 81% placement rate and ${selectedTrade.activeOpeningsCount.toLocaleString('en-IN')} active jobs`,
      'Discussed Lateral Entry pathway into 2nd year Polytechnic Diploma'
    ],
    unresolvedQuestions: [
      'Specific government job vacancy calendar for Indian Railways & State DISCOM in UP',
      'Local Govt ITI hostel and scholarship availability for current session'
    ],
    urgencyLevel: 'Standard',
    generatedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        profile,
        setProfile,
        selectedTrade,
        setSelectedTrade,
        comparisonTradeIds,
        toggleCompareTrade,
        messages,
        sendUserMessage,
        activeSourceModal,
        setActiveSourceModal,
        activeEscalationModal,
        setActiveEscalationModal,
        activeBookingModal,
        setActiveBookingModal,
        playTTS,
        stopTTS,
        isSpeaking,
        escalationBrief,
        activeTab,
        setActiveTab,
        isAuthModalOpen,
        setIsAuthModalOpen,
        currentUser,
        setCurrentUser,
        activePage,
        setActivePage,
        goBack,
        canGoBack,
        pageHistory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
