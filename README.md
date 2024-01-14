# Solution Documentation

## Getting Started

### launch the app

Open a new terminal window, run the command under the root folder

```
# install the dependencies if you haven't done it yet
# `npm install`

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Overview

- The app is built with Next.js, TypeScript and Apollo client and GraphQL.
- This project uses the [Rick and Morty GraphQL API](https://rickandmortyapi.com/documentation/#graphql) for querying data.
- This project utilizes mock API functions that use `localStorage` for storing and retrieving data. These mock functions simulate data persistence but should be replaced with a more robust solution in a production environment.
- This project currently employs the "Authenticating Statically Generated Pages" pattern for simplicity and quick setup. Keep in mind that in a production environment, it's recommended to use the "Authenticating Server-Rendered Pages" pattern for enhanced user experience.

## Deployment

The project is deployed on Vercel and can be accessed at the following URL:

[Production Deployment](https://)
