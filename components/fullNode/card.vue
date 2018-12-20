<template>
  <div class="full-node-container">
    <div class="head">
      <div class="node-title">
        <el-popover trigger="hover" placement="top-start" :disabled="!info.popover">
          <no-ssr>
            <slot name="popoverContent"></slot>
          </no-ssr>
          <div slot="reference">
            <div class="title-content">
              <img :src="info.img" class="title-icon"/>
              {{ info.title }}
            </div>
          </div>
        </el-popover>
      </div>
      <div v-if="info.rightTitle" class="right-title">{{ info.rightTitle }}</div>
    </div>
    <div class="node-content" v-if="info.text">
      <div class="node-text" v-html="info.text"></div>
    </div>
    <slot name="nodeContent"></slot>
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
            title: "",
            rightTitle: "",
            popover: false
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
    padding: 24px 22px 19px 22px;
    .node-title {
      .title-content {
        .title-icon {
          vertical-align: top;
          margin-right: 3px; 
        }   
      } 
    }
    .right-title {
      margin-top: -5px;
      background: rgba(239,243,252,0.69);
      border-radius: 1px;
      font-size: 12px;
      padding: 3px 8px;
      color: #5E6875;
      letter-spacing: 0.3px;
      line-height: 24px;
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
