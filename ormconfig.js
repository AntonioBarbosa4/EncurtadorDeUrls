module.exports = {

  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    "./dist/src/modules/**/infra/typeorm/entities/*.js"
  ],
  "migrations": [
    "./dist/src/shared/infra/typeorm/migrations/*.js"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations/"
  },
  "ssl": {
    rejectUnauthorized: false
  }
}
