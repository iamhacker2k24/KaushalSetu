import React, { useState } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Building2, 
  Layers, 
  Search, 
  ShieldCheck, 
  Info, 
  Briefcase, 
  Award,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_TRADES, DATA_SOURCES } from '../data/mockData';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { BackButton } from '../components/common/BackButton';

interface Props {
  setActivePage: (page: string) => void;
}

export const MarketInsightsPage: React.FC<Props> = ({ setActivePage }) => {
  const { selectedTrade, setSelectedTrade, setActiveSourceModal } = useApp();

  const [selectedRegion, setSelectedRegion] = useState<string>('All India');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('Last 12 Months');

  const regions = [
    'All India',
    'Uttar Pradesh',
    'West Bengal',
    'Maharashtra',
    'Tamil Nadu',
    'Gujarat',
    'Bihar',
    'Rajasthan'
  ];

  const timeRanges = [
    'Last 30 Days',
    'Last 6 Months',
    'Last 12 Months'
  ];

  // Realistic monthly trend data
  const monthlyTrends = [
    { month: 'Oct 23', jobs: 9200, searchIndex: 58 },
    { month: 'Dec 23', jobs: 9800, searchIndex: 64 },
    { month: 'Feb 24', jobs: 10600, searchIndex: 72 },
    { month: 'Apr 24', jobs: 11400, searchIndex: 79 },
    { month: 'Jun 24', jobs: 12200, searchIndex: 85 },
    { month: 'Aug 24', jobs: 13100, searchIndex: 91 },
    { month: 'Oct 24', jobs: selectedTrade.activeOpeningsCount, searchIndex: 96 }
  ];

  // Top hiring industrial hubs
  const topHiringClusters = [
    { city: 'Pune - Pimpri Chinchwad', state: 'Maharashtra', count: '3,840 openings', type: 'Automotive & Precision' },
    { city: 'Noida - Greater Noida', state: 'Uttar Pradesh', count: '2,920 openings', type: 'Electronics & Infrastructure' },
    { city: 'Chennai - Sriperumbudur', state: 'Tamil Nadu', count: '2,650 openings', type: 'EV & Heavy Engineering' },
    { city: 'Howrah - Durgapur', state: 'West Bengal', count: '1,840 openings', type: 'Fabrication & Power Equipment' },
    { city: 'Sanand - Ahmedabad', state: 'Gujarat', count: '2,150 openings', type: 'Solar PV & Manufacturing' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Back Row */}
      <div className="flex items-center justify-between">
        <BackButton label="Back" />
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Real-Time Market Intelligence Layer
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Skill Market Dynamics: {selectedTrade.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Live feed tracking active verified corporate openings, NAPS apprenticeship registrations, wage surveys, and search interest across Indian districts.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <DataSourceBadge source={DATA_SOURCES.job_market_agg} />
        </div>
      </div>

      {/* Selectors Bar: Trade, Location, Time Range */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-card flex flex-col md:flex-row gap-4 justify-between items-center text-xs">
        <div className="w-full md:w-auto flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Trade Selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Selected Trade
            </label>
            <select
              value={selectedTrade.id}
              onChange={(e) => {
                const tr = MOCK_TRADES.find(t => t.id === e.target.value);
                if (tr) setSelectedTrade(tr);
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50 focus:bg-white focus:border-brand-500"
            >
              {MOCK_TRADES.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Location Selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Geographic Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50 focus:bg-white focus:border-brand-500"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Time Range Selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Audited Time Period
            </label>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 bg-slate-50 focus:bg-white focus:border-brand-500"
            >
              {timeRanges.map((tr) => (
                <option key={tr} value={tr}>{tr}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-slate-400">Status:</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live Data Sync (11:00 AM IST)</span>
          </span>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Current Job Openings
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Briefcase className="w-4 h-4" />
            </span>
          </div>
          <span className="text-3xl font-extrabold text-slate-900 block mt-2">
            {selectedTrade.activeOpeningsCount.toLocaleString('en-IN')}
          </span>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
            <ArrowUpRight className="w-4 h-4" />
            <span>Active Pan-India Vacancies</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-2 border-t border-slate-100 pt-2">
            Source: NCS Live Feed • Updated 2 hours ago
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Annual Hiring Growth
            </span>
            <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <span className="text-3xl font-extrabold text-brand-600 block mt-2">
            +{selectedTrade.projectedAnnualHiringGrowth}%
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Driven by industrial & green subsidies
          </span>
          <span className="text-[10px] text-slate-400 block mt-2 border-t border-slate-100 pt-2">
            Source: NSDC Q2 Outlook
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Typical Starting Range
            </span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <span className="text-2xl font-extrabold text-slate-900 block mt-2">
            ₹{selectedTrade.monthlyStartingSalary[0].toLocaleString('en-IN')} - ₹{selectedTrade.monthlyStartingSalary[1].toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Mid-Career: ₹{selectedTrade.monthlyMidCareerSalary[0].toLocaleString('en-IN')} - ₹{selectedTrade.monthlyMidCareerSalary[1].toLocaleString('en-IN')}+
          </span>
          <span className="text-[10px] text-slate-400 block mt-2 border-t border-slate-100 pt-2">
            Source: EPFO Payroll Wage Surveys
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Placement Rate
            </span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <span className="text-3xl font-extrabold text-emerald-600 block mt-2">
            {selectedTrade.placementRatePercentage}%
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Within 6 months of course completion
          </span>
          <span className="text-[10px] text-slate-400 block mt-2 border-t border-slate-100 pt-2">
            Source: DGT Annual Placement Survey
          </span>
        </div>
      </div>

      {/* Main Trends Visualizations (Hiring vs Search Interest) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Visual Trends (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Verified Job Openings vs Search Interest Trend
                </h3>
                <p className="text-xs text-slate-500">
                  Rolling 12-month trajectory for {selectedTrade.name} in {selectedRegion}
                </p>
              </div>

              {/* Legend with Explicit Disclaimer */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-brand-600"></span>
                  <span className="font-bold text-slate-700">Verified Openings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="font-semibold text-slate-700">Search Interest (0-100)</span>
                </div>
              </div>
            </div>

            {/* Simulated Clean Visual Chart Bars */}
            <div className="space-y-4 pt-2">
              {monthlyTrends.map((t, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span className="font-bold text-slate-800">{t.month}</span>
                    <div className="flex gap-4">
                      <span className="text-brand-700 font-bold">{t.jobs.toLocaleString('en-IN')} Jobs</span>
                      <span className="text-amber-700 font-semibold">{t.searchIndex} Search Score</span>
                    </div>
                  </div>
                  
                  {/* Two comparative bars */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex gap-1">
                    <div 
                      className="bg-brand-600 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${(t.jobs / 16000) * 100}%` }}
                      title={`Verified Jobs: ${t.jobs}`}
                    />
                    <div 
                      className="bg-amber-400 h-full rounded-full opacity-80" 
                      style={{ width: `${t.searchIndex}%` }}
                      title={`Search Interest Index: ${t.searchIndex}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Crucial Ethical / Technical Distinction Notice */}
            <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-200 text-xs text-sky-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Transparent Data Standard:</strong> Google Search Interest represents student and family search query curiosity (normalized from 0 to 100). It is <em>not</em> identical to actual employer job demand. Actual hiring demand is sourced exclusively from the National Career Service (NCS) and verified NAPS contracts.
              </div>
            </div>
          </div>

          {/* Top Hiring Locations & Industrial Clusters */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Top Hiring Industrial Corridors & Clusters
                </h3>
              </div>
              <span className="text-xs text-slate-500">Tier-1 & Tier-2 Centers</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {topHiringClusters.map((cluster, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-sm">{cluster.city}</span>
                    <span className="font-bold text-brand-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {cluster.count}
                    </span>
                  </div>
                  <span className="text-slate-500 block">{cluster.state}</span>
                  <span className="text-[11px] text-brand-600 font-medium block pt-1">
                    Sector: {cluster.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Demanded Skills, Companies, and Future Outlook (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Top Hiring Companies */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand-600" />
              <span>Major Employing Organizations</span>
            </h4>
            <div className="space-y-2 text-xs">
              {selectedTrade.topEmployers.map((emp, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800">{emp}</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                    Active Hiring
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Demanded Skills */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-600" />
              <span>High-Wage Technical Skills</span>
            </h4>
            <div className="space-y-2 text-xs">
              {selectedTrade.requiredSkills.map((sk, i) => (
                <div key={i} className="p-2.5 bg-brand-50/50 rounded-xl border border-brand-100 flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{sk}</span>
                  <span className="text-[10px] text-brand-700 font-bold">NSQF Level {selectedTrade.nsqfLevel}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Future Demand Outlook */}
          <div className="bg-gradient-to-br from-brand-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              Future Demand Indicator
            </span>
            <h4 className="text-base font-bold text-white">5-Year Industry Outlook</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Backed by national infrastructure outlays including PM Surya Ghar, Defense Corridors, and Indian Railways electrification, skilled technician requirements are projected to grow by 20-35% annually through 2030.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActivePage('counselling')}
                className="w-full py-2.5 bg-white text-slate-900 font-bold rounded-xl text-xs hover:bg-slate-100 transition-colors shadow-sm"
              >
                Discuss with KaushalSetu AI
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
