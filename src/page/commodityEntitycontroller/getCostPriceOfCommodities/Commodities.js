import React, { Component,Fragment } from 'react';
import { Table, Icon, Switch,Input,Pagination,Button,Select } from 'antd';
import From from './component/from'
import UpdataFrom from './component/upDataFrom'
import ExamineFrom from './component/examineFrom'
const Option = Select.Option;

export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.columns = [{
          title: '商品Id',
          dataIndex: 'commodityEntityId',
          key: 'id',
         }, {
          title: '商品名称',
          dataIndex: 'commodityName',
          key: 'commodityName',
         }, {
          title: '成本价格',
          dataIndex: 'buyingPrice',
          key: 'buyingPrice',
         },
         {
          title: '天猫价格',
          dataIndex: 'tmallPrice',
          key: 'tmallPrice',
         },
         {
          title: '京东价格',
          dataIndex: 'jdPrice',
          key: 'jdPrice',
         },
        //  {
        //   title: '审核状态',
        //   dataIndex: 'reviewStatus',
        //   key: 'reviewStatus',
        //   // render:(text,record)=>{
        //   //   if(text == 1){
        //   //     return(<div>待审核</div>) 
        //   //   }
        //   //   if(text == 2){
        //   //     return(<div>价格驳回</div>) 
        //   //   }
        //   //   if(text == 3){
        //   //     return(<div>审核通过</div>) 
        //   //   }
        //   //   if(text == 4){
        //   //     return(<div>取消审核</div>) 
        //   //   }
        //   // }
        //  },
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
        //  {
        //   title: 'Action',
        //   key: 'action',
        //   render: (text, record) => (
        //     <span className="Table_control_Wrapper">
        //      {/* <a onClick={this.UpdataFrom.bind(this,record,true)} style={{'marginRight':10}} href="javascript:void(0)">编辑</a> */}
        //      {record.reviewStatus=='未审核'?<a onClick={this.UpdataFrom.bind(this,record,false)} href="javascript:void(0)">审核</a>:''}
        //     </span>
        //   ),
        // }
      ]
        this.state = {
          visible:false,
          upDataVisible:false,
          examinaVisible:false,
          recordItem:{},//需更新的对象
          pageIndex:1,
          pageCount:10,
          list:[],//列表
          totalRows:null,//总数
          FirstClasses:[],//一级分类列表
          SecondClasses:[],//二级分类列表
          classId:null,//一级分类Id
          subClassId:null,//二级分类Id
          commodityName:null,//商品名称
          brand:null,//品牌
          reviewStatus:null,
          commodityEntityId:null,
          loading:true
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
    UpdataFrom(record,isEdit){
      this.setState({
        recordItem:record
      },()=>{
        isEdit?this.setState({upDataVisible:true}):this.setState({examinaVisible:true})
      })
    }
    handleChangeSelect(name,value){
      var obj = {};
      obj[name] = value;
      this.setState(obj);
    }
    getList(){
      var obj = {
        classId:this.state.classId?this.state.classId:null,
        subClassId:this.state.subClassId?this.state.subClassId:null,
        commodityName:this.state.commodityName?this.state.commodityName:null,
        brand:this.state.brand?this.state.brand:null,
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount,
        reviewStatus:this.state.reviewStatus?this.state.reviewStatus:null
      }
      this.gob.get('/entity/getCostPriceOfCommodities',obj).then(res=>{
        if(res.data.code == 10000){
          this.state.commodityEntityId = res.data.data.list[0]?res.data.data.list[0].commodityEntityId:0;
          this.setState({
            loading:false,
            list:res.data.data.list,
            totalRows:res.data.data.total
          })
        }else{
          this.antdComponent.message.info(res.data.msg);
        }
      })
    }
    handleChangeClassId(value){
      this.setState({
        classId:value
      });
    }
    changeInputValue(e){
      var obj = [];
      obj[e.target.name] = e.target.value;
      this.setState(obj);
    }
    showModel(){
        this.setState({
          visible:true
        })
    }
    hideModel(){
      this.setState({
        visible:false,
        upDataVisible:false,
        examinaVisible:false
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

        let SelfBreadcrumb = this.gobComponet.SelfBreadcrumb;
        let TheCascader = this.gobComponet.TheCascader;

        return(
            <Fragment>

              <SelfBreadcrumb TabList={['查询商品实物列表','商品成品价格查询']}></SelfBreadcrumb>

              <From
                  getList={this.getList.bind(this)} 
                  visible={this.state.visible} 
                  hideModel={this.hideModel.bind(this)}></From>

              <UpdataFrom
                  getList={this.getList.bind(this)} 
                  recordItem={this.state.recordItem}
                  visible={this.state.upDataVisible} 
                  hideModel={this.hideModel.bind(this)}></UpdataFrom>

              <ExamineFrom
                  getList={this.getList.bind(this)} 
                  recordItem={this.state.recordItem}
                  visible={this.state.examinaVisible} 
                  hideModel={this.hideModel.bind(this)}></ExamineFrom>

               <div className="TopWrapper">
                  <div className="SreachWrapper">

                    {/* <Select 
                        name="reviewStatus" 
                        placeholder="请选择审核状态" 
                        style={{ width: 220 }} 
                        onChange={this.handleChangeSelect.bind(this,'reviewStatus')}>
                        <Option key={0} value={0}>{"全部"}</Option>
                        <Option key={1} value={1}>{"待审核"}</Option>
                        <Option key={2} value={2}>{"价格驳回"}</Option>
                        <Option key={3} value={3}>{"审核通过"}</Option>
                        <Option key={4} value={4}>{"取消审核"}</Option>
                    </Select> */}

                    <TheCascader
                        isSelectAll={true}   
                        marginRight={15}
                        width={246}
                        getClassId={this.getClassId.bind(this)}
                    ></TheCascader>

                    <div className="InputWrappr">
                      <Input value={this.state.commodityName} name="commodityName" onChange={this.changeInputValue.bind(this)} placeholder="输入商品名称" />
                    </div>

                    <div className="InputWrappr">
                      <Input value={this.state.brand} name="brand" onChange={this.changeInputValue.bind(this)} placeholder="输入商品品牌" />
                    </div>

                    <Button type="primary" onClick={this.getList.bind(this)} icon="search">查询</Button>
                  </div>

                  {/* <div className="AddWrapper">
                      <Button onClick={this.showModel.bind(this)}>添加实物商品成品价格</Button>
                  </div> */}
               </div>

                <Table  
                    loading={this.state.loading}
                    pagination={false} 
                    columns={this.columns} 
                    dataSource={this.state.list} />
                <Pagination
                    onChange={this.ChangePageTips.bind(this)}
                    total={this.state.totalRows}
                    showTotal={total => (<div className="pageTips">{`总${total}条数据 `}</div>)}
                    pageSize={this.state.pageCount}
                    defaultCurrent={this.state.pageIndex}
                />
            </Fragment>
        )
    }
}