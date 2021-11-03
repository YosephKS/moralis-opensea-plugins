# Moralis OpenSea Plugins

This repository contains the code for the Moralis OpenSea Youtube tutorial. It is a simple implementation of an NFT Marketplace dApp using React framework, mainly to showcase the simplicity of using Moralis OpenSea Plugin.

---

## Table of Contents

- [Pre-requisites](https://github.com/YosephKS/moralis-opensea-plugins#1-pre-requisites)
- [Getting Started](https://github.com/YosephKS/moralis-opensea-plugins#2-getting-started)
- [Production](https://github.com/YosephKS/moralis-opensea-plugins#3-production)

---

## 1. Pre-requisites

- Node.js

Check whether you have Node.js in your machine with the following command, otherwise click [here](https://nodejs.org/en/) to install it.

```bash
node -v
```

- NPM/Yarn

If you have installed Node.js in your machine, NPM will already be installed along with it. Check whether NPM is installed within your machine with the following command. 

```bash
npm -v
```

Otherwise, if you want to use Yarn as your package manager. Go to its [official website](https://yarnpkg.com/) and follow the installation process. Once installed, check Yarn with the following command.

```bash
yarn -v
```

- Moralis Account

If you have not signed up to Moralis yet, click [here](https://admin.moralis.io/register) to register and get your free Moralis Admin account in just a few minutes!

---

## 2. Getting Started

- Clone Project

```bash
git clone https://github.com/YosephKS/moralis-opensea-plugins.git
```

- Install Dependencies

```bash
# NPM
npm i

# Yarn
yarn
```

- Add Moralis `appId` and `serverUrl`

Create a `.env` file by copying `.env.example` and fill in these environment variables.

```
REACT_APP_MORALIS_APP_ID=xxx
REACT_APP_MORALIS_SERVER_URL=xxx
```

If you would like to hardcode the `appId` and `serverUrl`, go to `src/index.js` and place those variables directly in the file.

```js
<MoralisProvider appId="xxx" serverUrl="xxx">
	<App />
</MoralisProvider>
```

- Run the project

```bash
# NPM
npm run start

# Yarn
yarn start
```
---

## 3. Production

To use the code for production, compile the build version and run the following command

```bash
# NPM
npm run build

# Yarn
yarn build
```

Once the building process is completed (whether locally or remotely in CI/CD), deploy the build version to your favorite hosting service.

---

### License

[GNU GPL v3.0](https://github.com/YosephKS/moralis-opensea-plugins/blob/main/LICENSE)
