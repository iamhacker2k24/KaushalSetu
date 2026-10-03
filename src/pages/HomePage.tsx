import React from 'react';
import { 
  Compass, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  PhoneCall, 
  MapPin, 
  Clock, 
  HelpCircle,
  Zap,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_TRADES, MOCK_SUCCESS_STORIES, CONCERN_CATEGORIES, DATA_SOURCES } from '../data/mockData';
import { VoiceButton } from '../components/common/VoiceButton';
import { DataSourceBadge } from '../components/common/DataSourceBadge';

interface Props {
  setActivePage: (page: string) => void;
}

export const HomePage: React.FC<Props> = ({ setActivePage }) => {
  const { t, setSelectedTrade, setActiveEscalationModal } = useApp();

  const handleStartCounselling = () => {
    setActivePage('onboarding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreTrade = (trade: typeof MOCK_TRADES[0]) => {
    setSelectedTrade(trade);
    setActivePage('trades');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-brand-50/60 via-white to-[#F8FAFC]">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/40 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-bold tracking-wide">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>{t.trustIndicator}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                {t.heroHeadline}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.heroSubtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => {
                    setActivePage('assessment');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-black text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group ring-2 ring-amber-300"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Start Joint Family Assessment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleStartCounselling}
                  className="w-full sm:w-auto px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>{t.startCounselling}</span>
                </button>

                <button
                  onClick={() => setActivePage('trades')}
                  className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-brand-600" />
                  <span>{t.exploreCareers}</span>
                </button>
              </div>

              {/* Accessibility Voice Button */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-500">
                <VoiceButton 
                  textToRead="कौशलसेतु: भारत के छात्रों और अभिभावकों के लिए प्रामाणिक व्यावसायिक करियर परामर्श मंच। सरकारी डेटा और मानवीय सहायता के साथ मिलकर निर्णय लें।" 
                  label="Listen to explanation (Audio)"
                />
                <span>• Supports Hindi, Bengali & English</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Illustration & UI Cards */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 space-y-4">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Family Career Consultation</h4>
                      <p className="text-[11px] text-slate-500">Student + Parent Live Decision Sync</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                    Live Session
                  </span>
                </div>

                {/* Simulated Conversation Peek */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2.5 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md text-[10px] shrink-0 mt-0.5">
                      Parent
                    </span>
                    <p className="text-slate-700 italic">
                      "ITI ke baad mere bete ko achhi job milegi? Starting salary aur growth kya hai?"
                    </p>
                  </div>
                  <div className="flex items-start gap-2 pl-4 border-l-2 border-brand-500">
                    <span className="bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded-md text-[10px] shrink-0 mt-0.5">
                      KaushalSetu AI
                    </span>
                    <p className="text-slate-800 font-medium">
                      "Here is the verified data for Electrical Technician in your district:"
                    </p>
                  </div>
                </div>

                {/* Live Evidence Preview Card */}
                <div className="bg-gradient-to-br from-brand-900 to-indigo-950 text-white rounded-2xl p-4 shadow-md space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                      Verified Trade Insight
                    </span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-brand-200">
                      NSQF Level 4
                    </span>
                  </div>

                  <h5 className="text-base font-bold text-white">Electrical Technician</h5>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-xs">
                      <span className="text-[10px] text-brand-200 block">Active Openings</span>
                      <span className="font-extrabold text-sm text-emerald-400">14,250+</span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-xs">
                      <span className="text-[10px] text-brand-200 block">Placement Rate</span>
                      <span className="font-extrabold text-sm text-amber-300">81% Placed</span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-xs">
                      <span className="text-[10px] text-brand-200 block">Entry Salary</span>
                      <span className="font-extrabold text-sm text-white">₹14k - ₹22k</span>
                    </div>
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-xs">
                      <span className="text-[10px] text-brand-200 block">Mid-Career</span>
                      <span className="font-extrabold text-sm text-white">₹35k - ₹58k+</span>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] text-brand-200 border-t border-white/10">
                    <span>Source: DGT & NCS Gov Portals</span>
                    <span className="text-emerald-400 font-semibold">● Updated 2h ago</span>
                  </div>
                </div>

                {/* Pathway Progression Badge */}
                <div className="flex items-center justify-between p-2.5 bg-brand-50 rounded-xl border border-brand-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span className="font-semibold text-slate-800">Clear 5-Year Career Pathway</span>
                  </div>
                  <span className="text-brand-700 font-bold">Class 10 → ITI → NAPS → Supervisor</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FOUR CORE PILLAR CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card hover:shadow-soft-lg transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">REAL CAREER DATA</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verified information about trades, NSQF levels, training duration, and actual placement outcomes directly from DGT and NSDC.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card hover:shadow-soft-lg transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">LOCAL OPPORTUNITIES</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discover training institutes, government ITIs, and corporate apprenticeship contracts within your home district and state.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card hover:shadow-soft-lg transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">AI + HUMAN SUPPORT</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant evidence-backed answers from AI, with seamless escalation to certified government vocational psychologists when needed.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card hover:shadow-soft-lg transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">FOR FAMILIES</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Make career decisions together. Address parental worries about job permanence, safety, and social respect with empirical evidence.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW KAUSHALSETU WORKS (SECTION 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Joint Decision Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            How KaushalSetu Empowers Families
          </h2>
          <p className="text-sm text-slate-600">
            A step-by-step pathway from confusion to a confident, agreed-upon career roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card relative">
            <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center mb-4">
              1
            </span>
            <h4 className="text-base font-bold text-slate-900 mb-2">Build Family Profile</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Learner shares interests and education. Parents share expectations on income, stability, and preferred location.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card relative">
            <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center mb-4">
              2
            </span>
            <h4 className="text-base font-bold text-slate-900 mb-2">Detect Concerns & Evidence</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our intelligence engine classifies family worries (salary, safety, status) and pulls verified government datasets.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card relative">
            <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center mb-4">
              3
            </span>
            <h4 className="text-base font-bold text-slate-900 mb-2">Simulate Career Pathways</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Visualize step-by-step milestones from Class 10/12 to ITI, Apprenticeship, Senior Technician, and Lateral Diploma.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card relative">
            <span className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center mb-4">
              4
            </span>
            <h4 className="text-base font-bold text-slate-900 mb-2">Align & Escalate</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track confidence alignment. If doubts remain, connect directly with a certified state vocational counsellor.
            </p>
          </div>
        </div>
      </section>

      {/* 4. POPULAR CAREER PATHS (SECTION 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              High Demand Trades
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
              Popular Vocational Career Paths
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Curated trades offering stable employment, apprenticeship stipends, and supervisory progression.
            </p>
          </div>

          <button
            onClick={() => setActivePage('trades')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-800 underline self-start sm:self-auto"
          >
            <span>View All 10 Vocational Sectors</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TRADES.slice(0, 3).map((trade) => (
            <div 
              key={trade.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                    {trade.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {trade.placementRatePercentage}% Placed
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{trade.name}</h3>
                <p className="text-xs text-slate-500 italic">{trade.nameHindi}</p>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {trade.description}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Typical Starting Pay:</span>
                    <span className="font-bold text-slate-800">₹{trade.monthlyStartingSalary[0].toLocaleString('en-IN')} - ₹{trade.monthlyStartingSalary[1].toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mid-Career Potential:</span>
                    <span className="font-bold text-brand-700">₹{trade.monthlyMidCareerSalary[0].toLocaleString('en-IN')} - ₹{trade.monthlyMidCareerSalary[1].toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Active Openings:</span>
                    <span className="font-bold text-emerald-600">{trade.activeOpeningsCount.toLocaleString('en-IN')}+ verified</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                <DataSourceBadge source={trade.sources[0]} showDetailsButton={false} />
                <button
                  onClick={() => handleExploreTrade(trade)}
                  className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CURRENT JOB MARKET SNAPSHOT (SECTION 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                Live Market Signals
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
                Current Technical & Vocational Job Market
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Aggregated from the National Career Service (NCS), NAPS registered contracts, and EPFO corporate payroll additions.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActivePage('market')}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs shadow-md inline-flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4 text-brand-600" />
                  <span>Open Market Intelligence Explorer</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-brand-200 block">Total Active Vacancies</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">
                  1,48,200+
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
                  ↑ +22.4% YoY Growth
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-brand-200 block">Active NAPS Apprenticeships</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1 block">
                  42,850+
                </span>
                <span className="text-[11px] text-amber-200 block mt-1">
                  Monthly stipend: ₹8.5k - ₹13.5k
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-brand-200 block">Average Vocational Placement</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 block">
                  82.4%
                </span>
                <span className="text-[11px] text-brand-200 block mt-1">
                  Within 6 months of trade completion
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-brand-200 block">Government & PSU Openings</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">
                  28,500+
                </span>
                <span className="text-[11px] text-brand-200 block mt-1">
                  Railways, DISCOMs, Defense, Metro
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARENT CONCERNS ENGINE (SECTION 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Parent Concern Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Direct Answers to Real Parental Fears
          </h2>
          <p className="text-sm text-slate-600">
            We don't dismiss parent anxieties. We address them with cold, hard empirical data and government regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONCERN_CATEGORIES.slice(0, 6).map((c, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card hover:border-brand-300 transition-all space-y-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5 text-brand-600" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{c.category}</h4>
              </div>

              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 text-xs italic text-amber-900">
                "{c.typicalParentQuote}"
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {c.shortDesc}
              </p>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Evidence Provided:
                </span>
                <ul className="text-[11px] text-slate-600 space-y-1">
                  {c.primaryEvidenceTypes.map((ev, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CAREER SUCCESS STORIES (SECTION 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Real Family Journeys
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Stories of Indian Families Who Decided Together
          </h2>
          <p className="text-sm text-slate-600">
            Real transformations of students and parents from rural and semi-urban India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_SUCCESS_STORIES.map((story, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{story.studentName}</h4>
                    <p className="text-xs text-slate-500">Child of {story.parentName}</p>
                  </div>
                  <span className="text-[10px] bg-brand-50 text-brand-700 font-bold px-2 py-0.5 rounded-full border border-brand-200">
                    {story.location.split(',')[0]}
                  </span>
                </div>

                <div className="text-xs font-bold text-brand-700 bg-brand-50/70 p-2 rounded-lg border border-brand-100">
                  {story.trade}
                </div>

                <p className="text-xs text-slate-700 italic leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {story.quote}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Starting Salary</span>
                    <span className="font-bold text-slate-800">{story.startingSalary}</span>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-emerald-700 block">Current Salary</span>
                    <span className="font-extrabold text-emerald-800">{story.currentSalary}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500">
                <span>Employer: <strong>{story.employer}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. HOW AI + HUMAN COUNSELLING WORKS (SECTION 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-card">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Responsible AI Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Why KaushalSetu is NOT a Generic Chatbot
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              The LLM is NOT the source of truth. We strictly decouple knowledge retrieval from language explanation to eliminate hallucinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-900">1. User Query</span>
              <p className="text-[11px] text-slate-500 mt-1">Parent or student asks a question</p>
            </div>
            <div className="p-4 bg-brand-50 rounded-2xl border border-brand-200 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-brand-900">2. Intent & Concern</span>
              <p className="text-[11px] text-brand-700 mt-1">Classifies into 10 parent concern buckets</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-emerald-900">3. Verified Data Retrieval</span>
              <p className="text-[11px] text-emerald-700 mt-1">Pulls DGT, NCS, and NAPS datasets</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-indigo-900">4. Grounded Explanation</span>
              <p className="text-[11px] text-indigo-700 mt-1">Explains with audit badges & timestamps</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-amber-900">5. Human Escalation</span>
              <p className="text-[11px] text-amber-700 mt-1">Escalates automatically if data is lacking</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Frequently Asked Questions by Families
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Clear clarity on certificates, fees, and career safety.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-600" />
              <span>Is vocational ITI training recognized by the Government of India?</span>
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Yes, absolutely. ITI courses affiliated with the National Council for Vocational Training (NCVT) and Directorate General of Training (DGT) issue the National Trade Certificate (NTC), which is recognized for all Central and State government recruitment including Indian Railways and Defense.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-600" />
              <span>Can my child study for an engineering degree later?</span>
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Yes! Under AICTE and DGT rules, an ITI pass student can take direct Lateral Entry into the 2nd Year of a 3-Year Polytechnic Diploma, skipping the 1st year. After completing the diploma, they are eligible for lateral entry into B.Tech engineering degrees.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-600" />
              <span>What is the training fee in a Government ITI?</span>
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Tuition fees in Government ITIs are highly subsidized, usually between ₹1,000 and ₹2,500 per year. Many states offer 100% fee waivers for girls and SC/ST/OBC students. In addition, apprentices in NAPS receive monthly stipends ranging from ₹8,500 to ₹13,500.
            </p>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-800 text-white rounded-3xl p-8 lg:p-12 shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto text-amber-300">
            <Users className="w-8 h-8" />
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Begin Your Family Career Journey Today
            </h3>
            <p className="text-xs sm:text-sm text-brand-100">
              No pressure. No fake promises. Just verified data, clear pathways, and caring human support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartCounselling}
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all"
            >
              Start Free Family Counselling
            </button>

            <button
              onClick={() => setActiveEscalationModal(true)}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Connect with a Human Counsellor</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
