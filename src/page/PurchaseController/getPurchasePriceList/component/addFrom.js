import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
import GetSupplierId from '../../../../CommonComponent/getSupplierId'
export default class From extends Component{
    constructor(props){
        super(props)
        this.state={
            purchaseId:null,
            supplierId:null,
            buyingPrice:null,
            jdPrice:null,
            tmallPrice:null,
            retailPrice:null,
            buyerName:null,
            buyerId:null,
            recordStatus:undefined,
        }
    }
    componentDidMount(){
        this.setState({
            recordStatus:1
        })
    }
    handleOk = () => {
       for(let k in this.state){
            if(!this.state[k]){
                this.antdComponent.message.info('请输入完整信息')
                return 
            }
       }
       if(true){
        this.gob.post('/addPurchasePreview',this.state).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info("新增商品采购价格成功");
                this.props.getList();
                this.props.hideModel();
            }else{
                this.antdComponent.message.info(res.data.msg);
            }
        })
       }else{
        this.antdComponent.message.info('请输入完整的信息');
       }
    }
    handleCancel = () => {
        this.props.hideModel()
    }
    handleChangeSelect(name,value){
        var obj = {};
        obj[name] = value;
        this.setState(obj);
    }
    onChangeValue(e){
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }  
    render(){
        return(
            <div>
                <Modal title="新增商品采购价格"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div className='_title'>请选择供应商</div>
                    <GetSupplierId
                       isShowNotAll={true}
                       placeholder={'请选择供应商'}
                       handleChangeSelect={this.handleChangeSelect.bind(this,'supplierId')}
                       id={this.state.supplierId}
                       name="supplierId">
                    </GetSupplierId>
                    <div className='_title'>请输入采购Id</div>
                    <Input placeholder="请输入采购Id" 
                           name='purchaseId' 
                           value={this.state.purchaseId}
                           onChange={this.onChangeValue.bind(this)} />
                    <div className='_title'>请输入采购名称</div>
                    <Input placeholder="请输入采购名称" 
                           name='buyerName' 
                           value={this.state.buyerName}
                           onChange={this.onChangeValue.bind(this)} />
                    <div className='_title'>请输入采购人Id</div>
                    <Input placeholder="请输入采购人Id" 
                           name='buyerId' 
                           value={this.state.buyerId}
                           onChange={this.onChangeValue.bind(this)} />                     
                    <div className='_title'>请输入采购价格</div>
                    <Input placeholder="请输入采购价格" 
                           name='buyingPrice' 
                           value={this.state.buyingPrice}
                           onChange={this.onChangeValue.bind(this)} />
                    <div className='_title'>请输入京东价格</div>
                    <Input placeholder="请输入京东价格" 
                           name='jdPrice' 
                           value={this.state.jdPrice}
                           onChange={this.onChangeValue.bind(this)} />
                    <div className='_title'>请输入天猫价格</div>
                    <Input placeholder="请输入天猫价格" 
                           name='tmallPrice' 
                           value={this.state.tmallPrice}
                           onChange={this.onChangeValue.bind(this)} />  
                    <div className='_title'>请输入零售价格</div>
                    <Input placeholder="请输入零售价格" 
                           name='retailPrice' 
                           value={this.state.retailPrice}
                           onChange={this.onChangeValue.bind(this)} />                
                </Modal>
          </div>
        )
    }
}