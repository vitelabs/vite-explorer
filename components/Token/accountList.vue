<template>
  <page-table
    :showOrder="true"
    :title="$t('accList.title')"
    :tableTitles="$t('accTitles')"
    :tableData="[]"
    :total="0"
    :currentChange="accountPageChange">
    <!-- :total="accountNum" -->
  </page-table>
</template>

<script>
  import pageTable from "~/components/pageTable";

  export default {
    components: {
      pageTable
    },
    computed: {

    },
    data(){
      return {
      };
    },
    methods: {
      accountPageChange(currentInx) {
        console.log(currentInx);
      }
    }
  };
</script>

