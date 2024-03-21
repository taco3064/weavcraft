import type { HTMLInputTypeAttribute } from 'react';
import type { BaseFieldWithoutInputProps } from '../BaseField';

export interface TextFieldProps extends BaseFieldWithoutInputProps<string> {
  pattern?: string;
  type?: Extract<HTMLInputTypeAttribute, 'email' | 'password' | 'text' | 'url'>;
}
