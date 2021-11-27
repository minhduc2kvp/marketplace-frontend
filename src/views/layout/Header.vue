<template>
  <div id="header">
    <!-- Logo app -->
    <router-link class="logo" to="/dashboard">
      <img src="@/assets/image/logo.png" alt="" />
    </router-link>

    <!-- Menu -->
    <div class="nav">
      <router-link
        v-for="(item, index) in routes"
        :key="index"
        class="nav-item"
        :to="item.path"
      >
        <img class="item-icon" :src="item.icon" alt="" />
        <div class="text">{{ item.text }}</div>
      </router-link>
    </div>

    <!-- Language option -->
    <AntDropdown :trigger="['click']">
      <div class="language-selector">
        <img :src="currentLanguage.flagIcon" class="icon-flag" alt="" />
        <div class="language">{{ currentLanguage.locale }}</div>
        <img src="@/assets/icon/chevron-down.svg" class="icon-arrow" alt="" />
      </div>
      <Menu
        class="language-dropdown-menu"
        @click="handleChangeLanguage"
        slot="overlay"
      >
        <MenuItem
          v-for="(language, index) in languageDropdownOptions"
          :key="index"
        >
          <img :src="language.flagIcon" class="icon-flag" alt="" />
          <div class="language">{{ language.locale }}</div>
          <img
            v-if="currentLanguage.language == language.language"
            src="@/assets/icon/check.svg"
            class="icon-check"
            alt=""
          />
        </MenuItem>
      </Menu>
    </AntDropdown>

    <!-- User action area -->
    <div class="user-section">
      <router-link v-if="!account" class="login-button" to="/login">
        <img class="button-icon" src="@/assets/icon/login.svg" alt="" />
        <div class="button-text">{{ $t('app.login') }}</div>
      </router-link>
      <router-link v-if="account" class="user-profile-button" to="/profile">
        <img class="button-icon" src="@/assets/icon/user.svg" alt="" />
        <div :title="account" class="button-text">
          <div class="text-left">{{ account.slice(0, 40) }}</div>
          <div class="text-right">{{ account.slice(40) }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import AntDropdown from 'ant-design-vue/lib/dropdown';
import Menu from 'ant-design-vue/lib/menu';
import MenuItem from 'ant-design-vue/lib/menu/MenuItem';
import ls from '@/commons/local-storage';
import { mapState } from 'vuex';

const languageDropdownOptions = [
  {
    language: 'vi',
    locale: 'Việt Nam',
    flagIcon: require('@/assets/icon/vn.png'),
  },
  {
    language: 'en',
    locale: 'English',
    flagIcon: require('@/assets/icon/uk.png'),
  },
];

export default {
  components: {
    AntDropdown,
    Menu,
    MenuItem,
  },
  data() {
    return {
      languageDropdownOptions,
      routes: [
        {
          path: '/dashboard',
          text: this.$t('nav.dashboard'),
          icon: require('@/assets/icon/dashboard.svg'),
        },
        {
          path: '/marketplace',
          text: this.$t('nav.marketplace'),
          icon: require('@/assets/icon/marketplace.svg'),
        },
      ],
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.user.account,
    }),
    currentLanguage() {
      const current = this.languageDropdownOptions.find(
        (language) => language.language == ls.getLanguage()
      );
      return current;
    },
  },
  methods: {
    handleChangeLanguage({ key }) {
      ls.setLanguage(this.languageDropdownOptions[key].language);
      this.$router.go();
    },
  },
  created() {},
};
</script>

<style lang="scss">
.language-selector {
  cursor: pointer;
  padding: 0 10px;
  height: 100%;
  margin-left: auto;
  display: flex;
  align-items: center;
  border-left: 2px solid $color-gray-5;
  .language {
    color: $color-white;
    margin: 0 8px;
  }
  img.icon-arrow {
    width: 20px;
    height: 20px;
  }
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

.language-dropdown-menu {
  border-radius: 0 !important;
  background-color: $color-gray-6 !important;
  .ant-dropdown-menu-item {
    display: flex;
    align-items: center;
    color: $color-white;
    font-family: $font-regular;
    font-size: 12px;
    &.ant-dropdown-menu-item-active {
      background-color: $color-gray-5;
    }
    .language {
      margin-left: 8px;
    }
    .icon-check {
      width: 16px;
      height: 16px;
      margin-left: auto;
    }
  }
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
</style>

<style lang="scss" scoped>
#header {
  width: 100%;
  height: 52px;
  background-color: $color-gray-6;
  display: flex;
  align-items: center;
  .logo {
    margin-left: 16px;
    margin-right: 16px;
    img {
      height: 40px;
    }
  }

  .nav {
    height: 100%;
    display: flex;
    .nav-item {
      color: $color-white;
      text-decoration: none;
      font-family: $font-regular;
      font-size: 16px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      &.active {
        // height: 40px;
        // margin-top: auto;
        // border-radius: 8px 8px 0 0;
        background-color: $color-gray-3;
      }
      img.item-icon {
        width: 20px;
        margin-right: 6px;
      }
    }
  }

  .user-section {
    height: 100%;
    .login-button {
      height: 100%;
      align-items: center;
      display: flex;
      padding: 0 16px;
      background-color: $color-primary-4;
      text-decoration: none;
      &.active {
        background-color: $color-gray-3;
      }
      img.button-icon {
        width: 20px;
        margin-right: 8px;
      }
      .button-text {
        color: $color-white;
        font-family: $font-regular;
        font-size: 16px;
      }
    }
    .user-profile-button {
      height: 100%;
      align-items: center;
      display: flex;
      border-left: 2px solid $color-gray-5;
      padding: 0 16px;
      &.active {
        border-color: $color-gray-3;
        background-color: $color-gray-3;
      }
      .button-icon {
        width: 30px;
        height: 30px;
        padding: 5px;
        border-radius: 50%;
        border: 2px solid $color-white;
      }
      .button-text {
        margin-left: 12px;
        display: flex;
        color: $color-white;
        .text-left {
          width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
