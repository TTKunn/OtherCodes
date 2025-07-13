import type NewsTypeModel from '../../viewmodel/NewsTypeModel';
export class CommonConstant {
    //服务器主机地址
    static readonly SERVER: string = 'http://10.33.88.228:9588';
    //获取新闻类型的API路径
    static readonly GET_NEWS_TYPE: string = 'news/getNewsType';
    //获取新闻列表的API路径
    static readonly GET_NEWS_LIST: string = 'news/getNewsList';
    //请求成功状态码
    static readonly SERVER_CODE_SUCCESS: string = 'success';
    //偏移系数
    static readonly Y_OFF_SET_COEFFICIENT: number = 0.1;
    //页面大小
    static readonly PAGE_SIZE: number = 4;
    //刷新和加载的高度
    static readonly CUSTOM_LAYOUT_HEIGHT: number = 70;
    //HTTP请求成功状态码
    static readonly HTTP_CODE_200: number = 200;
    //动画延迟时间
    static readonly DELAY_ANIMATION_DURATION: number = 300;
    //延迟时间
    static readonly DELAY_TIME: number = 1000;
    //动画持续时间
    static readonly ANIMATION_DURATION: number = 2000;
    //HTTP超时时间
    static readonly HTTP_READ_TIMEOUT: number = 20000;
    //全宽
    static readonly FULL_WIDTH: string = '100%';
    //全高
    static readonly FULL_HEIGHT: string = '100%';
    //标签栏相关常量
    static readonly TabBars_UN_SELECT_TEXT_FONT_SIZE: number = 18;
    static readonly TabBars_SELECT_TEXT_FONT_SIZE: number = 24;
    static readonly TabBars_UN_SELECT_TEXT_FONT_WEIGHT: number = 400;
    static readonly TabBars_SELECT_TEXT_FONT_WEIGHT: number = 700;
    static readonly TabBars_BAR_HEIGHT: string = '7.2%';
    static readonly TabBars_HORIZONTAL_PADDING: string = '2.2%';
    static readonly TabBars_BAR_WIDTH: string = '100%';
    static readonly TabBars_DEFAULT_NEWS_TYPES: Array<NewsTypeModel> = [
        { id: 0, name: '全部' },
        { id: 1, name: '国内' },
        { id: 2, name: '国际' },
        { id: 3, name: '娱乐' },
        { id: 4, name: '军事' },
        { id: 5, name: '体育' },
        { id: 6, name: '科技' },
        { id: 7, name: '财经' }
    ];
    //新闻列表相关常量
    static readonly NewsListConstant_LIST_DIVIDER_STROKE_WIDTH: number = 0.5;
    static readonly NewsListConstant_GET_TAB_DATA_TYPE_ONE: number = 1;
    static readonly NewsListConstant_ITEM_BORDER_RADIUS: number = 16;
    static readonly NewsListConstant_NONE_IMAGE_SIZE: number = 120;
    static readonly NewsListConstant_NONE_TEXT_opacity: number = 0.6;
    static readonly NewsListConstant_NONE_TEXT_size: number = 16;
    static readonly NewsListConstant_NONE_TEXT_margin: number = 12;
    static readonly NewsListConstant_ITEM_MARGIN_TOP: string = '1.5%';
    static readonly NewsListConstant_LIST_MARGIN_LEFT: string = '3.3%';
    static readonly NewsListConstant_LIST_MARGIN_RIGHT: string = '3.3%';
    static readonly NewsListConstant_ITEM_HEIGHT: string = '32%';
    static readonly NewsListConstant_LIST_WIDTH: string = '93.3%';
    //新闻标题相关常量
    static readonly NewsTitle_TEXT_MAX_LINES: number = 3;
    static readonly NewsTitle_TEXT_FONT_SIZE: number = 20;
    static readonly NewsTitle_TEXT_FONT_WEIGHT: number = 500;
    static readonly NewsTitle_TEXT_MARGIN_LEFT: string = '2.4%';
    static readonly NewsTitle_TEXT_MARGIN_TOP: string = '7.2%';
    static readonly NewsTitle_TEXT_HEIGHT: string = '9.6%';
    static readonly NewsTitle_TEXT_WIDTH: string = '78.6%';
    static readonly NewsTitle_IMAGE_MARGIN_LEFT: string = '3.5%';
    static readonly NewsTitle_IMAGE_MARGIN_TOP: string = '7.9%';
    static readonly NewsTitle_IMAGE_HEIGHT: string = '8.9%';
    static readonly NewsTitle_IMAGE_WIDTH: string = '11.9%';
    //新闻内容相关常量
    static readonly NewsContent_WIDTH: string = '93%';
    static readonly NewsContent_HEIGHT: string = '16.8%';
    static readonly NewsContent_MARGIN_LEFT: string = '3.5%';
    static readonly NewsContent_MARGIN_TOP: string = '3.4%';
    static readonly NewsContent_MAX_LINES: number = 2;
    static readonly NewsContent_FONT_SIZE: number = 15;
    //新闻来源相关常量
    static readonly NewsSource_MAX_LINES: number = 1;
    static readonly NewsSource_FONT_SIZE: number = 12;
    static readonly NewsSource_MARGIN_LEFT: string = '3.5%';
    static readonly NewsSource_MARGIN_TOP: string = '3.4%';
    static readonly NewsSource_HEIGHT: string = '7.2%';
    static readonly NewsSource_WIDTH: string = '93%';
    //新闻网格相关常量
    static readonly NewsGrid_MARGIN_LEFT: string = '3.5%';
    static readonly NewsGrid_MARGIN_RIGHT: string = '3.5%';
    static readonly NewsGrid_MARGIN_TOP: string = '5.1%';
    static readonly NewsGrid_WIDTH: string = '93%';
    static readonly NewsGrid_HEIGHT: string = '31.5%';
    static readonly NewsGrid_ASPECT_RATIO: number = 4;
    static readonly NewsGrid_COLUMNS_GAP: number = 5;
    static readonly NewsGrid_ROWS_TEMPLATE: string = '1fr';
    static readonly NewsGrid_IMAGE_BORDER_RADIUS: number = 8;
    //刷新布局相关常量
    static readonly RefreshLayout_MARGIN_LEFT: string = '40%';
    static readonly RefreshLayout_TEXT_MARGIN_BOTTOM: number = 1;
    static readonly RefreshLayout_TEXT_MARGIN_LEFT: number = 7;
    static readonly RefreshLayout_TEXT_FONT_SIZE: number = 17;
    static readonly RefreshLayout_IMAGE_WIDTH: number = 18;
    static readonly RefreshLayout_IMAGE_HEIGHT: number = 18;
    //无更多布局相关常量
    static readonly NoMoreLayoutConstant_NORMAL_PADDING: number = 8;
    static readonly NoMoreLayoutConstant_TITLE_FONT: string = '16fp';
    //刷新常量
    static readonly RefreshConstant_DELAY_PULL_DOWN_REFRESH: number = 50;
    static readonly RefreshConstant_CLOSE_PULL_DOWN_REFRESH_TIME: number = 150;
    static readonly RefreshConstant_DELAY_SHRINK_ANIMATION_TIME: number = 500;
}
//刷新状态枚举
export const enum RefreshState {
    DropDown = 0,
    Release = 1,
    Refreshing = 2,
    Success = 3,
    Fail = 4
}
//新闻列表状态枚举
export const enum PageState {
    Loading = 0,
    Success = 1,
    Fail = 2
}
//内容类型枚举
export const enum ContentType {
    JSON = "application/json"
}
