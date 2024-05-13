import seq from './seq.db';

// 建立模型之间的联系
const initRelation = () => {
  // 一对一关联 (关联表的关联顺序为 hasOne =》belongsTo，并且需要写在一张表内)


};

// 同步数据库，sequelize.sync()
const initDB = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise(() => {
    try {
      seq.authenticate();
      console.log('数据库连接成功');

      // 初始化model关系
      initRelation();

      seq.sync();

      // { alter: true }
    } catch (error) {
      console.log('数据库连接失败', error);
    }

    process.on('unhandledRejection', (error) => {
      // 此时解决上述数据库创建失败，catch无法捕获到
      console.log('数据库连接失败', error);
    });
  });

export default initDB;
