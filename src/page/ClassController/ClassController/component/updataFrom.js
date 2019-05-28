import React, { Component } from 'react';
import {Modal,Button,Input,Select } from 'antd'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
const Option = Select.Option;
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            groupId:null,//分类组Id
            level:null,//分类等级
            parentId:null,
            classNameGround:[],//分类组
            className:null,//分类名称
            classComment:null,
            classPictureUrl:null,
            secondClassId:null,
            classId:null
        }
    }

    //当父组件传递给子组件的数据发生变化时促发
    componentWillReceiveProps(nextProps){
        if(nextProps.visible){
            // 渲染父组件传递给子组件的数据
            this.setState({
                groupId:(this.props.ClassesGround.filter((item)=>{return item.groupName == this.props.recordItem.groupName})[0].id),
                level:this.props.recordItem.parentClassName==""?0:1,
                className:this.props.recordItem.className,
                classPictureUrl:this.props.recordItem.classPictureUrl,
                classComment:this.props.recordItem.classComment,
                classId:this.props.recordItem.id
            },()=>{

                if(this.props.recordItem.parentClassName){
                    this.gob.get('/class/getFirstClasses').then(res=>{
                        //className
                        this.setState({
                            classNameGround:res.data.data,
                            secondClassId:res.data.data.filter((item)=>{return item.className == this.props.recordItem.parentClassName})[0].id
                        })
                    })
                }

            })
        }
    }

    handleOk = () => {
        if(!this.state.groupId){
            this.antdComponent.message.info("请输入选择分类组");
            return
        }
        if(parseInt(this.state.level) != 0 && !this.state.secondClassId){
            this.antdComponent.message.info("请选择该二级分类所属一级分类");
            return
        }
        if(!this.state.className){
            this.antdComponent.message.info("请输入分类名称");
            return
        }
        
        var obj = {
            groupId:this.state.groupId,
            parentId:parseInt(this.state.level) == 0?0:this.state.secondClassId,
            className:this.state.className,
            classComment:this.state.classComment,
            classPictureUrl:this.state.classPictureUrl,
            classId:this.state.classId
        }
        this.gob.post('/class/editClass',obj).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info(res.data.msg);
                this.props.getList();
                this.props.hideModel();
            }else{
                this.antdComponent.message.info(res.data.msg);
            }
        })
    }
    handleChangeClassesGround(value){
        this.setState({
          groupId:value
        })
    }
    handleChangeSecondClassId(value){
        this.setState({
            secondClassId:value
        })
    }
    handleChangeLevel(value){
        this.setState({
          level:value
        },()=>{
                this.gob.get('/class/getFirstClasses').then(res=>{
                    this.setState({
                        classNameGround:res.data.data
                    })
                })
        })
    }
    handleCancel = () => {
        this.props.hideModel()
    }
    _onChange(e){
        var o = {};
        o[e.target.name] = e.target.value;
        this.setState(o);
    }

    // 根据Level判断显示一级分类下拉框
    isLevelOne(){
        if(parseInt(this.state.level)){
            return(
                <Select disabled value={this.state.secondClassId} placeholder="请选择该二级分类所属一级分类" style={{ width: 350 }} onChange={this.handleChangeSecondClassId.bind(this)}>
                      {
                        this.state.classNameGround.map((item)=>{
                          return(
                            <Option key={item.id} value={item.id}>{item.className}</Option>
                          )
                        })
                      }
                 </Select>
            )
        }
    }  
    render(){
        return(
            <div>
                <Modal title="编辑分组"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>

                    <div className='_title'>请选择分类组</div>
                    <Select disabled defaultValue={parseInt(this.state.groupId)} 
                            placeholder="请选择分类组" style={{ width: 250 }} 
                            onChange={this.handleChangeClassesGround.bind(this)}>
                            {
                                this.props.ClassesGround.map((item)=>{
                                    return(
                                        <Option key={item.id} value={item.id}>{item.groupName}</Option>
                                    )   
                                })
                            }
                    </Select><br></br>

                    <div className='_title'>请选择等级分类</div>
                    <Select name="level" 
                            value={String(this.state.level)} 
                            disabled={true} 
                            placeholder="请选择等级分类" 
                            style={{ width: 250 }} 
                            onChange={this.handleChangeLevel.bind(this)}>
                            <Option value="0">一级分类</Option>
                            <Option value="1">二级分类</Option>
                    </Select><br></br>
                    {
                        this.isLevelOne()
                    }
                    
                    <div className='_title'>请输入分类名称</div>
                    <Input
                        onChange={this._onChange.bind(this)}
                        name="className"
                        value={this.state.className}
                        placeholder="请输入分类名称" />
                    <div className='_title'>请输入图片url(非必填)</div>
                    <Input
                        onChange={this._onChange.bind(this)} 
                        name="classPictureUrl"
                        value={this.state.classPictureUrl}
                        placeholder="请输入图片url(非必填)" />
                    <div className='_title'>请输入分类说明(非必填)</div>
                    <Input
                        onChange={this._onChange.bind(this)}
                        name="classComment"
                        value={this.state.classComment}
                        placeholder="请输入分类说明(非必填)" />
                </Modal>
          </div>
        )
    }
}