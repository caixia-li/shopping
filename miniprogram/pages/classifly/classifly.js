Page({
  data: {
    listType:[],
    chooseIndex:0,
    goodList:[], 
    newGoodList:[]
  },
  onLoad: function (options) {
    this.getListType();
    this.onInit();
  },
  //获取分类列表
  getListType() {
    wx.cloud.callFunction({
      name: 'getShopList',
      data: {
        $url: 'shopType'
      }
    }).then(res => {
      this.setData({
        listType: res.result.data[0].type
      })
    })
  },
  //页面初始化
  onInit(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'getShopList',
      data: {
        $url: 'goodListByType',
        item: '咖啡'
      }
    }).then(res => {
      wx.hideLoading();
      this.setData({
        goodList: res.result.data
      },()=>{
        this.onDataHandle()
      })
    })
  },
  //分类
  onClassify(e) {
    let { index, item } = e.currentTarget.dataset;
    this.setData({
      chooseIndex: index
    })
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'getShopList',
      data: {
        $url: 'goodListByType',
        item
      }
    }).then(res => {
      wx.hideLoading();
      this.setData({
        goodList: res.result.data
      },()=>{
        this.onDataHandle()
      })
    })
  },
  //列表数据重组
  onDataHandle(){
    let list = [];
    this.data.goodList.forEach((item, index) => {
      var flag = true;
      list.forEach(element => {
        if (element.type == item.type_two) {
          element.list.push(item);
          flag = false;
        }
      });
      if (flag) {
        list.push({
          type: item.type_two,
          list: [item]
        });
      }
    });
    this.setData({
      newGoodList:list
    })
  },
  goShopDetail(e) {
    let _id = e.currentTarget.dataset._id;
    wx.navigateTo({
      url: `/pages/shop-detail/shop-detail?_id=${_id}`
    })
  }
})