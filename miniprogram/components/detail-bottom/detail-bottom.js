const app = new getApp();
Component({
  externalClasses: ['iconfont','icon-duihua'],
  methods: {
    onJoinCart(){
      //鉴权
      wx.getSetting({
        success:res=>{
          if (res.authSetting["scope.userInfo"]){
            this.triggerEvent('onJoinCart')
          }else{
            wx.getUserInfo({
              success:res=>{
                this.getOpenid();
                this.triggerEvent('onJoinCart')
              },
              fail:err=>{
                wx.showModal({
                  title: '提示',
                  content: '授权过后才可以购物哦~',
                  showCancel:false,
                  confirmColor:'#1296db'
                })
              }
            })
          }
        }
      })
    }
  }
})
