<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { debugWarn } from '@tuniao/tnui-vue3-uniapp/utils'
onLaunch(() => {
  // eslint-disable-next-line no-console
  console.log('欢迎使用图鸟UI')

  // 加载字体
  uni.loadFontFace({
    family: 'tuniao-xiaowei',
    source:
      'url("https://resource.tuniaokj.com/images/vue3-template/template2-website/font/tuniao-xiaowei.ttf")',
    fail: (err) => {
      debugWarn('load-font', `加载字体失败: ${err}`)
      console.error(err)
    },
  })
})
</script>
<style lang="scss">
@import '@tuniao/tn-style/dist/uniapp/index.css';

.tn-suspend-button {
  z-index: 999;
}
</style>
