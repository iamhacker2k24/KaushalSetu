import React from 'react';
import { ShieldCheck, PhoneCall, ExternalLink, Heart, Award, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { t, setActiveEscalationModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 xl:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-sm">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-700 text-white flex items-center justify-center font-bold">
                <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none">
                  <path d="M8 36C14 26 22 22 28 22C34 22 40 26 44 36" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="28" cy="14" r="7" fill="#10B981" />
                  <path d="M16 16C16 12 21 8 28 8C35 8 40 12 40 16" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-display">
                  Kaushal<span className="text-brand-400">Setu</span>
                </span>
                <p className="text-xs text-brand-300 font-medium">Helping Families Build Better Career Futures</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An AI-powered family vocational career counselling platform designed for the Indian skill-development ecosystem. Fostering joint student-parent decision making through verified government data and human support.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-800/80">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero AI Hallucination Policy</span>
              </span>
            </div>
          </div>

          {/* Core Portals & Sources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Government Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="https://ncvtmis.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>NCVT MIS Portal (DGT)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://apprenticeshipindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>NAPS Apprenticeship Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://nsdcindia.org" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>NSDC Skill Development</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://ncs.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>National Career Service (NCS)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://www.pmkvyofficial.org" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>PMKVY Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Key Trades */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Popular Vocational Trades
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Electrical Technician (CTS)</li>
              <li>Solar & Rooftop PV Installer</li>
              <li>Automobile & EV Diagnostics</li>
              <li>AC & Refrigeration (RAC)</li>
              <li>Healthcare Assistant (GDA)</li>
              <li>Precision CNC Machinist</li>
              <li>Smart Agriculture Drone Pilot</li>
            </ul>
          </div>

          {/* Toll Free & Emergency */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Support & Helpline
            </h4>
            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <PhoneCall className="w-4 h-4" />
                <span>1800-599-0019</span>
              </div>
              <p className="text-[11px] text-slate-400">
                National Career Service Toll-Free Helpline (Multi-lingual)
              </p>
              <button
                onClick={() => setActiveEscalationModal(true)}
                className="w-full mt-2 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Schedule Counsellor Call
              </button>
            </div>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="py-6 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left">
            <strong className="text-slate-400 font-semibold">Data Notice:</strong> KaushalSetu integrates with authorized DGT, NSDC, and NCS datasets. Dynamic market numbers are timestamped. Sample representations for demonstration purposes are clearly badged as prototype data.
          </p>
          <div className="flex items-center gap-1 text-slate-400 shrink-0">
            <span>Built with care for India's youth and families</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
