const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: ['dist/**/*.entity{.ts,.js}'], // added .ts extension
    synchronize: false, // set to false when using migrations
    migrations: ['dist/migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations'
    },
    // migrationsTableName: 'migrations',
    logging: true // helps in debugging
});

module.exports = AppDataSource;