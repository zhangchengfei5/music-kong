<template>
  <div class="progress-wrapper">
    <div class="progress"></div>
    <div class="pointer"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.progress-wrapper {
  position: relative;
  width: 100%;
  height: 3px;
  background-color: #e6e6e6;
}
.progress-wrapper > .progress {
  position: absolute;
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
}
.progress-wrapper > .pointer {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  top: 0;
  left: -2px;
}
</style>