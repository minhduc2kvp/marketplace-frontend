<template>
  <div class="user-profile">
    <h1>{{ account }}</h1>
    <h2>{{ getBalance }} {{ tokenSymbol }}</h2>
    <Button @click="handleLogout" style="margin: auto" class="button-danger"
      >Logout</Button
    >
  </div>
</template>

<script>
import Button from '@/components/base/Button.vue';
import { mapState } from 'vuex';
import user from '@/components/mixins/user.js';
import { utils } from 'web3';

export default {
  mixins: [user],
  components: { Button },
  computed: {
    ...mapState({
      account: (state) => state.user.account,
      balance: (state) => state.user.balance,
      tokenSymbol: (state) => state.app.token.symbol,
    }),
    getBalance() {
      return utils.fromWei(this.balance);
    },
  },
  methods: {
    handleLogout() {
      this.logout();
      // redirect to dashboard
      this.$router.replace('/dashboard');
    },
  },
};
</script>

<style></style>
