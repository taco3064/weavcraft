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
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import {
  DefinitionTypeEnum,
  VariableEnum,
  type VariableTodo,
} from '@weavcraft/common';

import PrimitiveField, { type PrimitiveType } from '../PrimitiveField';
import { DEFAULT_PROPS, useFieldsStyles } from './TodoFields.styles';
import type { FieldsProps } from './TodoFields.types';

export default function VariableFields({
  value,
  onChange,
}: FieldsProps<VariableTodo>) {
  const { t } = useTranslation('pages');
  const { classes } = useFieldsStyles();

  const [fields, setFields] = useState<
    [string, Partial<NonNullable<typeof value>[string]>][]
  >(Object.entries(value || {}));

  const handleFieldChange = (
    index: number,
    name: string,
    val: Partial<NonNullable<typeof value>[string]>
  ) => {
    const newFields = [...fields];

    newFields[index] = [name, val];
    setFields(newFields);
    onChange(Object.fromEntries(newFields) as NonNullable<typeof value>);
  };

  return (
    <Accordion expanded className={classes.headers}>
      <AccordionSummary>{t('ttl-variables')}</AccordionSummary>

      <Divider />

      <List component={AccordionDetails}>
        {fields.length === 0 && (
          <ListItem>
            <ListItemText
              primary={t('msg-variable-no-fields')}
              primaryTypographyProps={{
                variant: 'h6',
                align: 'center',
                color: 'text.disabled',
              }}
            />
          </ListItem>
        )}

        {fields.map(([name, val], index) => (
          <ListItem key={index} divider className={classes.item}>
            <ListItemText disableTypography>
              <TextField
                {...DEFAULT_PROPS}
                required
                label={t('lbl-variable-name')}
                value={name}
                onChange={(e) =>
                  handleFieldChange(index, e.target.value, {
                    ...val,
                  })
                }
              />

              <TextField
                {...DEFAULT_PROPS}
                required
                select
                label={t('lbl-variable-mode')}
                value={val?.mode || ''}
                onChange={(e) =>
                  handleFieldChange(index, name, {
                    mode: e.target.value as VariableEnum,
                  })
                }
              >
                {Object.values(VariableEnum).map((option) => (
                  <MenuItem key={option} value={option}>
                    {t(`opt-variables.${option}`)}
                  </MenuItem>
                ))}
              </TextField>

              {val?.mode === VariableEnum.Definition && (
                <>
                  <TextField
                    {...DEFAULT_PROPS}
                    required
                    select
                    label={t('lbl-variable-type')}
                    value={val?.type || ''}
                    onChange={(e) =>
                      handleFieldChange(index, name, {
                        ...val,
                        type: e.target.value as DefinitionTypeEnum,
                      })
                    }
                  >
                    {Object.values(DefinitionTypeEnum).map((option) => (
                      <MenuItem key={option} value={option}>
                        {t(`opt-variable-types.${option}`)}
                      </MenuItem>
                    ))}
                  </TextField>

                  <PrimitiveField
                    {...DEFAULT_PROPS}
                    disableAdornment
                    disabled={!val?.type}
                    label={t('lbl-variable-initial-value')}
                    value={val?.initialValue || ''}
                    onChange={(e) =>
                      handleFieldChange(index, name, {
                        ...val,
                        initialValue: e as string,
                      })
                    }
                    definition={{
                      path: '',
                      required: false,
                      type: (val.type || 'string') as PrimitiveType,
                    }}
                  />
                </>
              )}

              {val?.mode === VariableEnum.TodoOutput && (
                <>
                  <TextField
                    {...DEFAULT_PROPS}
                    required
                    select
                    label={t('lbl-variable-output')}
                    value={val?.outputId || ''}
                    onChange={(e) =>
                      handleFieldChange(index, name, {
                        ...val,
                        outputId: e.target.value,
                      })
                    }
                  />
                </>
              )}

              {val?.mode === VariableEnum.Widget && (
                <>
                  <TextField
                    {...DEFAULT_PROPS}
                    required
                    select
                    label={t('lbl-variable-dspaths')}
                    value={value?.paths ? JSON.stringify(value.paths) : ''}
                    onChange={(e) =>
                      handleFieldChange(index, name, {
                        ...val,
                        paths: JSON.parse(e.target.value),
                      })
                    }
                  />
                </>
              )}
            </ListItemText>

            <IconButton
              onClick={() => {
                const newFields = [...fields];

                newFields.splice(index, 1);
                setFields(newFields);

                onChange(
                  Object.fromEntries(newFields) as NonNullable<typeof value>
                );
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
          onClick={() => setFields([...fields, ['', {}]])}
        >
          {t('btn-fetch-add-header')}
        </Button>
      </AccordionActions>
    </Accordion>
  );
}
