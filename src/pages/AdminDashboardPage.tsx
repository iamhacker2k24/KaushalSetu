import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  PhoneCall, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  Database, 
  ShieldCheck, 
  Layers, 
  FileText, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ExternalLink,
  ArrowLeft,
  Clock,
  Sparkles,
  Award,
  Zap,
  Activity,
  Briefcase,
  Building2,
  RefreshCw,
  ChevronRight,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ADMIN_ANALYTICS_DATA, DATA_SOURCES, MOCK_TRADES } from '../data/mockData';
import { BackButton } from '../components/common/BackButton';

interface Props {
  setActivePage: (page: string) => void;
}

export const AdminDashboardPage: React.FC<Props> = ({ setActivePage }) => {
  const { goBack } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'concerns' | 'trades' | 'regional' | 'sources'>('overview');
  
  // Concerns Section State
  const [selectedConcernCategory, setSelectedConcernCategory] = useState<string>('All');
  const [resolvedEscalations, setResolvedEscalations] = useState<string[]>([]);

  // Trades Section State
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>('All');
  const [tradeSortBy, setTradeSortBy] = useState<'openings' | 'placement' | 'growth'>('openings');

  // Regional Section State
  const [selectedState, setSelectedState] = useState<string>('All India');

  // Sources Section State
  const [searchSourceQuery, setSearchSourceQuery] = useState('');

  const adminNav = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'concerns', label: 'Parent Concerns Engine', icon: AlertTriangle, badge: 'NLP Live' },
    { id: 'trades', label: 'Trade Demand Intelligence', icon: Layers },
    { id: 'regional', label: 'Regional Analysis (States)', icon: MapPin },
    { id: 'sources', label: 'Data Sources & Audits', icon: Database, badge: 'Verified' }
  ];

  // Detailed NLP Parent Concerns Data
  const parentConcernsTelemetry = [
    {
      id: 'pc-1',
      category: 'Job Security & Permanence',
      prevalence: 38,
      severity: 'Critical',
      samplePhrases: [
        'Kya ITI ke baad pakki sarkari ya permanent naukri milegi?',
        'Contract par toh nahi nikal denge 1 saal baad?',
        'Railway aur DISCOM me permanent technician bharti hoti hai?'
      ],
      aiResolutionModel: 'EPFO formal payroll evidence + RRB Level 1 apprentice quota gazette',
      resolutionRate: 78,
      avgResolutionTime: '2m 45s'
    },
    {
      id: 'pc-2',
      category: 'Income & Salary Growth',
      prevalence: 29,
      severity: 'Critical',
      samplePhrases: [
        'Starting salary kitni hogi, kya ghar ka kharcha chalega?',
        '5 saal baad ₹35,000+ per month ho sakta hai?',
        'Apprenticeship me stipend kitna milta hai?'
      ],
      aiResolutionModel: 'NSDC Sector Wage Benchmark + Certified 5-Year progression curve',
      resolutionRate: 84,
      avgResolutionTime: '3m 10s'
    },
    {
      id: 'pc-3',
      category: 'Social Status & Respect',
      prevalence: 14,
      severity: 'High',
      samplePhrases: [
        'Log kahenge mechanic ya chota kaam kar raha hai',
        'Corporate uniform aur factory me izzat milti hai?',
        'Kya yeh normal B.A. se behtar mana jayega?'
      ],
      aiResolutionModel: 'Modernized tech hub evidence (OEM service labs, Ather/Tata diagnostics)',
      resolutionRate: 71,
      avgResolutionTime: '4m 05s'
    },
    {
      id: 'pc-4',
      category: 'Higher Education Pathways',
      prevalence: 10,
      severity: 'Moderate',
      samplePhrases: [
        'Kya ITI ke baad engineering degree ya diploma kar sakte hain?',
        'Padhai hamesha ke liye ruk toh nahi jayegi?'
      ],
      aiResolutionModel: 'AICTE Lateral Entry into 2nd-Year Polytechnic + NIOS 12th equivalence',
      resolutionRate: 92,
      avgResolutionTime: '1m 50s'
    },
    {
      id: 'pc-5',
      category: 'Migration vs Local Work',
      prevalence: 5,
      severity: 'Moderate',
      samplePhrases: [
        'Door shehar (Mumbai/Delhi) jana padega ya apne district me kaam milega?',
        'Home district me Govt ITI placements hain?'
      ],
      aiResolutionModel: 'District industrial cluster mapping (MSME clusters + local DISCOMs)',
      resolutionRate: 80,
      avgResolutionTime: '2m 30s'
    },
    {
      id: 'pc-6',
      category: 'Workplace Safety & Health',
      prevalence: 4,
      severity: 'High',
      samplePhrases: [
        'Current lagne ya heavy machine se chot ka khatra?',
        'Factory me ESIC medical insurance hota hai?'
      ],
      aiResolutionModel: 'Directorate of Factory Inspection safety protocols + mandatory ESIC rules',
      resolutionRate: 88,
      avgResolutionTime: '2m 15s'
    }
  ];

  // Pending Human Counsellor Escalation Queue
  const pendingEscalations = [
    {
      id: 'esc-101',
      student: 'Aarav Sharma',
      parent: 'Ramesh Sharma (Father)',
      state: 'Uttar Pradesh (Varanasi)',
      trade: 'Electrical Technician',
      query: 'Wants exact dates for UP State Electricity Board (UPPCL) TG2 technician notification for 2025.',
      urgency: 'Standard',
      time: '12 mins ago'
    },
    {
      id: 'esc-102',
      student: 'Priya Mondal',
      parent: 'Bikash Mondal (Father)',
      state: 'West Bengal (Nadia)',
      trade: 'Solar & Renewable Energy',
      query: 'Inquiring if local Govt Women ITI provides hostel accommodation and Kanyashree scheme coverage.',
      urgency: 'Urgent',
      time: '28 mins ago'
    },
    {
      id: 'esc-103',
      student: 'Vikram Yadav',
      parent: 'Mahendra Yadav (Uncle)',
      state: 'Bihar (Patna)',
      trade: 'Automobile & EV Diagnostics',
      query: 'Needs confirmation whether Railway Apprentice certificate guarantees 20% quota in RRB Level 1 post.',
      urgency: 'Standard',
      time: '45 mins ago'
    },
    {
      id: 'esc-104',
      student: 'Ananya Deshmukh',
      parent: 'Suresh Deshmukh (Father)',
      state: 'Maharashtra (Pune)',
      trade: 'Healthcare General Duty Assistant (GDA)',
      query: 'Parent skeptical about hospital night shifts; seeking verified NABH safety norms for female GDA interns.',
      urgency: 'Urgent',
      time: '1 hr ago'
    }
  ];

  // State-by-State Regional Intelligence Data
  const regionalData = [
    {
      state: 'Uttar Pradesh',
      govtItis: 305,
      pvtItis: 2840,
      annualCapacity: 412000,
      familySessions: 6840,
      primaryDoubt: 'Job Security & Permanent DISCOM / Railway Quotas',
      localRetentionRate: '74%',
      dstAdoption: '38%',
      topEmployers: ['UPPCL / State DISCOMs', 'BHEL Varanasi', 'Tata Motors Lucknow', 'NTPC'],
      avgEscalationResponseTime: '2.1 hrs'
    },
    {
      state: 'West Bengal',
      govtItis: 248,
      pvtItis: 190,
      annualCapacity: 78500,
      familySessions: 4920,
      primaryDoubt: 'Starting Salary & Guaranteed Paid Apprenticeship',
      localRetentionRate: '68%',
      dstAdoption: '42%',
      topEmployers: ['Titagarh Rail Systems', 'Exide Industries', 'CESC Kolkata', 'Garden Reach Shipbuilders'],
      avgEscalationResponseTime: '2.4 hrs'
    },
    {
      state: 'Bihar',
      govtItis: 149,
      pvtItis: 1120,
      annualCapacity: 215000,
      familySessions: 4180,
      primaryDoubt: 'Railway RRB & Central PSU Reservation Eligibility',
      localRetentionRate: '52%',
      dstAdoption: '29%',
      topEmployers: ['East Central Railway Workshops', 'Barauni Refinery (IOCL)', 'Power Grid'],
      avgEscalationResponseTime: '2.8 hrs'
    },
    {
      state: 'Maharashtra',
      govtItis: 417,
      pvtItis: 560,
      annualCapacity: 142000,
      familySessions: 3910,
      primaryDoubt: 'Social Status vs Engineering Degree & Career Dignity',
      localRetentionRate: '81%',
      dstAdoption: '64%',
      topEmployers: ['Tata Motors Pune', 'Bajaj Auto', 'Mahindra & Mahindra', 'L&T Heavy Engineering'],
      avgEscalationResponseTime: '1.8 hrs'
    },
    {
      state: 'Madhya Pradesh',
      govtItis: 221,
      pvtItis: 780,
      annualCapacity: 128000,
      familySessions: 3240,
      primaryDoubt: 'Migration to Industrial Hubs vs Local Work',
      localRetentionRate: '59%',
      dstAdoption: '33%',
      topEmployers: ['BHEL Bhopal', 'Eicher Commercial Vehicles', 'Grasim Industries'],
      avgEscalationResponseTime: '3.1 hrs'
    },
    {
      state: 'Tamil Nadu',
      govtItis: 91,
      pvtItis: 410,
      annualCapacity: 89000,
      familySessions: 2820,
      primaryDoubt: 'Salary Growth, EV Transition & Supervisor Licensing',
      localRetentionRate: '86%',
      dstAdoption: '72%',
      topEmployers: ['Hyundai Motor India', 'TVS Motor Company', 'Ola Futurefactory', 'Ashok Leyland'],
      avgEscalationResponseTime: '1.5 hrs'
    }
  ];

  const handleResolveEscalation = (id: string) => {
    setResolvedEscalations(prev => [...prev, id]);
  };

  const filteredConcerns = selectedConcernCategory === 'All' 
    ? parentConcernsTelemetry 
    : parentConcernsTelemetry.filter(c => c.category === selectedConcernCategory);

  const filteredRegionalData = selectedState === 'All India'
    ? regionalData
    : regionalData.filter(r => r.state === selectedState);

  const filteredTrades = MOCK_TRADES.filter(t => {
    if (selectedSectorFilter === 'All') return true;
    return t.category.toLowerCase().includes(selectedSectorFilter.toLowerCase());
  }).sort((a, b) => {
    if (tradeSortBy === 'placement') return b.placementRatePercentage - a.placementRatePercentage;
    if (tradeSortBy === 'growth') return b.projectedAnnualHiringGrowth - a.projectedAnnualHiringGrowth;
    return b.activeOpeningsCount - a.activeOpeningsCount;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between gap-3">
        <BackButton label="Back to Public Portal" targetPage="home" />
        <span className="text-xs font-semibold text-slate-500">
          Admin Role: Government Skill Directorate Admin
        </span>
      </div>

      {/* Admin Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white flex items-center justify-center font-bold shadow-md shrink-0">
            <BarChart3 className="w-6 h-6 text-brand-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                KaushalSetu Administrative Intelligence Portal
              </h1>
              <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Admin Console
              </span>
            </div>
            <p className="text-xs text-slate-500">
              National Vocational Decision Intelligence • DGT / NSDC / NCS Multi-Source Telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActivePage('home')}
            className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit to Public Portal</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Pills */}
      <div className="flex overflow-x-auto pb-2 border-b border-slate-200 gap-2 no-scrollbar">
        {adminNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeAdminTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveAdminTab(item.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black uppercase ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TOP 5 OPERATIONAL KPIS (Always Visible in Admin) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Sessions
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block mt-1">
            {ADMIN_ANALYTICS_DATA.totalFamiliesCounselled.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            ↑ +18.4% this month
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Active Today
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-brand-600 block mt-1">
            {ADMIN_ANALYTICS_DATA.activeCounselingSessionsToday}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Live joint consultations
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Avg Alignment Boost
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 block mt-1">
            +{ADMIN_ANALYTICS_DATA.averageAlignmentImprovementPercent}%
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Parent-Student consensus
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Human Escalations
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-amber-600 block mt-1">
            {ADMIN_ANALYTICS_DATA.unresolvedHumanEscalations - resolvedEscalations.length} Pending
          </span>
          <span className="text-[11px] text-amber-700 font-semibold block mt-1">
            Assigned to state RDSDE
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Resolution Rate
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-purple-600 block mt-1">
            {ADMIN_ANALYTICS_DATA.resolutionRatePercent}%
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            Verified without dispute
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 1: DASHBOARD OVERVIEW */}
      {/* ======================================================== */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Live System Health Pulse Bar */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs shadow-md">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="font-bold">National Skill Intelligence Engine: Operational</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <span>Avg NLP Latency: <strong className="text-emerald-400">142ms</strong></span>
              <span>•</span>
              <span>Zero-Hallucination Guard: <strong className="text-emerald-400">100.0% Compliant</strong></span>
              <span>•</span>
              <span>Active Server Region: <strong className="text-white">Govt MeitY Cloud (NIC)</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Parent Concerns Breakdown Card */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Primary Parental Anxieties (NLP Telemetry)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Aggregated from 28,000+ family consultation transcripts
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveAdminTab('concerns')}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Deep Engine</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3.5">
                {ADMIN_ANALYTICS_DATA.parentConcernsBreakdown.map((item, i) => (
                  <div key={i} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>{item.concern}</span>
                      <span className="font-bold text-slate-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          i === 0 ? 'bg-emerald-600' : i === 1 ? 'bg-brand-600' : i === 2 ? 'bg-purple-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Administrative Takeaway:</strong> Job Security (38%) and Income (29%) account for over two-thirds of all parental resistance. Automated evidence cards displaying EPFO payroll registration and DISCOM / Railway quotas yield an immediate 74% reduction in parental doubt.
              </div>
            </div>

            {/* State-wise Engagement Card */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Top State Engagement Activity
                  </h3>
                  <p className="text-xs text-slate-500">
                    Geographic distribution across high-volume states
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveAdminTab('regional')}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Regional Matrix</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5">
                {ADMIN_ANALYTICS_DATA.stateActivityDistribution.map((st, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">{st.state}</span>
                      <span className="text-[11px] text-slate-500">
                        Top Worry: <strong className="text-amber-800">{st.topConcern}</strong>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-brand-700 text-sm block">
                        {st.sessions.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400">Consultations</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Live Activity Stream */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Live Joint Family Consultation Telemetry Stream
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live Feed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <div className="flex justify-between items-center text-slate-500 text-[11px]">
                  <span>Varanasi, UP</span>
                  <span className="text-emerald-600 font-bold">2 mins ago</span>
                </div>
                <p className="font-bold text-slate-800">Aarav & Ramesh Sharma</p>
                <p className="text-slate-600 text-[11px]">Explored <strong>Electrical Technician</strong> • Alignment improved 43% → 78%</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <div className="flex justify-between items-center text-slate-500 text-[11px]">
                  <span>Kolkata, WB</span>
                  <span className="text-emerald-600 font-bold">5 mins ago</span>
                </div>
                <p className="font-bold text-slate-800">Priya & Bikash Mondal</p>
                <p className="text-slate-600 text-[11px]">Explored <strong>Solar & Renewable Technician</strong> • Verified ₹18k stipend data</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <div className="flex justify-between items-center text-slate-500 text-[11px]">
                  <span>Pune, MH</span>
                  <span className="text-emerald-600 font-bold">9 mins ago</span>
                </div>
                <p className="font-bold text-slate-800">Ananya & Suresh Deshmukh</p>
                <p className="text-slate-600 text-[11px]">Explored <strong>Automobile & EV Technician</strong> • Checked Tata Motors tie-ups</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: PARENT CONCERNS ENGINE (Requested by User) */}
      {/* ======================================================== */}
      {activeAdminTab === 'concerns' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  NLP Sentiment & Anxiety Intelligence
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display mt-2">
                  Parent Concerns Deep Telemetry Engine
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Real-time natural language classification of parental hesitation, root cause mapping, and automated evidence resolution efficacy.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Concerns Classified</span>
                  <span className="text-2xl font-black text-amber-300">28,419</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Evidence Match Rate</span>
                  <span className="text-2xl font-black text-emerald-400">94.2%</span>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 mr-1">Filter by Concern:</span>
              {['All', 'Job Security & Permanence', 'Income & Salary Growth', 'Social Status & Respect', 'Higher Education Pathways', 'Migration vs Local Work', 'Workplace Safety & Health'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedConcernCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedConcernCategory === cat 
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs' 
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Concern Telemetry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredConcerns.map((c) => (
              <div key={c.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-card space-y-4 text-xs">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="font-extrabold text-slate-900 text-base block">{c.category}</span>
                    <span className="text-[11px] text-slate-500">
                      National Occurrence: <strong className="text-brand-600">{c.prevalence}% of families</strong>
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                    c.severity === 'Critical' 
                      ? 'bg-rose-50 text-rose-700 border-rose-200' 
                      : c.severity === 'High' 
                      ? 'bg-amber-50 text-amber-800 border-amber-200' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {c.severity} Priority
                  </span>
                </div>

                {/* Common Raw Vernacular Parent Queries */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Typical Vernacular Parent Expressions Detected:
                  </span>
                  <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                    {c.samplePhrases.map((phrase, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-slate-700 italic">
                        <span className="text-brand-500 font-bold">"</span>
                        <span>{phrase}</span>
                        <span className="text-brand-500 font-bold">"</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Automated AI Evidence Mechanism */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Automated Verification Resolution Protocol:
                  </span>
                  <p className="font-medium text-slate-800 bg-brand-50/50 p-2.5 rounded-xl border border-brand-100">
                    {c.aiResolutionModel}
                  </p>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-semibold">Evidence Resolution Rate</span>
                    <span className="text-base font-extrabold text-emerald-600">{c.resolutionRate}%</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-semibold">Avg Time to Resolve</span>
                    <span className="text-base font-extrabold text-slate-800">{c.avgResolutionTime}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* LIVE HUMAN COUNSELLOR ESCALATION DISPATCH QUEUE */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Live Human Counsellor Escalation Dispatch Queue
                </h3>
                <p className="text-xs text-slate-500">
                  Parent queries flagged as requiring certified state career counsellor tele-consultation
                </p>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {pendingEscalations.filter(e => !resolvedEscalations.includes(e.id)).length} Cases Pending
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Family Profile</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Trade</th>
                    <th className="py-3 px-4">Parent's Specific Unresolved Doubt</th>
                    <th className="py-3 px-4">Urgency</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingEscalations.map((esc) => {
                    const isDone = resolvedEscalations.includes(esc.id);
                    return (
                      <tr key={esc.id} className={`hover:bg-slate-50/80 transition-colors ${isDone ? 'opacity-50 bg-slate-50' : ''}`}>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {esc.student}
                          <span className="block text-[11px] font-normal text-slate-500">{esc.parent}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {esc.state}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-brand-700">
                          {esc.trade}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 max-w-xs">
                          {esc.query}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            esc.urgency === 'Urgent' 
                              ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {esc.urgency}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {isDone ? (
                            <span className="text-emerald-600 font-bold flex items-center justify-end gap-1">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Dispatched</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleResolveEscalation(esc.id)}
                              className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-2xs cursor-pointer active:scale-95"
                            >
                              Dispatch to RDSDE
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 3: TRADE DEMAND INTELLIGENCE */}
      {/* ======================================================== */}
      {activeAdminTab === 'trades' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header & Controls */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                National Skill Registry Intelligence
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-2">
                Vocational Trade Demand & Absorption Analytics
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Cross-referenced with NCS active job postings and DGT audited apprentice placement figures.
              </p>
            </div>

            {/* Sector Filter & Sort */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <span>Sector:</span>
                <select
                  value={selectedSectorFilter}
                  onChange={(e) => setSelectedSectorFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-300 font-bold bg-slate-50 text-slate-800 text-xs"
                >
                  <option value="All">All Sectors</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Renewable">Solar & Clean Energy</option>
                  <option value="Automotive">Automotive & EV</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Digital">IT & Digital</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <span>Sort by:</span>
                <select
                  value={tradeSortBy}
                  onChange={(e) => setTradeSortBy(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-300 font-bold bg-slate-50 text-slate-800 text-xs"
                >
                  <option value="openings">Active Vacancies</option>
                  <option value="placement">Placement Rate</option>
                  <option value="growth">Projected Hiring Growth</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trade Intelligence Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Trade Name & NSQF</th>
                    <th className="py-3 px-4">Verified Openings</th>
                    <th className="py-3 px-4">Placement Rate</th>
                    <th className="py-3 px-4">Starting Range</th>
                    <th className="py-3 px-4">5-Yr Mid Career</th>
                    <th className="py-3 px-4">Hiring Growth</th>
                    <th className="py-3 px-4">Key Corporate Recruiters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTrades.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {t.name}
                        <span className="block text-[11px] font-normal text-slate-500">{t.category} • NSQF Level {t.nsqfLevel}</span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-600">
                        {t.activeOpeningsCount.toLocaleString('en-IN')}+
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-slate-900">{t.placementRatePercentage}%</span>
                        <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${t.placementRatePercentage}%` }} />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        ₹{t.monthlyStartingSalary[0].toLocaleString('en-IN')} - ₹{t.monthlyStartingSalary[1].toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-brand-700">
                        ₹{t.monthlyMidCareerSalary[0].toLocaleString('en-IN')} - ₹{t.monthlyMidCareerSalary[1].toLocaleString('en-IN')}+
                      </td>
                      <td className="py-3.5 px-4 font-bold text-purple-700">
                        +{t.projectedAnnualHiringGrowth}%
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-[11px] max-w-xs truncate">
                        {t.topEmployers.slice(0, 3).join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 4: REGIONAL ANALYSIS (STATES) (Requested by User) */}
      {/* ======================================================== */}
      {activeAdminTab === 'regional' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header & State Selector */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                Geographic Skill Distribution
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-2">
                State & District Level Vocational Engagement
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitoring ITI infrastructure, local industrial absorption, and dominant regional parental doubts.
              </p>
            </div>

            {/* State Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Select State:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 font-bold bg-slate-50 text-slate-800 text-xs"
              >
                <option value="All India">All States (Comparative)</option>
                {regionalData.map(r => (
                  <option key={r.state} value={r.state}>{r.state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Regional Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRegionalData.map((reg) => (
              <div key={reg.state} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-card space-y-4 text-xs">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-600" />
                    <span className="font-extrabold text-slate-900 text-base">{reg.state}</span>
                  </div>
                  <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
                    {reg.familySessions.toLocaleString('en-IN')} Consultations
                  </span>
                </div>

                {/* ITI Infrastructure Metrics */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 block font-semibold">Govt ITIs</span>
                    <span className="font-extrabold text-slate-900 text-sm">{reg.govtItis}</span>
                  </div>
                  <div className="text-center border-x border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold">Private ITIs</span>
                    <span className="font-extrabold text-slate-900 text-sm">{reg.pvtItis}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 block font-semibold">Capacity</span>
                    <span className="font-extrabold text-brand-700 text-sm">{Math.round(reg.annualCapacity / 1000)}k</span>
                  </div>
                </div>

                {/* Dominant Parental Hesitation */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Dominant Regional Parental Anxiety:
                  </span>
                  <p className="font-bold text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    {reg.primaryDoubt}
                  </p>
                </div>

                {/* Local vs Migration & DST */}
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div className="p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Home District Preference</span>
                    <span className="font-extrabold text-slate-900 text-sm">{reg.localRetentionRate}</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Dual System (DST) Rate</span>
                    <span className="font-extrabold text-emerald-700 text-sm">{reg.dstAdoption}</span>
                  </div>
                </div>

                {/* Top Industrial Employers */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Key Regional Apprentice Recruiters:
                  </span>
                  <p className="text-slate-700 text-[11px] font-medium truncate">
                    {reg.topEmployers.join(', ')}
                  </p>
                </div>

                {/* Response SLA */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>RDSDE Counsellor SLA:</span>
                  <span className="font-bold text-emerald-600">{reg.avgEscalationResponseTime}</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SECTION 5: DATA SOURCES & AUDITS (Requested by User) */}
      {/* ======================================================== */}
      {activeAdminTab === 'sources' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Transparency & Zero-Hallucination Compliance
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-2">
                Authoritative Data Connectors & Cryptographic Audits
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every salary, vacancy number, and higher education rule is verified against official government datasets.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                100% Zero-Hallucination Verified
              </span>
            </div>
          </div>

          {/* Sources List */}
          <div className="space-y-4">
            {Object.values(DATA_SOURCES).map((src: any) => (
              <div key={src.id} className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-card space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base block">{src.agencyName}</span>
                      <span className="text-[11px] text-slate-500">{src.portalOrReport}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                      {src.verificationStatus}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Sync: <strong>{src.lastUpdated}</strong>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block text-[11px] mb-0.5">Underlying Dataset:</strong>
                    <span>{src.datasetName} ({src.dataPeriod})</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block text-[11px] mb-0.5">Geographic Coverage:</strong>
                    <span>{src.geoCoverage}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-slate-600 leading-relaxed text-[11px]">
                  <strong className="text-slate-900 block mb-0.5">Audit Methodology & Accuracy Safeguard:</strong>
                  {src.methodology}
                </div>

                <div className="flex justify-between items-center pt-2 text-[11px] text-slate-400">
                  <span>Connector Protocol: REST JSON over TLS 1.3 • Hash SHA-256 Verified</span>
                  {src.url && (
                    <a 
                      href={src.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Visit Authoritative Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
