import type { Get, SetRequired } from 'type-fest';
import type { Todos } from '@weavcraft/common';

export enum IterateSourceTypeEnum {
  Single = 'Single',
  Multiple = 'Multiple',
}

export type TodoValue<T extends Todos = Todos> = SetRequired<
  Partial<T>,
  'type'
>;

type TodoConfig<T extends Todos> = Partial<
  NonNullable<Get<TodoValue<T>, ['config']>>
>;

export interface TodoFieldsProps<T extends Todos> {
  value: TodoValue<T>;
  onChange: (value: TodoValue<T>) => void;
}

export interface FieldsProps<T extends Todos> {
  value?: TodoConfig<T>;
  onChange: (value: TodoConfig<T>) => void;
}
