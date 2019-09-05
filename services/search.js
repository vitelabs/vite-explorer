import { get } from "../api/axios";

const PREFIX = "search";

export default {
  judgeTransOrBlock({ addr }) {
    return get(`${PREFIX}/judgeTransOrBlock`, { addr });
  },
  judgeTokenName({ str }) {
    return get(`${PREFIX}/tokenNameOrSymbol`, { str });
  },
  getSimilar({wd, searchType = 0}) {
    return get(`${PREFIX}/similarList`, { wd, searchType });
  }
};
