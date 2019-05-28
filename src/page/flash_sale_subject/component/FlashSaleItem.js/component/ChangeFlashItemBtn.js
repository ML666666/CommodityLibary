import React, { Component } from 'react'
import { Input , Button , Popover} from 'antd'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
class componentName extends Component {
  constructor(props){
    super(props)
  }  
  changeItemContent(){
        let record = this.props.record;
        return(
            <div>
                <div className='_title'>请输入商品ID{record.giftid}</div>
                  <Input  defaultValue={record.giftid} className={`giftid_${record.id}`} name='giftid' placeholder="请输入商品ID" />
                <div className='_title'>请秒杀库存</div>
                  <Input  defaultValue={record.stock} className={`stock_${record.id}`} name='stock' placeholder="请秒杀库存" />
                <div className='_title'></div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <Button onClick={this.changeITem.bind(this,record)} type="primary" >确认修改</Button>
                </div>
            </div>
        )
  }
  changeITem(record){
    let giftid = document.getElementsByClassName(`giftid_${record.id}`)[0].value;
    let stock = document.getElementsByClassName(`stock_${record.id}`)[0].value;
    let id = this.props.record.id;
    let subjetid = this.props.subjectId;
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
            this.props.getList(true);
        }
    })
  }  
  render() {   
    return (
      
        <Popover
                  content={this.changeItemContent()}
                  placement="bottom"
                  title="修改子项">
                  <a style={{marginRight:16}} href='javascript:void(0)'>编辑</a>
        </Popover>

    )
  }
}

export default immutableRenderDecorator(componentName)