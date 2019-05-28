import React, { Component,Fragment } from 'react';
import { Select } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
const Option = Select.Option;
class GetFirstClass extends Component{
    constructor(props){
        super(props)
        this.state = {
            SecondClasses:[]//一级分类列表
        }
    }
    componentDidMount(){
        this.getSecondClass();
    }
    getSecondClass(){
        this.gob.get('/class/getSecondClasses').then(res=>{
          this.setState({
               SecondClasses:res.data.data
          })
          if(this.props.initList){
             this.props.initList(res.data.data)
          }
        })
    }
    render(){
        return(
            <Select     
                       disabled={this.props.disabled?true:false}
                       value={this.props.id?this.props.id:this.props.id==0?0:undefined}
                       placeholder="请选择二级分类" 
                       style={{ width: this.props.width?this.props.width:220}} 
                       onChange={this.props.handleChangeSelect}>
                       {
                           this.props.isShowNotAll?null:<Option key={0} value={0}>{"全部"}</Option>
                       } 
                       {
                         this.state.SecondClasses.map((item)=>{
                           return(
                             <Option key={item.id} value={item.id}>{item.className}</Option>
                           )
                         })
                       }
            </Select>
        )
    }
}

export default immutableRenderDecorator(GetFirstClass)