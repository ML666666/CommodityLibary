import React, { Component,Fragment} from 'react';
import { Button,Modal,Table,message,Pagination,Menu,Icon,Dropdown} from 'antd'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
// const Option = Select.Option;
class componentName extends Component {
    constructor(props){
        super(props)
        this.columns = [{
            title: '订单ID',
            dataIndex: 'orderid',
            key: 'orderid',
          },{
            title: '订单号',
            dataIndex: 'ordercode',
            key: 'ordercode',
          },
          {
            title: '抢兑时间',
            dataIndex: 'create_time',
            key: 'create_time',
          }, 
          {
            title: '下单时间',
            dataIndex: 'exchange_time',
            key: 'exchange_time',
          } 
        ]
        this.state = {
            item_id:null,
            List:[],
            Total:null,
            loading:true,
            pageIndex:1,
            pageSize:10,
            isSubmitOrder:-1
        }   
    }
    ChangePageTips(index){
        this.setState({
            pageIndex:index
        },()=>{
            this.getList(false);
        })
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.item_id && nextProps.visible){
            this.setState({
                item_id:this.props.item_id
            },()=>{
                this.getlist();
            })
        }
    }
    handleChangeSelect(value){
        this.setState({
            isSubmitOrder:value
        })
    }
    getlist(){
        var obj = {
            item_id:this.state.item_id,
            pageIndex:this.state.pageIndex,
            pageSize:this.state.pageSize,
            isSubmitOrder:this.state.isSubmitOrder
        }
        this.gob.aspPost('management/flash_sale/flash_sale_item_user/GetList',obj).then(res=>{
            if(res.data.Code == '10000'){
                this.setState({
                    List:res.data.Data.List,
                    Total:res.data.Data.Total,
                    loading:false,
                })
            }else{
                message.info(res.data.Msg);    
            }
        })
    }
    handleMenuClick(e){
        this.setState({
            isSubmitOrder:parseInt(e.key)
        },()=>{
            this.getlist();
        })
    }
    renderStateText(index){
        switch(index){
            case 0:
                return(<span>未提交订单</span>);
                break;
            case 1:
                return(<span>已提交订单</span>);
                break;   
            case -1:
                return(<span>全部订单</span>);
                break; 
        }
    }
    render(){
        return(
            <Fragment>
                <Modal
                    width={980} 
                    title="查看消费记录"
                    visible={this.props.visible}
                    onOk={this.props.hideModel}
                    onCancel={this.props.hideModel}>
                    <div>
                        <div style={{display: 'flex',justifyContent: 'space-between',paddingBottom:'16px'}}>
                            <Dropdown overlay={
                                <Menu onClick={this.handleMenuClick.bind(this)}>
                                    <Menu.Item key="-1"><Icon type="smile" />全部订单</Menu.Item>
                                    <Menu.Item key="1"><Icon type="meh" />已提交订单</Menu.Item>
                                    <Menu.Item key="0"><Icon type="frown" />未提交订单</Menu.Item>
                                </Menu>
                            }>
                                <Button style={{ marginLeft: 8 }}>
                                  {this.renderStateText(this.state.isSubmitOrder)} <Icon type="down" />
                                </Button>
                            </Dropdown>
                            <Pagination
                                id='spacialPagination'
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
                    </div>
                </Modal>
            </Fragment>
        )
    }
}

export default immutableRenderDecorator(componentName)