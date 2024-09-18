const config = require("./config");

Component({
  options: {
    styleIsolation: "apply-shared",
  },
  properties: {
    nodes: {
      type: Object,
      value: {},
    },
  },
  lifetimes: {
    ready: function () {
      const _ts = this;
      config.events.forEach((item) => {
        _ts["_" + item] = function (...arg) {
          if (global._events && typeof global._events[item] === "function") {
            global._events[item](...arg);
          }
        };
      });
      const {
        typeShowCbMap,
        curLastLeafNodeId,
        traverse,
        curNodes,
      } = require("./typer");

      if (
        this.properties.nodes.children &&
        this.properties.nodes.children.length > 0
      ) {
        let c = 0;
        for (let node of this.properties.nodes.children) {
          typeShowCbMap[node.id] = (resolve, index) => {
            this.show(resolve, index);
          };
          this.data.isShow[c] = false;
          c++;
          if (node.id == curLastLeafNodeId.value) {
			console.log("decode中匹配到最后一个，开始遍历")
			wx.hideLoading();
            traverse(curNodes.value.children);
          }
        }
      }
    },
  },
  data: {
    isShow: {},
  },
  methods: {
    show(resolve, index) {
      this.data.isShow[index] = true;
      this.setData({
        [`isShow[${index}]`]: true,
      });
      // console.log("this.data.isShow的值",this.data.isShow)
      resolve();
    },
  },
});
