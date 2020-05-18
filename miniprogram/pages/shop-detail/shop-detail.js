const app = new getApp();
Page({
  data: {
    shopDetail: {}
  },
  onLoad: function(options) {
    this.getShopDetail(options._id)
  },
  getShopDetail(_id) {
    wx.cloud.callFunction({
      name: "getShopList",
      data: {
        "$url": "shopDetail",
        "_id": _id
      }
    }).then(res => {
      this.setData({
        shopDetail: res.result.data[0]
      })
    })
  },
  onJoinCart() {
    let openid = app.globalData.openid;
    let res = wx.getStorageSync(openid);
    if (res.length != 0) {
     let flag = res.filter((item) => {
        if (item.Id == this.data.shopDetail.Id) {
          item.count = ++item.count
          return true
        }
      })
      if(flag.length == 0){
        res.unshift({
         ...this.data.shopDetail,
          count: 1
        })
        wx.setStorageSync(openid, res)
        wx.showToast({
          title: '添加成功'
        })
      }else{
        wx.setStorageSync(openid, res)
        wx.showToast({
          title: '添加成功'
        })
      }
    } else {
      let newRes = [{
        ...this.data.shopDetail,
        count: 1
      }]
      wx.setStorageSync(openid, newRes)
      wx.showToast({
        title: '添加成功'
      })
    }
  }
})