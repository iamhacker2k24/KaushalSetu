import React, { useState } from 'react';
import { 
  X, 
  User, 
  Users, 
  ShieldCheck, 
  Phone, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  GraduationCap, 
  HeartHandshake, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthUser } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const { setProfile, profile } = useApp();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<'student' | 'parent' | 'joint_family' | 'admin'>('joint_family');
  
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [phone, setPhone] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('1234');

  if (!isOpen) return null;

  const handleDemoLogin = (role: 'student' | 'parent' | 'joint_family' | 'admin') => {
    let name = 'Aarav Sharma';
    let rel: any = 'Father';
    if (role === 'parent') {
      name = 'Ramesh Sharma';
    } else if (role === 'admin') {
      name = 'Dr. Sunita Sharma (Admin)';
    }

    setProfile(prev => ({
      ...prev,
      userRole: role === 'joint_family' ? 'both' : role === 'student' ? 'learner' : 'parent',
      learner: {
        ...prev.learner,
        name: role === 'parent' ? 'Aarav Sharma' : name
      },
      parent: {
        ...prev.parent,
        relationship: rel
      }
    }));

    onSuccess();
    onClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    // Finished login
    handleDemoLogin(selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-800 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
              KaushalSetu Account
            </span>
            <span className="text-xs text-brand-200">• Government Skill Network</span>
          </div>

          <h3 className="text-xl font-extrabold font-display">
            {authMode === 'login' ? 'Welcome Back to KaushalSetu' : 'Register for Family Career Guidance'}
          </h3>
          <p className="text-xs text-brand-100 mt-1">
            Sign in to unlock interactive student & parent assessments and live market predictions.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-xs text-slate-700">
          
          {/* Quick 1-Click Demo Login Options (Requested: "dd dbeo user") */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                ⚡ Instant One-Click Demo Profiles
              </span>
              <span className="text-[10px] text-brand-600 font-bold">No password required</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('joint_family')}
                className="p-3 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl text-left transition-all group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="p-1.5 rounded-lg bg-brand-600 text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Joint Family</span>
                  <span className="text-[10px] text-slate-500">Aarav (Student) + Father</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('student')}
                className="p-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-left transition-all group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="p-1.5 rounded-lg bg-indigo-600 text-white shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Student Learner</span>
                  <span className="text-[10px] text-slate-500">Class 10 Aspirant</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('parent')}
                className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-left transition-all group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="p-1.5 rounded-lg bg-amber-600 text-white shrink-0 group-hover:scale-105 transition-transform">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Parent / Guardian</span>
                  <span className="text-[10px] text-slate-500">Ramesh Sharma</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-left transition-all group flex items-start gap-2.5 shadow-2xs"
              >
                <div className="p-1.5 rounded-lg bg-slate-900 text-white shrink-0 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Administrator</span>
                  <span className="text-[10px] text-slate-500">Counsellor & State Portal</span>
                </div>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-slate-400 font-semibold uppercase text-[10px]">or mobile OTP login</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleManualSubmit} className="space-y-3">
            {authMode === 'register' && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-500 text-xs"
                  required
                />
              </div>
            )}

            <div>
              <label className="font-bold text-slate-700 block mb-1">Mobile Number (Indian 10-digit)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-400">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-500 text-xs"
                  required
                />
              </div>
            </div>

            {otpSent && (
              <div className="animate-fadeIn space-y-1">
                <label className="font-bold text-slate-700 block">Enter 4-Digit OTP</label>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-500 text-center font-bold text-base tracking-widest text-slate-900 bg-brand-50/30"
                  required
                />
                <div className="flex justify-between items-center text-[10px] pt-1">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-brand-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Change phone number / Back</span>
                  </button>
                  <span className="text-slate-400">Demo OTP: 1234</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{otpSent ? 'Verify OTP & Enter Assessment' : 'Send One-Time Password'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Login / Register */}
          <div className="text-center pt-2 border-t border-slate-100">
            {authMode === 'login' ? (
              <p className="text-slate-500">
                New family on KaushalSetu?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="font-bold text-brand-600 hover:underline"
                >
                  Create Family Account
                </button>
              </p>
            ) : (
              <p className="text-slate-500">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-brand-600 hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
