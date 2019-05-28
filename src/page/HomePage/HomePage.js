import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Button } from 'antd';

export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            EditLoading:false,
        }
    }
    componentDidMount(){
    }
    toggleShow(){
        this.setState({
            EditLoading:!this.state.EditLoading
        })
    }
    render(){
        return(
            <div>
                {/* <SelfBreadcrumb TabList={['商品分类管理','添加商品分类组']}></SelfBreadcrumb> */}
            </div>
        )
    }
}