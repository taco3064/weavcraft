import { useMemo } from 'react';

export const useUrlValidation = (url?: string) =>
  useMemo(() => {
    try {
      return Boolean(new URL(url || ''));
    } catch (e) {
      return false;
    }
  }, [url]);
