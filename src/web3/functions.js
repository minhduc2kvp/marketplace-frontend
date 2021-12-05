import TankToken from './artifacts/TankToken.json';
import TankNFT from './artifacts/TankNFT.json';
import TankMarket from './artifacts/TankMarket.json';
import {
  URL_RPC,
  tankTokenAddress,
  tankNFTAddress,
  tankMarketAddress,
} from './factory-address';
import Web3 from 'web3';

/**
 *
 * @param {*} account
 * @returns
 */
const getAccountAssets = async function (account) {
  const web3 = new Web3(window.ethereum);
  const tokenContract = new web3.eth.Contract(TankToken.abi, tankTokenAddress);
  const nftContract = new web3.eth.Contract(TankNFT.abi, tankNFTAddress);

  const tokenBalance = await tokenContract.methods.balanceOf(account).call();
  const nftBalance = await nftContract.methods.balanceOf(account).call();

  // get nfts token uri (metadata)
  const nfts = [];
  for (let index = 0; index < nftBalance; index++) {
    const tokenId = await nftContract.methods
      .tokenOfOwnerByIndex(account, index)
      .call();
    const tokenURI = await nftContract.methods.tokenURI(tokenId).call();
    nfts.push({ tokenId, ...JSON.parse(tokenURI) });
  }

  return { balance: tokenBalance, nfts };
};

/**
 *
 * @returns
 */
// const getMarketItems = async function () {
//   const web3 = new Web3(URL_RPC);
//   const marketContract = new web3.eth.Contract(
//     TankMarket.abi,
//     tankMarketAddress
//   );
//   const nftContract = new web3.eth.Contract(TankNFT.abi, tankNFTAddress);

//   // get all items in market
//   let items = await marketContract.methods.getMarketItems().call();
//   items = await Promise.all(
//     items.map(async (item) => {
//       const itemData = await nftContract.methods.tokenURI(item.tokenId).call();
//       return {
//         itemId: item.itemId,
//         tokenId: item.tokenId,
//         seller: item.seller,
//         price: item.price,
//         data: JSON.parse(itemData),
//       };
//     })
//   );

//   return items;
// };

/**
 * Get public information of token contract
 * @returns Object information of token contract
 */
const getTokenContract = async function () {
  const web3 = new Web3(URL_RPC);
  const tokenContract = new web3.eth.Contract(TankToken.abi, tankTokenAddress);
  const name = await tokenContract.methods.name().call();
  const symbol = await tokenContract.methods.symbol().call();
  const totalSupply = await tokenContract.methods.totalSupply().call();
  const owner = await tokenContract.methods.owner().call();
  return { name, symbol, totalSupply, owner };
};

/**
 * Get public information of nft contract
 * @returns Object information of nft contract
 */
const getNFTContract = async function () {
  const web3 = new Web3(URL_RPC);
  const nftContract = new web3.eth.Contract(TankNFT.abi, tankNFTAddress);
  const name = await nftContract.methods.name().call();
  const symbol = await nftContract.methods.symbol().call();
  const creatingCost = await nftContract.methods.getCreatingCost().call();
  const owner = await nftContract.methods.owner().call();
  return { name, symbol, creatingCost, owner };
};

/**
 * Get public information of market contract
 * @returns Object information of market contract
 */
const getMarketContract = async function () {
  const web3 = new Web3(URL_RPC);
  const marketContract = new web3.eth.Contract(
    TankMarket.abi,
    tankMarketAddress
  );
  const listingCost = await marketContract.methods.getListingCost().call();
  const owner = await marketContract.methods.owner().call();

  const nftContract = new web3.eth.Contract(TankNFT.abi, tankNFTAddress);
  // get all items in market
  let items = await marketContract.methods.getMarketItems().call();
  items = await Promise.all(
    items.map(async (item) => {
      const itemData = await nftContract.methods.tokenURI(item.tokenId).call();
      return {
        itemId: item.itemId,
        tokenId: item.tokenId,
        seller: item.seller,
        price: item.price,
        data: JSON.parse(itemData),
      };
    })
  );
  return { listingCost, owner, items };
};

/**
 * Create nft item
 * @param {String} tokenURI Data of nft
 * @param {String} sender Address of sender
 */
const createNFT = async function (tokenURI, sender) {
  const web3 = new Web3(window.ethereum);
  const tokenContract = new web3.eth.Contract(TankToken.abi, tankTokenAddress);
  const nftContract = new web3.eth.Contract(TankNFT.abi, tankNFTAddress);

  // get creating cost
  const creatingCost = await nftContract.methods.getCreatingCost().call();

  // approve pay fee create
  await tokenContract.methods
    .approve(nftContract._address, creatingCost)
    .send({ from: sender });

  // create nft
  await nftContract.methods.create(tokenURI).send({ from: sender });
};

