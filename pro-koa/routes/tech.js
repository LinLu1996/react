const techService =require('../service/Tech');
const router = require('koa-router')()

router.prefix('/tech')

router.get('/init', async function (ctx, next) {
  const treeData = await techService.init();
  ctx.body={
    treeData
  }
})
router.post('/add',async function(ctx,next){
  let tech =ctx.request.body;
  console.log(tech);
  let treeData = await techService.addTech(tech);
  console.log(treeData);
  ctx.body={
    treeData
  }
})

module.exports = router
