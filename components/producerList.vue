<template>
  <page-table
      :loading="loading"
      :tableTitles="producerTitles"
      :tableData="showProducerList"
      :pagination="false">
  </page-table>
</template>
<script>
  import pageTable from "~/components/pageTable";
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
        producerTitles:this.$t("SBPProducerList.titles"),
      };
    },
    mounted() {
    },
    computed: {
      showProducerList() {
        let list = [];
        this.list.forEach((producer)=>{
          let lang = "";
          this.$i18n.locale !== "en" ? lang = `/${this.$i18n.locale}` : lang = "";
          // let timestamp = moment(block.age * 1000).fromNow();
          list.push({
            ...producer,
            producerAddress: `<a href="${lang}/account/${producer.producerAddress}?showBlockList=true" target="_blank">${producer.producerAddress}</a>`
          });
        });
        return list;
      }
    },
    methods: {
      cycleToDate(cycle) {
        if (cycle === 0) {
          return "2018-11-08 12:13:14 -- 2018-11-08 12:13:14";
        }
        let date = moment((cycle * 1152 * 75 + 1541650394 - 60 * 60 * 24) * 1000).format("YYYY-MM-DD");
        let endDate = moment((cycle * 1152 * 75 + 1541650394 ) * 1000).format("YYYY-MM-DD");
        return  date + " 12:13:14" + " -- " + endDate +" 12:13:13";
      },
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>