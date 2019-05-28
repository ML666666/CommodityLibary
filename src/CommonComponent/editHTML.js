import React, { Component,Fragment } from 'react';
import E from 'wangeditor'
import axios from 'axios';
import { Button } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
class EditHTML extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount () {
      this.initEditor()
      if(this.props.detailHTML){
        this.editor.txt.html(this.props.detailHTML);
      }
   }
   
   initEditor () {
       const elem = this.refs.editorElem
       const editor = new E(elem)
    
       this.editor = editor
    
       editor.customConfig.zIndex = 100
       editor.customConfig.uploadImgServer = ''//文件上传路径
       // 限制一次最多上传 1 张图片
       editor.customConfig.uploadImgMaxLength = 1
       editor.customConfig.customUploadImg =  (files, insert)=>{
         // files 是 input 中选中的文件列表 insert(data.resourceUrl)
         if (files[0]) {
           let file = files[0];           
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
                      this.antdComponent.message.info("上传成功！");
                      insert(res.data.data.dic.picfullpath);
                  }else{
                      this.antdComponent.message.info(res.data.msg);
                  }
            })
         } else {
            this.antdComponent.message.info('請選擇要上傳的圖片')
         }
       }
       editor.customConfig.menus = [
         'head', // 标题
         'bold', // 粗体
         'fontSize', // 字号
         'fontName', // 字体
         'italic', // 斜体
         'underline', // 下划线
         'strikeThrough', // 删除线
         'foreColor', // 文字颜色
         'backColor', // 背景颜色
         'link', // 插入链接
         'list', // 列表
         'justify', // 对齐方式
         'quote', // 引用
         'emoticon', // 表情
         'image', // 插入图片
         'table', // 表格
         'video', // 插入视频
         'code', // 插入代码
         'undo', // 撤销
         'redo' // 重复
       ]
       editor.customConfig.lang = {
         '设置标题': 'Title',
         '字号': 'Size',
         '文字颜色': 'Color',
         '设置列表': 'List',
         '有序列表': '',
         '无序列表': '',
         '对齐方式': 'Align',
         '靠左': '',
         '居中': '',
         '靠右': '',
         '正文': 'p',
         '链接文字': 'link text',
         '链接': 'link',
         '上传图片': 'Upload',
         '网络图片': 'Web',
         '图片link': 'image url',
         '插入视频': 'Video',
         '格式如': 'format',
         '上传': 'Upload',
         '创建': 'init'
       }
       editor.create()
    }
    handleMakeSure(){
      this.props.setHTMLDetail(this.editor.txt.html())
    }
    handleClear(){
       this.editor.txt.html(``);
    }
    handleCanCel(){
      this.props.handleCanCel()
    }
    render(){
        return(
            <Fragment>
              <div style={{width:'375',minHeight:'667'}} ref='editorElem' style={{ textAlign: 'left' }} />
              <div style={{marginTop:'24px'}}>
                <Button type="primary" style={{marginRight:'16px'}} onClick={this.handleMakeSure.bind(this)}>确定</Button>
                <Button style={{marginRight:'16px'}} onClick={this.handleClear.bind(this)}>清空</Button>
                <Button style={{marginRight:'16px'}} onClick={this.handleCanCel.bind(this)}>关闭</Button>
              </div>
            </Fragment>
        )
    }
}

export default immutableRenderDecorator(EditHTML)