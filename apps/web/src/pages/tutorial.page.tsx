import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';
import { Display } from '@weavcraft/core';
import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout } from '~web/containers';
import { getServerSideTranslations } from './pages.utils';
import { makePerPageLayout } from '~web/contexts';
import { useTutorialLessons } from '~web/hooks';
import { usePageStyles } from './pages.styles';

export default makePerPageLayout(MainLayout)(function TutorialsPage() {
  const { t } = useTranslation();
  const { replace } = useRouter();
  const { classes } = usePageStyles();
  const { expanded, tutorials } = useTutorialLessons('expand');

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <Breadcrumbs
        disableGutters
        currentPageTitle={t('ttl-breadcrumbs.tutorial.label')}
      />

      <Container disableGutters maxWidth={false}>
        {tutorials.map(({ id, label, icon, href, items }) => (
          <Accordion
            key={id}
            id={id}
            expanded={expanded === id}
            slotProps={{ transition: { timeout: 600 } }}
            onChange={(_e, isExpanded) =>
              isExpanded &&
              replace(`/tutorial?expand=${id}`, '/tutorial', { shallow: true })
            }
          >
            <AccordionSummary
              expandIcon={
                expanded === label ? null : <Display.Icon code="faAngleDown" />
              }
            >
              <Display.Icon color="primary" code={icon} />
              <Trans i18nKey={label} />
            </AccordionSummary>

            <Divider />

            <AccordionDetails>
              <List>
                <ListItemButton
                  LinkComponent={NextLink}
                  href={href as string}
                  sx={{ borderRadius: 2 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Display.Icon code="faLink" />
                  </ListItemIcon>

                  <ListItemText
                    primary={<Trans i18nKey="tutorial:btn-sandbox-mode" />}
                    secondary={
                      <Trans i18nKey="tutorial:msg-sandbox-mode-description" />
                    }
                    primaryTypographyProps={{
                      variant: 'subtitle1',
                      color: 'secondary',
                      fontWeight: 'bolder',
                    }}
                    secondaryTypographyProps={{
                      variant: 'caption',
                      color: 'text.secondary',
                      whiteSpace: 'pre-line',
                    }}
                  />
                </ListItemButton>

                {items?.map((item) => {
                  if (item && item !== 'divider') {
                    const { label, href } = item;

                    return (
                      <ListItemButton
                        LinkComponent={NextLink}
                        key={label}
                        href={href as string}
                        sx={{ borderRadius: 2 }}
                      >
                        <ListItemIcon>
                          <Display.Icon code="faLink" />
                        </ListItemIcon>

                        <ListItemText
                          primary={<Trans i18nKey={`${label}.label`} />}
                          secondary={<Trans i18nKey={`${label}.description`} />}
                          primaryTypographyProps={{
                            variant: 'subtitle1',
                            color: 'secondary',
                            fontWeight: 'bolder',
                          }}
                          secondaryTypographyProps={{
                            variant: 'caption',
                            color: 'text.secondary',
                            whiteSpace: 'pre-line',
                          }}
                        />
                      </ListItemButton>
                    );
                  }

                  return null;
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Container>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getServerSideTranslations(ctx)),
  },
});
