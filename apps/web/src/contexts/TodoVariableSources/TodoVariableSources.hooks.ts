import { createContext } from 'react';
import type { TodoVariableSourcesContextValue } from './TodoVariableSources.types';

export const TodoVariableSourcesContext =
  createContext<TodoVariableSourcesContextValue>({});
