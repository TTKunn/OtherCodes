import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type { PageState } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type { NewsData } from './NewsData';
//新闻数据模型类，用于管理新闻列表状态和数据
export default class NewsModel {
    //新闻数据数组
    newsData: Array<NewsData> = [];
    //当前页码
    currentPage: number = 1;
    //每页大小
    pageSize: number = Const.PAGE_SIZE;
    //下拉刷新提示文本
    pullDownRefreshText: Resource = { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
    //下拉刷新图标
    pullDownRefreshImage: Resource = { "id": 16777241, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
    //下拉刷新高度
    pullDownRefreshHeight: number = Const.CUSTOM_LAYOUT_HEIGHT;
    //下拉刷新是否可见
    isVisiblePullDown: boolean = false;
    //上拉加载提示文本
    pullUpLoadText: Resource = { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
    //上拉加载图标
    pullUpLoadImage: Resource = { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
    //上拉加载高度
    pullUpLoadHeight: number = Const.CUSTOM_LAYOUT_HEIGHT;
    //上拉加载是否可见
    isVisiblePullUpLoad: boolean = false;
    //Y轴偏移量
    offsetY: number = 0;
    //页面状态(加载中/成功/失败)
    pageState: number = 0;
    //是否有更多数据
    hasMore: boolean = true;
    //列表可见区域的起始索引
    startIndex = 0;
    //列表可见区域的结束索引
    endIndex = 0;
    //手指按下时的Y坐标
    downY = 0;
    //最后移动的Y坐标
    lastMoveY = 0;
    //是否正在刷新
    isRefreshing: boolean = false;
    //是否可以刷新
    isCanRefresh = false;
    //是否为下拉刷新操作
    isPullRefreshOperation = false;
    //是否正在加载
    isLoading: boolean = false;
    //是否可以加载更多
    isCanLoadMore: boolean = false;
}
