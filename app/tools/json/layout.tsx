import type { ReactNode } from 'react';

export { metadata } from './metadata';

export default function JsonLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
