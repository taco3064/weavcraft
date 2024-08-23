import AddIcon from '@mui/icons-material/Add';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import CropFreeIcon from '@mui/icons-material/CropFree';
import LoopIcon from '@mui/icons-material/Loop';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TuneIcon from '@mui/icons-material/Tune';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { TodoEnum } from '@weavcraft/common';
import { useReactFlow } from '@xyflow/react';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'next-i18next';

import { ViewModeEnum, type FlowToolbarProps } from './EventFlowEditor.types';
import { useToolbarStyles } from './EventFlowEditor.styles';

const TODO_ICONS: Record<TodoEnum, ReactNode> = {
  Decision: <CallSplitIcon fontSize="large" />,
  FetchData: <SyncAltIcon fontSize="large" />,
  Iterate: <LoopIcon fontSize="large" />,
  Update: <SaveAltIcon fontSize="large" />,
};

export default function FlowToolbar({ onTodoAdd }: FlowToolbarProps) {
  const [viewMode, setViewMode] = useState<ViewModeEnum>();

  const { t } = useTranslation('pages');
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const { classes, cx } = useToolbarStyles();

  return (
    <>
      <ClickAwayListener
        mouseEvent={viewMode === ViewModeEnum.Viewport ? 'onClick' : false}
        touchEvent={viewMode === ViewModeEnum.Viewport ? 'onTouchStart' : false}
        onClickAway={() => setViewMode(undefined)}
      >
        <SpeedDial
          FabProps={{ color: 'default', size: 'large' }}
          ariaLabel="Viewport Controls"
          className={cx(classes.root, classes.viewport)}
          open={viewMode === ViewModeEnum.Viewport}
          onClick={() => setViewMode(ViewModeEnum.Viewport)}
          icon={
            <SpeedDialIcon
              icon={<TuneIcon fontSize="large" />}
              openIcon={<CloseIcon fontSize="large" />}
            />
          }
        >
          <SpeedDialAction
            FabProps={{ size: 'medium' }}
            tooltipTitle={t('btn-fit-view')}
            tooltipPlacement="right"
            icon={<CropFreeIcon fontSize="large" />}
            onClick={() => fitView({ duration: 400 })}
          />

          <SpeedDialAction
            FabProps={{ size: 'medium' }}
            tooltipTitle={t('btn-zoom-out')}
            tooltipPlacement="right"
            icon={<ZoomOutIcon fontSize="large" />}
            onClick={() => zoomOut({ duration: 400 })}
          />

          <SpeedDialAction
            FabProps={{ size: 'medium' }}
            tooltipTitle={t('btn-zoom-in')}
            tooltipPlacement="right"
            icon={<ZoomInIcon fontSize="large" />}
            onClick={() => zoomIn({ duration: 400 })}
          />
        </SpeedDial>
      </ClickAwayListener>

      <ClickAwayListener
        mouseEvent={viewMode === ViewModeEnum.Toolbar ? 'onClick' : false}
        touchEvent={viewMode === ViewModeEnum.Toolbar ? 'onTouchStart' : false}
        onClickAway={() => setViewMode(undefined)}
      >
        <SpeedDial
          FabProps={{ color: 'secondary', size: 'large' }}
          ariaLabel="Toolbar"
          className={cx(classes.root, classes.toolbar)}
          open={viewMode === ViewModeEnum.Toolbar}
          onClick={() => setViewMode(ViewModeEnum.Toolbar)}
          icon={
            <SpeedDialIcon
              icon={<AddIcon fontSize="large" />}
              openIcon={<CloseIcon fontSize="large" />}
            />
          }
        >
          {Object.entries(TODO_ICONS)
            .reverse()
            .map(([type, icon]) => (
              <SpeedDialAction
                FabProps={{ size: 'medium' }}
                key={type}
                tooltipTitle={t(`lbl-todo-types.${type}`)}
                tooltipPlacement="left"
                icon={icon}
              />
            ))}
        </SpeedDial>
      </ClickAwayListener>
    </>
  );
}
