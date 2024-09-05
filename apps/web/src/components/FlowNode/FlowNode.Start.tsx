import Box from '@mui/material/Box';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Position } from '@xyflow/react';
import { useTranslation } from 'next-i18next';

import { FlowHandle } from '~web/styles';
import { useStartNodeStyles } from './FlowNode.styles';

export default function StartNode() {
  const { t } = useTranslation('pages');
  const { classes } = useStartNodeStyles();

  return (
    <Box className={classes.root}>
      <Tooltip title={t('opt-source-types.next')}>
        <FlowHandle type="source" id="next" position={Position.Bottom} />
      </Tooltip>

      <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
        {t('lbl-start-node')}
      </Typography>

      <Fab size="medium" className={classes.node}>
        <CircleOutlinedIcon fontSize="inherit" />
      </Fab>
    </Box>
  );
}
