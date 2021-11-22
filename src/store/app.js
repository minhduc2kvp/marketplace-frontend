const app = {
  namespaced: true,
  state: {
    loading: false,
  },
  getters: {},
  mutations: {
    SHOW_LOADING(state) {
      state.loading = true;
    },
    CLOSE_LOADING(state) {
      state.loading = false;
    },
  },
  actions: {
    showLoading({ commit }) {
      commit('SHOW_LOADING');
    },
    closeLoading({ commit }) {
      commit('CLOSE_LOADING');
    },
  },
};

export default app;
