import React, { Component } from 'react'
import {Icon,Input,Button,message} from 'antd'
export default class componentName extends Component {
  constructor(props){
      super(props)
      this.state = {
        EntityList:[],
        EntityId:null,
        num:null,
      }
  }
  componentDidMount(){
    let record = this.store.getState().CommoditySaleObj
    if(this.store.getState().CommoditySaleObj){
        this.gob.get('/sale/getRefEntityAndSale',{saleId:record.id}).then(res=>{
            let getRefEntityAndSaleRes = res.data.data;
            getRefEntityAndSaleRes.map((item)=>{
                var obj = {};
                obj.id = item.entityId;
                obj.num = item.entityQuantity;
                obj.commodityName = item.commodityName;
                this.state.EntityList.push(obj);
            })
            this.renderEntityIdAndNumber()

        })
    }
  }
  renderEntityIdAndNumber(){
    this.setState({
        EntityList:this.state.EntityList,
        num:null,
        EntityId:null,
    },()=>{
        var _s = ''
        this.state.EntityList.map((item,index)=>{
            _s += `${item.id}-${item.num},`
        })
        this.props.setEntityIdAndNumber(_s.substring(0,_s.length-1));
    })
  }
  handleChangeValue(e){
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
  }
  getEntityId(){
    if(!this.state.EntityId){
        message.info('请填写实物ID');
        return
    }
    if(!this.state.num){
        message.info('请填写数量');
        return
    }
    var obj = {
        entityId:this.state.EntityId
    }
    this.gob.get('/entity/getCommodityEntitiy',obj).then(res=>{
        if(res.data.code == 10000){

            for(let i=0; i<this.state.EntityList.length; i++){                  
                if(this.state.EntityList[i].id == this.state.EntityId){
                    this.state.EntityList[i].num = parseInt(this.state.EntityList[i].num) + parseInt(this.state.num);
                    this.renderEntityIdAndNumber()
                    return
                }
            }

            var obj = {};
            obj = res.data.data;
            obj.num = this.state.num;
            this.state.EntityList.push(obj);
            this.renderEntityIdAndNumber();

        }else{
            message.info(res.data.msg);
        }            
    })
  }
  delete(index){
    var [...T] = this.state.EntityList;
    T.splice(index,1)
    this.setState({
        EntityList:T
    },()=>{
        this.renderEntityIdAndNumber();
    })
  }
  render() {
    return (
      <div>
        <div className='_title'>销售商品关联实物ID</div>
                <div className='ListContainer'>
                    {
                        this.state.EntityList.map((item,index)=>{
                            return(
                                <div onClick={this.delete.bind(this,index)} key={index}  className='_title'>
                                    <Icon type="close-circle" />
                                    <span>[{item.id}] {item.commodityName} × {item.num}</span>
                                </div>
                            )
                        })
                    }
                </div>
                        <div className='btw'>
                            <div>
                                <Input
                                    value={this.state.EntityId}
                                    onChange={this.handleChangeValue.bind(this)}  
                                    name='EntityId' 
                                    placeholder="请输入实物Id" 
                                    style={{width:'270px'}}></Input>
                            </div>
                            <div>
                                <Input
                                    value={this.state.num}
                                    onChange={this.handleChangeValue.bind(this)}  
                                    name='num' 
                                    placeholder="数量" 
                                    style={{width:'60px'}} ></Input>
                            </div>
                        </div>
                        <div  className='btw'>
                            <Button onClick={this.getEntityId.bind(this)}>新增关联实物Id</Button>
                        </div>
      </div>
    )
  }
}
