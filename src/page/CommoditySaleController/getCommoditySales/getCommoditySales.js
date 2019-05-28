import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Link } from "react-router-dom";
import { Table, Icon ,Pagination,Button,Select,Input} from 'antd';
import From from './component/from'
const Option = Select.Option;

export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.columns = [{
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          }, {
            title: '销售商品名称',
            dataIndex: 'commodityName',
            key: 'commodityName',
          }, {
            title: '销售渠道名称',
            dataIndex: 'unitName',
            key: 'unitName',
          }, 
          {
            title: '销售商品简称',
            dataIndex: 'shortName',
            key: 'shortName',
          },
          {
            title: '销售商品类型',
            dataIndex: 'saleType',
            key: 'saleType',
            render:(text)=>{
              if(text == 1) return (<div>一对一对应的销售</div>)
              if(text == 2) return (<div>多数量组合销售</div>)
              if(text == 3) return (<div>多商品多数量组合销售</div>)
            }
          },
          {
            title: 'image',
            dataIndex: 'image',
            key: 'image',
            render:(text,record)=>{
              let CheckImg = this.gobComponet.CheckImg;
              if(text){
                return(<CheckImg URL={record.image}></CheckImg>)
              }else{
                return(<div>暂无数据</div>)
              }
            }
          },
          {
            title: '一级分类名称',
            dataIndex: 'classify',
            key: 'classify',
            render:(text)=>{
              if(text){
                return(<div>{text}</div>)
              }else{
                return(<div>暂无数据</div>)
              }
            }
          },
          {
            title: '二级分类名称',
            dataIndex: 'subClass',
            key: 'subClass',
            render:(text)=>{
              if(text){
                return(<div>{text}</div>)
              }else{
                return(<div>暂无数据</div>)
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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span className="Table_control_Wrapper">
                <a onClick={this.editRecord.bind(this,record)} style={{'marginRight':'10px'}} href="javascript:void">编辑</a>
                <a href="javascript:void">删除</a>
              </span>
            ),
        }]
        this.state = {
          visible:false,
          pageIndex:1,
          pageCount:10,
          list:[],
          totalLows:null,
          classId:null,
          subClassId:null,
          Loading:true,
        }
    }
    componentDidMount(){
        this.getList();
    }
    editRecord(record){
        this.store.dispatch({
          type:'GET_SALE_COMMODITY',
          payload:record
        })
        let path = `/CommoditySaleController/newCommoditySale/newCommoditySale`
        this.props.history.push(path);
    }
    handleChangeSelect(name,value){
      var obj = {};
      obj[name] = value;
        this.setState(obj);
    }
    getList(){
      let commodityNameValue = document.getElementById('commodityName').value;
      var obj = {
        classId:this.state.classId?this.state.classId:null,
        subClassId:this.state.subClassId?this.state.subClassId:null,
        commodityName:commodityNameValue?commodityNameValue:null,
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount
      }
      this.gob.get('/sale/getCommoditySales',obj).then(res=>{

        this.setState({
          Loading:false,
          list:res.data.data.list,
          totalLows:res.data.data.total
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
    showModel(){
        this.setState({
          visible:true
        })
    }
    hideModel(){
      this.setState({
        visible:false
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
    render(){
      let TheCascader = this.gobComponet.TheCascader
      let SelfBreadcrumb = this.gobComponet.SelfBreadcrumb;

        return(
            <Fragment>
              <SelfBreadcrumb TabList={['销售商品管理','销售商品查询']}></SelfBreadcrumb>
              <From visible={this.state.visible} hideModel={this.hideModel.bind(this)}></From>
               <div className="TopWrapper">
                  <div className="SreachWrapper">

                    {/* <GetFirstClass
                      id={this.state.classId} 
                      handleChangeSelect={this.handleChangeSelect.bind(this,'classId')}></GetFirstClass>

                    <GetSecondClass 
                      id={this.state.subClassId}
                      handleChangeSelect={this.handleChangeSelect.bind(this,'subClassId')}></GetSecondClass>
                    */}
                    <TheCascader
                      isSelectAll={true} 
                      marginRight={15}
                      width={246} 
                      getClassId={this.getClassId.bind(this)}></TheCascader>

                    <div className="InputWrappr">
                      <Input id='commodityName' placeholder="请输入商品名称" />
                    </div>

                    <Button type="primary"
                            onClick={this.getList.bind(this)}
                            icon="search">Search</Button>

                  </div>
                  <div className="AddWrapper">

                      <Button>
                        <Link to='/CommoditySaleController/newCommoditySale/newCommoditySale'>添加销售商品</Link>
                      </Button>

                  </div>
               </div>
                <Table
                  loading={this.state.Loading}  
                  pagination={false}  
                  columns={this.columns} 
                  expandedRowRender={record => {if(record.detail){return (<div dangerouslySetInnerHTML={{__html: record.detail}} />)}else{return(<div>暂无数据</div>)}}}
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