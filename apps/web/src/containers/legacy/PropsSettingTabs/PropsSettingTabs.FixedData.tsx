import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import _get from 'lodash/get';
import { JSONTree } from 'react-json-tree';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';

import DataCreateModal from './PropsSettingTabs.DataCreateModal';
import { ConfirmToggle } from '~web/components';
import { useFixedData } from './PropsSettingTabs.hooks';
import type { DataBindingProps } from './PropsSettingTabs.types';

export default function FixedData({
  elevation,
  expanded,
  paths,
  widget,
  onExpand,
  ...props
}: DataBindingProps) {
  const { config } = props;
  const { t } = useTranslation();

  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<number>();
  const [open, setOpen] = useState(false);

  const { basePropPath, bindingFields, disabled, data, handleChange } =
    useFixedData(props);

  return (
    <>
      <DataCreateModal
        {...{ basePropPath, bindingFields, open }}
        key={open ? 'open' : 'close'}
        data={_get(props, ['records', 'value', editing as number])}
        widget={config.widget}
        onChange={(e) =>
          typeof editing === 'number'
            ? handleChange.update(e, editing)
            : handleChange.create(e)
        }
        onClose={() =>
          startTransition(() => {
            setOpen(false);
            setEditing(undefined);
          })
        }
      />

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
              variant="subtitle1"
              color="text.disabled"
              justifyContent="center"
              fontWeight={600}
              lineHeight={3}
            >
              {t('widgets:msg-no-data')}
            </Typography>
          ) : (
            <JSONTree
              hideRoot
              theme="monokai"
              data={data}
              shouldExpandNodeInitially={() => true}
              labelRenderer={(keyPath) => {
                const showActions =
                  keyPath.length === 1 && typeof keyPath[0] === 'number';

                return !showActions ? (
                  `${keyPath[0]}:`
                ) : (
                  <ConfirmToggle
                    triggerBy="onDelete"
                    subject={t('ttl-delete-confirm')}
                    onConfirm={() => handleChange.delete(keyPath[0] as number)}
                    message={t('widgets:msg-delete-data-confirm')}
                    toggle={
                      <Tooltip title={t('widgets:btn-edit-data')}>
                        <Chip
                          color="warning"
                          label={t('widgets:lbl-row', {
                            index: (keyPath[0] as number) + 1,
                          })}
                          onClick={(e) =>
                            startTransition(() => {
                              e.stopPropagation();

                              setOpen(true);
                              setEditing(keyPath[0] as number);
                            })
                          }
                        />
                      </Tooltip>
                    }
                  />
                );
              }}
            />
          )}

          <Typography
            paragraph
            variant="caption"
            color="text.secondary"
            whiteSpace="pre-line"
          >
            {t('widgets:msg-fixed-data-description', {
              widget: t(`widgets:lbl-widgets.${config.widget}`),
            })}
          </Typography>
        </AccordionDetails>

        <AccordionActions>
          {data && !Array.isArray(data) && (
            <ConfirmToggle
              subject={t('ttl-delete-confirm')}
              onConfirm={handleChange.delete}
              message={t('widgets:msg-delete-data-confirm')}
              toggle={
                <Button
                  color="error"
                  variant="contained"
                  startIcon={<Core.Icon code="faRemove" />}
                >
                  {t('widgets:btn-delete-data')}
                </Button>
              }
            />
          )}

          <Button
            color="secondary"
            variant="contained"
            startIcon={<Core.Icon code="faPlus" />}
            onClick={() => setOpen(true)}
          >
            {data && !Array.isArray(data)
              ? t('widgets:btn-edit-data')
              : t('widgets:btn-add-data')}
          </Button>
        </AccordionActions>
      </Accordion>
    </>
  );
}
