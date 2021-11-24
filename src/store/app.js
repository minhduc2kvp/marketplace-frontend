import TankToken from '@/web3/artifacts/TankToken.json';
import TankNFT from '@/web3/artifacts/TankNFT.json';
import TankMarket from '@/web3/artifacts/TankMarket.json';
import {
  tankTokenAddress,
  tankNFTAddress,
  tankMarketAddress,
  URL_RPC,
} from '@/web3/factory-address.js';
import Web3 from 'web3';

const app = {
  namespaced: true,
  state: {
    loading: false,
    contracts: undefined,
    token: undefined,
    nft: undefined,
    market: undefined,
  },
  getters: {},
  mutations: {
    SHOW_LOADING(state) {
      state.loading = true;
    },
    CLOSE_LOADING(state) {
      state.loading = false;
    },
    SET_CONTRACTS(state, contracts) {
      state.contracts = contracts;
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
      const web3 = new Web3(URL_RPC);
      const tokenContract = new web3.eth.Contract(
        TankToken.abi,
        tankTokenAddress
      );
      const nftContract = new web3.eth.Contract(TankNFT.abi, tankNFTAddress);
      const marketContract = new web3.eth.Contract(
        TankMarket.abi,
        tankMarketAddress
      );
      const token = await tokenContract.methods.symbol().call();
      const nft = await nftContract.methods.symbol().call();
      commit('SET_CONTRACTS', { token: tokenContract });
      commit('SET_TOKEN', { symbol: token });
    },
  },
};

export default app;
