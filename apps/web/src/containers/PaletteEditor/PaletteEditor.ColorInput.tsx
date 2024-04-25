import { HexColorInput } from 'react-colorful';
import { forwardRef, useImperativeHandle } from 'react';

import type { ColorInputProps } from './PaletteEditor.types';

export default forwardRef<HTMLInputElement, ColorInputProps>(
  function ColorInput(props, ref) {
    useImperativeHandle(ref, () => global.document?.createElement('input'), []);

    return <HexColorInput {...props} />;
  }
);
