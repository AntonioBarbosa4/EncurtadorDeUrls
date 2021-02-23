module.exports = {

  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations/"
  },

}
