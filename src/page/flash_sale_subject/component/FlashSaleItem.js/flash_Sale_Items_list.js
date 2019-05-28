import React, { Component } from 'react';
import { Modal, Button, Input, Table, Popover, Icon ,Pagination , Popconfirm } from 'antd';
import CheckImg from '../../../../CommonComponent/CheckImg/CheckImg'
import ChangeFlashItemBtn from './component/ChangeFlashItemBtn'
import DeleteItemBtn from './component/DeleteItemBtn'
import CheckStock from './component/CheckStock'
import SaleList from './component/SaleList'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';


class ClassName extends Component{
    
    constructor(props){
        super(props)
        this.columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
          }, {
            title: '活动Id',
            dataIndex: 'subjetid',
            key: 'subjetid',
          }, {
            title: '礼品Id',
            dataIndex: 'giftid',
            key: 'giftid',
          }, 
          {
            title: '金币数量',
            dataIndex: 'gold',
            key: 'gold',
          }, 
          {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
          },
          {
            title: '商品名称',
            dataIndex: 'gift_name',
            key: 'gift_name',
            render:(text)=>{
                if(text){
                    return(<div>{text}</div>)
                }else{
                    return(<div>{`暂无数据`}</div>)
                }
            }
          },
          {
            title: '查看消费记录',
            render:(text,record)=>(
                <a onClick={()=>{
                    this.setState({
                         item_id:record.id   
                    },()=>{
                        this.setState({visible:true})
                    })
                }} href="javascript:void(0)">查看消费记录</a>
            )
          },
          {
            title: '查看商品库存',
            render:(text,record)=>(
                <CheckStock
                    record={record}
                ></CheckStock>
            )
          },
          {
            title: '商品图片',
            dataIndex: 'gift_pic',
            key: 'gift_pic',
            render:(text,record)=>(
                <CheckImg URL={text}></CheckImg>
            )
          },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span className="Table_control_Wrapper">

                <ChangeFlashItemBtn
                    subjectId={this.state.subjectId}
                    record={record}
                    getList={this.getList.bind(this)}
                ></ChangeFlashItemBtn>

                <DeleteItemBtn
                    subjectId={this.state.subjectId}
                    record={record}
                    getList={this.getList.bind(this)}
                ></DeleteItemBtn>

              </span>
            ),
        }]
        this.state = {
            item_id:null,
            visible:false,
            pageIndex:1,
            pageSize:10,
            subjectId:null,
            List:[],
            Total:null,
            loading:true,
            giftid:null,
            stock:null,
            changeItemVisible:null
        }
    }
    componentWillReceiveProps(nextProps){

        if(this.props.record && nextProps.visible){
            this.setState({
                pageIndex:1,
                subjectId:this.props.record.id,
                List:[],
                Total:null,
                loading:true,
                visible:false
            },()=>{
                this.getList(false);
            })
        }

    }
    handleOk = () => {
        this.props.hideModel()
    }
    handleCancel = () => {
        this.props.hideModel()
    }
    onCancel = () =>{
        this.setState({visible:false})
    }
    getList(isUpdataOutSideList){

        var obj = {
            pageIndex:this.state.pageIndex,
            pageSize:this.state.pageSize,
            subjectId:this.state.subjectId
        }
        this.gob.aspPost('management/flash_sale/flash_sale_items/GetList',obj).then(res=>{
            if(res.data.Code == '10000'){
                this.setState({
                    List:res.data.Data.List,
                    Total:res.data.Data.Total,
                    loading:false
                },()=>{
                    if(!isUpdataOutSideList){
                        return
                    }
                    let str = ''
                    for(let k in this.state.List){
                        str += (',' + String(this.state.List[k].giftid)) 
                    }
                    var obj = {
                        show_starttime:this.props.record.show_starttime,
                        sale_starttime:this.props.record.sale_starttime,
                        sale_endtime:this.props.record.sale_endtime,
                    }
                    obj['id'] = this.props.record.id;
                    obj['record_status'] = 1;
                    obj['giftids'] = str.substring(1);
                    this.gob.aspPost('management/flash_sale/flash_sale_subject/Update',obj)
                })
            }
        })
    }
    ChangePageTips(index){
        this.setState({
            pageIndex:index
        },()=>{
            this.getList(false);
        })
    }
    changeValue(e){
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }
    addITem(){
        var obj = {
            giftid:this.state.giftid,
            stock:this.state.stock,
            subjetid:this.state.subjectId,
            record_status:1
        }
        this.gob.aspPost('management/flash_sale/flash_sale_items/Add',obj).then(res=>{
            if(res.data.Code == '10000'){
                this.antdComponent.message.info('添加成功');
                this.getList(true);
            }
        })
    }
    addItemContent(){
        return(

            <div>
                <div className='_title'>请输入商品ID</div>
                <Input onChange={this.changeValue.bind(this)} value={this.state.giftid} name='giftid' placeholder="请输入商品ID" />
                <div className='_title'>请秒杀库存</div>
                <Input onChange={this.changeValue.bind(this)} value={this.state.stock} name='stock' placeholder="请秒杀库存" />
                <div className='_title'></div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <Button onClick={this.addITem.bind(this)} type="primary" >确认添加</Button>
                </div>
            </div>
            
        )
    }  
    render(){
        return(
            <div id='specialFrom'>

                <SaleList
                    item_id={this.state.item_id}
                    visible={this.state.visible}
                    hideModel={this.onCancel.bind(this)}
                ></SaleList>

                <Modal 
                    afterClose={this.props.getList}
                    width={1200}  
                    title="秒杀商品列表"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>

                    <div style={{display: 'flex',justifyContent: 'space-between'}}>

                        <Popover
                            content={this.addItemContent()}
                            placement="bottom"
                            title="添加商品">
                            <Button style={{marginBottom:16}}>添加商品</Button>
                        </Popover>

                        <Pagination
                            id='spacialPagination'
                            style={{margin:'0'}}
                            onChange={this.ChangePageTips.bind(this)}
                            total={this.state.Total}
                            showTotal={total => (<div className="pageTips">{`总${total}条数据 `}</div>)}
                            pageSize={this.state.pageSize}
                            defaultCurrent={1}></Pagination>

                    </div>

                    <Table  
                        loading={this.state.loading} 
                        pagination={false}  
                        columns={this.columns} 
                        dataSource={this.state.List} />
                </Modal>
          </div>
        )
    }
}
export default immutableRenderDecorator(ClassName)