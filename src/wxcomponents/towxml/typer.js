const typeShowCbMap = { value: {} }
const curLastLeafNodeId = { value: undefined }
const curNodes = { value: undefined }
const scrollCb = { value: undefined }
const isTyping = { value: false }
const openTyper = { value: false }
const lastScrollTime = {value: 0}
const scrollTimer = {value:undefined}
async function traverse(nodes) {
  let index = 0
  for (const node of nodes) {
    await new Promise((resolve) => {
      if (typeShowCbMap.value[node.id]) {
        typeShowCbMap.value[node.id](resolve, index)
      } else {
        resolve()
      }
      if (scrollCb.value) {
        scrollCb.value()
      }
      if (node.id == curLastLeafNodeId.value) {
        console.log("所有的节点都渲染完毕，进行reset")
        reset()
        clearTimeout(scrollTimer.value)
      }
    })
    index++
    if (node.noType == false && node.children && node.children.length > 0) {
      await traverse(node.children)
    }
  }
}

function reset() {
  typeShowCbMap.value = {}
  curLastLeafNodeId.value = undefined
  curNodes.value = undefined
  isTyping.value = false
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
  scrollTimer
};