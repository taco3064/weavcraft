import type { BaseFieldWithoutInputProps } from '../BaseField';

export type TextAreaFieldProps = BaseFieldWithoutInputProps<
  string,
  'maxRows' | 'minRows' | 'rows'
>;
