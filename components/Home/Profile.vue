<template>
  <div>
    <div class="vite-profile">
      <div class="top">
        <div class="title">{{ $t('profile.market') }}</div>
        <div class="market"> 
          <div v-if="generalDetail && Number(generalDetail.ffmCap)">
            $
            <span>{{ Number(generalDetail.ffmCap) }}</span>
          </div>
          <div v-else>
            <span>{{ $t('utils.noData') }}</span>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="price">
          <div class="title">{{ $t('profile.price') }}</div>
          <div v-if="generalDetail && Number(generalDetail.cirPrice)">
            $
            <span>{{ Number(generalDetail.cirPrice) }}</span>
          </div>
          <div v-else>
            <span class="noData">{{ $t('utils.noData') }}</span>
          </div>
        </div>
        <div class="height">
          <div class="title">{{ $t('profile.latestHeight') }}</div>
          <div v-if="generalDetail && Number(generalDetail.chainHeight)">
            <span>{{ Number(generalDetail.chainHeight) }}</span>
          </div>
          <div v-else>
            <span class="noData">{{ $t('utils.noData') }}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="tps common">
          <div class="title">{{ $t('profile.tps') }}</div>
          <div><span>{{ generalDetail && Number(generalDetail.sysTps) || $t('utils.noData')}}</span></div>
        </div>
        <div class="trans common ml40">
          <div class="title">{{ $t('profile.totalTrans') }}</div>
          <div><span>{{ generalDetail && Number(generalDetail.txTotalTAmount) || $t('utils.noData') }}</span></div>
        </div>
        <div class="near-month common ml40">
          <div class="title">{{ $t('profile.nearMonth') }}</div>
          <div><span>{{ generalDetail && Number(generalDetail.txMonAmount) || $t('utils.noData') }}</span></div>
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
        default: {}
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
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 16px;
    }
    .top {
      .market {
        margin-top: 5px; 
        span {
          font-family: HelveticaNeue-Medium;
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
        padding: 15px 16px 9px 15px;
        span {
          font-family: HelveticaNeue-Medium;
          font-size: 48px;
          letter-spacing: 0;
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
      span {
        display: inline-block;
        margin-top: 10px;
        width: 82px;
        height: 22px;
        background: rgba(102,165,255,0.42);
        border-radius: 2px;
      } 
      .common {
        width: 82px;
        font-family: PingFangSC-Semibold;
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
        span {
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
        span {
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