/**
 *
 * @param {*} tokenId
 * @param {*} sender
 */
const burnNFT = async function (tokenId, sender) {
  const web3 = new Web3(window.ethereum);
  const nftContract = new web3.eth.Contract(TankNFT.abi, tankNFTAddress);
  await nftContract.methods.burn(tokenId).send({ from: sender });
};

/**
 *
 * @param {*} tokenId
 * @param {*} price
 * @param {*} sender
 */
const sellNFT = async function (tokenId, price, sender) {
  const web3 = new Web3(window.ethereum);
  const tokenContract = new web3.eth.Contract(TankToken.abi, tankTokenAddress);
  const nftContract = new web3.eth.Contract(TankNFT.abi, tankNFTAddress);
  const marketContract = new web3.eth.Contract(
    TankMarket.abi,
    tankMarketAddress
  );

  // get listing cost
  const listingCost = await marketContract.methods.getListingCost().call();

  // approve pay fee listing
  await tokenContract.methods
    .approve(marketContract._address, listingCost)
    .send({ from: sender });

  // approve transform nft token
  await nftContract.methods
    .approve(marketContract._address, tokenId)
    .send({ from: sender });

  // on sell nft
  await marketContract.methods
    .createMarketItem(tokenId, web3.utils.toWei(price))
    .send({ from: sender });
};

// /**
//  *
//  * @param {*} itemId
//  * @param {*} sender
//  */
// const buyNFT = async function (itemId, price, sender) {
//   const web3 = new Web3(window.ethereum);
//   const tokenContract = new web3.eth.Contract(TankToken.abi, tankTokenAddress);
//   const marketContract = new web3.eth.Contract(
//     TankMarket.abi,
//     tankMarketAddress
//   );

//   // approve pay price of item
//   await tokenContract.methods
//     .approve(marketContract._address, price)
//     .send({ from: sender });

//   // buy nft
//   await marketContract.methods.sellMarketItem(itemId).send({ from: sender });
// };

/**
 *
 * @param {*} sender
 */
const payListingCost = async function (sender) {
  const web3 = new Web3(window.ethereum);
  const tokenContract = new web3.eth.Contract(TankToken.abi, tankTokenAddress);
  const marketContract = new web3.eth.Contract(
    TankMarket.abi,
    tankMarketAddress
  );

  // get listing cost
  const listingCost = await marketContract.methods.getListingCost().call();

  // approve pay fee listing
  await tokenContract.methods
    .approve(marketContract._address, listingCost)
    .send({ from: sender });
};

/**
 *
 * @param {*} tokenId
 * @param {*} sender
 */
const approveNFT = async function (tokenId, sender) {
  const web3 = new Web3(window.ethereum);
  const nftContract = new web3.eth.Contract(TankNFT.abi, tankNFTAddress);
  const marketContract = new web3.eth.Contract(
    TankMarket.abi,
    tankMarketAddress
  );

  // approve transform nft token
  await nftContract.methods
    .approve(marketContract._address, tokenId)
    .send({ from: sender });
};

/**
 *
 * @param {*} tokenId
 * @param {*} price
 * @param {*} sender
 */
const onSellNFT = async function (tokenId, price, sender) {
  const web3 = new Web3(window.ethereum);
  const marketContract = new web3.eth.Contract(
    TankMarket.abi,
    tankMarketAddress
  );

  // on sell nft
  await marketContract.methods
    .createMarketItem(tokenId, web3.utils.toWei(price))
    .send({ from: sender });
};

/**
 *
 * @param {*} amount
 * @param {*} sender
 */
const approveToken = async function (amount, sender) {
  const web3 = new Web3(window.ethereum);
  const tokenContract = new web3.eth.Contract(TankToken.abi, tankTokenAddress);
  const marketContract = new web3.eth.Contract(
    TankMarket.abi,
    tankMarketAddress
  );

  // approve pay fee listing
  await tokenContract.methods
    .approve(marketContract._address, web3.utils.toWei(amount))
    .send({ from: sender });
};

/**
 *
 * @param {*} itemId
 * @param {*} sender
 */
const buyNFT = async function (itemId, sender) {
  const web3 = new Web3(window.ethereum);
  const marketContract = new web3.eth.Contract(
    TankMarket.abi,
    tankMarketAddress
  );

  // buy nft
  await marketContract.methods.sellMarketItem(itemId).send({ from: sender });
};

export {
  getAccountAssets,
  getTokenContract,
  getNFTContract,
  getMarketContract,
  createNFT,
  burnNFT,
  sellNFT,
  buyNFT,
  payListingCost,
  approveNFT,
  onSellNFT,
  approveToken,
};
