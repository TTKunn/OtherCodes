export interface NavBarItemType {
  order: string,
  title: string
}

@Component
export struct NavBarItem {
  @Consume('knowledgeMapPageStack') knowledgeMapPageStack: NavPathStack;
  //父组件中获取一个名为 knowledgeMapPageStack 的导航路径栈对象用于页面导航
  @Prop navBarItem: NavBarItemType;
  @Link currentNavBarIndex: number;
  build() {
    Row() {
      Text(this.navBarItem.order)
        .margin({ right: 6 })
        .fontFamily('HarmonyHeiTi-Bold')
        .fontSize(21)
        .fontColor('#182431')
        .textAlign(TextAlign.Start)
        .lineHeight(22)
        .fontWeight(700)
      Text(this.navBarItem.title)
        .fontFamily('HarmonyHeiTi-Medium')
        .fontSize(16)
        .fontColor('#182431')
        .textAlign(TextAlign.Start)
        .lineHeight(22)
        .fontWeight(500)
      Blank()
      Image($r('app.media.ic_arrow'))
        .width(12)
        .height(24)
    }
    .width('100%')
    .height(48)
    .borderRadius(16)
    .alignItems(VerticalAlign.Center)
    .padding({ left: 12, right: 12 })
    .backgroundColor(
      this.currentNavBarIndex === Number(this.navBarItem.order) - 1 ?
        '#1A0A59F7' :
      Color.Transparent
    )
    .onClick(() => {
      const index =  Number(this.navBarItem.order)  - 1;
      this.currentNavBarIndex = index;
      this.knowledgeMapPageStack.replacePath({ name: 'KnowledgeMapContent' });
    })
  }
}