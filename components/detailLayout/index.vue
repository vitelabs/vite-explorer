<template>
  <div class="detail-layout-container">
    <page-header :title="title"></page-header>
    <detail-list :list="list"></detail-list>
  </div>
</template>

<script>
  import pageHeader from "~/components/pageHeader.vue";
  import detailList from "./detailList.vue";

  export default {
    components: {
      pageHeader, detailList
    },
    props: {
      list: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ""
      }
    }
  };
</script>