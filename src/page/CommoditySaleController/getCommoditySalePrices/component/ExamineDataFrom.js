import React, { Component } from 'react';
import { Modal, Button,Input, Select } from 'antd';
import GetUnitList from '../../../../CommonComponent/getUnitList'
const Option = Select.Option;
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            commodityPricePreviewId:null,
            reviewComment:null,
            reviewStatus:undefined
        }
    }
    componentWillReceiveProps(){
        for(let k in this.props.tItem){
            var obj = {};
            if(k == 'id'){
                this.setState({
                    commodityPricePreviewId:this.props.tItem[k]
                })
            }
        }
    }
    handleOk = () => {
        for(var k in this.state){
            if(!this.state[k]){
                this.antdComponent.message.info("请填写完整信息");
                return
            }
        }
        let obj = this.state;
        obj['userId'] = localStorage.userId?localStorage.userId:'0';
        obj['userName'] = localStorage.userName?localStorage.userName:'testUserName';
        this.gob.post('/sale/commoditySaleExamine',obj).then(res=>{
            if(res.data.code == 10000){
                this.props.hideModel();
                this.props.getList();
                this.setState({
                    reviewComment:null,
                    reviewStatus:undefined
                })                
                this.antdComponent.message.info(res.data.msg);
            }else{
                this.antdComponent.message.info(res.data.msg);
            }
        })
    }
    handleCancel = () => {
        this.props.hideModel()
    }
    handleChangeSelect = (name,value) =>{
        var obj = {}
        obj[name] = value;
        this.setState(obj);
    }
    handleChangeValue = (e) =>{
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }  
    render(){
        return(
            <div>
                <Modal title="审核商品销售价格"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div className='_title'>请选择审核状态</div>
                    <Select
                        value={this.state.reviewStatus}
                        style={{ width: 220 }} 
                        onChange={this.handleChangeSelect.bind(this,'reviewStatus')}
                        placeholder="请选择审核状态" >
                        <Option key={1} value={1}>待审核</Option>
                        <Option key={2} value={2}>价格驳回</Option>
                        <Option key={3} value={3}>审核通过</Option>
                        <Option key={4} value={4}>取消审核</Option>
                    </Select>
                    <div className='_title'>请输入审核意见</div>
                    <Input
                    name="reviewComment"
                    value={this.state.reviewComment}
                    onChange={this.handleChangeValue.bind(this)} 
                    placeholder="请输入审核意见" />
                </Modal>
          </div>
        )
    }
}