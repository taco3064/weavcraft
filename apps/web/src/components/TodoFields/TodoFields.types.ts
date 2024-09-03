import type { Get, SetRequired } from 'type-fest';
import type { DecisionTodo, Todos, VariableTodo } from '@weavcraft/common';

export enum IterateSourceTypeEnum {
  Single = 'Single',
  Multiple = 'Multiple',
}

export type ConditionState = Partial<
  NonNullable<DecisionTodo['config']>['conditions'][number]
>;

export type FieldState = [
  string,
  Partial<NonNullable<VariableTodo['config']>[string] | undefined>
];

export type TodoValue<T extends Todos = Todos> = SetRequired<
  Partial<T>,
  'type'
>;

type TodoConfig<T extends Todos> = Partial<
  NonNullable<Get<TodoValue<T>, ['config']>>
>;

//* Component Props
export interface TodoFieldsProps<T extends Todos> {
  value: TodoValue<T>;
  onChange: (value: TodoValue<T>) => void;
}

export interface FieldsProps<T extends Todos> {
  value?: TodoConfig<T>;
  onChange: (value: TodoConfig<T>) => void;
}

export interface NoDataAvailableProps {
  message: string;
  required?: boolean;
}
