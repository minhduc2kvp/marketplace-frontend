const user = {
  namespaced: true,
  state: {
    account: undefined,
    balance: 0,
    nfts: [],
    itemsOnSell: [],
    isOwner: false,
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
    SET_ITEMs_ON_SELL(state, itemsOnSell) {
      state.itemsOnSell = itemsOnSell;
    },
    SET_IS_OWNER(state, isOwner) {
      state.isOwner = isOwner;
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
    setItemsOnSell({ commit }, itemsOnSell) {
      commit('SET_ITEMs_ON_SELL', itemsOnSell);
    },
    setIsOwner({ commit }, isOwner) {
      commit('SET_IS_OWNER', isOwner);
    },
    reset({ commit }) {
      commit('SET_ACCOUNT', undefined);
      commit('SET_BALANCE', 0);
      commit('SET_NFTs', []);
      commit('SET_ITEMs_ON_SELL', []);
      commit('SET_IS_OWNER', false);
    },
  },
};

export default user;
