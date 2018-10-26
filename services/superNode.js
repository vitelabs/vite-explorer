import { post } from "../api/axios";

const PREFIX = "node";

export default {
  getList({
    pageIndex,
    pageSize = 20,
    pageNum,
    filterInput = null
  }) {
    return post(`${PREFIX}/list`, {
      paging: {
        index: pageIndex, 
        count: pageSize,
        num: pageNum,
      },
      filterInput
    });
  }
};
