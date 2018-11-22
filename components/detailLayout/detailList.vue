<template>
  <div :class="classObj">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="row" v-for="(item, index) in list" :key="index">
      <span class="name">{{item.name}}<span v-if="item.name">：</span></span>
      <a v-if="item.link && !item.list" class="describe-link" :href="item.link" target="_blank">{{item.describe || '--'}}</a>
      <span class="value" v-if="!item.link && !item.list">
        <div v-if="item.key === 'address' && item.sbpType" class="address">
          {{ item.describe || '--' }}
          <span v-for="(icon, index) in item.iconList" :key="index">
            <el-tooltip class="item" effect="dark" content="Snapshot Block Producer" placement="top">
              <img :src="icon"/>
            </el-tooltip>
          </span>
        </div>
        <div v-else>{{ item.describe || '--' }}</div>
      </span>
      <div v-if="item.list && item.list.length" class="lab-list">
          <span v-for="(lab, index) in item.list" :key="index"
            @click="_clickLab(lab, index)" :class="{
                'lab': true,
                'lab-selected': index == currentLabInx
            }">{{lab}}</span>
      </div>
      <div v-if="item.list && !item.list.length" class="lab-list">--</div>
    </div>
    
    <div class="extral-wrapper" v-if="extralList.length">
      <div class="extral-row" v-for="(item, index) in extralList" :key="index">
        <span class="name">{{item.name}}：</span>
        <a v-if="item.innerLink" @click="changeTab">{{item.describe || '--'}}</a>
        <span v-else>{{item.describe || '--'}}</span>
      </div>
      <slot name="externalSpecial"></slot>
    </div>
    <slot name="footer"></slot>
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
    components: {
    },
    computed: {
      classObj() {
        return {
          "common-detail": this.isCommon,
          "token-detail": this.isToken,
          "account-detail": this.isAccount
        };
      }
    },
    created() {
      this.isCommon = !this.isAccount;
    },
    data() {
      return {
        currentLabInx: 0,
        isCommon: true
      };
    },
    methods: {
      changeTab() {
        this.$emit("changeTab", "block");
      },
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
    padding: 25px 0 0 0px;
    margin-top: 30px;
  }
  .token-detail {
    border: 1px solid $common-background;
    border-bottom: 2px solid $common-color;
  }
  .account-detail {
    width: 100%;
    border: 1px solid $common-background;
    border-top: 2px solid $common-color;
    border-radius: 2px; 
    background-image: url("~assets/images/detail_bg.svg");
    background-color: #fff; 
    box-sizing: border-box;
    padding: 32px 0 0 0px;
    border: 1px solid $common-background;
    border-bottom: 2px solid $common-color;
    margin-top: 30px;
  }
  .row {
    box-sizing: border-box;
    padding-left: 32px;
    width: 100%;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
    color: #8D9BAE;
    .name,
    .value {
      display: inline-block;
      vertical-align: top;
      box-sizing: border-box;
      width: 200px;
    }
    .name {
      color: #3F3F3F;
    }
    .address {
      margin-top: -5px;
      display: flex;
      align-items: center;
      img {
        margin-left: 10px;
        &:hover {
          cursor: pointer;
        } 
      }
    }
    .value {
      width: calc(100% - 200px);
    }
    .describe-link {
      color: $detail-color;
    }
    .lab-list {
      width: 492px;
      display: inline-block;
      font-size: 12px;
      line-height: 16px;
      .lab {
        &:last-child {
          margin-right: 0;
        }
        display: inline-block;
        box-sizing: border-box;
        width: 42px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        background: white;
        margin-right: 8px;
        margin-bottom: 8px;
        color: $common-color;
        border: 1px solid #E5EDF3;
        border-radius: 2px;
        &:hover {
          cursor: pointer;
        }
        &.lab-selected {
          border-radius: 2px;
          background: $common-color;
          border: none;
          color: white;
        }
      }
    }
  }
  .extral-wrapper {
    border-top: 1px solid  #E5EDF3; 
    box-sizing: border-box;
    padding-left: 32px;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
  }
  .extral-row {
    width: 48%;
    font-size: 14px;
    line-height: 22px;
    margin-top: 16px;
    color: #8D9BAE;
    .name {
      display: inline-block;
      width: 200px;
      color: #3F3F3F;
    }
    .describe-link {
      color: $detail-color;
    }
  }
  /** iPhone **/
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    .value {
      display: inline-block;
      vertical-align: middle;
      width: 90%!important;
      text-overflow:ellipsis;
      white-space: nowrap;
      overflow-x: hidden;
    }
    .row {
      margin-left: 15px;
      .lab-list {
        width: 100%;
      }
    }
    .extral-wrapper {
      padding-left: 15px;
      min-height: 256px;
    }
    .extral-row {
      width: 100%;
      font-size: 14px;
      line-height: 22px;
      margin-top: 16px;
      color: #8D9BAE;
      .name {
        display: inline-block;
        width: 200px;
        color: #3F3F3F;
      }
    }
    .describe-link {
      vertical-align: middle;
      display: inline-block;
      width: 200px;
      text-overflow:ellipsis;
      white-space: nowrap;
      overflow-x: hidden;
      color: $detail-color;
    }
  }
</style>
