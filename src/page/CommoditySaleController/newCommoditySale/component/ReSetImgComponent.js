import React, { Component } from 'react'
import { Popover , Button , Icon,message } from 'antd'
import axios from 'axios'
export default class componentName extends Component {
  constructor(props){
      super(props)
      this.state = {
        setSpecificationVisible:false,
        list:[],
        fileUrl:null,
        fileName:null,
        getItemIndex:null,
        showItemIndex:0,
      }
  }
  componentDidMount(){
    this.getList()
  }
  getList(){
    var obj = {
        materialType: 2,
        commodityId: this.store.getState().CommoditySaleObj.id,
        pageIndex: 1,
        pageCount: 10000,
    }
    this.gob.get('/queryMaterial',obj).then(res=>{
        this.setState({
            list:res.data.data.list
        })
    })
  }
  toggleMoDel(){
    this.setState({
        setSpecificationVisible:!this.state.setSpecificationVisible
    })
  }
  MakeSureImg(){
    this.props.setImg(this.state.list[this.state.getItemIndex].fileUrl)
  }
  getImg(index){
    this.setState({
        getItemIndex:index
    })
  }
  showImg(){
      return(
          <img style={{width:'320px'}} src={this.state.list[this.state.showItemIndex].fileUrl}></img>
      )
  }
  addSetImg(e){
    let file = e.target.files[0];           
        let param = new FormData(); 
        let config = {headers:{'Content-Type':'multipart/form-data'}}; 
        param.append('file',file,file.name);
        this.setState({fileName:file.name});
        axios.post('https://gate.ujinbi.com/file_dfs/File/Upload',
            param,
            {
                headers: {
                     'ZhaoQiLai-Token': localStorage.getItem('ZhaoQiLai-Token')
                }
            },
            config).then(res=>{
                if(res.data.code == "10000"){
                    this.setState({
                        fileUrl:res.data.data.dic.picfullpath
                    },()=>{
                        var obj = {
                            commodityId: this.store.getState().CommoditySaleObj.id,
                            fileName: this.state.fileName,
                            materialType: 2,
                            fileType: 1,
                            fileComment: this.state.fileName,
                            fileUrl: this.state.fileUrl
                        }
                        this.gob.post('/updateFileUrl',obj).then(res=>{
                            if(res.data.code == 10000){
                                message.info(res.data.msg);
                                this.getList();
                            }else{
                                message.info(res.data.msg);
                            }
                        })
                    })
                }else{
                     message.info(res.data.msg);
                }
    })
  }
  renderList(){
      if(this.state.list.length){
          return(
              <div  style={{padding:'16',minHeight:'138',borderBottom:'1px solid #e8e8e8'}}>
                  {
                      this.state.list.map((item,index)=>{
                            return(
                                <Popover
                                    placement="left"
                                    onMouseEnter={()=>{this.setState({showItemIndex:index})}} 
                                    content={this.showImg()}
                                    title="商品素材展示">
                                    <div onClick={this.getImg.bind(this,index)} 
                                         key={index} 
                                         style={{marginBottom:8,display:'flex',justifyContent:'space-between'}}>
                                        <span>
                                            <Icon style={{marginRight:8}} type="link" />
                                            <a href='javascript:void(0)'>{item.fileName}</a>
                                        </span>
                                        {
                                            this.state.getItemIndex == index?<Icon style={{marginRight:8}} type="check" />:''
                                        }
                                    </div>
                                </Popover>
                            )      
                      })
                  }
              </div>
          )
      }else{
          return(
              <div style={{padding:'24px 0px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <label htmlFor='_UP_LOAD_FILE' style={{fontSize:'40px',textAlign:'center'}}>
                    <Icon type="upload" />
                    <p style={{fontSize:'16px'}}>暂无商品图片素材,请点击上传</p>
                  </label>
              </div>
          )
      }
  }
  reSetImgContent(){
      return(
          <div>
             {
                this.renderList()
             }
             <div className='_title'></div>
             <div className='_title'></div>
             <input onChange={this.addSetImg.bind(this)} type='file' id='_UP_LOAD_FILE' style={{display:'none'}}></input>
                    <Button 
                        style={{marginRight:'16px'}}
                        onClick={this.MakeSureImg.bind(this)} type="primary">确认商品素材</Button>
                    <label htmlFor='_UP_LOAD_FILE'>   
                        <Button
                            style={{marginRight:'16px'}} 
                            >
                            <label htmlFor='_UP_LOAD_FILE'>
                                上传素材
                            </label>
                        </Button>
                    </label> 
                    <Button 
                        onClick={this.toggleMoDel.bind(this)}>关闭</Button>
          </div>
      )
  }
  render() {
    return (
        <Popover 
                content={this.reSetImgContent()}
                visible={this.state.setSpecificationVisible} 
                title="选择商品素材" trigger="click">
                <Button
                        onClick={this.toggleMoDel.bind(this)}
                        >
                        选择商品素材
                </Button>
        </Popover>
    )
  }
}
