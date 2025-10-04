import { ReactNode, CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}

export default function GlassCard({ children, className = '', hover = true, style }: GlassCardProps) {
  const baseClasses = 'backdrop-blur-xl bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg will-change-transform';
  const hoverClasses = hover
    ? 'transition-all duration-300 ease-out hover:bg-white/90 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.25)]'
    : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} style={style}>
      {children}
    </div>
  );
}
