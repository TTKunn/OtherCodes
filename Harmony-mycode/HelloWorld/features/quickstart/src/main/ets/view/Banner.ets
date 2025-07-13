import { BannerClass } from '../model/BannerClass';
import { bufferToString } from '../util/BufferUtil';

@Preview
@Component
export struct Banner {
  @Consume('articlePathStack') articlePathStack: NavPathStack;
  @State bannerList: BannerClass[] = [];

  aboutToAppear(): void {
    this.getBannerDataFromJSON();
  }
  getBannerDataFromJSON() {
    this.getUIContext().getHostContext()?.resourceManager.getRawFileContent('BannerData.json').then(value => {
      this.bannerList = JSON.parse(bufferToString(value)) as BannerClass[];
      //转换成json对象并复制给bannerList
      //标准语法value as Type。断言解析结果是 BannerClass 类型的数组
    });
  }

  clickToDetailPage(item: BannerClass) {
    this.articlePathStack.pushPathByName('bannerDetailPage', item);
  }

  build() {
    Swiper() {
      ForEach(this.bannerList, (item: BannerClass, index: number) => {
        Image($r(item.imageSrc))
          .objectFit(ImageFit.Contain)
          .width('100%')
          .padding({ top: 11, left: 16, right: 16 })
          .borderRadius(16)
          .onClick(() => {
            this.clickToDetailPage(item)
          })
      }, (item: BannerClass, index: number) => item.id)
    }
    .autoPlay(true)
    .loop(true)
    .indicator(
      new DotIndicator()
        .color('#1a000000')
        .selectedColor('#0A59F7'))
  }
}