import React, { Component } from 'react';
import { Modal, Button,Input,Select } from 'antd';
import GetSupplierId from '../../../../CommonComponent/getSupplierId'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
const Option = Select.Option;
class component extends Component{
    constructor(props){
        super(props)
        this.state={
            deliveryMethod:null,
            purchaseId:null,
            supplierId:null,
            buyingPrice:null,
            jdPrice:null,
            tmallPrice:null,
            retailPrice:null,
            buyerName:null,
            buyerId:null,
            recordStatus:undefined,
            salePrice:null,
            invoiceType:null,
            settlement:null,
            warehouseId:null,
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible){
            this.setState({
                purchaseId:this.props.tRecordItem.id
            })
        } 
    }
    componentDidMount(){
        this.setState({
            recordStatus:1
        })
    }
    handleOk = () => {
       for(let k in this.state){
            if(!this.state[k] && (k != 'warehouseId')){
                this.antdComponent.message.info('请输入完整信息');
                return 

            }
       }
       let obj  = Object.assign({},this.state);
       obj.warehouseId = obj.warehouseId?obj.warehouseId:0;
       this.gob.post('/addPurchasePreview',obj).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info("新增商品采购价格成功");
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
    handleChangeSelect(name,value){
        var obj = {};
        obj[name] = value;
        this.setState(obj,()=>{
            if(name == 'deliveryMethod' && this.state.deliveryMethod == 2){
                this.setState({
                    warehouseId:undefined
                })
            }
        });
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
                    width={750}
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div id={'EntitiesFrom'}>
                        <div style={{width:'100%'}} className='inputWrapper'>

                            <div className="itemWrapper">

                                <div>
                                    <div className='_title'>请选择供应商</div>
                                        <GetSupplierId
                                            filtersType={3}
                                            isShowNotAll={true}
                                            width={330} 
                                            placeholder={'请选择供应商'}
                                            handleChangeSelect={this.handleChangeSelect.bind(this,'supplierId')}
                                            id={this.state.supplierId}
                                            name="supplierId"></GetSupplierId>
                                </div>

                                <div>
                                    <div className='_title'>请选择发票类型</div> 
                                        <Select
                                            value={this.state.invoiceType?this.state.invoiceType:undefined}  
                                            name="invoiceType" 
                                            placeholder="请选择发票类型" 
                                            style={{ width: 330 }} 
                                            onChange={this.handleChangeSelect.bind(this,'invoiceType')}>
                                            <Option key={1} value={1}>{"16%增值税专用发票"}</Option>
                                            <Option key={2} value={2}>{"16%增值税普通发票"}</Option>
                                            <Option key={3} value={3}>{"6%增值税专用发票"}</Option>
                                            <Option key={4} value={4}>{"6%增值税普通发票"}</Option>
                                        </Select>
                                </div>
                            </div>

                            <div className="itemWrapper">

                                <div>
                                    <div className='_title'>请输入采购人名称</div>
                                        <Input placeholder="请输入采购人名称"
                                            style={{ width: 330 }}   
                                            name='buyerName' 
                                            value={this.state.buyerName}
                                            onChange={this.onChangeValue.bind(this)} />
                                </div>

                                <div>
                                    <div className='_title'>请输入采购人Id</div>
                                        <Input 
                                            style={{ width: 330 }}  
                                            placeholder="请输入采购人Id" 
                                            name='buyerId' 
                                            value={this.state.buyerId}
                                            onChange={this.onChangeValue.bind(this)} />
                                </div>

                            </div>

                            <div className="itemWrapper">

                                <div>
                                    <div className='_title'>请输入采购价格</div>
                                    <Input 
                                        style={{ width: 330 }}  
                                        placeholder="请输入采购价格" 
                                        name='buyingPrice' 
                                        value={this.state.buyingPrice}
                                        onChange={this.onChangeValue.bind(this)} />
                                </div>

                                <div>
                                    <div className='_title'>请输入京东价格</div>
                                    <Input 
                                        style={{ width: 330 }}  
                                        placeholder="请输入京东价格" 
                                        name='jdPrice' 
                                        value={this.state.jdPrice}
                                        onChange={this.onChangeValue.bind(this)} />
                                </div>

                            </div>

                            <div className="itemWrapper">

                                <div>

                                    <div className='_title'>请输入天猫价格</div>
                                    <Input placeholder="请输入天猫价格"
                                        style={{ width: 330 }}
                                        name='tmallPrice' 
                                        value={this.state.tmallPrice}
                                        onChange={this.onChangeValue.bind(this)} />

                                </div>

                                <div>

                                    <div className='_title'>请输入零售价格</div>
                                    <Input placeholder="请输入零售价格"
                                        style={{ width: 330 }} 
                                        name='retailPrice' 
                                        value={this.state.retailPrice}
                                        onChange={this.onChangeValue.bind(this)} />

                                </div>

                            </div>

                            <div className="itemWrapper">

                                <div>
                                    <div className='_title'>请选择发货方式</div>
                                    <Select 
                                        value={this.state.deliveryMethod?this.state.deliveryMethod:undefined}  
                                        name="deliveryMethod" 
                                        placeholder="请选择合作方式" 
                                        style={{ width: 330 }} 
                                        onChange={this.handleChangeSelect.bind(this,'deliveryMethod')}>
                                        <Option key={1} value={1}>{"批采到仓"}</Option>
                                        <Option key={2} value={2}>{"一件代发"}</Option>
                                    </Select> 
                                </div>
                               
                                <div>
                                    <div className='_title'>请选择仓库</div>
                                    <Select
                                        disabled={this.state.deliveryMethod == 2?true:false} 
                                        value={this.state.warehouseId?this.state.warehouseId:undefined} 
                                        name="warehouseId" 
                                        placeholder="请选择仓库" 
                                        style={{ width: 330 }} 
                                        onChange={this.handleChangeSelect.bind(this,'warehouseId')}>
                                        <Option key={1} value={1}>{"武汉仓库"}</Option>
                                        <Option key={2} value={2}>{"广州仓库"}</Option>
                                    </Select>
                                </div>

                            </div>

                            {/* <div className='_title'>请选择唯一方式</div>
                                    <Select
                                        value={this.state.uniqueType?this.state.uniqueType:undefined} 
                                        name="uniqueType" 
                                        placeholder="请选择唯一方式" 
                                        style={{ width: 708 }} 
                                        onChange={this.handleChangeSelect.bind(this,'uniqueType')}>
                                        <Option key={1} value={1}>{"名称唯一"}</Option>
                                        <Option key={2} value={2}>{"名称型号唯一"}</Option>
                                        <Option key={3} value={3}>{"名称规格唯一"}</Option>
                                        <Option key={4} value={4}>{"名称规格型号唯一"}</Option>
                                    </Select>*/}

                            <div className='_title'>请输入销售基准价格</div>

                                <Input 
                                    placeholder="请输入销售基准价格" 
                                    name='salePrice' 
                                    value={this.state.salePrice}
                                    onChange={this.onChangeValue.bind(this)} /> 

                            <div className='_title'>请输入结算方式的文字描述</div>

                                <Input 
                                    value={this.state.settlement} 
                                    name="settlement"  
                                    onChange={this.onChangeValue.bind(this)}                                     
                                    placeholder="请输入结算方式的文字描述" /> 

                        </div>
                    </div>
                    
                    

                </Modal>
          </div>
        )
    }
}

export default immutableRenderDecorator(component)