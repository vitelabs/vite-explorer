<template>
  <div class="detail-layout-container">
    <page-header :title="title"></page-header>
    <detail-list 
      :list="list" 
      :clickLab="clickLab" 
      :is-token="isToken" 
      :extral-list="extralList" 
      :is-account="isAccount"
      @changeTab="changeTab">
      <template slot="header">
        <slot name="header-content"></slot>
      </template>
      <template slot="externalSpecial">
        <slot name="external-item"></slot>
      </template>
      <template slot="footer">
        <slot name="footer-tab-content"></slot>
      </template>
    </detail-list>
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
      },
      isToken: {
        type: Boolean,
        default: false
      },
      extralList: {
        type: Array,
        default: ()=>[]
      },
      isAccount: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      changeTab(tabName) {
        this.$emit("changeTab", tabName);
      },
    }
  };
</script>