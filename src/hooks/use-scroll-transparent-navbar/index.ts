import { nextTick, ref } from 'vue'
import { useSelectorQuery } from '@tuniao/tnui-vue3-uniapp/hooks'
import { debugWarn, generateId } from '@tuniao/tnui-vue3-uniapp/utils'

import type { ComponentInternalInstance } from 'vue'

export const useScrollTransparentNavbar = (
  instance: ComponentInternalInstance | null
) => {
  const { getSelectorNodeInfo } = useSelectorQuery(instance)
  // 顶部导航栏的透明度
  const navbarOpacity = ref(0)

  // 定义滚动到对应位置的元素的id
  const triggerElementId = `tse-${generateId()}`

  // 目标触发的值
  let targetTriggerValue = 100

  const triggerTop = ref<number>(0)
  let initCount = 0
  // 获取对应触发变化元素所在位置
  const _getTriggerElementRectInfo = async () => {
    try {
      const res = await getSelectorNodeInfo(`#${triggerElementId}`)
      if (!res.top) {
        throw new Error('获取触发元素容器信息top信息失败')
      }
      initCount = 0
      triggerTop.value = res.top
    } catch (err) {
      if (initCount > 10) {
        initCount = 0
        debugWarn(
          'useScrollTransparentNavbar',
          `获取触发元素容器信息失败: ${err}`
        )
        return
      }
      initCount++
      setTimeout(() => {
        _getTriggerElementRectInfo()
      }, 150)
    }
  }
  // 初始化hooks
  const init = () => {
    // #ifndef APP-PLUS || MP-ALIPAY
    nextTick(() => {
      _getTriggerElementRectInfo()
    })
    // #endif
    // #ifdef APP-PLUS || MP-ALIPAY
    setTimeout(() => {
      _getTriggerElementRectInfo()
    }, 350)
    // #endif
  }

  // 更新触发目标值
  const updateTargetTriggerValue = (value: number) => {
    targetTriggerValue = value
  }

  // 处理页面滚动事件
  const opacityScrollHandle = (top: number) => {
    if (!triggerTop.value) return
    const triggerDistance = triggerTop.value - targetTriggerValue
    let opacity = top / triggerDistance
    if (opacity > 1.5) return
    // 临界值处理
    if (opacity < 0.1) opacity = 0
    if (top > triggerDistance) opacity = 1
    navbarOpacity.value = opacity
  }

  return {
    navbarOpacity,
    triggerElementId,
    triggerTop,
    init,
    updateTargetTriggerValue,
    opacityScrollHandle,
  }
}
