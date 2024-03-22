import MuiStepper from '@mui/material/Stepper';
import MuiStep from '@mui/material/Step';
import MuiStepLabel from '@mui/material/StepLabel';
import MuiStepContent from '@mui/material/StepContent';
import { isValidElement, useEffect, useMemo, useState } from 'react';

import Card from '../Card';
import Form from '../Form';
import StepperButton from './Stepper.button';
import { WidgetWrapper } from '../../styles';
import type { GenericData } from '../../contexts';

import type {
  StepCardProps,
  StepFormProps,
  StepperProps,
} from './Stepper.types';

export default function Stepper<D extends GenericData>({
  data,
  items,
  maxWidth,
  doneButtonText,
  nextButtonText,
  prevButtonText,
  onDone,
}: StepperProps<D>) {
  const [active, setActive] = useState(0);
  const [stepData, setStepData] = useState<Partial<D>>(data || {});

  const isLastStep = active + 1 === (items?.length || 0);
  const isDone = active === items?.length;

  const handleDone = useMemo(
    () => (!isDone || !onDone ? null : () => onDone(stepData as D)),
    [isDone, stepData, onDone]
  );

  const getActions = (onNextStep?: () => void) => (
    <>
      <StepperButton
        data-testid="StepPrevButton"
        disabled={active === 0}
        icon="faAngleLeft"
        text={prevButtonText}
        onClick={() => setActive(Math.max(0, active - 1))}
      />

      {active >= (items?.length || 0) ? null : (
        <StepperButton
          {...(isLastStep
            ? { icon: 'faCheck', text: doneButtonText }
            : { icon: 'faAngleRight', text: nextButtonText })}
          data-testid="StepNextButton"
          type="submit"
          onClick={onNextStep}
        />
      )}
    </>
  );

  useEffect(() => {
    setActive(0);
  }, [items?.length]);

  useEffect(() => {
    handleDone?.();
  }, [handleDone]);

  return (
    <WidgetWrapper maxWidth={maxWidth}>
      <MuiStepper activeStep={active} orientation="vertical">
        {items?.map(({ children, label, variant }, i) => {
          const props = isValidElement(children) ? children.props : undefined;

          return (
            <MuiStep key={i}>
              <MuiStepLabel>{label}</MuiStepLabel>

              <MuiStepContent>
                {variant === 'form' ? (
                  <Form
                    {...(props as StepFormProps)}
                    action={getActions()}
                    actionJustify="flex-start"
                    data={stepData}
                    onSubmit={(data) => {
                      setStepData({ ...stepData, ...data });
                      setActive(active + 1);
                    }}
                  />
                ) : (
                  <Card
                    {...(props as StepCardProps)}
                    data={stepData}
                    footerAction={getActions(() => setActive(active + 1))}
                    footerJustify="flex-start"
                  />
                )}
              </MuiStepContent>
            </MuiStep>
          );
        })}
      </MuiStepper>
    </WidgetWrapper>
  );
}
