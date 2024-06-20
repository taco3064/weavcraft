import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import FieldModifyDialog from './DataStructureView.FieldModifyDialog';
import type { AddButtonsProps, EditingState } from './DataStructureView.types';

export default function AddButtons({ onChange }: AddButtonsProps) {
  const [type, setType] = useState<EditingState['type']>();
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t('widgets:btn-add.field')}>
        <IconButton color="primary" onClick={() => setType('field')}>
          <AddIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Tooltip title={t('widgets:btn-add.structure')}>
        <IconButton color="secondary" onClick={() => setType('structure')}>
          <PostAddIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <FieldModifyDialog
        open={type !== undefined}
        title={t(`widgets:ttl-field-path.add.${type}`)}
        onClose={() => setType(undefined)}
        onConfirm={(fieldPath) => {
          setType(undefined);
          onChange(fieldPath, type === 'structure');
        }}
      />
    </>
  );
}
