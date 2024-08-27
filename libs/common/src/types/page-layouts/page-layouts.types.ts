import type { Breakpoint } from '@mui/material/styles';
import type { JsonObject, Merge, SetRequired } from 'type-fest';

export enum DefinitionTypeEnum {
  boolean = 'boolean',
  date = 'date',
  number = 'number',
  string = 'string',
}

export enum DecisionOperatorEnum {
  between = 'between',
  contains = 'contains',
  startsWith = 'startsWith',
  endsWith = 'endsWith',
  equals = 'equals',
  gt = 'gt',
  gte = 'gte',
  lt = 'lt',
  lte = 'lte',
  isEmpty = 'isEmpty',
}

export enum RequestMethodEnum {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export enum TodoEnum {
  Decision = 'Decision',
  FetchData = 'FetchData',
  Iterate = 'Iterate',
  UpdateWidget = 'UpdateWidget',
  Variables = 'Variables',
}

export enum VariableEnum {
  Definition = 'Definition',
  TodoOutput = 'TodoOutput',
  Widget = 'Widget',
}

export type VariableSource = { todoid: string; name?: string };

type BaseVariable<T extends VariableEnum, P extends JsonObject> = Merge<
  P,
  { mode: T }
>;

interface BaseTodo<T extends TodoEnum, Config, NextTodo extends string = 'next'>
  extends Record<string, unknown> {
  type: T;
  description?: string;
  config?: Config;
  nextTodo?: Partial<Record<NextTodo, string>>;
}

export type DecisionTodo = BaseTodo<
  TodoEnum.Decision,
  {
    source: VariableSource;
    target?: VariableSource;
    operator: DecisionOperatorEnum;
  },
  'true' | 'false'
>;

export type FetchDataTodo = BaseTodo<
  TodoEnum.FetchData,
  {
    url: string;
    method: RequestMethodEnum;
    headers?: Record<string, string>;
    payload?: VariableSource;
  }
>;

export type IterateTodo = BaseTodo<
  TodoEnum.Iterate,
  {
    source: VariableSource | VariableSource[];
    subTodos: {
      [TodoId: string]: Todos;
    };
  }
>;

export type UpdateWidgetTodo = BaseTodo<
  TodoEnum.UpdateWidget,
  {
    source: VariableSource;
    widgetId: string;
    dataPath: number;
  }
>;

export type VariableTodo = BaseTodo<
  TodoEnum.Variables,
  {
    [fieldName: string]:
      | BaseVariable<VariableEnum.TodoOutput, { outputId: string }>
      | BaseVariable<VariableEnum.Widget, { paths: [string, ...number[]] }>
      | BaseVariable<
          VariableEnum.Definition,
          { type: DefinitionTypeEnum; initialValue?: string }
        >;
  }
>;

export type Todos =
  | DecisionTodo
  | FetchDataTodo
  | IterateTodo
  | UpdateWidgetTodo
  | VariableTodo;

export interface PageLayoutConfigs {
  id: string;
  layouts: {
    id: string;
    widgetId: string;
    spans: SetRequired<
      { [K in Breakpoint]?: Record<'cols' | 'rows', number> },
      'xs'
    >;
    events?: {
      [componentId: string]: {
        [eventPath: string]: {
          [todoId: string]: Todos;
        };
      };
    };
  }[];
}
