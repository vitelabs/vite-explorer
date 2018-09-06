import { get } from "../api/axios";

const PREFIX = "general";

export default {
  getGeneralDetail() {
    return get(`${PREFIX}/detail`);
  },
  getGeneralMarket() {
    return get(`${PREFIX}/market`);
  }
};
