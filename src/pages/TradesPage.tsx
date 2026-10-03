import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  TrendingUp, 
  Award,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_TRADES, DATA_SOURCES } from '../data/mockData';
import { Trade, TradeCategory } from '../types';
import { DataSourceBadge } from '../components/common/DataSourceBadge';

interface Props {
  setActivePage: (page: string) => void;
}

export const TradesPage: React.FC<Props> = ({ setActivePage }) => {
  const { setSelectedTrade, toggleCompareTrade, comparisonTradeIds } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxDuration, setMaxDuration] = useState<number>(24);
  const [minPlacement, setMinPlacement] = useState<number>(75);

  const categories = [
    'All',
    'Engineering & Technical',
    'Renewable Energy & Solar',
    'Automotive & EV',
    'Electronics & Appliances',
    'Manufacturing & CNC',
    'Healthcare & Wellness',
    'IT & Digital Services',
    'Modern Agriculture & Drones',
    'Construction & Infrastructure'
  ];

  const filteredTrades = MOCK_TRADES.filter((trade) => {
    const matchesSearch = 
      trade.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.nameHindi.includes(searchQuery) ||
      trade.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || trade.category === selectedCategory;
    const matchesPlacement = trade.placementRatePercentage >= minPlacement;
    const matchesDuration = trade.trainingOptions.some(o => o.durationMonths <= maxDuration);

    return matchesSearch && matchesCategory && matchesPlacement && matchesDuration;
  });

  const handleSelectTrade = (trade: Trade) => {
    setSelectedTrade(trade);
    setActivePage('pathways');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Vocational Trade Explorer
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Explore Verified Vocational Careers & Outcomes
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Browse verified Indian skill qualification records (NSQF Levels 3 to 5) with audited placement percentages, starting salaries, and apprenticeship pathways.
          </p>
        </div>

        <button
          onClick={() => setActivePage('compare')}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <Layers className="w-4 h-4" />
          <span>Compare Selected ({comparisonTradeIds.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by trade (e.g. Electrician, Solar, EV, CNC, GDA)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-brand-500 bg-white font-medium text-slate-700"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Min Placement Filter */}
          <div className="md:col-span-3 flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="text-slate-600 font-semibold">Min Placement:</span>
            <span className="font-bold text-brand-700">{minPlacement}%+</span>
            <input
              type="range"
              min={70}
              max={88}
              value={minPlacement}
              onChange={(e) => setMinPlacement(Number(e.target.value))}
              className="w-20 accent-brand-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Quick Sector Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.slice(1, 7).map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c === selectedCategory ? 'All' : c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === c 
                  ? 'bg-brand-600 text-white shadow-2xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Trades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrades.map((trade) => {
          const isCompared = comparisonTradeIds.includes(trade.id);
          return (
            <div
              key={trade.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-soft-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header: Category & NSQF Level */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                    {trade.category}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    NSQF Level {trade.nsqfLevel}
                  </span>
                </div>

                {/* Trade Titles */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {trade.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {trade.nameHindi}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {trade.description}
                </p>

                {/* Outcome Metrics Box */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Placement Outcome:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md border border-emerald-200">
                      {trade.placementRatePercentage}% Audited
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Typical Starting Wage:</span>
                    <span className="font-bold text-slate-800">
                      ₹{trade.monthlyStartingSalary[0].toLocaleString('en-IN')} - ₹{trade.monthlyStartingSalary[1].toLocaleString('en-IN')}/mo
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Active Pan-India Openings:</span>
                    <span className="font-bold text-brand-700">
                      {trade.activeOpeningsCount.toLocaleString('en-IN')}+ vacancies
                    </span>
                  </div>
                </div>

                {/* Key Skills Tags */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Core Technical Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {trade.requiredSkills.slice(0, 3).map((sk, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md">
                        {sk}
                      </span>
                    ))}
                    {trade.requiredSkills.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-semibold self-center">
                        +{trade.requiredSkills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer: Comparison Toggle & Explore CTA */}
              <div className="pt-5 border-t border-slate-100 mt-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => toggleCompareTrade(trade.id)}
                      className="w-3.5 h-3.5 text-brand-600 rounded"
                    />
                    <span>Add to Compare</span>
                  </label>

                  <span className="text-[10px] text-slate-400">
                    Growth: <strong className="text-emerald-600">+{trade.projectedAnnualHiringGrowth}%</strong>
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSelectTrade(trade)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-700 hover:from-brand-700 hover:to-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>View 5-Year Pathway</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedTrade(trade);
                      setActivePage('counselling');
                    }}
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
                    title="Ask AI questions about this specific trade"
                  >
                    Ask AI
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
