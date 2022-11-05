# FamPay-Assignment


## Contents
- [Problem Statement](#problem-statement)
- [Steps to run](#steps-to-run)
  - [Using Docker](#using-docker)
  - [npm scripts](#npm-scripts)
- [API endpoints](#api-endpoints)
    - [1. /api](#1-api) (API status & Search Query info)
    - [2. /api/videos](#2-videos) (Get Videos in reverse chronological order)
    - [3. /api/videos/s](#3-videoss) (Search videos)
    
    
## Problem Statement
To make an API to fetch latest videos sorted in reverse chronological order of their publishing date-time from YouTube for a given tag/search query in a paginated response.

## Steps to run

#### NOTE: Make sure to setup the `.env` file with relevent details as provided in `.env.sample`.
#### NOTE: Multiple API keys can be used by concatinating them using `|` in between each like `KEY1|KEY2|KEY3`.

### Using Docker
Use `docker-compose` to test the app locally. Make sure to make relevant changes to the environment variables in `docker-compose.yml` file. Use the following command to build and start the app:
```bash
docker-compose up --build
```

### npm scripts
The `package.json` file contains dependencies needed to run the project.

```bash
npm install
```

The `package.json` file contains script `start` for running locally, run it using.

```bash
npm start
```

## API endpoints
#### 1. `/api`
```
URL: /api
Request type: GET
```

#### 2. `/videos`
```
URL: /api/videos:page?
Example: /api/videos?page=2
Request type: GET
Optional data parameters: page (default: 1)
```

NOTE: The `page` parameter is optional and defaults to page 1.

#### 3. `/videos/s`
```
URL: /api/videos/s:q?:page?
Example: /api/videos/s?q=cricket?page=2
Request type: GET
Data parameters: searchString (q)
Optional data parameters: page (default: 1)
```

NOTE: The `q` parameter if having multiple words then seperate it by `-` (example: "hello world" -> `q=hello-world`).
