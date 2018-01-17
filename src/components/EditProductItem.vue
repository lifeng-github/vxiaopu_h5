<template>
<div class="container build edit-container">
    <div class="wrap fenlei-wrap">
       <div class="content">
           <div class="weui-cells__title">{{itemName}}</div>
           <div class="weui-cells">
               <div class="weui-cell">
                   <div class="weui-cell__bd">
                       <input class="weui-input" v-model="itemValue" type="text" :placeholder="'请输入'+itemName">
                   </div>
               </div>
           </div>
           <div class="weui-btn-area">
               <a class="weui-btn weui-btn_primary" href="javascript:" @click="saveShopInfo">保存</a>
           </div>
       </div>
    </div>
</div>
</template>

<script>
  import util from '../assets/js/util.js'
    export default {
      name: 'EditProductItem',
      data() {
          return {
            shopInfoUrl: util.api.host + util.api.shopInfo,
            updateUrl: util.api.host + util.api.shopUpdate,
            fieldName: '',
            itemName: '',
            itemValue: '',
            shopInfo: {}
          }
      },
      mounted: function() {
        // document.title = '编辑商品';//by:yoyo
      },
      activated: function() {
        document.title = '店铺信息修改';//by:yoyo
        //重新拉取店铺信息
        this.getShopInfo();

        var name = this.$route.params.item,
            value = this.$route.params.value;

        var list = {
            name: {
                title: '店铺名称',
                value: value
            },
            desc: {
                title: '店铺描述',
                value: value
            },
            addr: {
                title: '店铺地址',
                value: value
            },
            mobile: {
                title: '联系电话',
                value: value
            },
        };
        this.fieldName = name; //字段名
        this.itemName = list[name].title || ''; //中文名
        this.itemValue = list[name].value.replace(/\$/g,''); //值
      },
      methods: {
        getShopInfo() {
          var postData = {
            openid: window.info.openid,
            token: window.info.token,
          };

          this.$http.post(this.shopInfoUrl, postData)
          .then((res)=>{
            var data = res.body;
            console.log(data)
            if(data.code == 0) {
              this.shopInfo = {
                logo: data.logo,
                logoList: data.logo.split('|')||[],
                name: data.name,
                mobile: data.mobile,
                addr: data.addr || '',
                desc: data.desc || data.des || ''
              }
            } else {
              alert(data.msg);
            }
          });
        },
        saveCategory() {
            this.$router.push({
                name: 'EditProduct',
                params: {
                    key: this.$route.params.item,
                    value: this.itemValue
                }
            });
        },
        saveShopInfo() {
          if(!this.itemValue) {
            alert('请输入'+this.itemName);
            return false;
          }
          var postData = {
            openid: window.info.openid,
            token: window.info.token,
            mobile: this.shopInfo.mobile,
            shopid: window.info.shopid,
            name: this.shopInfo.name,
            logo: this.shopInfo.logoList.join('|'),
            desc: this.shopInfo.desc,
            addr: this.shopInfo.addr
          };

          postData[this.fieldName] = this.itemValue;

          this.$http.post(this.updateUrl, postData)
          .then((res)=>{
            var data = res.body;
            if(data.code == 0) {
              alert('保存店铺信息成功');
              // this.$router.push('ShopIndex');
              this.$router.go(-1);
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
</style>
