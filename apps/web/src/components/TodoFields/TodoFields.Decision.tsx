import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import {
  DecisionLogicEnum,
  DecisionOperatorEnum,
  type DecisionTodo,
} from '@weavcraft/common';

import NoDataAvailable from './TodoFields.NoDataAvailable';
import { DEFAULT_PROPS } from './TodoFields.styles';
import { useFieldsStyles } from './TodoFields.styles';
import type { ConditionState, FieldsProps } from './TodoFields.types';

export default function DecisionFields({
  value,
  onChange,
}: FieldsProps<DecisionTodo>) {
  const { t } = useTranslation('pages');
  const { classes } = useFieldsStyles();

  const [conditions, setConditions] = useState<ConditionState[]>(
    value?.conditions || []
  );

  const handleConditionChange = (index: number, val: ConditionState) => {
    const newConditions = [...conditions];

    newConditions[index] = val;
    setConditions(newConditions);

    onChange({ ...value, conditions: newConditions } as NonNullable<
      typeof value
    >);
  };

  return (
    <>
      <TextField
        {...DEFAULT_PROPS}
        required
        select
        label={t('lbl-decision-logic')}
        value={value?.logic || ''}
        onChange={(e) =>
          onChange({ ...value, logic: e.target.value as DecisionLogicEnum })
        }
      >
        {Object.values(DecisionLogicEnum).map((option) => (
          <MenuItem key={option} value={option}>
            {t(`opt-decision-logics.${option}`)}
          </MenuItem>
        ))}
      </TextField>

      <Accordion expanded className={classes.headers}>
        <AccordionSummary>{t('ttl-conditions')}</AccordionSummary>

        <Divider />

        <List component={AccordionDetails}>
          {conditions.length === 0 && (
            <NoDataAvailable
              required
              message={t('msg-variable-no-conditions')}
            />
          )}

          {conditions.map((condition, index) => (
            <ListItem key={index} divider className={classes.item}>
              <ListItemText disableTypography>
                <TextField
                  {...DEFAULT_PROPS}
                  // required
                  select
                  label={t('lbl-decision-source')}
                  value={
                    condition?.source ? JSON.stringify(condition.source) : ''
                  }
                  onChange={(e) =>
                    handleConditionChange(index, {
                      ...condition,
                      source: JSON.parse(e.target.value),
                    })
                  }
                />

                <TextField
                  {...DEFAULT_PROPS}
                  // required
                  select
                  label={t('lbl-decision-operator')}
                  value={condition?.operator || ''}
                  onChange={(e) =>
                    handleConditionChange(index, {
                      ...condition,
                      operator: e.target.value as DecisionOperatorEnum,
                    })
                  }
                >
                  {Object.values(DecisionOperatorEnum).map((option) => (
                    <MenuItem key={option} value={option}>
                      {t(`opt-decision-operators.${option}`)}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  {...DEFAULT_PROPS}
                  select
                  label={t('lbl-decision-target')}
                  value={
                    condition?.target ? JSON.stringify(condition.target) : ''
                  }
                  onChange={(e) =>
                    handleConditionChange(index, {
                      ...condition,
                      target: JSON.parse(e.target.value),
                    })
                  }
                />
              </ListItemText>
            </ListItem>
          ))}
        </List>

        <AccordionActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setConditions([...conditions, {}])}
          >
            {t('btn-decision-add-condition')}
          </Button>
        </AccordionActions>
      </Accordion>
    </>
  );
}
