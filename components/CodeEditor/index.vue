<template>
  <div class="code-container">
    <div class="tab-wrapper">
      <div class="tab-content" 
        :class="{'is-active': tabParams === 'read'}" 
        @click="clickTab('read')">
        代码
      </div>
      <div class="tab-content" 
        :class="{'is-active': tabParams === 'write'}" 
        @click="clickTab('write')">
        上传代码
      </div>
    </div>
    <div class="read-code" v-if="tabParams === 'read'">
      <ace-card></ace-card>
      <common-card></common-card>
    </div>
    <div class="write-code" v-if="tabParams === 'write'">
      ???
    </div>
  </div>
</template>
<script>
import commonCard from "./commonCard.vue";

export default {
  components: {
    commonCard
  },
  data() {
    return {
      tabParams: "read"
    };
  },
  mounted() {
  },
  methods: {
    clickTab(str) {
      this.tabParams = str;
    },
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "assets/css/vars.scss";


</style>


