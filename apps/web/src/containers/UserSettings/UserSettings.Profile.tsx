import Button from '@mui/material/Button';
import { Trans } from 'react-i18next';
import { createPortal } from 'react-dom';

export default function Profile() {
  const container = global.document?.getElementById('profile');

  return (
    <>
      User Profile
      {container &&
        createPortal(
          <>
            <Button variant="text" size="large" color="inherit">
              <Trans i18nKey="app:btn-cancel" />
            </Button>

            <Button variant="text" size="large" color="primary">
              <Trans i18nKey="app:btn-update" />
            </Button>
          </>,
          container
        )}
    </>
  );
}
