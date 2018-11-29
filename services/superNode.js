import { get, post } from "../api/axios";

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
  },
  
  getSuperNodeDetail({
    nodeName = null
  }) {
    return get(`${PREFIX}/supernode/detail`, {
      nodeName
    });
  },

  getCycleTime() {
    return get(`${PREFIX}/supernode/cycleExcel`);
  },

  getProducerList({
    nodeName = null
  }) {
    return get(`${PREFIX}/supernode/producer/list`, {
      nodeName
    });
  }
};
