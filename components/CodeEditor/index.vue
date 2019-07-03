<template>
  <div class="code-container">
    <!-- 查看合约 -->
    <div class="read-code" v-if="tabParams === 'read'">
      <read-contract 
        :contract-address="contractAddress"
        :contract-data="contractData">
      </read-contract>
    </div>
    <!-- 上传合约 -->
    <div class="write-code" v-if="tabParams === 'write'">
      <write-contract :contract-address="contractAddress" @upload="uploadContract"></write-contract>
    </div>
  </div>
</template>
<script>
import readContract from "./readContract.vue";
import writeContract from "./writeContract.vue";
import contract from "~/services/contract.js";

export default {
  components: {
    readContract,
    writeContract
  },
  props: {
    contractAddress: {
      type: String,
      default: ""
    }
  },
  created() {
    this.fetchContractInfo();
  },
  data() {
    return {
      tabParams: "write",
      contractData: {}
    };
  },
  mounted() {
  },
  methods: {
    fetchContractInfo() {
      contract.getContractDetail({
        accountAddress: this.contractAddress
      }).then(data=> {
        if (!data) {
          this.tabParams = "write";
        } else {
          this.tabParams = "read";
          this.contractData = data;
        }
      }).catch(err=> {
        console.warn(err);
      });
    },
    uploadContract(inputs) {
      contract.uploadContract({
        ...inputs
      }).then(data=> {
        this.$message.info(this.$t("contract.verify.uploadSuccess"));
        this.fetchContractInfo();
        console.log(data);
      }).catch(err=> {
        this.$message.error(err.msg || this.$t("contract.verify.fail"));
      });
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";

</style>


