const paper =require('../service/Paper');
const router = require('koa-router')()

router.prefix('/paper')
router.get('/init',async function (ctx, next) {
  const paperList = await paper.queryPaper();
  console.log(paperList);
  ctx.body={
    // "status":"ok",
    paperList
  }
})
router.post('/add',async function(ctx,next){
  let papers =await ctx.request.body;
  console.log(papers);
  let paperList =await paper.addPaper(papers);
  console.log(paperList);
  ctx.body={
    "status":"ok",
    paperList
  }
})

module.exports = router

