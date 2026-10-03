import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  ArrowRight,
  PhoneCall,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AlignmentMeter } from '../components/common/AlignmentMeter';

interface Props {
  setActivePage: (page: string) => void;
}

export const FamilyAlignmentPage: React.FC<Props> = ({ setActivePage }) => {
  const { profile, selectedTrade, setActiveEscalationModal } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Family Decision Health
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Family Understanding & Alignment Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            KaushalSetu measures self-reported clarity and confidence before and after reviewing verified evidence. We do not persuade or enforce decisions; we build mutual family consensus.
          </p>
        </div>

        <button
          onClick={() => setActivePage('summary')}
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 self-start md:self-auto shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Full Family Summary</span>
        </button>
      </div>

      {/* Main Alignment Gauge Component */}
      <AlignmentMeter detailed={true} />

      {/* Deep-Dive Analysis of the Confidence Shift */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Detailed Diagnostic: Why Was There an Initial 39% Gap?
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Understanding the root causes of vocational hesitation in Indian households.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-rose-700 uppercase tracking-wide text-[10px] block">
              1. Salary & Family Security Anxiety
            </span>
            <p className="text-slate-700 leading-relaxed">
              Parents feared ITI was a dead-end manual labor job paying only ₹6,000 to ₹8,000 without annual increments.
            </p>
            <div className="pt-2 border-t border-slate-200 text-emerald-700 font-medium">
              ✓ Resolved by: Official EPFO wage bands demonstrating ₹16k-₹22k starting and ₹40k+ supervisory earnings.
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-rose-700 uppercase tracking-wide text-[10px] block">
              2. Fear of Educational Dead-End
            </span>
            <p className="text-slate-700 leading-relaxed">
              Family believed taking a vocational course would permanently prevent the student from ever earning a Polytechnic Diploma or Degree.
            </p>
            <div className="pt-2 border-t border-slate-200 text-emerald-700 font-medium">
              ✓ Resolved by: AICTE DGT regulations for direct Lateral Entry into 2nd year Polytechnic Engineering.
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-rose-700 uppercase tracking-wide text-[10px] block">
              3. Social Standing & Respect
            </span>
            <p className="text-slate-700 leading-relaxed">
              Worry about community judgment in the village/town ("chota kaam" manual perception).
            </p>
            <div className="pt-2 border-t border-slate-200 text-emerald-700 font-medium">
              ✓ Resolved by: Reviewing modern corporate EV / CNC / Solar service hubs and Railway technician respect.
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Dialogue Prompts for Family Dinner Conversation */}
      <div className="bg-gradient-to-br from-brand-50 to-indigo-50/50 rounded-3xl p-6 sm:p-8 border border-brand-200 shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-bold text-slate-900">
            Recommended Family Discussion Prompts for Today
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Take 15 minutes over tea or dinner to talk through these three healthy reflection prompts:
        </p>

        <div className="space-y-2.5 text-xs text-slate-700">
          <div className="p-3 bg-white rounded-xl border border-brand-100 flex items-start gap-2.5">
            <span className="font-bold text-brand-600 shrink-0">1.</span>
            <span>
              <strong>To the Student:</strong> "Do you feel excited about practical tool work and diagnostic electrical circuits over sitting in a 3-year theoretical arts degree?"
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-brand-100 flex items-start gap-2.5">
            <span className="font-bold text-amber-600 shrink-0">2.</span>
            <span>
              <strong>To the Parent:</strong> "Are you reassured by the Government NCVT certificate, ₹10k apprenticeship stipend, and the option to do Lateral Diploma later?"
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-brand-100 flex items-start gap-2.5">
            <span className="font-bold text-purple-600 shrink-0">3.</span>
            <span>
              <strong>To Both:</strong> "Shall we visit the nearest Government ITI or connect with Dr. Sunita Sharma (Vocational Counsellor) this Saturday?"
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setActiveEscalationModal(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Connect with a Human Counsellor</span>
          </button>

          <button
            onClick={() => setActivePage('counselling')}
            className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-brand-600" />
            <span>Continue AI Counselling Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
