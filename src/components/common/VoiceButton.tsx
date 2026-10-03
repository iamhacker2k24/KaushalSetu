import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Props {
  textToRead: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const VoiceButton: React.FC<Props> = ({ 
  textToRead, 
  label = 'Listen', 
  className = '',
  size = 'sm'
}) => {
  const { playTTS, stopTTS, isSpeaking } = useApp();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopTTS();
    } else {
      playTTS(textToRead);
    }
  };

  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2.5 py-1 gap-1.5' 
    : 'text-sm px-3.5 py-1.5 gap-2';

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center font-medium rounded-full transition-all duration-200 shadow-sm ${
        isSpeaking 
          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse' 
          : 'bg-white hover:bg-brand-50 text-brand-700 border border-brand-200'
      } ${sizeClasses} ${className}`}
      title={isSpeaking ? 'Stop speaking' : 'Listen to this explanation'}
      aria-label="Read explanation aloud"
    >
      {isSpeaking ? (
        <VolumeX className="w-4 h-4 text-amber-700 animate-bounce" />
      ) : (
        <Volume2 className="w-4 h-4 text-brand-600" />
      )}
      <span>{isSpeaking ? 'Stop' : label}</span>
    </button>
  );
};
