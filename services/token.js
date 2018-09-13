import { get, post } from "../api/axios";

const PREFIX = "token";

export default {
  /**
   * get token list
   *
   * @param {Object} {
   *   index,  -- from the beginning of the page，start from 0.
   *   num, -- take a few pages, take 1 by default
   *   count = 20 -- how many Block are taken per page. The default is 20.
   * }
   * @param {*} accountAddress -- optional, account address
   * @param {*} tokenId
   * @returns {Promise}
   */
  getList({
    pageIndex,
    pageSize = 20,
    pageNum,
  }) {
    return post(`${PREFIX}/list`, {
      paging: {
        index: pageIndex, 
        count: pageSize,
        num: pageNum,
      }
    });
  },

  // get token block detail
  getDetail({tokenId, tokenName, tokenSymbol}) {
    return get(`${PREFIX}/detail`, {
      tokenId, tokenName, tokenSymbol
    });
  }
};
