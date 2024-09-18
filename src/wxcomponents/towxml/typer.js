export const typeShowCbMap = {}
export async function traverse(nodes) {
  // console.log("typeShowCbMap的值",typeShowCbMap)
  // console.log("77777777777777777777")
  let index = 0
  for (const node of nodes) {
    await new Promise((resolve) => {
      if (typeShowCbMap[node.id]) {
        if(node.id.startsWith("0-3-")){
          console.log("当前的nodei.id",node.id)
        }
        // console.log("33333333333333333333")
        typeShowCbMap[node.id](resolve, index)
      }else{
        // console.log("44444444444444444444")
        resolve()
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
  traverse
};