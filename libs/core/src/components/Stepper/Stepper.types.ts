import type { ReactElement, ButtonHTMLAttributes } from 'react';

import Card, { type CardProps } from '../Card';
import Form, { type FormProps } from '../Form';
import type { GenericData, PropsWithMappedData } from '../../contexts';
import type { IconCode } from '../Icon';
import type { WidgetWrapperProps } from '../../styles';

//* Utility Types
type StepVariant = 'form' | 'card';

export interface ButtonParams
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'disabled' | 'type' | 'onClick'
  > {
  'data-testid': string;
  icon: Extract<IconCode, 'faAngleLeft' | 'faAngleRight' | 'faCheck'>;
  text?: string;
}

//* Component Props
type CommonOmitProps = 'avatar' | 'description' | 'headerAction' | 'title';

export type StepFormProps<D extends GenericData = {}> = Omit<
  FormProps<D>,
  CommonOmitProps | 'data' | 'action' | 'actionJustify' | 'onSubmit'
>;

export type StepCardProps<D extends GenericData = {}> = Omit<
  CardProps<D>,
  CommonOmitProps | 'data' | 'footerAction' | 'footerJustify'
>;

type StepProps<
  V extends StepVariant,
  D extends GenericData
> = PropsWithMappedData<
  D,
  {
    variant?: V;
    label?: string;

    content?: V extends 'form'
      ? ReactElement<StepFormProps<D>, typeof Form>
      : ReactElement<StepCardProps<D>, typeof Card>;
  },
  'label'
>;

export interface StepperProps<D extends GenericData>
  extends Pick<WidgetWrapperProps, 'maxWidth'> {
  data?: D;
  items?: StepProps<StepVariant, D>[];
  doneButtonText?: string;
  nextButtonText?: string;
  prevButtonText?: string;
  onDone?: (data?: D) => void;
}
