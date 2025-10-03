import type { ReactNode } from 'react';

export { metadata } from './metadata';

export default function JwtLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
