import { ReactNode, ButtonHTMLAttributes } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function GlassButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}: GlassButtonProps) {
  const baseClasses = 'backdrop-blur-md rounded-lg font-semibold transition-all duration-300 active:scale-95';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500/90 to-purple-500/90 hover:from-blue-600/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/50',
    secondary: 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
