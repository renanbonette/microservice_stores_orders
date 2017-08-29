import dotenv from 'dotenv';

dotenv.config();
export default {
  database: `${process.env.database}_${process.env.enviroment}`,
  database_user: process.env.database_user,
  database_password: process.env.database_password,
  params: {
    port: 5432,
    host: 'localhost',
    dialect: 'postgres',
    define: {
      underscored: true,
    },
  },
  jwtSecret: `${process.env.SecretKeyClickCollect}`,
  jwtSession: { session: false },
};
