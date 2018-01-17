<template>
<div class="container build edit-container">
    <div class="wrap product">
        <div class="content">
            <!--小铺照片-->
              <div class="weui-cells weui-cells_form">
               <div class="weui-gallery" @click="hideMask" id="gallery" :style="{display:ifMaskDisplay, opacity: 1}">
                    <span class="weui-gallery__img" id="galleryImg" :style="{'background-image':'url('+shopInfo.logoList[currentLogoIndex]+')'}"></span>
                    <div class="weui-gallery__opr">
                        <a href="javascript:" class="weui-gallery__del">
                            <i class="weui-icon-delete weui-icon_gallery-delete" @click="deleteLogo"></i>
                        </a>
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <div class="weui-uploader">
                            <div class="weui-uploader__hd">
                                <p class="weui-uploader__title">小铺照片</p>
                                <div class="weui-uploader__info">{{shopInfo.logoList.length}}/{{maxPic}}</div>
                            </div>
                            <div class="weui-uploader__bd">
                                <ul class="weui-uploader__files" id="uploaderFiles">
                                    <li class="weui-uploader__file" @click="showMask(index)" v-for="logo,index in shopInfo.logoList" :style="{'background-image':'url('+logo+')'}"></li>
                                </ul>
                                <div class="weui-uploader__input-box" v-if="shopInfo.logoList.length < maxPic">
                                    <input id="uploaderInput" @change="uploadFileChange" class="weui-uploader__input" type="file" accept="image/*" multiple="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="weui-cells">
                <!--小铺名称-->
                <router-link class="weui-cell weui-cell_access" href="javascript:;" :to="{path:'EditProductItem/name/'+(shopInfo.name||'$')}">
                    <div class="weui-cell__bd">
                        <p>小铺名称</p>
                    </div>
                    <div class="weui-cell__ft">
                        {{shopInfo.name||'去填写'}}
                    </div>
                </router-link>
                <router-link class="weui-cell weui-cell_access"  :to="{path:'EditProductItem/desc/'+(shopInfo.desc||'$')}" href="javascript:;">
                    <div class="weui-cell__bd">
                        <p>小铺介绍</p>
                    </div>
                    <div class="weui-cell__ft">
                      {{shopInfo.desc||'去填写'}}
                    </div>
                </router-link>
                <router-link  class="weui-cell weui-cell_access" to="ShopQrcode" href="javascript:;">
                    <div class="weui-cell__bd">
                        <p>小铺二维码</p>
                    </div>
                    <div class="weui-cell__ft" id="qrcode-wrap">
                      <img src="../assets/res/img/qrcode.png" alt="">
                    </div>
                </router-link>
            </div>
            <div class="weui-cells">
                <!--小铺名称-->
                <router-link class="weui-cell weui-cell_access"  :to="{path:'EditProductItem/addr/'+(shopInfo.addr||'$')}" href="javascript:;">
                    <div class="weui-cell__bd">
                        <p>小铺地址</p>
                    </div>
                    <div class="weui-cell__ft">
                        {{shopInfo.addr||'去填写'}}
                    </div>
                </router-link>
                <router-link  :to="{path:'EditProductItem/mobile/'+(shopInfo.mobile||'$')}" class="weui-cell weui-cell_access" href="javascript:;">
                    <div class="weui-cell__bd">
                        <p>联系电话</p>
                    </div>
                    <div class="weui-cell__ft">
                        {{shopInfo.mobile||'去填写'}}
                    </div>
                </router-link>
            </div>
       
<!--             <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:;">
                    <div class="weui-cell__bd">
                        <p>管理员头像</p>
                    </div>
                    <div class="weui-cell__ft">
                        <img src="../assets/pic/headicon.png" />
                    </div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;">
                    <div class="weui-cell__bd">
                        <p>管理员昵称</p>
                    </div>
                    <div class="weui-cell__ft">
                        桔子
                    </div>
                </a>
            </div> -->
<!--             <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="saveShopInfo" id="showTooltips">保存</a>
            </div> -->
        </div>
    </div>
