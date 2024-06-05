import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { forwardRef, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { DataBindingProp } from '@weavcraft/common';

import { usePropsDefinition } from '~web/contexts';
import type { PropTypeDefinitions } from '~web/services';
import type { SettingPanelProps } from './WidgetEditor.types';

const ELEVATION = 4;

export default forwardRef<HTMLDivElement, SettingPanelProps<DataBindingProp>>(
  function DataBinding({ classes, config, onChange }, ref) {
    const [expanded, setExpanded] = useState<number | 'data'>(0);

    const { widget, props = {} } = config;
    const { getDefinition } = usePropsDefinition();
    const { t } = useTranslation();

    const { isRecordsCase, dataSource, mappingItems } = useMemo(() => {
      const { dataBindingProps = {} } = getDefinition(widget) || {};

      const isRecordsCase = Boolean(
        Object.values(dataBindingProps).find(
          ({ type, definition }) => type === 'data' && definition?.multiple
        )
      );

      return {
        isRecordsCase,

        dataSource: Object.keys(dataBindingProps).find((path) => {
          if (!isRecordsCase) {
            return path === 'propMapping';
          }

          return path !== 'propMapping';
        }) as string,

        mappingItems: Object.entries(dataBindingProps)
          .filter(([, { type }]) => type === 'mapping')
          .sort(([path1], [path2]) => path1.length - path2.length) as [
          string,
          PropTypeDefinitions.Mapping
        ][],
      };
    }, [widget, getDefinition]);

    const handleChange = (path: string, propName: string, input: string) => {
      const value = (_get(props, [path, 'value']) || {}) as Record<
        string,
        string
      >;

      if (input.trim()) {
        _set(value, [propName], input.trim());
      } else {
        _unset(value, [propName]);
      }

      onChange(config, path, { type: 'DataBinding', value });
    };

    return (
      <Container ref={ref} maxWidth={false}>
        {mappingItems.map(([path, { definition }], i) => (
          <Accordion
            key={path}
            component={Paper}
            elevation={ELEVATION}
            expanded={expanded === i}
            onChange={(_e, isExpanded) => isExpanded && setExpanded(i)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Core.Icon code="faArrowRightArrowLeft" />

              <Typography
                variant="inherit"
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap={0}
              >
                {t('widgets:ttl-prop-mapping')}

                <Typography variant="subtitle1" color="secondary">
                  {path}
                </Typography>
              </Typography>
            </AccordionSummary>

            <List component={AccordionDetails}>
              {definition?.sort().map((propName) => {
                const value = _get(props, [path, 'value', propName]) || '';

                return (
                  <ListItem key={propName}>
                    <ListItemText
                      disableTypography
                      className={classes.row}
                      primary={
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          margin="none"
                          label={propName}
                          placeholder={t(
                            'widgets:msg-prop-mapping-placeholder'
                          )}
                          value={value}
                          onChange={(e) =>
                            handleChange(path, propName, e.target.value)
                          }
                          InputProps={{
                            endAdornment: !value ? null : (
                              <InputAdornment position="end">
                                <Button
                                  variant="text"
                                  color="inherit"
                                  size="small"
                                  onClick={() =>
                                    handleChange(path, propName, '')
                                  }
                                >
                                  {t('btn-reset')}
                                </Button>
                              </InputAdornment>
                            ),
                          }}
                        />
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Accordion>
        ))}

        <Accordion
          component={Paper}
          disabled={_isEmpty(_get(props, [dataSource, 'value']))}
          elevation={ELEVATION}
          expanded={expanded === 'data'}
          onChange={(_e, isExpanded) => isExpanded && setExpanded('data')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Core.Icon code="faDatabase" />
            {t('widgets:ttl-force-data')}
          </AccordionSummary>

          <Divider />

          <AccordionDetails>
            {isRecordsCase ? 'recoreds' : 'data'}
          </AccordionDetails>

          <AccordionActions>
            <Button color="secondary" variant="contained">
              {t('widgets:btn-add-data')}
            </Button>
          </AccordionActions>
        </Accordion>
      </Container>
    );
  }
);
