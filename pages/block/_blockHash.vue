<template>
  <div class="block-container">
    <detail-layout v-if="!error"
        :title="`${title}: ${blockHash}`"
        :list="list"
        :error="error">
    </detail-layout>
    <error v-if="error" :error="error"></error>
  </div>
</template>

<script>
  import detailLayout from "~/components/detailLayout";
  import error from "~/components/error";
  import block from "../../services/block.js";

  export default {
    components: {
      detailLayout, error
    },
    validate ({ params }) {
      return params.blockHash;
    },
    async asyncData({ params }) {
      try {
        let blockDetail = await block.getDetail({
          blockHash: params.blockHash
        });
        return {
          blockHash: params.blockHash || "",
          blockDetail
        };
      } catch(err) {
        return {
          blockHash: params.blockHash || "",
          error: err.msg || "get block fail"
        };
      }
    },
    data() {
      return {
        title: "快照块详情",
        blockHash: "",
        blockDetail: {},
        error: ""
      };
    },
    computed: {
      showBlockDetail() {
        return {
          blockHash: this.blockHash,
          height: this.blockDetail.height || "",
          time: "",
          accountNum: 0,
          producer: this.blockDetail.producer || "",
          amount: this.blockDetail.amount || ""
        };
      },
      list() {
        const blockDetailMap = {
          height: "快照块高度",
          time: "快照块年龄",
          accountNum: "打包账户数",
          blockHash: "快照块Hash",
          producer: "打包节点",
          amount: "锻造奖励"
        };

        let list = [];
        for (let key in this.showBlockDetail) {
          list.push({
            describe: this.showBlockDetail[key],
            name: blockDetailMap[key]
          });
        }
        return list;
      },
    },
    head() {
      return {
        title: this.title
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
