import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
import GetSupplierId from '../../../../CommonComponent/getSupplierId'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
class component extends Component{
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
            id:null,
            recordStatus:null,
            priceComment:null,
            salePrice:null
        }
    }
    handleOk = () => {
       if(this.state.buyingPrice && this.state.jdPrice && this.state.tmallPrice && this.state.retailPrice && this.state.salePrice){
        let obj = Object.assign({},this.state);
        obj.recordStatus = 1;
        this.gob.post('/updatePurchasePreview',obj).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info("修改商品采购价格成功");
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
    componentWillReceiveProps(){
        for(let k in this.state){
            var obj = {};
            if(k in this.props.tRecord){
                obj[k] = this.props.tRecord[k];
                this.setState(obj);
            }
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
                <Modal title="修改商品采购价格"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div className='_title'>请选择供应商</div>
                    <GetSupplierId
                       disabled={true}
                       value={this.state.recordStatus}
                       isShowNotAll={true}
                       placeholder={'请选择供应商'}
                       handleChangeSelect={this.handleChangeSelect.bind(this,'supplierId')}
                       id={this.state.supplierId}
                       name="supplierId">
                    </GetSupplierId>

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


                    <div className='_title'>请输入销售基准价格</div>
                    <Input placeholder="请输入销售基准价格" 
                           name='salePrice' 
                           value={this.state.salePrice}
                           onChange={this.onChangeValue.bind(this)} />

                </Modal>
          </div>
        )
    }
}

export default immutableRenderDecorator(component)