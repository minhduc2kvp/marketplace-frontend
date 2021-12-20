import ls from '@/commons/local-storage';
import { mapActions, mapState } from 'vuex';
import { getAccountAssets } from '@/web3/functions.js';

const user = {
  computed: {
    ...mapState({}),
  },
  methods: {
    ...mapActions('user', [
      'setAccount',
      'setBalance',
      'setNFTs',
      'setItemsOnSell',
      'setIsOwner',
      'reset',
    ]),

    /**
     *
     * @param {*} account
     */
    async loadAssetAccount(account) {
      const assets = await getAccountAssets(account);
      this.setBalance(assets.balance);
      this.setNFTs(assets.nfts);
      this.setItemsOnSell(assets.itemsOnSell);
    },

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
        if (ls.getOwner().toLowerCase() == accounts[0].toLowerCase()) {
          this.setIsOwner(true);
        }
        // save to localstorage
        ls.setUser(accounts[0]);
        await this.loadAssetAccount(accounts[0]);
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
      if (ls.getOwner().toLowerCase() == accounts[0].toLowerCase()) {
        this.setIsOwner(true);
      }
      // save to localstorage
      ls.setUser(accounts[0]);
      await this.loadAssetAccount(accounts[0]);

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
