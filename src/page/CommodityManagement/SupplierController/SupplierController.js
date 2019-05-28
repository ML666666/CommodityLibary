import React, { Component,Fragment } from 'react';
import { Table,Input,Pagination,Button,Select } from 'antd';
import EditFrom from './component/editFrom'
import From from './component/from'
import CheckBtn from './component/CheckBtn/CheckBtn'
import SelfBreadcrumb from '../../../CommonComponent/selfBreadcrumb'
const Option = Select.Option;
  
export default class SupplierController extends Component{

    constructor(props){
        super(props)
        this.state = {
          visible:false,
          pageIndex:1,
          pageCount:10,
          total:null,
          list:[],
          total:0,
          fromObj:null,
          editFrom:false,
          loading:true,
          checkSupplier:false
        }
        this.columns = [{
          title: 'Id',
          dataIndex: 'id',
        }, {
          title: '供应商',
          dataIndex: 'fullName',
        }, {
          title: '类型',
          dataIndex: 'supplierType',
          render: text => {
            if(text == 1){
              return(
                <div>品牌厂商</div>
              )
            }
            if(text == 2){
              return(
                <div>代理商</div>
              )
            }
            if(text == 3){
              return(
                <div>经销商</div>
              )
            }
          },
        }, {
          title: '联系人',
          dataIndex: 'contactPerson',
        }, 
        {
          title: '联系电话',
          dataIndex: 'contactPhone',
        },
        {
          title: '合作时间',
          dataIndex: 'cooperationTime',
        },
        {
          title: '审核状态',
          dataIndex:'supplierStatus',
          render: (text, record) => {
             if(text == 0){
               return (<div>未审核</div>)
             }
             if(text == 1){
               return (<div>法务审核通过</div>)
             }
             if(text == 2){
              return (<div>财务审核通过</div>)
             }
             if(text == 3){
               return (<div>财务法务审核通过</div>)
             }
             if(text == 4){
               return (<div>审核驳回需补充资料重新提交审核</div>)
             }
             if(text == 5){
              return (<div>审核不通过</div>)
            }
          }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
        },
        {
        title: 'action',
        render: (text, record) => (
          <span className="Table_control_Wrapper">
            <a style={{marginRight:8}} onClick={this.reSetForm.bind(this,record,0)} href="javascript:void">编辑</a>
            <CheckBtn getList={this.getList.bind(this)} record={record}></CheckBtn>
          </span>
        )}
       ]
    }

    componentDidMount(){
      this.getList()
    }

    getList(){
      var obj = {
        fullName:this.state.fullName?this.state.fullName:null,
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount
      }
      this.gob.get('/getSupplierList',obj).then(res=>{
        this.setState({
          loading:false,
          list:res.data.data.list,
          total:res.data.data.total
        })
      })
    }

    ChangePageTips(page, pageSize){
      this.setState({pageIndex:page},()=>{this.getList()})
    }

    showModel(){
        this.setState({visible:true})
    }

    hideModel(){
      this.setState({visible:false,editFrom:false,checkSupplier:false})
    }

    reSetForm(obj,status){
      this.setState({
        fromObj:obj
      },()=>{status?this.setState({checkSupplier:true}):this.setState({editFrom:true})})
    }
    
    addModel(){
      this.setState({visible:true,fromObj:null})
    }
    changeInputValue(e){
      var obj = [];
      obj[e.target.name] = e.target.value;
      this.setState(obj);
    }
    render(){
        return(
            <Fragment>

              <SelfBreadcrumb TabList={['商品采购管理','供应商管理']}></SelfBreadcrumb>

              <EditFrom 
                    fromObj={this.state.fromObj}
                    getList={this.getList.bind(this)}
                    visible={this.state.editFrom} 
                    hideModel={this.hideModel.bind(this)}></EditFrom>

              <From 
                    fromObj={this.state.fromObj}
                    getList={this.getList.bind(this)}
                    visible={this.state.visible} 
                    hideModel={this.hideModel.bind(this)}></From>

               <div className="TopWrapper">
                  <div className="SreachWrapper">

                    <div className="InputWrappr">
                      <Input value={this.state.fullName} name="fullName" onChange={this.changeInputValue.bind(this)} placeholder="输入供应商名称" />
                    </div>

                    <Button type="primary" onClick={this.getList.bind(this)} icon="search">查询</Button>

                  </div>
                  <div className="AddWrapper">
                    <Button onClick={this.addModel.bind(this)} icon="plus">新增供应商</Button>
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