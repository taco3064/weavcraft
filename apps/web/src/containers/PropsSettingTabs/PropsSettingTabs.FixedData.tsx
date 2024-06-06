import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { JSONTree } from 'react-json-tree';
import { useTranslation } from 'next-i18next';

import { useFixedData } from './PropsSettingTabs.hooks';
import type { DataBindingProps } from './PropsSettingTabs.types';

export default function FixedData({
  config,
  elevation,
  expanded,
  onChange,
  onExpand,
}: DataBindingProps) {
  const { t } = useTranslation();
  const { disabled, data } = useFixedData(config);

  return (
    <Accordion
      component={Paper}
      disabled={disabled}
      elevation={elevation}
      expanded={expanded === 'data'}
      onChange={(_e, isExpanded) => isExpanded && onExpand('data')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Core.Icon code="faDatabase" />
        {t('widgets:ttl-fixed-data')}
      </AccordionSummary>

      <Divider />

      <AccordionDetails>
        {!data ? (
          <Typography
            paragraph
            variant="subtitle1"
            color="text.disabled"
            justifyContent="center"
            fontWeight={600}
          >
            {t('widgets:msg-no-data')}
          </Typography>
        ) : (
          <JSONTree hideRoot theme="monokai" data={data} />
        )}

        <Typography variant="caption" color="text.secondary" gutterBottom>
          {t('widgets:msg-fixed-data-description')}
        </Typography>
      </AccordionDetails>

      <AccordionActions>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<Core.Icon code="faPlus" />}
        >
          {t('widgets:btn-add-data')}
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
