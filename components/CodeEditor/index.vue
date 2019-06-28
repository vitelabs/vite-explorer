<template>
  <div class="code-container">
    <!-- 查看合约 -->
    <div class="read-code" v-if="tabParams === 'read'">
      <read-contract :contract-address="contractAddress"></read-contract>
    </div>
    <!-- 上传合约 -->
    <div class="write-code" v-if="tabParams === 'write'">
      <write-contract :contract-address="contractAddress"></write-contract>
    </div>
  </div>
</template>
<script>
import readContract from "./readContract.vue";
import writeContract from "./writeContract.vue";

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
  data() {
    return {
      tabParams: "read"
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";

</style>


