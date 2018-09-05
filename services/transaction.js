import { get, post } from "../api/axios";

const PREFIX = "transaction";

export default {

  /**
   * get account chain block list
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
    pageIndex,
    pageSize = 10,
    pageNum,
    sortObj
  }, accountAddress, tokenId, filterAddressObj, selectObj) {
    let outAccountAddress = null;
    let inAccountAddress = null;
    if (filterAddressObj && filterAddressObj.type) {
      if (filterAddressObj.type === "in") {
        inAccountAddress = filterAddressObj.address;
        outAccountAddress = null;
      }
      if (filterAddressObj.type === "out") {
        inAccountAddress = null;
        outAccountAddress = filterAddressObj.address;
      }
    }
    return post(`${PREFIX}/list`, {
      paging: {
        index: pageIndex,
        count: pageSize,
        num: pageNum,
        sort: sortObj && sortObj.sort || null,
        order: sortObj && sortObj.order || null
      },
      accountAddress : accountAddress || null,
      tokenId: tokenId || null,
      status: selectObj && selectObj.status || null,
      type: selectObj && selectObj.type || null,
      outAccountAddress,
      inAccountAddress
    });
  },

  // get account chain block
  getDetail({blockHash}) {
    return get(`${PREFIX}/detail`, {
      blockHash
    });
  },

  getTop10List() {
    return post(`${PREFIX}/list/topTx10`, {
      paging: {
        index: 1, 
        count: 10
      }
    });
  },
  getChartData() {
    return get(`${PREFIX}/timeline`);
  }
};
