import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Fade from '@mui/material/Fade';
import { Trans } from 'next-i18next';
import { useRouter } from 'next/router';

import { useTutorialMode } from '~web/contexts';

export default function TutorialModeAlert() {
  const { pathname } = useRouter();
  const isTutorialMode = useTutorialMode();

  return !isTutorialMode ? null : (
    <Fade key={pathname} in timeout={1200}>
      <Alert severity="info">
        <AlertTitle>
          <Trans i18nKey="tutorial:ttl-tutorial-notice" />
        </AlertTitle>

        <Trans i18nKey="tutorial:msg-tutorial-notice" />
      </Alert>
    </Fade>
  );
}
