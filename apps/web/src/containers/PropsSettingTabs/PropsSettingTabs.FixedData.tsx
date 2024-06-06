import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import _get from 'lodash/get';
import { JSONTree } from 'react-json-tree';
import { useState, useTransition } from 'react';
import { useTranslation } from 'next-i18next';
import type { JsonObject } from 'type-fest';

import DataCreateModal from './PropsSettingTabs.DataCreateModal';
import { ConfirmToggle } from '~web/components';
import { useFixedData } from './PropsSettingTabs.hooks';
import type { DataBindingProps } from './PropsSettingTabs.types';

export default function FixedData({
  config,
  elevation,
  expanded,
  onChange,
  onExpand,
}: DataBindingProps) {
  const [, startTransition] = useTransition();
  const [editing, setEditing] = useState<JsonObject>();
  const [open, setOpen] = useState(false);

  const { widget, props = {} } = config;
  const { t } = useTranslation();

  const { bindingFields, disabled, data, onDataChange } = useFixedData(
    config,
    onChange
  );

  return (
    <>
      <DataCreateModal
        {...{ bindingFields, open, widget }}
        data={editing}
        onChange={onDataChange}
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
              paragraph
              variant="subtitle1"
              color="text.disabled"
              justifyContent="center"
              fontWeight={600}
            >
              {t('widgets:msg-no-data')}
            </Typography>
          ) : (
            <JSONTree
              hideRoot
              theme="monokai"
              data={data}
              labelRenderer={(keyPath, _nodeType, expanded) => {
                const showActions =
                  keyPath.length === 1 &&
                  typeof keyPath[0] === 'number' &&
                  expanded;

                return (
                  <Box display="flex" gap={1} alignItems="center">
                    {keyPath[0]}:
                    {showActions && (
                      <>
                        <Tooltip title={t('widgets:btn-edit-data')}>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() =>
                              startTransition(() => {
                                setOpen(true);

                                setEditing(
                                  _get(props, ['records', 'value', keyPath[0]])
                                );
                              })
                            }
                          >
                            <Core.Icon code="faEdit" fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <ConfirmToggle
                          subject={t('ttl-delete-confirm')}
                          onConfirm={() => onDataChange(keyPath[0] as number)}
                          message={t('widgets:msg-delete-data-confirm')}
                          toggle={
                            <Tooltip title={t('widgets:btn-delete-data')}>
                              <IconButton size="small" color="error">
                                <Core.Icon code="faRemove" fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          }
                        />
                      </>
                    )}
                  </Box>
                );
              }}
            />
          )}

          <Typography variant="caption" color="text.secondary" gutterBottom>
            {t('widgets:msg-fixed-data-description')}
          </Typography>
        </AccordionDetails>

        <AccordionActions>
          {data && !Array.isArray(data) && (
            <ConfirmToggle
              subject={t('ttl-delete-confirm')}
              onConfirm={() => onDataChange(undefined)}
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
            onClick={() =>
              startTransition(() => {
                setOpen(true);

                if (data && !Array.isArray(data)) {
                  setEditing(data);
                }
              })
            }
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
