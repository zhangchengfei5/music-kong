<template>
  <div class="all_wrapper">
    <router-view />
  </div>
</template>

<style>
.all_wrapper {
  width: 100%;
  height: 100vh;
  /* overflow: hidden; */
  overflow-x: auto;
  overflow-y: hidden;
}
.all_wrapper::before {
  content: "";
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background: url("../src/assets/images/bg.jpg") no-repeat;
  background-size: cover;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  z-index: -1;
}
</style>
