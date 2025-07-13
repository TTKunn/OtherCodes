import NewsList from '../view/NewsList';
import { CommonConstant as Const } from '../common/constant/CommonConstant';
import NewsTypeModel from '../viewmodel/NewsTypeModel';
import NewsViewModel from '../viewmodel/NewsViewModel';

//标签栏组件
@Component
export default struct TabBar {
  //标签栏数据数组
  @State tabBarArray: NewsTypeModel[] = NewsViewModel.getDefaultTypeList();
  //当前选中的标签索引
  @State currentIndex: number = 0;
  //当前页码
  @State currentPage: number = 1;

  //构建标签项
  @Builder TabBuilder(index: number) {
    Column() {
      Text(this.tabBarArray[index].name)
        .height(Const.FULL_HEIGHT)
        .padding({ left: Const.TabBars_HORIZONTAL_PADDING, right: Const.TabBars_HORIZONTAL_PADDING })
        .fontSize(this.currentIndex === index ? Const.TabBars_SELECT_TEXT_FONT_SIZE : Const.TabBars_UN_SELECT_TEXT_FONT_SIZE)
        .fontWeight(this.currentIndex === index ? Const.TabBars_SELECT_TEXT_FONT_WEIGHT : Const.TabBars_UN_SELECT_TEXT_FONT_WEIGHT)
        .fontColor($r('app.color.fontColor_text3'))
    }
  }

  //组件即将出现时调用，加载新闻分类
  aboutToAppear() {
    NewsViewModel.getNewsTypeList().then((typeList: NewsTypeModel[]) => {
      this.tabBarArray = typeList;
    })
      .catch((typeList: NewsTypeModel[]) => {
      this.tabBarArray = typeList;
    });
  }

  //构建UI
  build() {
    Tabs() {
      ForEach(this.tabBarArray, (tabsItem: NewsTypeModel) => {
        TabContent() {
          Column() {
            NewsList({ currentIndex: $currentIndex })
          }
        }
        .tabBar(this.TabBuilder(tabsItem.id))
      }, (item: NewsTypeModel) => JSON.stringify(item));
    }
    .barHeight(Const.TabBars_BAR_HEIGHT)
    .barMode(BarMode.Scrollable)  //可滚动模式
    .barWidth(Const.TabBars_BAR_WIDTH)
    .onChange((index: number) => {  //标签切换事件
      this.currentIndex = index;
      this.currentPage = 1;
    })
    .vertical(false)  //水平标签页
  }
}