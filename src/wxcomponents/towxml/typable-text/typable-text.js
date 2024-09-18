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
  },
  lifetimes: {
    ready: function () {
      const { typeShowCbMap, curLastLeafNodeId,curNodes } = require("../typer");
      // console.log("77777777777777777777777777777777777")
      // console.log("this.properties.textId的值",this.properties.textId)
      typeShowCbMap[this.properties.textId] = (resolve) => {
        // console.log("执行文本组件中的cb")
        this.show();
        this.startTyping(resolve);
      };
      if (this.properties.textId == curLastLeafNodeId.value) {
        wx.hideLoading();
        console.log("打字文本中匹配到最后一个，开始遍历")
        traverse(curNodes.value.children);
      }
    },
  },
  data: {
    currentText: "",
    timer: null,
    isShow: false,
    speed: 20,
  },
  methods: {
    show() {
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
      }, this.data.speed);
    },
    clearTimer() {
      if (this.data.timer) {
        clearInterval(this.data.timer);
        this.setData({ timer: null });
      }
    },
  },
});
