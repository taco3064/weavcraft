import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { useTranslation } from 'next-i18next';

import ActionToggle from './DataStructureView.ActionToggle';
import FieldItems from './DataStructureView.FieldItems';
import { useFieldChangeHandler } from './DataStructureView.hooks';
import { useMainStyles } from './DataStructureView.styles';
import type { DataStructureViewProps } from './DataStructureView.types';

export default function DataStructureView({
  paths = [],
  value,
  onChange,
}: DataStructureViewProps) {
  const onFieldChange = useFieldChangeHandler(onChange);

  const { t } = useTranslation();
  const { classes } = useMainStyles();

  return (
    <Container
      disableGutters
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
  );
}
