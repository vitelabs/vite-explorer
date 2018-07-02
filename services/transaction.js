import { get, post } from "../api/axios";

const PREFIX = "transaction";

/**
 * get accountchain blocklist
 *
 * @param {Object} {
 *   index,  -- from the beginning of the page，start from 0.
 *   num, -- take a few pages, take 1 by default
 *   count = 10 -- how many Block are taken per page. The default is 10.
 * }
 * @param {*} accountAddress -- optional, account address
 * @param {*} tokenId
 * @returns {Promise}
 */
export function getBlocklist({
  index,
  num,
  count = 10
}, accountAddress, tokenId) {
  return post(`${PREFIX}/blocklist`, {
    paging: {index, num, count},
    accountAddress,
    tokenId
  });
}

// get accountchain block
export function getBlock({blockHash}) {
  return get(`${PREFIX}/block`, {
    blockHash
  });
}
