import type { ParsedUrlQuery } from 'querystring';

export function getQuery(query: ParsedUrlQuery, url: string) {
  const queryKey = Object.keys(query).find(
    (key) => url === (Array.isArray(query[key]) ? `[...${key}]` : `[${key}]`)
  );

  const queryValue = query[queryKey as string];

  if (queryKey && queryValue) {
    return Array.isArray(queryValue)
      ? {
          key: queryKey,
          value: queryValue,
        }
      : {
          key: queryKey,
          value: queryValue,
        };
  }
}
