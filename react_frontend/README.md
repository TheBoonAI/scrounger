# React Frontend

The frontend application is a [React](https://reactjs.org/) app running in the 
[Next.js](https://nextjs.org/) framework. [Tailwind CSS](https://tailwindcss.com/docs) is 
used for styling and [SWR](https://swr.now.sh/) handles data fetching from the backend application.
This application is responsible for rendering and serving all pages that are sent to the client.

- [Tooling](#tooling)
- [Conventions](#conventions)
- [Getting Started](#getting-started)
- [Libraries](#libraries)

## Tooling

[ESLint](#eslint) and [Prettier](#prettier) are used for formatting.
[Jest](https://jestjs.io/docs/en/22.x/getting-started) and
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
are used for testing. Dependencies are managed with
[npm](https://www.npmjs.com/get-npm).

### ESLint

[ESLint](http://eslint.org/) is a linting utility for JavaScript. We almost
completely adhere to the
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) through
the
[eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
plugin.

Linting is checked with `npm run lint`.

### Prettier

[Prettier](https://prettier.io/) is an
[opinionated](http://jlongster.com/A-Prettier-Formatter) JavaScript formatter.
It removes all original styling and ensures that all outputted JavaScript
conforms to a consistent style.

We suggest you install a
[plugin for your favorite editor](https://prettier.io/docs/en/editors.html) that
reformats your code every time you save it.

### Jest testing

[Jest](https://jestjs.io/) is a modern, low configuration testing platform, that
comes with built-in code coverage reports. Use `npm test` to run tests in watch
mode as you code.

## Conventions

There are two main folders at the root of the application: `/pages` and `/src`.

#### /pages

`pages` are a convention dictated by the
[Next.js](https://nextjs.org/docs/basic-features/pages) framework and correspond
to routed `urls`. We only import and export React Components in these files,
opting instead to keep all components and logic within the `/src` folder.

#### /src

`src` contains everything else. Related things are all grouped together close to
the root level, so to prevent a deeply nested file structure. Components are
named based on their path relative to `src` (eg. '/src/Assets/Content' is named
'AssetsContent'). The goals of these conventions are better discoverability and
lower mental overhead.

## Getting Started

### Prerequisites
- Node.js Active LTS version [installed](https://nodejs.org/en/).

### Installation

Clone the project:
`git clone git@github.com:TheBoonAI/scrounger.git && cd scrounger/react_frontend`

Install dependencies: `npm install` (or `npm ci`)

### Development

Follow the instructions in `django_backend/README.md` to get the Django
backend running.

Run `npm run dev` to start a local development node server on
http://localhost:3000

### Production

Run `npm run build` and `npm start` to start a production build on
http://localhost:3000

## Libraries

### React

[React](https://reactjs.org/) is a scalable, component-based Javascript library
for building user interfaces.

### NextJS

[Next.js](https://nextjs.org/) is a React production framework used to
facilitate server-side rendering and enforce best practices.

### Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/docs) is used for styling. It's an
unopinionated CSS framework that allows developers to quickly write responsive,
in-line styling by providing low-level utilities.

### SWR

[SWR](https://swr.now.sh/) is our primary data fetching mechanism. It's a React
Hooks library that first returns the data from cache (stale), then sends the
fetch request (revalidate), and finally comes with the up-to-date data again.
