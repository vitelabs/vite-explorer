<template>
  <div>
    <div class="vite-profile">
      <div class="top">
        <div class="title">{{ $t('profile.market') }}</div>
        <div class="market">
          <div v-if="generalMarket && generalMarket.ffmCap">
            $
            <span>{{ generalMarket.ffmCap }}</span>
          </div>
          <div v-else>
            <span>{{ $t('utils.noData') }}</span>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="price">
          <div class="title">{{ $t('profile.price') }}</div>
          <div v-if="generalMarket && Number(generalMarket.cirPrice)">
            $
            <span>{{ Number(generalMarket.cirPrice).toFixed(4) }}</span>
          </div>
          <div v-else>
            <span class="noData">{{ $t('utils.noData') }}</span>
          </div>
        </div>
        <div class="height">
          <div class="title">{{ $t('profile.latestHeight') }}</div>
          <div v-if="generalDetail.chainHeight">
            <el-tooltip class="item" effect="dark" :content="$t('profile.blockTime') " placement="right-end">
              <div>
                <span class="height-value" :class="chainHeightAnimate ? 'animated fadeIn': ''">{{ generalDetail.chainHeight }}</span>
                <span>({{ generalDetail.avgTime }}s)</span>
              </div>
            </el-tooltip>
          </div>
          <div v-else>
            <span class="noData">{{ $t('utils.noData') }}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="tps common">
          <div class="title">{{ $t('profile.tps') }}</div>
          <div>
            <el-tooltip class="item" effect="dark" :content="$t('profile.tPerSec')" placement="bottom-start">
              <span class="bottom-span"><span :class="sysTpsAnimate ? 'animated fadeIn': ''">{{ generalDetail && generalDetail.sysTps || $t('utils.noData')}}</span></span>
            </el-tooltip>
          </div>
        </div>
        <div class="trans common ml40">
          <div class="title">{{ $t('profile.totalTrans') }}</div>
          <div>
            <el-tooltip class="item" effect="dark" :content="$t('profile.update3')" placement="bottom">
              <nuxt-link :to="localePath('transactionList')" target="_blank" class="profile-link">
                <span class="bottom-span"><span :class="txTotalTAmountAnimate ? 'animated fadeIn': ''">{{ generalDetail && generalDetail.txTotalTAmount || $t('utils.noData') }}</span></span>
              </nuxt-link>
            </el-tooltip>

          </div>
        </div>
        <div class="near-month common ml40">
          <div class="title">{{ $t('profile.nearMonth') }}</div>
          <div><span class="bottom-span">{{ generalDetail && generalDetail.txMonAmount || $t('utils.noData') }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      generalDetail: {
        type: Object,
        default: () => null
      },
      preGeneralDetail: {
        type: Object,
        default: () => null
      },
      generalMarket: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      chainHeightAnimate() {
        return this.preGeneralDetail && (this.generalDetail.chainHeight !== this.preGeneralDetail.chainHeight);
      },
      txTotalTAmountAnimate() {
        return this.preGeneralDetail && (this.generalDetail.txTotalTAmount !== this.preGeneralDetail.txTotalTAmount);
      },
      sysTpsAnimate() {
        return this.preGeneralDetail && (this.generalDetail.sysTps !== this.preGeneralDetail.sysTps);
      }
    },
    data() {
      return {
      };
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "assets/css/vars.scss";

  .vite-profile {
    padding: 25px 30px 33px 30px;
    .title {
      opacity: 0.7;
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 16px;
    }
    .top {
      .market {
        margin-top: 5px;
        span {
          font-size: 34px;
          line-height: 36px;
        }
      }
    }
    .middle {
      display: flex;
      display: -webkit-flex;
      margin-top: 24px;
      justify-content: space-between;
      .price {
        margin-top: 15px;
        span {
          display: inline-block;
          margin-top: 25px;
          font-size: 48px;
          line-height: 23px;
          &.noData {
            font-size: 34px;
          }
        }
      }
      .height {
        width: 222px;
        height: 99px;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.33);
        box-shadow: 4px 4px 12px 0 rgba(0,92,199,0.44);
        box-sizing: border-box;
        padding: 15px 0px 9px 15px;
        border-radius: 2px;
        span {
          letter-spacing: 0;
          font-size: 12px;
          &.height-value {
            font-size: 48px;
          }
          &.noData {
            font-size: 40px;
          }
        }
      }
    }
    .bottom {
      display: flex;
      display: -webkit-flex;
      margin-top: 28px;
      text-align: center;
      justify-content: space-between;
      .bottom-span {
        display: inline-block;
        margin-top: 10px;
        width: 100px;
        height: 22px;
        background: rgba(102,165,255,0.42);
        border-radius: 2px;
      }
      .profile-link {
        color: white;
      }
      .common {
        width: 100px;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 20px;
      }
      .ml40 {
        margin-left: 40px;
      }
    }
  }

  /** iPad **/
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    .vite-profile {
      padding: 25px 20px 21px 20px;
      .title {
        line-height: 14px;
      }
      .top {
        .market {
          span {
            font-size: 32px;
            line-height: 34px;
          }
        }
      }
      .middle {
        justify-content: space-between;
        .price {
          margin-top: 15px;
          span {
            display: inline-block;
            margin-top: 25px;
            font-size: 44px;
            line-height: 19px;
            &.noData {
              font-size: 34px;
            }
          }
        }
        .height {
          width: 152px;
          height: 116px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.33);
          box-shadow: 4px 4px 12px 0 rgba(0,92,199,0.44);
          box-sizing: border-box;
          padding: 15px 16px 9px 15px;
          span {
            font-size: 48px;
            letter-spacing: 0;
            &.noData {
              font-size: 40px;
            }
          }
        }

      }
      .bottom {
        .bottom-span {
          display: inline-block;
          margin-top: 10px;
          width: 72px;
          height: 22px;
          background: rgba(102,165,255,0.42);
          border-radius: 2px;
        }
        .title {
          width: 75px;
        }
        .common {
          width: 72px;
        }
        .ml40 {
          margin-left: 19px;
        }
      }
    }
  }

  /** iPhone **/
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    .vite-profile {
      padding: 25px 20px 21px 20px;
      .title {
        line-height: 14px;
      }
      .top {
        .market {
          span {
            font-size: 26px;
            line-height: 30px;
          }
        }
      }
      .middle {
        justify-content: space-between;
        .price {
          margin-top: 15px;
          span {
            display: inline-block;
            margin-top: 25px;
            font-size: 36px;
            line-height: 30px;
            &.noData {
              font-size: 34px;
            }
          }
        }
        .height {
          width: 137px;
          height: 116px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.33);
          box-shadow: 4px 4px 12px 0 rgba(0,92,199,0.44);
          box-sizing: border-box;
          padding: 15px 16px 9px 15px;
          span {
            font-size: 36px;
            letter-spacing: 0;
            &.noData {
              font-size: 36px;
            }
          }
        }

      }
      .bottom {
        .bottom-span {
          display: inline-block;
          margin-top: 10px;
          width: 72px;
          height: 22px;
          background: rgba(102,165,255,0.42);
          border-radius: 2px;
        }
        .title {
          width: 75px;
        }
        .common {
          width: 72px;
        }
        .ml40 {
          margin-left: 17px;
        }
      }
    }
  }

</style>
