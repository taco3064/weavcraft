import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import StorageIcon from '@mui/icons-material/Storage';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import _get from 'lodash/get';
import { useTranslation } from 'next-i18next';

import { PrimitiveIcons } from '~web/components';
import { useMappingValidation, usePropMapping } from './PropsSettingTabs.hooks';
import type { DataBindingProps } from './PropsSettingTabs.types';

export default function PropMapping({
  classes,
  elevation,
  expanded,
  onExpand,
  ...props
}: DataBindingProps) {
  const { config } = props;
  const { t } = useTranslation();
  const { invalid } = useMappingValidation(props);
  const { groups, onMappingChange } = usePropMapping(props);

  return (
    <>
      <Typography
        paragraph
        variant="caption"
        color="text.secondary"
        whiteSpace="pre-line"
      >
        {t('widgets:msg-prop-mapping-description', {
          widget: t(`widgets:lbl-widgets.${config.widget}`),
        })}
      </Typography>

      {groups.map(([mappingPath, items], i) => {
        const { [mappingPath]: errors = [] } = invalid;

        return (
          <Accordion
            key={mappingPath}
            component={Paper}
            elevation={elevation}
            expanded={expanded === i}
            onChange={(_e, isExpanded) => isExpanded && onExpand(i)}
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
                  {mappingPath}
                </Typography>
              </Typography>
            </AccordionSummary>

            <Divider />

            <AccordionDetails>
              <Typography
                variant="caption"
                color="text.secondary"
                whiteSpace="pre-line"
              >
                {t('widgets:msg-prop-mapping-placeholder')}
              </Typography>

              <List>
                {items.map(({ propPath, type }) => {
                  const error = errors.includes(propPath);

                  const value =
                    _get(config, ['props', mappingPath, 'value', propPath]) ||
                    '';

                  return (
                    <ListItem disableGutters key={propPath}>
                      <ListItemText
                        disableTypography
                        className={classes.row}
                        primary={
                          <TextField
                            {...{ error, value }}
                            fullWidth
                            variant="outlined"
                            size="small"
                            margin="none"
                            label={propPath}
                            helperText={
                              !error
                                ? undefined
                                : t('widgets:msg-prop-mapping-conflict')
                            }
                            onChange={(e) =>
                              onMappingChange(
                                mappingPath,
                                propPath,
                                e.target.value
                              )
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {PrimitiveIcons[type] || (
                                    <StorageIcon color="disabled" />
                                  )}
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Button
                                    variant="text"
                                    color={value ? 'error' : 'secondary'}
                                    size="small"
                                    onClick={() =>
                                      onMappingChange(
                                        mappingPath,
                                        propPath,
                                        value ? '' : propPath
                                      )
                                    }
                                  >
                                    {value
                                      ? t('btn-reset')
                                      : t('widgets:btn-set-as-prop-name')}
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
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
