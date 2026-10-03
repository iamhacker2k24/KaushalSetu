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
  Settings,
  Search,
  Filter,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { ADMIN_ANALYTICS_DATA, DATA_SOURCES } from '../data/mockData';
import { DataSourceBadge } from '../components/common/DataSourceBadge';

interface Props {
  setActivePage: (page: string) => void;
}

export const AdminDashboardPage: React.FC<Props> = ({ setActivePage }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'concerns' | 'trades' | 'regional' | 'sources'>('overview');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('All');

  const adminNav = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'concerns', label: 'Parent Concerns Engine', icon: AlertTriangle },
    { id: 'trades', label: 'Trade Demand Intelligence', icon: Layers },
    { id: 'regional', label: 'Regional Analysis (States)', icon: MapPin },
    { id: 'sources', label: 'Data Sources & Audits', icon: Database }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-md">
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
              National Skill Development Monitoring • State & District Level Escalation Telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('home')}
            className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl"
          >
            ← Exit to Public Portal
          </button>
        </div>
      </div>

      {/* Admin Navigation Pills */}
      <div className="flex overflow-x-auto pb-2 border-b border-slate-100 gap-2 no-scrollbar">
        {adminNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeAdminTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveAdminTab(item.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* TOP 5 OPERATIONAL KPIS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Sessions
          </span>
          <span className="text-2xl font-extrabold text-slate-900 block mt-1">
            {ADMIN_ANALYTICS_DATA.totalFamiliesCounselled.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            ↑ +18.4% this month
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Active Today
          </span>
          <span className="text-2xl font-extrabold text-brand-600 block mt-1">
            {ADMIN_ANALYTICS_DATA.activeCounselingSessionsToday}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Live joint family sessions
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Avg Alignment Boost
          </span>
          <span className="text-2xl font-extrabold text-emerald-600 block mt-1">
            +{ADMIN_ANALYTICS_DATA.averageAlignmentImprovementPercent}%
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Confidence gap reduced
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Human Escalations
          </span>
          <span className="text-2xl font-extrabold text-amber-600 block mt-1">
            {ADMIN_ANALYTICS_DATA.unresolvedHumanEscalations} Pending
          </span>
          <span className="text-[11px] text-amber-700 font-semibold block mt-1">
            Dispatched to state centers
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Resolution Rate
          </span>
          <span className="text-2xl font-extrabold text-purple-600 block mt-1">
            {ADMIN_ANALYTICS_DATA.resolutionRatePercent}%
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            Resolved without dispute
          </span>
        </div>
      </div>

      {/* TAB CONTENT */}

      {/* OVERVIEW / CONCERNS */}
      {(activeAdminTab === 'overview' || activeAdminTab === 'concerns') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Top Parent Concerns Chart */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Top Parental Concerns Detected (NLP Engine)
                </h3>
                <p className="text-xs text-slate-500">
                  Aggregated from 28,000+ family consultation transcripts
                </p>
              </div>
              <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                Pan-India Breakdown
              </span>
            </div>

            <div className="space-y-4">
              {ADMIN_ANALYTICS_DATA.parentConcernsBreakdown.map((item, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>{item.concern}</span>
                    <span className="font-bold text-slate-900">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
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

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Administrative Takeaway:</strong> Job Security (38%) and Income (29%) account for over two-thirds of all parental resistance. Automated evidence cards displaying EPFO payroll registration and DISCOM / Railway quotas yield an immediate 74% reduction in parental doubt.
            </div>
          </div>

          {/* Regional State Breakdown */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  State-wise Engagement & Dominant Concern
                </h3>
                <p className="text-xs text-slate-500">
                  Geographic distribution across high-volume states
                </p>
              </div>
              <span className="text-xs text-slate-400">Monthly Run</span>
            </div>

            <div className="space-y-3">
              {ADMIN_ANALYTICS_DATA.stateActivityDistribution.map((st, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{st.state}</span>
                    <span className="text-[11px] text-slate-500">
                      Primary Anxiety: <strong className="text-amber-800">{st.topConcern}</strong>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-brand-700 text-sm block">
                      {st.sessions.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400">Sessions</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TRADES DEMAND INTELLIGENCE TAB */}
      {(activeAdminTab === 'trades' || activeAdminTab === 'overview') && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Most Explored Vocational Trades & Market Demand Tally
              </h3>
              <p className="text-xs text-slate-500">
                Cross-referenced with NCS active job postings and verified corporate placement rates
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              High Market Absorption
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {ADMIN_ANALYTICS_DATA.topExploredTrades.map((t, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900 text-sm">{t.tradeName}</span>
                  <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {t.hiringGrowth}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 pt-1">
                  <span>Family Explorations:</span>
                  <span className="font-bold text-slate-800">{t.explorations.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DATA SOURCES TRANSPARENCY TAB */}
      {activeAdminTab === 'sources' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Connected Authoritative Data Sources & Freshness Audits
              </h3>
              <p className="text-xs text-slate-500">
                Official integrations enforcing zero LLM hallucination
              </p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-300">
              All Connectors Healthy
            </span>
          </div>

          <div className="space-y-4">
            {Object.values(DATA_SOURCES).map((src: any) => (
              <div key={src.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{src.agencyName}</span>
                    <span className="text-[10px] bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded-full">
                      {src.verificationStatus}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Last Sync: <strong>{src.lastUpdated}</strong> ({src.dataPeriod})
                  </span>
                </div>

                <p className="text-slate-600 font-medium">
                  <strong>Dataset:</strong> {src.datasetName} • {src.portalOrReport}
                </p>

                <p className="text-slate-500 text-[11px] bg-white p-3 rounded-xl border border-slate-200">
                  <strong>Methodology:</strong> {src.methodology}
                </p>

                <div className="flex justify-between items-center pt-1 text-[11px] text-slate-400">
                  <span>Coverage: {src.geoCoverage}</span>
                  {src.url && (
                    <a href={src.url} target="_blank" rel="noreferrer" className="text-brand-600 hover:underline flex items-center gap-1 font-semibold">
                      <span>Official Portal</span>
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
