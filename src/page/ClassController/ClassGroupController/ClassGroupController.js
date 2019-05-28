import React, { Component,Fragment } from 'react';
import { Table,Input, Icon,Popconfirm,Pagination,Button,Select} from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
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
          loading:true
        }
        this.columns = [{
          title: '分类组ID',
          dataIndex: 'id',
          key: 'id',
          render: text => <a href="#">{text}</a>,
        }, {
          title: '分类名称',
          dataIndex: 'groupName',
          key: 'groupName',
        }, {
          title: '分类组说明',
          dataIndex: 'groupComment',
          key: 'groupComment',
          render: text => {
            if(text){
              return(
                <span>{text}</span>
              )
            }else{
              return(
                <span>暂无数据</span>
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
                  <a  href="javascript:void">删除</a>
               </Popconfirm> 
            </span>
          ),
      }]
    }
    getList(){
      this.gob.get('/classGroup/getClassGroups').then(res=>{
        this.setState({
          loading:false,
          list:res.data.data
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
    editClassGroup(record){
      this.setState({
        recordObj:record,
      },()=>{
        this.setState({
          visible:true
        })
      })
    }
    componentDidMount(){
      this.getList()
    }
    deleteClassGroup(record){
      this.gob.post('/classGroup/deleteClassGroup',{groupId:record.id}).then(res=>{
          if(res.data.code == 10000){
            this.getList();
            this.antdComponent.message.info(res.data.msg);
          }else{
            this.antdComponent.message.info(res.data.msg);
          }
      })
    }
    showModel(){
        this.setState({
          recordObj:null,
        },()=>{
          this.setState({
            visible:true
          })
        })
    }
    hideModel(){
      this.setState({
        visible:false
      })
    }
    render(){
        return(
            <Fragment>
              <SelfBreadcrumb TabList={['商品分类管理','添加商品分类组']}></SelfBreadcrumb>
              <From
               getList={this.getList.bind(this)} 
               visible={this.state.visible}
               recordObj={this.state.recordObj} 
               hideModel={this.hideModel.bind(this)}></From>
               <div  className="TopWrapper">
                  <div className="SreachWrapper">
                  </div>
                  <div className="AddWrapper">
                    <Button onClick={this.showModel.bind(this)} icon="plus">添加分类组</Button>
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