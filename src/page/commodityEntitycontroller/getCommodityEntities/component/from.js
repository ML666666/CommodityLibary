import React, { Component } from 'react';
import { Modal, Button,Input,message,Select } from 'antd';
const Option = Select.Option;
// #40a9ff
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            classId:null,
            className:null,
            subClassId:null,
            subClassName:null,
            commodityType:null,
            commodityName:null,
            supplierId:null,
            supplier:null,
            brandId:null,
            brand:null,
            shortName:null,
            usageComment:null,
            unitName:null,
            size:null,
            weight:null,
            image:null,
            barCode:null,
        }
    }
    handleOk = () => {
        var obj = {}
        for(let v in this.state){
            if(this.state[v]){
                obj[v] = this.state[v]
            }else{
                this.antdComponent.message.info('请填写完整信息');
                return
            }
        }
        this.gob.post('/entity/newCommodityEntity',obj).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info(res.data.msg);
                this.props.getList();
                this.props.hideModel();
                for(let v in this.state){
                    var obj = {};
                    obj[v] = null
                    this.setState(obj);
                }
            }else{
                this.antdComponent.message.info(res.data.msg);
            }
        })
    }
    handleChangeValue(e){
        var obj = {}
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }
    handleCancel = () => {
        this.props.hideModel()
    }
    handleChangeSelect(name,value){
        var obj = {};
        obj[name] = value;
        this.setState(obj,()=>{
            if(name == 'classId'){
                let className = this.props.FirstClasses.filter((item)=>{ return value == item.id })[0].className;
                this.setState({
                    className:className
                })
            }
            if(name == 'subClassId'){
                let subClassName = this.props.SecondClasses.filter((item)=>{ return value == item.id })[0].className;
                this.setState({
                    subClassName:subClassName
                })
            }
            if(name == 'brandId'){
                let brand = this.props.BrandList.filter((item)=>{ return value == item.id })[0].brand;
                this.setState({
                    brand:brand
                })
            }
            if(name == 'supplierId'){
                let supplier = this.props.supplierList.filter((item)=>{ return value == item.id })[0].fullName;
                this.setState({
                    supplier:supplier
                })
            }
        })
    }
    handleChangeCommodityType(value){
        this.setState({
            commodityType:value
        });
    }
    setImg(value){
        this.setState({
            image:value
        })
    }  
    render(){
        
        let UpLoadImg = this.gobComponet.UpLoad;

        return(
            <div>

                <Modal title="添加商品实物"
                    width="1080px"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div id={'EntitiesFrom'}>
                        <div className='inputWrapper'>
                            <div className="itemWrapper">
                                <Select 
                                    name="brandId" 
                                    placeholder="请选择品牌" 
                                    style={{ width: 280 }} 
                                    onChange={this.handleChangeSelect.bind(this,'brandId')}>
                                    {
                                        this.props.BrandList.map((item)=>{
                                            return(
                                                <Option key={item.id} value={item.id}>{item.brand}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                <Select 
                                    name="supplierId" 
                                    placeholder="请选择供应商" 
                                    style={{ width: 280 }} 
                                    onChange={this.handleChangeSelect.bind(this,'supplierId')}>
                                    {
                                        this.props.supplierList.map((item)=>{
                                            return(
                                                <Option key={item.id} value={item.id}>{item.fullName}</Option>
                                            )
                                        })
                                    }
                                </Select>    
                            </div>
                            <div className="itemWrapper">
                                <Input 
                                    name="commodityName"
                                    value={this.state.commodityName}
                                    onChange={this.handleChangeValue.bind(this)}
                                    placeholder="请输入商品名称" /> 
                                <Input 
                                    name="shortName"
                                    value={this.state.shortName}
                                    onChange={this.handleChangeValue.bind(this)}
                                    placeholder="请输入简称" />    
                            </div>
                            <Input  
                                    value={this.state.usageComment}
                                    onChange={this.handleChangeValue.bind(this)}
                                    name="usageComment" 
                                    placeholder="请输入商品用途" />
                            <Input  
                                    value={this.state.barCode}
                                    onChange={this.handleChangeValue.bind(this)}
                                    name="barCode" 
                                    placeholder="请输入商品条码" />        
                            <Input 
                                    value={this.state.unitName}
                                    onChange={this.handleChangeValue.bind(this)}
                                    name="unitName" 
                                    placeholder="请输入商品单位" />
                            <div className="itemWrapper">
                                <Input
                                    value={this.state.size}
                                    onChange={this.handleChangeValue.bind(this)} 
                                    name="size"
                                    placeholder="请输入商品尺寸" />
                                <Input
                                    value={this.state.weight}
                                    onChange={this.handleChangeValue.bind(this)} 
                                    name="weight"
                                    placeholder="请输入商品重量" />    
                            </div>
                            <div className="itemWrapper">
                            {/* <Select 
                                name="classId" 
                                placeholder="请选择一级分类" 
                                style={{ width: 280 }} 
                                onChange={this.handleChangeSelect.bind(this,'classId')}>
                                {
                                    this.props.FirstClasses.map((item)=>{
                                        return(
                                            <Option key={item.id} value={item.id}>{item.className}</Option>
                                        )
                                    })
                                }
                            </Select>
                            <Select 
                                name="subClassId" 
                                placeholder="请选择二级级分类" 
                                style={{ width: 280 }} 
                                onChange={this.handleChangeSelect.bind(this,'subClassId')}>
                                {
                                    this.props.SecondClasses.map((item)=>{
                                        return(
                                            <Option key={item.id} value={item.id}>{item.className}</Option>
                                        )
                                    })
                                }
                            </Select>    */}
                            </div>
                            <Select 
                                 placeholder="请选择商品类型" 
                                 style={{ width: 600 }} 
                                 onChange={this.handleChangeSelect.bind(this,'commodityType')}>
                                 <Option key={1} value={1}>{'金币联盟自营实物商品'}</Option>
                                 <Option key={2} value={2}>{'金币联盟自营虚拟商品'}</Option>
                                 <Option key={3} value={3}>{'供应商实物商品'}</Option>
                                 <Option key={4} value={4}>{'供应商虚拟商品'}</Option>
                                 <Option key={5} value={5}>{'跨境商品'}</Option>
                            </Select> 
                        </div>
                        <label className="UpLoadImg">
                            <UpLoadImg _img={this.state.image}  setImg={this.setImg.bind(this)}></UpLoadImg>
                        </label>
                    </div>
                </Modal>
          </div>
        )
    }
}