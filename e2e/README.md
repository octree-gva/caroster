# E2E tests for Caroster

This directory is used to test all Graphql endpoints used by Caroster's frontend.

## Run tests

1. Install dependencies
   ```bash
   yarn
   ```
1. Refresh GQL generated file (if any change)
   ```bash
   yarn gql
   ```
1. Start Strapi in test env
   ```bash
   cd backend/
   yarn start-test
   ```
1. Run E2E tests
   ```bash
   cd e2e/
   yarn test # Add '--watch' for watch mode
   ```

## Credentials

### Admin & User

test@octree.ch | Testtest1

## How to generate a new template db

Tests need a seeded Sqlite db for Strapi.
Following Strapi upgrades, the db file has to be updated.

To generate a new template db, follow these steps:

1. Upgrade Strapi
1. Start Strapi with the old db file
1. Ensure following data are presents (Check `constants.ts` for right values):
   - User with email _test@octree.ch_ and password _Testtest1_
   - Event with UUID _2c336e59-087d-4dec-bf9b-f74b1ca22cd4_
   - Travel associated to the event
   - Vehicle associated to the user
   - Settings exist in fr and en
1. Stop Strapi
1. Rename `template.db` by `test.db` content in `e2e/strapi` directory
