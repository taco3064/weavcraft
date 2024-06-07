import MuiBox from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import MuiCardActions from '@mui/material/CardActions';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardHeader from '@mui/material/CardHeader';
import MuiCardMedia from '@mui/material/CardMedia';
import MuiTypography from '@mui/material/Typography';
import type { JsonObject } from 'type-fest';

import { WidgetWrapper } from '../../styles';
import { useCommonStyles } from '../../styles';
import { useGenerateProps } from '../../hooks';
import type { CardProps } from './Card.types';

export default function Card<D extends JsonObject>(props: CardProps<D>) {
  const [
    GenerateDataProvider,
    {
      children,
      component,
      maxWidth,

      //* Header
      avatar,
      description,
      headerAction,
      title,

      //* Footer
      footerAction,
      footerJustify,

      //* Media
      mediaHeight,
      mediaPosition = 'top',
      mediaSrc,
      mediaType,
      mediaWidth,

      onSubmit,
    },
  ] = useGenerateProps<D, CardProps<D>>(props);

  const { classes } = useCommonStyles();

  const isHeaderVisible = [avatar, description, headerAction, title].some(
    Boolean
  );

  const media =
    !mediaSrc || !mediaType ? null : (
      <MuiCardMedia
        data-testid="CardMedia"
        component={mediaType}
        controls
        src={mediaSrc}
        sx={{ height: mediaHeight, width: mediaWidth }}
      />
    );

  return (
    <GenerateDataProvider>
      <WidgetWrapper
        maxWidth={maxWidth}
        {...(component === 'form' && {
          component: 'form',
          onSubmit: onSubmit as never,
        })}
      >
        <MuiCard
          data-testid="Card"
          sx={{
            display: 'flex',
            flexDirection: /^(left|right)$/.test(mediaPosition)
              ? 'row'
              : 'column',
          }}
        >
          {mediaPosition === 'left' ? media : null}

          <MuiBox display="flex" flexDirection="column">
            {!isHeaderVisible ? null : (
              <MuiCardHeader
                data-testid="CardHeader"
                avatar={avatar}
                action={headerAction}
                title={title}
                subheader={description}
              />
            )}

            {mediaPosition === 'top' ? media : null}

            {!children ? null : (
              <MuiCardContent
                data-testid="CardContent"
                className={classes.flexColumn}
                sx={{ whiteSpace: 'pre-line' }}
              >
                {children}
              </MuiCardContent>
            )}

            {mediaPosition === 'bottom' ? media : null}

            {!footerAction ? null : (
              <MuiCardActions
                data-testid="CardActions"
                style={{ justifyContent: footerJustify }}
              >
                {footerAction}
              </MuiCardActions>
            )}
          </MuiBox>

          {mediaPosition === 'right' ? media : null}
        </MuiCard>
      </WidgetWrapper>
    </GenerateDataProvider>
  );
}
