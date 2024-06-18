import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';

import { EditorList, IconSwitch, PrimitiveFields } from '~web/components';
import { usePropItems } from './WidgetEditor.hooks';
import { usePropItemsStyles } from './WidgetEditor.styles';
import { useWidgetNodePaths } from '~web/hooks';
import type { PropItemsProps } from './WidgetEditor.types';

export default function PropItems({
  config,
  paths,
  onChange,
  onClose,
}: PropItemsProps) {
  const { t } = useTranslation();
  const { classes, cx } = usePropItemsStyles();
  const { pathDescription } = useWidgetNodePaths(paths);
  const { mappingItems, propItems, onMappingExpand } = usePropItems(config);

  return (
    <EditorList
      subIcon={<AutoAwesomeIcon color="primary" />}
      title={t('widgets:ttl-appearance')}
      onClose={onClose}
      description={
        <>
          <Typography variant="subtitle2" color="textPrimary">
            {t(`widgets:lbl-widgets.${config.widget}`)}
          </Typography>
          {pathDescription && `(${pathDescription})`}
        </>
      }
      render={(editorClasses) => (
        <>
          <ListItem>
            <ListItemText
              primary={t('widgets:msg-primitive-description')}
              primaryTypographyProps={{
                variant: 'caption',
                color: 'text.secondary',
                whiteSpace: 'pre-line',
              }}
            />
          </ListItem>

          {propItems.map(
            ({
              fieldPath,
              path,
              mappable,
              definition: { type, definition, required },
            }) => {
              const isExpanded = mappingItems[path];
              const { [path]: primitive } = config.props || {};
              const { [type]: render } = PrimitiveFields;

              return (
                <ListItem key={path} onClick={(e) => e.stopPropagation()}>
                  <ListItemIcon className={editorClasses.icon}>
                    {mappable && (
                      <Tooltip
                        title={
                          isExpanded
                            ? t('widgets:ttl-prop-mapping')
                            : t('widgets:ttl-default-value')
                        }
                      >
                        <IconSwitch
                          value={isExpanded ? 'mapping' : 'defaults'}
                          onChange={() => onMappingExpand(path)}
                          options={{
                            defaults: {
                              color: 'info',
                              icon: <SettingsOutlinedIcon />,
                            },
                            mapping: {
                              color: 'success',
                              icon: <StorageOutlinedIcon />,
                            },
                          }}
                        />
                      </Tooltip>
                    )}
                  </ListItemIcon>

                  <Collapse
                    orientation="horizontal"
                    in={!isExpanded}
                    classes={{
                      root: cx({ [classes.fullWidth]: !isExpanded }),
                    }}
                  >
                    <ListItemText
                      disableTypography
                      className={classes.row}
                      primary={render(
                        {
                          label: path,
                          required,
                          size: 'small',
                          value: primitive?.value,
                          variant: 'outlined',
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onChange: (value: any) =>
                            onChange(config, path, {
                              type: 'PrimitiveValue',
                              value,
                            }),
                        },
                        definition as never
                      )}
                    />
                  </Collapse>

                  {mappable && (
                    <Collapse
                      orientation="horizontal"
                      in={isExpanded}
                      classes={{
                        root: cx({ [classes.fullWidth]: isExpanded }),
                      }}
                    >
                      <ListItemText
                        disableTypography
                        className={classes.row}
                        primary={
                          <TextField
                            fullWidth
                            select
                            variant="filled"
                            size="small"
                            color="secondary"
                            margin="none"
                            label={path}
                            value={fieldPath || ''}
                            placeholder={t(
                              'widgets:msg-prop-mapping-placeholder'
                            )}
                            helperText={
                              !isExpanded
                                ? null
                                : t('widgets:lbl-default-value', {
                                    value:
                                      JSON.stringify(primitive?.value) ||
                                      t('lbl-none'),
                                  })
                            }
                            InputProps={{
                              disableUnderline: false,
                              endAdornment: !fieldPath ? null : (
                                <InputAdornment position="end">
                                  <Button
                                    variant="text"
                                    color="error"
                                    size="small"
                                    // onClick={() =>
                                    //   onMappingChange(
                                    //     mappingPath,
                                    //     propPath,
                                    //     value ? '' : propPath
                                    //   )
                                    // }
                                  >
                                    {t('btn-reset')}
                                  </Button>
                                </InputAdornment>
                              ),
                            }}
                          ></TextField>
                        }
                      />
                    </Collapse>
                  )}
                </ListItem>
              );
            }
          )}
        </>
      )}
    />
  );
}
