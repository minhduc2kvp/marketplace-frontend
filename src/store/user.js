const user = {
  namespaced: true,
  state: {
    account: undefined,
  },
  getters: {},
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account;
    },
  },
  actions: {
    setAccount({ commit }, account) {
      commit('SET_ACCOUNT', account);
    },
  },
};

export default user;
