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
  const baseClasses = 'backdrop-blur-md rounded-lg font-semibold transition-all duration-300 ease-out active:scale-95 will-change-transform relative overflow-hidden';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 dark:from-blue-500/90 dark:to-purple-500/90 dark:hover:from-blue-600/90 dark:hover:to-purple-600/90 text-white shadow-lg hover:shadow-2xl hover:shadow-purple-500/40 dark:hover:shadow-purple-500/60 hover:-translate-y-0.5',
    secondary: 'bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 border border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/30 text-gray-900 dark:text-white hover:shadow-lg hover:-translate-y-0.5',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
    </button>
  );
}
