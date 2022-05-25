import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config: SqliteConnectionOptions = {
        "type": "sqlite",
        "database": "db.sqlite3",
        "synchronize": true,
        logging: true,
        "entities": ["dist/src/**/*.entity{.js, .ts}"],
        "migrations": ["dist/src/db/migrations/*{.js, .ts}"],
        "cli": {
            "migrationsDir": "src/db/migrations"
        }
}

export default config;

