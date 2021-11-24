const user = {
  namespaced: true,
  state: {
    account: undefined,
    balance: 0,
  },
  getters: {},
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account;
    },
    SET_BALANCE(state, balance) {
      state.balance = balance;
    },
  },
  actions: {
    setAccount({ commit }, account) {
      commit('SET_ACCOUNT', account);
    },
    setBalance({ commit }, balance) {
      commit('SET_BALANCE', balance);
    },
  },
};

export default user;
