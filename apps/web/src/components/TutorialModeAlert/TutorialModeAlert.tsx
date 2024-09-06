import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Fade from '@mui/material/Fade';
import { Trans } from 'next-i18next';

import { useTutorialMode } from '~web/hooks';

export default function TutorialModeAlert() {
  const isTutorialMode = useTutorialMode();

  return !isTutorialMode ? null : (
    <Fade in timeout={1200}>
      <Alert severity="info">
        <AlertTitle>
          <Trans i18nKey="tutorial:ttl-tutorial-notice" />
        </AlertTitle>

        <Trans i18nKey="tutorial:msg-tutorial-notice" />
      </Alert>
    </Fade>
  );
}
