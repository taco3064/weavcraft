import { createContext, useContext } from 'react';

export const TutorialModeContext = createContext<boolean>(false);
export const useTutorialMode = () => useContext(TutorialModeContext);
