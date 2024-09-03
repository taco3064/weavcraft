import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';
import type { IterateTodo, VariableSource } from '@weavcraft/common';

import { DEFAULT_PROPS, useFieldsStyles } from './TodoFields.styles';
import { IterateSourceTypeEnum, type FieldsProps } from './TodoFields.types';

export default function IterateFields({
  value,
  onChange,
}: FieldsProps<IterateTodo>) {
  const [, startTransition] = useTransition();

  const { t } = useTranslation('pages');
  const { classes } = useFieldsStyles();

  const [srcMode, setSrcMode] = useState<IterateSourceTypeEnum>(() =>
    Array.isArray(value?.source)
      ? IterateSourceTypeEnum.Multiple
      : IterateSourceTypeEnum.Single
  );

  return (
    <>
      <TextField
        {...DEFAULT_PROPS}
        required
        select
        label={t('lbl-iterate-source-type')}
        value={srcMode}
        onChange={(e) =>
          startTransition(() => {
            const mode = e.target.value as IterateSourceTypeEnum;

            setSrcMode(mode);

            onChange({
              ...value,
              source: mode === IterateSourceTypeEnum.Single ? undefined : [],
            });
          })
        }
      >
        {Object.values(IterateSourceTypeEnum).map((option) => (
          <MenuItem key={option} value={option}>
            {t(`opt-iterate-source-types.${option}`)}
          </MenuItem>
        ))}
      </TextField>

      {!Array.isArray(value?.source) ? (
        <TextField
          {...DEFAULT_PROPS}
          required
          select
          label={t('lbl-iterate-source')}
          value={value?.source ? JSON.stringify(value.source) : ''}
          onChange={(e) =>
            onChange({ ...value, source: JSON.parse(e.target.value) })
          }
        />
      ) : (
        <Accordion expanded className={classes.headers}>
          <AccordionSummary>{t('ttl-iterate-sources')}</AccordionSummary>

          <Divider />

          <List component={AccordionDetails}>
            {value.source.length === 0 && (
              <ListItem>
                <ListItemText
                  primary={t('msg-iterate-no-sources')}
                  primaryTypographyProps={{
                    variant: 'h6',
                    align: 'center',
                    color: 'text.disabled',
                  }}
                />
              </ListItem>
            )}

            {value.source.map((source, index) => (
              <ListItem key={index} divider className={classes.item}>
                <ListItemText
                  disableTypography
                  primary={
                    <TextField
                      {...DEFAULT_PROPS}
                      required
                      select
                      label={t('lbl-iterate-source')}
                      value={source ? JSON.stringify(source) : ''}
                      onChange={(e) =>
                        onChange({
                          ...value,
                          source: [
                            ...(value.source as VariableSource[]),
                            JSON.parse(e.target.value),
                          ],
                        })
                      }
                    />
                  }
                />

                <IconButton
                  onClick={() => {
                    const newSource = [...(value.source as VariableSource[])];

                    newSource.splice(index, 1);
                    onChange({ ...value, source: newSource });
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
              onClick={() =>
                onChange({
                  ...value,
                  source: [
                    ...(value.source as VariableSource[]),
                    undefined,
                  ] as VariableSource[],
                })
              }
            >
              {t('btn-iterate-add-source')}
            </Button>
          </AccordionActions>
        </Accordion>
      )}
    </>
  );
}
