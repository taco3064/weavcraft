import BaseField from '../BaseField';
import type { TextAreaFieldProps } from './TextAreaField.types';

export default function TextAreaField({
  minRows = 3,
  ...props
}: TextAreaFieldProps) {
  return (
    <BaseField
      {...props}
      multiline
      minRows={minRows}
      data-testid="TextAreaField"
    />
  );
}
