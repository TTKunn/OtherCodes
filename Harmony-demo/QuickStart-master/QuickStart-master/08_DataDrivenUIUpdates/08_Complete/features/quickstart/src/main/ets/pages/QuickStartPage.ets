import { TutorialView } from '../view/TutorialView';
import { Banner } from '../view/Banner';
import { EnablementView } from '../view/EnablementView';
import { ArticleDetailPage } from './ArticleDetailPage';
import { ArticleClass } from '../model/ArticleClass';
import { BannerClass } from '../model/BannerClass';

@Component
export struct QuickStartPage {
  @Provide('articlePathStack') articlePathStack: NavPathStack = new NavPathStack();
  @State message: string = '快速入门';

  @Builder
  quickStartRouter(name: string, param?: ArticleClass | BannerClass) {
    if (name === 'articleDetail') {
      ArticleDetailPage()
    }
  }

  build() {
    Navigation(this.articlePathStack) {
    Column() {
      Text(this.message)
        .fontSize(24)
        .fontWeight(700)
        .width('100%')
        .textAlign(TextAlign.Start)
        .padding({ left: 16 })
        .fontFamily('HarmonyHeiTi-Bold')
        .lineHeight(33)
      Scroll() {
        Column() {
          Banner()
          EnablementView()
          TutorialView()
        }
      }
      .layoutWeight(1)
      .scrollBar(BarState.Off)
      .align(Alignment.TopStart)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F1F3F5')
    }
    .navDestination(this.quickStartRouter)
    .hideTitleBar(true)
    .mode(NavigationMode.Stack)
  }
}