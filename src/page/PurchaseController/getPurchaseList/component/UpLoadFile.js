import React, { Component ,Fragment} from 'react'
import { Button ,Modal} from 'antd'
import axios from 'axios'
import { Empty } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
class ClassName extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            fileUrl:null,
            fileName:null,
            param:null,
            errorMessage:[]
        }
    }
    handleOk(){
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
                    if(res.data.data.errorMessage[0].msg){
                        let ary = [];
                        for(let key in res.data.data.errorMessage){
                            let obj = {}
                            obj['row'] = res.data.data.errorMessage[key].rownum;
                            obj['msg'] = res.data.data.errorMessage[key].msg;
                            ary.push(obj);
                        }
                        this.setState({
                            errorMessage:ary
                        },()=>{
                            this.props.getList()
                        })
                        // this.antdComponent.message.info(`错误行数${res.data.data.errorMessage[0].rownum}`);
                        // this.antdComponent.message.info(res.data.data.errorMessage[0].msg);
                    }
                }else{
                    this.antdComponent.message.info(res.data.msg);
                }
          })
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
                headers:{
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
    toggleVisible(){
        this.setState({
            visible:!this.state.visible
        })
    }
    render(){
        return(
            <Fragment>

                <input 
                      onChange={this.uploadFile.bind(this)}
                      type='file' 
                      id='upLoadFile' 
                      style={{display:'none'}} 
                      accept='application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
                </input>
                
                <Modal 
                    okText='点击确认上传'
                    title="上传采购商品"
                    width={350}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.toggleVisible.bind(this)}>
                    <div className='_title'>请选择批量导入的采购商品信息</div>
                    <Button style={{marginRight:'16px',width:'100%'}}>
                        <label htmlFor='upLoadFile'>
                            {
                                this.state.fileUrl?`已选择：${this.state.fileName}`:'选择文件'
                            }
                        </label>    
                    </Button>
                    <div className='_title'></div>
                    <div className='_title'>采购商品导入信息</div>
                    {
                        this.state.errorMessage.length?
                            this.state.errorMessage.map((item)=>{
                                return <div>
                                            <p style={{marginBottom:8,paddingLeft:16}}>错误行数{item.row}:</p>
                                            <p style={{marginBottom:8,paddingLeft:32}}>错误原因:{item.msg}</p></div>
                            })
                            :<Empty></Empty>
                    }
                </Modal>
                <Button onClick={this.toggleVisible.bind(this)} style={{marginRight:15}}>上传采购商品</Button>
            </Fragment>
        )
    }
}

export default immutableRenderDecorator(ClassName)