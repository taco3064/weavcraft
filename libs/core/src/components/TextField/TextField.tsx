import BaseField from '../BaseField';
import type { TextFieldProps } from './TextField.types';

export default function TextField(props: TextFieldProps) {
  return <BaseField {...props} data-testid="TextField" />;
}
