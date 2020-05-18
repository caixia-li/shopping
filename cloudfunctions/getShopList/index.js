// 云函数入口文件
const cloud = require('wx-server-sdk');
const tcbRouter = require('tcb-router');

cloud.init({
  env: "shopping-gpdk9"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const app = new tcbRouter({
    event
  });

  app.router('goodList', async(ctx, next) => {
    const {
      start,
      count
    } = event
    ctx.body = await db.collection('shopList')
      .skip(start)
      .limit(count)
      .get()
  })

  app.router('total', async(ctx, next) => {
    ctx.body = await db.collection('shopList').count()
  })

  app.router('search', async(ctx, next) => {
    let {
      value
    } = event
    ctx.body = await db.collection('shopList')
      .where({
        title: db.RegExp({
          regexp: value,
          options: 'i',
        })
      })
      .get()
  })

  app.router('shopType', async(ctx, next) => {
    let res = await db.collection('shopType').get()
    ctx.body = res
  })

  app.router('shopDetail', async(ctx, body) => {
    let _id = event._id;
    ctx.body = await db.collection('shopList')
      .where({
        _id
      })
      .get()
  })

  app.router('goodListByType', async(ctx, next) => {
    let item = event.item;
    let res = await db.collection('shopList')
      .where({
        type_one: item
      })
      .count()
    if(res.total <= 100){
      ctx.body = await db.collection('shopList')
        .where({
          type_one: item
        })
        .get()
    }else{
      const LIMIT = 100
      let times = Math.ceil(res.total/LIMIT);
      let tasks = []
      for(var i=0;i<times;i++){
        let promise = db.collection('shopList')
                        .where({
                          type_one:item
                        })
                        .skip(i*LIMIT)
                        .limit(LIMIT)
                        .get()
        tasks.push(promise)
      }
      var list = {
        data: []
      }
      if (tasks.length > 0) {
        list = (await Promise.all(tasks)).reduce((acc, cur) => {
          return {
            data: acc.data.concat(cur.data)
          }
        })
      }
      console.log(list)
      ctx.body = list
    }
  })

  return app.serve()
}