import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Container from '@mui/material/Container';
import ListItem from '@mui/material/ListItem';
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
      render={() => (
        <ListItem disableGutters>
          <Container
            maxWidth={false}
            component={SimpleTreeView}
            defaultExpandedItems={['root']}
          >
            <TreeItem
              classes={{ label: classes.row }}
              itemId="root"
              label={
                <>
                  <AccountTreeIcon color="disabled" fontSize="large" />

                  {onChange && (
                    <Toolbar
                      disableGutters
                      variant="dense"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                </>
              }
            >
              <FieldItems {...{ paths, value, onChange }} />
            </TreeItem>

            {!value.length && (
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
      )}
    />
  );
}
