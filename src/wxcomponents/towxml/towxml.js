Component({
  options:{
    styleIsolation:'shared'
  },
  properties:{
    nodes:{
      type:Object,
      value:{}
    }
  },
  lifetimes: {
    created:function(){
      wx.showLoading({
        title: '加载中',
      });
    },
		ready: function () {
			console.log("88888888888888888888888888888",this.properties.nodes)
      wx.hideLoading();
      setTimeout(()=>{
        const { traverse,typeShowCbMap } = require('./typer');
        console.log("typeShowCbMap的值",Object.values(typeShowCbMap).length)
        traverse(this.properties.nodes.children)
      },6000)
		}
	},
  data:{
    someData:{
      
    }
  }
})