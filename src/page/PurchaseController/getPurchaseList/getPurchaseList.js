import React, { Component,Fragment } from 'react';
import { Table, Icon, Switch,Pagination,Popconfirm,Button,Select,Input} from 'antd';
import From from './component/addCommodity'
import EditFrom from './component/editCommodity'
import AddFrom from './component/checkPrice'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import UpLoadFile from './component/UpLoadFile'
const Option = Select.Option;


class Page extends Component{
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
          title: '所属品牌',
          dataIndex: 'brand',
          key: 'brand',
        },
        {
          title: '商品型号',
          dataIndex: 'model',
          key: 'model',
        },
        {
          title: '商品规则说明',
          dataIndex: 'specification',
          key: 'specification',
        },
        {
          title: '商品计量单位',
          dataIndex: 'unitName',
          key: 'unitName',
        },
        {
          title: '一级分类',
          dataIndex: 'oneClass',
          key: 'oneClass',
        },
        {
          title: '二级分类',
          dataIndex: 'subClass',
          key: 'subClass',
        },
        {
          title: '商品图片',
          dataIndex: 'commodityImage',
          render: (text, record) => {
            let CheckImg = this.gobComponet.CheckImg;
            if(text){
              return(
                <CheckImg URL={text}></CheckImg>
              )
            }else{
              return(
                <span>暂无图片</span>
              )
            }
          },
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span className="Table_control_Wrapper">
              <a onClick={this.toShowVisible.bind(this,record,'editFromVisible')} style={{marginRight:'10px'}} href="javascript:void">编辑</a>
              <Popconfirm title="是否删除该记录?" onConfirm={this.deleteGroup.bind(this,record)}  okText="Yes" cancelText="No">
                <a style={{marginRight:'10px'}} href="javascript:void">删除</a>
              </Popconfirm>
              <a onClick={this.toShowVisible.bind(this,record,'addFromVisible')} href="javascript:void">提交价格审核</a>
            </span>
          ),
        }]
        this.state = {
          addFromVisible:false,
          tRecordItem:false,
          visible:false,
          editFromVisible:false,
          pageIndex:1,
          pageCount:10,
          recordStatus:null,
          supplierId:null,
          brandId:null,
          commodityName:null,
          subClassId:null,
          oneClassId:null,
          list:[],
          FirstClasses:[],
          SecondClasses:[],
          BrandList:[],
          supplierList:[],
          totalLows:null,
          isLoading:true
        }
    }
    componentDidMount(){
      this.getList();
    }
    getList(){
      var obj = {
        commodityName:this.state.commodityName?this.state.commodityName:null,
        oneClassId:this.state.oneClassId?this.state.oneClassId:null,
        subClassId:this.state.subClassId?this.state.subClassId:null,
        recordStatus:this.state.recordStatus?this.state.recordStatus:null,
        supplierId:this.state.supplierId?this.state.supplierId:null,
        brandId:this.state.brandId?this.state.brandId:null,
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount
      }
      this.gob.get('/getPurchaseList',obj).then(res=>{
        if(res.data.code == 10000){
          this.setState({
            isLoading:false,
            list:res.data.data.list,
            totalLows:res.data.data.total
          })
        }else{  
          this.antdComponent.message.info(res.data.msg);
        }
      })
    }
    ChangePageTips(page, pageSize){
      this.setState({
        pageIndex:page
      },()=>{
        this.getList()
      })
    }
    deleteGroup(record){
      this.gob.post('/deletePurchase',{id:record.id,commodityName:record.commodityName}).then(res=>{
        if(res.data.code == 10000){
          this.getList();
          this.antdComponent.message.info(res.data.msg);
        }
      })
    }
    showModel(){
      this.setState({
          visible:true
      })
    }
    hideModel(){
      this.setState({
         visible:false,
         editFromVisible:false,
         addFromVisible:false
      })
    }
    _changeValue(e){
      var obj = {}
      obj[e.target.name] = e.target.value
      this.setState(obj);
    }
    toShowVisible(record,name){
      this.setState({
        tRecordItem:record,
      },()=>{
        var obj = {}
        obj[name] = true;
        this.setState(obj)
      })
    }
    getUniqueType(value){
        if(value==1){return(<span>名称唯一</span>)}
        if(value==2){return(<span>名称规格唯一</span>)}
        if(value==3){return(<span>名称型号唯一</span>)}
        if(value==4){return(<span>名称规格型号唯一</span>)}
    }
    handleChangeSelect(name,value){
      var obj = {};
      obj[name] = value;
      this.setState(obj);
    }
    initDataList(name,value){
        var obj = {};
        obj[name] = value;
        this.setState(obj);
    }
    getClassId(value,selectedOptions){
      if(selectedOptions[0]){
          this.setState({
              oneClassId:selectedOptions[0].value
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
      let GetBrandList = this.gobComponet.GetBrandList;
      let TheCascader = this.gobComponet.TheCascader;
      let url = window.location.href.indexOf("localhost:")>-1?'http://192.168.18.54:11015/':this.gob.getWebUrl()+'/';

        return(

            <Fragment>
              <SelfBreadcrumb TabList={['商品采购管理','商品采购管理查询']}></SelfBreadcrumb>

              <From 
                    getList={this.getList.bind(this)}
                    supplierList={this.state.supplierList}
                    BrandList={this.state.BrandList}
                    SecondClasses={this.state.SecondClasses}
                    FirstClasses={this.state.FirstClasses}
                    visible={this.state.visible} 
                    hideModel={this.hideModel.bind(this)}>
              </From>

              <EditFrom
                    tRecordItem={this.state.tRecordItem} 
                    getList={this.getList.bind(this)}
                    supplierList={this.state.supplierList}
                    BrandList={this.state.BrandList}
                    SecondClasses={this.state.SecondClasses}
                    FirstClasses={this.state.FirstClasses}
                    visible={this.state.editFromVisible} 
                    hideModel={this.hideModel.bind(this)}>
              </EditFrom>

              <AddFrom
                    tRecordItem={this.state.tRecordItem} 
                    getList={this.getList.bind(this)}
                    visible={this.state.addFromVisible} 
                    hideModel={this.hideModel.bind(this)}>
              </AddFrom>


               <div className="TopWrapper">
                  <div className="SreachWrapper">

                    <TheCascader
                        isSelectAll={true} 
                        marginRight={15}
                        width={246} 
                        getClassId={this.getClassId.bind(this)}></TheCascader>

                    <GetBrandList
                        id={this.state.brandId}
                        initList={this.initDataList.bind(this,'BrandList')}  
                        handleChangeSelect={this.handleChangeSelect.bind(this,'brandId')}></GetBrandList>

                    <Select name="recordStatus" placeholder="请选择商品状态" style={{ width: 220 }} onChange={this.handleChangeSelect.bind(this,'recordStatus')}>
                        <Option key={1} value={1}>{"正常"}</Option>
                        <Option key={3} value={3}>{"删除"}</Option>
                    </Select>

                    <div className="InputWrappr">
                        <Input name="commodityName" value={this.state.commodityName} onChange={this._changeValue.bind(this)} placeholder="请输入商品名称" />
                    </div>
                    
                    <a download href={`${url}file/downTemplate/569832`}>
                      <Button style={{marginRight:15}}>下载模板</Button>
                    </a>
                    
                    <UpLoadFile getList={this.getList.bind(this)}></UpLoadFile>

                    <Button type="primary" onClick={this.getList.bind(this)} >Search</Button>

                  </div>

                  <div className="AddWrapper">
                    <Button onClick={this.showModel.bind(this)} type="primary">添加采购商品</Button>
                  </div>

               </div>

                <Table  
                      loading={this.state.isLoading}
                      pagination={false}  
                      columns={this.columns} 
                      dataSource={this.state.list}
                      expandedRowRender={(record)=>{
                      return(
                          <div className="tableExtend">
                            <div className="item">
                              结算方式的文字描述:<span>{String(record.settlement)?record.settlement:'暂无数据'}</span>
                            </div>
                            <div className="item">
                              供应商:<span>{String(record.supplier)?record.supplier:'暂无数据'}</span>
                            </div>
                            <div className="item">
                              条形码:<span>{String(record.barCode)?record.barCode:'暂无数据'}</span>
                            </div>
                            <div className="item">
                              记录状态:<span>{String(record.recordStatus)=='1'?'正常':'删除'}</span>
                            </div>
                            <div className="item">
                              数据唯一标识:<span>{this.getUniqueType(record.uniqueType)}</span>
                            </div>
                            <div className="item">
                              商品状态:<span>{record.recordStatus==1?'正常':'删除'}</span>
                            </div>
                            <div className="item">
                              创建时间:<span>{record.createTime}</span>
                            </div>
                            <div className="item">
                              更新时间:<span>{record.updateTime}</span>
                            </div>
                          </div>
                        )
                      }}/>

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

export default immutableRenderDecorator(Page)