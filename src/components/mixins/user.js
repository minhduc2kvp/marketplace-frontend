import ls from '@/commons/local-storage';
import { mapActions, mapState } from 'vuex';
import { getAccountAssets } from '@/web3/functions.js';

const user = {
  computed: {
    ...mapState({}),
  },
  methods: {
    ...mapActions('user', ['setAccount', 'setBalance', 'setNFTs', 'reset']),
    /**
     *
     * @param {*} accounts
     */
    async handleAccountChanged(accounts) {
      if (ls.getUser()) {
        // rest store
        this.reset();
        // save to store
        this.setAccount(accounts[0]);
        // save to localstorage
        ls.setUser(accounts[0]);
        const assets = await getAccountAssets(accounts[0]);
        this.setBalance(assets.balance);
        this.setNFTs(assets.nfts);
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

      // save to store
      this.setAccount(accounts[0]);
      // save to localstorage
      ls.setUser(accounts[0]);
      const assets = await getAccountAssets(accounts[0]);
      this.setBalance(assets.balance);
      this.setNFTs(assets.nfts);

      this.listenChangeAccount();
    },

    /**
     *
     */
    logout() {
      // reset store
      this.reset();
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
