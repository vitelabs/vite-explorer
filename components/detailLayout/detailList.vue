<template>
  <div class="deatail-list-container">
    <div class="row" v-for="(item, index) in list" :key="index">
      <span class="name">{{item.name}}</span>
      <a v-if="item.link && item.describe" class="describe-link" :href="item.link">{{item.describe}}</a>
      <span v-if="!item.link && item.describe" class="describe">{{item.describe}}</span>
      <div v-if="item.list" class="lab-list">
          <span v-for="(lab, index) in item.list" :key="index"
            @click="clickLab(lab, index)" class="lab">{{lab}}</span>
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
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .deatail-list-container {
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
      }
    }
  }
</style>