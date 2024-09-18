const typeShowCbMap = {}
const curLastLeafNodeId = {value:undefined}
const curNodes = {value:undefined}
const scrollCb = {value:undefined}
async function traverse(nodes) {
  let index = 0
  for (const node of nodes) {
    await new Promise((resolve) => {
      if (typeShowCbMap[node.id]) {
        typeShowCbMap[node.id](resolve, index)
      }else{
        resolve()
      }
      if(scrollCb.value){
        scrollCb.value()
      }
    })
    index++
    if (node.children && node.children.length > 0) {
      await traverse(node.children)
    }
  }
}

module.exports = {
  typeShowCbMap,
  traverse,
  curLastLeafNodeId,
  curNodes,
  scrollCb
};