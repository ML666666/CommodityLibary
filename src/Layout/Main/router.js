import React, { Component } from 'react';
import './Main.css';
import {Spin} from 'antd';
import Loadable from 'react-loadable';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

//懒加载所用Loading,加载路由页面前引用
const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <div style={{
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
    }
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>
    }
};


//引入页面  路由页面懒加载
const HomePage = Loadable({loader: () => import('../../page/HomePage/HomePage'),loading: MyLoadingComponent});
const AddCommodity = Loadable({loader: () => import('../../page/CommodityManagement/SubMenu/AddCommodity'),loading: MyLoadingComponent});
const SupplierController = Loadable({loader: () => import('../../page/CommodityManagement/SupplierController/SupplierController'),loading: MyLoadingComponent});
const MaterialController = Loadable({loader: () => import('../../page/Material-Controller/Material-Controller'),loading: MyLoadingComponent});
const ClassController = Loadable({loader: () => import('../../page/ClassController/ClassController/ClassController'),loading: MyLoadingComponent});
const ClassGroupController = Loadable({loader: () => import('../../page/ClassController/ClassGroupController/ClassGroupController'),loading: MyLoadingComponent});
const BrandController = Loadable({loader: () => import('../../page/CommodityManagement/BrandController/BrandController'),loading: MyLoadingComponent});
const Commodities = Loadable({loader: () => import('../../page/commodityEntitycontroller/getCostPriceOfCommodities/Commodities'),loading: MyLoadingComponent});
const CommodityEntities = Loadable({loader: () => import('../../page/commodityEntitycontroller/getCommodityEntities/CommodityEntities'),loading: MyLoadingComponent});
const getPurchaseList = Loadable({loader: () => import('../../page/PurchaseController/getPurchaseList/getPurchaseList'),loading: MyLoadingComponent});
const queryStock = Loadable({loader: () => import('../../page/commodityStockController/queryStock'),loading: MyLoadingComponent});
const getCommoditySales = Loadable({loader: () => import('../../page/CommoditySaleController/getCommoditySales/getCommoditySales'),loading: MyLoadingComponent});
const getCommoditySalePrices = Loadable({loader: () => import('../../page/CommoditySaleController/getCommoditySalePrices/getCommoditySalePrices'),loading: MyLoadingComponent});
const newCommoditySale = Loadable({loader: () => import('../../page/CommoditySaleController/newCommoditySale/newCommoditySale'),loading: MyLoadingComponent});
const getPurchasePriceList = Loadable({loader: () => import('../../page/PurchaseController/getPurchasePriceList/getPurchasePriceList'),loading: MyLoadingComponent});
const batchAddPurchase = Loadable({loader: () => import('../../page/PurchaseController/batchAddPurchase/batchAddPurchase'),loading: MyLoadingComponent});
const CommoditySalesVolumeController = Loadable({loader: () => import('../../page/CommoditySalesVolumeController/CommoditySalesVolumeController'),loading: MyLoadingComponent});
const FlashSaleSubject = Loadable({loader: () => import('../../page/flash_sale_subject/flashSaleSubject'),loading: MyLoadingComponent});


class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            routerList:[
                {url:'/',component:getPurchaseList,exact: true},
                {url:'/CommodityManagement/SupplierController',component:SupplierController},
                {url:'/CommodityManagement/BrandController',component:BrandController},
                {url:'/CommodityManagement/AddCommodity',component:AddCommodity},
                {url:'/MaterialController',component:MaterialController},
                {url:'/ClassController/ClassController',component:ClassController},
                {url:'/ClassController/ClassGroupController',component:ClassGroupController},
                {url:'/commodityEntitycontroller/getCostPriceOfCommodities/Commodities',component:Commodities},
                {url:'/commodityEntitycontroller/getCommodityEntities/CommodityEntities',component:CommodityEntities},
                {url:'/PurchaseController/getPurchaseList/getPurchaseList',component:getPurchaseList},
                {url:'/commodityStockController/queryStock',component:queryStock},
                {url:'/PurchaseController/getPurchasePriceList/getPurchasePriceList',component:getPurchasePriceList},
                {url:'/CommoditySaleController/getCommoditySales/getCommoditySales',component:getCommoditySales},
                {url:'/CommoditySaleController/getCommoditySalePrices/getCommoditySalePrices',component:getCommoditySalePrices},
                {url:'/CommoditySaleController/newCommoditySale/newCommoditySale',component:newCommoditySale},
                {url:'/PurchaseController/batchAddPurchase/batchAddPurchase',component:batchAddPurchase},
                {url:'/CommoditySalesVolumeController/CommoditySalesVolumeController',component:CommoditySalesVolumeController},
                {url:'/FlashSaleSubject',component:FlashSaleSubject},
            ]
        }
    }
 
    render(){

        //循环注册组件
        const location = this.props.location
        return(
           <div style={{position:'relative'}} className="React_App_Body_Wrapper">
            <Switch location={location}>
                <TransitionGroup>
                    {
                        this.state.routerList.map((item,index)=>{
                            return(
                                <CSSTransition
                                    key={index}
                                    classNames="star"
                                    timeout={300}>
                                    <Route  exact={item.exact}  path={item.url} component={item.component}></Route>
                                </CSSTransition>   
                            )
                        })
                    }
                </TransitionGroup>
            </Switch>
           </div> 
        )
    }
}

export default Main