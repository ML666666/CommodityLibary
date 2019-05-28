import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import { InputNumber } from 'antd';
import moment from 'moment'

const Option = Select.Option;
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:null,
            fullName:null,
            supplierType:null,
            contactPerson:null,
            contactPhone:null,
            bank:null,
            bankAccount:null,
            supplierComment:null,
            cooperationTime:null,
            cooperationStatus:null
        }
    }
    handleOk = () => {
        let fullName = this.refs.fullName.state;
        let contactPerson = this.refs.contactPerson.state;
        let contactPhone = this.refs.contactPhone.state;
        let bank = this.refs.bank.state;
        let bankAccount = this.refs.bankAccount.state;
        let supplierComment = this.refs.supplierComment.state;
        var obj = {
            cooperationTime:this.state.cooperationTime,
            supplierType:this.state.supplierType,
            cooperationStatus:this.state.cooperationStatus,
            fullName:fullName.value,
            contactPerson:contactPerson.value,
            contactPhone:contactPhone.value,
            bank:bank.value,
            bankAccount:bankAccount.value,
            supplierComment:supplierComment.value
        }
        for(var item in obj){
            if(!obj[item] && item!='supplierComment'){
                this.antdComponent.message.info('请输入完整信息');
                return null
            }
        }
        obj['id'] = 0;
        this.gob.post('/addOrUpdateSupplier',obj).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info(res.data.msg);
                this.props.getList();
                this.props.hideModel();
            }else{
                this.antdComponent.message.info(res.data.msg);
            }
        })

    }
    handleCancel = () => {
        this.props.hideModel()
    }
    onChangeDate = (date,dateString)=>{
        this.setState({
            cooperationTime:dateString
        })
    }
    onChangeType = (value)=>{
        this.setState({
            supplierType:value
        })
    }
    onChangeStatus = (value)=>{
        this.setState({
            cooperationStatus:value
        })
    }
    render(){
        return(
            <div className="From_Wrapper_App">
                <Modal title="新增供应商"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>

                    <div className='_title'>选择供应商开始时间</div>
                    <DatePicker
                        ref="cooperationTime"
                        placeholder="选择供应商开始时间"
                        style={{ width: 300 }}
                        format="YYYY-MM-DD HH:mm:ss"
                        showTime
                        onChange={this.onChangeDate.bind(this)} 
                    />

                    <div className='_title'>请选择供应商类型</div>
                    <Select
                        showSearch
                        style={{ width: 300 }}
                        placeholder="请选择供应商类型"
                        optionFilterProp="children"
                        onChange={this.onChangeType.bind(this)} 
                    >
                        <Option value="1">品牌厂商</Option>
                        <Option value="2">代理商</Option>
                        <Option value="3">经销商</Option>
                    </Select>

                    <div className='_title'>请选择供应商合作状态</div>
                    <Select 
                        showSearch
                        style={{ width: 300 }}
                        placeholder="请选择供应商合作状态"
                        optionFilterProp="children"
                        onChange={this.onChangeStatus.bind(this)} 
                    >
                        <Option value="1">合作中</Option>
                        <Option value="2">暂停合作</Option>
                        <Option value="3">终止合作</Option>
                    </Select>

                    <div className='_title'>填写供应商名称</div>
                    <Input 
                        ref="fullName"
                        placeholder="填写供应商名称" />

                    <div className='_title'>供应商联系人姓名</div>
                    <Input 
                        ref="contactPerson"
                        placeholder="供应商联系人姓名" />

                    <div className='_title'>供应商联系人手机号</div>
                    <Input 
                        ref="contactPhone"
                        placeholder="供应商联系人手机号" />

                    <div className='_title'>供应商开户银行</div>
                    <Input 
                        ref="bank"
                        placeholder="供应商开户银行" />

                    <div className='_title'>供应商银行账号</div>
                    <Input 
                        ref="bankAccount"
                        placeholder="供应商银行账号" />

                    <div className='_title'>请填写供应商备注</div>
                    <Input 
                        ref="supplierComment"               
                        placeholder="请填写供应商备注" />
                        
                </Modal>
          </div>
        )
    }
}