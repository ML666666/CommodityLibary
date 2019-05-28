import React, { Component } from 'react';
import { Modal, Button,Input,message } from 'antd';
import GetUnitList from '../../../../CommonComponent/getUnitList'
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            commodityPricePreviewId:null,
            unitId:null,
            cash:null,
            points:null
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
            obj[k] = this.props.tItem[k];
            this.setState(obj);
        }

    }
    handleOk = () => {
        for(var k in this.state){
            if(!this.state[k]){
                message.info("请填写完整信息");
                return
            }
        }
        this.gob.post('/sale/editCommoditySalePrices',this.state).then(res=>{
            if(res.data.code == 10000){
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
                <Modal title="编辑商品销售价格"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div className='_title'>商品销售渠道</div>
                    <GetUnitList width={220} unitId={this.state.unitId} handleChangeSelect={this.handleChangeSelect.bind(this,'unitId')}></GetUnitList>
                    <div className='_title'>商品销售价格</div>
                    <Input
                    name="cash"
                    value={this.state.cash}
                    onChange={this.handleChangeValue.bind(this)} 
                    placeholder="请输入商品销售价格" />
                    <div className='_title'>商品销售积分</div>
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