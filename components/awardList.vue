<template>
  <page-table
      :loading="loading"
      :tableTitles="awardTitles"
      :tableData="showAwardList"
      :pagination="false">
  </page-table>
</template>
<script>
  import pageTable from "~/components/pageTable";
  import { handleBigNum } from "~/utils/util.js";
  import moment from "moment";

  export default {
    components: {
      pageTable
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        awardList: [],
        awardTitles:this.$t("SBPAwardList.titles"),
      };
    },
    mounted() {
    },
    computed: {
      showAwardList() {
        let list = [];
        this.list.forEach((award)=>{
          // let lang = "";
          // this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          // moment.locale(this.$i18n.locale === "zh" ? "zh-cn" : this.$i18n.locale);
          // let timestamp = moment(block.age * 1000).fromNow();
          list.push({
            ...award,
            cycle: this.cycleToDate(award.cycle),
            blockAward: this.handleAward(award.blockAward),
            voteAward: this.handleAward(award.voteAward),
            totalAward: this.handleAward(award.totalAward)
          });
        });
        return list;
      }
    },
    methods: {
      handleAward(num) {
        return num ? handleBigNum((+num).toFixed(4)) + " VITE" : null;
      },
      cycleToDate(cycle) {
        let T = moment((cycle * 1152 * 75 + 1557892800 ) * 1000).format();
        if (cycle === 0) {
          return `${T} -- ${T}`;
        }
        let date = moment((cycle * 1152 * 75 + 1557892800 ) * 1000).format();
        let endDate = moment((cycle * 1152 * 75 + 1557892799 + 60 * 60 * 24) * 1000).format();
        return  `${date} -- ${endDate}`;
      },
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>