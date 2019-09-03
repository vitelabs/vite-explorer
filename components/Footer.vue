<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="offical-website is-flex">
        <div class="website-link"><a href="https://www.vite.org/" target="_blank">Vite {{ $t('footer.official') }}</a></div>
        <div class="website-link ml"><a href="https://x.vite.net/" target="_blank">ViteX {{ $t('footer.vitex') }}</a></div>
      </div>
      <div class="outer-link">
        <a class="img-wrapper" href="https://github.com/vitelabs" target="_blank">
          <img src="~assets/images/github.svg"/>
        </a>
        <a class="img-wrapper" href="https://discordapp.com/invite/CsVY76q" target="_blank">
          <img src="~assets/images/dicord.svg"/>
        </a>
        <a class="img-wrapper" href="https://twitter.com/vitelabs" target="_blank">
          <img src="~assets/images/twitter.svg"/>
        </a>
        <a class="img-wrapper" :href="tMe" target="_blank">
          <img src="~assets/images/telegram.svg"/>
        </a>
        <a class="img-wrapper" href="https://www.reddit.com/r/vitelabs" target="_blank">
          <img src="~assets/images/reddit.svg"/>
        </a>
        <el-popover
          placement="top"
          trigger="click">
          <img src="~assets/images/wxCode.png" width="150" height="150"/>
          <img slot="reference" src="~assets/images/wecht.svg"/>
        </el-popover>
      </div>
      <div class="brand">©2019 Vite Labs</div>
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    computed: {
      tMe() {
        if (this.$i18n.locale === "en") {
          return "https://t.me/vite_en";
        } else {
          return "https://t.me/vite_zh";
        }
      }
    },
    methods: {
     
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .footer {
    width: 100%;
    background: #fff;
    text-align: center;
    font-size: 12px;
    color: #3F3F3F;
    .footer-content {
      width: 1160px;
      margin: auto;
      height: 76px;
      line-height: 76px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      .brand {
        opacity: 0.78;
        font-size: 14px;
        color: #8D9BAE;
        letter-spacing: 0;
      }
    }
    .ml {
      margin-left: 30px;
    }
    
    img {
      margin-left: 18px;
      display: inline-block;
      width: 36px;
      height: 36px;
      margin-top: 20px;
    }
    
  }
  /** iPad **/
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    .footer {
      .footer-content {
        box-sizing: border-box;
        padding: 0 20px;
        width: 768px;
      }
    }
  }
  /** iPhone **/
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    .footer {
      .footer-content {
        box-sizing: border-box;
        padding: 0 15px;
        width: 320px;
        height: 116px;
        position: relative;
        line-height: 20px;
      }
      .offical-website {
        position: absolute;
        left: 15px;
        bottom: 18.5px;
        flex-direction: column;
      }
      .ml {
        margin-left: 0;
        text-align: left;
      }
      .outer-link {
        width: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        box-sizing: border-box;
        margin-top: 20.4px; 
      }
      .img-wrapper {
        height: 36px;
      }
      .brand {
        position: absolute;
        right: 15px;
        bottom: 18.5px;
      }
      img {
        margin: 0;
      }
    }
  }
</style>
