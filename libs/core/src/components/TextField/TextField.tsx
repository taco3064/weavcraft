import BaseField from '../BaseField';
import type { TextFieldProps } from './TextField.types';

export default function TextField({ pattern, ...props }: TextFieldProps) {
  return (
    <BaseField {...props} data-testid="TextField" inputProps={{ pattern }} />
  );
}
