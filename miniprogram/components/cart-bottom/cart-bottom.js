const app = new getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    indexList:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    total:0,
    number:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData(){
      let total = 0;
      let number = 0;
      let openid = app.globalData.openid;
      let cartList = wx.getStorageSync(openid)
      this.properties.indexList.forEach(item => {
        total += cartList[item].price * cartList[item].count;
        number += cartList[item].count;
      })
      this.setData({
        total,
        number
      })
    }
  }
})
