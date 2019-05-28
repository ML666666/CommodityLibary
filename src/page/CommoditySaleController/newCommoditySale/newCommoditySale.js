import React , { Component } from 'react';
import { Button,Input,Icon, Spin,message} from 'antd';
import { CSSTransition } from "react-transition-group";
import ReSetImgComponent from './component/ReSetImgComponent'
import HandleEntityList from './component/HandleEntityList'
import EditHTMLComPoment from './component/EditHTML'
import SetSpecificationCom from './component/SetSpecificationCom'
import './newSale.css'
export default class newCommoditySale extends Component{
    constructor(props){
        super(props)
        this.state={
            shortName:null,
            image:null,
            commoditySaleName:null,//1
            classId:null,//1
            subClassId:null,//1
            subClass:null,//1
            classify:null,//1
            entityIdAndNumber:null,
            unitId:null,//1
            detail:'',//1
            commoditySaleId:null,
            specificationId:null,
            FirstClassList:[],
            SecondClassList:[],        
            EditLoading:true,
        }
    }
    componentDidMount(){
        if(this.store.getState().CommoditySaleObj){
            let record = this.store.getState().CommoditySaleObj;
            this.setState({
                commoditySaleName:record.commodityName,
                shortName:record.shortName,
                classId:record.classId,
                subClassId:record.subClassId,
                detail:record.detail,
                image:record.image,
                unitId:record.unitId,
                commoditySaleId:record.id,
                classify:record.classify,
                subClass:record.subClass,              
            })
            setTimeout(()=>{
                this.setState({
                    EditLoading:false
                })
            },200) 
        }else{
            setTimeout(()=>{
                this.setState({
                    EditLoading:false
                })
            },200)   
        }
    }
    componentWillUnmount(){
        this.store.dispatch({
            type:'DELETE_SALE_COMMODITY',
            payload:false
        })
    }
    handleChangeValue(e){
        var obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }
    setHTMLDetail(value){
        this.setState({
            detail:value
        })
    }
    setImg(value){
        this.setState({
            image:value
        })
    }
    setEntityIdAndNumber(value){
        this.setState({
            entityIdAndNumber:value
        })
    }
    setSpecificationId(value){
        this.setState({
            specificationId:value
        })
    }
    toggleMoDel(name){
        var obj = {};
        obj[name] = !this.state[name];
        this.setState(obj)
    }
    handleChangeSelect(name,value){
        var obj = {}
        obj[name] = value;
        this.setState(obj);
    }
    makeSureAddSaleGood(){
        var obj = {
            shortName:this.state.shortName,
            image:this.state.image,
            commodityName:this.state.commoditySaleName,
            classify:this.state.classify,
            classId:this.state.classId,
            subClassId:this.state.subClassId,
            subClass:this.state.subClass,
            specificationId:this.state.specificationId,
            entityIdAndNumber:this.state.entityIdAndNumber,
            unitId:this.state.unitId,
            detail:this.state.detail
        }
        for(let k in obj){
            if(!obj[k]){
                message.info('请填写完整信息');
                return
            }
        }
        let rpath = ''
        if(this.store.getState().CommoditySaleObj){
            obj['id'] = this.state.commoditySaleId;
            rpath = '/sale/editCommoditySale'
        }else{
            rpath = '/sale/newCommoditySale'
        }
        this.gob.post(rpath,obj).then(res=>{
            if(res.data.code == 10000){
                message.info(this.store.getState().CommoditySaleObj?'编辑销售商品成功':'新增销售商品成功');
                setTimeout(()=>{
                    let path = `/CommoditySaleController/getCommoditySales/getCommoditySales`
                    this.props.history.push(path);
                },200)    
            }else{
                message.info(res.data.msg);
            }
        })
    }
    initList(name,value){
        var obj = {}
        obj[name] = value;
        this.setState(obj);
    }
    getClassId(value,selectedOptions){
        if(selectedOptions[0]){
            this.setState({
                classId:selectedOptions[0].value,
                classify:selectedOptions[0].label
            })
        }
        if(selectedOptions[1]){
            this.setState({
                subClassId:selectedOptions[1].value,
                subClass:selectedOptions[1].label
            })
        }else{
            this.setState({
                subClassId:null,
                subClass:null
            })
        }
    }
    render(){
        
        let GetUnitList = this.gobComponet.GetUnitList;
        let UpLoadImg = this.gobComponet.UpLoad;
        let SelfBreadcrumb = this.gobComponet.SelfBreadcrumb;
        let TheCascader = this.gobComponet.TheCascader;

        return(
            <div style={{position:'relative'}} id='newSalesWrapper'>
            <CSSTransition
　　　　　　　　　　in={this.state.EditLoading}
　　　　　　　　　　timeout={400}
                  unmountOnExit
　　　　　　　　　　classNames='fade'>
                    <div style={{
                        position:'absolute',
                        top:'0',
                        left:'0',
                        background:'rgba(255,255,255)',
                        width:'100%',
                        height:'100%',
                        zIndex:100,
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                      <Spin tip="Loading..." size='large'></Spin>
                    </div>
            </CSSTransition>                
            <SelfBreadcrumb TabList={['销售商品管理','新增-编辑销售商品']}></SelfBreadcrumb>
                <div className="newSalesWrapper">
                    <div className="wrapper_1">
                        <div className='btw'>
                            <div>
                                <div className='_title'>请输入商品名称</div>
                                <Input
                                    value={this.state.commoditySaleName}
                                    onChange={this.handleChangeValue.bind(this)} 
                                    name='commoditySaleName' 
                                    placeholder="请输入商品名称" 
                                    style={{width:'300px'}}></Input>
                            </div>
                            <div>
                                <div className='_title'>请输入商品简称</div>
                                <Input 
                                    value={this.state.shortName}
                                    onChange={this.handleChangeValue.bind(this)} 
                                    name='shortName' 
                                    placeholder="请输入商品简称" 
                                    style={{width:'300px'}}></Input>
                            </div>
                        </div>
                        <div className='btw'>

                            <div>
                                    <div className='_title'>请选择分类</div>
                                    {
                                        this.store.getState().CommoditySaleObj?
                                            <TheCascader defaultValue={[this.store.getState().CommoditySaleObj.classId,this.store.getState().CommoditySaleObj.subClassId]} marginRight={15}width={650} getClassId={this.getClassId.bind(this)}></TheCascader>
                                            :<TheCascader marginRight={15}width={650} getClassId={this.getClassId.bind(this)}></TheCascader>
                                    }
                            </div>

                        </div>
                        <div className='btw'>
                            <div>
                                <div className='_title'>请选择渠道</div>
                                <GetUnitList
                                    id={this.state.unitId}
                                    handleChangeSelect={this.handleChangeSelect.bind(this,'unitId')}  
                                    name='unitId' 
                                    width={650}></GetUnitList>
                            </div>
                        </div>
                        <div className='btw'>
                            <div>
                                <SetSpecificationCom setSpecificationId={this.setSpecificationId.bind(this)}></SetSpecificationCom>
                                {   
                                    this.store.getState().CommoditySaleObj?<ReSetImgComponent setImg={(this.setImg.bind(this))}></ReSetImgComponent>:''
                                }
                            </div>
                        </div>
                        <div className='btw'>
                                <Button onClick={this.makeSureAddSaleGood.bind(this)} type="primary">
                                {
                                    this.store.getState().CommoditySaleObj?'确认编辑商品信息':'确认添加商品信息'
                                }
                                </Button>
                        </div>
                    </div>
                    <div className="wrapper_2">
                        <HandleEntityList 
                            setEntityIdAndNumber={this.setEntityIdAndNumber.bind(this)}>
                        </HandleEntityList>


                        <div className='_title'>上传商品图片</div>
                        <div className='btw'>
                            <UpLoadImg
                                setImg={this.setImg.bind(this)}
                                _img={this.state.image}
                                tips={'请上传商品图片'}
                            ></UpLoadImg>
                        </div>
                    </div>
                    <div>
                        <EditHTMLComPoment
                            setHTMLDetail={this.setHTMLDetail.bind(this)} 
                            detail={this.state.detail}></EditHTMLComPoment>
                    </div>
                </div>
            </div>
        )
    }
}