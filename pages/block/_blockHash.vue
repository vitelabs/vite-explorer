<template>
  <div class="block-container">
    <detail-layout v-if="!error"
        :title="`${title}: ${showBlockDetail.hash}`"
        :list="list"
        :error="error">
    </detail-layout>
    <error v-if="error" :error="error"></error>
  </div>
</template>

<script>
  import detailLayout from "~/components/detailLayout";
  import error from "~/components/error";
  import block from "~/services/block.js";

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
          blockDetail
        };
      } catch(err) {
        return {
          error: err.msg || "get block fail"
        };
      }
    },
    data() {
      return {
        title: this.$t('block.title'),
        blockDetail: {},
        error: ""
      };
    },
    computed: {
      showBlockDetail() {
        return {
          hash: this.blockDetail.hash || "",
          height: this.blockDetail.height || "",
          accountNum: this.blockDetail.accountNum || 0,
          producer: this.blockDetail.producer || "",
          amount: this.blockDetail.amount ? `${this.blockDetail.amount}Vite` : ""
        };
      },
      list() {
        const blockDetailMap = this.$t('blockDetailMap');

        let list = [];
        for (let key in blockDetailMap) {
          list.push({
            describe: this.showBlockDetail[key] || "----",
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
