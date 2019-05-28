import React, { Component,Fragment } from 'react';
import { Select } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
const Option = Select.Option;
class GetBrandList extends Component{
    constructor(props){
        super(props)
        this.state = {
            BrandList:[]
        }
    }
    componentDidMount(){
      this.getBrandList();
    }
    getBrandList(){
        var obj = {
          pageIndex:0,
          pageCount:10000
        }
        var _this = this;
        this.gob.get('/getBrandList',obj).then(res=>{
            if(res.data.code == 10000){
              this.setState({
                BrandList:res.data.data.list.filter((item)=>{
                  return item.recordStatus != 3;
                })
              })
              if(this.props.initList){
                this.props.initList(res.data.data.list.filter((item)=>{
                  return item.recordStatus != 3;
                }))
              }
            }
        })
    }
    render(){
        return(
            <Select     
                        disabled={this.props.disabled?true:false}
                        value={this.props.id?this.props.id:this.props.id==0?0:undefined}
                        name="brandId" 
                        placeholder="请选择品牌"
                        onChange={this.props.handleChangeSelect} 
                        style={{ width: this.props.width?this.props.width:220 }}> 
                        <Option key={0} value={0}>{"全部"}</Option>
                        {
                         this.state.BrandList.map((item)=>{
                           return(
                             <Option key={item.id} value={item.id}>{item.brand}</Option>
                           )
                         })
                        }
            </Select>
        )
    }
}

export default immutableRenderDecorator(GetBrandList)