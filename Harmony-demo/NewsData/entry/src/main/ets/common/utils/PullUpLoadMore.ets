import { promptAction } from '@kit.ArkUI';
import { CommonConstant as Const } from '../constant/CommonConstant';
import NewsViewModel from '../../viewmodel/NewsViewModel';
import { NewsData } from '../../viewmodel/NewsData';
import NewsModel from '../../viewmodel/NewsModel';

//获取UI上下文
const uiContext: UIContext | undefined = AppStorage.get('uiContext');

//处理上拉加载更多
export function touchMoveLoadMore(that: NewsModel, event: TouchEvent) {
  if (that.endIndex === that.newsData.length - 1 || that.endIndex === that.newsData.length) {
    that.offsetY = event.touches[0].y - that.downY;
    if (Math.abs(that.offsetY) > uiContext!.vp2px(that.pullUpLoadHeight) / 2) {
      //条件：判断上拉距离是否超过加载更多布局高度的一半
      that.isCanLoadMore = true;
      that.isVisiblePullUpLoad = true;
      that.offsetY = -uiContext!.vp2px(that.pullUpLoadHeight) + that.offsetY * Const.Y_OFF_SET_COEFFICIENT;
      //计算实际偏移量负值表示向上偏移添加系数使上拉感觉更自然
    }
  }
}

//上拉加载更多手指抬起事件
export function touchUpLoadMore(that: NewsModel) {
  let self = that;
  //回弹动画
  uiContext!.animateTo({
    duration: Const.ANIMATION_DURATION,
  }, () => {
    self.offsetY = 0;
  })
  if ((self.isCanLoadMore === true) && (self.hasMore === true)) {
    self.isLoading = true;
    setTimeout(() => {
      closeLoadMore(that);
      //请求下一页新闻列表数据
      NewsViewModel.getNewsList(self.currentPage, self.pageSize, Const.GET_NEWS_LIST).then((data: NewsData[]) => {
        if (data.length === self.pageSize) {
          self.currentPage++;
          self.hasMore = true;
        } else {
          self.hasMore = false;
        }
        //将新数据追加到列表末尾
        self.newsData = self.newsData.concat(data);
      }).catch((err: string | Resource) => {
        uiContext!.getPromptAction().showToast({ message: err });
      })
    }, Const.DELAY_TIME);
  } else {
    closeLoadMore(self);
  }
}

//关闭加载更多
export function closeLoadMore(that: NewsModel) {
  that.isCanLoadMore = false;
  that.isLoading = false;
  that.isVisiblePullUpLoad = false;
}