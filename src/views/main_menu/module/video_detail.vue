<template>
  <div class="video_detail_wrapper"></div>
</template>

<script>
export default {
  name: "video_detail",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.video_detail_wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>