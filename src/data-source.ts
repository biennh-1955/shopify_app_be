import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Shop } from './entities/Shop';
import { Customization } from './entities/Customization';
import { Translation } from './entities/Translation';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,   
  logging: false,
  entities: isProduction ? ['dist/entities/*.js'] : [Shop, Customization, Translation],
  migrations: isProduction ? ['dist/migrations/*.js'] : ['src/migrations/*.ts'],
});