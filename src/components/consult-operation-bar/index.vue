<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { useComponentColor } from '@tuniao/tnui-vue3-uniapp/hooks'
import type { CSSProperties } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * @description 信息图标
     */
    messageIcon: string
    /**
     * @description 按钮文字
     */
    buttonText: string
    /**
     * @description 按钮文字颜色
     */
    buttonTextColor: string
    /**
     * @description 按钮背景颜色
     */
    buttonBgColor: string
  }>(),
  {
    messageIcon: 'comment',
    buttonTextColor: '#fff',
    buttonBgColor: 'tn-gradient__red',
  }
)

const [buttonTextColorClass, buttonTextColorStyle] = useComponentColor(
  toRef(props, 'buttonTextColor'),
  'text'
)
const [buttonBgColorClass, buttonBgColorStyle] = useComponentColor(
  toRef(props, 'buttonBgColor'),
  'bg'
)

const consultButtonClass = computed<string>(() => {
  const cls: string[] = []

  if (buttonTextColorClass.value) {
    cls.push(buttonTextColorClass.value)
  }
  if (buttonBgColorClass.value) {
    cls.push(buttonBgColorClass.value)
  }

  return cls.join(' ')
})
const consultButtonStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}

  if (buttonTextColorStyle.value) {
    style.color = buttonTextColorStyle.value
  }
  if (buttonBgColorStyle.value) {
    style.backgroundColor = buttonBgColorStyle.value
  }

  return style
})
</script>

// #ifdef MP-WEIXIN
<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true,
  },
}
</script>
// #endif

<template>
  <view class="consult-operation-bar tn-shadow tn-u-safe-area">
    <view class="consult-content">
      <view class="icon">
        <TnIcon :name="messageIcon" />
      </view>
      <view class="text">
        <slot name="message" />
      </view>
    </view>
    <view
      class="consult-button"
      :class="[consultButtonClass]"
      :style="consultButtonStyle"
    >
      <TnButton only-button open-type="contact" height="100%" width="100%">
        <view class="tn-w-full tn-h-full tn-flex-center button-content">
          {{ buttonText }}
        </view>
      </TnButton>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
