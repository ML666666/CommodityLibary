import React, { Component } from 'react';
import { Modal, Button,Input, message } from 'antd';
import GetUnitList from '../../../../CommonComponent/getUnitList'
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            commodityEntityId:null,
            unitId:null,
            cash:null,
            points:null
        }
    }
    handleOk = () => {
        for(var k in this.state){
            if(!this.state[k]){
                message.info("请填写完整信息");
                return
            }
        }
        this.gob.post('/sale/newCommoditySalePrices',this.state).then(res=>{
            if(res.data.code == 10000){
                for(var k in this.state){
                    var obj = {};
                    obj[k] = null;
                    this.setState(obj);
                }
                this.props.hideModel();
                this.props.getList();
                message.info(res.data.msg);
            }else{
                message.info(res.data.msg);
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
                <Modal title="新增商品销售价格"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <GetUnitList
                        width={220} 
                        unitId={this.state.unitId} 
                        handleChangeSelect={this.handleChangeSelect.bind(this,'unitId')}>
                    </GetUnitList>
                    <Input
                    name="commodityEntityId"
                    value={this.state.commodityEntityId}
                    onChange={this.handleChangeValue.bind(this)} 
                    placeholder="请输入实物商品Id" />
                    <Input
                    name="cash"
                    value={this.state.cash}
                    onChange={this.handleChangeValue.bind(this)} 
                    placeholder="请输入商品销售价格" />
                    <Input
                    name="points"
                    value={this.state.points}
                    onChange={this.handleChangeValue.bind(this)} 
                    placeholder="请输入商品销售积分" />
                </Modal>
          </div>
        )
    }
}