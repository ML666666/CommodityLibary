import React, { Component } from 'react';
import { Modal,Button,Input,Select,DatePicker,message} from 'antd';
import moment from 'moment';
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
    componentWillReceiveProps(){
      if(this.props.fromObj){
        for(let key in this.state){
            let obj = {};
            obj[key] = this.props.fromObj[key];
            this.setState(obj);
        }
      }
    }
    handleOk = () => {
        for(var item in this.state){
            if(!this.state[item] && item!='supplierComment'){
                this.antdComponent.message.info('请输入完整信息');
                return null
            }
        }
        this.gob.post('/addOrUpdateSupplier',this.state).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info(res.data.msg);
                this.props.getList();
                this.props.hideModel();
            }else{
                message.info(res.data.msg);
            }
        })
    }
    handleCancel = () => {
        this.props.hideModel()
    }  
    onChangeId = (value)=>{
        this.setState({
            id:value
        })
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
    onChangeValue = (e)=>{
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }
    render(){
        return(
            <div className="From_Wrapper_App">
                <Modal title="编辑供应商"
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
                        defaultValue={moment(this.props.fromObj?this.props.fromObj.createTime:'2019-02-14 11:23:38', 'YYYY-MM-DD HH:mm:ss')}
                        onChange={this.onChangeDate.bind(this)} 
                    />

                    <div className='_title'>请选择供应商类型</div>
                    <Select
                        showSearch
                        style={{ width: 300 }}
                        placeholder="请选择供应商类型"
                        optionFilterProp="children"
                        defaultValue={this.props.fromObj?String(this.props.fromObj.supplierType):null}
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
                        defaultValue={this.props.fromObj?String(this.props.fromObj.cooperationStatus):null}
                        onChange={this.onChangeStatus.bind(this)} 
                    >
                        <Option value="1">合作中</Option>
                        <Option value="2">暂停合作</Option>
                        <Option value="3">终止合作</Option>
                    </Select>

                    <div className='_title'>填写供应商名称</div>

                    <Input 
                        name='fullName'
                        value={this.state.fullName}
                        onChange={this.onChangeValue.bind(this)}
                        placeholder="填写供应商名称" />
                    <div className='_title'>供应商联系人姓名</div>

                    <Input 
                        name='contactPerson'
                        value={this.state.contactPerson}
                        onChange={this.onChangeValue.bind(this)}
                        placeholder="供应商联系人姓名" />
                    <div className='_title'>供应商联系人手机号</div>

                    <Input     
                        name='contactPhone'
                        value={this.state.contactPhone}
                        onChange={this.onChangeValue.bind(this)}
                        placeholder="供应商联系人手机号" />
                    <div className='_title'>供应商开户银行</div>

                    <Input 
                        name='bank'
                        value={this.state.bank}
                        onChange={this.onChangeValue.bind(this)}
                        placeholder="供应商开户银行" />
                    <div className='_title'>供应商银行账号</div>

                    <Input 
                        name='bankAccount'
                        value={this.state.bankAccount}
                        onChange={this.onChangeValue.bind(this)}
                        placeholder="供应商银行账号" />
                    <div className='_title'>请填写供应商备注</div>

                    <Input 
                        name='supplierComment'
                        value={this.state.supplierComment}
                        onChange={this.onChangeValue.bind(this)}
                        placeholder="请填写供应商备注" />

                </Modal>
          </div>
        )
    }
}