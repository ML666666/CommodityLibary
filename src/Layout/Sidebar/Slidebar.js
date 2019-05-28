import { BrowserRouter as Router,Link } from "react-router-dom";
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

//注册完组件后就可以用  Link 组件进行跳转 ,当然也可以调用js方法进行跳转详情百度

class Sider extends Component {
  render() {
    return (
      <div>
      <Menu
        onClick={this.handleClick}
        style={{ width: 240 }}
        mode="inline"
      >
        {/* <Menu.Item key="0"><Link to='/HomePage'>首页</Link></Menu.Item> */}
        
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>商品采购管理</span></span>}>
            <Menu.Item key="1"><Link to='/PurchaseController/getPurchaseList/getPurchaseList'>商品采购管理</Link></Menu.Item>
            {/* <Menu.Item key="3"><Link to='/PurchaseController/batchAddPurchase/batchAddPurchase'>导入采购商品</Link></Menu.Item> */}
            <Menu.Item key="5"><Link to='/PurchaseController/getPurchasePriceList/getPurchasePriceList'>采购商品价格管理</Link></Menu.Item>
            <Menu.Item key="6"><Link to='/CommodityManagement/BrandController'>品牌管理</Link></Menu.Item>
            <Menu.Item key="7"><Link to='/CommodityManagement/SupplierController'>供应商管理</Link></Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>商品分类管理</span></span>}>
          <Menu.Item key="8"><Link to='/ClassController/ClassController'>添加商品分类</Link></Menu.Item>
          <Menu.Item key="9"><Link to='/ClassController/ClassGroupController'>添加分类组</Link></Menu.Item>
        </SubMenu>

        <SubMenu key="sub3" title={<span><Icon type="setting" /><span>查询商品实物列表</span></span>}>
          <Menu.Item key="10"><Link to='/commodityEntitycontroller/getCommodityEntities/CommodityEntities'>商品实物查询</Link></Menu.Item>
          <Menu.Item key="11"><Link to='/commodityEntitycontroller/getCostPriceOfCommodities/Commodities'>商品成本价格查询</Link></Menu.Item>
        </SubMenu>

        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>销售商品管理</span></span>}>
          <Menu.Item key="12"><Link to='/CommoditySaleController/getCommoditySales/getCommoditySales'>销售商品列表</Link></Menu.Item>
          <Menu.Item key="13"><Link to='/CommoditySaleController/getCommoditySalePrices/getCommoditySalePrices'>销售商品价格列表</Link></Menu.Item>
          {/* <Menu.Item key="14"><Link to='/CommoditySaleController/newCommoditySale/newCommoditySale'>新增/编辑销售商品</Link></Menu.Item> */}
        </SubMenu>

        <Menu.Item key="15"><Link to='/MaterialController'>商品素材管理</Link></Menu.Item>
        <Menu.Item key="16"><Link to='/commodityStockController/queryStock'>实物商品库存查询</Link></Menu.Item>
        <Menu.Item key="17"><Link to='/CommoditySalesVolumeController/CommoditySalesVolumeController'>商品销售查询</Link></Menu.Item>
        <Menu.Item key="18"><Link to='/FlashSaleSubject'>秒杀系统管理</Link></Menu.Item>
      </Menu>
      </div>
    );
  }
}

export default immutableRenderDecorator(Sider)
