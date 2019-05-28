import React, { Component } from 'react'
import EditHTML from '../../../../CommonComponent/editHTML'
import {Popover,Button} from 'antd'

export default class componentName extends Component {
  constructor(props){
      super(props)
      this.state = {
        EditHTMLVisiBle:false
      }
  }
  toggleMoDel(name){
    var obj = {};
    obj[name] = !this.state[name];
    this.setState(obj)
  }
  setHTMLDetail(value){
    this.props.setHTMLDetail(value);
    this.toggleMoDel.bind(this,'EditHTMLVisiBle')
  }
  EditHTML(){
    return(
        <EditHTML
            detailHTML={this.props.detail}
            setHTMLDetail={this.setHTMLDetail.bind(this)}
            handleCanCel={this.toggleMoDel.bind(this,'EditHTMLVisiBle')}
        ></EditHTML>
    )
  }

  render() {
    return (
      <div>

            <Popover 
                    content={this.EditHTML()}
                    placement="left"
                    visible={this.state.EditHTMLVisiBle} 
                    title="编辑商品详情" trigger="click">   
                        <Button
                            onClick={this.toggleMoDel.bind(this,'EditHTMLVisiBle')}>
                               编辑商品详情 
                        </Button>
            </Popover>

            <div 
                    style={{marginTop:16}}
                    className="wrapper_3">
                        {
                            this.props.detail?
                                <div dangerouslySetInnerHTML={{__html: this.props.detail}}></div>:
                                <div style={{height:'645px'}} className='detailTips'>
                                    <span
                                        style=
                                        {{fontSize:'42px'}}
                                        >+</span>
                                    <span>展示商品详情</span>
                                </div>
                        }
            </div>

      </div>
    )
  }
}
