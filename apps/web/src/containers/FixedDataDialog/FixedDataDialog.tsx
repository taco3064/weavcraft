import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Core from '@weavcraft/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepContent from '@mui/material/StepContent';
import Stepper from '@mui/material/Stepper';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { useFixedData } from './FixedDataDialog.hooks';

import {
  BuildStepEnum,
  type FixedDataDialogProps,
} from './FixedDataDialog.types';

export default function FixedDataDialog({ config }: FixedDataDialogProps) {
  const { t } = useTranslation();
  const { data, dataPropName } = useFixedData(config);

  const [activeStep, setActiveStep] = useState(BuildStepEnum.DataStructure);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonGroup fullWidth color="error" size="large" variant="contained">
        <Button onClick={() => setOpen(true)}>
          {t('widgets:btn-fixed-data')}
        </Button>

        <Button fullWidth={false} sx={{ opacity: 0.8 }}>
          <Core.Icon code="faTrash" />
        </Button>
      </ButtonGroup>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          <Core.Icon code="faEdit" />
          {t('widgets:ttl-source-mode.Fixed')}
        </DialogTitle>

        <DialogContent>
          <Stepper nonLinear orientation="vertical">
            <Step active={activeStep === BuildStepEnum.DataStructure}>
              <StepButton
                onClick={() => setActiveStep(BuildStepEnum.DataStructure)}
              >
                {t('widgets:ttl-data-structure')}
              </StepButton>

              <StepContent>Data Structure</StepContent>
            </Step>

            <Step active={activeStep === BuildStepEnum.DataView}>
              <StepButton onClick={() => setActiveStep(BuildStepEnum.DataView)}>
                {t('widgets:btn-fixed-data')}
              </StepButton>

              <StepContent>Data View</StepContent>
            </Step>
          </Stepper>
        </DialogContent>

        <ButtonGroup
          fullWidth
          variant="contained"
          size="large"
          component={DialogActions}
        >
          <Button
            color="inherit"
            startIcon={<Core.Icon code="faClose" />}
            onClick={() => setOpen(false)}
          >
            {t('btn-cancel')}
          </Button>

          <Button color="secondary" startIcon={<Core.Icon code="faCheck" />}>
            {t('btn-confirm')}
          </Button>
        </ButtonGroup>
      </Dialog>
    </>
  );
}
