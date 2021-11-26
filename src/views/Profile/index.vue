<template>
  <Layout>
    <div class="user-profile">
      <h1>{{ account }}</h1>
      <h2>{{ getBalance }} {{ tokenSymbol }}</h2>
      <Button @click="handleLogout" style="margin: auto" class="button-danger"
        >Logout</Button
      >
    </div>
  </Layout>
</template>

<script>
import { mapState } from 'vuex';
import user from '@/components/mixins/user.js';
import { utils } from 'web3';

export default {
  mixins: [user],
  computed: {
    ...mapState({
      account: (state) => state.user.account,
      balance: (state) => state.user.balance,
      tokenSymbol: (state) => state.app.token?.symbol,
    }),
    getBalance() {
      return this.balance ? utils.fromWei(this.balance) : 0;
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
