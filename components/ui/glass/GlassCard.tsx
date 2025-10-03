import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  const baseClasses = 'backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg';
  const hoverClasses = hover
    ? 'transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]'
    : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
