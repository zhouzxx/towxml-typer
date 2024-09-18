<script lang="ts" setup>
withDefaults(
  defineProps<{
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 操作标题
     */
    operationTitle: string
    /**
     * @description 操作图标
     */
    operationIcon: string
    /**
     * @description 是否为二级标题
     */
    subTitle: boolean
  }>(),
  {
    operationTitle: '更多',
    operationIcon: 'right',
    subTitle: false,
  }
)
const emits = defineEmits<{
  /**
   * @description 点击标题
   */
  (e: 'click'): void
  /**
   * @description 点击操作
   */
  (e: 'operation'): void
}>()

const clickHandle = () => {
  emits('click')
}
const operationClickHandle = () => {
  emits('operation')
}
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
  <view
    class="tn-component-title"
    :class="{ 'sub-title': subTitle }"
    @tap.stop="clickHandle"
  >
    <view class="title">{{ title }}</view>
    <view class="operation" @tap.stop="operationClickHandle">
      <slot name="operation">
        <view class="operation-title">
          {{ operationTitle }}
        </view>
        <view class="operation-icon">
          <TnIcon :name="operationIcon" />
        </view>
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
