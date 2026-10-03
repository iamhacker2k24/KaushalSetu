import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Users, 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  TrendingUp, 
  Building2, 
  GraduationCap, 
  Award, 
  AlertCircle, 
  Sparkles,
  ExternalLink,
  Volume2,
  RefreshCw,
  Clock,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConcernBadge } from '../components/common/ConcernBadge';
import { VoiceButton } from '../components/common/VoiceButton';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { MOCK_TRADES, DATA_SOURCES } from '../data/mockData';

interface Props {
  setActivePage: (page: string) => void;
}

export const AICounsellingPage: React.FC<Props> = ({ setActivePage }) => {
  const { 
    messages, 
    sendUserMessage, 
    profile, 
    selectedTrade, 
    setSelectedTrade, 
    setActiveSourceModal,
    setActiveEscalationModal,
    language 
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [activeSpeaker, setActiveSpeaker] = useState<'Parent' | 'Student' | 'Both'>('Parent');
  const [mobileActivePane, setMobileActivePane] = useState<'chat' | 'evidence' | 'profile'>('chat');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    sendUserMessage(inputQuery, activeSpeaker);
    setInputQuery('');
  };

  const handlePromptClick = (prompt: string) => {
    sendUserMessage(prompt, activeSpeaker);
  };

  // Find latest evidence card from messages
  const latestMessageWithEvidence = [...messages].reverse().find(m => m.evidenceCard);
  const currentEvidence = latestMessageWithEvidence?.evidenceCard || {
    id: 'default-ev',
    title: `${selectedTrade.name} - Verified Baseline`,
    category: 'Job Security & Permanence' as any,
    statistic: `${selectedTrade.placementRatePercentage}% placement rate with ${selectedTrade.activeOpeningsCount.toLocaleString('en-IN')}+ active verified openings`,
    comparisonContext: `Projected annual hiring growth: +${selectedTrade.projectedAnnualHiringGrowth}%`,
    keyTakeaways: [
      'Formal corporate NAPS apprenticeships offer guaranteed monthly stipends.',
      'Mandatory licensed wireman / supervisor certifications required across industrial plants.',
      'Direct lateral admission bridge to 2nd year Polytechnic Engineering Diploma.'
    ],
    source: DATA_SOURCES.dgt_ncvt,
    applicableDistricts: [profile.location.district, 'All Districts']
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
      {/* Top Banner: Ecosystem Notice & Selected Trade Switcher */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Family Consultation: {profile.learner.name} & {profile.parent.relationship}
              </h2>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                Active Joint Session
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Location: {profile.location.district}, {profile.location.state} • Strict Zero-Hallucination Policy
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
            <span className="text-xs font-semibold text-slate-500 shrink-0">Trade:</span>
            <select
              value={selectedTrade.id}
              onChange={(e) => {
                const tr = MOCK_TRADES.find(t => t.id === e.target.value);
                if (tr) setSelectedTrade(tr);
              }}
              className="w-full sm:w-auto px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-slate-50 focus:border-brand-500 focus:bg-white truncate"
            >
              {MOCK_TRADES.map((tr) => (
                <option key={tr.id} value={tr.id}>
                  {tr.name} (NSQF {tr.nsqfLevel})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setActiveEscalationModal(true)}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs shrink-0"
            title="Connect with a verified human vocational counsellor"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
            <span>Counsellor</span>
          </button>
        </div>
      </div>

      {/* MOBILE PANE SWITCHER TABS (Visible only below lg breakpoint) */}
      <div className="lg:hidden flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs gap-1">
        <button
          onClick={() => setMobileActivePane('chat')}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            mobileActivePane === 'chat'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chat</span>
        </button>

        <button
          onClick={() => setMobileActivePane('evidence')}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            mobileActivePane === 'evidence'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Evidence ({currentEvidence.category.split(' ')[0]})</span>
        </button>

        <button
          onClick={() => setMobileActivePane('profile')}
          className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            mobileActivePane === 'profile'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Family</span>
        </button>
      </div>

      {/* 3-PANE LAYOUT: Left (Profile) | Center (Conversation) | Right (Evidence Used) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* PANE 1: LEFT SIDE - Family Profile Summary (3 Cols) */}
        <div className={`lg:col-span-3 space-y-4 ${mobileActivePane === 'profile' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Family Profile
              </span>
              <button
                onClick={() => setActivePage('onboarding')}
                className="text-xs font-bold text-brand-600 hover:text-brand-800 underline"
              >
                Edit
              </button>
            </div>

            {/* Learner Card */}
            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-900">Student: {profile.learner.name}</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-brand-700 font-bold">
                  {profile.learner.age} yrs
                </span>
              </div>
              <p className="text-slate-600"><strong>Education:</strong> {profile.learner.education}</p>
              <p className="text-slate-600"><strong>Goal:</strong> {profile.learner.careerGoal}</p>
              <p className="text-slate-500 italic">Interested in hands-on technical work</p>
            </div>

            {/* Parent Card */}
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900">Parent: {profile.parent.relationship}</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-amber-800 font-bold">
                  Priority
                </span>
              </div>
              <p className="text-slate-600"><strong>Min Expected Pay:</strong> ₹{profile.parent.expectedMinIncome.toLocaleString('en-IN')}/mo</p>
              <p className="text-slate-600"><strong>Higher Education:</strong> {profile.parent.furtherEducationDesire ? 'Required' : 'Flexible'}</p>
              
              <div className="pt-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                  Active Concerns:
                </span>
                <div className="flex flex-wrap gap-1">
                  {profile.parent.primaryConcerns.map((c, i) => (
                    <span key={i} className="text-[10px] font-medium bg-white px-2 py-0.5 rounded-md border border-amber-200 text-amber-900">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini Alignment Gap Meter */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">Understanding Gap</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Narrowing
                </span>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span>Student Clarity</span>
                  <span className="font-bold text-brand-700">82%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-brand-600 h-full w-[82%]"></div>
                </div>

                <div className="flex justify-between text-[11px] pt-1">
                  <span>Parent Clarity</span>
                  <span className="font-bold text-amber-700">68%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[68%]"></div>
                </div>
              </div>

              <button
                onClick={() => setActivePage('alignment')}
                className="w-full mt-2 py-1.5 text-center text-[11px] font-bold text-brand-700 hover:text-brand-900 bg-white border border-brand-200 rounded-lg"
              >
                View Full Alignment Report
              </button>
            </div>

          </div>
        </div>

        {/* PANE 2: CENTER - Conversational Counselling (6 Cols) */}
        <div className={`lg:col-span-6 space-y-4 ${mobileActivePane === 'chat' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card flex flex-col h-[520px] sm:h-[620px] lg:h-[700px] overflow-hidden">
            
            {/* Conversation Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold text-slate-800">
                  KaushalSetu Intelligence Guide
                </span>
                <span className="text-[10px] text-slate-400">• Evidence Grounded</span>
              </div>

              {/* Speaker Selector Toggle */}
              <div className="flex items-center bg-white border border-slate-200 p-0.5 rounded-xl text-xs font-semibold">
                <span className="text-[10px] text-slate-400 px-2">Speaking as:</span>
                <button
                  type="button"
                  onClick={() => setActiveSpeaker('Parent')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeSpeaker === 'Parent' ? 'bg-amber-500 text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Parent
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSpeaker('Student')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeSpeaker === 'Student' ? 'bg-brand-600 text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSpeaker('Both')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeSpeaker === 'Both' ? 'bg-purple-600 text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Together
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
              {messages.map((msg) => {
                const isAssistant = msg.sender === 'assistant';
                return (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                  >
                    {/* Speaker Header */}
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-600">{msg.speakerLabel || (isAssistant ? 'KaushalSetu AI' : 'Family')}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Detected Concern Banner */}
                    {msg.detectedConcern && (
                      <div className="mb-2">
                        <ConcernBadge category={msg.detectedConcern} />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div className={`p-4 rounded-2xl max-w-[90%] leading-relaxed ${
                      isAssistant 
                        ? 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-2xs' 
                        : msg.speakerLabel === 'Parent'
                        ? 'bg-amber-500 text-white rounded-tr-xs shadow-md'
                        : 'bg-brand-600 text-white rounded-tr-xs shadow-md'
                    }`}>
                      <p className="text-xs sm:text-sm">{msg.text}</p>
                    </div>

                    {/* Voice "Listen to this" for Assistant message */}
                    {isAssistant && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <VoiceButton 
                          textToRead={msg.text} 
                          label="Listen to explanation"
                          size="sm"
                        />
                      </div>
                    )}

                    {/* Suggested Follow-up Prompts */}
                    {isAssistant && msg.suggestedPrompts && (
                      <div className="mt-3 flex flex-wrap gap-1.5 max-w-[95%]">
                        {msg.suggestedPrompts.map((p, idx) => (
                          <button
                            key={idx}
                            onClick={() => handlePromptClick(p)}
                            className="px-2.5 py-1 bg-white hover:bg-brand-50 text-brand-700 hover:text-brand-900 border border-brand-200 rounded-full text-xs font-medium text-left transition-colors shadow-2xs"
                          >
                            + {p}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  activeSpeaker === 'Parent' 
                    ? "Ask a parent concern (e.g., ITI ke baad pakki naukri milegi? Salary kitni hogi?)"
                    : "Ask a student question (e.g., Which skills will I learn? Is lateral entry diploma available?)"
                }
                className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-xs sm:text-sm bg-slate-50 focus:bg-white"
              />

              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-2xl shadow-md transition-all shrink-0"
                aria-label="Send question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>

        {/* PANE 3: RIGHT SIDE - "Evidence Used" Live Intelligence Panel (3 Cols) */}
        <div className={`lg:col-span-3 space-y-4 ${mobileActivePane === 'evidence' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Live Evidence Panel
                </span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                Updated 2h ago
              </span>
            </div>

            {/* Active Evidence Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-4 shadow-md space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">
                  {currentEvidence.category}
                </span>
                <span className="text-[10px] text-slate-300">
                  {profile.location.district}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-snug">
                {currentEvidence.title}
              </h4>

              <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-xs">
                <span className="text-[10px] text-brand-200 block">Verified Finding:</span>
                <p className="text-xs font-bold text-emerald-300 mt-0.5">
                  {currentEvidence.statistic}
                </p>
                {currentEvidence.comparisonContext && (
                  <p className="text-[11px] text-slate-300 mt-1 italic">
                    {currentEvidence.comparisonContext}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-brand-200 block uppercase tracking-wider">
                  Key Verification Points:
                </span>
                <ul className="text-[11px] text-slate-200 space-y-1">
                  {currentEvidence.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-300 truncate max-w-[130px]">
                  {currentEvidence.source.agencyName}
                </span>
                <button
                  onClick={() => setActiveSourceModal(currentEvidence.source)}
                  className="text-amber-300 hover:text-white font-bold underline flex items-center gap-1"
                >
                  <span>Audit Source</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setActivePage('pathways')}
                className="w-full py-2.5 px-3 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold rounded-xl text-xs flex items-center justify-between transition-colors border border-brand-200"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Simulate 5-Year Pathway</span>
                </div>
                <span>→</span>
              </button>

              <button
                onClick={() => setActivePage('compare')}
                className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-between transition-colors border border-slate-200"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Compare with Other Trades</span>
                </div>
                <span>→</span>
              </button>

              <button
                onClick={() => setActiveEscalationModal(true)}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Talk to a Human Counsellor</span>
              </button>
            </div>

            {/* Legal / Data Quality Guarantee */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              <strong className="text-slate-700">Zero Invention Policy:</strong> KaushalSetu does not synthesize or predict unverified wages. All numbers correspond directly to official DGT, NAPS, and EPFO datasets.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
