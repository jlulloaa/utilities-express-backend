import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config()

const [host, port] = process.env.DB_HOST.split(':');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host,
  port,
  dialect: 'mysql' // or 'mariadb' if you're using MariaDB
});

export default sequelize;
