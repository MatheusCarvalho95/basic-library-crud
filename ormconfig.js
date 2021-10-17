module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) ?? 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  seeds: ['dist/db/seeds/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  synchronize: false,
};
