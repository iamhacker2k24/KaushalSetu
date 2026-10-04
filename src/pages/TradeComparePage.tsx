import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Award,
  Zap,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_TRADES } from '../data/mockData';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { BackButton } from '../components/common/BackButton';

interface Props {
  setActivePage: (page: string) => void;
}

export const TradeComparePage: React.FC<Props> = ({ setActivePage }) => {
  const { comparisonTradeIds, toggleCompareTrade, setSelectedTrade } = useApp();

  // Selected trades to compare
  const tradesToCompare = MOCK_TRADES.filter(t => comparisonTradeIds.includes(t.id));

  const handleSelectTradeForCounselling = (trade: typeof MOCK_TRADES[0]) => {
    setSelectedTrade(trade);
    setActivePage('counselling');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Back Row */}
      <div className="flex items-center justify-between">
        <BackButton label="Back to Trades" onClick={() => setActivePage('trades')} />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Side-by-Side Trade Analysis
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            How These Career Pathways Differ
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            We do not declare any single career as universally "best." Every student possesses unique strengths, location constraints, and risk preferences. Compare the facts objectively.
          </p>
        </div>

        <button
          onClick={() => setActivePage('trades')}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold self-start md:self-auto shrink-0 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-brand-600" />
          <span>Add More Trades (Max 4)</span>
        </button>
      </div>

      {/* Mobile Swipe Tip */}
      <div className="md:hidden flex items-center justify-between px-3.5 py-2 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-800 font-semibold shadow-2xs">
        <span>👈 Swipe horizontally to compare 👉</span>
        <span className="font-bold text-brand-900 bg-white px-2 py-0.5 rounded-full border border-brand-200">
          {tradesToCompare.length} Trades
        </span>
      </div>

      {/* Comparison Grid Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 w-48 text-slate-400 font-bold uppercase tracking-wider text-[11px] sticky left-0 bg-slate-50 z-10">
                  Comparison Metric
                </th>
                {tradesToCompare.map((trade) => (
                  <th key={trade.id} className="p-4 min-w-[240px] text-slate-900 font-bold border-l border-slate-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
                          {trade.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-1">{trade.name}</h3>
                        <p className="text-[11px] text-slate-500 font-normal">{trade.nameHindi}</p>
                      </div>

                      {tradesToCompare.length > 2 && (
                        <button
                          onClick={() => toggleCompareTrade(trade.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-lg"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* Row 1: Typical Starting Pay */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                  Typical Starting Pay
                </td>
                {tradesToCompare.map((t) => (
                  <td key={t.id} className="p-4 border-l border-slate-100">
                    <span className="font-extrabold text-sm text-slate-900 block">
                      ₹{t.monthlyStartingSalary[0].toLocaleString('en-IN')} - ₹{t.monthlyStartingSalary[1].toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400">Monthly in hand</span>
                  </td>
                ))}
              </tr>

              {/* Row 2: Mid-Career Earnings (5+ Yrs) */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                  Mid-Career (5 Yrs)
                </td>
                {tradesToCompare.map((t) => (
                  <td key={t.id} className="p-4 border-l border-slate-100">
                    <span className="font-extrabold text-sm text-brand-700 block">
                      ₹{t.monthlyMidCareerSalary[0].toLocaleString('en-IN')} - ₹{t.monthlyMidCareerSalary[1].toLocaleString('en-IN')}+
                    </span>
                    <span className="text-[10px] text-slate-400">Supervisor / Licensed</span>
                  </td>
                ))}
              </tr>

              {/* Row 3: Placement Rate */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                  Audited Placement Rate
                </td>
                {tradesToCompare.map((t) => (
                  <td key={t.id} className="p-4 border-l border-slate-100">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.placementRatePercentage}% Placed</span>
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 4: Active Openings & Growth */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                  Current Openings & Growth
                </td>
                {tradesToCompare.map((t) => (
                  <td key={t.id} className="p-4 border-l border-slate-100">
                    <span className="font-bold text-slate-900 block">
                      {t.activeOpeningsCount.toLocaleString('en-IN')}+ verified
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
                      +{t.projectedAnnualHiringGrowth}% Annual Growth
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 5: Training Duration & Cost */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                  Training Duration & Cost
                </td>
                {tradesToCompare.map((t) => (
                  <td key={t.id} className="p-4 border-l border-slate-100">
                    <span className="font-semibold text-slate-800 block">
                      {t.trainingOptions[0].durationMonths} Months ({t.trainingOptions[0].type})
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Govt ITI Fee: ~₹{t.trainingOptions[0].approxFeeInr}/yr
                    </span>
                    <span className="text-[10px] text-emerald-700 font-medium block">
                      Stipend during NAPS: ₹{t.trainingOptions[0].typicalStipendInr || 8500}/mo
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 6: Local Availability */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                  Home District Availability
                </td>
                {tradesToCompare.map((t) => (
                  <td key={t.id} className="p-4 border-l border-slate-100">
                    <span className="font-bold text-slate-800 block">
                      {t.localAvailabilityRating} Local Availability
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Opportunities across blocks and local MSMEs.
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 7: Higher Education Bridge */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                  Further Education Bridge
                </td>
                {tradesToCompare.map((t) => (
                  <td key={t.id} className="p-4 border-l border-slate-100">
                    <span className="text-slate-700 font-medium block leading-relaxed">
                      Lateral Entry into 2nd-Year Engineering Diploma + NIOS 12th equivalence.
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row 8: Key Employers */}
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                  Top Employers & PSUs
                </td>
                {tradesToCompare.map((t) => (
                  <td key={t.id} className="p-4 border-l border-slate-100">
                    <div className="flex flex-wrap gap-1">
                      {t.topEmployers.slice(0, 3).map((emp, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700">
                          {emp}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 9: Action CTAs */}
              <tr className="bg-slate-50">
                <td className="p-4 font-bold text-slate-700 sticky left-0 bg-slate-50">
                  Family Action
                </td>
                {tradesToCompare.map((t) => (
                  <td key={t.id} className="p-4 border-l border-slate-100">
                    <button
                      onClick={() => handleSelectTradeForCounselling(t)}
                      className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>Counsel on this Trade</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
