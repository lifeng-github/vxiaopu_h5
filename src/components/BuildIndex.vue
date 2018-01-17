<template>
  <div class="container build myshop yuyue-wrap">

      <div v-if="itemList.length===0" class="wrap">
<!--            <p class="notic">
               <i class="weui-icon-info-circle"></i>
               <span>小铺已生成，请添加商品信息</span>
           </p> -->
           <p class="notic" v-if="showTips">
              <i class="ico-notic"></i><span>小铺已生成，请添加理发师信息</span><a href="javascript:;" @click="hideTips" class="oper"><i class="iconfont-dasan-9"></i> </a>
          </p>
          <div class="content wrap" :style="{paddingTop: showTips?'100px':'50px'}">
              <router-link href="javascript:;" class="no-add" to="BuildProduct">
                <i class="ico-addprodcut"></i>
                <span>添加理发师</span>
              </router-link>
          </div>
      </div>

    <div v-else class="wrap">
        <div class="shop-wrap">
            <div class="shop-layer">
                <div class="weui-panel__bd"   :style="{paddingTop: showTips?'30px':0}">
                    <!--item-->
                    <div  class="weui-media-box weui-media-box_appmsg" v-for="item in itemList" v-if="item.status != 2">
                        <div class="weui-media-box__hd" style="padding-left: 0;">
                            <img class="weui-media-box__thumb" :src="(item.image.split('|'))[0]" alt="">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{item.name}}

                            </h4>

                            <div class="weui-media-box__info"><span><em class="statu statu-dis">休息中</em></span>

                                <a href="javascript:;" class="weui-btn weui-btn_primary">预约</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="notic" v-if="showTips">
            <i class="ico-notic"></i><span>当前页面为你客户看到的效果。</span><a href="javascript:;" @click="hideTips" class="oper"><i
                class="iconfont-dasan-9"></i> </a>
        </p>
    </div>

      <!--<footer>
          <div class="weui-tabbar">
              <router-link href="javascript:;" class="weui-tabbar__item weui-bar__item_on" to="ShopDecorate">
                  <i class="weui-tabbar__icon  iconfont-dasan-28"></i>
                  <p class="weui-tabbar__label">首页</p>
              </router-link>
              <router-link href="javascript:;" class="weui-tabbar__item" to="ShopIndex">
                <i class="weui-tabbar__icon iconfont iconfont-dasan-3"></i>
                <p class="weui-tabbar__label">管理中心</p>
              </router-link>
          </div>
      </footer>-->
  </div>
</template>

<script>
  import util from '../assets/js/util.js'
    export default {
      name: 'ShopDecorate',
      data() {
          return {
            categoryUrl: util.api.host + util.api.categoryList,
            itemsUrl: util.api.host + util.api.itemsList,
            itemList: [],
            categoryList: [],
            currentIndex: -1,
            showTips: true
          }
      },
       mounted: function() {
        // document.title = '小铺装修';//by:yoyo
      },
      activated: function() {
        document.title = '小铺预览';//by:yoyo
        this.getCategories(()=>{
          if(this.categoryList.length > 0) {
            this.getItemsInCategory(this.currentIndex);
            // this.getItemsInCategory(this.categoryList[this.currentIndex].classid);
          } else {
            this.getItemsInCategory(this.currentIndex);
          }
        });
      },
      computed: {
        categoryName(id) {
          if(this.currentIndex == -1) {
            return '';
          } else {
            return this.categoryList[this.currentIndex].name;
          }
        },
        categoryId() {
          if(this.currentIndex == -1) {
            return '';
          } else {
            return this.categoryList[this.currentIndex].classid;
          }
        }
      },
      methods: {
        hideTips() {
          this.showTips = false;
        },
        queryCategoryName(classid) {
          console.log(classid, this.categoryList)
          if(this.categoryName) {
            return this.categoryName;
          }
          for(var i = 0, len = this.categoryList.length; i < len; i++) {
            if(this.categoryList[i].classid === classid) {
              return this.categoryList[i].name;
            }
          }
          return '';
        },
        updateItemInfo(item) {
          this.$router.push({
            name: 'BuildProduct',
            params: {
              prodinfo: item,
              categoryName: this.queryCategoryName(item.classid)
            }
          })
        },
        getCategories(cb) {
          var postData = {
            openid: window.info.openid,
            token: window.info.token,
            shopid: window.info.shopid
          };

          this.$http.post(this.categoryUrl, postData)
          .then((res)=>{
            var data = res.body;
            if(data.code == 0) {
              console.log(data.classlist, 'class list received~!')
              this.categoryList = data.classlist;
              cb && cb();
            } else {
              // alert(data.msg);
            }
          });
        },
        updateItemInCategory(index) {
          this.currentIndex = index;
          this.getItemsInCategory(index);
        },
        updageCategoryName(catId, name) {
          this.$router.push({
            name: 'BuildProductCategoryAdd',
            params: {
              id: catId,
              name: name
            }
          })
        },
        getItemsInCategory(cat) {
          var postData = {
            openid: window.info.openid,
            token: window.info.token,
            shopid: window.info.shopid,
          };
          if(cat != -1) {
            postData.classid = this.categoryList[cat].classid;
          }
          this.$http.post(this.itemsUrl, postData)
          .then((res)=>{
            var data = res.body;
            console.log(data)
            if(data.code == 0) {
              this.itemList = data.prodlist;
              console.log(this.itemList)
            } else {
              // alert(data.msg);
            }
          });
        }
      }
    }
</script>

<style lang="less" scoped>
    @import '../assets/less/common.less';
    @import '../assets/less/toc-index.less';
    @import '../assets/less/tob-build.less';
    @import '../assets/less/yuyue.less';

    .eps {
      overflow: hidden;
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .none {
      display: none;
    }
    .block {
      display: block;
    }
</style>
