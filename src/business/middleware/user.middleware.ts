import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { userType, } from '@/types';
import errors from '@/app/err.type';
import { createHash, formatHumpLineTransfer} from '@/business/utils';
import env from '@/config/default';
import { getUserInfo } from '@/business/service/user.service';

const {
  userExisting,
  userLoginError,
  userDoesNotExist,
  userRegisterError,
  getUserInfoErr,
} = errors;


// 判断用户名是否重复
export const verifyUserMid = async (ctx: Context, next: () => Promise<void>) => {
  try {
    const { userName } = ctx.request.body as userType;
    if (await getUserInfo({ userName })) {
      console.error('用户名已存在!', ctx.request.body);
      ctx.app.emit('error', userExisting, ctx);
      return;
    }
  } catch (error) {
    console.error('获取用户信息错误', error);
    ctx.app.emit('error', userRegisterError, ctx);
  }

  await next();
};


// 判断用户是否存在，密码是否匹配
export const loginValidatorMid = async (ctx: Context, next: () => Promise<void>) => {
  console.log('执行了loginValidatorMid');
  
  const { userName } = ctx.request.body as userType;

  try {
    // 检查是否有重复的用户名，如果有返回 查询到的数据
    const res = await getUserInfo({ userName });

    if (!res) {
      console.error('用户名不存在', { userName });
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }
    console.log(res,'res');
    ctx.state.formatData={
      ...res
    }
    await next();
  } catch (error) {
    console.error(error);
    return ctx.app.emit('error', userLoginError, ctx);
  }
};

// 获取用户基本信息
export const getUserBaseMid = async (ctx: Context, next: () => Promise<void>) => {
  try {
    const { userName } = ctx.request.body as userType;
    const { password, ...res } = await getUserInfo({ userName });
    const data = formatHumpLineTransfer(res);

    ctx.state.user = data;
    await next();
  } catch (error) {
    console.error('获取用户基本信息失败', error);
    return ctx.app.emit('error', userLoginError, ctx);
  }
};


// 登录
export const loginMid = async (ctx: Context, next: () => Promise<void>) => {
  const { userId, userName } = ctx.state.user;

  // 获取用户信息（token 中包含 userId，userName） expiresIn : token有效时间
  try {
    // 1 生成随机的hash sessionId
    const hash = createHash();

    // 2 生成token
    ctx.state.formatData = {
      token: jwt.sign(
        {
          userId,
          userName,
          session: hash,
          exp: dayjs().add(100, 'y').valueOf(),
        },
        env().JWT_SECRET,
      ),
    };

    await next();
  } catch (error) {
    console.error('用户登录失败', error);
    return ctx.app.emit('error', getUserInfoErr, ctx);
  }
};



