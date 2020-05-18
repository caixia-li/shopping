Component({
  properties: {
    toTopValue:{
      type:Boolean
    }
  },
  data:{
    isShow:false
  },
  observers:{
    "toTopValue":function(val){
      this.setData({
        isShow:val
      })
    }
  },
  methods: {
    onToTop(){
      this.triggerEvent('onToTop')
    }
  }
})
