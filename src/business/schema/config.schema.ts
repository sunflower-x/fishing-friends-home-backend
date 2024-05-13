// 通用验证方法设置
import Joi from 'joi';

// 用户名称
export const username = Joi.string().min(4).max(11).required();


