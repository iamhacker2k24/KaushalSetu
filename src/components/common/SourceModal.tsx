import React from 'react';
import { X, CheckCircle, ExternalLink, Calendar, MapPin, Layers, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SourceModal: React.FC = () => {
  const { activeSourceModal, setActiveSourceModal } = useApp();

  if (!activeSourceModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-50 border-b border-brand-100 p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-700 bg-brand-100 px-2.5 py-0.5 rounded-full">
                {activeSourceModal.verificationStatus}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Data Provenance & Audit Info
              </h3>
            </div>
          </div>
          <button 
            onClick={() => setActiveSourceModal(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm text-slate-700">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Authoritative Agency / Department
            </label>
            <p className="text-base font-semibold text-slate-900 mt-0.5">
              {activeSourceModal.agencyName}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-600" />
                Portal or Report Name
              </label>
              <p className="font-medium text-slate-800 mt-0.5">
                {activeSourceModal.portalOrReport}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-brand-600" />
                Underlying Dataset
              </label>
              <p className="font-medium text-slate-800 mt-0.5">
                {activeSourceModal.datasetName}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Last Verified / Updated
              </label>
              <p className="font-medium text-slate-800 mt-0.5">
                {activeSourceModal.lastUpdated} ({activeSourceModal.dataPeriod})
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-saffron-600" />
                Geographical Coverage
              </label>
              <p className="font-medium text-slate-800 mt-0.5">
                {activeSourceModal.geoCoverage}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Collection Methodology
            </label>
            <p className="text-xs leading-relaxed text-slate-600 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {activeSourceModal.methodology}
            </p>
          </div>

          {activeSourceModal.url && (
            <div className="pt-2">
              <a
                href={activeSourceModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-800 font-medium text-xs hover:underline"
              >
                <span>Visit Official Source Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
          <button
            onClick={() => setActiveSourceModal(null)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            Close Provenance Audit
          </button>
        </div>
      </div>
    </div>
  );
};
