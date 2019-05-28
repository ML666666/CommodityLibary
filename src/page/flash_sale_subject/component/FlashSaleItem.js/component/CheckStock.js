import React, { Component ,Fragment} from 'react';
import {Popover,Empty} from 'antd'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
class componentName extends Component {
    constructor(props){
        super(props)
        this.state = {
            goodStockObj:null
        }
    }
    CheckItemStock(){
        console.log(1)
        let record = this.props.record;
        var obj = {
            itemid:record.id,
        }
        this.gob.aspPost('management/flash_sale/flash_sale_items/GetInfo',obj).then(res=>{
            if(res.data.Code == '10000'){
                this.setState({
                    goodStockObj:res.data.Data
                })
            }
        })
    }
    StockDetail(){
        if(this.state.goodStockObj){
            return(
                <Fragment>
                    <p style={{marginBottom:5}}>总库存:{this.state.goodStockObj.Stock}</p>
                    <p style={{marginBottom:5}}>冻结库存:{this.state.goodStockObj.LockStock}</p>
                </Fragment>
            )
        }else{
            return(
                <Fragment>
                    <Empty></Empty>
                </Fragment>
            )
        }
    }
    render(){
        return(
            <Popover 
                content={this.StockDetail()}
                placement="left"
                title="查看库存"
                onVisibleChange={(visible) =>{
                    if(visible){
                       this.CheckItemStock()
                    }
                }}
                >
                    <a href='javascript:void(0)'>查看库存</a>
            </Popover>
        )
    }
}

export default immutableRenderDecorator(componentName)