<template>
  <div id="app" class="font-size">
    <Layout />

    <!-- Loading -->
    <div v-show="isLoading" id="loader">
      <img src="@/assets/image/loader.gif" alt="" />
    </div>
  </div>
</template>

<script>
import ls from '@/common/local-storage';
import i18n from '@/plugins/lang';
import Layout from '@/views/layout/Layout.vue';
import { mapState } from 'vuex';
import '@/assets/scss/style.scss';

export default {
  components: { Layout },
  created() {
    // setup language for app
    let language = ls.getLanguage();
    if (!language) {
      language = navigator.language.split('-')[0];
      ls.setLanguage(language);
    }
    i18n.locale = language;
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.app.loading,
    }),
  },
};
</script>

<style lang="scss">
@import url('./assets/css/main.css');

* {
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: $font-regular;
  font-size: 14px;
  letter-spacing: 1px;
}

#app {
  font-family: $font-regular;
  font-size: 14px;
  letter-spacing: 1px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  #loader {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
  }
}
</style>
