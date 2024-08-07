import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { Trans } from 'next-i18next';

import type { BaseSettingProps } from './UserSettings.types';

export default function Profile({ className, disabled }: BaseSettingProps) {
  return (
    <>
      <AccordionDetails className={className}>User Profile</AccordionDetails>

      <AccordionActions>
        <Button variant="text" size="large" color="inherit" disabled={disabled}>
          <Trans i18nKey="btn-cancel" />
        </Button>

        <Button variant="text" size="large" color="primary" disabled={disabled}>
          <Trans i18nKey="btn-update" />
        </Button>
      </AccordionActions>
    </>
  );
}
