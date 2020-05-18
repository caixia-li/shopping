const app = new getApp()
let flag = true;
Page({
  data: {
    cartList:[],
    indexList:[]
  },
  onLoad: function (options) {
    this.getCartList();
  },
  getCartList(){
    let openid = app.globalData.openid;
    let res = wx.getStorageSync(openid);
    this.setData({
      cartList : res
    })
  },
  onShow: function () {
    this.getCartList()
  },
  goHomePage(){
    wx.switchTab({
      url: '/pages/homepage/homepage',
    })
  },
  onReduce(e){
    let _id = e.detail._id;
    let openid = app.globalData.openid;
    let data = wx.getStorageSync(openid);
    data.forEach((item,index)=>{
      if(item._id == _id && item.count > 1){
        item.count--
        wx.setStorageSync(openid, data);
        this.setData({
          cartList: data
        })
      }else if(item._id == _id){
        wx.showModal({
          title: '提示',
          content: '已经不能再少了，您是否要删除该商品',
          success:res=> {
            if (res.confirm) {
              data.splice(index,1);
              wx.setStorageSync(openid, data);
              this.setData({
                cartList:data
              })
            } else if (res.cancel) {
              item.count = 1
            }
          }
        })
      }
    })

    this.selectComponent('#cart-bottom').getData();
  },
  onAdd(e){
    let _id = e.detail._id;
    let openid = app.globalData.openid;
    let data = wx.getStorageSync(openid);
    data.forEach((item, index) => {
      if (item._id == _id) {
        item.count++
        wx.setStorageSync(openid, data);
        this.setData({
          cartList: data
        })
      }
    })

    this.selectComponent('#cart-bottom').getData();
  },
  onCheck(e){
    let indexList = e.detail.indexList;
    this.setData({
      indexList
    })
    
    this.selectComponent('#cart-bottom').getData();
  },
  //检测滚动事件
  onPageScroll: function (e) {
    let scrollTop = e.scrollTop
    let toTopValue = scrollTop > 500 ? true : false
    if (toTopValue && flag) {
      this.setData({
        toTopValue: true
      }, () => {
        flag = false;
      })
    } else if (!toTopValue && !flag) {
      this.setData({
        toTopValue: false
      }, () => {
        flag = true;
      })
    }
  },
  //返回顶部
  onToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
    this.setData({
      toTopValue: false
    }, () => {
      flag =  true
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})