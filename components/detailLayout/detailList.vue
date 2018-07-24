<template>
  <div :class="classObj">
    <div class="row" v-for="(item, index) in list" :key="index">
      <span class="name">{{item.name}}：</span>
      <a v-if="item.link && !item.list" class="describe-link" :href="item.link" target="_blank">{{item.describe || '--'}}</a>
      <span v-if="!item.link && !item.list">{{item.describe || '--'}}</span>
      <div v-if="item.list" class="lab-list">
          <span v-for="(lab, index) in item.list" :key="index"
            @click="_clickLab(lab, index)" :class="{
                'lab': true,
                'lab-selected': index == currentLabInx
            }">{{lab}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: ()=>[]
      },
      clickLab: {
        type: Function,
        default: ()=>{}
      },
      isToken: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classObj() {
        return {
          "common-detail": true,
          "token-detail": this.isToken
        };
      }
    },
    data() {
      return {
        currentLabInx: 0
      };
    },
    methods: {
      _clickLab(lab, index) {
        this.currentLabInx = index;
        this.clickLab(lab, index);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

@import "assets/css/vars.scss";
  .common-detail {
    width: 100%;
    border: 1px solid $common-background;
    border-top: 2px solid $common-color;
    border-radius: 2px; 
    background-image: url("~assets/images/detail_bg.svg");
    background-color: #fff; 
    box-sizing: border-box;
    height: 535px;
    padding: 32px 0 0 32px;
  }
  .token-detail {
    border: 1px solid $common-background;
    border-bottom: 2px solid $common-color;
    height: 352px;
  }
  .row {
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
    color: #8D9BAE;
    .name {
      display: inline-block;
      width: 200px;
      color: #3F3F3F;
    }
    .describe-link {
      color: $detail-color;
    }
    .lab-list {
      display: inline-block;
      .lab {
        &:first-child {
          margin-left: 0;
        }
        padding: 10px;
        background: #efefef;
        color: #666;
        margin-left: 20px;
        &.lab-selected {
            background: #afafaf;
            color: #333;
        }
      }
    }
  }
</style>
