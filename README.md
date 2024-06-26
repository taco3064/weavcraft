# Weavcraft

[![警报](https://sonarqube.royfuwei.dev/api/project_badges/measure?project=weavcraft-web&metric=alert_status&token=sqb_ce4a906ed0fae5a39374c58df13da7fc1d0ffb10)](https://sonarqube.royfuwei.dev/dashboard?id=weavcraft-web) web, [![警报](https://sonarqube.royfuwei.dev/api/project_badges/measure?project=weavcraft-api&metric=alert_status&token=sqb_e1bdd6a5abd15adffb0126a64d355e3c85e53e4c)](https://sonarqube.royfuwei.dev/dashboard?id=weavcraft-api) api, [![警报](https://sonarqube.royfuwei.dev/api/project_badges/measure?project=weavcraft-libs&metric=alert_status&token=sqb_1939738204883b581493590a57b98b3c8a0a06d5)](https://sonarqube.royfuwei.dev/dashboard?id=weavcraft-libs) libs

**Unleash Your Creativity, Craft Your Digital World.**
Weavcraft is your ultimate companion in the digital realm, empowering you to shape your online presence with effortless creativity. Seamlessly blending innovation with simplicity, Weavcraft offers a comprehensive toolkit designed to streamline the process of crafting stunning websites and dynamic user experiences.

## Libraries

- @weavcraft/core (Front-end): Simplifying Material-UI Components

## Development Guideline

- **Database**: The database is hosted on [MongoDB Atlas](https://account.mongodb.com/). Access MongoDB Atlas for database-related information.
- **Domain and SSL**: The domain is registered with [Cloudflare](https://www.cloudflare.com/), and the website's domain is **weavcraft.com**. SSL certificate is provided and configured by Cloudflare.
- **OAuth**: OAuth authentication is applied and configured via [Cloudflare](https://www.cloudflare.com/). Instructions on how to set up OAuth are provided.
- **Environment Variables**: Provide a list of environment variables that need to be set during deployment, including MongoDB connection string, OAuth configuration, and access credentials for **GCP Secret Manager**. The `@google-cloud/secret-manager` package is used to retrieve keys within the code.
- **Deployment Platform**: Frontend and backend code are expected to be deployed on [Heroku](https://dashboard.heroku.com/). All deployment operations are triggered and automated through **GitHub Actions**.

## Gitflow Overview

- **Main Branch**<br>
  This branch holds the primary source code. During development, branches are created from main for individual features or fixes. Upon completion, they are merged back into main via pull requests (PRs).
  PRs trigger **GitHub Actions CI**, performing checks for `lint`, `tsc`, and `test`. If errors occur, the PR cannot be merged.<br><br>
- **Production Branch**<br>
  This branch is reserved for **deployment purposes**.
  When ready for release, a PR is initiated from main targeting production.
  Upon merge, version numbers are updated, and a tag is applied to production.
  GitHub Actions are triggered to package and release apps/libs affected by the changes.
