import Container from '@mui/material/Container';
import { useState } from 'react';

import { PaletteViewer } from '~web/components';
import type { PaletteEditorProps } from './PaletteEditor.types';

export default function PaletteEditor({
  config,
  maxWidth,
  size,
}: PaletteEditorProps) {
  const [value, setValue] = useState(config);

  return (
    <Container disableGutters maxWidth={maxWidth}>
      <PaletteViewer config={value} size={size} onColorClick={console.log} />
    </Container>
  );
}
