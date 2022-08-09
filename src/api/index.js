// 当前这个模块：API进行统一管理
import requests from "./request";

import mockRequests from "./mockAjax";

// 三级联动接口
// 发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
// 获取banner（Home首页轮播图接口）
export const reqBannerList = () => mockRequests.get('/banner')
// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')
/*  
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// 获取搜索模块的数据，给服务器传递参数params至少是个空对象
export const reqSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })