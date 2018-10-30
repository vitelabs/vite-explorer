import { post } from "../api/axios";

const PREFIX = "node";

export default {
  getList({
    producerAddress = null,
    nodeName = null
  }) {
    return post(`${PREFIX}/list`, {
      producerAddress,
      nodeName
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
