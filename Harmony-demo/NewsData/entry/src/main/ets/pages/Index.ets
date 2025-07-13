import TabBar from '../view/TabBar';
import { CommonConstant as Const } from '../common/constant/CommonConstant';

//应用入口页面
@Entry
@Component
struct Index {

  build() {
    Column() {
      TabBar()
    }
    .width(Const.FULL_WIDTH)
    .backgroundColor($r('app.color.listColor'))
    .justifyContent(FlexAlign.Center)
  }
}