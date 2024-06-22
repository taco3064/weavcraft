import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Container from '@mui/material/Container';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { useTranslation } from 'next-i18next';

import ActionToggle from './DataStructureList.ActionToggle';
import FieldItems from './DataStructureList.FieldItems';
import { EditorList } from '~web/components';
import { useFieldChangeHandler } from './DataStructureList.hooks';
import { useMainStyles } from './DataStructureList.styles';
import type { DataStructureListProps } from './DataStructureList.types';

export default function DataStructureView({
  paths = [],
  value,
  onChange,
  onClose,
}: DataStructureListProps) {
  const onFieldChange = useFieldChangeHandler(onChange);

  const { t } = useTranslation();
  const { classes } = useMainStyles();

  return (
    <EditorList
      title={t('widgets:ttl-data-structure')}
      onClose={onClose}
      render={({ icon }) => (
        <>
          <ListItem>
            <ListItemIcon className={icon}>
              <AccountTreeIcon color="disabled" fontSize="large" />
            </ListItemIcon>

            <ListItemText
              primary={t('widgets:lbl-data-structure-root')}
              primaryTypographyProps={{
                color: 'text.primary',
                fontWeight: 600,
              }}
            />

            {onChange && (
              <Toolbar disableGutters>
                <ActionToggle
                  variant="structure"
                  onActionToggle={({ value: fieldPath, type }) =>
                    onFieldChange(value, {
                      fieldPath,
                      paths: [],
                      isStructure: type === 'structure',
                    })
                  }
                />
              </Toolbar>
            )}
          </ListItem>

          <ListItem sx={{ paddingRight: 1 }}>
            <Container
              maxWidth={false}
              component={SimpleTreeView}
              sx={{ paddingRight: 0 }}
            >
              {value.length ? (
                <FieldItems {...{ paths, value, onChange }} />
              ) : (
                <TreeItem
                  itemId="message"
                  classes={{ iconContainer: classes.hidden }}
                  label={
                    <Typography
                      variant="h6"
                      justifyContent="center"
                      color="text.disabled"
                    >
                      {t('widgets:msg-no-structure')}
                    </Typography>
                  }
                />
              )}
            </Container>
          </ListItem>
        </>
      )}
    />
  );
}
