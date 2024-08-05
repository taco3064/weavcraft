import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import type { ComponentType, ReactNode } from 'react';

export function withQueryClientProvider<P extends { children: ReactNode }>(
  TargetComponent: ComponentType<P>
) {
  const QUERY_CLIENT = new QueryClient();

  return function QueryClientWrapper({ children, ...props }: P) {
    return (
      <QueryClientProvider client={QUERY_CLIENT}>
        <SessionProvider>
          <TargetComponent {...(props as P)}>{children}</TargetComponent>
        </SessionProvider>
      </QueryClientProvider>
    );
  };
}
