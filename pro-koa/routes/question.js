const question =require('../service/Question');
const router = require('koa-router')()

router.prefix('/question')

router.get('/init', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
router.get('/queryQuestion', async function (ctx, next) {
  const types = ctx.query.types;
  console.log(types);
  const questions =await question.queryQuestion(types);
  console.log(questions);
  ctx.body={
    questions,
  }
})
router.post('/add',function(ctx,next){
  let questions =ctx.request.body;
  console.log(questions);
  question.addQuestion(questions);
  ctx.body={
    "status":"ok"
  }
})

module.exports = router

