// components/detail-tab/detail-tab.js
Component({
  properties: {
    detail:{
      type:Object
    }
  },
  observers:{
    "detail.imgs":function(val){
      if(val){
        this.setData({
          imgs: JSON.parse(val)
        })
      }
    }
  },
  data: {
    tabText:["图文详情","商品参数","购买须知"],
    imgs:[],
    chooseIndex:0
  },
  methods: {
    onChooseIndex(e){
      this.setData({
        chooseIndex: e.currentTarget.dataset.index
      })
    }
  }
})
