import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useTranslation } from 'next-i18next';

import { EditorSubheader } from '~web/components';
import { useEditorListStyles } from '~web/styles';
import type { PrimitiveValueProps } from './WidgetEditor.types';

export default function PrimitiveValue({
  config,
  onClose,
}: PrimitiveValueProps) {
  const { t } = useTranslation();
  const { classes } = useEditorListStyles();

  return !config ? null : (
    <Fade in timeout={1200}>
      <List
        className={classes.root}
        subheader={
          <EditorSubheader
            title={t('widgets:ttl-primitive-value')}
            onClose={onClose}
          />
        }
      ></List>
    </Fade>
  );
}
