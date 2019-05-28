import React, { Component,Fragment } from 'react'
import { Popover,Button,Input,message} from 'antd'
export default class componentName extends Component {
    constructor(props){
        super(props)
        this.state = {
            specification:null,
            handleChangeValue:null,
            setSpecificationVisible:null,
            specificationId:null
        }
    }
    componentDidMount(){
        if(this.store.getState().CommoditySaleObj){
            let record = this.store.getState().CommoditySaleObj;
            this.gob.post('/getSpecification',{saleId:record.id}).then(res=>{
                let getSpecificationRes  = res.data.data;
                this.setState({
                    specificationId:getSpecificationRes.id,
                    specification:getSpecificationRes.specification,
                    specificationValue:getSpecificationRes.specificationValue,
                },()=>{
                    this.props.setSpecificationId(this.state.specificationId);
                })
            })
        }
        
    }
    toggleMoDel(name){
        var obj = {};
        obj[name] = !this.state[name];
        this.setState(obj)
    }
    handleChangeValue(e){
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }
    MakeSureSetSpecification(){
        if(!this.state.specification){
            message.info('请输入商品名称');
            return
        }
        if(!this.state.specificationValue){
            message.info('请输入商品取值');
            return
        }
        var obj = {
            specification:this.state.specification,
            specificationValue:this.state.specificationValue
        }
        this.gob.post('/setSpecification',obj).then(res=>{
            if(res.data.code == 10000){
                this.setState({
                    specificationId:res.data.data.id,
                    setSpecificationVisible:false
                },()=>{
                    this.props.setSpecificationId(this.state.specificationId);
                })
            }
        })
   }
   setSpecification(){
        return(
            <div>
                <div className='_title'>请设置销售商品名称</div>
                    <Input
                        onChange={this.handleChangeValue.bind(this)}
                        value={this.state.specification} 
                        name='specification' 
                        placeholder="请输入规格名称" 
                        style={{width:'270px',marginBottom:'16px'}}></Input>
                <div className='_title'>请设置销售商品规格取值</div>
                    <Input
                        onChange={this.handleChangeValue.bind(this)}
                        value={this.state.specificationValue}  
                        name='specificationValue' 
                        placeholder="请输入规格取值" 
                        style={{width:'270px',marginBottom:'16px'}}></Input>
                <div className='_title'></div>
                    <Button 
                        style={{marginRight:'16px'}}
                        onClick={this.MakeSureSetSpecification.bind(this)} type="primary">确认设置商品规格</Button>
                    <Button 
                        onClick={this.toggleMoDel.bind(this,'setSpecificationVisible')}>取消</Button>
            </div>
        )
  }
  render() {
    return (
      <Fragment>
        <Popover 
                content={this.setSpecification()}
                visible={this.state.setSpecificationVisible} 
                title="设置商品规格" trigger="click">
                    <Button
                        onClick={this.toggleMoDel.bind(this,'setSpecificationVisible')} 
                        style={{marginRight:10}}>
                        {this.state.specificationId?`设置商品规格成功，当前规格Id为:${this.state.specificationId}`:'设置商品规格'}
                    </Button>
        </Popover>
      </Fragment>
    )
  }
}
