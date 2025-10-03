import type { ReactNode } from 'react';

export { metadata } from './metadata';

export default function UuidLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
