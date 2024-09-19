const { noType } = require("../config");

Component({
  options: {
    styleIsolation: "shared",
  },
  properties: {
    text: {
      type: String,
      value: "",
    },
    textId: {
      type: String,
      value: "",
    },
    openTyper: {
      type: Boolean,
      value: false
    },
    speed: {
      type: Number,
      value: 15,
    },
    noType: {
      type: Boolean,
      value: true
    }
  },
  observers: {
    textId: function (newVal) {
      // 属性值变化时执行的逻辑
      const { typeShowCbMap, curLastLeafNodeId, curNodes, openTyper, lastScrollTime, scrollCb, scrollTimer, traverse } = require("../typer");
      if (newVal && openTyper.value) {
        typeShowCbMap.value[newVal] = (resolve) => {
          this.show();
          this.startTyping(resolve);
        };
        if (newVal == curLastLeafNodeId.value) {
          console.log("打字文本中匹配到最后一个，开始遍历")
          console.log("开始遍历前typeShowCbMap的值", typeShowCbMap.value)
          // setTimeout(() => {
            wx.hideLoading();
            traverse(curNodes.value.children);
            //默认情况下时typable-text组件中的文本打印完了之后，自动触发滚动，但是有时候，组件内的文本很多，可能要打印几秒甚至更久，这个时候就添加这个定时器，即距离上一次滚动超过一定时间了也触发滚动
            scrollTimer.value = setInterval(() => {
              if (Date.now() - lastScrollTime.value > 600) {
                console.log("定时器驱动滚动了一下")
                scrollCb.value()
              }
            }, 300)
          // }, 0)
        }
      }
    }
  },
  data: {
    currentText: "",
    timer: null,
    isShow: false
  },
  methods: {
    show() {
      // console.log("遍历text》》》》》》")
      this.data.isShow = true;
      this.setData({ isShow: this.data.isShow });
    },
    startTyping(resolve) {
      this.clearTimer();
      let index = 0;
      this.setData({ currentText: "" });
      this.data.timer = setInterval(() => {
        if (index < this.data.text.length) {
          this.setData({
            currentText: this.data.text.slice(0, index + 1),
          });
          index++;
        } else {
          this.clearTimer();
          resolve();
        }
      }, this.properties.speed);
    },
    clearTimer() {
      if (this.data.timer) {
        clearInterval(this.data.timer);
        this.setData({ timer: null });
      }
    },
  },
});
