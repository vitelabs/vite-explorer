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
            <div class="tab-content" :class="{'is-active': tabParams === 'award'}"  @click="clickTab('award')">{{$t('SBPAwardList.label')}}</div>
            <div class="tab-content" 
              :class="{'is-active': tabParams === 'producer'}" 
              @click="clickTab('producer')">
              {{$t('SBPProducerList.label')}}
            </div>
          </div>
        </template>
      </detail-layout>

      <award-list v-if="tabParams === 'award'"
        :list="rewardList"
        :loading="loading">
      </award-list>
      <producer-list v-if="tabParams === 'producer'"
        :list="producerAddrList"
        :loading="false">
      </producer-list>
    </div>
    <error v-else :error="error"></error>
  </div>
</template>

<script>
  import detailLayout from "~/components/detailLayout";
  import downloadNodeDetail from "~/components/downloadNodeDetail";
  import error from "~/components/error";
  import awardList from "~/components/awardList.vue";
  import producerList from "~/components/producerList.vue";
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
      detailLayout, error, awardList, downloadNodeDetail, producerList
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
        let producerAddrList = await node.getProducerList({
          nodeName: params.nodeName
        });
        loading = false;
        let superNodeDetail = nodeDetails;
        return {
          superNodeDetail,
          rewardList,
          producerAddrList,
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
        let lang;
        this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
        for(let key in superNodeDetailMap) {
          let item = {
            name: superNodeDetailMap[key],
            describe: this.superNodeDetail[key] === 0 ? 0 : (this.superNodeDetail[key] || "--")
          };
          switch(key) {
          case "registerAddress":
          case "blockAddress":
            item.link = `${lang}/account/${this.superNodeDetail[key]}`;
            break;
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
          case "settledAward":
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
      clickTab(str) {
        this.tabParams = str;
      },
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
