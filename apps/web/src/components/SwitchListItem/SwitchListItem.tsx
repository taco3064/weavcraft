import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import IconSwitch from '../IconSwitch';
import type { ItemOptions, SwitchListItemProps } from './SwitchListItem.types';

export default function SwitchListItem<V extends string>({
  active,
  classes,
  disabled = false,
  divider,
  options,
  onActiveChange,
  ...props
}: SwitchListItemProps<V>) {
  return (
    <ListItem {...{ divider }}>
      <ListItemIcon className={classes?.icon}>
        {!disabled && (
          <IconSwitch
            {...props}
            options={options}
            value={active}
            onChange={onActiveChange}
          />
        )}
      </ListItemIcon>

      {Object.entries<ItemOptions>(options).map(([value, { content }]) => (
        <Collapse
          key={value}
          orientation="horizontal"
          in={value === active}
          sx={{
            height: value === active ? null : 0,
            width: value === active ? '100% !important' : 0,
          }}
        >
          <ListItemText
            disableTypography
            className={classes?.row}
            primary={content}
          />
        </Collapse>
      ))}
    </ListItem>
  );
}
