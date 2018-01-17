<template>
<div class="container guide">
    <div class="wrap step2">
        <div class="weui-cells__title">功能<small>（只能单选哦）</small>
        </div>
        <div class="weui-flex">
            <div class="weui-flex__item">
                <div class="panel-hd"><i class="weui-icon-success"></i><span>商品列表展示</span></div>
                <div class="panel-bd">
                    <img src="../assets/res/pic/1.png" />
                    <div class="tips">
                        <a href="javascript:;" @click="previewShop(1)">预览</a><a href="javascript:;" @click="useShop(1)"     :class="{current: styleSelected==1}">使用<i class="weui-icon-circle"></i></a>
                    </div>
                </div>
            </div>
            <div class="weui-flex__item">
                <div class="panel-hd"><i class="weui-icon-success"></i><span>商品列表展示</span></div>
                <div class="panel-bd">
                    <img src="../assets/res/pic/1.png" />
                    <div class="tips">
                        <a href="javascript:;" @click="previewShop(2)">预览</a><a href="javascript:;" @click="useShop(2)" :class="{current: styleSelected==2}">使用<i class="weui-icon-circle"></i> </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-flex">
            <div class="weui-flex__item">
                <div class="panel-hd"><i class="weui-icon-success"></i><span>预约排队</span></div>
                <div class="panel-bd">
                    <img src="../assets/res/pic/1.png" />
                    <div class="tips">
                        <a href="javascript:;" @click="previewShop(3)">预览</a><a href="javascript:;" @click="useShop(3)" :class="{current: styleSelected==3}">使用<i class="weui-icon-circle"></i></a>
                    </div>
                </div>
            </div>
            <div class="weui-flex__item">
                <div class="panel-hd"><i class="weui-icon-success"></i><span>会员积分卡</span></div>
                <div class="panel-bd">
                    <img src="../assets/res/pic/1.png" />
                    <div class="tips">
                        <a href="javascript:;" @click="previewShop(4)">预览</a><a href="javascript:;" @click="useShop(4)" :class="{current: styleSelected==4}">使用<i class="weui-icon-circle"></i> </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_plain-primary" href="javascript:" @click="goNext">下一步</a>
        </div>
    </div>

    <div v-if="preview" class="js_dialog" id="iosDialog1" style="opacity: 1;">
        <div class="weui-mask"></div>
        <div class="weui-dialog pro-view">
            <!--item1-->
            <div class="pro-view-item">
                <a href="javascript:;" @click="cancelPreview" class="cancel"><i class="weui-icon-cancel"></i></a>
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">商品列表展示</strong></div>
                <div class="weui-dialog__bd"><img src="../assets/res/pic/1.png" /></div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" :class="{current: styleSelected==previewSelected}" @click="useNow" class="">使用<i class="weui-icon-circle"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
      name: 'CreateShopStep2',
      data() {
          return {
            preview: false,
            styleSelected: 1,
            previewSelected: 1,
          }
      },
      activated() {
        document.title = '选择店铺功能';
      },
      methods: {
        previewShop(n) {
          this.previewSelected = n;
          this.preview = true;
        },
        useShop(n) {
          this.styleSelected = n;
        },
        useNow() {
          this.styleSelected = this.previewSelected;
        },
        cancelPreview(n) {
          this.preview = false;
        },
        goNext() {
          this.$router.push('ShopDecorate');
        }
      }
    }
</script>

<style lang="less" scoped>
  @import '../assets/less/tob-guide.less';
  .guide {
    background-color: #f97a4d;
    background: -webkit-gradient(#febf83, #f97a4d);
    background-image: linear-gradient(#febf83, #f97a4d);
    background-repeat: no-repeat;
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
  }
</style>
