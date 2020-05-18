Component({
  properties: {
    goodList:{
      type:Array
    }
  },
  data: {

  },
  methods: {
    goShopDetail(e){
      let _id = e.currentTarget.dataset._id;
      wx.navigateTo({
        url: `/pages/shop-detail/shop-detail?_id=${_id}`
      })
    }
  }
})
