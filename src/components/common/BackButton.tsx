import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface BackButtonProps {
  label?: string;
  targetPage?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'subtle' | 'ghost' | 'solid' | 'pill' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  title?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label = 'Back',
  targetPage,
  onClick,
  className = '',
  variant = 'subtle',
  size = 'sm',
  ariaLabel = 'Go back to previous screen',
  title
}) => {
  const { goBack, setActivePage } = useApp();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else if (targetPage) {
      setActivePage(targetPage);
    } else {
      goBack();
    }
  };

  const variantStyles = {
    subtle: 'bg-white hover:bg-brand-50 border border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 shadow-2xs',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent',
    solid: 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs border border-slate-800',
    pill: 'bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-full shadow-2xs',
    white: 'bg-white/95 hover:bg-white text-slate-800 hover:text-brand-700 shadow-sm border border-slate-200/90'
  }[variant];

  const sizeStyles = {
    xs: 'px-2 py-1 text-[11px] gap-1 rounded-lg',
    sm: 'px-2.5 sm:px-3 py-1.5 text-xs gap-1.5 rounded-xl',
    md: 'px-3.5 py-2 text-xs sm:text-sm gap-2 rounded-xl',
    lg: 'px-4 py-2.5 text-sm gap-2 rounded-xl'
  }[size];

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4 h-4'
  }[size];

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      title={title || (label ? `Back (${label})` : 'Go back')}
      className={`inline-flex items-center font-bold transition-all duration-150 group cursor-pointer select-none active:scale-95 shrink-0 ${variantStyles} ${sizeStyles} ${className}`}
    >
      <ArrowLeft className={`${iconSizes} transition-transform duration-200 group-hover:-translate-x-1 shrink-0 text-slate-500 group-hover:text-brand-600`} />
      {label && <span className="truncate">{label}</span>}
    </button>
  );
};
