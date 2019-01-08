import { get } from "../api/axios";

const PREFIX = "stats";

export default {
  getPageDelayTime() {
    return get(`${PREFIX}/pageDelay`);
  }
};
