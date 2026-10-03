import React from 'react';
import { Users, TrendingUp, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Props {
  detailed?: boolean;
}

export const AlignmentMeter: React.FC<Props> = ({ detailed = false }) => {
  const { profile } = useApp();
  const before = profile.alignmentBefore;
  const after = profile.alignmentAfter || { learnerConfidence: 89, parentConfidence: 78 };

  const beforeGap = Math.abs(before.learnerConfidence - before.parentConfidence);
  const afterGap = Math.abs(after.learnerConfidence - after.parentConfidence);
  const gapReduction = beforeGap - afterGap;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">Family Understanding Alignment</h4>
            <p className="text-xs text-slate-500">
              Measuring self-reported clarity & confidence (Not persuasion)
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Gap Reduced by {gapReduction}%</span>
        </div>
      </div>

      {/* Before vs After Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
        {/* Before Counselling */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Before Counselling
            </span>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
              Gap: {beforeGap}%
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Learner Confidence ({profile.learner.name})</span>
                <span className="font-bold text-brand-700">{before.learnerConfidence}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${before.learnerConfidence}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Parent Confidence ({profile.parent.relationship})</span>
                <span className="font-bold text-amber-700">{before.parentConfidence}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${before.parentConfidence}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 italic">
            Main source of doubt: Uncertainty about starting salary, factory permanence, and community respect.
          </p>
        </div>

        {/* After Counselling */}
        <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              After Verified Evidence
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
              Narrowed Gap: {afterGap}%
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Learner Clarity</span>
                <span className="font-bold text-brand-700">{after.learnerConfidence}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${after.learnerConfidence}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Parent Clarity & Peace of Mind</span>
                <span className="font-bold text-emerald-700">{after.parentConfidence}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${after.parentConfidence}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-emerald-800 font-medium mt-3">
            Result: Shared consensus on enrolling in ITI with a clear 5-year pathway toward supervisory licensing.
          </p>
        </div>
      </div>

      {detailed && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            What Specifically Changed in Family Understanding?
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Verified Income Bands</span>
                <span className="text-slate-500">Parent reviewed real EPFO starting pay (₹16k-₹22k) and supervisor earnings.</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Future Higher Education</span>
                <span className="text-slate-500">Understood Lateral Entry into 2nd-year Polytechnic Diploma and B.Tech.</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Railway & PSU Quota</span>
                <span className="text-slate-500">Learned that ITI Electricians have direct RRB technician reservation quotas.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
