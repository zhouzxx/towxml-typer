Component({
  options: {
    styleIsolation: "shared",
  },
  properties: {
    nodes: {
      type: Object,
      value: {},
    },
    openTyper: {
      type: Boolean,
      value: false,
    },
    speed: {
      type: Number,
      value: 15,
    },
  },
  observers: {
    nodes: function (newVal) {
      if (this.properties.openTyper) {
        const { curLastLeafNodeId, curNodes, reset } = require("./typer");
        reset()
        // 属性值变化时执行的逻辑
        if (newVal && newVal.id) {
          // if (this.data.oldNodes) {
          //   this.data.contentChanged = !this.data.contentChanged
          //   this.setData(
          //     { contentChanged: this.data.contentChanged }
          //   )
          // }
          curLastLeafNodeId.value = this.getLastLeafNodeId(newVal);
          console.log("curLastLeafNodeId.value的值", curLastLeafNodeId.value)
          curNodes.value = newVal;
        }
      }
    },
  },
  lifetimes: {
    attached: function () {
      const { openTyper } = require("./typer");
      openTyper.value = this.properties.openTyper
      console.log("this.properties.openTyper的值",this.properties.openTyper)
      console.log("11111111111111111111")
      wx.showLoading({
        title: "加载中",
      });
    },
    ready: function () {
      if (!this.properties.openTyper) {
        wx.hideLoading();
      }
    },
    detached: function () {
      const { reset } = require("./typer");
      reset()
    }
  },
  data: {
    someData: {},
    oldNodes: undefined,
    contentChanged: false
  },
  methods: {
    getLastLeafNodeId(nodes) {
      if (!nodes.children || nodes.children.length == 0) {
        return nodes.id;
      } else {
        const lastChild = nodes.children[nodes.children.length - 1];
        return this.getLastLeafNodeId(lastChild);
      }
    },
  },
});
