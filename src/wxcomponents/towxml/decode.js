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
      const { openTyper } = require("./typer");
      if (newVal && newVal.id && openTyper.value) {
        const {
          typeShowCbMap,
          curLastLeafNodeId,
        } = require("./typer");
        if (newVal.children && newVal.children.length > 0) {
          let c = 0;
          for (let node of newVal.children) {
            if (newVal.noType == false) {
              typeShowCbMap.value[node.id] = (resolve, index) => {
                this.show(resolve, index);
              };
              this.data.isShow[c] = false;
              c++;
            } else {
              this.data.isShow[c] = true;
              c++;
            }
            if (node.id == curLastLeafNodeId.value) {
              this.data.hasLastLeafNode = true;
            }
          }
          if (newVal.noType == true) {
            this.setData({ isShow: this.data.isShow });
          }
        }
      }
    },
  },
  lifetimes: {
    attached: function () {
      const _ts = this;
      config.events.forEach((item) => {
        _ts["_" + item] = function (...arg) {
          if (global._events && typeof global._events[item] === "function") {
            global._events[item](...arg);
          }
        };
      });
    },
    ready: function () {
      if (this.data.hasLastLeafNode) {
        const {
          typeShowCbMap,
          traverse,
          curNodes,
          scrollCb,
          scrollTimer,
          lastScrollTime,
        } = require("./typer");
        console.log("decode中匹配到最后一个，开始遍历");
        console.log("开始遍历前typeShowCbMap的值", typeShowCbMap.value);
        setTimeout(() => {
          wx.hideLoading();
          traverse(curNodes.value.children);
          scrollTimer.value = setInterval(() => {
            if (Date.now() - lastScrollTime.value > 600) {
              console.log("定时器驱动滚动了一下");
              scrollCb.value();
            }
          }, 300);
        }, 0);
      }
    },
  },
  data: {
    isShow: {},
    hasLastLeafNode: false,
    // openTyper: false
  },
  methods: {
    show(resolve, index) {
      // console.log("遍历decode》》》》》》")
      this.data.isShow[index] = true;
      this.setData({
        [`isShow[${index}]`]: true,
      });
      // console.log("this.data.isShow的值",this.data.isShow)
      resolve();
    },
  },
});
