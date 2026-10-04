import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Building2, 
  Briefcase, 
  Layers, 
  PhoneCall, 
  RefreshCw,
  Download,
  Car,
  Settings,
  HeartPulse,
  Compass,
  Laptop
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ASSESSMENT_QUESTIONS } from '../data/assessmentQuestions';
import { MOCK_TRADES, DATA_SOURCES } from '../data/mockData';
import { Trade, AssessmentMatchResult } from '../types';
import { VoiceButton } from '../components/common/VoiceButton';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { BackButton } from '../components/common/BackButton';

interface Props {
  setActivePage: (page: string) => void;
}

export const FamilyAssessmentWizard: React.FC<Props> = ({ setActivePage }) => {
  const { setSelectedTrade, profile, setProfile, setActiveEscalationModal, goBack } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({
    sq1_practical_passion: 'opt_electrical',
    sq2_learning_format: 'opt_learn_70_30',
    sq3_work_location: 'opt_loc_home',
    pq1_income_expectation: 'opt_inc_immediate',
    pq2_security_priority: 'opt_sec_govt_quota',
    pq3_dignity_safety: 'opt_env_clean_hightech'
  });

  // Calculation & Results State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStepLabel, setAnalysisStepLabel] = useState('Parsing technical aptitudes...');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentMatchResult | null>(null);

  const currentQ = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const isStudentQ = currentQ.target === 'student';
  const totalQuestions = ASSESSMENT_QUESTIONS.length;

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Begin Intelligent Calculation Transition (Requested: "after some time show proper users result")
      startAnalysisProcess();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const startAnalysisProcess = () => {
    setIsAnalyzing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAnalysisProgress(15);
    setAnalysisStepLabel('Parsing student hands-on technical aptitudes...');

    setTimeout(() => {
      setAnalysisProgress(40);
      setAnalysisStepLabel('Mapping against DGT & NSQF skill qualifications...');
    }, 600);

    setTimeout(() => {
      setAnalysisProgress(70);
      setAnalysisStepLabel(`Synthesizing real-time job openings in ${profile.location.district}...`);
    }, 1200);

    setTimeout(() => {
      setAnalysisProgress(90);
      setAnalysisStepLabel('Calculating family alignment and parental peace of mind score...');
    }, 1800);

    setTimeout(() => {
      setAnalysisProgress(100);
      computeFinalResult();
      setIsAnalyzing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2400);
  };

  const computeFinalResult = () => {
    // Determine trade match based on answers
    const passionOpt = selectedAnswers['sq1_practical_passion'];
    let matchedTrade = MOCK_TRADES[0]; // Default Electrical Technician

    if (passionOpt === 'opt_automotive') {
      matchedTrade = MOCK_TRADES.find(t => t.id === 'automobile-ev-technician') || MOCK_TRADES[0];
    } else if (passionOpt === 'opt_cnc_manufacturing') {
      matchedTrade = MOCK_TRADES.find(t => t.id === 'precision-cnc-operator') || MOCK_TRADES[0];
    } else if (passionOpt === 'opt_healthcare') {
      matchedTrade = MOCK_TRADES.find(t => t.id === 'general-duty-assistant-healthcare') || MOCK_TRADES[0];
    } else if (passionOpt === 'opt_drone_agri') {
      matchedTrade = MOCK_TRADES.find(t => t.id === 'smart-agriculture-drone-technician') || MOCK_TRADES[0];
    } else if (passionOpt === 'opt_it_digital') {
      matchedTrade = MOCK_TRADES.find(t => t.id === 'it-support-network-associate') || MOCK_TRADES[0];
    } else {
      matchedTrade = MOCK_TRADES[0]; // Electrical Technician
    }

    setSelectedTrade(matchedTrade);

    // Update family profile alignment after assessment
    setProfile(prev => ({
      ...prev,
      alignmentAfter: {
        learnerConfidence: 94,
        parentConfidence: 89
      }
    }));

    setAssessmentResult({
      trade: matchedTrade,
      matchScore: 96,
      matchReason: `High practical alignment with ${matchedTrade.name} and preference for structured 70% practical workshop learning.`,
      parentConsensusScore: 92,
      parentConsensusReason: `Guarantees NAPS monthly stipend, formal corporate EPFO registration, and Railway / PSU recruitment quotas.`,
      startingPayRange: `₹${matchedTrade.monthlyStartingSalary[0].toLocaleString('en-IN')} - ₹${matchedTrade.monthlyStartingSalary[1].toLocaleString('en-IN')} / mo`,
      placementRate: matchedTrade.placementRatePercentage,
      openingsCount: matchedTrade.activeOpeningsCount,
      careerMilestones: [
        'Foundation (Class 10/12)',
        'ITI CTS 2-Year Certification (NCVT)',
        'Formal NAPS Industrial Apprenticeship (Paid Stipend)',
        'Senior Plant Technician (₹25k - ₹35k/mo)',
        'Supervisor License / Lateral Entry into 2nd-Year Polytechnic Diploma (₹50k+/mo)'
      ]
    });
  };

  const getOptionIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Car': return <Car className="w-5 h-5 text-indigo-500" />;
      case 'Settings': return <Settings className="w-5 h-5 text-slate-600" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-500" />;
      case 'Compass': return <Compass className="w-5 h-5 text-emerald-500" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-blue-500" />;
      default: return <Sparkles className="w-5 h-5 text-brand-500" />;
    }
  };

  return (
    <div className={`max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 ${!isAnalyzing && !assessmentResult ? 'py-2 sm:py-4 space-y-2 sm:space-y-3' : 'py-8 space-y-8'}`}>
      
      {/* State A: LOADING / INTELLIGENCE CALCULATION SCREEN */}
      {isAnalyzing && (
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200 shadow-xl text-center space-y-6 animate-fadeIn my-12">
          <div className="w-20 h-20 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-inner ring-8 ring-brand-100/50">
            <RefreshCw className="w-10 h-10 animate-spin text-brand-600" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Intelligence Engine Running
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 font-display">
              Synthesizing Family Career Blueprint...
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto font-medium">
              {analysisStepLabel}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto space-y-2">
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="bg-gradient-to-r from-brand-600 via-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-semibold px-1">
              <span>Student & Parent Inputs</span>
              <span>{analysisProgress}% Complete</span>
              <span>Verified Market Data</span>
            </div>
          </div>
        </div>
      )}

      {/* State B: RESULT DASHBOARD (Requested: "after some time show proper users result then show all the stuffs show market real timedashboard prediction etc") */}
      {!isAnalyzing && assessmentResult && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Navigation Bar on Results Screen */}
          <div className="flex items-center justify-between gap-3">
            <BackButton 
              label="Back to Questions" 
              onClick={() => {
                setAssessmentResult(null);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }} 
            />
            <button
              type="button"
              onClick={() => setActivePage('home')}
              className="text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Back to Home</span>
            </button>
          </div>

          {/* Top Congratulatory Banner */}
          <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
                    Top Career Recommendation Match
                  </span>
                  <span className="text-xs text-brand-200">• Consensus Achieved</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
                  {assessmentResult.trade.name}
                </h1>
                <p className="text-sm text-brand-100 font-medium">
                  {assessmentResult.trade.nameHindi} • NSQF Level {assessmentResult.trade.nsqfLevel}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center shrink-0">
                <span className="text-xs text-brand-200 block font-semibold">Overall Match Score</span>
                <span className="text-4xl font-black text-amber-300 block my-0.5">
                  {assessmentResult.matchScore}%
                </span>
                <span className="text-[10px] text-emerald-300 font-bold block">
                  Family Harmony: {assessmentResult.parentConsensusScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Dual Harmony Breakdown: Student Reason vs Parent Reason */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-brand-700 font-bold text-sm">
                <GraduationCap className="w-5 h-5 text-brand-600" />
                <span>Why This Fits the Student ({profile.learner.name})</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-brand-50/50 p-4 rounded-2xl border border-brand-100">
                {assessmentResult.matchReason} Practical workshop immersion aligns with natural spatial and tool problem-solving tendencies.
              </p>
              <div className="text-xs text-slate-500 space-y-1 pt-1">
                <span>✓ High engagement with diagnostic circuits and equipment</span>
                <br />
                <span>✓ Direct eligibility for lateral degree engineering progression</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <HeartHandshake className="w-5 h-5 text-amber-600" />
                <span>Why This Resolves Parent Doubts ({profile.parent.relationship})</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                {assessmentResult.parentConsensusReason} Satisfies starting household income thresholds while preserving government job eligibility.
              </p>
              <div className="text-xs text-slate-500 space-y-1 pt-1">
                <span>✓ Formal EPFO provident fund & corporate ESIC safety</span>
                <br />
                <span>✓ 100% eligible for Indian Railways (RRB) technician vacancies</span>
              </div>
            </div>
          </div>

          {/* REAL-TIME MARKET DEMAND DASHBOARD (Requested: "show all the stuffs show market rea timedashboard prediction etc") */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Real-Time Market Demand Dashboard
                </span>
                <h3 className="text-xl font-bold font-display mt-0.5">
                  Live Market Signals for {assessmentResult.trade.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs text-slate-400">Live Feed from NCS & DGT</span>
              </div>
            </div>

            {/* 4 Market Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
                <span className="text-slate-400 block text-[11px]">Active Vacancies</span>
                <span className="text-2xl font-extrabold text-emerald-400 block mt-1">
                  {assessmentResult.openingsCount.toLocaleString('en-IN')}+
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">Verified PAN-India</span>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
                <span className="text-slate-400 block text-[11px]">Annual Hiring Growth</span>
                <span className="text-2xl font-extrabold text-amber-300 block mt-1">
                  +{assessmentResult.trade.projectedAnnualHiringGrowth}%
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">Infrastructure expansion</span>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
                <span className="text-slate-400 block text-[11px]">Starting Wage Band</span>
                <span className="text-lg font-bold text-white block mt-1">
                  {assessmentResult.startingPayRange}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">EPFO verified entry pay</span>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
                <span className="text-slate-400 block text-[11px]">Placement Rate</span>
                <span className="text-2xl font-extrabold text-brand-400 block mt-1">
                  {assessmentResult.placementRate}%
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">Within 6 mos of ITI</span>
              </div>
            </div>

            {/* Active Hiring Employers */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Top Industrial Employers Currently Recruiting:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {assessmentResult.trade.topEmployers.map((emp, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-xl border border-slate-700 font-semibold">
                    {emp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 5-YEAR CAREER PATHWAY PREDICTION */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  5-Year Career Pathway Prediction & Milestones
                </h3>
                <p className="text-xs text-slate-500">
                  Clear step-by-step roadmap from baseline qualification to supervisory earning
                </p>
              </div>
              <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                NSQF Progression
              </span>
            </div>

            <div className="space-y-3">
              {assessmentResult.careerMilestones.map((milestone, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-slate-900 block text-sm">{milestone}</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="bg-gradient-to-r from-brand-50 to-indigo-50 p-6 rounded-3xl border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Ready to take the next step together?</h4>
              <p className="text-xs text-slate-600">Discuss with our AI or connect directly with a certified government counsellor.</p>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                onClick={() => setActivePage('counselling')}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <span>Enter AI Counselling</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveEscalationModal(true)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Talk to Counsellor</span>
              </button>

              <button
                onClick={() => setActivePage('summary')}
                className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold"
              >
                Full Family Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* State C: INTERACTIVE QUESTIONNAIRE (Step by step: Student Qs then Parent Qs) */}
      {!isAnalyzing && !assessmentResult && (
        <div className="space-y-3 sm:space-y-3.5">
          {/* Top Quick Back Row */}
          <div className="flex items-center justify-between gap-3">
            <BackButton label="Back" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
              Family Vocational Match Wizard
            </span>
          </div>

          {/* Progress Header */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-slate-200 shadow-2xs flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${isStudentQ ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'}`}>
                {isStudentQ ? <GraduationCap className="w-4 h-4" /> : <HeartHandshake className="w-4 h-4" />}
              </div>
              <span className="font-bold text-slate-800 text-xs sm:text-sm">
                {isStudentQ ? 'Section 1: Student Aptitude & Interests' : 'Section 2: Parent Priorities & Security'}
              </span>
            </div>

            <span className="font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200 text-xs">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>

          {/* Active Question Card (Fits comfortably in viewport) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-card space-y-3">
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isStudentQ ? 'bg-indigo-50 text-indigo-800 border border-indigo-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {currentQ.categoryTitle}
                </span>

                <VoiceButton 
                  textToRead={`${currentQ.question}. ${currentQ.questionHindi}`}
                  label="Listen"
                  size="sm"
                />
              </div>

              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-display leading-snug">
                {currentQ.question}
              </h2>
              <p className="text-xs text-brand-700 font-medium italic">
                {currentQ.questionHindi}
              </p>
            </div>

            {/* Options List (2-column grid fits in one screen!) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5 pt-0.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-2.5 select-none ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-1 ring-brand-200'
                        : 'border-slate-200 hover:border-brand-200 hover:bg-slate-50/60 bg-white'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {opt.iconName ? getOptionIcon(opt.iconName) : (
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5 text-xs flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm truncate">{opt.label}</span>
                        {isSelected && (
                          <span className="text-[9px] bg-brand-600 text-white font-bold px-1.5 py-0.2 rounded-full shrink-0">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-brand-800 font-medium italic text-[11px] truncate">{opt.labelHindi}</p>
                      {opt.description && (
                        <p className="text-slate-500 leading-snug pt-0.5 text-[11px] line-clamp-2">{opt.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stepper Buttons (always visible on screen) */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {currentQuestionIndex > 0 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-600" />
                  <span>Previous</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goBack}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-600" />
                  <span>Back to Home</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-700 hover:from-brand-700 hover:to-indigo-800 text-white font-bold text-xs shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>{currentQuestionIndex === totalQuestions - 1 ? 'Analyze & Show Live Career Dashboard' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
