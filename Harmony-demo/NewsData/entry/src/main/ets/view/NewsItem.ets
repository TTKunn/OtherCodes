import { NewsData, NewsFile } from '../viewmodel/NewsData';
import { CommonConstant as Const } from '../common/constant/CommonConstant';

/**
 * 新闻列表项组件
 */
@Component
export default struct NewsItem {
  public newsData: NewsData = new NewsData();

  build() {
    Column() {
      //新闻标题和图标行
      Row() {
        Image($r('app.media.news'))
          .width(Const.NewsTitle_IMAGE_WIDTH)
          .height(Const.NewsTitle_IMAGE_HEIGHT)
          .margin({
            top: Const.NewsTitle_IMAGE_MARGIN_TOP,
            left: Const.NewsTitle_IMAGE_MARGIN_LEFT
          })
          .objectFit(ImageFit.Fill)
        Text(this.newsData.title)
          .fontSize(Const.NewsTitle_TEXT_FONT_SIZE)
          .fontColor($r('app.color.fontColor_text'))
          .height(Const.NewsTitle_TEXT_HEIGHT)
          .width(Const.NewsTitle_TEXT_WIDTH)
          .maxLines(Const.NewsTitle_TEXT_MAX_LINES)
          .margin({ left: Const.NewsTitle_TEXT_MARGIN_LEFT, top: Const.NewsTitle_TEXT_MARGIN_TOP })
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .fontWeight(Const.NewsTitle_TEXT_FONT_WEIGHT)
      }

      //新闻内容文本
      Text(this.newsData.content)
        .fontSize(Const.NewsContent_FONT_SIZE)
        .fontColor($r('app.color.fontColor_text'))
        .height(Const.NewsContent_HEIGHT)
        .width(Const.NewsContent_WIDTH)
        .maxLines(Const.NewsContent_MAX_LINES)
        .margin({ left: Const.NewsContent_MARGIN_LEFT, top: Const.NewsContent_MARGIN_TOP })
        .textOverflow({ overflow: TextOverflow.Ellipsis })

      //新闻图片网格
      Grid() {
        ForEach(this.newsData.imagesUrl, (itemImg: NewsFile) => {
          GridItem() {
            Image(Const.SERVER + itemImg.url)
              .objectFit(ImageFit.Cover)
              .borderRadius(Const.NewsGrid_IMAGE_BORDER_RADIUS)
          }
        }, (itemImg: NewsFile, index?: number) => JSON.stringify(itemImg) + index)
      }
      .columnsTemplate('1fr '.repeat(this.newsData.imagesUrl.length))
      .columnsGap(Const.NewsGrid_COLUMNS_GAP)
      .rowsTemplate(Const.NewsGrid_ROWS_TEMPLATE)
      .width(Const.NewsGrid_WIDTH)
      .height(Const.NewsGrid_HEIGHT)
      .margin({ left: Const.NewsGrid_MARGIN_LEFT, top: Const.NewsGrid_MARGIN_TOP,
        right: Const.NewsGrid_MARGIN_RIGHT })

      //新闻来源
      Text(this.newsData.source)
        .fontSize(Const.NewsSource_FONT_SIZE)
        .fontColor($r('app.color.fontColor_text2'))
        .height(Const.NewsSource_HEIGHT)
        .width(Const.NewsSource_WIDTH)
        .maxLines(Const.NewsSource_MAX_LINES)
        .margin({ left: Const.NewsSource_MARGIN_LEFT, top: Const.NewsSource_MARGIN_TOP })
        .textOverflow({ overflow: TextOverflow.None })
    }
    .alignItems(HorizontalAlign.Start)
  }
}