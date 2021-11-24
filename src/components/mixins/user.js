import ls from '@/commons/local-storage';
import { mapActions, mapState } from 'vuex';
import Web3 from 'web3';

const user = {
  computed: {
    ...mapState({
      tokenContract: (state) => state.app.contracts.token,
    }),
  },
  methods: {
    ...mapActions('user', ['setAccount', 'setBalance']),
    /**
     *
     * @param {*} accounts
     */
    handleAccountChanged(accounts) {
      if (ls.getUser()) {
        // save to store
        this.setAccount(accounts[0]);

        // save to localstorage
        const user = { account: accounts[0] };
        ls.setUser(JSON.stringify(user));
      }
    },

    /**
     *
     */
    async login() {
      const ethereum = window.ethereum;
      // connect to metamask account
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      // save to store
      this.setAccount(accounts[0]);

      // get balance
      const balance = await this.tokenContract.methods
        .balanceOf(accounts[0])
        .call();
      this.setBalance(balance);

      // save to localstorage
      const user = { account: accounts[0], balance: balance };
      ls.setUser(JSON.stringify(user));

      // listen event change account
      ethereum.on('accountsChanged', this.handleAccountChanged);
    },

    /**
     *
     */
    logout() {
      // reset store
      this.setAccount(undefined);
      // reset localstorage
      ls.logout();
      // remove event listener account changed
      window.ethereum.removeListener(
        'accountsChanged',
        this.handleAccountChanged
      );
    },
  },
};

export default user;
