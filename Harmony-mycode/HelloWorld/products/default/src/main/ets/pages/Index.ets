// products/deafult/src/main/ets/pages/Index
import { QuickStartPage } from 'quickstart';
import { CourseLearning } from 'learning';
import { KnowledgeMap } from 'map';
@Entry
@Component
struct Index {
  @State currentIndex: number = 0;
  //页签索引状态变量currentIndex，设置默认值0。
  private tabsController : TabsController = new TabsController();

  @Builder
  tabBarBuilder(title: string, targetIndex: number, selectedIcon: Resource, unselectIcon: Resource) {
    Column() {
      Image(this.currentIndex === targetIndex ? selectedIcon : unselectIcon)
        .width(24)
        .height(24)
      Text(title)
        .fontFamily('HarmonyHeiTi-Medium')
        .fontSize(10)
        .fontColor(this.currentIndex === targetIndex ? '#0A59F7' : 'rgba(0,0,0,0.60)')
        .textAlign(TextAlign.Center)
        .lineHeight(14)
        .fontWeight(500)
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)

    .onClick(() => {
      this.currentIndex = targetIndex;
      this.tabsController.changeIndex(targetIndex);
    })
  }

  build() {
      Tabs({ barPosition: BarPosition.End, controller: this.tabsController }) {
        /*设置导航来在底部，关联Tabs控制器与Tabs组件*/
      TabContent() {
        QuickStartPage()
      }
      .tabBar(this.tabBarBuilder('快速入门', 0, $r('app.media.ic_01_on'), $r('app.media.ic_01_off')))

      TabContent() {
        CourseLearning()
      }
      .tabBar(this.tabBarBuilder('课程学习', 1, $r('app.media.ic_01_on'), $r('app.media.ic_01_off')))

      TabContent() {
        KnowledgeMap()
      }
      .tabBar(this.tabBarBuilder('知识地图', 2, $r('app.media.ic_01_on'), $r('app.media.ic_01_off')))
    }
  }
}