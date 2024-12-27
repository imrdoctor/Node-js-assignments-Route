import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('solution','root','',{
    host:"localhost",
  dialect: 'mysql'
});

export const checkdbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export const checkdbSync = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

export default sequelize;