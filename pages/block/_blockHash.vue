<template>
  <div class="block-container">
    <detail-layout v-if="!error"
        :title="`${title}`"
        :list="list"
        :error="error"
        :is-account="true">
        <template slot="footer-tab-content">
          <div class="tab-wrapper">
            <div class="tab-content" :class="{'is-active': tabParams === 'tx'}">{{$t('transList.label')}}</div>
          </div>
        </template>
    </detail-layout>
    <trans-list v-if="tabParams === 'tx'"
        :pagination="false"
        :blockHash="blockHash">
      </trans-list>
    <error v-if="error" :error="error"></error>
  </div>
</template>

<script>
  import detailLayout from "~/components/detailLayout";
  import error from "~/components/error";
  import block from "~/services/block.js";
  import moment from "moment";
  import transList from "~/components/transList.vue";

  export default {
    components: {
      detailLayout, error, transList
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
        title: this.$t("block.title"),
        blockDetail: {},
        error: "",
        tabParams: "tx"
      };
    },
    computed: {
      blockHash() {
        return this.blockDetail.hash;
      },
      showBlockDetail() {
        moment.locale(this.$i18n.locale === "zh" ? "zh-cn" : this.$i18n.locale);
        let age = moment(this.blockDetail.age * 1000).fromNow();
        return {
          hash: this.blockDetail.hash || "",
          height: this.blockDetail.height || "",
          accountNum: this.blockDetail.accountNum || 0,
          transactionCount: this.blockDetail.transactionCount || 0,
          producer: this.blockDetail.producer || "",
          superNodeName: this.blockDetail.superNodeName || "",
          amount: this.blockDetail.amount ? `${this.blockDetail.amount} VITE` : "",
          age: age + "（" + moment(this.blockDetail.timestamp * 1000).format("YYYY-MM-DD HH:mm:ss") + "）"
        };
      },
      list() {
        const blockDetailMap = this.$t("blockDetailMap");
        let list = [];
        let lang;
        this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
        for (let key in blockDetailMap) {
          let item = {
            name: blockDetailMap[key],
            describe: this.showBlockDetail[key] || "--"
          };
          switch(key) {
          case "producer": 
            item.link = `${lang}/account/${this.showBlockDetail[key]}`;
            break;
          case "superNodeName":
            item.link = `${lang}/SBPDetail/${this.showBlockDetail[key]}`;
            break;
          default: break;
          }
          list.push(item);
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
