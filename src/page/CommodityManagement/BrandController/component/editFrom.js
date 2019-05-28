import React, { Component } from 'react';
import { Modal,Button,Input,Select } from 'antd';
const Option = Select.Option;
// 已放弃使用
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:null,
            brand:null,
            brandOwner:null,
            recordStatus:null
        }
    }
    componentWillReceiveProps(){
        if(this.props.recordObj){
            this.setState({
                groupName:this.props.recordObj.groupName?this.props.recordObj.groupName:null,
                groupComment:this.props.recordObj.groupComment?this.props.recordObj.groupComment:null
            })
        }
    }
    handleOk = () => {
        if(!this.state.brand){
            this.antdComponent.message.info("请输入品牌名称");
            return null
        }
        if(!this.state.brandOwner){
            this.antdComponent.message.info("请输入品牌所属公司")
            return null
        }
        if(!this.state.recordStatus){
            this.antdComponent.message.info("请选择记录状态")
            return null
        }
        if(this.props.recordObj){
            this.editRecord()
        }else{
            this.addRecord()
        }
    }
    editRecord(){
        var obj = {
            groupName:this.refs.groupName.state.value,
            groupComment:this.state.groupComment,
            groupId:this.props.recordObj.id
        }
        this.gob.post('/editClassGroup',obj).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info(res.data.msg)
                this.props.getList();
                this.props.hideModel()
            }else{
                this.antdComponent.message.info(res.data.msg)
            }
        })
    }
    addRecord(){
        var obj = {
            id:0,
            brand:this.state.brand,
            brandOwner:this.state.brandOwner,
            recordStatus:this.state.recordStatus
        }
        this.gob.post('/addOrUpdateBrand',obj).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info(res.data.msg)
                this.props.getList();
                this.props.hideModel();
            }else{
                this.antdComponent.message.info(res.data.msg)
            }
        })
    }
    handleCancel=()=>{
        this.props.hideModel()
    }
    _changeInput(e){
        var o = {}
        o[e.target.name] = e.target.value;
        this.setState(o);
    }
    onChangeType(value){
        this.setState({
            recordStatus:value
        })
    }
    render(){
        return(
            <div>
                <Modal title="添加品牌"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div className='_title'>请选择记录状态</div>  
                    <Select placeholder="请选择记录状态"
                            style={{ width: 160 }}
                            onChange={this.onChangeType.bind(this)}>
                      <Option value={1}>正常</Option>
                      <Option value={3}>删除</Option>
                    </Select>  
                    <div className='_title'>请输入品牌名称</div>  
                    <Input 
                    ref="brand"
                    name="brand"
                    onChange={this._changeInput.bind(this)}
                    defaultValue={this.state.brand}
                    placeholder="请输入品牌名称" />
                    <div className='_title'>请输入品牌所属公司</div>  
                    <Input 
                    ref="brandOwner"
                    name="brandOwner"
                    onChange={this._changeInput.bind(this)}
                    defaultValue={this.state.brandOwner}
                    placeholder="请输入品牌所属公司" />
                </Modal>
          </div>
        )
    }
}