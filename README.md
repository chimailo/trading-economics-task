This is my implementation of the task to create a web application that displays data from the [`Trading Economics API`](https://api.tradingeconomics.com). The free tier of the api was used for this task, hence available country selection is limited to Mexico, New Zealand, Sweden and Thailand.

To view the project live, go to [`Trading Economics Task`](https://tradingeconomics-task.vercel.app)

## Installation

> **📘** This is a javascript project that runs on node js, make sure you have node >= v18 and npm >= v10

Using the following steps, the project can be set up locally:

1. Clone this repo from the main branch

2. Install the necessary dependencies with any of the follwing commands

```bash
npm run install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Get a token by going to [`Trading Economics API`](https://api.tradingeconomics.com) and following the instructions there to generate your token

4. Create a `.env` file in the root of your project and add the following values:

```
TE_TASK_API_BASE_URL=https://api.tradingeconomics.com
TE_BASE_URL=https://tradingeconomics.com
TE_TASK_API_KEY=YOUR_TRADING_ECONOMICS_TOKEN
```

4. Run the command below to start the dev server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Go to your browser and start interacting with the app.
