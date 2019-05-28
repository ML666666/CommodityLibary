import React, { Component,Fragment } from 'react';
import { Table, Icon ,message,Button,Select,Input,Popconfirm} from 'antd';
import From from './component/from';
import SelfBreadcrumb from '../../CommonComponent/selfBreadcrumb'
import CheckImg from '../../CommonComponent/CheckImg/CheckImg'
const Option = Select.Option;

 
export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.columns = [{
          title: '序号',
          dataIndex: 'id',
          key: 'id',
          render: text => <a href="#">{text}</a>,
        }, {
          title: '商品ID',
          dataIndex: 'commodityId',
          key: 'commodityId',
        }, {
          title: '文件名',
          dataIndex: 'fileName',
          render: (text, record) => {
            if(record.fileType == 1){
              return(
                <CheckImg ImgName={record.fileName} URL={record.fileUrl}></CheckImg>
              )
            }else{
              return(
                 <a href={record.fileUrl}>{record.fileName}</a>
              )
            }
          },
        }, 
        {
          title: '类型',
          dataIndex: 'fileType',
          key: 'fileType',
          render: text => {
            if(text == 1){
                return(<span>{'图片包括(jpg，png，gif，psd等)'}</span>)
            }
            if(text == 2){
                return(<span>{'压缩文件(rar，zip)'}</span>)
            }
            if(text == 3){
                return(<span>{'文档(doc，docx，odt，pdf，txt)'}</span>)
            }
            if(text == 4){
                return(<span>{'电子表格(xsl，xslx，ods)'}</span>)
            }
          },
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
        },{
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span className="Table_control_Wrapper">
              <Popconfirm title="是否删除该记录?" onConfirm={this.deleteGroup.bind(this,record)}  okText="Yes" cancelText="No">
                  <a style={{marginRight:'10px'}} href="javascript:void">删除</a>
              </Popconfirm>
            </span>
          ),
      }]
        this.state = {
          loading:true,
          visible:false,
          materialType:null,
          commodityId:null,
          list:[],
          pageIndex:1,
          pageCount:10
        }
    }
    ChangePageTips(page, pageSize){
      this.setState({
        pageIndex:page
      },()=>{
        this.getList()
      })
    }
    deleteGroup(record){
      var obj = {materialId:record.id};
      this.gob.post('/deleteMaterial',obj).then(res=>{
          if(res.data.code == 10000){
            message.info('删除成功');
            this.getList()
          }else{
            message.info(res.data.msg);
          }
      })  
    }
    onChangeInput(e){
      this.setState({
        commodityId:e.target.value
      })
    }
    toggleModel(){
      this.setState({
        visible:!this.state.visible
      })
    }
    componentDidMount(){
      this.getList()
    }
    getList(){
      var obj = {
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount,
      }
      this.gob.get('/queryMaterial',obj).then(res=>{
        if(res.data.code == 10000){
            var ary = res.data.data.list;
            this.setState({
              loading:false,
              list:ary
            })
        }else{
          this.setState({
            loading:false,
            list:[]
          })
          message.info(res.data.msg);
        }
      })
    }
    onChangeType(value){
      this.setState({
        materialType:value
      })
    }
    onSearch(){
      var obj = {
        materialType:this.state.materialType!=0?this.state.materialType:null,
        commodityId:this.state.commodityId?this.state.commodityId:null,
        pageIndex:1,
        pageCount:10000
      }
      this.gob.get('/queryMaterial',obj).then(res=>{
          if(res.data.code == 10000){
              var ary = res.data.data.list;
              this.setState({
                loading:false,
                list:ary
              })
          }else{
            this.setState({
              loading:false,
              list:[]
            })
            message.info(res.data.msg);
          }
      })
    }
    render(){
        return(
            <Fragment>
               <SelfBreadcrumb TabList={['商品素材管理','商品素材查询']}></SelfBreadcrumb>
              <From 
              getList={this.getList.bind(this)}
              visible={this.state.visible} 
              hideModel={this.toggleModel.bind(this)}></From>
               <div className="TopWrapper">
                  <div className="SreachWrapper">
                    <Select placeholder="选择资料类型" style={{ width: 220 }} onChange={this.onChangeType.bind(this)}>
                      <Option value="0">全部类型</Option>
                      <Option value="1">商品实物Id图片</Option>
                      <Option value="2">商品销售Id图片</Option>
                      <Option value="3">商品实物Id资料</Option>
                      <Option value="4">商品销售Id资料</Option>
                      <Option value="5">其他资料</Option>
                    </Select>
                    <div className="InputWrappr">
                      <Input onChange={this.onChangeInput.bind(this)} placeholder="请输入商品Id" />
                    </div>
                    <Button type="primary" onClick={this.onSearch.bind(this)} icon="search">Search</Button>
                  </div>
                  <div className="AddWrapper">
                    <Button onClick={this.toggleModel.bind(this)}>新增商品素材</Button>
                  </div>
               </div>
                <Table  
                    loading={this.state.loading}
                    pagination={false}  
                    columns={this.columns} 
                    dataSource={this.state.list} />
            </Fragment>
        )
    }
}