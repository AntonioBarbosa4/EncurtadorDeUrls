## 💇🏻‍♂️ About the project

This api provides everything you need to shorten a url.

The shortened url generated is two hours long, if a url that did not sneeze is submitted, the same shortened url will be returned.

## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Date-fns](https://date-fns.org/)
- [Tsyringe](https://github.com/microsoft/tsyringe)
- [Class-transformer](https://github.com/typestack/class-transformer)
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Getting started

Import the `Insomnia.json` on Insomnia App or click on [Run in Insomnia](#insomniaButton) button

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)

> Obs.: I recommend use docker

**Clone the project and access the folder**

```bash
$ git clone https://github.com/afpb04/EncurtadorDeUrls.git && cd
EncurtadorDeUrls
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
# The aws variables do not need to be filled for dev environment
$ cp .env.example .env

# Create the instance of postgreSQL using docker
$ docker run --name shortener-postgres -e POSTGRES_USER=postgres
              -e POSTGRES_DB=shortener -e POSTGRES_PASSWORD=docker
              -p 5432:5432 -d postgres

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# To finish, run the api service
$ yarn dev:server

# Well done, project is started!
```
## 👨‍🏭 How to use the api
To shorten your url make a post on the following route:
```bash
http://localhost:3333/encurtador
```
Sending in the body:
```bash
$ {"url": "http://www.exemple.com"}
```
Api return is shortener url:

```bash
$ {  "newUrl": "http://localhost:3333/95f8c747" }
```

## Test the api on heroku

To shorten your url make a post on the following route:
```bash
https://shortenedurls.herokuapp.com/encurtador
```
Sending in the body:
```bash
$ {"url": "http://www.exemple.com"}
```
Api return is shortener url:

```bash
{"newUrl": "https://shortenedurls.herokuapp.com/17d9481d"}
```

## Postman

API documentation: https://documenter.getpostman.com/view/14675598/TWDZHwFt#error-codes
