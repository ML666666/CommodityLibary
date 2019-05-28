import React, { Component,Fragment } from 'react';
import { Table, Icon } from 'antd';
import { Pagination } from 'antd';
import { Button } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import From from './component/from'
import SelfBreadcrumb from '../../../CommonComponent/selfBreadcrumb'
const Option = Select.Option;

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span className="Table_control_Wrapper">
        <Button  icon="search">Search</Button>
        <Button  icon="search">Search</Button>
      </span>
    ),
}];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}
];

  
export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.state = {
          visible:false
        }
    }
    ChangePageTips(page, pageSize){
    }
    handleChange(value){
      console.log(value);
    }
    showModel(){
        this.setState({
          visible:true
        })
    }
    hideModel(){
      this.setState({
        visible:false
      })
    }
    render(){
        return(
            <Fragment>
              <From visible={this.state.visible} hideModel={this.hideModel.bind(this)}></From>

               <div className="TopWrapper">
                  <div className="SreachWrapper">
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                      <Option value="jack">Jack</Option>
                    </Select>
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                      <Option value="jack">Jack</Option>
                    </Select>
                    <div className="InputWrappr">
                      <Input placeholder="large size" />
                    </div>
                    <Button type="primary" icon="search">Search</Button>
                  </div>
                  <div className="AddWrapper">
                    <a style={{'marginRight':10}} href="javascript:void">编辑</a>
                    <a href="javascript:void">删除</a>
                  </div>
               </div>
                <Table  pagination={false}  columns={columns} dataSource={data} />
                <Pagination
                    onChange={this.ChangePageTips.bind(this)}
                    total={85}
                    showTotal={total => (<div className="pageTips">{`总${total}条数据 `}</div>)}
                    pageSize={20}
                    defaultCurrent={1}
                />
            </Fragment>
        )
    }
}