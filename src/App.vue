<template>
  <div id="app" class="font-size">
    <router-view />

    <!-- Loading -->
    <div v-show="isLoading" id="loader">
      <img src="@/assets/image/loader.gif" alt="" />
    </div>
  </div>
</template>

<script>
import ls from '@/commons/local-storage';
import i18n from '@/plugins/lang';
import loader from '@/components/mixins/loader.js';
import user from '@/components/mixins/user.js';
import toast from '@/components/mixins/toast.js';
import { mapState, mapActions } from 'vuex';
import '@/assets/scss/style.scss';

export default {
  mixins: [loader, user, toast],
  computed: {
    ...mapState({
      isLoading: (state) => state.app.loading,
    }),
  },
  methods: {
    ...mapActions('user', ['setAccount', 'setBalance']),
    ...mapActions('app', ['init']),
  },
  async created() {
    //#region setup language for app
    let language = ls.getLanguage();
    if (!language) {
      language = navigator.language.split('-')[0];
      ls.setLanguage(language);
    }
    i18n.locale = language;
    //#endregion

    //#region get user from localstorage
    const user = JSON.parse(ls.getUser());
    if (user) {
      this.showLoading();
      await this.login();
      this.closeLoading();
    }
    //#endregion

    //#region init data app
    this.showLoading();
    try {
      await this.init();
    } catch (error) {
      console.error('Something went wrong !');
    }
    this.closeLoading();
    //#endregion
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
  color: $color-white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
