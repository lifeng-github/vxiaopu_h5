<template>
<div class="container tobshopcenter">
    <div class="wrap">
      <img :src="qrcode" alt="">
      <div class="weui-gallery" id="gallery" :style="{display:ifMaskDisplay, opacity: 1}">
            <img class="weui-gallery__img img" :src="qrcode" alt="">
      </div>
    </div>
    <footer>
        <p><img src="../assets/res/img/icon_footer_link.png"/></p>
    </footer>
</div>
</template>

<script>
    import util from '../assets/js/util.js'
    export default {
      name: 'ShopPayQrcode',
      data() {
          return {
            qrcode: 'http://about:blank',
            access_token: '',
            xcxTokenUrl: util.api.host + util.api.getXcxToken,
            getQrcodeUrl: util.api.host + util.api.getQrcode,
            ifMaskDisplay: 'block',
            vericode: "1234"
          }
      },
      activated: function() {
        document.title = '支付二维码';

        this.getToken(()=>{
          this.getQrcode();
        });
      },
      methods: {
        hideMask() {
          this.ifMaskDisplay = 'none';
        },
        showMask(index) {
          this.ifMaskDisplay = 'block';
        },
        getToken(cb) {
          var postData = {
          };

          this.$http.get(this.xcxTokenUrl, postData)
          .then((res)=>{
            var data = res.body;
            if(typeof data === 'string') {
              data = JSON.parse(data);
            }

            this.access_token = data.access_token;
            cb && cb();
          });
        },
        getQrcode() {
          var postData = {
            access_token: this.access_token,
            // shopid: window.info.shopid,
            // vericode: this.vericode,
            path: "pages/enterShop/enterShop?shopid="+window.info.shopid+"&vericode=" + this.vericode +"&pagetype=1"
          };

          console.log(postData, "postData");
          this.$http.get(this.getQrcodeUrl, {
            params: postData
          })
          .then((res)=>{
            var data = res.body;
            console.log(data,'xxx')
            if(data.code == 0) {
              this.qrcode = data.imgData;
            }

          });
        }
      }
    }
</script>

<style lang="less" scoped>
  .img {
    width: 90%;
    top: 50%;
    bottom: 0;
    transform: translateY(-50%);
    left: 5%;
  }
</style>
