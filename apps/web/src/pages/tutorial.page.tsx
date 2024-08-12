import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout } from '~web/containers';
import { PageContainer } from '~web/components';
import { getTranslations } from './common.server.side';
import { makePerPageLayout } from './common.client.side';
import { useNextSeoProps, useTutorialLessons } from '~web/hooks';

export default makePerPageLayout(MainLayout)(function TutorialsPage() {
  const seoProps = useNextSeoProps();
  const tutorials = useTutorialLessons();

  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(tutorials[0].id);

  return (
    <PageContainer maxWidth="sm">
      <NextSeo
        {...seoProps}
        title={`${t('ttl-breadcrumbs.tutorial.label')} | ${t('ttl-weavcraft')}`}
        description={t('ttl-breadcrumbs.tutorial.description')}
      />

      <Breadcrumbs
        disableGutters
        currentPageTitle={t('ttl-breadcrumbs.tutorial.label')}
      />

      <Container disableGutters maxWidth={false} component="nav">
        <List disablePadding>
          {tutorials.map(({ id, label, icon, href, items }) => (
            <ListItem key={id}>
              <Accordion
                id={id}
                expanded={expanded === id}
                onChange={(_e, isExpanded) => isExpanded && setExpanded(id)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Core.Icon color="primary" code={icon} />

                  <Typography variant="inherit" color="inherit" component="h2">
                    {t(label)}
                  </Typography>
                </AccordionSummary>

                <Divider />

                <AccordionDetails>
                  <List>
                    <ListItem disableGutters disablePadding>
                      <ListItemButton
                        LinkComponent={NextLink}
                        href={href as string}
                        sx={{ borderRadius: 2 }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Core.Icon code="faLink" />
                        </ListItemIcon>

                        <ListItemText
                          primary={t('tutorial:btn-sandbox-mode')}
                          secondary={t('tutorial:msg-sandbox-mode-description')}
                          primaryTypographyProps={{
                            variant: 'subtitle1',
                            color: 'secondary',
                            fontWeight: 'bolder',
                            component: 'h3',
                          }}
                          secondaryTypographyProps={{
                            variant: 'caption',
                            color: 'text.secondary',
                            whiteSpace: 'pre-line',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>

                    {items?.map((item) => {
                      if (item && item !== 'divider') {
                        const { label, href } = item;

                        return (
                          <ListItem key={label} disableGutters disablePadding>
                            <ListItemButton
                              LinkComponent={NextLink}
                              href={href as string}
                              sx={{ borderRadius: 2 }}
                            >
                              <ListItemIcon>
                                <Core.Icon code="faLink" />
                              </ListItemIcon>

                              <ListItemText
                                primary={t(`${label}.label`)}
                                secondary={t(`${label}.description`)}
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
                          </ListItem>
                        );
                      }

                      return null;
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
        </List>
      </Container>
    </PageContainer>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getTranslations(ctx)),
  },
});
