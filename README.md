![Caroster](./banner.jpg)

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

# Caroster - Group carpool to your event

Caroster is an easy and free app to organize group carpooling for an event, a party, a seminar, a sports event, a camp, a ski trip…

> Are you on GitHub ? Please use the [reference repository on GitLab](https://git.octree.ch/p/caroster) for issues and pull requests.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Caroster is composed of two parts:

- A frontend app based on [NextJS](https://nextjs.org/)
- A backend server using [Strapi](https://strapi.io/)

> Caroster is currently in Beta. Big changes can happen, especially in terms of data architecture.

### Prerequisites

To fully utilize your instance of Caroster, you will need an SMTP configuration to send emails.

#### (Optional) Mapbox token 

In order to activate geocoding and map features, you will need a Mapbox token.

[Create a mapbox account](https://account.mapbox.com/auth/signup/) if you don't have any and [generate your token for free](https://docs.mapbox.com/help/getting-started/access-tokens/#:~:text=You%20can%20find%20your%20access,using%20the%20Mapbox%20Tokens%20API.). 

There is no need to setup a payment method as long as you don't exceed [the temporary geocoding api free rate ](https://www.mapbox.com/pricing#temporary-geocoding-api), but if you do so, the app will still work and geocoding will simply disable till the end of the ongoing month.

Copy the mapbox token in the .env file as a value for "MAPBOX_TOKEN" variable to start using geocoding and map features;

#### Tiles server

You can use the TOKEN_FREE_TILES variables in the .env file to setup a tiles server used by the map features. By default, we use the [© OpenStreetMap ](https://www.openstreetmap.org/copyright) test server. 

Make sure to respect the copyrights of the tiles server you setup, or those from [© OpenStreetMap ](https://www.openstreetmap.org/copyright) if you keep the default settings.

> :warning: Be aware that some services might require a token to use their tiles server.
>
> We don't have yet developed a way to obfuscate this token from the users.

> :warning: This means anyone accessing the application will be able to use this token on your behalf, which exposes you to substantial risks (financial, legal, reputational, operational) that may affect you and the disponibility of the service.

### Installing

Clone the repo locally:

```shell
git clone https://git.octree.ch/p/caroster.git
cd caroster
```

### Run with Docker

First, edit `docker-compose.yml` to provide your SMTP configuration and optional Mapbox token:

```yaml
version: "3"
services:
  app:
    ...
    MAPBOX_TOKEN: pk.mapbox.token

    SMTP_HOST: smtp.myserver.org
    SMTP_PORT: 587
    SMTP_USERNAME: user
    SMTP_PASSWORD: password
...
```

Then, create containers with Docker Compose:

```shell
docker compose up
```

Wait a few minutes while the application downloads needed packages,
then go to http://localhost:8080.

You can log on http://localhost:8080/admin with email `admin@example.org`
and password `caroster`.

## Development

### Frontend

These steps will prepare the frontend to run in development mode.

```shell
cd frontend
yarn # or 'npm install'
yarn dev
```

The frontend is now accessible on http://localhost:3000

### Backend

These steps will prepare and configure the backend to run in development mode.

> You need a Postgres database running locally. Start one with `docker compose up psql -d`.

```shell
cd backend
yarn # or 'npm install'
cp .env.example .env
vi .env # Edit with your own configuration
yarn develop
```

The Strapi server is now ready and the admin is accessible on http://localhost:1337/admin.

## Running the tests

A few tests are available to check GraphQL endpoints behavior in the `e2e` directory.

First, run Strapi in test mode:

```shell
cd backend
cp .env.example .env
vi .env # Edit with your own configuration
yarn start-test
```

Then, run the tests:

```shell
cd e2e
yarn
yarn gql
yarn test
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- [Octree](https://github.com/octree-gva) - sustainable startup studio - https://octree.ch

See also the list of [contributors](https://github.com/octree-gva/caroster/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
