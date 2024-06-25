import type { JsonObject } from 'type-fest';
import type { DataPropEnum, RenderConfig } from '../imports.types';

export enum BuildStepEnum {
  DataStructure,
  DataView,
}

export type FixedData =
  | { dataPropName: DataPropEnum.Data; data: JsonObject }
  | { dataPropName: DataPropEnum.Records; data: JsonObject[] };

//* Component Props
export interface FixedDataDialogProps {
  config: RenderConfig;
}
