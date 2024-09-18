<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
const props = withDefaults(
  defineProps<{
    title: string
    leftIcon?: string
    rightIcon?: string
    titleBgImage?: string
    blackTitle?: boolean
    coolBgNumber?: number
  }>(),
  {
    leftIcon: 'star',
    rightIcon: 'star',
    titleBgImage: 'https://resource.tuniaokj.com/images/title_bg/title44.png',
    blackTitle: false,
    coolBgNumber: 15,
  }
)

const titleStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}

  if (props.titleBgImage) {
    style.backgroundImage = `url(${props.titleBgImage})`
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
  <view class="cool-title tn-flex-center" :style="titleStyle">
    <view
      class="cool-title-container"
      :class="[
        blackTitle
          ? ''
          : `tn-gradient-bg__cool-${coolBgNumber} tn-text-transparent`,
      ]"
    >
      <view class="icon">
        <TnIcon
          :name="leftIcon"
          :transparent="!blackTitle"
          :transparent-bg="`tn-gradient-bg__cool-${coolBgNumber}`"
        />
      </view>
      <view class="title">{{ title }}</view>
      <view class="icon">
        <TnIcon
          :name="rightIcon"
          :transparent="!blackTitle"
          :transparent-bg="`tn-gradient-bg__cool-${coolBgNumber}`"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.cool-title {
  position: relative;
  width: 100%;
  padding: 20rpx 0rpx;
  background-image: url('https://resource.tuniaokj.com/images/title_bg/title44.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;

  .cool-title-container {
    display: flex;
    align-items: center;
    position: relative;
    width: fit-content;
    height: 100%;
    font-size: 40rpx;
    font-weight: 800;
    line-height: 1;
    .icon {
      font-size: 44rpx;
      margin: 0rpx 20rpx;
    }
  }
}
</style>
