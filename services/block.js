import { get, post } from "../api/axios";

const PREFIX = "block";

export default {
  /**
   * get snapshotchain blocklist
   *
   * @param {Object} {
   *   index,  -- from the beginning of the page，start from 0.
   *   num, -- take a few pages, take 1 by default
   *   count = 20 -- how many Block are taken per page. The default is 20.
   * }
   * @returns {Promise}
   */
  getList({
    pageIndex,
    pageSize = 20,
    pageNum,
    producerAddress = null
  }) {
    return post(`${PREFIX}/list`, {
      paging: {
        index: pageIndex, 
        count: pageSize,
        num: pageNum,
      },
      producerAddress
    });
  },
  
  // get snapshotchain block
  getDetail({blockHash}) {
    return get(`${PREFIX}/detail`, {
      blockHash
    });
  },

  getTop10List() {
    return post(`${PREFIX}/list/topBk10`, {
      paging: {
        index: 1, 
        count: 10
      }
    });
  }
};

