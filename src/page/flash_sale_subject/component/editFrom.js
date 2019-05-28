import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
import moment from 'moment';
import { DatePicker } from 'antd';
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            show_starttime:null,
            sale_starttime:null,
            sale_endtime:null
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.record && !this.state.show_starttime && nextProps.visible){
            this.setState({
                show_starttime:this.props.record.show_starttime,
                sale_starttime:this.props.record.sale_starttime,
                sale_endtime:this.props.record.sale_endtime,
            },()=>{
                console.log(this.state.show_starttime);
            })
        }
    }
    handleOk = () => {
        for(let key in this.state){
            if(!this.state[key]){
                this.antdComponent.message.info('请输入完整的信息');
                return
            }
        }
        let obj = Object.assign({},this.state) ;
        obj['id'] = this.props.record.id;
        obj['record_status'] = 1;
        obj['giftids'] = this.props.record.giftids;
        this.gob.aspPost('management/flash_sale/flash_sale_subject/Update',obj).then(res=>{
            if(res.data.Code == '10000'){
                this.props.getList();
                this.props.hideModel();
            }else{
                this.antdComponent.message.info(res.data.Msg);
            }
        })
    }
    handleCancel = () => {
        this.props.hideModel()
    }  
    handleStartOpenChange = (name,value,valueString) => {
        // this.onChange('startValue', value);
        var obj = {};
        obj[name] = valueString;
        this.setState(obj);
    }
    render(){
        return(
            <div>
                <Modal title="编辑"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div className='_title'>展示开始时间</div>
                    <DatePicker
                     showTime
                     style={{width:330}}
                     format="YYYY-MM-DD HH:mm:ss"
                     placeholder="请选择展示开始时间"
                     defaultValue={moment(this.state.show_starttime, 'YYYY-MM-DD HH:mm:ss')}
                     onChange={this.handleStartOpenChange.bind(this,'show_starttime')}
                    />
                    <div className='_title'>上架开始时间</div>
                    <DatePicker
                     showTime
                     style={{width:330}}
                     format="YYYY-MM-DD HH:mm:ss"
                     placeholder="请选择开抢时间"
                     defaultValue={moment(this.state.sale_starttime, 'YYYY-MM-DD HH:mm:ss')}
                     onChange={this.handleStartOpenChange.bind(this,'sale_starttime')}
                    />
                    <div className='_title'>结束时间</div>
                    <DatePicker
                     showTime
                     style={{width:330}}
                     format="YYYY-MM-DD HH:mm:ss"
                     placeholder="请选择结束时间"
                     defaultValue={moment(this.state.sale_endtime, 'YYYY-MM-DD HH:mm:ss')}
                     onChange={this.handleStartOpenChange.bind(this,'sale_endtime')}
                    />
                </Modal>
          </div>
        )
    }
}