import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { createElement, type ComponentType, type ReactNode } from 'react';

export function withBaseProvider<P extends { children: ReactNode }>(
  TargetComponent: ComponentType<P>
) {
  const QUERY_CLIENT = new QueryClient();

  return function QueryClientWrapper({ children, ...props }: P) {
    return (
      <QueryClientProvider client={QUERY_CLIENT}>
        <SessionProvider>
          {createElement(TargetComponent, { ...props, children } as P)}
        </SessionProvider>
      </QueryClientProvider>
    );
  };
}
