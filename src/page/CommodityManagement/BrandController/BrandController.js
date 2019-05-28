import React, { Component,Fragment } from 'react';
import { Table,Input, Icon,Popconfirm,Pagination,Button,Select,message} from 'antd';
import From from './component/from'
import SelfBreadcrumb from '../../../CommonComponent/selfBreadcrumb'
const Option = Select.Option;


export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
          visible:false,
          list:[],
          recordObj:null,
          pageIndex:1,
          pageCount:10,
          total:null,
          brand:null,
          brandOwner:null,
          recordStatus:null,
          loading:true
        }
        this.columns = [{
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        }, {
          title: '品牌名称',
          dataIndex: 'brand',
          key: 'brand',
        },
        {
          title: '品牌所属公司',
          dataIndex: 'brandOwner',
          key: 'brandOwner',
        },{
          title: '记录状态',
          dataIndex: 'recordStatus',
          key: 'recordStatus',
          render: text => {
            if(text == 1){
              return(
                <span>正常</span>
              )
            }else{
              return(
                <span>删除</span>
              ) 
            }
          }
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
               <a onClick={this.editClassGroup.bind(this,record)} style={{'marginRight':10}} href="javascript:void">编辑</a>
               <Popconfirm title="是否删除该记录?" onConfirm={this.deleteClassGroup.bind(this,record)}  okText="Yes" cancelText="No">
                <a href="javascript:void">删除</a>
               </Popconfirm> 
            </span>
          ),
      }]
    }
    getList(){
      var obj = {
        brand:this.state.brand?this.state.brand:null,
        brandOwner:this.state.brandOwner?this.state.brandOwner:null,
        recordStatus:parseInt(this.state.recordStatus)?this.state.recordStatus:null,
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount
      }
      this.gob.get('/getBrandList',obj).then(res=>{
        this.setState({
          loading:false,
          list:res.data.data.list,
          total:res.data.data.total
        })
      })
    }
    editClassGroup(record){
      this.setState({
        recordObj:record,
      },()=>{
        this.setState({
          visible:true
        })
      })
    }
    ChangePageTips(page, pageSize){
      this.setState({
        pageIndex:page
      },()=>{
        this.getList()
      })
    }
    componentDidMount(){
      this.getList()
    }
    deleteClassGroup(record){
      let obj = Object.assign({},record);
      obj.recordStatus = 3;
      this.gob.post('/addOrUpdateBrand',obj).then(res=>{
          if(res.data.code == 10000){
            this.getList();
            message.info(res.data.msg);
          }
      })
    }
    showModel(){
        this.setState({
          recordObj:null,
          visible:true
        })
    }
    hideModel(){
      this.setState({
        visible:false
      })
    }
    onChangeType(value){
      this.setState({
        recordStatus:value
      })
    }
    _onChangeInput(e){
      var o = {}
      o[e.target.name] = e.target.value
      this.setState(o);
    }
    render(){
        return(
            <Fragment>
              <SelfBreadcrumb TabList={['商品采购管理','品牌管理']}></SelfBreadcrumb>
              
              <From
               getList={this.getList.bind(this)} 
               visible={this.state.visible}
               recordObj={this.state.recordObj} 
               hideModel={this.hideModel.bind(this)}></From>

               <div  className="TopWrapper">
                  <div className="SreachWrapper">
                    <Select placeholder="请选择记录状态" style={{ width: 160 }} onChange={this.onChangeType.bind(this)}>
                      <Option value={0}>全部类型</Option>
                      <Option value={1}>正常</Option>
                      <Option value={3}>删除</Option>
                    </Select>
                    <div className="InputWrappr">
                      <Input name="brand"  onChange={this._onChangeInput.bind(this)} placeholder="请输入品牌名称" />
                    </div>
                    <div className="InputWrappr">
                      <Input name="brandOwner"  onChange={this._onChangeInput.bind(this)} placeholder="请输入品牌所属公司" />
                    </div>
                    <Button type="primary" onClick={this.getList.bind(this)} icon="search">Search</Button>
                  </div>
                  <div className="AddWrapper">
                    <Button onClick={this.showModel.bind(this)} icon="plus">添加品牌</Button>
                  </div>
               </div>
                <Table 
                    loading={this.state.loading} 
                    pagination={false}  
                    columns={this.columns} 
                    dataSource={this.state.list} />

                <Pagination
                    onChange={this.ChangePageTips.bind(this)}
                    total={this.state.total}
                    showTotal={total => (<div className="pageTips">{`总${total}条数据 `}</div>)}
                    pageSize={10}
                    defaultCurrent={1}
                />
            </Fragment>
        )
    }
}