import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions = {
  type: 'sqlite',
  database: './db.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // migrations: ['./src/database/migrations/*.ts'],
  cli: {
    entitiesDir: "__dirname + '/**/*.entity{.ts,.js}'",
    // migrationsDir: 'src/migrations',
  },
  // database: configService.get('DB_NAME'),
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/src/database/migrations/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(
  dataSourceOptions as DataSourceOptions,
);
