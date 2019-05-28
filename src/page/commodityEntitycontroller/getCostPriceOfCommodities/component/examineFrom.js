import React, { Component } from 'react';
import { Modal, Button,Input,Select } from 'antd';
const Option = Select.Option;
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:null,
            reviewComment:null,
            reviewStatus:undefined
        }
    }
    componentWillReceiveProps(){
        this.setState({
            id:this.props.recordItem.id,
            reviewComment:null,
            reviewStatus:null
        })
    }
    handleChangeReviewStatus(value){
        this.setState({
            reviewStatus:value
        })
    }
    handleOk = () => {
        

        for(let key in this.state){
            if(!this.state[key]){
                this.antdComponent.message.info('请输入完整的信息!');
                return
            }
        }
        let obj = Object.assign({
            userId:JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')).userId:0,
            userName:JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')).userName:'测试名字'
        },this.state);

        this.gob.post('/entity/costPriceOfCommodity/examine',obj).then(res=>{
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
    onhandleChangeValue(e){
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }  
    render(){
        return(
            <div>
                <Modal title="审核实物商品成品价格"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div className='_title'>请填写审核意见:</div>
                    <Input
                        name="reviewComment"
                        value={this.state.reviewComment}
                        onChange={this.onhandleChangeValue.bind(this)}   
                        placeholder="请填写审核意见" />
                    <div className='_title'>请选择一级分类:</div>
                    <Select name="classId" 
                            placeholder="请选择一级分类" 
                            style={{ width: '100%' }} 
                            onChange={this.handleChangeReviewStatus.bind(this)}>
                        <Option key={1} value={1}>{"待审核"}</Option>
                        <Option key={2} value={2}>{"价格驳回"}</Option>
                        <Option key={3} value={3}>{"审核通过"}</Option>
                        <Option key={4} value={4}>{"取消审核"}</Option>
                    </Select>
                </Modal>
          </div>
        )
    }
}