# Caroster - Group carpool to your event 

Caroster is an easy and free app to organize group carpooling for an event, a party, a seminar, a sports event, a camp, a ski trip…

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Caroster is composed of two parts:

- A frontend app based on [NextJS](https://nextjs.org/)
- A backend server using [Strapi](https://strapi.io/)

### Prerequisites

To fully utilize your instance of Caroster, you will need an SMTP configuration to send emails.

### Installing

Clone the repo locally:

```shell
git clone https://github.com/octree-gva/caroster.git
cd caroster
```

#### Frontend

These steps will prepare the frontend to run in development mode.

```shell
cd frontend
yarn # or 'npm install'
yarn dev
```

The frontend is now accessible on http://localhost:3000

#### Backend

These steps will prepare and configure the backend to run in development mode.

```shell
cd backend
yarn # or 'npm install'
cp .env.example .env
nano .env # Edit with your own configuration
yarn develop
```

The Strapi API is now ready and the admin is accessible on http://localhost:1337/admin.

## Running the tests

A few tests are available to check GraphQL endpoints behavior in the `e2e` directory.

First, run Strapi un test mode:

```shell
cd backend
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
