import React, { Component } from 'react';
import { Modal, Button,Input,Select,message } from 'antd';
const Option = Select.Option;
// #40a9ff
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            classId:null,
            subClassId:null,
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
            image:"",
            barCode:null,
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible){
            for(let key in this.state){
                if(this.props.recordItem[key]){
                    var obj = {};
                    obj[key] = this.props.recordItem[key]
                    this.setState(obj)
                }
            }
        }
    }
    handleOk = () => {
        var obj = {}
        for(let v in this.state){
            if(this.state[v] && v != 'entityId'){
                obj[v] = this.state[v]
            }else{
                this.antdComponent.message.info('请填写完整信息');
                return
            }
        }
        obj['id'] = this.props.recordItem.id;
        this.gob.post('/entity/editCommodityEntity',obj).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info(res.data.msg);
                this.props.getList();
                this.props.hideModel();
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
        this.setState(obj)
    }
    setImg(value){
        this.setState({
            image:value
        })
    }
    getClassId(value,selectedOptions){
        if(selectedOptions[0]){
            this.setState({
                 classId:selectedOptions[0].value
            })
        }
        if(selectedOptions[1]){
            this.setState({
                 subClassId:selectedOptions[1].value
            })
        }
      }   
    render(){
        
        let UpLoadImg = this.gobComponet.UpLoad;
        let TheCascader = this.gobComponet.TheCascader;
        let GetBrandList = this.gobComponet.GetBrandList;
        let GetSupplier = this.gobComponet.GetSupplierId;

        return(
            <div>
                <Modal title="编辑商品实物"
                    width="1080px"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div id={'EntitiesFrom'}>
                        <div className='inputWrapper'>
                            <div className="itemWrapper">
                                <GetBrandList 
                                    disabled={true}
                                    width={278}
                                    id={this.state.brandId}></GetBrandList>
                                <GetSupplier
                                    disabled={true}
                                    width={278}
                                    id={this.state.supplierId}></GetSupplier>
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
                                    value={this.state.unitName}
                                    onChange={this.handleChangeValue.bind(this)}
                                    name="unitName" 
                                    placeholder="请输入商品单位" />
                            <Input  
                                    value={this.state.barCode}
                                    onChange={this.handleChangeValue.bind(this)}
                                    name="barCode" 
                                    placeholder="请输入商品条码" />   
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
                            <TheCascader
                                    disabled={true}
                                    defaultValue={[this.state.classId,this.state.subClassId]} 
                                    getClassId={this.getClassId.bind(this)}
                                    width={600}></TheCascader>
                            <Select
                                disabled={true} 
                                value={this.state.commodityType} 
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
                            <UpLoadImg _img={this.state.image} setImg={this.setImg.bind(this)}></UpLoadImg>
                        </label>
                    </div>
                </Modal>
          </div>
        )
    }
}