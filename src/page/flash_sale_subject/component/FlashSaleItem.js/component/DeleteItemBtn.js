import React, { Component } from 'react';
import {Popconfirm} from 'antd'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
class componentName extends Component {
    constructor(props){
        super(props)
    }
    deleteItem(){
        let record = this.props.record;
        var obj = {
            id:record.id,
            subjetid:this.props.subjectId,
            giftid:record.giftid,
            stock:record.stock,
            record_status:3
        }
        this.gob.aspPost('management/flash_sale/flash_sale_items/Update',obj).then(res=>{
            if(res.data.Code == '10000'){
                this.antdComponent.message.info('删除成功');
                this.props.getList(true);
            }
        })
    }
    render(){
        return(
            <Popconfirm title="是否删除该记录?" onConfirm={this.deleteItem.bind(this)}  okText="Yes" cancelText="No">
                    <a href='javascript:void(0)'>删除</a>
            </Popconfirm>
        )
    }
}

export default immutableRenderDecorator(componentName)