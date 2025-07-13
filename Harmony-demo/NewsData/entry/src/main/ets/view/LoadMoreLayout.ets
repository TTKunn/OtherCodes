import CustomRefreshLoadLayout from './CustomRefreshLoadLayout';
import { CustomRefreshLoadLayoutClass } from '../viewmodel/NewsData';

/**
 * 加载更多布局组件
 */
@Component
export default struct LoadMoreLayout {
  @ObjectLink @Watch('newCustom') loadMoreLayoutClass: CustomRefreshLoadLayoutClass;
  @State customRefreshLoadClass: CustomRefreshLoadLayoutClass =
    new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible,
      this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, this.loadMoreLayoutClass.heightValue);

  //当加载更多属性变化时更新自定义刷新加载类
  newCustom() {
    if (this.loadMoreLayoutClass.isVisible) {
      this.customRefreshLoadClass = new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible,
        this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, this.loadMoreLayoutClass.heightValue);
    } else {
      this.customRefreshLoadClass = new CustomRefreshLoadLayoutClass(this.loadMoreLayoutClass.isVisible,
        this.loadMoreLayoutClass.imageSrc, this.loadMoreLayoutClass.textValue, 0);
    }
  }

  build() {
    Column() {
      if (this.loadMoreLayoutClass.isVisible) {
        CustomRefreshLoadLayout({ customRefreshLoadClass: this.customRefreshLoadClass })
      } else {
        CustomRefreshLoadLayout({ customRefreshLoadClass: this.customRefreshLoadClass })
      }
    }
  }
}