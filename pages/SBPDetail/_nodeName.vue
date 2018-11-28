<template>
  <div class="account-container">
    <div v-if="!error">
      <detail-layout
        :title="`${title}`"
        :list="nodeList"
        :is-account="true"
        :extral-list="externalNodeList">
        <template slot="external-item">
          <download-node-detail :node-name="superNodeDetail.nodeName"></download-node-detail>
        </template>
        <template slot="footer-tab-content">
          <div class="tab-wrapper">
            <div class="tab-content" :class="{'is-active': tabParams === 'award'}">{{$t('SBPAwardList.label')}}</div>
          </div>
        </template>
      </detail-layout>

      <award-list v-if="tabParams === 'award'"
        :list="rewardList"
        :loading="loading">
      </award-list>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import detailLayout from "~/components/detailLayout";
  import downloadNodeDetail from "~/components/downloadNodeDetail";
  import error from "~/components/error";
  import awardList from "~/components/awardList.vue";
  import node from "~/services/superNode.js";
  import moment from "moment";
  import { handleBigNum } from "~/utils/util.js";

  export default {
    head() {
      return {
        title: this.title
      };
    },
    components: {
      detailLayout, error, awardList, downloadNodeDetail
    },
    validate({ params }) {
      return params.nodeName;
    },
    async asyncData({ params }) {
      try {
        let loading = true;
        let { nodeDetails, rewardList } = await node.getSuperNodeDetail({
          nodeName: params.nodeName
        });
        loading = false;
        let superNodeDetail = nodeDetails;
        return {
          superNodeDetail,
          rewardList,
          loading
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
        superNodeDetail: {},
        tabParams: "award"
      };
    },
    created() {
      this.superNodeDetail.nodeName = this.paths[this.paths.length - 1];
    },
    computed: {
      nodeList() {
        let superNodeDetailMap = this.$t("superNodeDetail.key");
        let list = [];
        for(let key in superNodeDetailMap) {
          let item = {
            name: superNodeDetailMap[key],
            describe: this.superNodeDetail[key] === 0 ? 0 : (this.superNodeDetail[key] || "--")
          };
          switch(key) {
          case "nodeName":
            item.link = this.superNodeDetail.detailsUrl;
            break;
          case "blockRatio":
            item.describe = (this.superNodeDetail[key] * 100).toFixed(1) + "%";
            break;
          case "registerTime":
            item.describe = `${moment(this.superNodeDetail[key]).format("YYYY-MM-DD HH:mm:ss")}（${this.$t("superNodeDetail.registerCycle")} ${ this.superNodeDetail.registerCycle }）`|| "--";
            break;
          default: break;
          }
          list.push(item);
        }
        return list;
      },
      externalNodeList() {
        let superNodeDetailMap = this.$t("superNodeDetail.externalKey");
        let list = [];
        for(let key in superNodeDetailMap) {
          let item = {
            name: superNodeDetailMap[key],
            describe: this.superNodeDetail[key] || "--"
          };
          switch(key) {
          case "totalBlockAward":
          case "totalVoteAward":
          case "totalAward":
          case "unSettledAward":
            item.describe = this.superNodeDetail[key] ? handleBigNum((+this.superNodeDetail[key]).toFixed(4)) + " VITE" : null;
            break;
          default: break;
          }
          list.push(item);
        }
        return list;
      }
    },
    methods: {
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
