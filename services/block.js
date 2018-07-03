import { get, post } from "../api/axios";

const PREFIX = "block";

export default {
  /**
   * get snapshotchain blocklist
   *
   * @param {Object} {
   *   index,  -- from the beginning of the page，start from 0.
   *   num, -- take a few pages, take 1 by default
   *   count = 10 -- how many Block are taken per page. The default is 10.
   * }
   * @returns {Promise}
   */
  getList({
    pageIndex,
    pageSize = 10,
    pageNum
  }) {
    return post(`${PREFIX}/list`, {
      paging: {
        index: pageIndex, 
        count: pageSize,
        num: pageNum
      }
    });
  },
  
  // get snapshotchain block
  getDetail({blockHash}) {
    return get(`${PREFIX}/detail`, {
      blockHash
    });
  }
};

