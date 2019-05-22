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
            address: `<a href="${lang}/account/${producer.address}?showBlockList=true" target="_blank">${producer.address}</a>`
          });
        });
        return list;
      }
    },
    methods: {
      cycleToDate(cycle) {
        if (cycle === 0) {
          return "2019-05-15 12:00:00 -- 2019-05-15 12:00:00";
        }
        let date = moment((cycle * 1152 * 75 + 1558411200 - 60 * 60 * 24) * 1000).format("YYYY-MM-DD");
        let endDate = moment((cycle * 1152 * 75 + 1558411200 ) * 1000).format("YYYY-MM-DD");
        return  date + " 12:00:00" + " -- " + endDate +" 11:59:59";
      },
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>