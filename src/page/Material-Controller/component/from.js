import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
import { Select } from 'antd'
import axios from 'axios';
const Option = Select.Option;
export default class From extends Component{
    constructor(props){
        super(props)
        this.state = {
            typeList:[
                '图片(包括jpg，png，gif，psd等)',
                '压缩文件(rar，zip)',
                '文档(doc，docx，dot，pdf，txt)',
                '电子表格(xls，xlsx，ods)'
            ],
            commodityId:null,
            fileName:null,
            materialType:undefined,
            fileType:undefined,
            fileComment:null,
            fileUrl:null
        }
    }
    handleOk = () => {
       for(let k in this.state){
           if(!(this.state[k])){
               this.antdComponent.message.info('请填写完整信息');
               return
           }
       }
       this.gob.post('/updateFileUrl',this.state).then(res=>{
           if(res.data.code == 10000){
               this.antdComponent.message.info(res.data.msg);
               this.props.getList();
               this.props.hideModel();
           }else{
               this.antdComponent.message.info(res.data.msg);
           }
       })
    }
    handleCancel = () => {
        this.props.hideModel()
    }
    handleChange = (e) =>{
        var obj = {}
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    } 
    handleSelect = (name,value) =>{
        var obj = {}
        obj[name] = value;
        this.setState(obj);
    }
    upLoadFile = (e) =>{
        let file = e.target.files[0];           
        let param = new FormData(); 
        let config = {headers:{'Content-Type':'multipart/form-data'}}; 
        param.append('file',file,file.name);
        this.setState({fileName:file.name});
        axios.post('https://gate.ujinbi.com/file_dfs/File/Upload',
            param,
            {
                headers: {
                     'ZhaoQiLai-Token': localStorage.getItem('ZhaoQiLai-Token')
                }
            },
            config).then(res=>{
                if(res.data.code == "10000"){
                    this.setState({
                        fileUrl:res.data.data.dic.picfullpath
                    })
                }else{
                    this.antdComponent.message.info(res.data.msg);
                }
        })
    }
    renderType(type){
        if(type == 1){return 'image/*'};
        if(type == 2){return 'aplication/zip'};
        if(type == 3){return 'application/msword,application/msword,application/xml-dtd,application/pdf,text/plain'};
        if(type == 4){return 'application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'};
    }
    render(){
        return(
            <div>
                <Modal title="添加商品素材"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <input 
                        onChange={this.upLoadFile.bind(this)}
                        style={{'display':'none'}} 
                        id="theFile" 
                        accept={this.renderType(this.state.fileType)} 
                        type="file"></input>
                    <div className='_title'>请输入商品Id</div>
                    <Input  
                        value={this.state.commodityId}
                        onChange={this.handleChange.bind(this)}
                        name='commodityId' 
                        style={{width:'320px'}} 
                        type='text' 
                        placeholder='请输入商品Id'></Input>
                    <div className='_title'>请选择素材类型</div>
                    <Select 
                        value={this.state.materialType}
                        onChange={this.handleSelect.bind(this,'materialType')} 
                        name='materialType' 
                        style={{width:'320px'}} 
                        placeholder={'请选择素材类型'}>
                        <Option value={1} key={1}>商品实物id图片</Option>
                        <Option value={2} key={2}>商品销售id图片</Option>
                        <Option value={3} key={3}>商品实物id基础资料</Option>
                        <Option value={4} key={4}>商品销售id资料</Option>
                        <Option value={5} key={5}>其他资料</Option>
                    </Select>
                    <br></br>
                    <div className='_title'>请选择文件类型</div>
                    <Select
                        value={this.state.fileType}
                        onChange={this.handleSelect.bind(this,'fileType')} 
                        name='fileType' 
                        style={{width:'320px'}} 
                        placeholder={'请选择文件类型'}>
                        {
                            this.state.typeList.map((item,index)=>{
                                return(
                                    <Option key={index+1} value={index+1}>{item}</Option>
                                )
                            })
                        }
                    </Select>
                    {
                       !isNaN(this.state.fileType)?
                        <Button style={{marginBottom:'15px',width:'320px'}}>
                           <label htmlFor='theFile'>请选择{this.state.typeList[this.state.fileType-1]}</label>
                       </Button>:''
                    }
                    <div className='_title'>请输入商品名称</div>
                    <Input  
                        value={this.state.fileName}
                        onChange={this.handleChange.bind(this)}
                        name='fileName' 
                        style={{width:'320px'}} 
                        type='text' 
                        placeholder='请输入商品名称'></Input> 
                    <div className='_title'>请输入文件说明</div>
                    <Input  
                        value={this.state.fileComment}
                        onChange={this.handleChange.bind(this)}
                        name='fileComment' 
                        style={{width:'320px'}} 
                        type='text' 
                        placeholder='请输入文件说明'></Input>
                </Modal>
          </div>
        )
    }
}