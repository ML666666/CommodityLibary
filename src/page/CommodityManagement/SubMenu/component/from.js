import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
export default class From extends Component{
    constructor(props){
        super(props)
    }
    handleOk = () => {
    }
    handleCancel = () => {
        this.props.hideModel()
    }  
    render(){
        return(
            <div>
                <Modal title="Title of the modal dialog"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <Input 
                    ref="getInfo"
                    placeholder="default size" />
                </Modal>
          </div>
        )
    }
}