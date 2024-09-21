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
        const {
          curLastLeafNodeId,
          curNodes,
          reset,
          renderStartTime,
        } = require("./typer");
        // 属性值变化时执行的逻辑
        if (newVal && newVal.id) {
          reset();
          console.log("towxml中newVal.id的值", newVal.id, newVal);
          curLastLeafNodeId.value = this.getLastLeafNodeId(newVal);
          console.log("curLastLeafNodeId.value的值", curLastLeafNodeId.value);
          curNodes.value = newVal;
          this.data.changeDecode = !this.data.changeDecode;
          this.setData({ changeDecode: this.data.changeDecode });
          renderStartTime.value = Date.now();
        }
      }
    },
    openTyper: function (newVal) {
      const { openTyper } = require("./typer");
      openTyper.value = newVal;
      if (newVal) {
        wx.showLoading({
          title: "加载中",
        });
      }
    },
  },
  lifetimes: {
    attached: function () {
      const { openTyper } = require("./typer");
      openTyper.value = this.data.openTyper;
      const { renderStartTime } = require("./typer");
      renderStartTime.value = Date.now();
      wx.showLoading({
        title: "加载中",
      });
    },
    ready: function () {
      console.log(
        "towxml中的ready,看看在之前还是在之后",
        this.properties.openTyper
      );
      // if (!this.properties.openTyper) {
      //   wx.hideLoading();
      // }
    },
    detached: function () {
      const { reset } = require("./typer");
      reset();
    },
  },
  data: {
    someData: {},
    oldNodes: undefined,
    contentChanged: false,
    changeDecode: false,
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
