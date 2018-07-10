import { get } from "../api/axios";

const PREFIX = "account";

export default {
  getDetail({ accountAddress }) {
    return get(`${PREFIX}/detail`, {
      accountAddress
    });
  }
};
