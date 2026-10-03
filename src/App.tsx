import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SourceModal } from './components/common/SourceModal';
import { EscalationModal } from './components/common/EscalationModal';
import { AuthModal } from './components/common/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { FamilyAssessmentWizard } from './pages/FamilyAssessmentWizard';
import { FamilyOnboardingPage } from './pages/FamilyOnboardingPage';
import { AICounsellingPage } from './pages/AICounsellingPage';
import { TradesPage } from './pages/TradesPage';
import { CareerPathwaySimulatorPage } from './pages/CareerPathwaySimulatorPage';
import { TradeComparePage } from './pages/TradeComparePage';
import { MarketInsightsPage } from './pages/MarketInsightsPage';
import { FamilyAlignmentPage } from './pages/FamilyAlignmentPage';
import { HumanCounsellorsPage } from './pages/HumanCounsellorsPage';
import { FamilySummaryPage } from './pages/FamilySummaryPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function AppContent() {
  const [activePage, setActivePage] = useState<string>('home');
  const { isAuthModalOpen, setIsAuthModalOpen } = useApp();

  // Ensure scroll position is cleanly reset to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activePage]);

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'assessment':
        return <FamilyAssessmentWizard setActivePage={setActivePage} />;
      case 'onboarding':
        return <FamilyOnboardingPage setActivePage={setActivePage} />;
      case 'counselling':
        return <AICounsellingPage setActivePage={setActivePage} />;
      case 'trades':
        return <TradesPage setActivePage={setActivePage} />;
      case 'pathways':
        return <CareerPathwaySimulatorPage setActivePage={setActivePage} />;
      case 'compare':
        return <TradeComparePage setActivePage={setActivePage} />;
      case 'market':
        return <MarketInsightsPage setActivePage={setActivePage} />;
      case 'alignment':
        return <FamilyAlignmentPage setActivePage={setActivePage} />;
      case 'counsellors':
        return <HumanCounsellorsPage setActivePage={setActivePage} />;
      case 'summary':
        return <FamilySummaryPage setActivePage={setActivePage} />;
      case 'admin':
        return <AdminDashboardPage setActivePage={setActivePage} />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans selection:bg-brand-500 selection:text-white">
      {/* Global Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page Body */}
      <main className="flex-1 pb-16 md:pb-0">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals */}
      <SourceModal />
      <EscalationModal />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={() => setActivePage('assessment')}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
