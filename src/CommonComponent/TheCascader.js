import React, { Component } from 'react';
import {Cascader} from 'antd'
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
class TheCascader extends Component{
    constructor(props){
        super(props)
        this.state = {
            FirstClasses:[],
            SecondClasses:[],
            options:[]
        }
    }
    componentDidMount(){
        this.gob.get('/class/getFirstClasses').then(res=>{
            let ary = [];
            res.data.data.forEach(element => {
                let obj = {};
                obj.value = element.id;
                obj.label = element.className;
                obj.isLeaf = false;
                obj.children = []
                ary.push(obj);
            });
            this.gob.get('/class/getSecondClasses').then(res=>{
                return new Promise((resolve,reject)=>{
                    ary.map((item)=>{
                        item.children = [] 
                        res.data.data.filter((i)=>{return i.parentId == item.value}).forEach(element=>{
                            var obj = {}
                            obj.value = element.id;
                            obj.label = element.className;
                            item.children.push(obj)
                        })
                        return item;
                    })
                    resolve(ary)
                })
            }).then(res=>{
                if(this.props.isSelectAll){
                    res.unshift({
                        value:0,
                        label:'全部',
                        isLeaf:false,
                    })
                }
                this.setState({
                    options:res
                })
            })
            if(this.props.InitList){
              this.props.initList(res.data.data)
            }
        })
    }
    render(){
        return(
            <Cascader
                disabled={this.props.disabled?this.props.disabled:false}
                defaultValue={this.props.defaultValue}
                placeholder={'请选择分类'}
                style={{width:this.props.width,marginRight:this.props.marginRight?this.props.marginRight:0}}
                options={this.state.options}
                onChange={this.props.getClassId}
            />
        )
    }
}

export default immutableRenderDecorator(TheCascader) 