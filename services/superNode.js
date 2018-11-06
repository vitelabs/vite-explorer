import { post } from "../api/axios";

const PREFIX = "node";

export default {
  getList({
    search = null
  }) {
    return post(`${PREFIX}/list`, {
      search
    });
  },
  
  getDetail({
    producerAddress = null
  }) {
    return post(`${PREFIX}/detail`, {
      producerAddress
    });
  }
};
