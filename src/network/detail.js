import {request} from "./request";

export function getDetail(iid) {
  return request({
    url:"/detail",
    params:{
      iid
    }
    })
}

//整合商品详情轮播图下的数据，导出一个类
export class GoodsInfo {
  constructor(itemInfo,columns,services){
    this.title=itemInfo.title;
    this.desc=itemInfo.desc;
    this.newPrice=itemInfo.price;
    this.oldPrice=itemInfo.oldPrice;
    this.discount=itemInfo.discountDesc;
    this.columns=columns;
    this.services=services;
    this.realPrice=itemInfo.lowNowPrice;

  }
}

//商品详情中店铺数据的整理
export class Shop {
  constructor(shopInfo){
    this.logo=shopInfo.shopLogo;
    this.name=shopInfo.name;
    this.fans=shopInfo.cFans;
    this.sells=shopInfo.cSells;
    this.score=shopInfo.score;
    this.goodsCount=shopInfo.cGoods;
  }
}

//尺码的展示
export class GoodsParam {
  constructor(info,rule){
    //images有时候没有值，
    this.image=info.images?info.images[0]:'';
    this.infos=info.set;
    this.sizes=rule.tables;
  }

}

