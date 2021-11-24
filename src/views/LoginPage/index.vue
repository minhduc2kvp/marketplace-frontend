<template>
  <div id="login-page">
    <div class="option-container">
      <Button @click="handleLogin">
        <img src="@/assets/icon/metamask.svg" alt="" class="icon" />
        <div class="text">{{ $t('pageLogin.buttonLogin') }}</div>
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/base/Button.vue';
import { mapState } from 'vuex';
import toast from '@/components/mixins/toast.js';
import loader from '@/components/mixins/loader.js';
import user from '@/components/mixins/user.js';

export default {
  mixins: [toast, loader, user],
  components: {
    Button,
  },
  computed: {
    ...mapState({
      account: (state) => state.user.account,
    }),
  },
  methods: {
    async handleLogin() {
      this.showLoading();
      // Check provider
      if (!window.ethereum) {
        this.closeLoading();
        this.error('Your browser is not support MetaMask Wallet !');
        return;
      }

      // Connect metamask
      try {
        await this.login();
        // redirect to dashboard
        this.$router.replace('/dashboard');
      } catch (error) {
        console.error(error);
      } finally {
        this.closeLoading();
      }
    },
  },
  created() {
    if (this.account) {
      this.$router.replace('/dashboard');
    }
  },
};
</script>

<style lang="scss" scoped>
#login-page {
  height: 100%;
  width: 100%;
  .option-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .button {
      display: flex;
      align-items: center;
      img.icon {
        width: 24px;
        margin-right: 8px;
      }
    }
  }
}
</style>
