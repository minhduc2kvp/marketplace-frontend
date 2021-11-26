import ls from '@/commons/local-storage';
import { mapActions, mapState } from 'vuex';
import { getAccountAssets } from '@/web3/functions.js';

const user = {
  computed: {
    ...mapState({}),
  },
  methods: {
    ...mapActions('user', ['setAccount', 'setBalance', 'setNFTs']),
    /**
     *
     * @param {*} accounts
     */
    async handleAccountChanged(accounts) {
      if (ls.getUser()) {
        const assets = await getAccountAssets(accounts[0]);

        // save to store
        this.setAccount(accounts[0]);
        this.setBalance(assets.balance);
        this.setNFTs(assets.nfts);

        // save to localstorage
        const user = { account: accounts[0], ...assets };
        ls.setUser(JSON.stringify(user));
      }
    },

    listenChangeAccount() {
      const ethereum = window.ethereum;
      // listen event change account
      ethereum.on('accountsChanged', this.handleAccountChanged);
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

      const assets = await getAccountAssets(accounts[0]);

      // save to store
      this.setAccount(accounts[0]);
      this.setBalance(assets.balance);
      this.setNFTs(assets.nfts);

      // save to localstorage
      const user = { account: accounts[0], ...assets };
      ls.setUser(JSON.stringify(user));

      this.listenChangeAccount();
    },

    /**
     *
     */
    logout() {
      // reset store
      this.setAccount(undefined);
      this.setBalance(0);
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
