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
      if (newVal && newVal.id != undefined && this.data.hasInitCb == false) {
        this.data.hasInitCb = true;
        this.initCb();
      }
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
      if (this.data.nodes.id != undefined && this.data.hasInitCb == false) {
        this.data.hasInitCb = true;
        this.initCb();
      }
      if (this.data.nodes.id == "0" && !this.data.nodes.openTyper) {
        wx.hideLoading();
      }
    },
  },
  data: {
    isShow: {},
    hasLastLeafNode: false,
    hasInitCb: false,
    // openTyper: false
  },
  methods: {
    initCb() {
      const { openTyper } = require("./typer");
      const newVal = this.data.nodes;
      if (newVal && newVal.id && openTyper.value) {
        const { typeShowCbMap } = require("./typer");
        if (newVal.id.length <= 1) {
          console.log("decode中newVal.id", newVal.id);
        }
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
          }
          if (newVal.noType == true) {
            this.setData({ isShow: this.data.isShow });
          }
        }
      }
    },
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
