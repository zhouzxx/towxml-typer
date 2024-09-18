<template>
  <view class="page">
    <scroll-view class="page-scroll" scroll-y>
      <view class="news-container">
        <view class="news-content">
          <towxml :nodes="md" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { ref } from "vue";
const towxml = require("/../../../../wxcomponents/towxml/index");
import { onLoad } from "@dcloudio/uni-app";
import { BASE_URL, FILE_PATH } from "@/config";

export default {
  setup() {
    const md = ref();
    uni.request({
      url: `https://zxx-wwj-oss.oss-cn-shenzhen.aliyuncs.com/schChoose/article/4d711758-074e-4be8-b280-77cc51719248/08c54e75-144f-426a-ba38-eb91cf464846.md`,
      encoding: "utf8",
      success: (res) => {
        md.value = towxml(res.data, "markdown");
        console.log("md.value的值", md.value)
      },
      fail: (e) => {
        md.value = towxml("请求发送失败", "markdown");
        console.log("读取文件失败", e);
      },
    });
    return {
      md
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";
</style>