let value = '';
Component({
  properties: {
    total:{
      type:Number,
      value:-1
    }
  },
  data: {
  },
  methods: {
    getValue(e){
      value = e.detail.value
    },
    onSearch(){
      this.triggerEvent("onSearch",{value})
    }
  }
})
