<template>
<div class="container build srceen-style2 yuyue-wrap">
    <div class="wrap product">
        <div class="content">
            <!--添加图片-->
            <div class="weui-cells weui-cells_form">
              <div class="weui-gallery" @click="hideMask" id="gallery" :style="{display:ifMaskDisplay, opacity: 1}">
                  <span class="weui-gallery__img" id="galleryImg" :style="{'background-image':'url('+logo+')'}"></span>
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
                                <p class="weui-uploader__title">添加理发师头像</p>
                                <div class="weui-uploader__info"><span>{{imgList.length}}</span>/{{maxPic}}</div>
                            </div>
                            <div class="weui-uploader__bd">
                                <ul class="weui-uploader__files" id="uploaderFiles">
                                    <li class="weui-uploader__file" v-for="item,index in imgList" :style="{'background-image':'url('+item+')'}" @click="showMask(index)"></li>
                                </ul>
                                <div class="weui-uploader__input-box" v-show="imgList.length<maxPic">
                                    <input id="uploaderInput" @change="uploadFileChange" class="weui-uploader__input" type="file" accept="image/*" multiple="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--称呼-->
            <div class="weui-cells__title">理发师称呼（建议使用英文）</div>
            <div class="weui-cells">
                <div class="weui-cell">
                    <div class="weui-cell__bd" style="display:relative;">
                        <input class="weui-input" v-model="name" :maxLength="maxNameLength" type="text" placeholder="请输入理发师称呼">
                        <span style="position:absolute;top: 0;right: 10px;line-height: 44px;;">{{name.length}}/{{maxNameLength}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="goBack" href="javascript:" id="save">保存</a>
            <a class="weui-btn weui-btn_default" @click="delBarber" href="javascript:" id="remove">删除</a>
        </div>
    </div>
</div>
</template>

<script>
import util from '../assets/js/util.js'
    export default {
      name: 'BuildProduct',
      data() {
          return {
            fileApi: util.api.host + util.api.fileApi,
            url: util.api.host + util.api.buildProduct,
            imgList: [],
            maxNameLength: 10,
            name: '',
            prodid: '',
            ifMaskDisplay: 'none',
            logo: '',
            maxPic: 1,
            status: 0,
            currentSelectLogoIndex: -1
          }
      },
      created: function() {

      },
      activated() {
        console.log(this.$route.params)
        document.title = '添加理发师信息';
        if(this.$route.params.prodinfo) {
          var prodinfo = this.$route.params.prodinfo;
          this.name = prodinfo.name;
          this.prodid = prodinfo.prodid;
          this.imgList = [].concat(prodinfo.image.split('|'));
          console.log(this.imgList)
          document.title = '编辑理发师信息';
        } else {
          this.clearData();
        }
      },
      methods: {
        hideMask() {
          this.ifMaskDisplay = 'none';
        },
        showMask(i) {
          this.logo = this.imgList[i];
          this.currentSelectLogoIndex = i;
          this.ifMaskDisplay = 'block';
        },
        deleteLogo() {
          if(this.currentSelectLogoIndex != -1) {
            this.imgList.splice(this.currentSelectLogoIndex, 1);
          }
        },
        delBarber() {
          let cm = window.confirm("您确定要删除该理发师信息吗？");
          if(cm == true) {
            this.status = 2;
            this.saveItem(()=>{
              this.clearData();
              this.$router.push('ShopDecorate');
            })
          }
        },
        goBack() {
          this.saveItem(()=>{
              alert('理发师信息保存成功');
              this.clearData();
              this.$router.push('ShopDecorate');
            })
        },
        clearData() {
          this.imgList = [];
          this.name = '';
          this.prodid = '';
          this.status = 0;
        },
        checkForm() {
          var flag = util.checkForm([
          {
            name: '理发师姓名',
            data: this.name
          },
          {
            name: '理发师头像',
            data: this.imgList.join('|')
          }
          ]);
          console.log(this.imgList,'abcd')
          return flag;
        },
        saveItem(cb) {
          if(!this.checkForm()) {
            return false;
          }
          var postData = {
            openid: window.info.openid,
            token: window.info.token,
            shopid: window.info.shopid,
            classid: 1,
            prodid: '',
            name: this.name,
            desc: '',
            price: '',
            image: this.imgList.join('|'),
            status: this.status
          };
          this.prodid && (postData.prodid = this.prodid);
          this.$http.post(this.url, postData)
          .then((res)=>{
            var data = res.body;
            console.log(data)
            if(data.code == 0) {
              cb && cb();
              // this.goBack();
            } else {
              alert(data.msg);
            }
          });
        },
        goNext() {
          this.saveItem(()=>{
              alert('理发师信息成功');
              this.clearData();
              this.$router.push('ShopDecorate');
            })
        },
        uploadFileChange(e) {
          console.log(arguments)
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
            console.log(data)
            if(data.code == 0) {
              this.imgList.push(data.url);
            } else {
              alert(data.msg);
            }
          }, (response) => {
            console.log('Error occurred...');
          });
        }
      }
    }
</script>

<style lang="less" scoped>
    @import '../assets/less/tob-build.less';
</style>
