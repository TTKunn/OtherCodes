import { CustomRefreshLoadLayoutClass } from '../viewmodel/NewsData';
import { CommonConstant as Const } from '../common/constant/CommonConstant';

/**
 * 自定义刷新加载布局组件
 */
@Component
export default struct CustomLayout {
  @ObjectLink customRefreshLoadClass: CustomRefreshLoadLayoutClass;

  build() {
    Row() {
      //下拉刷新图标
      Image(this.customRefreshLoadClass.imageSrc)
        .width(Const.RefreshLayout_IMAGE_WIDTH)
        .height(Const.RefreshLayout_IMAGE_HEIGHT)

      //下拉刷新文本
      Text(this.customRefreshLoadClass.textValue)
        .margin({
          left: Const.RefreshLayout_TEXT_MARGIN_LEFT,
          bottom: Const.RefreshLayout_TEXT_MARGIN_BOTTOM
        })
        .fontSize(Const.RefreshLayout_TEXT_FONT_SIZE)
        .textAlign(TextAlign.Center)
    }
    .clip(true)
    .width(Const.FULL_WIDTH)
    .justifyContent(FlexAlign.Center)
    .height(this.customRefreshLoadClass.heightValue)
  }
}