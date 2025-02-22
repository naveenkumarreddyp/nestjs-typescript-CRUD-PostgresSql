import { knex } from 'knex';
import { Model } from 'objection';
import * as dotenv from 'dotenv';

dotenv.config();

const knexInstance = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 5432,
  },
  pool: { min: 2, max: 10 },
  acquireConnectionTimeout: 10000,
});

Model.knex(knexInstance);

export default knexInstance;
