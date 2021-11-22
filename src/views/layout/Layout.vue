<template>
  <div id="layout">
    <Header />
    <div id="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/views/layout/Header.vue';
export default {
  components: { Header },
};
</script>

<style lang="scss" scoped>
#layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  #main {
    flex-grow: 1;
    overflow-y: auto;
    width: 100%;
    background-color: $color-gray-3;
  }
}
</style>
