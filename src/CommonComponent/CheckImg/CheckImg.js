import React, { Component,Fragment } from 'react'
import { CSSTransition } from "react-transition-group";
import './CheckImg.css'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import PropTypes from 'prop-types';
// 该组件为查看图片组件
class CheckImg extends Component {
  constructor(props){
    super(props)
    this.state = {
      toggleShow:false,
      reDoNum:0,
      Size:0,
    }
  }

  //是否显示放大图片组件
  toggleShow(){
    this.setState({
      toggleShow:!this.state.toggleShow
    })
  }


  redo(){
    this.setState({
      reDoNum:this.state.reDoNum+1
    })
  }

  onChangeSize(value){
    this.setState({
      Size:value
    })
  }


  checkImg(imgUrl){
    return(
      <img src={imgUrl}></img>
    )
  }
  render() {
    
    // 声明antdUI组件,可在头部引入
    let Slider = this.antdComponent.Slider;
    let Icon = this.antdComponent.Icon;
    let Popover = this.antdComponent.Popover;

    return (
      <Fragment>

          {/* CSSTransition为组件显示添加渐变效果 */}
          <CSSTransition
            in={this.state.toggleShow}
            timeout={400}
            unmountOnExit
　　　　　　 classNames='star'
          >

            <div className='_CheckImgMask'>


              <div 
                   style={{transform:`translate(-50%,-50%) rotate(${90*this.state.reDoNum}deg) 
                                      scale(${1+this.state.Size*0.1})`}} 
                   className='imgWrapper'>
                   <img src={this.props.URL}></img>
              </div>


              <Slider 
                     onChange={this.onChangeSize.bind(this)} 
                     className='_Slider' 
                     vertical 
                     defaultValue={this.state.Size} />

              <Icon  
                     className='_Icon _Icon_1' 
                     onClick={this.redo.bind(this)} 
                     type="redo" />

              <a 
                     href={this.props.URL} 
                     download>
                     <Icon className='_Icon _Icon_2' type="arrow-down" />
              </a>

              <Icon  onClick={this.toggleShow.bind(this)} 
                     className='_Icon _Icon_3' 
                     type="close" />

            </div> 
          </CSSTransition>

          <Popover
            content={<img style={{maxWidth:'300 !important'}} 
            src={this.props.URL}></img>}
            placement="left"
            title="查看图片"
          >
              <a href='javascript:void(0)' 
                onClick={this.toggleShow.bind(this)}>
                {this.props.ImgName?this.props.ImgName:'查看图片'}
              </a>
          </Popover>

      </Fragment>
    )
  }
}


CheckImg.propTypes = {
  URL: PropTypes.string,  //图片URL 定义接受数据类型为STRING
  ImgName:PropTypes.string //图片名字 定义接受数据类型为STRING
};

export default immutableRenderDecorator(CheckImg)