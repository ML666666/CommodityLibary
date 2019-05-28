import React, { Component,Fragment } from 'react';
import { Table, Icon,Pagination,Button,Select ,Input,message} from 'antd';
import From from './component/from'
import GetFirstClass from '../../CommonComponent/getFirstClass'
import GetSecondClass from '../../CommonComponent/getSecondClass'
import GetBrandList from '../../CommonComponent/getBrandList'
import SelfBreadcrumb from '../../CommonComponent/selfBreadcrumb'
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;


  
export default class CommoditySalesVolumeController extends Component{
    constructor(props){
        super(props)
        this.columns = [{
          title: '销售id',
          dataIndex: 'saleId',
          key: 'saleId',
        }, {
          title: '销售商品',
          dataIndex: 'commodityName',
          key: 'commodityName',
        }, {
          title: '渠道id',
          dataIndex: 'unitId',
          key: 'unitId',
        }, 
        {
          title: '渠道名称',
          dataIndex: 'unitName',
          key: 'unitName',
        },
        {
          title: '实物id',
          dataIndex: 'entityId',
          key: 'entityId',
        },
        {
          title: '销售日期',
          dataIndex: 'saleDate',
          key: 'saleDate',
        },
        {
          title: '数量',
          dataIndex: 'salesVolume',
          key: 'salesVolume',
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
        },
        // {
        //   title: 'Action',
        //   key: 'action',
        //   render: (text, record) => (
        //     <span className="Table_control_Wrapper">
        //       <Button  icon="search">Search</Button>
        //       <Button  icon="search">Search</Button>
        //     </span>
        //   ),
        // }
      ]
        this.state = {
          visible:false,
          classId:null,
          subClassId:null,
          brand:null,
          brandName:null,
          commodityName:null,
          month:null,
          monthList:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
          pageIndex:1,
          pageCount:10,
          list:[],
          totalRows:null,
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
    initBrandList(name,value){
      var obj = {};
      obj[name] = value;
      this.setState(obj)
    }
    getList(){
      var obj = {
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount,
        classId:this.state.classId?this.state.classId:null,
        subClassId:this.state.subClassId?this.state.subClassId:null,
        brand:this.state.brand?this.state.brand:null,
        month:this.state.month?this.state.month:null,
        commodityName:this.state.commodityName?this.state.commodityName:null
      }
      this.gob.get('/querySalesVolume',obj).then(res=>{
          if(res.data.code == 10000){
            this.setState({
              list:res.data.data.list,
              totalRows:res.data.data.total,
              loading:false
            })
          }else{
            message.info(res.data.msg)
          }
      })
    }
    componentDidMount(){
      this.getList();
    }
    ChangePageTips(page, pageSize){
    }
    handleChangeSelect(name,value){
      var obj = {};
      obj[name] = value;
        this.setState(obj,()=>{
          if(name == 'brand'){
           this.setState({
            brandName:value?this.state.BrandList.filter((item)=>{return item.id == value})[0].brand:'全部'
           })
          }
      });
    }
    handleChange(value){
    }
    showModel(){
        this.setState({
          visible:true
        })
    }
    onChangeDate(value,dateString){
      this.setState({
        month:dateString
      })
    }
    onChangeValue(e){
      var obj = [];
      obj[e.target.name] = e.target.value;
      this.setState(obj);
    }
    hideModel(){
      this.setState({
        visible:false
      })
    }
    render(){
        return(
            <Fragment>
              <SelfBreadcrumb TabList={['商品销售模块','商品销售查询']}></SelfBreadcrumb>
              <From visible={this.state.visible} hideModel={this.hideModel.bind(this)}></From>

               <div className="TopWrapper">
                  <div className="SreachWrapper">
                    <GetFirstClass
                        id={this.state.classId}   
                        handleChangeSelect={this.handleChangeSelect.bind(this,'classId')}>
                    </GetFirstClass>
                    <GetSecondClass 
                        id={this.state.subClassId}   
                        handleChangeSelect={this.handleChangeSelect.bind(this,'subClassId')}>
                    </GetSecondClass>
                    <GetBrandList
                        id={this.state.brand} 
                        initList={this.initBrandList.bind(this,'BrandList')} 
                        handleChangeSelect={this.handleChangeSelect.bind(this,'brand')}>
                    </GetBrandList>
                    <MonthPicker style={{marginRight:15}} onChange={this.onChangeDate.bind(this)} placeholder="请选择时间" />
                    <div className="InputWrappr">
                      <Input name="commodityName" value={this.state.commodityName} onChange={this.onChangeValue.bind(this)} placeholder="请输入商品名称" />
                    </div>
                    <Button onClick={this.getList.bind(this)} type="primary" icon="search">Search</Button>
                  </div>
               </div>
                <Table loading={this.state.loading} pagination={false}  columns={this.columns} dataSource={this.state.list} />
                <Pagination
                    onChange={this.ChangePageTips.bind(this)}
                    total={this.state.totalRows}
                    showTotal={total => (<div className="pageTips">{`总${total}条数据 `}</div>)}
                    pageSize={this.state.pageCount}
                    defaultCurrent={1}
                />
            </Fragment>
        )
    }
}