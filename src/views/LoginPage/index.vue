<template>
  <div id="login-page">
    <div class="option-container">
      <Button @click="login">
        <img src="@/assets/icon/metamask.svg" alt="" class="icon" />
        <div class="text">{{ $t('pageLogin.buttonLogin') }}</div>
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/base/Button.vue';
import { mapActions, mapState } from 'vuex';
import toast from '@/components/mixins/toast.js';
import loader from '@/components/mixins/loader.js';
import Web3 from 'web3';
export default {
  mixins: [toast, loader],
  components: {
    Button,
  },
  computed: {
    ...mapState({
      account: (state) => state.user.account,
    }),
  },
  created() {
    // if (this.account) {
    //   this.$router.replace('/dashboard');
    // }
  },
  methods: {
    ...mapActions('user', ['setAccount']),
    async login() {
      this.showLoading();
      const ethereum = window.ethereum;
      if (!ethereum) {
        this.closeLoading();
        this.error('Your browser is not support MetaMask Wallet !');
        return;
      }
      const web3 = new Web3(ethereum);
      window.web3 = web3;
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      this.setAccount(accounts[0]);
      this.closeLoading();
    },
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
