import Box from '@mui/material/Box';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { Position } from '@xyflow/react';
import { useTranslation } from 'next-i18next';

import { FlowHandle } from '~web/styles';
import { useStartNodeStyles } from './EventFlowEditor.styles';

export default function StartNode() {
  const { t } = useTranslation('pages');
  const { classes } = useStartNodeStyles();

  return (
    <Box className={classes.root}>
      <FlowHandle type="source" id="next" position={Position.Bottom} />

      <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
        {t('lbl-start-node')}
      </Typography>

      <Fab className={classes.node}>
        <CircleOutlinedIcon fontSize="inherit" />
      </Fab>
    </Box>
  );
}
