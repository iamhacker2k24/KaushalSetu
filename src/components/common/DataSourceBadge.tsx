import React from 'react';
import { ShieldCheck, Info, Database } from 'lucide-react';
import { SourceMetadata } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  source: SourceMetadata;
  showDetailsButton?: boolean;
  className?: string;
}

export const DataSourceBadge: React.FC<Props> = ({ source, showDetailsButton = true, className = '' }) => {
  const { setActiveSourceModal } = useApp();

  const getBadgeStyle = () => {
    switch (source.verificationStatus) {
      case 'Verified Government':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Verified Industry':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Latest Portal Aggregate':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Demo Data (Prototype)':
      default:
        return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getBadgeStyle()} ${className}`}>
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>{source.verificationStatus}</span>
      <span className="text-slate-400">•</span>
      <span className="text-slate-600 font-normal">{source.agencyName.split('(')[0].trim()}</span>
      {showDetailsButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveSourceModal(source);
          }}
          className="ml-1 underline text-brand-700 hover:text-brand-900 inline-flex items-center gap-0.5"
          title="View full audit methodology and timestamp"
        >
          <Info className="w-3 h-3" />
          <span>View Source</span>
        </button>
      )}
    </div>
  );
};
