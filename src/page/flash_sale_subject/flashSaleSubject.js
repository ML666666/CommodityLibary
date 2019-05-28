import React, { Component,Fragment } from 'react';
import { Table, Icon,Input,Select,Button,Pagination} from 'antd';
import From from './component/FlashSaleItem.js/flash_Sale_Items_list'
import AddFrom from './component/Addfrom'
import EditFrom from './component/editFrom'
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
          title: '开始展示时间',
          dataIndex: 'show_starttime',
          key: 'show_starttime',
        },{
          title: 'giftids',
          dataIndex: 'giftids',
          key: 'giftids',
          render:(text)=>{
            if(text){
              return(<div>{text}</div>)
            }else{
              return(<div>{'暂无数据'}</div>)
            }
          }
        }, {
          title: '开抢时间',
          dataIndex: 'sale_starttime',
          key: 'sale_starttime',
        }, {
          title: '结束时间',
          dataIndex: 'sale_endtime',
          key: 'sale_endtime',
        }, {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span className="Table_control_Wrapper">
                <a onClick={this.delecteItem.bind(this,record)}  href='JavaScript:void(0)'>删除</a>
                <a onClick={this.setRecord.bind(this,record,'editVisible')} style={{marginLeft:15}} href='JavaScript:void(0)'>编辑</a>
                <a onClick={this.setRecord.bind(this,record,'visible')} style={{marginLeft:15}}  href='javascript:void(0)'>查看秒杀商品</a>
            </span>
          ),
        }]
        this.state = {
          editVisible:false,
          addVisible:false,
          visible:false,
          pageIndex:1,
          pageSize:10,
          List:[],
          Total:null,
          Loading:true,
          record:null,
          recordId:null,
          giftid:null
        }
    }
    delecteItem(record){
      let obj = Object.assign({},record);
      obj['record_status'] = 3;
      this.gob.aspPost('management/flash_sale/flash_sale_subject/Update',obj).then(res=>{
        if(res.data.Code == '10000'){
            this.getList();
        }else{
            this.antdComponent.message.info("删除成功！");
        }
      })
    }
    setRecord(record,name){
      var obj = {};
      obj[name] = true;
      this.setState({
        record:record
      },()=>{
        this.setState(obj)
      })
    }
    componentDidMount(){
      this.getList();
    }
    getList(){
      let giftid = String(document.querySelector('[name=giftid]').value);
      var obj = {
        giftid:giftid!=''?giftid:null,
        pageIndex:this.state.pageIndex,
        pageSize:this.state.pageSize
      }
      this.gob.aspPost('management/flash_sale/flash_sale_subject/GetList',obj).then(res=>{
        this.setState({
          Total:res.data.Data.Total,
          List:res.data.Data.List,
          Loading:false
        })
      })
    }
    ChangePageTips(page, pageSize){
      this.setState({
        pageIndex:page
      },()=>{
        this.getList();
      })
    }
    handleChange(value){
    }
    showModel(){
        this.setState({
          visible:true
        })
    }
    hideModel(){
      this.setState({
        visible:false,
        addVisible:false,
        editVisible:false
      })
    }
    changeValue(e){
      var obj = {};
      obj[e.target.name] = e.targer.value;
      this.setState(obj);
    }
    render(){
        let SelfBreadcrumb = this.gobComponet.SelfBreadcrumb
        return(
            <Fragment>
              
              <SelfBreadcrumb TabList={['秒杀系统管理','秒杀系统']}></SelfBreadcrumb>
              
              <From 
                  record={this.state.record}
                  getList={this.getList.bind(this)}
                  visible={this.state.visible} 
                  hideModel={this.hideModel.bind(this)}></From>
              
              <AddFrom
                  getList={this.getList.bind(this)}
                  visible={this.state.addVisible} 
                  hideModel={this.hideModel.bind(this)}></AddFrom>
              
              <EditFrom
                  record={this.state.record}
                  getList={this.getList.bind(this)}
                  visible={this.state.editVisible} 
                  hideModel={this.hideModel.bind(this)}></EditFrom>

               <div className="TopWrapper">
                  <div className="SreachWrapper">
                    <div className="InputWrappr">
                      <Input name='giftid' 
                        // value={this.state.giftid} 
                        // onChange={this.changeValue.bind(this)} 
                        placeholder="请输入商品Id" />
                    </div>
                    <Button type="primary" onClick={this.getList.bind(this)} icon="search">Search</Button>
                  </div>
                  <div className="AddWrapper">
                    <Button onClick={()=>{this.setState({addVisible:true})}}>添加秒杀项目</Button>
                  </div>
               </div>
               
                <Table
                      loading={this.state.Loading}  
                      pagination={false}  
                      columns={this.columns} 
                      dataSource={this.state.List} />

                <Pagination
                    onChange={this.ChangePageTips.bind(this)}
                    total={this.state.Total}
                    showTotal={total => (<div className="pageTips">{`总${total}条数据 `}</div>)}
                    pageSize={this.state.pageSize}
                    defaultCurrent={1}
                />
            </Fragment>
        )
    }
}