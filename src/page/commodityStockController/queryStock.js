import React, { Component,Fragment } from 'react';
import { Table, Icon } from 'antd';
import { Pagination } from 'antd';
import { Button } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import From  from './component/from'
import GetFirstClass from '../../CommonComponent/getFirstClass'
import GetSecondClass from '../../CommonComponent/getSecondClass'
import GetBrandList from '../../CommonComponent/getBrandList'
import SelfBreadcrumb from '../../CommonComponent/selfBreadcrumb'
const Option = Select.Option;
 
export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.columns = [
          {
          title: '商品ID',
          dataIndex: 'commodityId',
          key: 'commodityId',
          },
          {
            title: '商品名称',
            dataIndex: 'commodityName',
            key: 'commodityName',
          },
          {
            title: '供应商',
            dataIndex: 'supplier',
            key: 'supplier',
            render:(text,record)=>{
              if(text){
                return(
                  <div>{text}</div>
                )
              }else{
                return(
                  <div>~暂无数据~</div>
                )
              }
            }
          }, 
          {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
          }, 
          {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
          },
        ]
        this.state = {
            loading:true,
            visible:false,
            pageIndex:1,
            pageCount:10,
            list:[],
            classId:null,//一级Id
            subClassId:null,
            brand:null,
            BrandList:[],
            brandName:null,
            commodityName:null,
            totalRows:null
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
        brandName:this.state.brandName?this.state.brandName:null,
        commodityName:this.state.commodityName?this.state.commodityName:null,
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount
      }
      this.gob.get('/queryStock',obj).then(res=>{
          if(res.data.code == 10000){
            this.setState({
              loading:false,
              list:res.data.data.list,
              totalRows:res.data.data.total
            })
          }else{
            this.setState({
              list:[]
            })
            this.antdComponent.message.info(res.data.msg);
          }
      })
    }
    handleChange(value){
      console.log(value);
    }
    onChangeValue(e){
      var obj = [];
      obj[e.target.name] = e.target.value;
      this.setState(obj);
    }
    initBrandList(name,value){
      var obj = {};
      obj[name] = value;
      this.setState(obj)
    }
    toggleModel(){
      this.setState({
        visible:!this.state.visible
      })
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
    render(){
        return(
            <Fragment>
              <SelfBreadcrumb TabList={['商品库存管理','商品库存查询']}></SelfBreadcrumb>
               <From visible={this.state.visible}></From>
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
                        
                    <div className="InputWrappr">
                      <Input name="commodityName" value={this.state.commodityName} onChange={this.onChangeValue.bind(this)} placeholder="请输入商品名称" />
                    </div>
                    <Button onClick={this.getList.bind(this)} type="primary" icon="search">Search</Button>
                  </div>
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
                    defaultCurrent={1}
                />
            </Fragment>
        )
    }
}