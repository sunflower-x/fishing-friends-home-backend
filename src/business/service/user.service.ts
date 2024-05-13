
import User from '@/mysql/model/user.model';
import { userType } from '@/types';



// 查找数据是否有重复的数据
export const getUserInfo = async ({ id, userName }: userType) => {
  const whereOpt = {};

  // 判断传了那个数，就将那个数传入到 whereOpt中
  if (id) Object.assign(whereOpt, { id: id });
  if (userName) Object.assign(whereOpt, { user_name: userName });

  // 查找是否重复
  const res = (await User.findOne({
    attributes: ['id', 'user_name'],
    where: whereOpt,
  })) as any;

  return res ? res.dataValues : null;
};
