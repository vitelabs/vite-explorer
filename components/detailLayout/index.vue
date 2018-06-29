<template>
  <div class="detail-layout-container">
    <page-header :title="title"></page-header>
    <detail-list :list="list" :clickLab="clickLab"></detail-list>
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
      title: {
        type: String,
        default: ""
      },
      list: {
        type: Array,
        default: []
      },
      clickLab: {
        type: Function,
        default: ()=>{}
      }
    }
  };
</script>