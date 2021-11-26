const user = {
  namespaced: true,
  state: {
    account: undefined,
    balance: 0,
    nfts: [],
  },
  getters: {},
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account;
    },
    SET_BALANCE(state, balance) {
      state.balance = balance;
    },
    SET_NFTs(state, nfts) {
      state.nfts = nfts;
    },
  },
  actions: {
    setAccount({ commit }, account) {
      commit('SET_ACCOUNT', account);
    },
    setBalance({ commit }, balance) {
      commit('SET_BALANCE', balance);
    },
    setNFTs({ commit }, nfts) {
      commit('SET_NFTs', nfts);
    },
  },
};

export default user;
