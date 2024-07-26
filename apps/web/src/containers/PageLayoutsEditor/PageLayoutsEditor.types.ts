import type { BaseEditorProps, PageLayoutConfigs } from '../imports.types';

//* Style Params Types
export type MainStyleParams = Pick<PageLayoutsEditorProps, 'marginTop'>;

//* Component Props Type
export type PageLayoutsEditorProps = BaseEditorProps<PageLayoutConfigs>;
