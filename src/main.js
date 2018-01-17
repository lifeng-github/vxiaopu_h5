// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

require('./assets/less/common.less')

window.info = {
  openid: '',
  token: '',
  shopid: '',
  mobile: ''
};


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.mixin({
  beforeMount: function () {
    document.getElementById('app').scrollTop = 0;
  },
  mounted() {
    var name = this.$route.matched[0].name;
    // if(!window.info.openid && location.hash.indexOf('CheckShop') != 2 && location.hash.indexOf('ShopIndex') != 2 && location.hash.indexOf('ToDevelop') != 2 && location.hash.indexOf('ShopDecorate') != 2  && location.hash.indexOf('OrderList') != 2 ) {
    //   // if(location.hash.indexOf('ShopIndex') != 2 && location.hash.indexOf('ShopDecorate') != 2 && location.hash.indexOf('BuildIndex') != 2) {

    //   // } else {
    //   //   router.push({
    //   //     name: 'CheckShop'
    //   //   });
    //   // }
    //     router.push({
    //       name: 'CheckShop',
    //       params: {
    //         from: name
    //       }
    //     });
    // }

  },
  activated: function() {
    var i = document.createElement('iframe');
    i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
      setTimeout(function(){
        i.remove();
      }, 9)
    }
    document.body.appendChild(i);

  }
})

const app = new Vue({
  router
}).$mount('#app')
