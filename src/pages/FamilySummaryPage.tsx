import React, { useState } from 'react';
import { 
  Download, 
  Share2, 
  PhoneCall, 
  Compass, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Printer, 
  MapPin, 
  Award,
  Layers,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { DATA_SOURCES } from '../data/mockData';

interface Props {
  setActivePage: (page: string) => void;
}

export const FamilySummaryPage: React.FC<Props> = ({ setActivePage }) => {
  const { profile, selectedTrade, setActiveEscalationModal } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      window.print();
      setDownloadSuccess(false);
    }, 400);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `KaushalSetu Career Roadmap - ${profile.learner.name}`,
        text: `Check out our family vocational career roadmap for ${selectedTrade.name}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Career summary link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Family Career Blueprint
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Vocational Roadmap Summary
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Generated on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} • KaushalSetu ID: {profile.id}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share</span>
          </button>

          <button
            onClick={() => setActiveEscalationModal(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Talk to Counsellor</span>
          </button>
        </div>
      </div>

      {/* Main Printable Summary Document */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-8 print:p-0 print:border-none print:shadow-none">
        
        {/* Document Header */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold">
              <svg className="w-7 h-7" viewBox="0 0 48 48" fill="none">
                <path d="M8 36C14 26 22 22 28 22C34 22 40 26 44 36" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                <circle cx="28" cy="14" r="7" fill="#10B981" />
                <path d="M16 16C16 12 21 8 28 8C35 8 40 12 40 16" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 font-display">
                Kaushal<span className="text-brand-600">Setu</span>
              </span>
              <p className="text-xs text-slate-500">Official Family Vocational Guidance Summary</p>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-200 block mb-1">
              Verified Consensus
            </span>
            <span className="text-slate-400">Ref: DGT-NAPS-2024</span>
          </div>
        </div>

        {/* 1. What We Discussed & Participants */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            1. Consultation Participants & Baseline
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block text-sm">{profile.learner.name} (Learner)</span>
              <p className="text-slate-600"><strong>Academic Level:</strong> {profile.learner.education}</p>
              <p className="text-slate-600"><strong>Career Goal:</strong> {profile.learner.careerGoal}</p>
              <p className="text-slate-600"><strong>Location:</strong> {profile.location.district}, {profile.location.state}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block text-sm">{profile.parent.relationship} (Guardian)</span>
              <p className="text-slate-600"><strong>Expected Starting Pay:</strong> ₹{profile.parent.expectedMinIncome.toLocaleString('en-IN')}+ / month</p>
              <p className="text-slate-600"><strong>Job Security Priority:</strong> {profile.parent.jobSecurityPriority.toUpperCase()}</p>
              <p className="text-slate-600"><strong>Higher Education Bridge:</strong> {profile.parent.furtherEducationDesire ? 'Required' : 'Flexible'}</p>
            </div>
          </div>
        </div>

        {/* 2. Primary Selected Trade & Verified Evidence */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            2. Selected Career Pathway: {selectedTrade.name}
          </h3>
          <div className="bg-gradient-to-br from-brand-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  {selectedTrade.category} • NSQF Level {selectedTrade.nsqfLevel}
                </span>
                <h4 className="text-xl font-bold mt-1">{selectedTrade.name}</h4>
                <p className="text-xs text-brand-200 mt-0.5">{selectedTrade.nameHindi}</p>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-bold">
                {selectedTrade.placementRatePercentage}% Audited Placement
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                <span className="text-[10px] text-brand-200 block">Starting Wage</span>
                <span className="font-bold text-white text-sm">
                  ₹{selectedTrade.monthlyStartingSalary[0].toLocaleString('en-IN')} - ₹{selectedTrade.monthlyStartingSalary[1].toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                <span className="text-[10px] text-brand-200 block">Mid-Career (5 Yrs)</span>
                <span className="font-bold text-amber-300 text-sm">
                  ₹{selectedTrade.monthlyMidCareerSalary[0].toLocaleString('en-IN')} - ₹{selectedTrade.monthlyMidCareerSalary[1].toLocaleString('en-IN')}+
                </span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                <span className="text-[10px] text-brand-200 block">Active Openings</span>
                <span className="font-bold text-emerald-400 text-sm">
                  {selectedTrade.activeOpeningsCount.toLocaleString('en-IN')}+ Jobs
                </span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs">
                <span className="text-[10px] text-brand-200 block">Annual Growth</span>
                <span className="font-bold text-white text-sm">
                  +{selectedTrade.projectedAnnualHiringGrowth}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Addressed Parent Concerns & Resolutions */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            3. Resolved Family Concerns & Evidence
          </h3>
          <div className="space-y-3 text-xs">
            {selectedTrade.parentConcernAnswers.map((ans, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900 text-sm">{ans.concern}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {ans.evidenceSummary}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {ans.metrics.map((m, idx) => (
                    <span key={idx} className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-semibold">
                      {m.label}: <strong>{m.value}</strong>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Actionable Next Steps & Local Training Centers */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            4. Recommended Next Steps for the Family
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
              <div>
                <strong className="text-slate-900 block">Visit Local Government ITI (Varanasi / State Center)</strong>
                <span className="text-slate-600">Collect admissions prospectus for ITI CTS Electrician. Verify free hostel and SC/ST/OBC scholarship forms.</span>
              </div>
            </div>

            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
              <div>
                <strong className="text-slate-900 block">Register on NAPS Apprenticeship Portal (apprenticeshipindia.gov.in)</strong>
                <span className="text-slate-600">Create learner registration ID for guaranteed industrial stipend matching post-training.</span>
              </div>
            </div>

            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-100 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
              <div>
                <strong className="text-slate-900 block">Prepare for RRB ALP & Technician Railway Syllabus</strong>
                <span className="text-slate-600">Keep Class 10 science and basic mathematics sharp for Central Government technician quotas.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Sources Audit */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
          <span>Data Sources: DGT NCVT MIS • NAPS MSDE • NCS Labour Bureau</span>
          <span>Zero Hallucination Policy • KaushalSetu Platform</span>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={() => setActivePage('trades')}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
        >
          ← Explore More Careers
        </button>

        <button
          onClick={() => setActivePage('counselling')}
          className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md"
        >
          Return to AI Counselling
        </button>
      </div>

    </div>
  );
};