</div>
</template>

<script>
  import util from '../assets/js/util.js'
  // import QR from '../assets/js/qrcode.min.js'
    export default {
      name: 'EditProduct',
      data() {
          return {
            url: util.api.host + util.api.shopInfo,
            fileApi: util.api.host + util.api.fileApi,
            updateUrl: util.api.host + util.api.shopUpdate,
            shopInfo: {
              shopid: '',
              logo: '',
              logoList: [],
              name: '',
              mobile: '',
              address: ' ',
              desc: '',
              mobile: ''
            },
            maxPic: 3,
            ifMaskDisplay: 'none',
            currentLogoIndex: -1
          }
      },
      computed: {
        // qrcode() {
        //   var div = document.createElement('div');
        //   var qr = new QRCode(div, {
        //       text: document.URL,
        //       width: 36,
        //       height: 36,
        //       colorDark : "#000000",
        //       colorLight : "#ffffff",
        //       correctLevel : QRCode.CorrectLevel.H
        //   });
        //   console.log(div)
        //   return div;
        // },
      },
      mounted: function() {
          // document.getElementById('qrcode-wrap').append(this.qrcode);
      },
      activated() {
        document.title = '小铺信息';
        // var params = this.$route.params;
        // console.log(params)
        // if(params.key) {
        //   this.shopInfo[params.key] = params.value;
        //   console.log(params.key, params.value, this.shopInfo[params.key])
        // }
        this.getShopInfo();
      },
      methods: {
        // queryShopQrcode() {
        //   this.$router.push({
        //     name: 'ShopQrcode',
        //     params: {
        //       shopid: this.shopInfo.shopid
        //     }
        //   })
        // },
        getShopInfo() {
          var postData = {
            openid: window.info.openid,
            token: window.info.token,
          };

          this.$http.post(this.url, postData)
          .then((res)=>{
            var data = res.body;
            console.log(data)
            if(data.code == 0) {
              this.shopInfo = {
                logo: data.logo,
                logoList: data.logo.split('|')||[],
                name: data.name,
                mobile: data.mobile,
                addr: data.addr,
                shopid: data.shopid,
                desc: data.desc || data.des || ''
              }

              console.log(this.shopInfo);
              // this.shopQrcode = this.qrcode;
              console.log(this.qrcode)
              // document.getElementById('qrcode-wrap').append(this.qrcode);

            } else {
              // alert(data.msg);
            }
          });
        },
        hideMask() {
          this.ifMaskDisplay = 'none';
        },
        showMask(index) {
          this.currentLogoIndex = index;
          this.ifMaskDisplay = 'block';
        },
        deleteLogo() {
          this.shopInfo.logoList.splice(this.currentLogoIndex, 1);
        },
        uploadFileChange(e) {
          var files = e.target.files;
          for (var i = 0, f; f = files[i]; i++) {
            this.uploadFile(f);
          }
        },
        uploadFile(file) {
          var formData = new FormData();
          formData.append('thumbnail', file);

          this.$http.post(this.fileApi, formData)
          .then((response) => {
            var data = response.body;
            if(data.code == 0) {
              this.shopInfo.logoList.push(data.url);
              this.saveShopInfo();
            } else {
              alert(data.msg);
            }
          }, (response) => {
            console.log('Error occurred...');
          });
        },
        saveShopInfo() {
          var postData = {
            openid: window.info.openid,
            token: window.info.token,
            mobile: this.shopInfo.mobile,
            shopid: window.info.shopid,
            name: this.shopInfo.name,
            logo: this.shopInfo.logoList.join('|'),
          };

          this.$http.post(this.updateUrl, postData)
          .then((res)=>{
            var data = res.body;
            if(data.code == 0) {
              // alert('保存店铺信息成功');
              // this.$router.push('ShopIndex');
            } else {
              alert(data.msg);
            }
          });
        }
      }
    }
</script>

<style lang="less" scoped>
    @import '../assets/less/tob-build.less';
    .container {
      background-color: #f5f5f5;
    }
</style>
