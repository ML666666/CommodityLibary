import React, { Component,Fragment } from 'react';
import { Popover,Button } from 'antd';
import $ from 'jquery';
import '../CheckBtn/CheckBtn.css'
export default class ClassName extends Component{
    constructor(props){
        super(props)
        this.state = {
            ChangeStatus:null
        }
        this.content =(
            <Fragment>
                <div className={`item_T_${this.props.record.id}`}>
                    <div onClick={this.toChangeStatus.bind(this,1)}  className="t_T_O_item 1">
                        <span>法务审核通过</span>
                    </div>
                    <div onClick={this.toChangeStatus.bind(this,2)}  className="t_T_O_item 2">
                        <span>财务审核通过</span>
                    </div>
                    <div onClick={this.toChangeStatus.bind(this,4)}  className="t_T_O_item 4">
                        <span>审核驳回需补充资料重新提交审核</span>
                    </div>
                    <div onClick={this.toChangeStatus.bind(this,5)}  className="t_T_O_item 5">
                        <span>审核不通过</span>
                    </div>
                </div>
                <Button 
                        onClick={this.MakeSureChangeStatus.bind(this)}
                        style={{marginTop:8,width:233}}>确认修改</Button>
            </Fragment>
        )   
    }
    toChangeStatus(index){
        this.setState({
            ChangeStatus:index
        },()=>{
            // $(`.item_T_${this.props.record.id}`).removeClass('t_T_O_item_Active');
            $(`.item_T_${this.props.record.id} .${index}`).addClass('t_T_O_item_Active').siblings().removeClass('t_T_O_item_Active');
        })
    }
    MakeSureChangeStatus(){
        // /aud
        // this.antdComponent.message.info(this.props.record.id);
        var obj = {
            id:this.props.record.id,
            supplierStatus:this.state.ChangeStatus,
            userId:JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')).userId:0,
            userName:JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')).userName:'测试名字'
        }
        this.gob.post('/aud',obj).then(res=>{
            if(res.data.code == 10000){
                this.antdComponent.message.info(res.data.msg);
                this.props.getList();
            }else{
                this.antdComponent.message.info(res.data.msg);
            }
        })
    }
    render(){
        return(
          <Popover
            title={'修改状态'}
            okText="Yes"
            cancelText="No"
            content={this.content}
          >
            <a href="javascript:void">审核</a>
          </Popover>  
        )
        
    }
}