import React, { Component } from 'react';
import './Header.css'
import axios from 'axios';
import qs from 'qs';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
class Header extends Component{
    constructor(props){
        super(props)
    }
    // 退出登录接口
    LoginOut(){
        var obj = {
            token:JSON.parse(localStorage.getItem('userInfo')).token
        }
        let url = window.location.href.includes('ujinbi.com')?
                'https://gate.ujinbi.com/usys/authCenter/management/auth/logout':
                'https://gate.youhuiduo.cn/usys/authCenter/management/auth/logout';

        let outUrl = window.location.href.includes('ujinbi.com')?
                'https://web.ujinbi.com/admin/#/login':
                'https://web.youhuiduo.cn/admin/#/login'
        axios.post(url,qs.stringify(obj)).then(res=>{
            if(res.data.code == 10000){
                window.location.href = outUrl;
                this.antdComponent.message.info('退出成功！');
            }else{
                this.antdComponent.message.info(res.data.msg);
            }
        })
    }
    render(){
        return(
            <div className="React_App_Header_Wrapper">
                <h2>商品微服务管理系统</h2>
                <div className='list'>
                    <a onClick={this.LoginOut.bind(this)} href='javascript:void'>退出登录</a>
                </div>
            </div>
        )
    }
}

export default immutableRenderDecorator(Header)