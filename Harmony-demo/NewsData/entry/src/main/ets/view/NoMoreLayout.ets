import { CommonConstant as Const } from '../common/constant/CommonConstant'

/**
 * 没有更多数据布局组件
 */
@Component
export default struct NoMoreLayout {
  build() {
    Row() {
      Text($r('app.string.prompt_message'))
        .margin({ left: Const.NoMoreLayoutConstant_NORMAL_PADDING })
        .fontSize(Const.NoMoreLayoutConstant_TITLE_FONT)
        .textAlign(TextAlign.Center)
    }
    .width(Const.FULL_WIDTH)
    .justifyContent(FlexAlign.Center)
    .height(Const.CUSTOM_LAYOUT_HEIGHT)
  }
}