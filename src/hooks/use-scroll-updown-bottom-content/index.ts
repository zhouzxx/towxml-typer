import { computed, ref } from 'vue'
import { throttle } from '@tuniao/tnui-vue3-uniapp/utils'
import type { CSSProperties } from 'vue'

type UpDownOperationType = 'up' | 'down'

export const useScrollUpdownBottomContent = (
  type: UpDownOperationType = 'up',
  extraHeight = 0
) => {
  const currentTop = ref<number>(0)
  const lastTop = ref<number>(0)
  const upScroll = computed<boolean>(() => currentTop.value > lastTop.value)

  const style = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    if (type === 'up') {
      style.transform = upScroll.value
        ? `translateY(calc(100% + ${extraHeight}px))`
        : 'translateY(0)'
    } else if (type === 'down') {
      style.transform = upScroll.value
        ? 'translateY(0)'
        : `translateY(calc(100% + ${extraHeight}px))`
    }
    style.transitionDuration = '0.25s'
    style.transitionTimingFunction = 'linear'
    style.transitionProperty = 'transform'
    return style
  })

  // 处理滚动事件
  const scrollHandle = throttle(
    (top: number) => {
      lastTop.value = currentTop.value
      currentTop.value = top
    },
    50,
    {
      leading: false,
      trailing: true,
    }
  )

  return {
    style,
    scrollHandle,
  }
}
