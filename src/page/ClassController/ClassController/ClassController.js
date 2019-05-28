import React, { Component,Fragment } from 'react';
import { Table,Icon,Select,Button,Pagination,Input,Popconfirm,message } from 'antd';
import From from './component/from'
import UpdataFrom from './component/updataFrom'
import SelfBreadcrumb from '../../../CommonComponent/selfBreadcrumb'
import CheckImg from '../../../CommonComponent/CheckImg/CheckImg'
const Option = Select.Option;
  
export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
          ClassesGround:[],//分类组列表
          visibleUpdata:false,//更新模态框是否显示
          visible:false,//添加模态框是否显示
          pageIndex:1,//当前页码
          pageCount:10,//当前页面显示数
          list:[],//Item列表
          total:null,//Item总数
          level:null,//第一分组或第二分组,
          groupId:null,//分类组Id
          SearchClassName:"",//搜索分类名
          recordItem:null,//被编辑对象
          loading:true
        }
        this.columns = [
          {
            title: '分类Id',
            dataIndex: 'id',
            key: 'id',
          },{
            title: '分类名称',
            dataIndex: 'className',
            key: 'className',
          }, {
            title: '所属分类组',
            dataIndex: 'groupName',
            key: 'groupName',
          }, {
            title: '上级',
            dataIndex: 'parentClassName',
            key: 'parentClassName',
            render: text => {
              if(text){
                return(
                  <div>{text}</div>
                )
              }else{
                return(
                  <div>--</div>
                )
              }
            }
          }, {
            title: '类型',
            dataIndex: 'levelType',
            key: 'levelType',
          }, 
          {
            title: '分类说明',
            dataIndex: 'classComment',
            key: 'classComment',
            render: text => {
              if(text){
                return(
                  <div>{text}</div>
                )
              }else{
                return(
                  <div>暂无数据</div>
                )
              }
            }
          }, 
          {
            title: '分类图片',
            dataIndex: 'classPictureUrl',
            key: 'classPictureUrl',
            render: text => {
              if(text){
                return(
                  // 产看图片组件
                  <CheckImg URL={text}></CheckImg>
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
          }, 
          {
            title: '操作',
            key: '操作',
            render: (text, record) => (
              <span className="Table_control_Wrapper">
                <a onClick={this.showModelUpdata.bind(this,record)} name="visibleUpdata" style={{'marginRight':10}} href="javascript:void">编辑</a>
                <Popconfirm title="是否删除该记录?" onConfirm={this.deleteClassGroup.bind(this,record)}  okText="Yes" cancelText="No">
                  <a href="javascript:void">删除</a>
                </Popconfirm>
              </span>
            ),
          }];
    }

    // 删除分类
    deleteClassGroup(record){
      this.gob.post('/class/deleteClass',{classId:record.id}).then(res=>{
        if(res.data.code == 10000){
          this.getList();
          message.info(res.data.msg);
        }else{
          message.info(res.data.msg);
        }
      })
    }

    // 初始化获取列表数据和分组数据
    componentDidMount(){
      this.getList();//获取分类数据
      this.getClassGroups();//获取分类组数据
    }
    
    //获取分类组数据
    getClassGroups(){
      this.gob.get('/classGroup/getClassGroups').then(res=>{
          this.setState({
            ClassesGround:res.data.data
          })
      })
    }
    
    //获取分类数据
    getList(){
      var obj = {
        level:this.state.level==3?null:this.state.level,
        className:this.state.SearchClassName?this.state.SearchClassName:null,
        groupId:this.state.groupId?this.state.groupId:null,
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount
      }
      this.gob.get('/class/getClasses',obj).then(res=>{
          if(res.data.code == 10000){
            this.setState({
              loading:false,
              list:res.data.data.list,
              total:res.data.data.total
            })
          }else{
            message.info(res.data.msg)
          }
      })
    }


    //改变输入框的值
    changeValue(e){
      var obj = {}
      obj[e.target.name] = e.target.value;
      this.setState(obj);
    }

    //改变分页时促发改事件
    ChangePageTips(page, pageSize){
      this.setState({
        pageIndex:page
      },()=>{
        this.getList()
      })
    }

    //改变下拉框促发该事件
    handleChangeSelect(name,value){
      var obj = {};
      obj[name] = value;
      this.setState(obj);
    }

    // 点击编辑时,促发该事件,把该列数据放到recordItem对象并传到编辑表单
    showModelUpdata(record){
      this.setState({
        recordItem:record,
      },()=>{
        this.setState({
          visibleUpdata:true
        })
      })
    }

    // 控制模态框显示
    showModel(record,e){
      this.setState({
        visible:true
      })
    }

    // 控制模态框隐藏
    hideModel(){
      this.setState({
        visible:false,
        visibleUpdata:false
      })
    }

    render(){
        return(
            <Fragment>

              {/* 商品标题 */}
              <SelfBreadcrumb TabList={['商品分类管理','添加商品分类']}></SelfBreadcrumb>
              
              {/* 添加分类表单 */}
              <From
                ClassesGround={this.state.ClassesGround}
                getList={this.getList.bind(this)}
                visible={this.state.visible} 
                hideModel={this.hideModel.bind(this)}></From>

              {/* 编辑分类表单 */}
              <UpdataFrom
                ClassesGround={this.state.ClassesGround}
                recordItem={this.state.recordItem}
                getList={this.getList.bind(this)}
                visible={this.state.visibleUpdata} 
                hideModel={this.hideModel.bind(this)}></UpdataFrom>

               <div className="TopWrapper">
                  <div className="SreachWrapper">

                    {/* 分类组下拉框   */}
                    <Select 
                      name="groupId"  
                      placeholder="请选择分类组" 
                      style={{ width: 180 }} 
                      onChange={this.handleChangeSelect.bind(this,'groupId')}>
                      <Option key={0} value={0}>{'全部'}</Option>
                      {
                        this.state.ClassesGround.map((item)=>{
                          return(
                            <Option key={item.id} value={item.id}>{item.groupName}</Option>
                          )
                        })
                      }
                    </Select>
                    
                    {/* 等级分类下拉框   */}
                    <Select name="level"  placeholder="请选择等级分类" style={{ width: 160 }} onChange={this.handleChangeSelect.bind(this,'level')}>
                      <Option key={3} value={3}>{'全部'}</Option>
                      <Option value="0">一级分类</Option>
                      <Option value="1">二级分类</Option>
                    </Select>

                    
                    <div className="InputWrappr">
                      <Input type="text" 
                             value={this.state.SearchClassName} 
                             name="SearchClassName" 
                             onChange={this.changeValue.bind(this)} 
                             placeholder="输入商品分类名称" />
                    </div>

                    <Button 
                            type="primary" 
                            onClick={this.getList.bind(this)} 
                            icon="search">Search</Button>

                  </div>

                  {/* 添加分类模特框促发 */}
                  <div className="AddWrapper">
                    <Button name="visible" onClick={this.showModel.bind(this)} icon="plus">添加商品分类</Button>
                  </div>

               </div>

               {/* columns为Table结构 */}
               {/* dataSource为数据来源,从服务端引入 */}
               {/* loading为第一次加载数据时，Loading状态 */}
                <Table
                  loading={this.state.loading}  
                  pagination={false}  
                  columns={this.columns} 
                  dataSource={this.state.list} />

              {/* total为服务端返回的item数量 */}
              {/* pageSize每页显示多少条数据 */}
              {/* defaultCurrent为默认显示第一页 */}
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

