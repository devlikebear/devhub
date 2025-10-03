import type { ReactNode } from 'react';

export { metadata } from './metadata';

export default function UrlLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
