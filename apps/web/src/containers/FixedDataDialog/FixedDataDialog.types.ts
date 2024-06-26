import type { JsonObject } from 'type-fest';
import type { DataPropEnum, ComponentConfig } from '../imports.types';

export enum BuildStepEnum {
  DataStructure,
  DataView,
}

export type FixedData =
  | { dataPropName: DataPropEnum.Data; data: JsonObject }
  | { dataPropName: DataPropEnum.Records; data: JsonObject[] };

//* Component Props
export interface FixedDataDialogProps {
  config: ComponentConfig;
}
