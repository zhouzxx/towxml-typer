import { computed, ref } from 'vue'

import type { CSSProperties } from 'vue'

export const useScrollHiddenBottomContent = (extraHeight = 0) => {
  // 控制内容显示与隐藏
  const isShow = ref<boolean>(true)

  // 处理滚动事件
  let showTimer: ReturnType<typeof setTimeout> | null = null
  const _clearShowTimer = () => {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }
  }
  const handleScroll = () => {
    isShow.value = false
    _clearShowTimer()
    showTimer = setTimeout(() => {
      isShow.value = true
      _clearShowTimer()
    }, 250)
  }

  const style = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    style.transform = isShow.value
      ? 'translateY(0)'
      : `translateY(calc(100% + ${extraHeight}px))`
    style.transitionDuration = '0.25s'
    style.transitionTimingFunction = 'linear'
    style.transitionProperty = 'transform'
    return style
  })

  return {
    style,
    handleScroll,
  }
}
