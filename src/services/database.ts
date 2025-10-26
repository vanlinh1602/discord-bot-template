import { Sequelize } from 'sequelize';
import SQLite from 'sqlite3';

export default () => {
  const logging = process.env.NODE_ENV === 'development';

  let sequelize;
  if (process.env.PG_PORT) {
    sequelize = new Sequelize(
      process.env.PG_DATABASE || 'postgres',
      process.env.PG_USER || 'postgres',
      process.env.PG_PASSWORD || '',
      {
        host: process.env.PG_HOST || 'localhost',
        port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
        dialect: 'postgres',
        logging,
        define: {
          freezeTableName: true,
        },
      }
    );
  } else {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'database.sqlite',
      logging,
      dialectOptions: {
        // eslint-disable-next-line no-bitwise
        mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
      },
      define: {
        freezeTableName: true,
      },
    });
  }

  return sequelize;
};
