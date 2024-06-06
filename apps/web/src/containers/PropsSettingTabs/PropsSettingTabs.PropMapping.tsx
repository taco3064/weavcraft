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
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import _get from 'lodash/get';
import { useTranslation } from 'next-i18next';

import { usePropMapping } from './PropsSettingTabs.hooks';
import type { DataBindingProps } from './PropsSettingTabs.types';

export default function PropMapping({
  classes,
  config,
  elevation,
  expanded,
  onChange,
  onExpand,
}: DataBindingProps) {
  const { widget, props = {} } = config;
  const { t } = useTranslation();
  const { items, onMappingChange } = usePropMapping(config, onChange);

  return items.map(([path, { definition }], i) => (
    <Accordion
      key={path}
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
            {path}
          </Typography>
        </Typography>
      </AccordionSummary>

      <Divider />

      <AccordionDetails>
        <List>
          {definition?.sort().map((propName) => {
            const value = _get(props, [path, 'value', propName]) || '';

            return (
              <ListItem disableGutters key={propName}>
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
                      placeholder={t('widgets:msg-prop-mapping-placeholder')}
                      value={value}
                      onChange={(e) =>
                        onMappingChange(path, propName, e.target.value)
                      }
                      InputProps={{
                        endAdornment: !value ? null : (
                          <InputAdornment position="end">
                            <Button
                              variant="text"
                              color="inherit"
                              size="small"
                              onClick={() =>
                                onMappingChange(path, propName, '')
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

        <Typography variant="caption" color="text.secondary" gutterBottom>
          {t('widgets:msg-prop-mapping-description', {
            widget: t(`widgets:lbl-widgets.${widget}`),
          })}
        </Typography>
      </AccordionDetails>
    </Accordion>
  ));
}