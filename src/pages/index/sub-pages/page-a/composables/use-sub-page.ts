import { getCurrentInstance, onMounted, ref } from 'vue'
import { tnNavPage } from '@tuniao/tnui-vue3-uniapp/utils'
import { useSubPageProvide } from '../../../composables'
import type { NavbarRectInfo } from '@tuniao/tnui-vue3-uniapp/components/navbar'
import type { IndexPageOnLoadFunc, IndexPageOnScrollFunc } from '../../../types'
import type { Category } from '@/types/api/category'

import { useScrollTransparentNavbar } from '@/hooks'
import { ColorType } from '@/types/color'

export const useSubPage = () => {
  const instance = getCurrentInstance()

  // 热门分类
  const hotCategoryData = ref<Category[]>([
    {
      id: '1',
      name: '学校甄选',
      icon: 'education',
      backgroundColor: {
        type: ColorType.select,
        value: '#2be9bb',
      },
      url: '/home-pages/sch-find/index',
    },
    {
      id: '2',
      name: '历史分数线',
      icon: 'history',
      backgroundColor: {
        type: ColorType.select,
        value: '#e93c32',
      },
      url: '/home-pages/history-score/index',
    },
    {
      id: '3',
      name: '学区划分',
      icon: 'map',
      backgroundColor: {
        type: ColorType.select,
        value: '#3c7efe',
      },
      url: '/home-pages/map-find/index',
    },
    {
      id: '4',
      name: '社群交流',
      icon: 'wechat',
      backgroundColor: {
        type: ColorType.select,
        value: '#ffa929',
      },
      url: '/home-pages/wechat-group/index',
    },
  ])

  const {
    triggerElementId,
    navbarOpacity,
    init: initTransparentScroll,
    updateTargetTriggerValue,
    opacityScrollHandle,
  } = useScrollTransparentNavbar(instance)

  onMounted(() => {
    initTransparentScroll()
  })

  // 顶部导航栏初始化完成事件
  const navbarInitFinishHandle = (info: NavbarRectInfo) => {
    updateTargetTriggerValue(info.height)
  }

  const onLoad: IndexPageOnLoadFunc = () => {
    // eslint-disable-next-line no-console
    console.log('pageA onLoad')
  }
  const onScroll: IndexPageOnScrollFunc = ({ top }) => {
    opacityScrollHandle(top)
  }

  useSubPageProvide(0, {
    onLoad,
    onScroll,
  })

  return {
    hotCategoryData,
    tnNavPage,
    navbarInitFinishHandle,
  }
}
