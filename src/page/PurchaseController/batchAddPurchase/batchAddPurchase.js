import React, { Component } from 'react'
import { Button } from 'antd'
import axios from 'axios'
import SelfBreadcrumb from '../../../CommonComponent/selfBreadcrumb'
export default class componentName extends Component {
  constructor(props){
      super(props)
      this.state = {
        fileUrl:null,
        fileName:null,
        param:null
      }
  }  
  uploadFile(e){
    let file = e.target.files[0];           
    let param = new FormData(); 
    let config = {headers:{'Content-Type':'multipart/form-data'}}; 
    param.append('file',file,file.name);
    this.setState({
        fileName:file.name,
        param:param
    });
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
                    fileUrl:res.data.data.dic.picfullpath,
                    fileName:file.name
                })
            }else{
                this.antdComponent.message.info(res.data.msg);
            }
    })
  }
  makeSureFile(){

      if(!this.state.fileUrl){
        this.antdComponent.message.info('请先选择文件');  
        return
      }
      let config = {headers:{'Content-Type':'multipart/form-data'}}; 
      axios.post(`${this.gob.getWebUrl()}/batchAddPurchase`,
        this.state.param,
        config).then(res=>{

            if(res.data.code == 10000){
                this.antdComponent.message.info(res.data.msg);
            }else{
                this.antdComponent.message.info(res.data.msg);
                if(res.data.data.errorMessage[0].msg){
                    this.antdComponent.message.info(`错误行数${res.data.data.errorMessage[0].rownum}`);
                    this.antdComponent.message.info(res.data.data.errorMessage[0].msg);
                    return
                }
            }
      })
  }
  render() {
    return (
      <div style={{padding:'24'}}>
        <SelfBreadcrumb TabList={['销售商品管理','导入采购商品信息']}></SelfBreadcrumb>

        <input 
            onChange={this.uploadFile.bind(this)}
            type='file' 
            id='upLoadFile' 
            style={{display:'none'}} 
            accept='application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
        </input>

        <div className='_title'>请选择批量导入的采购商品信息</div>

        <Button style={{marginRight:'16px'}}>
            <label htmlFor='upLoadFile'>
                选择文件
            </label>    
        </Button>
        <Button onClick={this.makeSureFile.bind(this)}>
                {/* 确认批量导入采购商品信息 */}
                {
                    this.state.fileUrl?`已选择：${this.state.fileName}`:'确认批量导入采购商品信息'
                }
        </Button>
            {/* <div className='_title'></div>
            <div className='_title'>商品信息导入成功，总计导入24个商品。</div>
            <div className='_title'>商品信息导入成功20个，失败4个，<a href='javascript:void(0)'>点击下载结果文档查看明细</a></div>     */}
      </div>
    )
  }
}
