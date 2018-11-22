<template>
  <div class="account-container">
    <div v-if="!error">
      <detail-layout
        :title="`${title}`"
        :list="nodeList"
        :is-account="true"
        :extral-list="nodeList">
        <template slot="footer-tab-content">
          <div class="tab-wrapper">
            <div class="tab-content" :class="{'is-active': tabParams === 'award'}">{{$t('SBPAwardList.label')}}</div>
          </div>
        </template>
      </detail-layout>

      <award-list v-if="tabParams === 'award'"
        :has-title="false">
      </award-list>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import detailLayout from "~/components/detailLayout";
  import error from "~/components/error";
  import awardList from "~/components/awardList.vue";

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      detailLayout, error, awardList
    },
    validate({ params }) {
      return params.nodeName;
    },
    async asyncData() {
      try {
        // let superNodeDetail = await node.getDetail({
        //   producerAddress: params.nodeName
        // });
        let superNodeDetail = {
          nodeName: "hhhh"
        };
        let isSBP = superNodeDetail.sbpType ? true : false;
        return {
          superNodeDetail,
          isSBP
        };
      } catch(err) {
        return {
          error: err.msg || "get account || superNodeDetail failed"
        };
      }
    },
    data() {
      return {
        paths: this.$route.path.split("/"),
        title: this.$t("superNodeDetail.title"),
        error: "",
        accountDetail: {},
        nodeList: [],
        tabParams: "award"
      };
    },
    created() {
      this.accountDetail.accountAddress = this.paths[this.paths.length - 1];
    },
    computed: {
      nodeList() {
        return [{
          key: "address",
          sbpType: this.superNodeDetail.sbpType,
          iconList: this.superNodeDetail.sbpType === 1 ? [require("~/assets/images/sbp2.svg")] : [require("~/assets/images/sbp.svg")],
          name: this.$t("superNodeDetail.nodeName"),
          describe: this.superNodeDetail.nodeName
        }, {
          name: this.$t("account.accType"),
          describe: ""
        }];
      }
    },
    methods: {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
