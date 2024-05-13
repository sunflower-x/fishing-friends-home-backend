import { DataTypes } from 'sequelize';
import seq from '@/mysql/db/seq.db';

// 创建数据库模型
const User = seq.define(
  'user',
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false, // 是否允许空
      unique: true, // 是否为独一无二
      autoIncrement: true,
      primaryKey: true, // 是否设置为主键
      comment: '用户id',
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false, // 是否允许空
      unique: true, // 是否为独一无二的
      comment: '用户账号',
    },
  },
  {
    tableName: 'user', // 强制创建表名
    freezeTableName: true, // 告诉sequelize不需要自动将表名变成复数
    comment: '用户信息表',
  },
);

export default User;
