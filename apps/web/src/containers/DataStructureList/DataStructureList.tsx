import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useTranslation } from 'next-i18next';

import ActionToggle from './DataStructureList.ActionToggle';
import FieldItems from './DataStructureList.FieldItems';
import { EditorList } from '~web/components';
import { useFieldChangeHandler } from './DataStructureList.hooks';
import type { DataStructureListProps } from './DataStructureList.types';

export default function DataStructureView({
  ActionTransitionComponent,
  paths = [],
  value,
  onChange,
  onClose,
}: DataStructureListProps) {
  const { t } = useTranslation();
  const onFieldChange = useFieldChangeHandler(onChange);

  return (
    <EditorList
      title={t('widgets:ttl-data-structure')}
      onClose={onClose}
      render={(classes) => (
        <>
          <ListItem>
            <ListItemIcon className={classes.icon}>
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

          {value.length ? (
            <FieldItems
              {...{
                ActionTransitionComponent,
                classes,
                paths,
                value,
                onChange,
              }}
            />
          ) : (
            <ListItem>
              <ListItemText
                primary={t('widgets:msg-no-structure')}
                primaryTypographyProps={{
                  align: 'center',
                  color: 'text.disabled',
                  variant: 'h6',
                }}
              />
            </ListItem>
          )}
        </>
      )}
    />
  );
}
