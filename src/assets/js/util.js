var api = {
    host: 'https://www.wxpuu.com',
    mobile: '/api/shop/register',
    fileApi: '/api/upload',
    categoryList: '/api/shop/classquery',
    buildShop: '/api/shop/update',
    buildProduct: '/api/shop/dealprod',
    addCategory: '/api/shop/dealclass',
    itemsList: '/api/shop/prodlist',
    shopInfo: '/api/shop/query',
    shopUpdate: '/api/shop/update',
    queryShop: '/api/shop/query',
    queryOrder: '/api/shop/orderquery',
    notifyUser: '/api/sms/smssend',
    userInfo: '/api/mp/getuserinfo',
    dealOrder: '/api/shop/orderdeal',
    userInfo: '/api/mp/getuserinfo',
    getToken: '/api/mp/getAuthInfoByCode',
    getXcxToken: '/api/mp/getXCXAccessToken',
    getQrcode: '/api/mp/getXCXQRCode'
};

var validator = {
    email: function(str) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(str);
    },
    telephone: function(str) {
        var re = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
        return re.test(str);
    }
};

function checkForm(data) {
    var flag = data.every(function(item) {
        if (!item.data) {
            alert(item.name + '不能为空');
            return false;
        }
        if (validator[item.type]) {
            var tmpFlag = validator[item.type](item.data);
            if (!tmpFlag) {
                alert(item.name + '填写不符合规则');
            }
            return tmpFlag;
        }
        return true;
    });
    return flag;
}

function queryShop(self, callback) {
    console.log(self, "queryShop");
    var postData = {
      openid: window.info.openid,
      token: window.info.token
    };
    self.$http.post(api.host + api.queryShop, postData)
    .then((res) => {
      var data = res.body
      if (data.code === 0) {
        if (data.shopid) {
          window.info.shopid = data.shopid
          window.info.mobile = data.mobile
          callback && callback();
        } else {
          self.$router.push('MobileBind')
        }
      } else {
        // alert(data.msg);
      }
    })
}

function queryToken(self, cb) {
    console.log(self, "queryToken");
    self.$http.get(api.host + api.getToken, {
      params: {
        code: window.info.code
      }
    })
    .then((res) => {
        // console.log(11111111, 'res')
      var data = res.body;
      if (typeof data === 'string') {
        data = JSON.parse(data)
      }
      console.log(data, data.openid, data.access_token)
      window.info.openid = data.openid;
      window.info.token = data.access_token;

      cb && cb();
    })
}

function getUrlKey(name) {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1),
            strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1].replace(/\//g, ''));
        }
    }
    return theRequest;
}

function getToken(self, callback) {
    console.log(self, "getToken")
    if(!window.info.token) {
        var query = getUrlKey();
        if(query.openid) {
            console.log(query.openid);
            window.info.openid = query.openid;
            window.info.token = query.access_token;
            queryShop(self, callback);
        } else if(query.code) {
            window.info.code = query.code;
            queryToken(self, ()=> {
                queryShop(self, callback);
            })
        }
    } else {
        callback && callback();
    }
}

export default {
    api: api,
    checkForm: checkForm,
    getUrlKey: getUrlKey,
    getToken: getToken,
    queryToken: queryToken,
    queryShop: queryShop
}
