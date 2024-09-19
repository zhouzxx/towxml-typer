<template>
  <view class="page">
    <scroll-view class="page-scroll" scroll-y :scrollTop="scrollTop" :scroll-with-animation="true">
      <view class="scroll-container">
        <towxml :nodes="md" :openTyper="true" :speed="20"/>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { onMounted, ref, getCurrentInstance, nextTick } from "vue";
const towxml = require("/../../../../wxcomponents/towxml/index");
const { scrollCb,lastScrollTime } = require("/../../../../wxcomponents/towxml/typer");

export default {
  setup() {
    const md = ref();
    const scrollTop = ref(0);
    const instance = getCurrentInstance();
    uni.request({
      // url: `https://zxx-wwj-oss.oss-cn-shenzhen.aliyuncs.com/schChoose/article/4d711758-074e-4be8-b280-77cc51719248/08c54e75-144f-426a-ba38-eb91cf464846.md`,
      url: `https://zxx-wwj-oss.oss-cn-shenzhen.aliyuncs.com/schChoose/article/d338e6c9-dc59-45d1-8482-5ea21d05f449/923e9f20-46da-4026-844b-f6a2c14ec0eb.md`,
      // url: `https://zxx-wwj-oss.oss-cn-shenzhen.aliyuncs.com/111.md`,
      encoding: "utf8",
      success: (res) => {
        md.value = towxml(res.data, "markdown");
        console.log("md.value的值", md.value);
      },
      fail: (e) => {
        md.value = towxml("请求发送失败", "markdown");
        console.log("读取文件失败", e);
      },
    });

    // setTimeout(() => {
    //   uni.request({
    //     // url: `https://zxx-wwj-oss.oss-cn-shenzhen.aliyuncs.com/schChoose/article/4d711758-074e-4be8-b280-77cc51719248/08c54e75-144f-426a-ba38-eb91cf464846.md`,
    //     url: `https://zxx-wwj-oss.oss-cn-shenzhen.aliyuncs.com/schChoose/article/d338e6c9-dc59-45d1-8482-5ea21d05f449/923e9f20-46da-4026-844b-f6a2c14ec0eb.md`,
    //     encoding: "utf8",
    //     success: (res) => {
    //       md.value = towxml(res.data, "markdown");
    //       console.log("新的md.value的值", md.value);
    //     },
    //     fail: (e) => {
    //       md.value = towxml("请求发送失败", "markdown");
    //       console.log("读取文件失败", e);
    //     },
    //   });
    // }, 10000);

    onMounted(() => {
      scrollCb.value = () => {
        nextTick(() => {
          uni
            .createSelectorQuery()
            .in(instance)
            .select(".page-scroll")
            .boundingClientRect((res) => {
              const scrollHeight = res.height;
              uni
                .createSelectorQuery()
                .in(instance)
                .select(".scroll-container")
                .boundingClientRect((res1) => {
                  const scrollContainerHeight = res1.height;
                  const top = scrollContainerHeight - scrollHeight;
                  if (top > 0) {
                    scrollTop.value = top;
                    lastScrollTime.value = Date.now()
                  }
                })
                .exec();
            })
            .exec();
        });
      };
    });

    return {
      md,
      scrollTop,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";
</style>
