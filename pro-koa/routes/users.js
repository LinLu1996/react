const user =require('../service/User');
const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
router.post('/login',async function(ctx,next){
  let users =ctx.request.body;
  let r=await user.login(users);
  if(r){
    ctx.body={
      "status":"ok",
      currentAuthority:r.currentAuthority,
      username:r.username,
      type:r.type
    }
  }else{
    ctx.body={
      "status":"no",
      currentAuthority:"guest"
    }
  }
})
router.post('/register', async function (ctx, next) {
  const users = ctx.request.body;
  console.log(users);
  delete users.confirm;
  delete users.captcha;
  delete users.prefix;
  const id=await user.regist(users);
  if(id>0){
    ctx.body={
      "status":"ok",
      "mail":users.mail,
      id
    }
  }else{
    ctx.body={
      "status":"no"
    }
  }
})

module.exports = router
