import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
class SelfBreadCrumb extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Breadcrumb style={{marginBottom:24}}>
                {
                    this.props.TabList.map((item)=>{
                        return(
                            <Breadcrumb.Item>{item}</Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        )
    }
}

export default immutableRenderDecorator(SelfBreadCrumb)