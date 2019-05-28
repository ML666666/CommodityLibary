import React, { Component,Fragment } from 'react'
import { Button } from 'antd'
import axios from 'axios'
export default class ClassName extends Component{
    constructor(){
        super()
        this.state={
            imageUrl:null,
            fileName:null
        }
    }
    upLoadData(e){
        let file = e.target.files[0];           
        let param = new FormData(); 
        let config = {headers:{'Content-Type':'multipart/form-data'}}; 
        param.append('file',file,file.name);
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
                        imageUrl:res.data.data.dic.picfullpath,
                        fileName:file.name
                    },()=>{
                        this.props.setImg(res.data.data.dic.picfullpath)
                        this.antdComponent.message.info("上传成功！");
                    })
                }else{
                    this.antdComponent.message.info(res.data.msg);
                }
            })
    }
    render(){
        return(
            <Fragment>
                <input 
                        onChange={this.upLoadData.bind(this)} 
                        style={{'display':'none'}} 
                        type='file' 
                        accept="image/*" 
                        id="_Ava" />
               
                    <Button 
                            style={{ width: this.props.width?this.props.width:330 }}>
                             <label  htmlFor="_Ava" >
                                {
                                    this.state.fileName?this.state.fileName:'上传请上传商品图片'
                                }
                             </label>
                    </Button>
            </Fragment>
        )
    }
}