import React, { Component } from 'react';
import { Modal,message,Button,Input } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
const { TextArea } = Input;
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            groupComment:null,
            groupName:null
        }
    }
    componentWillReceiveProps(){
        if(this.props.recordObj){
            this.setState({
                groupName:this.props.recordObj.groupName?this.props.recordObj.groupName:null,
                groupComment:this.props.recordObj.groupComment?this.props.recordObj.groupComment:null
            })
        }else{
            this.setState({
                groupName:null,
                groupComment:null
            })
        }
    }
    handleOk = () => {
        if(!this.refs.groupName.state.value){
            this.antdComponent.message.info("请填写分类组名称");
            return null
        }
        if(!this.state.groupComment){
            this.antdComponent.message.info("请填写分类组说明")
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
        this.gob.post('/classGroup/editClassGroup',obj).then(res=>{
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
            groupName:this.refs.groupName.state.value,
            groupComment:this.state.groupComment
        }
        this.gob.post('/classGroup/newClassGroup',obj).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info(res.data.msg)
                this.props.getList();
                this.props.hideModel()
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
    handleChangeTextArea(e){
        this.setState({
            groupComment:e.target.value
        })
    }  
    render(){
        return(
            <div>
                <Modal title={this.props.recordObj?'编辑分类':'新增分类'}
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div className='_title'>填写分类组名称</div>
                    <Input 
                        ref="groupName"
                        name="groupName"
                        value={this.state.groupName}
                        onChange={this._changeInput.bind(this)}
                        placeholder="填写分类组说明" />

                    <div className='_title'>填写分类组名称</div>
                    <TextArea
                        autosize={{minRows: 4, maxRows: 8 }}
                        value={this.state.groupComment}
                        name="groupComment"
                        onChange={this._changeInput.bind(this)}
                        placeholder="填写分类组说明,需要注明分类的使用范围和业务渠道，如有特点需求，也需要在此处注明" 
                        ref="groupComment"></TextArea>
                </Modal>
          </div>
        )
    }
}