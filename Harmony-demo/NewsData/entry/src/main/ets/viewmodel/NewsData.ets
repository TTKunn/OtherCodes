//新闻列表项信息
export class NewsData {
  title: string = '';
  content: string = '';
  imagesUrl: Array<NewsFile> = [new NewsFile()];
  //新闻列表项来源
  source: string = '';
}

//新闻图片列表项信息
export class NewsFile {
  //列表项ID
  id: number = 0;
  url: string = '';
  //新闻图片列表项类型
  type: number = 0;
  //列表项新闻ID
  newsId: number = 0;
}

//自定义刷新加载布局数据
@Observed
export class CustomRefreshLoadLayoutClass {
  //自定义刷新加载布局可见性
  isVisible: boolean;
  //自定义刷新加载布局图片源
  imageSrc: Resource;
  //自定义刷新加载布局文本值
  textValue: Resource;
  //自定义刷新加载布局高度值
  heightValue: number;

  constructor(isVisible: boolean, imageSrc: Resource, textValue: Resource, heightValue: number) {
    this.isVisible = isVisible;
    this.imageSrc = imageSrc;
    this.textValue = textValue;
    this.heightValue = heightValue;
  }
}