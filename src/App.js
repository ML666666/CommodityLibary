import React, { Component ,Fragment } from 'react';
import './App.css';
import './page/EntitiesFrom.css'
import './page/Page.css'
import { HashRouter as Router } from "react-router-dom";
import Sider from './Layout/Sidebar/Slidebar'
import Main from './Layout/Main/router'
import Header from './Layout/Header/Header'
import gob from './gob'
import store from './store/store'
import gobComponet from './gobComponent'
import antdComponent from './antdComponent'
import 'amfe-flexible'
Component.prototype.gob = gob; //全局方法
Component.prototype.store = store; //全局Redux
Component.prototype.gobComponet = gobComponet; //全局组件
Component.prototype.antdComponent = antdComponent; //全局antdUI组件 ，不过作用不大，不建议使用
class App extends Component {
  render() {
    return (
      // 在入口文件引入Router 并用Router包裹所有文件
      <Router>
      <Fragment>
        <Header></Header>
        <div className="App">  
            <Sider></Sider>{/* 路由跳转放在Sider */}
            <Main></Main>{/*路由注册放在Main*/}
        </div>
      </Fragment>
      </Router>
    );
  }
  componentDidMount(){
    //获取Sign签名,用于调用ASP接口
    this.gob.get('/getFileSign').then(res=>{
      if(res.data.code == 10000){
        localStorage.setItem('ZhaoQiLai-Token',res.data.data);
      }
    })
  }
}

export default App;
