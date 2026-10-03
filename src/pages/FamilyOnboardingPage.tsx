import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  HeartHandshake, 
  MapPin, 
  Globe, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole, AcademicLevel, ParentConcernCategory, RegionType, LanguageCode } from '../types';
import { CONCERN_CATEGORIES } from '../data/mockData';

interface Props {
  setActivePage: (page: string) => void;
}

export const FamilyOnboardingPage: React.FC<Props> = ({ setActivePage }) => {
  const { profile, setProfile, setLanguage } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [userRole, setUserRole] = useState<UserRole>(profile.userRole);
  
  // Learner state
  const [learnerName, setLearnerName] = useState(profile.learner.name);
  const [learnerAge, setLearnerAge] = useState(profile.learner.age);
  const [education, setEducation] = useState<AcademicLevel>(profile.learner.education);
  const [academicStream, setAcademicStream] = useState('Science & Math');
  const [skillsInput, setSkillsInput] = useState('Hands-on wiring, basic mechanics');
  const [interestsInput, setInterestsInput] = useState('Electric motors, Solar power, Tech gadgets');
  const [learnerLocationPref, setLearnerLocationPref] = useState<'home_district' | 'within_state' | 'metro_ready'>('home_district');
  const [careerGoal, setCareerGoal] = useState(profile.learner.careerGoal);

  // Parent state
  const [relationship, setRelationship] = useState<'Father' | 'Mother' | 'Guardian' | 'Elder Sibling'>(profile.parent.relationship);
  const [expectations, setExpectations] = useState<string>('Monthly income ₹20,000+ within 2 years, respect in village');
  const [selectedConcerns, setSelectedConcerns] = useState<ParentConcernCategory[]>(profile.parent.primaryConcerns);
  const [minIncome, setMinIncome] = useState(profile.parent.expectedMinIncome);
  const [securityPriority, setSecurityPriority] = useState<'critical' | 'moderate' | 'flexible'>(profile.parent.jobSecurityPriority);
  const [furtherEducationPref, setFurtherEducationPref] = useState(profile.parent.furtherEducationDesire);

  // Location state
  const [stateName, setStateName] = useState(profile.location.state);
  const [district, setDistrict] = useState(profile.location.district);
  const [block, setBlock] = useState(profile.location.subDistrictOrBlock || 'Pindra');
  const [regionType, setRegionType] = useState<RegionType>(profile.location.type);

  // Language state
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(profile.language);

  const steps = [
    { num: 1, title: 'Mode', icon: Users },
    { num: 2, title: 'Learner', icon: GraduationCap },
    { num: 3, title: 'Parent', icon: HeartHandshake },
    { num: 4, title: 'Location', icon: MapPin },
    { num: 5, title: 'Language', icon: Globe },
    { num: 6, title: 'Review', icon: CheckCircle }
  ];

  const toggleConcern = (concern: ParentConcernCategory) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(prev => prev.filter(c => c !== concern));
    } else {
      setSelectedConcerns(prev => [...prev, concern]);
    }
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Save profile
      setProfile(prev => ({
        ...prev,
        userRole,
        learner: {
          ...prev.learner,
          name: learnerName,
          age: Number(learnerAge),
          education,
          careerGoal,
          skills: skillsInput.split(',').map(s => s.trim()),
          interests: interestsInput.split(',').map(s => s.trim()),
          preferredLocation: learnerLocationPref
        },
        parent: {
          ...prev.parent,
          relationship,
          mainExpectations: expectations.split(',').map(e => e.trim()),
          primaryConcerns: selectedConcerns,
          expectedMinIncome: Number(minIncome),
          jobSecurityPriority: securityPriority,
          furtherEducationDesire: furtherEducationPref
        },
        location: {
          state: stateName,
          district,
          subDistrictOrBlock: block,
          type: regionType
        },
        language: selectedLang
      }));
      setLanguage(selectedLang);
      setActivePage('counselling');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4 space-y-2.5 sm:space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200">
              Onboarding
            </span>
            <h1 className="text-base sm:text-xl font-extrabold text-slate-900 font-display">
              Set Up Your Family Counselling Profile
            </h1>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Tailor verified government career benchmarks to your family's exact goals and concerns.
          </p>
        </div>

        {/* Compact Progress indicator */}
        <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200 shrink-0">
          Step {currentStep} of 6
        </span>
      </div>

      {/* Step Progress Bar (Clean & Compact) */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-slate-200 shadow-2xs">
        {/* Mobile View */}
        <div className="sm:hidden space-y-1">
          <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
            <span>{steps[currentStep - 1].title}</span>
            <span className="text-brand-600">{Math.round((currentStep / 6) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-brand-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Tablet/Desktop View */}
        <div className="hidden sm:grid sm:grid-cols-6 gap-1.5">
          {steps.map((s) => {
            const isCompleted = s.num < currentStep;
            const isCurrent = s.num === currentStep;
            return (
              <div 
                key={s.num} 
                onClick={() => isCompleted && setCurrentStep(s.num)}
                className={`text-center cursor-pointer select-none transition-all flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg ${
                  isCurrent 
                    ? 'bg-brand-50 text-brand-800 font-bold border border-brand-200' 
                    : isCompleted 
                    ? 'text-emerald-700 hover:bg-slate-50' 
                    : 'text-slate-400 opacity-60'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  isCurrent 
                    ? 'bg-brand-600 text-white' 
                    : isCompleted 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {isCompleted ? <CheckCircle className="w-3 h-3" /> : s.num}
                </div>
                <span className="text-xs truncate">
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Card Body (Fits on one screen without scrolling) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200 shadow-card">
        
        {/* STEP 1: Choose Role */}
        {currentStep === 1 && (
          <div className="space-y-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Step 1: Who is participating today?</h2>
              <p className="text-[11px] text-slate-500">
                KaushalSetu works best when both the student and parent participate together.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div 
                onClick={() => setUserRole('both')}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  userRole === 'both' 
                    ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-1 ring-brand-200' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-sm">Both Together</h3>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Student and parent explore careers and address worries jointly in real-time.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => setUserRole('learner')}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  userRole === 'learner' 
                    ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-1 ring-brand-200' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Learner / Student</h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    I am a student exploring vocational trades to prepare a plan for my parents.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => setUserRole('parent')}
                className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  userRole === 'parent' 
                    ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-1 ring-brand-200' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Parent / Guardian</h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    I am a parent seeking verified information about job security, income, and safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Learner Profile */}
        {currentStep === 2 && (
          <div className="space-y-2.5">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Step 2: Learner Details</h2>
              <p className="text-[11px] text-slate-500">
                Academic baseline and natural technical inclinations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">Student Full Name</label>
                <input
                  type="text"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs"
                  placeholder="e.g. Aarav Sharma"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">Age</label>
                <input
                  type="number"
                  value={learnerAge}
                  onChange={(e) => setLearnerAge(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs"
                  placeholder="17"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">Current Academic Level</label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value as AcademicLevel)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs bg-white"
                >
                  <option value="Class 8 Pass">Class 8 Pass</option>
                  <option value="Class 10 (Secondary)">Class 10 Pass (Secondary)</option>
                  <option value="Class 12 (Arts)">Class 12 (Arts)</option>
                  <option value="Class 12 (Science)">Class 12 (Science with Maths)</option>
                  <option value="Class 12 (Commerce)">Class 12 (Commerce)</option>
                  <option value="Class 12 (Vocational)">Class 12 (Vocational)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">Academic Stream / Strength</label>
                <input
                  type="text"
                  value={academicStream}
                  onChange={(e) => setAcademicStream(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs"
                  placeholder="e.g. Science, Mathematics 72%"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">Interests & Hobbies</label>
                <input
                  type="text"
                  value={interestsInput}
                  onChange={(e) => setInterestsInput(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs"
                  placeholder="e.g. Electric circuits, repairing bikes, solar"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">Career Goal / Dream</label>
                <input
                  type="text"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs"
                  placeholder="e.g. Electrical Supervisor or Solar Business"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Parent Profile & Concerns */}
        {currentStep === 3 && (
          <div className="space-y-2.5">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Step 3: Parent / Guardian Priorities & Concerns</h2>
              <p className="text-[11px] text-slate-500">
                Every parent wants security, safety, and respect for their child. Select your honest concerns.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">Relationship to Student</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs bg-white"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Elder Sibling">Elder Sibling</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">Expected Minimum Income (Monthly INR)</label>
                <input
                  type="number"
                  value={minIncome}
                  onChange={(e) => setMinIncome(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs"
                  placeholder="18000"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                  Select Primary Concerns / Worries (Tap all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {CONCERN_CATEGORIES.map((c, i) => {
                    const isSelected = selectedConcerns.includes(c.category);
                    return (
                      <div
                        key={i}
                        onClick={() => toggleConcern(c.category)}
                        className={`p-2 rounded-lg border cursor-pointer transition-all flex items-center gap-1.5 select-none ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold shadow-2xs'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-brand-600' : 'text-slate-300'}`} />
                        <span className="text-[11px] truncate leading-tight">{c.category}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="sm:col-span-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={furtherEducationPref}
                    onChange={(e) => setFurtherEducationPref(e.target.checked)}
                    className="w-3.5 h-3.5 text-brand-600 rounded"
                  />
                  <span className="text-[11px] font-semibold text-slate-700">
                    We want the option for our child to pursue an Engineering Diploma or Degree later.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Location */}
        {currentStep === 4 && (
          <div className="space-y-2.5">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Step 4: Location & Mobility</h2>
              <p className="text-[11px] text-slate-500">
                Vocational demand varies across districts. Tell us where your family resides.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">State</label>
                <input
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs"
                  placeholder="Uttar Pradesh"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs"
                  placeholder="Varanasi"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">Sub-district / Block / Town</label>
                <input
                  type="text"
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs"
                  placeholder="Pindra Block"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-0.5 text-[11px]">Area Classification</label>
                <select
                  value={regionType}
                  onChange={(e) => setRegionType(e.target.value as RegionType)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-brand-500 text-xs bg-white"
                >
                  <option value="rural">Rural (Village / Gram Panchayat)</option>
                  <option value="semi-urban">Semi-Urban (Tehsil / Kasba / Small Town)</option>
                  <option value="urban">Urban (District Headquarters / City)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-slate-700 block mb-1 text-[11px]">Work Mobility Preference</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setLearnerLocationPref('home_district')}
                    className={`p-2 rounded-lg border text-center text-xs font-semibold ${
                      learnerLocationPref === 'home_district' ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    Home District
                  </button>
                  <button
                    type="button"
                    onClick={() => setLearnerLocationPref('within_state')}
                    className={`p-2 rounded-lg border text-center text-xs font-semibold ${
                      learnerLocationPref === 'within_state' ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    Anywhere in State
                  </button>
                  <button
                    type="button"
                    onClick={() => setLearnerLocationPref('metro_ready')}
                    className={`p-2 rounded-lg border text-center text-xs font-semibold ${
                      learnerLocationPref === 'metro_ready' ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    Metro Ready
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Regional Language */}
        {currentStep === 5 && (
          <div className="space-y-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Step 5: Choose Preferred Counselling Language</h2>
              <p className="text-[11px] text-slate-500">
                AI responses and voice audio will be rendered in your chosen language.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div
                onClick={() => setSelectedLang('hi')}
                className={`p-3.5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  selectedLang === 'hi' 
                    ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-1 ring-brand-200' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="text-2xl shrink-0">🇮🇳</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">हिन्दी (Hindi)</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    सभी विवरण और आवाज हिन्दी में।
                  </p>
                </div>
              </div>

              <div
                onClick={() => setSelectedLang('bn')}
                className={`p-3.5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  selectedLang === 'bn' 
                    ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-1 ring-brand-200' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="text-2xl shrink-0">🇮🇳</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">বাংলা (Bengali)</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    পশ্চিমবঙ্গ ও ত্রিপুরার জন্য।
                  </p>
                </div>
              </div>

              <div
                onClick={() => setSelectedLang('en')}
                className={`p-3.5 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  selectedLang === 'en' 
                    ? 'border-brand-600 bg-brand-50/70 shadow-sm ring-1 ring-brand-200' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="text-2xl shrink-0">🌐</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">English</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Standard pan-Indian English guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review & Final Sync */}
        {currentStep === 6 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900">Step 6: Review Profile & Baseline Alignment</h2>
                <p className="text-[11px] text-slate-500">
                  Confirm family parameters before initiating verified AI counselling.
                </p>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 shrink-0">
                Ready for Guidance
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold uppercase tracking-wider text-brand-700 block text-[10px]">
                  Learner Overview
                </span>
                <p><strong>Name:</strong> {learnerName} ({learnerAge} yrs)</p>
                <p><strong>Education:</strong> {education}</p>
                <p><strong>Aspiration:</strong> {careerGoal}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold uppercase tracking-wider text-amber-700 block text-[10px]">
                  Parent Priorities
                </span>
                <p><strong>Role:</strong> {relationship}</p>
                <p><strong>Min Income:</strong> ₹{minIncome.toLocaleString('en-IN')}+ / mo</p>
                <p><strong>Concerns:</strong> {selectedConcerns.length} selected</p>
              </div>

              <div className="sm:col-span-2 p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-emerald-900 text-xs">Initial Family Alignment Baseline</span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-600 bg-white px-2 py-0.5 rounded border border-rose-200">
                    Gap: 39%
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 mt-1">
                  Learner confidence is at <strong>82%</strong>, while {relationship}'s confidence is at <strong>43%</strong> due to anxieties. KaushalSetu will now provide verified evidence to bridge this gap.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons (Always visible on one screen!) */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-3">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-700 hover:from-brand-700 hover:to-indigo-800 text-white font-bold text-xs shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
          >
            <span>{currentStep === 6 ? 'Start Family Counselling Now' : 'Save & Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
