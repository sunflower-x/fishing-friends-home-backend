import Joi from 'joi';
import { Context } from 'koa';
import { userType } from '@/types';
import errors from '@/app/err.type';
import { username } from './config.schema';

const { FormatWrongErr } = errors;

export const loginSchema = Joi.object({
    userName: username,
});

export const resetPwdSchema = Joi.object({
    oldPwd: username,
});


// 判断用户名是否为空
export const userSchema = async (ctx: Context, next: () => Promise<void>) => {
    const { userName } = ctx.request.body as userType;
    
    try {
        await loginSchema.validateAsync({ userName });
    } catch (error) {
        console.error('用户名格式错误!', ctx.request.body);
        return ctx.app.emit('error', FormatWrongErr, ctx);
    }
    await next();
};

