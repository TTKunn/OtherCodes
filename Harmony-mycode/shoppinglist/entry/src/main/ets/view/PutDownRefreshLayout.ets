import * as commonConst from '../common/CommonConstants';

@Component
export default struct PutDownRefresh {
  @Link refreshText: Resource;

  build() {
    Row() {
      Image($r('app.media.refreshing'))
        .width(commonConst.ICON_WIDTH)
        .height(commonConst.ICON_HEIGHT)
      Text(this.refreshText).fontSize(commonConst.NORMAL_FONT_SIZE)
    }
    .justifyContent(FlexAlign.Center)
    .width(commonConst.GOODS_LIST_WIDTH)
    .height(commonConst.GOODS_LIST_HEIGHT)
  }
}