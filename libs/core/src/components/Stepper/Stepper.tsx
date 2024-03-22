import MuiStepper from '@mui/material/Stepper';
import MuiStep from '@mui/material/Step';
import MuiStepLabel from '@mui/material/StepLabel';
import MuiStepContent from '@mui/material/StepContent';
import { isValidElement, useEffect, useMemo, useState } from 'react';

import Card from '../Card';
import Form from '../Form';
import StepperButton from './Stepper.button';
import { WidgetWrapper } from '../../styles';
import { usePropsGetter, type GenericData } from '../../contexts';

import type {
  StepCardProps,
  StepFormProps,
  StepperProps,
} from './Stepper.types';

function isLastStep(active: number, items?: number) {
  return active + 1 === (items || 0);
}

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

  const getProps = usePropsGetter<D>();
  const isDone = active === items?.length;

  const handleDone = useMemo(
    () => (!isDone || !onDone ? null : () => onDone(stepData as D)),
    [isDone, stepData, onDone]
  );

  const getActions = (step: number, onNextStep?: () => void) => (
    <>
      <StepperButton
        data-testid="StepPrevButton"
        disabled={step === 0}
        icon="faAngleLeft"
        text={prevButtonText}
        onClick={() => setActive(Math.max(0, step - 1))}
      />

      <StepperButton
        {...(isLastStep(step, items?.length)
          ? { icon: 'faCheck', text: doneButtonText }
          : { icon: 'faAngleRight', text: nextButtonText })}
        data-testid="StepNextButton"
        type="submit"
        onClick={onNextStep}
      />
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
      <MuiStepper
        data-testid="Stepper"
        activeStep={active}
        orientation="vertical"
      >
        {items?.map((item, i) => {
          const { content, label, variant } = getProps({ ...item, data });
          const props = isValidElement(content) ? content.props : undefined;

          return (
            <MuiStep key={i}>
              <MuiStepLabel data-testid="StepLabel">{label}</MuiStepLabel>

              <MuiStepContent data-testid="StepContent">
                {variant === 'form' ? (
                  <Form
                    {...(props as StepFormProps)}
                    action={getActions(i)}
                    actionJustify="flex-start"
                    data={stepData}
                    onSubmit={(data) => {
                      setStepData({ ...stepData, ...data });
                      setActive(i + 1);
                    }}
                  />
                ) : (
                  <Card
                    {...(props as StepCardProps)}
                    data={stepData}
                    footerAction={getActions(i, () => setActive(i + 1))}
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
