import React, { Component,Fragment } from 'react';
import { Table, Icon,Pagination,Button,Select,Input  } from 'antd';
import EditPrice from './component/editPrice'
import CheckPrice from './component/checkPrice'
import Addprice from './component/addprice'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
const Option = Select.Option;

class component extends Component{
    constructor(props){
        super(props)
        this.columns = [{
            title: '采购商品Id',
            dataIndex: 'purchaseId',
            key: 'purchaseId',
          },{
            title: '商品Id',
            dataIndex: 'commodityName',
            key: 'commodityName',
          },{
            title: '供应商Id',
            dataIndex: 'supplierName',
            key: 'supplierName',
          },{
            title: '采购价格',
            dataIndex: 'buyingPrice',
            key: 'buyingPrice',
          },{
            title: '京东价格',
            dataIndex: 'jdPrice',
            key: 'jdPrice',
          },{
            title: '天猫价格',
            dataIndex: 'tmallPrice',
            key: 'tmallPrice',
          },{
            title: '零售价格',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
          },
          {
            title: '基准价格',
            dataIndex: 'salePrice',
            key: 'salePrice',
          },{
            title: '采购人名称',
            dataIndex: 'buyerName',
            key: 'buyerName',
          },
          {
            title: '发货方式',
            dataIndex: 'deliveryMethod',
            key: 'deliveryMethod',
            render:(text,record)=>{
              if(text == 1){return(<div>批采</div>)}
              if(text == 2){return(<div>一件代发</div>)}
            }
          },
          {
            title: 'recordStatus',
            dataIndex: 'recordStatus',
            key: 'recordStatus',
            render: (text, record) => {
              if(text == 1){return(<div>待审核</div>)}
              if(text == 2){return(<div>审核通过</div>)}
              if(text == 3){return(<div>审核不通过</div>)}
            },
          },
          {
            title: '审核意见',
            dataIndex: 'priceComment',
            key: 'priceComment',
            render: (text, record) => {
              return text?<div>{text}</div>:<div>暂无数据</div>
            },
          },
          {
            title: 'createTime',
            dataIndex: 'createTime',
            key: 'createTime',
          },
          {
            title: 'updateTime',
            dataIndex: 'updateTime',
            key: 'updateTime',
          },
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span className="Table_control_Wrapper">
                <a onClick={this.EditModelShow.bind(this,'EditModelVisible',record)} style={{marginRight:'16px'}} href='javascript:void(0)'>编辑</a>
                {
                  record.recordStatus == 1?<a onClick={this.EditModelShow.bind(this,'UpdataModelVisible',record)} href='javascript:void(0)'>审核</a>:''
                }
              </span>
            ),
        }]
        this.state = {
          visible:false,
          pageIndex:1,
          pageCount:10,
          Loading:true,
          list:[],
          totalLows:null,

          oneClassId:undefined,
          subClassId:undefined,
          brandId:undefined,
          supplierId:undefined,
          recordStatus:undefined,

          tRecord:{},
          EditModelVisible:false,
          UpdataModelVisible:false,
          AddModelVisible:false
        }
    }
    ChangePageTips(page, pageSize){
      this.setState({
        pageIndex:page
      },()=>{
        this.getList()
      })
    }
    EditModelShow(name,record){
        var obj = {}
        obj[name] = true;
        this.setState({tRecord:record},()=>{
          this.setState(obj)
        })
    }
    componentDidMount(){
      this.getList()
    }
    toggleModel(){
        this.setState({
          visible:!this.state.visible
        })
    }
    hideModel(){
      this.setState({
        EditModelVisible:false,
        UpdataModelVisible:false,
        AddModelVisible:false
      })
    }
    handleChangeSelect(name,value){
      var obj = {};
      obj[name] = value;
      this.setState(obj);
    }
    onChangeValue(e){
      var obj = {};
      obj[e.target.name] = e.target.value;
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
    getList(){
      var obj = {
        pageIndex:this.state.pageIndex,
        pageCount:this.state.pageCount,
        oneClassId:this.state.oneClassId?this.state.oneClassId:null,
        subClassId:this.state.subClassId?this.state.subClassId:null,
        brandId:this.state.brandId?this.state.brandId:null,
        supplierId:this.state.supplierId?this.state.supplierId:null,
        recordStatus:this.state.recordStatus?this.state.recordStatus:null,
        commodityName:this.state.commodityName?this.state.commodityName:null
      }
      this.gob.get('/getPurchasePriceList',obj).then(res=>{
          this.setState({
            Loading:false,
            list:res.data.data.list,
            totalLows:res.data.data.total
          })
      })
    }
    render(){

        let SelfBread = this.gobComponet.SelfBreadcrumb;
        let GetBrandList = this.gobComponet.GetBrandList;
        let GetSupplierId = this.gobComponet.GetSupplierId;
        let TheCascader = this.gobComponet.TheCascader;

        return(
            <Fragment>

              <SelfBread TabList={['商品采购管理','商品采购价格管理']}></SelfBread>

              <EditPrice  
                    getList={this.getList.bind(this)}
                    tRecord={this.state.tRecord}
                    visible={this.state.EditModelVisible} 
                    hideModel={this.hideModel.bind(this)}></EditPrice>

              <CheckPrice  
                    getList={this.getList.bind(this)}
                    tRecord={this.state.tRecord}
                    visible={this.state.UpdataModelVisible} 
                    hideModel={this.hideModel.bind(this)}></CheckPrice>

              <Addprice  
                    getList={this.getList.bind(this)}
                    visible={this.state.AddModelVisible} 
                    hideModel={this.hideModel.bind(this)}></Addprice>

               <div className="TopWrapper">
                  <div className="SreachWrapper">

                    <TheCascader
                        isSelectAll={true} 
                        marginRight={15}
                        width={246} 
                        getClassId={this.getClassId.bind(this)}></TheCascader>

                    <GetBrandList
                      handleChangeSelect={this.handleChangeSelect.bind(this,'brandId')}
                      id={this.state.brandId} 
                      name="brandId">
                    </GetBrandList>

                    <GetSupplierId
                       handleChangeSelect={this.handleChangeSelect.bind(this,'supplierId')}
                       id={this.state.supplierId}
                       name="supplierId">
                    </GetSupplierId>

                    <Select 
                            name='recordStatus'
                            onChange={this.handleChangeSelect.bind(this,'recordStatus')}
                            placeholder={'请选择状态'} 
                            style={{ width: 220 }} 
                            value={this.state.recordStatus}
                            >
                      <Option key={0} value={0} >全部</Option>
                      <Option key={1} value={1} >正常</Option>
                      <Option key={3} value={3} >删除</Option>
                    </Select>

                    <div className="InputWrappr">
                      <Input placeholder="请输入商品名称" 
                             name='commodityName' 
                             value={this.state.commodityName}
                             onChange={this.onChangeValue.bind(this)} />
                    </div>
                    <Button type="primary" onClick={this.getList.bind(this)} icon="search">Search</Button>
                  </div>
                  <div className="AddWrapper">
                    {/* <Button  onClick={this.EditModelShow.bind(this,'AddModelVisible')} >添加实物商品</Button> */}
                  </div>
               </div>

                <Table  pagination={false} loading={this.state.Loading}  columns={this.columns} dataSource={this.state.list} />

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

export default immutableRenderDecorator(component);