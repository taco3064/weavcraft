import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { JSONTree } from 'react-json-tree';
import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';

import { useDataBindingChangeEvent } from './PropsSettingTabs.hooks';
import { usePropsDefinition } from '~web/contexts';
import type { DataBindingProps } from './PropsSettingTabs.types';

export default function FixedData({
  config,
  elevation,
  expanded,
  onChange,
  onExpand,
}: DataBindingProps) {
  const handleChange = useDataBindingChangeEvent(config, onChange);

  const { widget, props = {} } = config;
  const { getDefinition } = usePropsDefinition();
  const { t } = useTranslation();

  const { isRecordsCase, dataSource } = useMemo(() => {
    const { dataBindingProps = {} } = getDefinition(widget) || {};

    const isRecordsCase = Boolean(
      Object.values(dataBindingProps).find(
        ({ type, definition }) => type === 'data' && definition?.multiple
      )
    );

    return {
      isRecordsCase,

      dataSource: Object.keys(dataBindingProps).find((path) =>
        isRecordsCase ? path.endsWith('.propMapping') : path === 'propMapping'
      ) as string,
    };
  }, [widget, getDefinition]);

  return (
    <Accordion
      component={Paper}
      disabled={_isEmpty(_get(props, [dataSource, 'value']))}
      elevation={elevation}
      expanded={expanded === 'data'}
      onChange={(_e, isExpanded) => isExpanded && onExpand('data')}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Core.Icon code="faDatabase" />
        {t('widgets:ttl-force-data')}
      </AccordionSummary>

      <Divider />

      <AccordionDetails>{isRecordsCase ? 'recoreds' : 'data'}</AccordionDetails>

      <AccordionActions>
        <Button color="secondary" variant="contained">
          {t('widgets:btn-add-data')}
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
