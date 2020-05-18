const COUNT = 20
let flag = true;
Page({
  data: {
    goodList:[],//商品列表
    total:-1,//商品总数
    listType:[],//商品类型列表
    chooseIndex:-1,//选中商品分类类名
    swiperList:[],//轮播列表
    toTopValue:false//返回顶部开关，默认隐藏
  },
  onLoad: function (options) {
    this.getShopList();
    this.getTotal();
    this.getListType();
    this.getSwiperList();
  },
  //获取商品列表
  getShopList(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'getShopList',
      data:{
        $url:"goodList",
        start:this.data.goodList.length,
        count: COUNT
      }
    }).then(res=>{
       wx.hideLoading();
       this.setData({
         goodList: this.data.goodList.concat(res.result.data)
       })
    }).catch(err=>{
      console.log(err)
    })
  },
  //获取商品总数
  getTotal(){
    wx.cloud.callFunction({
      name: 'getShopList',
      data:{
        $url:'total'
      }
    }).then(res=>{
      this.setData({
        total:res.result.total
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  //获取商品分类列表
  getListType(){
    wx.cloud.callFunction({
      name: 'getShopList',
      data:{
        $url:'shopType'
      }
    }).then(res=>{
      this.setData({
        listType:res.result.data[0].type
      })
    })
  },
  //获取轮播图列表
  getSwiperList(){
    wx.cloud.callFunction({
      name:"getSwiperList",
      data:{}
    }).then(res=>{
      this.setData({
        swiperList: res.result.data[0].list
      })
    })
  },
  //搜索
  onSearch(e){
    let value = e.detail.value;
    wx.cloud.callFunction({
      name:'getShopList',
      data:{
        $url:"search",
        value
      }
    }).then(res=>{
      this.setData({
        goodList:res.result.data
      })
    })
  },
  //分类
  onClassify(e){
    let { index, item } = e.currentTarget.dataset;
    this.setData({
      chooseIndex:index
    })
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name:'getShopList',
      data:{
        $url:'goodListByType',
        item
      }
    }).then(res=>{
      wx.hideLoading();
      this.setData({
        goodList:res.result.data
      })
    })
  },
  onShow: function () {

  },
  //检测滚动事件
  onPageScroll:function(e){
    let scrollTop = e.scrollTop
    let toTopValue = scrollTop > 500 ? true : false
    if(toTopValue && flag){
      this.setData({
        toTopValue: true
      },()=>{
        flag = false;
      })
    }else if(!toTopValue && !flag){
      this.setData({
        toTopValue:false
      },()=>{
        flag = true;
      })
    }
  },
  //返回顶部
  onToTop(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
    this.setData({
      toTopValue:false
    },()=>{
      flag = true
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      goodList:[]
    })
    this.getShopList()
  },
  onReachBottom: function () {
    this.getShopList()
  },
  onShareAppMessage: function () {
    return {
      title: '有好物',
      path: '/pages/homepage/homepage'
    }
  }
})