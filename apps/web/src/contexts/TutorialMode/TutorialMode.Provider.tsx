import { TutorialModeContext } from './TutorialMode.hooks';
import type { TutorialModeProviderProps } from './TutorialMode.types';

export default function TutorialModeProvider({
  children,
  enabled = false,
}: TutorialModeProviderProps) {
  return (
    <TutorialModeContext.Provider value={enabled}>
      {children}
    </TutorialModeContext.Provider>
  );
}
