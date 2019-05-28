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
    handleOk = () => {
        for(let key in this.state){
            if(!this.state[key]){
                this.antdComponent.message.info('请输入完整的信息');
                return
            }
        }
        let obj = Object.assign({},this.state) ;
        obj['id'] = 0;
        obj['record_status'] = 1;
        this.gob.aspPost('management/flash_sale/flash_sale_subject/Add',obj).then(res=>{
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
                <Modal title="添加"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div className='_title'>展示开始时间</div>
                    <DatePicker
                     showTime
                     style={{width:330}}
                     format="YYYY-MM-DD HH:mm:ss"
                     placeholder="请选择展示开始时间"
                     onChange={this.handleStartOpenChange.bind(this,'show_starttime')}
                    />
                    <div className='_title'>上架开始时间</div>
                    <DatePicker
                     showTime
                     style={{width:330}}
                     format="YYYY-MM-DD HH:mm:ss"
                     placeholder="请选择开抢时间"
                     onChange={this.handleStartOpenChange.bind(this,'sale_starttime')}
                    />
                    <div className='_title'>结束时间</div>
                    <DatePicker
                     showTime
                     style={{width:330}}
                     format="YYYY-MM-DD HH:mm:ss"
                     placeholder="请选择结束时间"
                     onChange={this.handleStartOpenChange.bind(this,'sale_endtime')}
                    />
                </Modal>
          </div>
        )
    }
}