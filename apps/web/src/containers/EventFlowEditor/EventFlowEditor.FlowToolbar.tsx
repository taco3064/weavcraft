import AddIcon from '@mui/icons-material/Add';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import Core from '@weavcraft/core';
import CropFreeIcon from '@mui/icons-material/CropFree';
import Fab from '@mui/material/Fab';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import _debounce from 'lodash/debounce';
import { TodoEnum } from '@weavcraft/common';
import { useNodes, useReactFlow } from '@xyflow/react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { TODO_ICONS } from '~web/components';
import { useToolbarStyles } from './EventFlowEditor.styles';
import type { FlowToolbarProps } from './EventFlowEditor.types';

export default function FlowToolbar({
  fitViewDuration,
  onTodoAdd,
}: FlowToolbarProps) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation('pages');
  const { fitView } = useReactFlow();
  const { classes, cx } = useToolbarStyles();

  const nodes = useNodes();
  const debounceFitView = useMemo(() => _debounce(fitView, 200), [fitView]);

  useEffect(() => {
    const handleResize = () =>
      debounceFitView({ duration: fitViewDuration, nodes });

    handleResize();
    global.window?.addEventListener('resize', handleResize);

    return () => global.window?.removeEventListener('resize', handleResize);
  }, [debounceFitView, fitViewDuration, nodes]);

  return (
    <>
      <Fab
        className={cx(classes.root, classes.viewport)}
        color="default"
        size="large"
        onClick={() => fitView({ duration: 400 })}
      >
        <CropFreeIcon fontSize="large" />
      </Fab>

      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <SpeedDial
          FabProps={{ color: 'secondary', size: 'large' }}
          ariaLabel="Toolbar"
          className={cx(classes.root, classes.toolbar)}
          open={open}
          onClick={() => setOpen(!open)}
          icon={
            <SpeedDialIcon
              icon={<AddIcon fontSize="large" />}
              openIcon={<CloseIcon fontSize="large" />}
            />
          }
        >
          {Object.entries(TODO_ICONS).map(([type, icon]) => (
            <SpeedDialAction
              FabProps={{ size: 'medium' }}
              key={type}
              tooltipTitle={t(`lbl-todo-types.${type}`)}
              tooltipPlacement="left"
              icon={<Core.Icon code={icon} />}
              onClick={() => onTodoAdd(type as TodoEnum)}
            />
          ))}
        </SpeedDial>
      </ClickAwayListener>
    </>
  );
}
