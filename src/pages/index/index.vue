<script setup lang="ts">
	import { nextTick } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import TnTabbar from '@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar.vue'
	import TnTabbarItem from '@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar-item.vue'

	/* 引入子页面 */
	import PageA from './sub-pages/page-a/index.vue'

	import { useIndex, useIndexCustomStyle } from './composables'

	const {
		tabbarData,
		currentTabbarIndex,
		renderPageStatus,
		tabbarChangeHandle,
	} = useIndex()
	const { pageContainerStyle } = useIndexCustomStyle(currentTabbarIndex)

	onLoad((options : any) => {
		// 当前进入子页面的索引值
		const index = Number(options?.index || 0)
		tabbarChangeHandle(index)
		// 设置默认被渲染的页面
		renderPageStatus.value[index] = true
		nextTick(() => {
			// 设置当前子页面的索引值
			currentTabbarIndex.value = index
		})
	})
</script>

<template>
	<view class="page">
		<!-- 首页子页面 -->
		<view v-if="renderPageStatus[0]" class="page__container" :style="pageContainerStyle(0)">
			<PageA />
		</view>
	</view>

	<!-- 底部导航栏 -->
	<TnTabbar v-model="currentTabbarIndex" fixed switch-animation :placeholder="false" font-size="20"
		@change="tabbarChangeHandle">
		<TnTabbarItem v-for="(item, index) in tabbarData" :key="index" :text="item.text" :icon="item.icon"
			:active-icon="item.activeIcon" :bulge="index === 2" :icon-size="index === 2 ? '56' : ''" :font-size="24" />
	</TnTabbar>
</template>

<style lang="scss" scoped>
	@import './styles/index.scss';
</style>