import { promptAction } from '@kit.ArkUI';
import { touchMoveLoadMore, touchUpLoadMore } from './PullUpLoadMore';
import {
  CommonConstant as Const,
  RefreshState
} from '../constant/CommonConstant';
import NewsViewModel from '../../viewmodel/NewsViewModel';
import { NewsData } from '../../viewmodel/NewsData';
import NewsModel from '../../viewmodel/NewsModel';

//获取UI上下文
const uiContext: UIContext | undefined = AppStorage.get('uiContext');

//处理列表触摸事件
export function listTouchEvent(that: NewsModel, event: TouchEvent) {
  switch (event.type) {
    case TouchType.Down:
      //记录手指按下的初始位置
      that.downY = event.touches[0].y;
      that.lastMoveY = event.touches[0].y;
      break;
    case TouchType.Move:
      //如果正在刷新或加载，不处理
      if ((that.isRefreshing === true) || (that.isLoading === true)) {
        return;
      }
      //判断是否下拉
      let isDownPull = event.touches[0].y - that.lastMoveY > 0;
      if (((isDownPull === true) || (that.isPullRefreshOperation === true)) && (that.isCanLoadMore === false)) {
        //处理下拉刷新
        touchMovePullRefresh(that, event);
      } else {
        //处理上拉加载更多
        touchMoveLoadMore(that, event);
      }
      that.lastMoveY = event.touches[0].y;
      break;
    case TouchType.Cancel:
      break;
    case TouchType.Up:
      if ((that.isRefreshing === true) || (that.isLoading === true)) {
        return;
      }
      if ((that.isPullRefreshOperation === true)) {
        touchUpPullRefresh(that);
      } else {
        touchUpLoadMore(that);
      }
      break;
    default:
      break;
  }
}

//处理下拉刷新
export function touchMovePullRefresh(that: NewsModel, event: TouchEvent) {
  if (that.startIndex === 0) {
    that.isPullRefreshOperation = true;
    let height = uiContext!.vp2px(that.pullDownRefreshHeight);
    that.offsetY = event.touches[0].y - that.downY;
    //下拉距离超过刷新布局高度，满足刷新条件
    if (that.offsetY >= height) {
      pullRefreshState(that, RefreshState.Release);
      that.offsetY = height + that.offsetY * Const.Y_OFF_SET_COEFFICIENT;
    } else {
      pullRefreshState(that, RefreshState.DropDown);
    }
    if (that.offsetY < 0) {
      that.offsetY = 0;
      that.isPullRefreshOperation = false;
    }
  }
}

//处理下拉刷新的手指抬起事件
export function touchUpPullRefresh(that: NewsModel) {
  if (that.isCanRefresh === true) {
    that.offsetY = uiContext!.vp2px(that.pullDownRefreshHeight);
    pullRefreshState(that, RefreshState.Refreshing);
    that.currentPage = 1;
    setTimeout(() => {
      let self = that;
      //请求新闻列表数据
      NewsViewModel.getNewsList(that.currentPage, that.pageSize, Const.GET_NEWS_LIST).then((data: NewsData[]) => {
        if (data.length === that.pageSize) {
          self.hasMore = true;
          self.currentPage++;
        } else {
          self.hasMore = false;
        }
        self.newsData = data;
        closeRefresh(self, true);
      }).catch((err: string | Resource) => {
        uiContext!.getPromptAction().showToast({ message: err });
        closeRefresh(self, false);
      });
    }, Const.DELAY_TIME);
  } else {
    closeRefresh(that, false);
  }
}

//设置下拉刷新状态
export function pullRefreshState(that: NewsModel, state: number) {
  switch (state) {
    case RefreshState.DropDown:
      //下拉状态
      that.pullDownRefreshText = $r('app.string.pull_down_refresh_text');
      that.pullDownRefreshImage = $r("app.media.ic_pull_down_refresh");
      that.isCanRefresh = false;
      that.isRefreshing = false;
      that.isVisiblePullDown = true;
      break;
    case RefreshState.Release:
      //释放状态
      that.pullDownRefreshText = $r('app.string.release_refresh_text');
      that.pullDownRefreshImage = $r("app.media.ic_pull_up_refresh");
      that.isCanRefresh = true;
      that.isRefreshing = false;
      break;
    case RefreshState.Refreshing:
      //刷新中状态
      that.offsetY = uiContext!.vp2px(that.pullDownRefreshHeight);
      that.pullDownRefreshText = $r('app.string.refreshing_text');
      that.pullDownRefreshImage = $r("app.media.ic_pull_up_load");
      that.isCanRefresh = true;
      that.isRefreshing = true;
      break;
    case RefreshState.Success:
      //刷新成功状态
      that.pullDownRefreshText = $r('app.string.refresh_success_text');
      that.pullDownRefreshImage = $r("app.media.ic_succeed_refresh");
      that.isCanRefresh = true;
      that.isRefreshing = true;
      break;
    case RefreshState.Fail:
      //刷新失败状态
      that.pullDownRefreshText = $r('app.string.refresh_fail_text');
      that.pullDownRefreshImage = $r("app.media.ic_fail_refresh");
      that.isCanRefresh = true;
      that.isRefreshing = true;
      break;
    default:
      break;
  }
}

//关闭刷新
export function closeRefresh(that: NewsModel, isRefreshSuccess: boolean) {
  let self = that;
  setTimeout(() => {
    let delay = Const.RefreshConstant_DELAY_PULL_DOWN_REFRESH;
    if (self.isCanRefresh === true) {
      pullRefreshState(that, isRefreshSuccess ? RefreshState.Success : RefreshState.Fail);
      delay = Const.RefreshConstant_DELAY_SHRINK_ANIMATION_TIME;
    }
    //执行动画，关闭刷新
    uiContext!.animateTo({
      duration: Const.RefreshConstant_CLOSE_PULL_DOWN_REFRESH_TIME,
      delay: delay,
      onFinish: () => {
        pullRefreshState(that, RefreshState.DropDown);
        self.isVisiblePullDown = false;
        self.isPullRefreshOperation = false;
      }
    }, () => {
      self.offsetY = 0;
    })
  }, self.isCanRefresh ? Const.DELAY_ANIMATION_DURATION : 0);
}