import React , { Component,Fragment } from 'react'
import axios from 'axios'
import './UpLoadImg.css'
import { Icon } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import PropTypes from 'prop-types';
// 该组件在新增/编辑销售商品时用到
class UpLoadImg extends Component{
    constructor(props){
        super(props)
        this.state = {
            imageUrl:null
        }
    }

    //上传图片促发该方法,调用ASP接口
    upLoadData(e){
        let file = e.target.files[0];           
        let param = new FormData(); 
        let config = {headers:{'Content-Type':'multipart/form-data'}}; 
        param.append('file',file,file.name);
        axios.post('https://gate.ujinbi.com/file_dfs/File/Upload',
            param,
            {
                // 该Token从服务端返回
                headers: {
                     'ZhaoQiLai-Token': localStorage.getItem('ZhaoQiLai-Token')
                }
            },
            config).then(res=>{
                if(res.data.code == "10000"){

                    this.setState({
                        imageUrl:res.data.data.dic.picfullpath
                    },()=>{
                        // 将上传成功后服务的返回的图片路径,返回给父组件
                        this.props.setImg(res.data.data.dic.picfullpath)
                        this.antdComponent.message.info("上传成功！");
                    })
                }else{
                    this.antdComponent.message.info(res.data.msg);
                }
            })
    }
    render(){
        return(
         
            <Fragment>
                
                <input 
                        onChange={this.upLoadData.bind(this)} 
                        style={{'display':'none'}} 
                        type='file' 
                        accept="image/*" 
                        id="_Ava" />

                <label 
                        style={
                            {
                                minHeight:this.props.height?
                                          this.props.height:360,
                                'width':  this.props.width?
                                          this.props.width:360
                            }
                        } 
                        htmlFor="_Ava" 
                        className="_Ava avatar-uploader avatar">
                    {
                    this.props._img?
                    <img 
                         src={this.props._img}
                         style={
                                {
                                    minHeight:this.props.height?
                                              this.props.height:360,
                                    'width':  this.props.width?
                                              this.props.width:360
                                }
                        } 
                        className="avatar" />:
                    <div
                        style={
                                {
                                    minHeight:this.props.height?
                                              this.props.height:360,
                                    'width':  this.props.width?
                                              this.props.width:360
                                }
                        } 
                        className="tips">
                        <span
                            style={{fontSize:'42px'}}
                        >+</span>
                        <span>{this.props.tips?
                                    this.props.tips:'请上传图片'}</span>
                    </div>
                }
                </label>
            </Fragment>
        )
    }
}

UpLoadImg.propTypes = {
    tips: PropTypes.string,   //图片URL 定义接受数据类型为STRING
    width:PropTypes.number,  //组件Width 定义接收Number类型
    height:PropTypes.number, //组件Height 定义接受Number类型
    _img:PropTypes.string, //组件图片路径 定义接受String类型
    setImg:PropTypes.func.isRequired  //父组件接受子组件返回的URL的组件(父组件一定要提供)
};

export default immutableRenderDecorator(UpLoadImg)