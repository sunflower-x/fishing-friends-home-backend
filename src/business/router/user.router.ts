import Router from 'koa-router';

import {userSchema} from '@/business/schema/user.schema'
import {loginValidatorMid} from '@/business/middleware/user.middleware'
import IndexCon from '@/business/controller';

const router = new Router({ prefix: '/user' });


// 登录
router.post('/login',userSchema,loginValidatorMid,IndexCon('成功'))


export default router;