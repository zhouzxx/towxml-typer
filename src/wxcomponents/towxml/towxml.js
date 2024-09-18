Component({
  options: {
    styleIsolation: "shared",
  },
  properties: {
    nodes: {
      type: Object,
      value: {},
    },
  },
  observers: {
    nodes: function (newVal) {
      const { curLastLeafNodeId, curNodes } = require("./typer");
      // 属性值变化时执行的逻辑
      if (newVal) {
        curLastLeafNodeId.value = this.getLastLeafNodeId(newVal);
        curNodes.value = newVal;
      }
    },
  },
  lifetimes: {
    created: function () {
      wx.showLoading({
        title: "加载中",
      });
    }
  },
  data: {
    someData: {},
  },
  methods: {
    getLastLeafNodeId(nodes) {
      if (nodes.children.length == 0) {
        return nodes.id;
      } else {
        const lastChild = nodes.children[nodes.children.length - 1];
        return this.getLastLeafNodeId(lastChild);
      }
    },
  },
});
