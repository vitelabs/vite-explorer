<template>
    <el-popover
        placement="bottom"
        trigger="hover">
        <div class="demo-content">
            <div class="version">{{ $t('logo.v') + version }}</div>
            <div class="top-content">{{ $t('logo.content1') }}</div>
            <i18n path="logo.content2" tag="div" class="title">
                <span place="version">{{ version }}</span>
            </i18n>
            <div class="current-version">
              <span>{{ $t('logo.current') }}</span>
              <span>{{ $t('logo.v') + version }}</span>
            </div>
            <div class="go-vite">
              <span><a href="https://github.com/vitelabs/go-vite" target="_blank">{{ $t('logo.govite.current') }}</a></span>
              <span>{{ version }}</span>
            </div>
        </div>
        <nuxt-link :to="localePath('index')" slot="reference">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 66 34" style="enable-background:new 0 0 66 34;" xml:space="preserve">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="home" transform="translate(-140.000000, -15.000000)" fill="#3F3F3F">
                        <g id="header">
                            <g id="Page-1" transform="translate(140.000000, 15.000000)">
                                <polygon id="Fill-1" points="0 8.26842569 10.0518349 33.9059853 11.1644771 5.7596"></polygon>
                                <polygon id="Fill-2" points="13.7158183 5.27651927 10.4047174 33.9431982 36.0790844 -3.11926606e-05"></polygon>
                                <g id="Group-2" transform="translate(27.818182, 14.424242)">
                                    <polygon id="Fill-3" points="5.06661818 10.2992787 5.03573745 10.2992787 1.24738882 0.789260328 0.536196163 0.789260328 4.64926038 10.833609 5.43781084 10.833609 9.56615947 0.789260328 8.88584754 0.789260328"></polygon>
                                    <polygon id="Fill-4" points="13.4163319 10.8337025 14.0966439 10.8337025 14.0966439 0.789041979 13.4163319 0.789041979"></polygon>
                                    <polygon id="Fill-5" points="17.9468475 1.32393372 21.8278384 1.32393372 21.8278384 10.8336401 22.5081503 10.8336401 22.5081503 1.32393372 26.4047374 1.32393372 26.4047374 0.789291521 17.9468475 0.789291521"></polygon>
                                    <polygon id="Fill-6" points="30.2547228 0.789260328 30.2547228 10.833609 37.7540622 10.833609 37.7540622 10.2992787 30.9350347 10.2992787 30.9350347 5.88177409 37.274631 5.88177409 37.274631 5.34713189 30.9350347 5.34713189 30.9350347 1.32421446 37.6767044 1.32421446 37.6767044 0.789260328"></polygon>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </nuxt-link>
    </el-popover>
</template>
<script>
import general from "~/services/general.js";

export default {
  data() {
    return {
      version: ""
    };
  },
  created() {
    this.getGeneralDetail();
  },
  methods: {
    getGeneralDetail() {
      general.getGeneralDetail()
        .then(data=> {
          this.version = data.version;
        }).catch(err=> {
          console.log(err);
        });
    }
        
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";
  svg {
    width: 66px;
    height: 34px;
    margin-top: 15px;
  }
  .nuxt-link-active{
      display: inline-block;
      width: 66px;
      height: 64px;
    }
  .demo-content {
    width: 360px;
    box-sizing: border-box;
    padding: 10px;
    .version {
      color: $common-color;
      font-size: 18px;
    }
    .top-content {
      margin-top: 15px;
      margin-bottom: 8px;
    }
    .current-version {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        margin-top: 15px;
        box-sizing: border-box;
        padding: 5px 0;
        border-top: 2px solid $common-color;
    }
    .go-vite {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 5px 0;
        border-bottom: 2px solid $common-color;
    }
  }
</style>
