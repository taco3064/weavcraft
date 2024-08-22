import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useBreakpointMatches, type BreakpointValues } from '@weavcraft/core';
import { useEffect, useId, useMemo, useState } from 'react';

import { useMainStyles } from './ViewportFrame.styles';
import { useTutorialMode } from '~web/contexts';

import type {
  FrameStyle,
  StyleParams,
  ViewportFrameProps,
} from './ViewportFrame.types';

const FRAME_STYLE: BreakpointValues<FrameStyle> = {
  xs: 'mobile',
  sm: 'tablet',
  lg: 'laptop',
};

export default function ViewportFrame<T>({
  breakpoint,
  config,
  maxWidth = false,
  variant,
}: ViewportFrameProps<T>) {
  const id = useId();
  const isTutorialMode = useTutorialMode();

  const [loading, setLoading] = useState(true);

  const [styleParams, setStyleParams] = useState<StyleParams>({
    breakpoint,
    scale: 1,
    translateY: 0,
  });

  console.log(styleParams);

  const { matched: style } = useBreakpointMatches(FRAME_STYLE, breakpoint);
  const { classes, theme, cx } = useMainStyles(styleParams);

  const observer = useMemo(
    () =>
      new ResizeObserver(([{ target }]) => {
        const {
          width: frameWidth,
          height: frameHeight,
          top: frameTop,
        } = target.getBoundingClientRect();

        const elementCenterY = frameTop + frameHeight / 2;
        const screenCenterY = window.innerHeight / 2;

        setStyleParams({
          breakpoint,
          scale: Math.min(
            1,
            frameWidth /
              (40 +
                Math.max(
                  process.env.NEXT_PUBLIC_XS_WIDTH,
                  theme.breakpoints.values[breakpoint]
                ))
          ),
          translateY: Math.max(0, screenCenterY - elementCenterY),
        });
      }),
    [breakpoint, theme]
  );

  useEffect(() => {
    const el = document.getElementById(id);

    if (el) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [id, observer]);

  return (
    <Container disableGutters maxWidth={maxWidth} className={classes.container}>
      <Paper id={id} className={cx(classes.root, classes[style])}>
        <Container disableGutters maxWidth={false} className={classes.content}>
          <Backdrop role="progressbar" open={loading}>
            <CircularProgress />
          </Backdrop>

          <iframe
            title="Viewport"
            src={`/preview/${variant}?${new URLSearchParams({
              id,
              mode: isTutorialMode ? 'tutorial' : 'normal',
            }).toString()}`}
            onLoad={() => {
              global.sessionStorage?.setItem(id, JSON.stringify(config));
              setLoading(false);
            }}
          />
        </Container>
      </Paper>
    </Container>
  );
}
