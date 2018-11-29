import { get, post } from "../api/axios";

const PREFIX = "transaction";

export default {

  /**
   * get account chain block list
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
      type: selectObj && selectObj.type && (selectObj.type === 0 ? selectObj.type : selectObj.type || null),
      blockType: selectObj && selectObj.blockType && (selectObj.blockType === 0 ? selectObj.blockType : selectObj.blockType || null),  
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
  },
  getGraphList() {
    return post(`${PREFIX}/graph/list`);
  }
};
