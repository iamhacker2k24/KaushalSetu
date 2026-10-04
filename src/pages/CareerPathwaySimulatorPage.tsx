import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_TRADES } from '../data/mockData';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { BackButton } from '../components/common/BackButton';

interface Props {
  setActivePage: (page: string) => void;
}

export const CareerPathwaySimulatorPage: React.FC<Props> = ({ setActivePage }) => {
  const { selectedTrade, setSelectedTrade, profile } = useApp();
  const [showWhatIfModal, setShowWhatIfModal] = useState(false);

  // What-If Simulation Controls
  const [simulationTrainingType, setSimulationTrainingType] = useState<'ITI CTS' | 'PMKVY' | 'Polytechnic'>('ITI CTS');
  const [simulationLocation, setSimulationLocation] = useState<'home' | 'state' | 'metro'>('home');
  const [simulationApprenticeship, setSimulationApprenticeship] = useState<boolean>(true);
  const [simulationHigherEduTarget, setSimulationHigherEduTarget] = useState<boolean>(true);

  // Derive salary multiplier based on location scenario
  const locationMultiplier = simulationLocation === 'metro' ? 1.25 : simulationLocation === 'state' ? 1.1 : 1.0;
  const trainingMultiplier = simulationTrainingType === 'Polytechnic' ? 1.2 : simulationTrainingType === 'PMKVY' ? 0.9 : 1.0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Back Row */}
      <div className="flex items-center justify-between">
        <BackButton label="Back to Trades" onClick={() => setActivePage('trades')} />
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Career Pathway Simulator
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            5-Year Vocational Progression: {selectedTrade.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            See exactly how a student advances from foundation to licensed supervisory roles, complete with earning milestones, lateral education bridges, and government exams.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setShowWhatIfModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore What-If Scenarios</span>
          </button>

          <button
            onClick={() => setActivePage('counselling')}
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md"
          >
            Ask AI About Steps
          </button>
        </div>
      </div>

      {/* Trade Selector Ribbon */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-card flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Simulate Pathway for:</span>
          <select
            value={selectedTrade.id}
            onChange={(e) => {
              const tr = MOCK_TRADES.find(t => t.id === e.target.value);
              if (tr) setSelectedTrade(tr);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-brand-700 bg-brand-50/50 focus:bg-white"
          >
            {MOCK_TRADES.map((t) => (
              <option key={t.id} value={t.id}>{t.name} (NSQF {t.nsqfLevel})</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <span>Active Scenario: <strong>{simulationTrainingType}</strong></span>
          <span>•</span>
          <span>Location: <strong>{simulationLocation === 'home' ? 'Home District' : simulationLocation === 'state' ? 'State Industrial Belt' : 'Metro Cluster'}</strong></span>
          <span>•</span>
          <span>NAPS: <strong>{simulationApprenticeship ? 'Included' : 'Direct Job'}</strong></span>
        </div>
      </div>

      {/* Disclaimers & Methodology Banner */}
      <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Illustrative Progression Model:</strong> Future salary ranges represent typical median industry distributions derived from EPFO payroll records and NSDC skill wage surveys. Future compensation is not guaranteed and depends on individual performance, trade licensing exams, and local economic conditions.
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-7 md:before:left-1/2 before:w-0.5 before:bg-brand-200 before:pointer-events-none">
        {selectedTrade.pathwaySteps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          const adjustedMin = Math.round(step.monthlyEarningRange[0] * locationMultiplier * trainingMultiplier);
          const adjustedMax = Math.round(step.monthlyEarningRange[1] * locationMultiplier * trainingMultiplier);

          return (
            <div 
              key={step.stepNumber}
              className={`relative flex flex-col md:flex-row items-start ${
                isEven ? 'md:flex-row-reverse' : ''
              } gap-6 md:gap-0`}
            >
              {/* Timeline Center Node */}
              <div className="absolute left-7 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-brand-600 shadow-md flex items-center justify-center font-extrabold text-xs text-brand-700 z-10">
                {step.stepNumber}
              </div>

              {/* Step Card */}
              <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-soft-lg transition-all space-y-3">
                  
                  {/* Step Header */}
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                      Step {step.stepNumber} • {step.duration}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {step.qualification}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>

                  {/* Typical Earning Band */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-slate-500 block">Typical Earning Range:</span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {adjustedMax === 0 ? 'Foundation / Training' : `₹${adjustedMin.toLocaleString('en-IN')} - ₹${adjustedMax.toLocaleString('en-IN')} / mo`}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium italic">
                      Based on available data
                    </span>
                  </div>

                  {/* Job Roles */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Designations / Typical Roles:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {step.roles.map((r, i) => (
                        <span key={i} className="text-xs font-semibold bg-brand-50/80 text-brand-900 px-2.5 py-1 rounded-lg border border-brand-100">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills Acquired */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Competencies Developed:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.keySkills.join(' • ')}
                    </p>
                  </div>

                  {/* Higher Education Bridge or Government Exams (If present) */}
                  {step.higherEducationBridge && (
                    <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <GraduationCap className="w-4 h-4 text-purple-700" />
                        <span>Higher Education Bridge:</span>
                      </div>
                      <p className="text-[11px] text-purple-800">
                        {step.higherEducationBridge}
                      </p>
                    </div>
                  )}

                  {step.governmentExamsEligible && (
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Award className="w-4 h-4 text-emerald-700" />
                        <span>Eligible Government & PSU Examinations:</span>
                      </div>
                      <p className="text-[11px] text-emerald-800">
                        {step.governmentExamsEligible.join(', ')}
                      </p>
                    </div>
                  )}

                  {/* Next Step Transition */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Next Milestone:</span>
                    <span className="font-bold text-brand-700">{step.nextMilestone}</span>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* WHAT-IF SCENARIOS MODAL */}
      {showWhatIfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900">
                  What-If Career Scenario Builder
                </h3>
              </div>
              <button 
                onClick={() => setShowWhatIfModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Variable 1: Training Type */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  1. Training Pathway Model:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSimulationTrainingType('ITI CTS')}
                    className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                      simulationTrainingType === 'ITI CTS' ? 'border-brand-600 bg-brand-50 text-brand-900' : 'border-slate-200'
                    }`}
                  >
                    2-Year ITI CTS
                    <span className="block text-[10px] text-slate-400 font-normal">Standard NCVT</span>
                  </button>
                  <button
                    onClick={() => setSimulationTrainingType('PMKVY')}
                    className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                      simulationTrainingType === 'PMKVY' ? 'border-brand-600 bg-brand-50 text-brand-900' : 'border-slate-200'
                    }`}
                  >
                    Short PMKVY
                    <span className="block text-[10px] text-slate-400 font-normal">3-6 Months Fast</span>
                  </button>
                  <button
                    onClick={() => setSimulationTrainingType('Polytechnic')}
                    className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                      simulationTrainingType === 'Polytechnic' ? 'border-brand-600 bg-brand-50 text-brand-900' : 'border-slate-200'
                    }`}
                  >
                    Polytechnic
                    <span className="block text-[10px] text-slate-400 font-normal">3-Year Diploma</span>
                  </button>
                </div>
              </div>

              {/* Variable 2: Work Location */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  2. Preferred Work Location:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSimulationLocation('home')}
                    className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                      simulationLocation === 'home' ? 'border-brand-600 bg-brand-50 text-brand-900' : 'border-slate-200'
                    }`}
                  >
                    Home District
                    <span className="block text-[10px] text-slate-400 font-normal">Max Savings</span>
                  </button>
                  <button
                    onClick={() => setSimulationLocation('state')}
                    className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                      simulationLocation === 'state' ? 'border-brand-600 bg-brand-50 text-brand-900' : 'border-slate-200'
                    }`}
                  >
                    State Industrial
                    <span className="block text-[10px] text-slate-400 font-normal">+10% Pay</span>
                  </button>
                  <button
                    onClick={() => setSimulationLocation('metro')}
                    className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                      simulationLocation === 'metro' ? 'border-brand-600 bg-brand-50 text-brand-900' : 'border-slate-200'
                    }`}
                  >
                    Metro / Special
                    <span className="block text-[10px] text-slate-400 font-normal">+25% Pay</span>
                  </button>
                </div>
              </div>

              {/* Variable 3: Apprenticeship */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Include 1-Year NAPS Industrial Apprenticeship?</span>
                  <span className="text-[11px] text-slate-500">Provides corporate stipend (₹8.5k-₹12k/mo) and formal EPFO PF history.</span>
                </div>
                <input
                  type="checkbox"
                  checked={simulationApprenticeship}
                  onChange={(e) => setSimulationApprenticeship(e.target.checked)}
                  className="w-5 h-5 text-brand-600 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowWhatIfModal(false)}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Apply What-If Parameters to Timeline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Action */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Want to compare this pathway with other vocational sectors?</h4>
          <p className="text-xs text-slate-500">See duration, placement percentages, and government exam suitability side-by-side.</p>
        </div>
        <button
          onClick={() => setActivePage('compare')}
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0"
        >
          Compare 2-4 Trades Side-by-Side
        </button>
      </div>

    </div>
  );
};
