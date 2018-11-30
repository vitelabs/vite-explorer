import { get, post } from "../api/axios";

const PREFIX = "node";

export default {
  getList({
    latestCycle = 1
  }) {
    return post(`${PREFIX}/list`, {
      latestCycle
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
    return post(`${PREFIX}/supernode/detail/producer/list`, {
      nodeName
    });
  },
  loopSBPList() {
    return post(`${PREFIX}/supernode/list/cursbp`, {});
  }
};
