import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';
import { Table, Icon } from 'antd';
import CheckImg from '../../../CommonComponent/CheckImg/CheckImg'
import { Popover } from 'antd';
import { Pagination,Popconfirm } from 'antd';
export default class From extends Component{
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

             <Popover
                    content={this.changeItemContent(record)}
                    placement="bottom"
                    title="修改子项">
                <a onClick={()=>{this.setState({changeItemVisible:true})}} style={{marginRight:16}} href='javascript:void(0)'>编辑</a>
              </Popover>

              <Popconfirm title="是否删除该记录?" onConfirm={this.deleteItem.bind(this,record)}  okText="Yes" cancelText="No">
                <a href='javascript:void(0)'>删除</a>
              </Popconfirm>
              </span>
            ),
        }]
        this.state = {
            pageIndex:1,
            pageSize:8,
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
                    this.gob.aspPost('management/flash_sale/flash_sale_subject/Update',obj).then(res=>{
                        // this.props.getList();
                    }) 
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
    deleteItem(record){
        var obj = {
            id:record.id,
            subjetid:this.state.subjectId,
            giftid:record.giftid,
            stock:record.stock,
            record_status:3
        }
        this.gob.aspPost('management/flash_sale/flash_sale_items/Update',obj).then(res=>{
            if(res.data.Code == '10000'){
                this.antdComponent.message.info('删除成功');
                this.getList(true);
            }
        })
    }
    changeITem(record){
        let giftid = document.getElementsByClassName(`giftid_${record.id}`)[0].value;
        let stock = document.getElementsByClassName(`stock_${record.id}`)[0].value;
        let id = record.id;
        let subjetid = this.state.subjectId;
        let record_status = 1;
        var obj = {
            giftid:giftid,
            stock:stock,
            id:id,
            subjetid:subjetid,
            record_status:record_status
        }
        this.gob.aspPost('management/flash_sale/flash_sale_items/Update',obj).then(res=>{
            if(res.data.Code == '10000'){
                this.antdComponent.message.info('更新成功');
                this.getList(true);
            }
        })
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
    changeItemContent(record){
        return(
            <div>
                <div className='_title'>请输入商品ID</div>
                <Input  defaultValue={record.giftid} className={`giftid_${record.id}`} name='giftid' placeholder="请输入商品ID" />
                <div className='_title'>请秒杀库存</div>
                <Input  defaultValue={record.stock} className={`stock_${record.id}`} name='stock' placeholder="请秒杀库存" />
                <div className='_title'></div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    {/* <Button onClick={()=>{this.setState({visible:false})}}>关闭</Button> */}
                    <Button onClick={this.changeITem.bind(this,record)} type="primary" >确认修改</Button>
                </div>
            </div>
        )
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
                    {/* <Button onClick={()=>{this.setState({changeItemVisible:false})}}>关闭</Button> */}
                    <Button onClick={this.addITem.bind(this)} type="primary" >确认添加</Button>
                </div>
            </div>
        )
    }  
    render(){
        return(
            <div id='specialFrom'>
                <Modal 
                    afterClose={this.props.getList}
                    width={1380}  
                    title="子项列表"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel}>
                    <div style={{display: 'flex',justifyContent: 'space-between'}}>
                        <Popover
                            content={this.addItemContent()}
                            placement="bottom"
                            title="添加子项">
                            {/* // trigger="click"
                            // visible={this.state.visible}> */}
                            <Button style={{marginBottom:16}}>添加子项</Button>
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