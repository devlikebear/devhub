import type { ReactNode } from 'react';

export { metadata } from './metadata';

export default function ColorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
