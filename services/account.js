import { get } from "../api/axios";

const PREFIX = "account";

export default {
  getDetail({accountAddres}) {
    return get(`${PREFIX}/detail`, {
      accountAddres
    });
  }
};
