import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { RequestMethodEnum, type FetchDataTodo } from '@weavcraft/common';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { DEFAULT_PROPS, useFieldsStyles } from './TodoFields.styles';
import type { FieldsProps } from './TodoFields.types';

export default function FetchDataFields({
  value,
  onChange,
}: FieldsProps<FetchDataTodo>) {
  const [headers, setHeaders] = useState(Object.entries(value?.headers || {}));

  const { t } = useTranslation('pages');
  const { classes } = useFieldsStyles();

  const handleHeadersChange = (index: number, key: string, val: string) => {
    const newHeaders = [...headers];

    newHeaders[index] = [key, val];
    setHeaders(newHeaders);
    onChange({ ...value, headers: Object.fromEntries(newHeaders) });
  };

  return (
    <>
      <TextField
        {...DEFAULT_PROPS}
        required
        label={t('lbl-fetch-url')}
        value={value?.url || ''}
        onChange={(e) => onChange({ ...value, url: e.target.value })}
      />

      <TextField
        {...DEFAULT_PROPS}
        required
        select
        label={t('lbl-fetch-method')}
        value={value?.method || ''}
        onChange={(e) =>
          onChange({ ...value, method: e.target.value as RequestMethodEnum })
        }
      >
        {Object.values(RequestMethodEnum).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        {...DEFAULT_PROPS}
        select
        label={t('lbl-fetch-payload')}
        value={value?.payload ? JSON.stringify(value.payload) : ''}
        onChange={(e) =>
          onChange({ ...value, payload: JSON.parse(e.target.value) })
        }
      />

      <Accordion className={classes.headers}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {t('ttl-fetch-headers')}
        </AccordionSummary>

        <Divider />

        <List component={AccordionDetails}>
          {headers.length === 0 && (
            <ListItem>
              <ListItemText
                primary={t('msg-fetch-no-headers')}
                primaryTypographyProps={{
                  variant: 'h6',
                  align: 'center',
                  color: 'text.disabled',
                }}
              />
            </ListItem>
          )}

          {headers.map(([key, val], index) => (
            <ListItem key={index} divider className={classes.item}>
              <ListItemText
                disableTypography
                primary={
                  <TextField
                    {...DEFAULT_PROPS}
                    required
                    label={t('lbl-fetch-header-key')}
                    value={key}
                    onChange={(e) =>
                      handleHeadersChange(index, e.target.value, val)
                    }
                  />
                }
                secondary={
                  <TextField
                    {...DEFAULT_PROPS}
                    required
                    label={t('lbl-fetch-header-value')}
                    value={val}
                    onChange={(e) =>
                      handleHeadersChange(index, key, e.target.value)
                    }
                  />
                }
              />

              <IconButton
                onClick={() => {
                  const newHeaders = [...headers];

                  newHeaders.splice(index, 1);
                  setHeaders(newHeaders);

                  onChange({
                    ...value,
                    headers: Object.fromEntries(newHeaders),
                  });
                }}
              >
                <Core.Icon code="faClose" color="disabled" />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <AccordionActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setHeaders([...headers, ['', '']])}
          >
            {t('btn-fetch-add-header')}
          </Button>
        </AccordionActions>
      </Accordion>
    </>
  );
}
