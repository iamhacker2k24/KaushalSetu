import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  HeartHandshake, 
  MapPin, 
  CheckCircle2, 
  BadgeIndianRupee, 
  GraduationCap, 
  Building2 
} from 'lucide-react';
import { ParentConcernCategory } from '../../types';

interface Props {
  category: ParentConcernCategory;
  className?: string;
  size?: 'sm' | 'md';
}

export const ConcernBadge: React.FC<Props> = ({ category, className = '', size = 'sm' }) => {
  const getIconAndStyle = () => {
    switch (category) {
      case 'Job Security & Permanence':
        return {
          icon: ShieldCheck,
          style: 'bg-emerald-50 text-emerald-800 border-emerald-200'
        };
      case 'Income & Salary Growth':
        return {
          icon: TrendingUp,
          style: 'bg-indigo-50 text-indigo-800 border-indigo-200'
        };
      case 'Social Status & Respect':
        return {
          icon: Award,
          style: 'bg-purple-50 text-purple-800 border-purple-200'
        };
      case 'Workplace Safety & Health':
        return {
          icon: HeartHandshake,
          style: 'bg-rose-50 text-rose-800 border-rose-200'
        };
      case 'Migration vs Local Work':
        return {
          icon: MapPin,
          style: 'bg-amber-50 text-amber-800 border-amber-200'
        };
      case 'Training Quality & Fraud':
        return {
          icon: CheckCircle2,
          style: 'bg-blue-50 text-blue-800 border-blue-200'
        };
      case 'Course Cost & Hidden Fees':
        return {
          icon: BadgeIndianRupee,
          style: 'bg-teal-50 text-teal-800 border-teal-200'
        };
      case 'Higher Education Pathways':
        return {
          icon: GraduationCap,
          style: 'bg-violet-50 text-violet-800 border-violet-200'
        };
      case 'Government Job Opportunities':
      default:
        return {
          icon: Building2,
          style: 'bg-orange-50 text-orange-800 border-orange-200'
        };
    }
  };

  const { icon: Icon, style } = getIconAndStyle();
  const padding = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border shadow-2xs ${style} ${padding} ${className}`}>
      <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      <span>Concern: {category}</span>
    </span>
  );
};
