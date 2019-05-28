import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
import { Select } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
const Option = Select.Option;
class component extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:0,
            oneClassId:null,
            subClassId:null,
            commodityName:null,
            brandId:null,
            shortName:null,
            brand:null,
            model:null,
            specification:null,
            unitName:null,
            oneClass:null,
            subClass:null,
            barCode:null,
            uniqueType:null
        }
    }

    
    componentWillReceiveProps(nextProps){
        if(nextProps.visible){
           for(var key in this.state){
                var obj = {};
                obj[key] = this.props.tRecordItem[key];
                this.setState(obj);
            } 
        }
        
    }


    handleOk = () => {
        for(var key in this.state){
            if(!this.state[key] && key != 'id' && key != 'key'){
                this.antdComponent.message.info('请填写完整信息');
                return 
            }
        }
        this.gob.post('/addOrUpdatePurchase',this.state).then(res=>{
            if(res.data.code == 10000){
                this.props.getList();
                this.props.hideModel();
                this.antdComponent.message.info(res.data.msg);
                for(var key in this.state){
                    if(key != 'id'){
                        this.setState({
                            key:null
                        })
                    }
                }
            }else{
                this.antdComponent.message.info(res.data.msg);
            }
        })
    }

    handleCancel = () => {
        this.props.hideModel()
    }

    getClassId(value,selectedOptions){
        if(selectedOptions[0]){
            this.setState({
                 oneClass:selectedOptions[0].label,
                 oneClassId:selectedOptions[0].value
            })
        }
        if(selectedOptions[1]){
            this.setState({
                 subClass:selectedOptions[1].label,
                 subClassId:selectedOptions[1].value
            },()=>{
                console.log(this.state.subClassId)
            })
        }
    }

    handleChangeValue(e){
        var obj = {}
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    handleChangeSelect(name,value){
        var obj = {};
        obj[name] = value;
        this.setState(obj,()=>{
            if(name == 'brandId'){
                this.setState({
                    brand:this.props.BrandList.filter((item)=>{return item.id == value})[0].brand
                })
            }
            if(name == 'supplierId'){
                this.setState({
                    supplier:this.props.supplierList.filter((item)=>{return item.id == value})[0].fullName
                })
            }  
        });
    }  

    render(){
        let CascaderOfClass = this.gobComponet.TheCascader
        return(
            <div>
                <Modal title="编辑采购商品"
                    width={750}
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div id={'EntitiesFrom'}>
                        <div style={{width:'100%'}} className='inputWrapper'>
                        
                            <div className='_title'>请输入商品名称</div>
                            <Input  
                                    value={this.state.commodityName}
                                    name="commodityName"
                                    onChange={this.handleChangeValue.bind(this)} 
                                    placeholder="请输入商品名称" /> 

                        <div className='_title'>请选择分类</div>
                            <CascaderOfClass
                                        defaultValue={[this.state.oneClassId,
                                            this.state.subClassId]}
                                        getClassId={this.getClassId.bind(this)}
                                        width={708}></CascaderOfClass>   


                            <div className="itemWrapper">
                                <div>
                                    <div className='_title'>请选择品牌</div>
                                    <Select 
                                        value={this.state.brandId?this.state.brandId:undefined} 
                                        name="brandId" 
                                        placeholder="请选择品牌" 
                                        style={{ width: 330 }} 
                                        onChange={this.handleChangeSelect.bind(this,'brandId')}>
                                        {
                                            this.props.BrandList.map((item)=>{
                                                return(
                                                    <Option key={item.id} value={item.id}>{item.brand}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>

                                <div>

                                    <div className='_title'>请选择唯一方式</div>
                                    <Select 
                                        value={this.state.uniqueType?this.state.uniqueType:undefined} 
                                        name="uniqueType" 
                                        placeholder="请选择合作方式" 
                                        style={{ width: 330 }} 
                                        onChange={this.handleChangeSelect.bind(this,'uniqueType')}>
                                        <Option key={1} value={1}>{"名称唯一"}</Option>
                                        <Option key={2} value={2}>{"名称型号唯一"}</Option>
                                        <Option key={3} value={3}>{"名称规格唯一"}</Option>
                                        <Option key={4} value={4}>{"名称规格型号唯一"}</Option>
                                    </Select>

                                </div>

                            </div>
                            
                            <div className='_title'>请输入商品简称</div> 
                            <Input 
                                    value={this.state.shortName} 
                                    name="shortName"
                                    onChange={this.handleChangeValue.bind(this)}                                    
                                    placeholder="请输入商品简称" />

                            <div className='_title'>请输入商品计量单位，例如：个，辆，斤，箱等</div>
                            <Input 
                                    value={this.state.unitName} 
                                    name="unitName"
                                    onChange={this.handleChangeValue.bind(this)}                                    
                                    placeholder="请输入商品计量单位，例如：个，辆，斤，箱等" />

                            <div className="itemWrapper">
                                        
                                <div>
                                    <div className='_title'>请输入商品型号</div> 
                                    <Input
                                        style={{ width: 330 }}  
                                        value={this.state.model} 
                                        name="model"       
                                        onChange={this.handleChangeValue.bind(this)}                                
                                        placeholder="请输入商品型号" /> 
                                </div> 

                                <div>
                                    <div className='_title'>请输入商品规格说明</div> 
                                    <Input
                                        style={{ width: 330 }}  
                                        value={this.state.specification} 
                                        name="specification"
                                        onChange={this.handleChangeValue.bind(this)}   
                                        placeholder="请输入商品规格说明" />  
                                </div>

                            </div>

                            
                            
                            <div className='_title'>请输入条形码</div>
                                    <Input 
                                        // style={{ width: 330 }} 
                                        value={this.state.barCode} 
                                        name="barCode"
                                        onChange={this.handleChangeValue.bind(this)}   
                                        placeholder="请输入条形码" /> 

                            

                        </div>
                    </div>
                </Modal>
          </div>
        )
    }
}

export default immutableRenderDecorator(component)