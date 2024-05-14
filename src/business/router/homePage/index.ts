import Router from 'koa-router';


const router = new Router({ prefix: '/homePage' });

// 所有钓点地图坐标,包含查询黑坑-野钓-收费-免费
router.post('/allPosition')

// 钓点的添加
router.post('/addPosition')

// 钓点详情
router.post('/getPostionDetail')

// 钓点认证
router.post('/reconizePosition')

// 钓点评价
router.post('/commentPostiont')

// 附近钓点
router.post('/nearbyPosition')

// 获取钓点

// 获取天气

// 获取科普知识

// 获取钓友列表