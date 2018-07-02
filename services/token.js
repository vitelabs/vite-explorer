import { get, post } from "../api/axios";

const PREFIX = "token";

export default {
  /**
   * get token list
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
  getList({
    index,
    num,
    count = 10
  }, accountAddress, tokenId) {
    return post(`${PREFIX}/list`, {
      paging: {index, num, count},
      accountAddress,
      tokenId
    });
  },

  // get token block detail
  getDetail({tokenId, tokenName, tokenSymbol}) {
    return get(`${PREFIX}/detail`, {
      tokenId, tokenName, tokenSymbol
    });
  }
};
