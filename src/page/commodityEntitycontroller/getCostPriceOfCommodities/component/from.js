import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            commodityEntityId:null,
            buyingPrice:null,
            tmallPrice:null,
            jdPrice:null,
            retailPrice:null
        }
    }

    handleOk = () => {  
        
        for(let key in this.state){
            if(!this.state[key]){
                this.antdComponent.message.info('请输入完整的信息!');
                return
            }
        };
        let obj = Object.assign({
            userId:JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')).userId:0,
            userName:JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')).userName:'测试名字'
        },this.state);

        this.gob.post('/entity/newCostPriceOfCommodity',obj).then(res=>{
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
                <Modal title="添加实物商品成品价格"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div className='_title'>请填写商品实物Id:</div>
                    <Input
                    name="commodityEntityId"
                    onChange={this.onhandleChangeValue.bind(this)}
                    value={this.state.commodityEntityId} 
                    placeholder="请填写商品实物Id" />
                    <div className='_title'>请填写成本价格:</div>
                    <Input
                    name="buyingPrice"
                    value={this.state.buyingPrice}
                    onChange={this.onhandleChangeValue.bind(this)}  
                    placeholder="请填写成本价格" />
                    <div className='_title'>请填写天猫价格:</div>
                    <Input
                    name="tmallPrice"
                    value={this.state.tmallPrice}
                    onChange={this.onhandleChangeValue.bind(this)}  
                    placeholder="请填写天猫价格" />
                    <div className='_title'>请填写京东价格:</div>
                    <Input
                    name="jdPrice"
                    value={this.state.jdPrice}
                    onChange={this.onhandleChangeValue.bind(this)}   
                    placeholder="请填写京东价格" />
                    <div className='_title'>请填写建议零售价:</div>
                    <Input
                    name="retailPrice"
                    onChange={this.onhandleChangeValue.bind(this)}
                    value={this.state.retailPrice}  
                    placeholder="请填写建议零售价" />
                </Modal>
          </div>
        )
    }
}