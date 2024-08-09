# pomodoro-vue

This is a simple Vue.js project using TS & SCSS.

The UI reference used to build it – [link to Figma](<https://www.figma.com/design/8tfYjeBj2KTV9uvGcMUCQf/%E2%8F%B0-Pomo---Pomodoro-Timer-App-Prototype-(v-0.1.0)-(Community)?node-id=1-10071&t=UYrOoGTGqPpOXYtv-11>)

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
yarn build
yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
