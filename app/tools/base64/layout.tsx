import type { ReactNode } from 'react';

export { metadata } from './metadata';

export default function Base64Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
