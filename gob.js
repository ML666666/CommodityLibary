import axios from 'axios'
import qs from 'qs'
// 176.166.1.47
let gob = {
    getWebUrl:function(){
        if(window.location.href.indexOf("http://localhost")>-1){
            return "/api" 
        }
        if(window.location.href.indexOf("youhuiduo.cn")>-1){
            return "https://gate.youhuiduo.cn/sy_new_customer_2019/"
        }
        if(window.location.href.indexOf("ujinbi.com")>-1){
            return "https://gate.ujinbi.com/sy_new_customer_2019/"
        }
    },
    webUrl:function(){
        if(window.location.href.indexOf("http://localhost")>-1){
            return "http://192.168.18.54:11015/" 
        }
        if(window.location.href.indexOf("youhuiduo.cn")>-1){
            return "https://gate.youhuiduo.cn/sy_new_customer_2019/"
        }
        if(window.location.href.indexOf("ujinbi.com")>-1){
            return "https://gate.ujinbi.com/sy_new_customer_2019/"
        }
    },
    post:function(url,data){
       var _this  = this; 
       return new Promise(function(resolve, reject){
        axios.post(_this.getWebUrl()+url, 
            qs.stringify(data),
        )
        .then(function(res){
            resolve(res);
        })
       })
    },
    get:function(url,data){
       var _this  = this; 
       return new Promise(function(resolve, reject) {
        axios.get(_this.getWebUrl()+url, 
            {
                params:data
            }
        )
        .then(function(res){
            resolve(res);
        })
       })
    },
    getCookie: function(name) {
        var strcookie = document.cookie;//获取cookie字符串
        var arrcookie = strcookie.split("; ");//分割
        //遍历匹配
        for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
            return arr[1];
        }
        }
        return "";
    },
    setCookie: function(name,value){
        var exp = new Date();
        exp.setTime(exp.getTime() + 3600 * 60 * 24 *10);//过期时间6分钟
        // document.cookie = 'openid=' + openid + ";expires=" + exp.toGMTString();
        document.cookie = `${name}=${value};expires=${exp.toGMTString()}`
     },
}

export default gob