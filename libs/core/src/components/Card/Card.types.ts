import MuiContainer from '@mui/material/Container';
import type { ComponentProps, FormEvent, ReactElement, ReactNode } from 'react';
import type { JsonObject } from 'type-fest';
import type { Property } from 'csstype';

import type { PropsWithMappedData } from '../../hooks';

type MuiContainerProps = Pick<ComponentProps<typeof MuiContainer>, 'maxWidth'>;

/**
 * ? Card Component Props Notes
 * * - `component` and `onSubmit` are used in the `Form` component
 */
export type CardProps<D extends JsonObject> = PropsWithMappedData<
  D,
  MuiContainerProps & {
    //* Header
    avatar?: ReactElement;
    description?: string;
    headerAction?: ReactElement;
    title?: string;

    //* Footer
    footerAction?: ReactNode;
    footerJustify?: Property.JustifyContent;

    //* Media
    mediaSrc?: string;
    mediaType?: 'audio' | 'img' | 'video';
    mediaHeight?: Property.Height;
    mediaWidth?: Property.Width;
    mediaPosition?: 'top' | 'bottom' | 'left' | 'right';

    component?: 'form';
    children?: ReactNode; //* Content

    //* This prop is only used in <Form />
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  },
  'children' | 'description' | 'title'
>;
