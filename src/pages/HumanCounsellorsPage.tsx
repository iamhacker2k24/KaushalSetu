import React, { useState } from 'react';
import { 
  PhoneCall, 
  Video, 
  MessageSquare, 
  Calendar, 
  Star, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Languages, 
  CheckCircle2, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_COUNSELLORS } from '../data/mockData';
import { Counsellor } from '../types';

interface Props {
  setActivePage: (page: string) => void;
}

export const HumanCounsellorsPage: React.FC<Props> = ({ setActivePage }) => {
  const { setActiveEscalationModal, setActiveBookingModal, profile, selectedTrade } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  const filteredCounsellors = MOCK_COUNSELLORS.filter(c => {
    if (selectedLanguage === 'All') return true;
    return c.languages.includes(selectedLanguage);
  });

  const handleBook = (counsellor: Counsellor) => {
    setActiveEscalationModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Certified Human Guidance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Certified State Vocational Career Counsellors
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Experienced psychologists and apprenticeship placement officers from the Regional Directorate of Skill Development (RDSDE) and National Skill Training Institutes (NSTI).
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0 text-xs">
          <span className="font-semibold text-slate-500">Filter by Language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
          >
            <option value="All">All Languages</option>
            <option value="Hindi">हिन्दी (Hindi)</option>
            <option value="Bengali">বাংলা (Bengali)</option>
            <option value="Marathi">मराठी (Marathi)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>

      {/* Trust Notice */}
      <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">100% Free & Transparent:</strong> Government vocational counselling sessions are free of charge for Indian students and families. No private coaching sales, no commercial bias.
        </div>
      </div>

      {/* Counsellors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCounsellors.map((counsellor) => (
          <div
            key={counsellor.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card hover:shadow-soft-lg transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={counsellor.avatarUrl}
                    alt={counsellor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-200 shadow-xs"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{counsellor.name}</h3>
                    <p className="text-xs text-slate-500">{counsellor.title}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs">
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                        <span>{counsellor.rating}</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{counsellor.reviewsCount} family reviews</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-brand-700 font-semibold">{counsellor.experienceYears} yrs exp</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Govt Certified
                </span>
              </div>

              {/* Affiliated Center */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center gap-1 text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-600" />
                  <span>{counsellor.location}</span>
                </div>
                <p className="text-slate-700 font-semibold">
                  {counsellor.affiliatedCenter}
                </p>
              </div>

              {/* Languages & Specializations */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-500 font-medium">Languages:</span>
                  <span className="font-bold text-slate-800">{counsellor.languages.join(', ')}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Specializations:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {counsellor.specializations.map((spec, idx) => (
                      <span key={idx} className="bg-brand-50 text-brand-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-brand-100">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Available Slots */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Available Slots Today / Tomorrow:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {counsellor.availableSlots.map((slot, i) => (
                    <span key={i} className="text-xs bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 font-medium">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-slate-100 mt-5 flex gap-2">
              <button
                onClick={() => handleBook(counsellor)}
                className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Book Free Audio / Video Call</span>
              </button>

              <button
                onClick={() => handleBook(counsellor)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
              >
                Center Visit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
