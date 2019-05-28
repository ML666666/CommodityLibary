import React, { Component,Fragment } from 'react';
import { Select } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
const Option = Select.Option;
class GetSupplierList extends Component{
    constructor(props){
        super(props)
        this.state = {
            supplierList:[]//一级分类列表
        }
    }
    
    componentDidMount(){
        this.getSupplierList();
    }
    getSupplierList(){
        var obj = {
            pageIndex:0,
            pageCount:10000
        }
        this.gob.get('/getSupplierList',obj).then(res=>{
            this.setState({
                supplierList:res.data.code == 10000?res.data.data.list.filter((item)=>{return item.supplierStatus == 3 && item.cooperationStatus == 1}):[]
            },()=>{
                // if(this.props.filtersType){
                //     this.setState({
                //         supplierList:res.data.data.list.filter((item)=>{return item.supplierStatus == this.props.filtersType && item.cooperationStatus == 1})
                //     })
                // }
            }
            )
            if(this.props.initList){
                this.props.initList(res.data.data.list)
            }
        })
    }
    render(){
        return(
            <Select 
                    disabled={this.props.disabled?true:false}
                    value={this.props.id?this.props.id:this.props.id==0?0:undefined}
                    placeholder="请选择供应商"
                    style={{ width: this.props.width?this.props.width:220 }} 
                    onChange={this.props.handleChangeSelect}>
                       {
                           this.props.isShowNotAll&&this.state.supplierList.length?null:<Option key={0} value={0}>{"全部"}</Option>
                       } 
                       {
                         this.state.supplierList.map((item)=>{
                           return(
                             <Option key={item.id} value={item.id}>{item.fullName}</Option>
                           )
                         })
                       }
            </Select>
        )
    }
}

export default immutableRenderDecorator(GetSupplierList)