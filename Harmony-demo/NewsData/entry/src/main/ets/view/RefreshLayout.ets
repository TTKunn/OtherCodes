import CustomRefreshLoadLayout from './CustomRefreshLoadLayout';
import { CustomRefreshLoadLayoutClass } from '../viewmodel/NewsData';

/**
 * 下拉刷新布局组件
 */
@Component
export default struct RefreshLayout {
  @ObjectLink @Watch('newCustom') refreshLayoutClass: CustomRefreshLoadLayoutClass;
  @State customRefreshLoadClass: CustomRefreshLoadLayoutClass =
    new CustomRefreshLoadLayoutClass(this.refreshLayoutClass.isVisible, this.refreshLayoutClass.imageSrc,
      this.refreshLayoutClass.textValue,
      this.refreshLayoutClass.heightValue);

  //监听刷新状态变化并更新UI
  newCustom() {
    this.customRefreshLoadClass =
      new CustomRefreshLoadLayoutClass(this.refreshLayoutClass.isVisible, this.refreshLayoutClass.imageSrc,
        this.refreshLayoutClass.textValue,
        this.refreshLayoutClass.heightValue);
  }

  build() {
    Column() {
      if (this.refreshLayoutClass.isVisible) {
        CustomRefreshLoadLayout({ customRefreshLoadClass: this.customRefreshLoadClass })
      }
    }
  }
}