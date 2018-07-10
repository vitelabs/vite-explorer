<template>
  <div class="detail-list-container">
    <div class="row" v-for="(item, index) in list" :key="index">
      <span class="name">{{item.name}}</span>
      <a v-if="item.link && !item.list" class="describe-link" :href="item.link">{{item.describe || '----'}}</a>
      <span v-if="!item.link && !item.list" class="describe">{{item.describe || '----'}}</span>
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
        default: []
      },
      clickLab: {
        type: Function,
        default: ()=>{}
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
  .detail-list-container {
    width: 100%;
    padding-top: 20px;
  }
  .row {
    width: 100%;
    height: 40px;
    line-height: 40px;
    .name {
      display: inline-block;
      color: #333;
      width: 10vw;
    }
    .describe-link {
      color: #337ab7;
    }
    .describe {
      color: #666;
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
