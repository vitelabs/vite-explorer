import { get, post } from "../api/axios";

const PREFIX = "contract";

export default {
  uploadContract(contractInfo) {
    return post(`${PREFIX}/upload`, {
      ...contractInfo
    });
  },
  getContractDetail({ accountAddress }) {
    return get(`${PREFIX}/detail`, {
      accountAddress
    });
  }
};
