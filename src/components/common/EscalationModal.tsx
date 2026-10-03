import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Video, 
  MessageSquare, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_COUNSELLORS } from '../../data/mockData';

export const EscalationModal: React.FC = () => {
  const { activeEscalationModal, setActiveEscalationModal, escalationBrief, profile, selectedTrade } = useApp();
  const [selectedFormat, setSelectedFormat] = useState<'video' | 'audio' | 'chat' | 'appointment'>('audio');
  const [selectedCounsellor, setSelectedCounsellor] = useState(MOCK_COUNSELLORS[0]);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(selectedCounsellor.availableSlots[0]);

  if (!activeEscalationModal) return null;

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const handleClose = () => {
    setActiveEscalationModal(false);
    setConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-brand-700 to-indigo-800 text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-amber-300">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                Human Counsellor Escalation
              </span>
              <h3 className="text-xl font-extrabold font-display mt-1">
                Connect with a Certified State Vocational Counsellor
              </h3>
              <p className="text-xs text-brand-100 mt-0.5">
                Zero automated pressure. Experienced guides to answer complex family dilemmas.
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-1 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
          {confirmed ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Counsellor Session Scheduled!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
                  We have forwarded your automated family brief to <strong>{selectedCounsellor.name}</strong>. You will receive an SMS and WhatsApp invitation with meeting credentials.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Counsellor:</span>
                  <span className="font-bold text-slate-800">{selectedCounsellor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Center:</span>
                  <span className="font-semibold text-slate-800">{selectedCounsellor.affiliatedCenter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Slot:</span>
                  <span className="font-bold text-brand-700">{selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Format:</span>
                  <span className="font-semibold text-slate-800 uppercase">{selectedFormat}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Return to Family Counselling
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Select Format */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  1. Choose Preferred Connection Mode
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => setSelectedFormat('audio')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedFormat === 'audio'
                        ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <PhoneCall className={`w-5 h-5 ${selectedFormat === 'audio' ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span className="text-xs">Audio Call</span>
                  </button>

                  <button
                    onClick={() => setSelectedFormat('video')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedFormat === 'video'
                        ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <Video className={`w-5 h-5 ${selectedFormat === 'video' ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span className="text-xs">Video Call</span>
                  </button>

                  <button
                    onClick={() => setSelectedFormat('chat')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedFormat === 'chat'
                        ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <MessageSquare className={`w-5 h-5 ${selectedFormat === 'chat' ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span className="text-xs">Counsellor Chat</span>
                  </button>

                  <button
                    onClick={() => setSelectedFormat('appointment')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedFormat === 'appointment'
                        ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <Calendar className={`w-5 h-5 ${selectedFormat === 'appointment' ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span className="text-xs">Center Visit</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Auto-Generated Pre-Transfer Brief */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Auto-Generated Counsellor Pre-Transfer Brief
                    </span>
                  </div>
                  <span className="text-[10px] bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded-full">
                    Saves Family Retelling
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Learner Profile:</span>
                    <span className="font-semibold text-slate-800">
                      {escalationBrief.learnerName} ({escalationBrief.education})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Target Trade:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedTrade.name}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block">Primary Parent Concerns:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {escalationBrief.parentConcerns.map((c, i) => (
                        <span key={i} className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md text-[11px] font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block">Verified Evidence Already Reviewed:</span>
                    <p className="text-slate-600 mt-0.5">
                      Starting salary (₹14k-₹22k), 81% placement rate, 2-year lateral entry to Polytechnic.
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block">Unresolved Queries to Address:</span>
                    <p className="text-brand-900 font-medium bg-amber-50/80 p-2 rounded-lg border border-amber-200 text-xs">
                      • Specific Railway / DISCOM vacancy calendar in {profile.location.state}
                      <br />
                      • Local Government ITI admission deadlines and hostel facility verification
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3: Select Available Counsellor */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  2. Select Regional Counsellor & Available Slot
                </label>
                <div className="space-y-2">
                  {MOCK_COUNSELLORS.slice(0, 2).map((c) => (
                    <div 
                      key={c.id}
                      onClick={() => {
                        setSelectedCounsellor(c);
                        setSelectedSlot(c.availableSlots[0]);
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedCounsellor.id === c.id
                          ? 'border-brand-600 bg-brand-50/50 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={c.avatarUrl} 
                          alt={c.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-brand-200" 
                        />
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm">{c.name}</h5>
                          <p className="text-xs text-slate-500">{c.title} • {c.experienceYears} yrs exp</p>
                          <div className="flex gap-2 text-[11px] text-slate-600 mt-0.5">
                            <span>Languages: {c.languages.join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="inline-block px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-brand-700">
                          {c.availableSlots[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!confirmed && (
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Free Government Skill Counselling Initiative</span>
            </span>

            <div className="flex gap-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Confirm & Transfer Brief</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
