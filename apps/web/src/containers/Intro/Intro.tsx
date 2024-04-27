import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { InView } from 'react-intersection-observer';
import { Trans } from 'next-i18next';
import type { Variant } from '@mui/material/styles/createTypography';

import { FallbackTrans } from '~web/components';
import { useBreakpointMatches } from '~web/hooks';
import { useMainStyles } from './Intro.styles';

const BASE_TIMEOUT = 1200;

export default function Intro() {
  const { classes } = useMainStyles();
  const { matched: size } = useBreakpointMatches({ xs: 'tiny', sm: 'normal' });

  const { matched: titleVariant } = useBreakpointMatches<Variant>({
    xs: 'h4',
    md: 'h3',
  });

  const { matched: subjectVariant } = useBreakpointMatches<Variant>({
    xs: 'h5',
    md: 'h4',
  });

  const { matched: contentVariant } = useBreakpointMatches<Variant>({
    xs: 'body1',
    md: 'h6',
  });

  return (
    <Container disableGutters className={classes.root} maxWidth={false}>
      <Grid container className={classes.paragraph} spacing={2}>
        <Fade in timeout={BASE_TIMEOUT}>
          <Grid item xs={12}>
            <Typography
              paragraph
              variant={titleVariant}
              color="secondary"
              fontWeight={600}
            >
              <FallbackTrans i18nKey="intro:ttl-welcome" value={size} />
            </Typography>
          </Grid>
        </Fade>

        <Fade in timeout={BASE_TIMEOUT * 2}>
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant={contentVariant} lineHeight={2}>
              <Trans i18nKey="intro:msg-intro" />
            </Typography>
          </Grid>
        </Fade>

        <Fade in timeout={BASE_TIMEOUT * 2}>
          <Grid item xs={12} sm={6} md={4}>
            <Slide in direction="left" timeout={BASE_TIMEOUT * 2}>
              <Image
                alt="Intro"
                src="/imgs/intro.png"
                width={1024}
                height={1024}
                style={{ transform: 'scale(0.8)' }}
              />
            </Slide>
          </Grid>
        </Fade>
      </Grid>

      <InView triggerOnce>
        {({ inView, ref }) => (
          <Grid container ref={ref} className={classes.paragraph} spacing={2}>
            <Fade in={inView} timeout={BASE_TIMEOUT}>
              <Grid item xs={12}>
                <Typography
                  paragraph
                  variant={subjectVariant}
                  color="secondary"
                  fontWeight={600}
                >
                  <FallbackTrans i18nKey="intro:ttl-themes" value={size} />
                </Typography>
              </Grid>
            </Fade>

            <Fade in={inView} timeout={BASE_TIMEOUT * 2}>
              <Grid item xs={12} sm={6}>
                <Slide in={inView} direction="right" timeout={BASE_TIMEOUT * 2}>
                  <Image
                    alt="Intro"
                    src="/imgs/intro-themes.png"
                    width={1800}
                    height={1646}
                    style={{ transform: 'scale(0.8)' }}
                  />
                </Slide>
              </Grid>
            </Fade>

            <Fade in={inView} timeout={BASE_TIMEOUT * 2}>
              <Grid item xs={12} sm={6}>
                <Typography variant={contentVariant} lineHeight={2}>
                  <Trans i18nKey="intro:msg-themes" />
                </Typography>
              </Grid>
            </Fade>
          </Grid>
        )}
      </InView>
    </Container>
  );
}
