import React, { Component,Fragment } from 'react';
import { Table, Icon,Pagination,Button,Select,Input,message} from 'antd';
import From from './component/from';
import UpDataFrom from './component/upDataFrom';
import ExamineDataFrom from './component/ExamineDataFrom';
const Option = Select.Option;

export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.columns = [{
          title: 'id',
          dataIndex: 'id',
          key: 'id',
        }, {
          title: '商品名称',
          dataIndex: 'commodityName',
          key: 'commodityName',
        }, {
          title: '渠道',
          dataIndex: 'unitName',
          key: 'unitName',
        }, 
        {
          title: '价格',
          dataIndex: 'cash',
          key: 'cash',
        },
       {
          title: '积分',
          dataIndex: 'points',
          key: 'points',
        }, 
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
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
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span className="Table_control_Wrapper">
              {/* <a href="JavaScript:void(0)" onClick={this.showUpdataModel.bind(this,record,'upDataVisible')} style={{marginRight:'10px'}}>编辑</a> */}
              {
                record.status=='未审核'? <a href="JavaScript:void(0)" onClick={this.showUpdataModel.bind(this,record,'ExamineVisible')}  >审核价格</a>:''
              } 
            </span>
          ),
        }];
      
        this.state = {
          ExamineVisible:false,
          visible:false,
          upDataVisible:false,
          tItem:null,
          pageIndex:1,
          pageCount:10,
          list:[],
          totalLows:null,   
          classId:null,
          subClassId:null,
          commodityName:null,
          loading:true,
          reviewStatus:null
        }
    }
    ChangePageTips(page, pageSize){
      this.setState({
        pageIndex:page
      },()=>{
        this.getList()
      })
    }
    componentDidMount(){
      this.getList();
    }
    getList(){
      var obj = {
        classId:this.state.classId?this.state.classId:null,
        subClassId:this.state.subClassId?this.state.subClassId:null,
        commodityName:this.state.commodityName?this.state.commodityName:null,
        reviewStatus:this.state.reviewStatus?this.state.reviewStatus:null,
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount
      }
      this.gob.get('/sale/getCommoditySalePrices',obj).then(res=>{
          if(res.data.code == 10000){
            this.setState({
              loading:false,
              list:res.data.data.list,
              totalLows:res.data.data.total
            })
          }else{  
            message.info(res.data.msg);
          }
      })
    }
    getClassId(value,selectedOptions){
      if(selectedOptions[0]){
          this.setState({
            classId:selectedOptions[0].value
          })
      }
      if(selectedOptions[1]){
          this.setState({
            subClassId:selectedOptions[1].value
          })
      }else{
        this.setState({
          subClassId:null
        })
      }
    }
    handleChangeSelect(name,value){
      var obj = {};
      obj[name] = value;
        this.setState(obj);
    }
    handleChangeValue(e){
      var obj = [];
      obj[e.target.name] = e.target.value;
      this.setState(obj);
    }
    showModel(){
        this.setState({visible:true})
    }
    showUpdataModel(item,name){
      this.setState({tItem:item},
           ()=>{name == 'upDataVisible'?
                         this.setState({upDataVisible:true}):
                         this.setState({ExamineVisible:true})})
    }
    hideModel(){
      this.setState({
        upDataVisible:false,
        visible:false,
        ExamineVisible:false,
      })
    }
    render(){
      let SelfBreadcrumb = this.gobComponet.SelfBreadcrumb;
      let TheCascader = this.gobComponet.TheCascader;

        return(
            <Fragment>

              <SelfBreadcrumb TabList={['销售商品管理','销售商品价格管理']}></SelfBreadcrumb>

              <From 
                getList={this.getList.bind(this)}
                visible={this.state.visible} 
                hideModel={this.hideModel.bind(this)}></From>

              <UpDataFrom
                tItem={this.state.tItem}
                getList={this.getList.bind(this)}
                visible={this.state.upDataVisible} 
                hideModel={this.hideModel.bind(this)}>
              </UpDataFrom>

              <ExamineDataFrom
                tItem={this.state.tItem}
                getList={this.getList.bind(this)}
                visible={this.state.ExamineVisible} 
                hideModel={this.hideModel.bind(this)}>
              </ExamineDataFrom>
              
               <div className="TopWrapper">
                  <div className="SreachWrapper">

                    <TheCascader 
                        isSelectAll={true} 
                        marginRight={15}
                        width={246} 
                        getClassId={this.getClassId.bind(this)}></TheCascader>

                    
                    <Select
                        name="reviewStatus" 
                        placeholder="请选择状态"
                        onChange={this.handleChangeSelect.bind(this,'reviewStatus')} 
                        style={{ width: 220 }}> 
                        <Option key={0} value={0}>{'全部状态'}</Option>
                        <Option key={1} value={1}>{'待审核'}</Option>
                        <Option key={2} value={2}>{'价格驳回'}</Option>
                        <Option key={3} value={3}>{'审核通过'}</Option>
                        <Option key={4} value={4}>{'取消审核'}</Option>
                    </Select>

                    <div className="InputWrappr">
                      <Input name='commodityName' onChange={this.handleChangeValue.bind(this)} placeholder="请输入商品名称" />
                    </div>

                    <Button type="primary" onClick={this.getList.bind(this)} icon="search">Search</Button>
                      
                  </div>
                  <div className="AddWrapper">
                    {/* <a style={{'marginRight':10}} href="javascript:void">编辑</a>
                    <a href="javascript:void">删除</a> */}
                    {/* <Button onClick={this.showModel.bind(this)}>添加商品实物价格</Button> */}
                  </div>

               </div>
                <Table  
                  loading={this.state.loading}
                  pagination={false}  
                  columns={this.columns} 
                  dataSource={this.state.list} />
                <Pagination
                    onChange={this.ChangePageTips.bind(this)}
                    total={this.state.totalLows}
                    showTotal={total => (<div className="pageTips">{`总${total}条数据 `}</div>)}
                    pageSize={this.state.pageCount}
                    defaultCurrent={1}
                />
            </Fragment>
        )
    }
}