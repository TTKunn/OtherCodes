import { promptAction } from '@kit.ArkUI';
import { CommonConstant as Const, PageState } from '../common/constant/CommonConstant';
import NewsItem from './NewsItem';
import LoadMoreLayout from './LoadMoreLayout';
import RefreshLayout from './RefreshLayout';
import CustomRefreshLoadLayout from './CustomRefreshLoadLayout';
import { CustomRefreshLoadLayoutClass, NewsData } from '../viewmodel/NewsData';
import { listTouchEvent } from '../common/utils/PullDownRefresh';
import NewsViewModel from '../viewmodel/NewsViewModel';
import NoMoreLayout from './NoMoreLayout';
import NewsModel from '../viewmodel/NewsModel';

/**
 * 新闻列表组件
 */
@Component
export default struct NewsList {
  @State @Watch('newCustom') newsModel: NewsModel = new NewsModel();
  @State customRefreshLoadClass: CustomRefreshLoadLayoutClass = new CustomRefreshLoadLayoutClass(true,
    $r('app.media.ic_pull_up_load'), $r('app.string.pull_up_load_text'), this.newsModel.pullDownRefreshHeight);
  @State refreshLayoutClass: CustomRefreshLoadLayoutClass =
    new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown,
      this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText,
      this.newsModel.pullDownRefreshHeight);
  @State loadMoreLayoutClass: CustomRefreshLoadLayoutClass =
    new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad,
      this.newsModel.pullUpLoadImage,
      this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight);
  @Link currentIndex: number;

  //监听刷新状态变化并更新UI
  newCustom() {
    this.refreshLayoutClass =
      new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown,
        this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText,
        this.newsModel.pullDownRefreshHeight);
    this.loadMoreLayoutClass =
      new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad,
        this.newsModel.pullUpLoadImage,
        this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight);
  }

  //切换新闻分类并获取数据
  changeCategory() {
    this.newsModel.currentPage = 1;
    NewsViewModel.getNewsList(this.newsModel.currentPage, this.newsModel.pageSize, Const.GET_NEWS_LIST)
      .then((data: NewsData[]) => {
        //更新页面信息
        this.newsModel.pageState = PageState.Success;
        //更新分页信息
        if (data.length === this.newsModel.pageSize) {
          this.newsModel.currentPage++;
          this.newsModel.hasMore = true;
        } else {
          this.newsModel.hasMore = false;
        }
        //更新数据
        this.newsModel.newsData = data;
      })
      .catch((err: string | Resource) => {
        this.getUIContext().getPromptAction().showToast({
          message: err,
          duration: Const.ANIMATION_DURATION
        });
        this.newsModel.pageState = PageState.Fail;
      });
  }

  //组件即将出现时请求新闻数据
  aboutToAppear() {
    this.changeCategory();
  }

  build() {
    Column() {
      if (this.newsModel.pageState === PageState.Success) {
        this.ListLayout()
      } else if (this.newsModel.pageState === PageState.Loading) {
        this.LoadingLayout()
      } else {
        this.FailLayout()
      }
    }
    .width(Const.FULL_WIDTH)
    .height(Const.FULL_HEIGHT)
    .justifyContent(FlexAlign.Center)
    .onTouch((event: TouchEvent | undefined) => {
      //
      if (event) {
        if (this.newsModel.pageState === PageState.Success) {
          listTouchEvent(this.newsModel, event);
        }
      }
    })
  }

  //加载中布局构建器
  @Builder
  LoadingLayout() {
    CustomRefreshLoadLayout({ customRefreshLoadClass: this.customRefreshLoadClass })
  }

  //列表布局构建器
  @Builder
  ListLayout() {
    List() {
      ListItem() {
        RefreshLayout({
          refreshLayoutClass: this.refreshLayoutClass
        })
      }

      ForEach(this.newsModel.newsData, (item: NewsData) => {
        //新闻项列表项
        ListItem() {
          NewsItem({ newsData: item })
        }
        .height(Const.NewsListConstant_ITEM_HEIGHT)
        .backgroundColor($r('app.color.white'))
        .margin({ top: Const.NewsListConstant_ITEM_MARGIN_TOP })
        .borderRadius(Const.NewsListConstant_ITEM_BORDER_RADIUS)
      }, (item: NewsData, index?: number) => JSON.stringify(item) + index)

      ListItem() {
        if (this.newsModel.hasMore) {
          LoadMoreLayout({
            loadMoreLayoutClass: this.loadMoreLayoutClass
          })
        } else {
          NoMoreLayout()
        }
      }
    }
    .width(Const.NewsListConstant_LIST_WIDTH)
    .height(Const.FULL_HEIGHT)
    .margin({ left: Const.NewsListConstant_LIST_MARGIN_LEFT, right: Const.NewsListConstant_LIST_MARGIN_RIGHT })
    .backgroundColor($r('app.color.listColor'))
    .divider({
      color: $r('app.color.dividerColor'),
      strokeWidth: Const.NewsListConstant_LIST_DIVIDER_STROKE_WIDTH,
      endMargin: Const.NewsListConstant_LIST_MARGIN_RIGHT
    })
    //移除回弹效果
    .edgeEffect(EdgeEffect.None)
    .offset({ x: 0, y: `${this.newsModel.offsetY}px` })
    .onScrollIndex((start: number, end: number) => {
      //监听当前列表的首个索引
      this.newsModel.startIndex = start;
      this.newsModel.endIndex = end;
    })
  }

  //加载失败布局构建器
  @Builder
  FailLayout() {
    Image($r('app.media.none'))
      .height(Const.NewsListConstant_NONE_IMAGE_SIZE)
      .width(Const.NewsListConstant_NONE_IMAGE_SIZE)
    Text($r('app.string.page_none_msg'))
      .opacity(Const.NewsListConstant_NONE_TEXT_opacity)
      .fontSize(Const.NewsListConstant_NONE_TEXT_size)
      .fontColor($r('app.color.fontColor_text3'))
      .margin({ top: Const.NewsListConstant_NONE_TEXT_margin })
  }
}