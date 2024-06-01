# SCS Client Webflow Templates Source Code

This repository contains the source code for SCS client webflow templates which mainly contains data fetching from SCS api and custom chart components for webflow.

## Table of Contents

- [Built With](#built-with)
- [Installation](#installation)
- [Development](#Development)
- [Outputting js files for production](#outputting-js-files-for-production)

## Built with

- Typescript
- Chart.js

## Installation

- This repo requires [pnpm](https://pnpm.io). You can [install it](https://pnpm.io/installation) with this command if it's absent in your system:

  ```bash
  npm i -g pnpm
  ```

- Clone this repo:

  ```bash
  git clone https://github.com/zarif-webflow/SCS-Api-Chart-Integration.git
  ```

- Run this in the cloned folder:

  ```bash
  pnpm i
  ```

## Development

- Make sure all of your main files are included in `bin/build.js` entry points:

  ```js
  const ENTRY_POINTS = ['src/index.ts', 'someOtherFile.ts'];
  ```

- Start the dev server which will serve your js files under `http://localhost:3000`.

  ```bash
  pnpm dev
  ```

- Copy the file links and use them in webflow.

## Outputting js files for production

- Make sure all of your main files are included in `bin/build.js` entry points:

  ```js
  const ENTRY_POINTS = ['src/index.ts', 'someOtherFile.ts'];
  ```

- Run this command to build the js files for production:

  ```bash
  pnpm build
  ```

- Get the js files from `dist` folder and upload it to a CDN to use the files.

<details>

<summary>Uploading to jsDelivr CDN</summary>

- Build the production js files
- Do a git commit
- Add a git version tag
- Push the git repo with tags
- Generate the CDN link from [here](https://www.jsdelivr.com/github)

</details>

<!-- TODO: List any MAJOR libraries/frameworks (e.g. React, Tailwind) with links to their homepages. -->
