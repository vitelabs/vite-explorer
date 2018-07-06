<template>
  <footer @click="hideWxCode" class="footer">
    © 2018 VITE Labs
    <a href="https://www.vite.org/">Vite {{$t('footer.official')}}</a>
    <a class="img-wrapper" href="https://github.com/vitelabs">
      <img src="~assets/images/github.png"/>
    </a>
    <a class="img-wrapper" href="https://discordapp.com/invite/CsVY76q">
      <img src="~assets/images/discordapp.png"/>
    </a>
    <a class="img-wrapper" href="https://twitter.com/vitelabs">
      <img src="~assets/images/twitter.png"/>
    </a>
    <a class="img-wrapper" href="https://t.me/vite_zh">
      <img src="~assets/images/tme.png"/>
    </a>
    <a class="img-wrapper" href="https://www.reddit.com/r/vitelabs">
      <img src="~assets/images/reddit.png"/>
    </a>
    <img @click="showWxCode" ref="wx" src="~assets/images/wx.png"/>
    <img class="wx-code" v-show="showCode" src="~assets/images/wxCode.png"/>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        showCode: false
      };
    },
    methods: {
      showWxCode() {
        this.showCode = true;
      },
      hideWxCode(e) {
        if (e.target === this.$refs.wx) {
          return;
        }
        this.showCode = false;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .footer {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 9999;
    padding: 20px;
    background: #fff;
    border-top: solid #c7c7c7 1px;
    color: #666;
    text-align: center;
    font-size: 16px;
    a {
      text-decoration: none;
      color: #666;
    }
    img {
      margin-bottom: -10px;
      margin-left: 20px;
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .wx-code {
      width: 200px;
      height: 200px;
    }
  }
</style>
