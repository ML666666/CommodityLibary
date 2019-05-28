import React, { Component ,Fragment} from 'react';
import { message, Modal,Button,Input,Select } from 'antd'
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
        }
    }

    //确认添加分类促发该事件
    handleOk = () => {
        if(!this.state.groupId){
            this.antdComponent.message.info("请输入选择分类组");
            return
        }
        if(!this.state.level){
            this.antdComponent.message.info("请选择等级分类");
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
            classPictureUrl:this.state.classPictureUrl
        }
        this.gob.post('/class/newClass',obj).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info(res.data.msg);
                this.props.getList();
                this.props.hideModel();
            }else{
                this.antdComponent.message.info(res.data.msg);
            }
        })
    }

    // 改变分类组下拉框触发该事件
    handleChangeClassesGround(value){
        this.setState({
          groupId:value
        })
    }

    // 改变二级分类促发该事件
    handleChangeSecondClassId(value){
        this.setState({
            secondClassId:value
        },()=>{
            let obj = this.state.classNameGround.find((item)=>{return item.id == value});
            this.setState({
                groupId:obj.classGroupId
            })
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
    
    // 关闭模态框
    handleCancel = () => {
        this.props.hideModel()
    }

    // 改变输入框的值
    _onChange(e){
        var o = {};
        o[e.target.name] = e.target.value;
        this.setState(o);
    }

    //如果添加一级分类显示该下拉框  level==1显示该下拉列表
    isLevelOne(){
        if(parseInt(this.state.level)){
            return(
                <Select  placeholder="请选择该二级分类所属一级分类" 
                         style={{ width: 350 }} 
                         onChange={this.handleChangeSecondClassId.bind(this)}>
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
    
    //如果添加二级分类显示该下拉框  level==0显示该下拉列表
    isLevelTwo(){
        if(parseInt(this.state.level)==0){
            return(
                <Fragment>
                    <div className='_title'>请选择分类组</div>
                    <Select  placeholder="请选择分类组" 
                             style={{ width: 250 }} 
                             onChange={this.handleChangeClassesGround.bind(this)}>
                             {
                                this.props.ClassesGround.map((item)=>{
                                    return(
                                        <Option key={item.id} value={item.id}>{item.groupName}</Option>
                                    )
                                })
                            }
                    </Select><br></br>
                </Fragment>
            )
        }
    }

    render(){
        return(
            <div>
                <Modal title="添加分类"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>

                    {/* 选择添加一级分类还是二级分类 */}
                    <div className='_title'>请选择等级分类</div>
                    <Select name="level"  placeholder="请选择等级分类"  style={{ width: 250 }} onChange={this.handleChangeLevel.bind(this)}>
                      <Option value="0">一级分类</Option>
                      <Option value="1">二级分类</Option>
                    </Select><br></br>

                    {/* 根据Level显示隐藏一级还是二级分类 */}
                    {
                        this.isLevelOne()
                    }
                    {
                        this.isLevelTwo()
                    }

                    <div className='_title'>请输入分类名称</div>
                    <Input
                    onChange={this._onChange.bind(this)}
                    name="className"
                    placeholder="请输入分类名称" />
                    <div className='_title'>请输入图片url(非必填)</div>

                    <Input
                    onChange={this._onChange.bind(this)} 
                    name="classPictureUrl"
                    placeholder="请输入图片url(非必填)" />
                    
                    <div className='_title'>请输入分类说明(非必填)</div>
                    <Input
                    onChange={this._onChange.bind(this)}
                    name="classComment"
                    placeholder="请输入分类说明(非必填)" />
                </Modal>
          </div>
        )
    }
}