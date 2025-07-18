import { ArticleClass } from '../model/ArticleClass';
import { bufferToString } from '../util/BufferUtil';

@Component
export struct EnablementView{
  @State enablementList: Array<ArticleClass> = [];
  @Consume('articlePathStack') articlePathStack: NavPathStack;
  aboutToAppear(): void {
    this.getEnablementDataFromJSON()
  }

  getEnablementDataFromJSON() {
    this.getUIContext().getHostContext()?.resourceManager.getRawFileContent('EnablementData.json').then(value => {
      this.enablementList = JSON.parse(bufferToString(value)) as ArticleClass[];
    });
  }

  build() {
    Column() {
      Text('赋能套件')
        .fontColor('#182431')
        .fontSize(16)
        .fontWeight(500)
        .fontFamily('HarmonyHeiTi-medium')
        .textAlign(TextAlign.Start)
        .padding({ left: 16 })
        .margin({ bottom: 8.5 })
      Grid() {
        ForEach(this.enablementList, (item: ArticleClass) => {
          GridItem() {
            EnablementItem({ enablementItem: item })
              .onClick(() => {
                this.articlePathStack.pushPathByName('articleDetail', item)
              })
          }
        }, (item: ArticleClass) => item.id)
      }
      .rowsTemplate('1fr')
      .columnsGap(8)
      .scrollBar(BarState.Off)
      .height(169)
      .padding({ top: 2, left: 16, right: 16 })
    }
    .margin({ top: 18 })
    .alignItems(HorizontalAlign.Start)
    .width('100%')
  }
}


//@Preview
@Component
struct EnablementItem {
  @Prop enablementItem: ArticleClass;
  private title: string = 'HarmonyOS第一课';
  private brief: string = '基于真实的开发场景，提供向导式学习，多维度融合课程等内容，给开发者提供全新的学习体验。';

  build() {
    Column() {
      //Image($r('app.media.enablement_pic1'))
      Image($r(this.enablementItem.imageSrc))
        .width('100%')
        .objectFit(ImageFit.Cover)
        .height(96)
        .borderRadius({
          topLeft: 16,
          topRight: 16
        })
      //Text(this.title)
      Text(this.enablementItem.title)
        .height(19)
        .width('100%')
        .fontSize(14)
        .textAlign(TextAlign.Start)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .maxLines(1)
        .fontWeight(400)
        .padding({ left: 12, right: 12 })
        .margin({ top: 8 })

      //Text(this.brief)
      Text(this.enablementItem.brief)
        .height(32)
        .width('100%')
        .fontSize(12)
        .textAlign(TextAlign.Start)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .maxLines(2)
        .fontWeight(400)
        .fontColor('rgba(0, 0, 0, 0.6)')
        .padding({ left: 12, right: 12 })
        .margin({ top: 2 })
    }
    .width(160)
    .height(169)
    .borderRadius(16)
    .backgroundColor(Color.White)
  }
}