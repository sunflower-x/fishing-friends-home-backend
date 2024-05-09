import Router from 'koa-router';


const router = new Router({ prefix: '/user' });

const method01=()=>{
    console.log(1111);
    
}
router.post('/login',method01)


export default router;