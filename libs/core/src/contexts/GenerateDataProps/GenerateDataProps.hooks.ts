import { createContext, useContext, useState } from 'react';
import type { JsonObject } from 'type-fest';

//* - Context
export const GenerateDataContext = createContext<
  ReturnType<typeof useState<any>>
>([undefined, () => undefined]);

//* - Custom Hooks
export function useGenerateData<D extends JsonObject>(propData?: D) {
  const dataState = useState<D>(propData!);
  const type: 'props' | 'context' = propData ? 'props' : 'context';

  const [data, setData] = useContext(GenerateDataContext) as ReturnType<
    typeof useState<D>
  >;

  return type === 'props'
    ? {
        type,
        data: propData!,
        onChange: dataState[1],
      }
    : {
        type,
        data: data!,
        onChange: setData,
      };
}
