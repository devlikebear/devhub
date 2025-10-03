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
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 dark:from-blue-500/90 dark:to-purple-500/90 dark:hover:from-blue-600/90 dark:hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/50',
    secondary: 'bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 border border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/30 text-gray-900 dark:text-white',
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
