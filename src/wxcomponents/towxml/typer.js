const typeShowCbMap = { value: {} };
const curLastLeafNodeId = { value: undefined };
const curNodes = { value: undefined };
const scrollCb = { value: undefined };
const isTyping = { value: false };
const openTyper = { value: false };
const lastScrollTime = { value: 0 };
const scrollTimer = { value: undefined };
const renderStartTime = { value: 0 };
async function traverse(nodes) {
  //只有正在执行打字的时候，才执行，如果还没打完，就要切换新的文章进行打字，就可以通过这个变量终止旧的递归
  if (!isTyping.value) {
    console.log("5555555555555555,中断旧的遍历");
    return;
  }
  let index = 0;
  for (const node of nodes) {
    await new Promise((resolve) => {
      if (typeShowCbMap.value[node.id]) {
        typeShowCbMap.value[node.id](resolve, index);
      } else {
        resolve();
      }
      if (scrollCb.value) {
        scrollCb.value();
      }
      if (node.id == curLastLeafNodeId.value) {
        console.log("所有的节点都渲染完毕，进行reset");
        reset();
      }
    });
    //执行完了之后，就删除回调函数，减少内存占用
    delete typeShowCbMap.value[node.id];
    index++;
    //光在上面终止是没有用的，因为这是深度优先的递归，还要终止回溯的过程，这里是用来终止回溯
    if (!isTyping.value) {
      console.log("5555555555555555,中断旧的遍历");
      return;
    }
    if (node.noType == false && node.children && node.children.length > 0) {
      await traverse(node.children);
    }
  }
}

function reset() {
  typeShowCbMap.value = {};
  curLastLeafNodeId.value = undefined;
  curNodes.value = undefined;
  isTyping.value = false;
  openTyper.value = false;
  lastScrollTime.value = 0;
  renderStartTime.value = 0
  clearInterval(scrollTimer.value);
}

module.exports = {
  typeShowCbMap,
  traverse,
  curLastLeafNodeId,
  curNodes,
  scrollCb,
  reset,
  openTyper,
  lastScrollTime,
  scrollTimer,
  isTyping,
  renderStartTime
};
