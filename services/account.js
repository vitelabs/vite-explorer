import { get, post} from "../api/axios";

const PREFIX = "account";

export default {
  getDetail({ accountAddress }) {
    return get(`${PREFIX}/detail`, {
      accountAddress
    });
  },
  getList({ 
    pageIndex,
    pageSize = 20
  }) {
    return post(`${PREFIX}/list`, {
      paging: {
        index: pageIndex,
        count: pageSize
      }
    });
  }
};
