import axios from 'axios'
import qs from 'qs'
let gob = {
    getWebUrl:function(){
        if(window.location.href.indexOf("http://localhost")>-1){
            return "" 
        }
        if(window.location.href.indexOf("youhuiduo.cn")>-1){
            return "https://gate.youhuiduo.cn/usys/commodity_libray"
        }
        if(window.location.href.indexOf("ujinbi.com")>-1){
            return "https://gate.ujinbi.com/usys/commodity_libray"
        }
    },
    webUrl:function(){
        if(window.location.href.indexOf("localhost:")>-1){
            return ""
        }else{
            return "https://gate.ujinbi.com/cd/management/"
        }
    },
    post:function(url,data){
       var _this  = this;
       return new Promise(function(resolve, reject){
        axios.post(_this.getWebUrl()+url, 
            qs.stringify(data),
            {
                headers: {
                    'ujinbi-token':JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')).token:null,
                }
            }
        )
        .then(function(res){
            if(res.data.code == 40000){
                window.location.href = window.location.href.includes('ujinbi.com')?
                'https://web.ujinbi.com/admin/#/login':
                'https://web.youhuiduo.cn/admin/#/login'
                return  
            }
            resolve(res);
        })
       })
    },
    get:function(url,data){
       var _this  = this; 
       return new Promise(function(resolve, reject) {
        axios.get(_this.getWebUrl()+url, 
            {
                headers: {
                    'ujinbi-token':JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')).token:null,
                },
                params:data
            }
        )
        .then(function(res){
            if(res.data.code == 40000){
                window.location.href = window.location.href.includes('ujinbi.com')?
                'https://web.ujinbi.com/admin/#/login':
                'https://web.youhuiduo.cn/admin/#/login'
                return  
            }
            resolve(res);
        })
       })
    },
    aspPost(url,data){
        return new Promise(function(resolve, reject){
            var baseUrl = window.location.href.includes('http://localhost')
            ?'https://cms.youhuiduo.cn/':
            'https://gate.ujinbi.com/usys/jinbi_api_flash_sale/'
            axios.post(baseUrl+url, 
                qs.stringify(data),
                {
                    headers: {
                        'ujinbi-token':JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')).token:null,
                    }
                }
            )
            .then(function(res){
                if(res.data.code == 40000){
                    window.location.href = 'https://web.ujinbi.com/admin/#/login';
                    return  
                }
                resolve(res);
            })
        })
    },
    getCookie: function(name) {
        var strcookie = document.cookie;
        var arrcookie = strcookie.split("; ");
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
        exp.setTime(exp.getTime() + 3600 * 60 * 24 *10);
        document.cookie = `${name}=${value};expires=${exp.toGMTString()}`
    },
}

export default gob