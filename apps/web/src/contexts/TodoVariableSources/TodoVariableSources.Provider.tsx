import { useMemo } from 'react';

import { TodoVariableSourcesContext } from './TodoVariableSources.hooks';
import type { TodoVariableSourcesProviderProps } from './TodoVariableSources.types';

export default function TodoVariableSourcesProvider({
  children,
  widgets,
}: TodoVariableSourcesProviderProps) {
  const value = useMemo(
    () => Object.fromEntries(widgets.map((widget) => [widget.id, widget])),
    [widgets]
  );

  return (
    <TodoVariableSourcesContext.Provider value={value}>
      {children}
    </TodoVariableSourcesContext.Provider>
  );
}
