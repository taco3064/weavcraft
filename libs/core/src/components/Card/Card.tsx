import MuiBox from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import MuiCardActions from '@mui/material/CardActions';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardHeader from '@mui/material/CardHeader';
import MuiCardMedia from '@mui/material/CardMedia';

import { WidgetWrapper } from '../../styles';
import { withGenerateDataProps } from '../../contexts';
import type { CardProps, MappablePropNames } from './Card.types';

export default withGenerateDataProps<CardProps, MappablePropNames>(
  function Card({
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
  }) {
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
              <MuiCardContent data-testid="CardContent">
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
    );
  }
);
