import Vue from 'vue'
import Router from 'vue-router'
import EditShop from '@/components/EditShop'
import EditProduct from '@/components/EditProduct'
import OrderList from '@/components/OrderList'
import CheckShop from '@/components/CheckShop'
import MobileBind from '@/components/MobileBind'
import CreateShopStep1 from '@/components/CreateShopStep1'
import CreateShopStep2 from '@/components/CreateShopStep2'
import ShopDecorate from '@/components/ShopDecorate'
import BuildProduct from '@/components/BuildProduct'
import ShopIndex from '@/components/ShopIndex'
import BuildIndex from '@/components/BuildIndex'
import EditProductItem from '@/components/EditProductItem'
import ShopQrcode from '@/components/ShopQrcode'
import AddBarberByQrcode from '@/components/AddBarberByQrcode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: CheckShop
    },
    {
      path: '/EditShop',
      name: 'EditShop',
      component: EditShop
    },
    {
      path: '/MobileBind',
      name: 'MobileBind',
      component: MobileBind
    },
    {
      path: '/EditProduct',
      name: 'EditProduct',
      component: EditProduct
    },
    {
      path: '/CreateShopStep1',
      name: 'CreateShopStep1',
      component: CreateShopStep1
    },
    {
      path: '/CreateShopStep2',
      name: 'CreateShopStep2',
      component: CreateShopStep2
    },
    {
      path: '/OrderList',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/ShopDecorate',
      name: 'ShopDecorate',
      component: ShopDecorate
    },
    {
      path: '/ShopIndex',
      name: 'ShopIndex',
      component: ShopIndex
    },
    {
      path: '/EditProductItem/:item/:value',
      name: 'EditProductItem',
      component: EditProductItem
    },
    {
      path: '/BuildIndex',
      name: 'BuildIndex',
      component: BuildIndex
    },
    {
      path: '/BuildProduct',
      name: 'BuildProduct',
      component: BuildProduct
    },
    {
      path: '/ShopQrcode',
      name: 'ShopQrcode',
      component: ShopQrcode
    },
    {
      path: '/AddBarberByQrcode',
      name: 'AddBarberByQrcode',
      component: AddBarberByQrcode
    },
    {
      path: '/CheckShop',
      name: 'CheckShop',
      component: CheckShop
    }
  ]
})
