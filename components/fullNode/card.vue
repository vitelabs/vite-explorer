<template>
  <div class="full-node-container">
    <div class="head">
      <div class="node-title">
        <img :src="info.img" class="title-icon"/>
        {{ info.title }}
      </div>
    </div>
    <div class="node-content">
      <div class="node-text" v-if="info.text">{{ info.text }}</div>
    </div>
  </div>
</template>
<script>

  export default {
    components: {
    },
    props: {
      info: {
        type: Object,
        default: ()=> {
          return {
            img: "",
            title: ""
          };
        }
      }
    },
    data() {
      return {
        locales: this.$i18n.locale === "en" ? "" : this.$i18n.locale,
      };
    },
    methods: {
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";
.full-node-container {
  background: #fff;
  border: 1px solid #E5EDF3;
  box-shadow: 0 6px 36px 0 rgba(0,62,100,0.04);
  border-radius: 4px 4px 0px 0px;
  .head {
    font-size: 16px;
    color: #5E6875;
    letter-spacing: 0.3px;
    line-height: 24px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    border-bottom: 1px solid $border-color;
    .node-title {
      margin-left: 22px;
      margin-top: 24px; 
      margin-bottom: 21px; 
      .title-icon {
        vertical-align: top;
        margin-right: 3px; 
      }    
    }
  }
  .node-content {
    padding: 23px 0 26px 22px;
    .node-text {
      font-family: $family-title;
      font-size: 34px;
      color: #5E6875;
      letter-spacing: 0.73px;
    }
  }
}
</style>
