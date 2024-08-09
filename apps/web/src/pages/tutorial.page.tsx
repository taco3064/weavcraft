import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Core from '@weavcraft/core';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { GetServerSideProps } from 'next';

import { Breadcrumbs, MainLayout } from '~web/containers';
import { PageContainer, WeavcraftSEO } from '~web/components';
import { getTranslations } from './common.server.side';
import { makePerPageLayout } from './common.client.side';
import { useTutorialLessons } from '~web/hooks';

export default makePerPageLayout(MainLayout)(function TutorialsPage() {
  const tutorials = useTutorialLessons();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(tutorials[0].id);

  return (
    <PageContainer maxWidth="sm">
      <WeavcraftSEO
        title={t('ttl-breadcrumbs.tutorial.label')}
        description={t('ttl-breadcrumbs.tutorial.description')}
        keywords={t('ttl-breadcrumbs.tutorial.keywords')}
        path="/tutorial"
      />

      <Breadcrumbs
        disableGutters
        disableHeaderTitle
        currentPageTitle={t('ttl-breadcrumbs.tutorial.label')}
      />

      <Typography variant="body2" color="text.secondary" paragraph>
        {t('tutorial:msg-feature-description')}
      </Typography>

      <Container disableGutters maxWidth={false}>
        {tutorials.map(({ id, label, icon, href, items }) => (
          <Accordion
            key={id}
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
                    );
                  }

                  return null;
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </PageContainer>
  );
});

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: {
    ...(await getTranslations(ctx)),
  },
});
