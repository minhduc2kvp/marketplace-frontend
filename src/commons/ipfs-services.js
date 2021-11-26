import { create } from 'ipfs-http-client';

const IPFS_RPC = 'https://ipfs.infura.io:5001/api/v0';
const IPFS_URL = 'https://ipfs.infura.io/ipfs/';

/**
 * Upload file to ipfs
 * @param {*} file
 * @returns Url to get file
 */
const uploadFile = async function (file) {
  const client = create(IPFS_RPC);
  const res = await client.add(file);
  return IPFS_URL + res.path;
};

export { uploadFile };
