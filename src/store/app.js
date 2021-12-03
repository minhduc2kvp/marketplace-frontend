import {
  getTokenContract,
  getNFTContract,
  getMarketContract,
} from '@/web3/functions.js';
import ls from '@/commons/local-storage.js';

const app = {
  namespaced: true,
  state: {
    loading: false,
    token: undefined,
    nft: undefined,
    market: undefined,
    owner: undefined,
  },
  getters: {},
  mutations: {
    SHOW_LOADING(state) {
      state.loading = true;
    },
    CLOSE_LOADING(state) {
      state.loading = false;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_NFT(state, nft) {
      state.nft = nft;
    },
    SET_MARKET(state, market) {
      state.market = market;
    },
  },
  actions: {
    showLoading({ commit }) {
      commit('SHOW_LOADING');
    },
    closeLoading({ commit }) {
      commit('CLOSE_LOADING');
    },

    async init({ commit }) {
      const token = await getTokenContract();
      const nft = await getNFTContract();
      const market = await getMarketContract();
      commit('SET_TOKEN', token);
      commit('SET_NFT', nft);
      commit('SET_MARKET', market);
      ls.setOwner(token.owner);
    },
  },
};

export default app;
