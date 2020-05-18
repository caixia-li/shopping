Component({
  properties: {
    cartList:{
      type:Array
    }
  },
  methods: {
    checkboxChange(e){
      let indexList = e.detail.value;
      this.triggerEvent('onCheck',{indexList})
    },
    onReduce(e){
      let _id = e.currentTarget.dataset._id;
      this.triggerEvent("onReduce",{_id})
    },
    onAdd(e){
      let _id = e.currentTarget.dataset._id;
      this.triggerEvent("onAdd", { _id })
    },
    goDetail(e){
      let _id = e.currentTarget.dataset._id;
      wx.navigateTo({
        url: `/pages/shop-detail/shop-detail?_id=${_id}`
      })
    }
  }
})
