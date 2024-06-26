[![Netlify Status](https://api.netlify.com/api/v1/badges/797c0d93-20a9-4fb5-bb52-5a35532e458d/deploy-status)](https://app.netlify.com/sites/chatbot-flow-builder-storybook/deploys)

## Chatbot Flow builder

Build with CSR side React v18, react-flow, and storybook for all the reusable component

- To visit the story-book view kindly visit [chromatic url.](https://663cfbee0db27ed66a484fc0-vmodbfxiyp.chromatic.com/)
  - Story-book can be used to visualize both, individual component and App component or say Root.
- To visit the deployed version on netlify kindly visit the [url.](https://chatbot-flow-builder-storybook.netlify.app/)

This project also uses third party `use-debounce` hook instead of `useDefferedValue` hook because not only `useDefferedValue` brings more complexity but it was also un-related to my use case.

## Installation

```bash
npm install # or `pnpm install` or `yarn install`
```

## Run locally

```bash
npm run dev
```

## Build for production.

```bash
npm run build
```
This will first run the typescript, lint and prettier checks and if it succeed then it will build the production.