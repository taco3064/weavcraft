import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import type { NoDataAvailableProps } from './TodoFields.types';

export default function NoDataAvailable({
  message,
  required,
}: NoDataAvailableProps) {
  return (
    <ListItem>
      <ListItemText
        primary={message}
        secondary={required && <input required name="no-fields" />}
        primaryTypographyProps={{
          variant: 'h6',
          align: 'center',
          color: 'text.disabled',
        }}
        secondaryTypographyProps={{
          align: 'center',
          height: 0,
          overflow: 'hidden',
        }}
      />
    </ListItem>
  );
}
