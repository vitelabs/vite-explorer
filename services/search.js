import { get } from "../api/axios";

const PREFIX = "search";

export default {
  judgeTransOrBlock({ addr }) {
    return get(`${PREFIX}/judgeTransOrBlock`, { addr });
  }
};
