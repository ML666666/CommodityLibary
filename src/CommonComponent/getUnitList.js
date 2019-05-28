import React , { Component,Fragment } from 'react'
import { Select } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
const Option = Select.Option;
class GetUnitList extends Component {
    constructor(props){
        super(props)
        this.state = {
            unitList:[]
        }
    }
    componentDidMount(){
        this.getUnitList();
    }
    getUnitList(){
        this.gob.get('/sale/getUnits').then(res=>{
            this.setState({
                unitList:res.data.data
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
                       placeholder="请选择销售渠道" 
                       value={this.props.id?this.props.id:undefined} 
                       style={{ width: this.props.width?this.props.width:'220' }} 
                       onChange={this.props.handleChangeSelect}>
                       {
                         this.state.unitList.map((item)=>{
                           return(
                             <Option key={item.id} value={item.id}>{item.unitName}</Option>
                           )
                         })
                       }
            </Select>
        )
    }
}

export default immutableRenderDecorator(GetUnitList)