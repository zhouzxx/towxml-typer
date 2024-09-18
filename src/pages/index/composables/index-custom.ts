import { computed } from 'vue'

import type { CSSProperties, Ref } from 'vue'

type PageContainerStyle = (index: number) => CSSProperties

export const useIndexCustomStyle = (currentTabbarIndex: Ref<number>) => {
  const pageContainerStyle = computed<PageContainerStyle>(() => {
    return (index: number) => {
      const style: CSSProperties = {}

      style.display = index === currentTabbarIndex.value ? 'block' : 'none'

      return style
    }
  })

  return {
    pageContainerStyle,
  }
}
