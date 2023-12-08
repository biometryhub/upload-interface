# GRDC Trials

This project attempts to standardize how farming research data could be stored in a centralized database
including:

- A schema for related tables
- A web application for uploading/inputting data
- An API server for the web app to insert data into the database

## Table of Contents

<!-- vim-markdown-toc GFM -->

* [Development](#development)
    * [Prerequisites](#prerequisites)
    * [Local Server](#local-server)
    * [Deployment](#deployment)
        * [Docker](#docker)
* [Features](#features)

<!-- vim-markdown-toc -->

## Development

### Prerequisites

1.  [Node.js][node-js]
2.  [Docker][docker]

### Local Server

Start a PostgreSQL instance,

```sh
docker-compose down && docker-compose up -d
```

Start a web app on [http://localhost:3000][local-server],

```sh
# yarn
yarn dev

# npm
npm run dev
```

### Deployment

#### Docker

Build,

```sh
docker build -t upload-interface .
```

Run,

```sh
docker run -it -p 3000:3000 upload-interface
```

## Features

- [] Parse operational management excel file.
- [] Add subplot as a dropdown selection with confirmation.

<!-- external -->
[node-js]: https://nodejs.org/
[docker]: https://www.docker.com/

<!-- local -->
[local-server]: http://localhost:3000
