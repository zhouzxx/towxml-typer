<script lang="ts" setup>
withDefaults(
  defineProps<{
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 描述
     */
    desc: string
    /**
     * @description 图片地址
     */
    image: string
    /**
     * @description 标签
     */
    tag: string
    /**
     * @description 查看数量
     */
    viewCount: number
    /**
     * @description 点赞数量
     */
    likeCount: number
  }>(),
  {
    tag: '',
    viewCount: 0,
    likeCount: 0,
  }
)
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
  <view class="search-item tn-shadow">
    <view class="item-info">
      <view class="info-detail">
        <view class="title">{{ title }}</view>
        <view class="desc tn-text-ellipsis-2">{{ desc }}</view>
      </view>
      <view class="info-data">
        <view class="tag-data">{{ tag && `# ${tag}` }}</view>
        <view class="count-data">
          <view class="count-item">
            <view class="icon">
              <TnIcon name="rocket" />
            </view>
            <view class="data">{{ viewCount }}</view>
          </view>
          <view class="count-item">
            <view class="icon">
              <TnIcon name="like-lack" />
            </view>
            <view class="data">{{ likeCount }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="item-image">
      <image class="tn-image" :src="image" mode="aspectFill" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
