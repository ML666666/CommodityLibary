import React, { Component,Fragment } from 'react';
import { Pagination,message, Table, Popconfirm,Icon,Button,Select,Input} from 'antd';
import From from './component/from'
import Updatafrom from './component/updatafrom'
const Option = Select.Option;

export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.columns = [{
          title: 'id',
          dataIndex: 'id',
          key: 'id',
        }, 
        {
          title: '商品名称',
          dataIndex: 'commodityName',
          key: 'commodityName',
        }, 
        {
          title: '商品简称',
          dataIndex: 'shortName',
          key: 'shortName',
        }, 
        {
          title: '商品品牌',
          dataIndex: 'brand',
          key: 'brand',
        }, 
        {
          title: '商品条码',
          dataIndex: 'barCode',
          key: 'barCode',
        },
        {
          title: '供应商',
          dataIndex: 'supplier',
          key: 'supplier',
        },
        {
          title: '计数单位',
          dataIndex: 'unitName',
          key: 'unitName',
        },
        {
          title: '商品重量',
          dataIndex: 'weight',
          key: 'weight',
        },
        {
          title: '尺寸',
          dataIndex: 'size',
          key: 'size',
        },
        {
          title: '商品用途',
          dataIndex: 'usageComment',
          key: 'usageComment',
        },      
        {
          title: '查看图片',
          dataIndex: 'image',
          key: 'image',
          render:(text,record) =>{
              let CheckImg = this.gobComponet.CheckImg;
              if(text){
                return(
                  <CheckImg URL={text}></CheckImg>
                )
              }else{
                return(
                  <div>暂无数据</div>
                )  
              }
          }
        }, {
          title: '操作',
          key: '操作',
          render: (text, record) => (
            <span className="Table_control_Wrapper">
              <a onClick={this.toUpdata.bind(this,record)} style={{'marginRight':10}} href="javascript:void">编辑</a>
              <Popconfirm title="是否删除该记录?" onConfirm={this.deleteClassGroup.bind(this,record)}  okText="Yes" cancelText="No">
                  <a href="javascript:void">删除</a>
              </Popconfirm>
            </span>
          ),
        }]
        this.state = {
          visible:false,
          UpdatafromVisible:false,
          pageIndex:1,
          pageCount:10,
          totalRows:0,
          list:[],
          recordItem:{},//需修改的对象
          FirstClasses:[],//一级分类列表
          SecondClasses:[],//二级分类列表
          BrandList:[],
          brandId:null,
          supplierId:null,
          supplierList:[],
          commodityName:null,
          brand:null,
          supplier:null,
          loading:true
        }
    }
    componentDidMount(){
      this.getList();
    }
    handleChangeSelect(name,value){
      var obj = {};
      obj[name] = value;
      this.setState(obj);
    }
    deleteClassGroup(record){
      var obj = {
        entityId:record.id
      }
      this.gob.post('/entity/deleteCommodityEntity',obj).then(res=>{
          if(res.data.code == 10000){
            message.info(res.data.msg);
            this.getList();
          }else{
            message.info(res.data.msg);
          }
      })
    }
    toUpdata(record){
      this.setState({
        recordItem:record
      },()=>{
        this.setState({
          UpdatafromVisible:true
        })
      })
    }
    getList(){
      var obj = {
        classId:this.state.classId?this.state.classId:null,
        subClassId:this.state.subClassId?this.state.subClassId:null,
        brandId:this.state.brandId?this.state.brandId:null,
        commodityName:this.state.commodityName?this.state.commodityName:null,
        supplier:this.state.supplierId?this.state.supplierId:null,
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount
      }
      this.gob.get('/entity/getCommodityEntities',obj).then(res=>{
        if(res.data.code == 10000){
          this.setState({
            loading:false,
            list:res.data.data.list,
            totalRows:res.data.data.total
          })
        }else{
           message.info(res.data.msg);
        } 
      })
    }
    ChangePageTips(page, pageSize){
      this.setState({
        pageIndex:page
      },()=>{
        this.getList();
      })
    }
    _changeValue(e){
      var obj = {}
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
        UpdatafromVisible:false
      })
    }
    initDataList(name,value){
      var obj = {};
      obj[name] = value;
      this.setState(obj);
    }
    getCommodityType(value){
      if(value == 1){
        return '金币联盟自营实物商品'
      }
      if(value == 2){
        return '金币联盟自营虚拟商品'
      }
      if(value == 3){
        return '供应商实物商品'
      }
      if(value == 4){
        return '供应商虚拟商品'
      }
    }
    ChangePageTips(page, pageSize){
      this.setState({
        pageIndex:page
      },()=>{
        this.getList();
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

      let GetBrandList = this.gobComponet.GetBrandList;
      let GetSupplierList = this.gobComponet.GetSupplierId;  
      let SelfBreadcrumb = this.gobComponet.SelfBreadcrumb;
      let TheCascader = this.gobComponet.TheCascader;

        return(
            <Fragment>
              
              <SelfBreadcrumb TabList={['查询商品实物列表','商品实物查询']}></SelfBreadcrumb>

              <Updatafrom
                BrandList={this.state.BrandList}
                supplierList={this.state.supplierList}
                visible={this.state.UpdatafromVisible}
                getList={this.getList.bind(this)}
                recordItem={this.state.recordItem}
                hideModel={this.hideModel.bind(this)}></Updatafrom>


               <div className="TopWrapper">
                  <div className="SreachWrapper">

                    <TheCascader
                        isSelectAll={true} 
                        marginRight={15}
                        width={246}
                        getClassId={this.getClassId.bind(this)}>
                        </TheCascader>

                    <GetBrandList
                        id={this.state.brandId}
                        initList={this.initDataList.bind(this,'BrandList')}  
                        handleChangeSelect={this.handleChangeSelect.bind(this,'brandId')}>
                        </GetBrandList>

                    <GetSupplierList
                        id={this.state.supplierId}
                        initList={this.initDataList.bind(this,'supplierList')}  
                        handleChangeSelect={this.handleChangeSelect.bind(this,'supplierId')}>
                        </GetSupplierList>

                    <div className="InputWrappr">
                      <Input name="commodityName"
                             onChange={this._changeValue.bind(this)} 
                             placeholder="请输入商品名称" />
                    </div>

                    <Button onClick={this.getList.bind(this)} type="primary" icon="search" >Search</Button>
                  </div>
                  <div className="AddWrapper"></div>
               </div>

                <Table   
                        loading={this.state.loading}
                        pagination={false}
                        columns={this.columns}
                        expandedRowRender={(record)=>{
                          return(
                            <div className="tableExtend">
                              <div className="item">
                                商品一级分类名称:<span>{String(record.subClassId)?record.subClassId:'暂无数据'}</span>
                              </div>
                              <div className="item">
                                商品一级分类Id:<span>{String(record.classId)?record.classId:'暂无数据'}</span>
                              </div>
                              <div className="item">
                                商品二级分类名称:<span>{String(record.subClass)?record.subClass:'暂无数据'}</span>
                              </div>
                              <div className="item">
                                商品二级分类名称:<span>{String(record.subClassId)?record.subClassId:'暂无数据'}</span>
                              </div>
                              <div className="item">
                                商品类型:<span>{this.getCommodityType(record.commodityType)}</span>
                              </div>
                              <div className="item">
                                商品状态:<span>{record.recordStatus==1?'正常':'删除'}</span>
                              </div>
                            </div>
                          )
                        }}
                        dataSource={this.state.list}
                />

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