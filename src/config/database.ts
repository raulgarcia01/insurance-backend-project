import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const connectionOptions: DataSourceOptions = {
  type: 'sqlite',
  database: `src/db/insurance.db`,
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/migrations/*.{js,ts}'],
  migrationsRun: false,
  subscribers: ['src/subscriber/**/*.ts'],
  dropSchema: false,
};

const dataSource = new DataSource(connectionOptions);

export default dataSource;
