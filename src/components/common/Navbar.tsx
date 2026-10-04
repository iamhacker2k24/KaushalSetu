import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  PhoneCall, 
  ShieldCheck, 
  Globe, 
  Menu, 
  X, 
  Layers, 
  BookOpen, 
  BarChart3, 
  ChevronDown, 
  Sparkles, 
  UserCheck,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../types';

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
}

interface NavLinkItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Navbar: React.FC<Props> = ({ activePage, setActivePage }) => {
  const { language, setLanguage, t, setActiveEscalationModal, profile, setIsAuthModalOpen, currentUser, goBack, canGoBack } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or touch
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (langRef.current && !langRef.current.contains(target)) {
        setLangDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(target)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Close dropdowns and drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangDropdownOpen(false);
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Primary desktop nav links (kept focused to prevent horizontal overflow)
  const primaryNavLinks: NavLinkItem[] = [
    { id: 'home', label: t.navHome, icon: Compass },
    { id: 'trades', label: t.navExplore, icon: BookOpen },
    { id: 'pathways', label: t.navPathways, icon: Layers },
    { id: 'market', label: 'Market', icon: TrendingUp }
  ];

  // Secondary tools housed in "More ▾" dropdown on desktop
  const secondaryNavLinks: NavLinkItem[] = [
    { id: 'assessment', label: 'Joint Assessment', icon: Sparkles, badge: 'Workflow' },
    { id: 'counselling', label: 'AI Counselling', icon: MessageSquare, badge: 'Family' },
    { id: 'compare', label: 'Compare Trades', icon: Layers },
    { id: 'alignment', label: 'Family Alignment', icon: Users },
    { id: 'counsellors', label: 'Human Counsellors', icon: PhoneCall },
    { id: 'admin', label: 'Admin Portal', icon: BarChart3 }
  ];

  const allNavLinks: NavLinkItem[] = [
    { id: 'home', label: t.navHome, icon: Compass },
    { id: 'assessment', label: 'Joint Assessment', icon: Sparkles, badge: 'Workflow' },
    { id: 'counselling', label: 'AI Counselling', icon: MessageSquare, badge: 'Family' },
    { id: 'trades', label: t.navExplore, icon: BookOpen },
    { id: 'pathways', label: t.navPathways, icon: Layers },
    { id: 'market', label: 'Market Insights', icon: TrendingUp },
    { id: 'compare', label: 'Compare Trades', icon: Layers },
    { id: 'alignment', label: 'Family Alignment', icon: Users },
    { id: 'counsellors', label: 'Human Counsellors', icon: PhoneCall },
    { id: 'admin', label: 'Admin Portal', icon: BarChart3 }
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    setLangDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLangSelect = (code: LanguageCode) => {
    setLanguage(code);
    setLangDropdownOpen(false);
  };

  const isMoreActive = secondaryNavLinks.some(link => link.id === activePage);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs w-full">
        {/* Top Trust Ribbon */}
        <div className="bg-brand-900 text-white text-[10px] sm:text-[11px] font-medium py-1 px-3 sm:px-6 lg:px-8 flex justify-between items-center tracking-wide w-full overflow-hidden">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate max-w-[60%] sm:max-w-none">
            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="truncate">{t.trustIndicator}</span>
            <span className="hidden lg:inline text-brand-300">• Powered by Verified DGT & NSDC Benchmarks</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-brand-200 shrink-0">
            <button 
              type="button"
              onClick={() => setActiveEscalationModal(true)}
              className="hover:text-white flex items-center gap-1 font-semibold text-amber-300 cursor-pointer"
            >
              <PhoneCall className="w-3 h-3 shrink-0" />
              <span className="hidden sm:inline">National Career Helpline </span>
              <span>1800-599-0019</span>
            </button>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 w-full">
          
          {/* Brand Logo & Back Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile / Tablet Back Button */}
            {activePage !== 'home' && (
              <button
                type="button"
                onClick={goBack}
                className="lg:hidden p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-brand-50 hover:border-brand-300 text-slate-700 hover:text-brand-700 transition-all shadow-2xs shrink-0 cursor-pointer flex items-center justify-center active:scale-95"
                title="Go back to previous page"
                aria-label="Go back to previous page"
              >
                <ArrowLeft className="w-4 h-4 text-slate-700" />
              </button>
            )}

            {/* Brand Logo */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-800 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 48 48" fill="none">
                  <path d="M8 36C14 26 22 22 28 22C34 22 40 26 44 36" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="28" cy="14" r="7" fill="#10B981" />
                  <path d="M16 16C16 12 21 8 28 8C35 8 40 12 40 16" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  <path d="M6 40H44" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight font-display">
                    Kaushal<span className="text-brand-600">Setu</span>
                  </span>
                  <span className="hidden sm:inline-block text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full uppercase border border-emerald-300">
                    Gov Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Quick Back Button */}
            {activePage !== 'home' && (
              <button
                type="button"
                onClick={goBack}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-brand-50 hover:border-brand-300 text-slate-700 hover:text-brand-700 text-xs font-bold transition-all shadow-2xs group cursor-pointer shrink-0 ml-1 active:scale-95"
                title="Go back to previous page"
                aria-label="Go back to previous page"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1 text-slate-500 group-hover:text-brand-600" />
                <span>Back</span>
              </button>
            )}
          </div>

          {/* Desktop Navigation Links (Visible on lg and above) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            {primaryNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-brand-50 text-brand-700 font-bold shadow-2xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{link.label}</span>
                </button>
              );
            })}

            {/* "More ▾" Dropdown for secondary features */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                id="navbar-more-dropdown-btn"
                onClick={() => {
                  setMoreDropdownOpen(prev => !prev);
                  setLangDropdownOpen(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
                  isMoreActive 
                    ? 'bg-brand-50 text-brand-700 font-bold shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
                aria-expanded={moreDropdownOpen}
                aria-haspopup="true"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-brand-600' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div 
                  id="navbar-more-dropdown-menu"
                  className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-fadeIn"
                >
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    Explore More Tools
                  </div>
                  {secondaryNavLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = activePage === link.id;
                    return (
                      <button
                        key={link.id}
                        type="button"
                        onClick={() => handleNavClick(link.id)}
                        className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          isActive ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                          <span className="whitespace-nowrap">{link.label}</span>
                        </div>
                        {link.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-md font-bold bg-brand-100 text-brand-700 uppercase">
                            {link.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Items: Language, Account, Single Primary CTA, Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                id="navbar-lang-dropdown-btn"
                onClick={() => {
                  setLangDropdownOpen(prev => !prev);
                  setMoreDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs whitespace-nowrap cursor-pointer"
                title="Change Regional Language"
                aria-label="Change Regional Language"
                aria-expanded={langDropdownOpen}
                aria-haspopup="true"
              >
                <Globe className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span className="hidden xl:inline">
                  {language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : 'বাংলা'}
                </span>
                <span className="xl:hidden font-bold">
                  {language === 'en' ? 'EN' : language === 'hi' ? 'हि' : 'বা'}
                </span>
                <ChevronDown className={`w-3 h-3 text-slate-400 shrink-0 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180 text-brand-600' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div 
                  id="navbar-lang-dropdown-menu"
                  className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-fadeIn"
                >
                  <button
                    type="button"
                    onClick={() => handleLangSelect('en')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      language === 'en' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLangSelect('hi')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      language === 'hi' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>हिन्दी (Hindi)</span>
                    {language === 'hi' && <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLangSelect('bn')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between cursor-pointer ${
                      language === 'bn' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>বাংলা (Bengali)</span>
                    {language === 'bn' && <span className="w-1.5 h-1.5 rounded-full bg-brand-600"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Account Profile Button */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs whitespace-nowrap cursor-pointer"
              title="Switch user role or view demo profile"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline font-bold">
                {currentUser?.role === 'joint_family' ? 'Joint Family' : currentUser?.role === 'student' ? 'Student' : currentUser?.role === 'parent' ? 'Parent' : 'Admin'}
              </span>
              <span className="sm:hidden font-bold text-xs">Profile</span>
            </button>

            {/* Single High-Converting CTA Button: Start Joint Assessment */}
            <button
              type="button"
              onClick={() => handleNavClick('assessment')}
              className="hidden lg:inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-xs hover:shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Assessment</span>
            </button>

            {/* Mobile / Tablet Hamburger Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(prev => !prev);
                setMoreDropdownOpen(false);
                setLangDropdownOpen(false);
              }}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop & Drawer Menu - Placed outside <header> to avoid backdrop-filter stacking context traps */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 top-[88px] sm:top-[96px] bg-slate-900/40 backdrop-blur-xs z-40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide Down Sheet */}
          <div className="fixed top-[88px] sm:top-[96px] left-0 right-0 max-h-[calc(100vh-6.5rem)] overflow-y-auto bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-2xl z-50 animate-fadeIn">
            
            {/* Quick Back Option in Mobile Menu */}
            {activePage !== 'home' && (
              <button
                type="button"
                onClick={() => {
                  goBack();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-2.5 bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer group active:scale-95"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 text-brand-600 transition-transform group-hover:-translate-x-1" />
                  <span>Go Back to Previous Screen</span>
                </div>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-brand-700 font-bold border border-brand-200 shadow-2xs">
                  Back
                </span>
              </button>
            )}

            {/* Profile Card */}
            <div className="p-3.5 bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-100 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-900">{profile.learner.name} (Learner)</p>
                <p className="text-[11px] text-slate-500">{profile.location.district}, {profile.location.state}</p>
              </div>
              <button 
                type="button"
                onClick={() => handleNavClick('onboarding')}
                className="px-2.5 py-1 bg-white text-brand-700 border border-brand-200 rounded-lg text-xs font-bold shadow-2xs hover:bg-brand-50 cursor-pointer"
              >
                Edit Profile
              </button>
            </div>

            {/* Navigation Links Grid */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">Navigation</span>
              {allNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-brand-600 text-white shadow-xs font-bold' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isActive ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-700'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Language Switcher inside Mobile Drawer */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">Preferred Language</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleLangSelect('en')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    language === 'en' 
                      ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-2xs' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => handleLangSelect('hi')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    language === 'hi' 
                      ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-2xs' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  type="button"
                  onClick={() => handleLangSelect('bn')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    language === 'bn' 
                      ? 'border-brand-600 bg-brand-50 text-brand-700 shadow-2xs' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  বাংলা
                </button>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('counselling')}
                className="flex-1 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-700 text-white rounded-xl text-xs font-bold text-center shadow-xs cursor-pointer"
              >
                Start Counselling
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('summary')}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold text-center cursor-pointer"
              >
                Family Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Visible only on mobile phones: < md) */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1 flex justify-around items-center"
      >
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold transition-colors ${
            activePage === 'home' ? 'text-brand-600' : 'text-slate-500'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNavClick('trades')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold transition-colors ${
            activePage === 'trades' ? 'text-brand-600' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span>Explore</span>
        </button>

        <button
          onClick={() => handleNavClick('counselling')}
          className="flex flex-col items-center py-1.5 px-3 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-700 shadow-md -translate-y-2 hover:shadow-lg active:scale-95 transition-all"
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span>Counselling</span>
        </button>

        <button
          onClick={() => handleNavClick('market')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold transition-colors ${
            activePage === 'market' ? 'text-brand-600' : 'text-slate-500'
          }`}
        >
          <TrendingUp className="w-5 h-5 mb-0.5" />
          <span>Market</span>
        </button>

        <button
          onClick={() => handleNavClick('alignment')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold transition-colors ${
            activePage === 'alignment' ? 'text-brand-600' : 'text-slate-500'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span>Family</span>
        </button>
      </nav>
    </>
  );
};
