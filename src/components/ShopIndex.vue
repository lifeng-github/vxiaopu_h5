<template>
<div class="container tobshopcenter">
    <div class="wrap">
        <!--今日数据-->
        <div class="today-data">
            <div class="weui-navbar">
                <div v-for="item,index in dataTab" class="weui-navbar__item " :class="{'weui-bar__item_on':currentTab===index}">
                    <a href="javascript:;" @click="toggleDataView(index)">{{item.name}}</a>
                </div>
            </div>

            <div class="weui-grids" @click="queryOrderList">
                <a href="javascript:;" class="weui-grid">
                    <div class="data-cont">
                        {{orderCount}}
                    </div>
                    <div class="data-hint">
                        <div class="weui-grid__icon">
                            <img src="../assets/res/img/icon-dingdan.png" alt="">
                        </div>
                        <p class="weui-grid__label">订单</p></div>
                    <div class="clear"></div>

                </a>
                <div class="clear"></div>
                <div class="grids-tips " v-if="orderCount > dealcount" @click="queryOrderList">
                    <div class="grids-tips-cont">
                        <p><i class="weui-icon-info-circle"></i> 你有{{orderCount - dealcount}}条未处理的订单信息，请查看</p>
                    </div>
                </div>
            </div>
        </div>
        <!--店铺信息-->
        <div class="xiaopu-container">
            <div class="weui-cells">
                <router-link to="EditProduct" class="weui-cell weui-cell_access" href="javascript:;">
                    <div class="weui-cell__hd"><img :src="shopInfo.logo" alt=""></div>
                    <div class="weui-cell__bd">
                        <h3>{{shopInfo.name}}</h3>
                        <p>{{shopInfo.mobile}}</p>
                    </div>
                    <div class="weui-cell__ft" id="qrcode-wrap">
                      <img src="../assets/res/img/qrcode.png" alt="">
                    </div>
                </router-link>
            </div>
            <div class="weui-grids">
                <router-link to="ShopDecorate" href="javascript:;" class="weui-grid">
                    <i class="iconfont-dasan-23"></i>
                    <p class="weui-grid__label">小铺装修</p>
                </router-link>
                <router-link to="BuildIndex" href="javascript:;" class="weui-grid">
                    <i class="iconfont-dasan-27"></i>
                    <p class="weui-grid__label">小铺预览</p>
                </router-link>
   <!--              <a href="javascript:;" class="weui-grid">
                    <i class="iconfont-dasan-24"></i>
                    <p class="weui-grid__label">意见反馈</p>
                </a> -->
            </div>
        </div>
    </div>
    <footer>
        <p><img src="../assets/res/img/icon_footer_link.png"/></p>
    </footer>
</div>

</template>

<script>
  import util from '../assets/js/util.js'
  // import QR from '../assets/js/qrcode.min.js'
    export default {
      name: 'ShopIndex',
      data() {
          return {
            url: util.api.host + util.api.shopInfo,
            queryOrder: util.api.host + util.api.queryOrder,
            dataTab: [
            {
              name: '今日数据'
            },
            {
              name: '历史数据'
            }],
            currentTab: 0,
            shopInfo: {},
            orderCount: 0,
            dealcount: 0,
            nodealcount: 0,
            orderList: [],
            pageno: '',
            pagesize: ''
          }
      },
      computed: {
        // qrcode() {
        //   var div = document.createElement('div');
        //   var qr = new QRCode(div, {
        //       text: "http://jindo.dev.naver.com/collie",
        //       width: 36,
        //       height: 36,
        //       colorDark : "#000000",
        //       colorLight : "#ffffff",
        //       correctLevel : QRCode.CorrectLevel.H
        //   });
        //   return div;
        // }
      },
      mounted: function() {
        // document.title = '我的小铺';
      },
      activated() {
        document.title = '我的小铺';
        util.getToken(this, ()=>{
          this.queryShopInfo();
          this.queryShopOrders();          
        });
      },
      methods: {
        toggleDataView(index) {
          this.currentTab = index;
        },
        queryShopOrders() {
          var postData = {
            openid: window.info.openid,
            token: window.info.token,
            shopid: window.info.shopid,
            pageno: this.pageno,
            pagesize: this.pagesize,
            // date: '20170415'
          };

          this.$http.post(this.queryOrder, postData)
          .then((res)=>{
            var data = res.body;
            console.log(data)
            if(data.code == 0) {
              this.orderList = data.orderList;
              this.orderCount = data.count;
              this.nodealcount = data.nodealcount;
              this.dealcount = data.dealcount;
            } else {
              // alert(data.msg);
            }
          });
        },
        queryShopInfo() {
          var postData = {
            openid: window.info.openid,
            token: window.info.token,
          };

          this.$http.post(this.url, postData)
          .then((res)=>{
            var data = res.body;
            console.log(data,123)
            if(data.code == 0) {
              this.shopInfo = {
                logo: (data.logo||'').split('|')[0],
                name: data.name,
                mobile: data.mobile
              }
              console.log(this.shopInfo);
              // this.shopQrcode = this.qrcode;
              // document.getElementById('qrcode-wrap').append(this.qrcode);
            } else {
              // alert(data.msg);
            }
          });
        },
        queryOrderList() {
          console.log(this.orderList)
          this.$router.push({
            name: 'OrderList',
            params: {
              orderList: this.orderList
            }
          });
        }
      }
    }
</script>

<style lang="less" scoped>
    @import '../assets/less/tob-index.less';

    #qrcode-wrap img {
      width: 50px;
      height: 50px;
    }

    .weui-grid {
      width: 50%;
    }
</style>
