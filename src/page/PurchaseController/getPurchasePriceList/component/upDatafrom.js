import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
import { Select } from 'antd'
const Option = Select.Option;
export default class From extends Component{
    constructor(props){
        super(props)
        this.state={
            purchaseId:null,
            supplierId:null,
            buyingPrice:null,
            jdPrice:null,
            tmallPrice:null,
            retailPrice:null,
            buyerName:null,
            buyerId:null,
            id:null,
            recordStatus:null,
            priceComment:null
        }
    }
    componentWillReceiveProps(){
        for(let k in this.state){
            var obj = {};
            if(this.props.tRecord[k]){
                obj[k] = this.props.tRecord[k];
                this.setState(obj);
            }
        }
    }
    handleOk = () => {
        if(this.state.priceComment){
         this.gob.post('/updatePurchasePreview',this.state).then(res=>{
             if(res.data.code == 10000){
                 this.antdComponent.message.info("修改商品采购价格成功");
                 this.props.getList();
                 this.props.hideModel();
             }else{
                this.antdComponent.message.info(res.data.msg);
             }
         })
        }else{
            this.antdComponent.message.info('请输入完整的信息');
        }
    }
    handleCancel = () => {
        this.props.hideModel()
    }
    handleChangeSelect(name,value){
        var obj = {};
        obj[name] = value;
        this.setState(obj);
    }
    onChangeValue(e){
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }  
    render(){
        return(
            <div>
                <Modal title="审核商品采购价格"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div className='_title'>请选择审核状态</div>
                    <Select 
                            name='recordStatus'
                            onChange={this.handleChangeSelect.bind(this,'recordStatus')}
                            placeholder={'请选择状态'} 
                            style={{ width: 220 }} 
                            value={this.state.recordStatus}
                            >
                      <Option key={1} value={1} >待审核</Option>
                      <Option key={2} value={2} >审核通过</Option>
                      <Option key={3} value={3} >审核不通过</Option>
                      <Option key={4} value={4} >取消审核</Option>
                    </Select>
                    <div className='_title'>请输入审核意见</div>
                    <Input placeholder="请输入审核意见" 
                           name='priceComment' 
                           value={this.state.priceComment}
                           onChange={this.onChangeValue.bind(this)} />
                </Modal>
          </div>
        )
    }
}