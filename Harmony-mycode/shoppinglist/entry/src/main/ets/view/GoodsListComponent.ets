import * as commonConst from '../common/CommonConstants';
import { GoodsListItemType } from '../viewmodel/InitialData';
import { ListDataSource } from '../viewmodel/ListDataSource';

@Component
export default struct GoodsList {
  @Provide goodsListData: ListDataSource = new ListDataSource();
  private startTouchOffsetY: number = 0;
  private endTouchOffsetY: number = 0;

  build() {
    Row() {
      List({ space: commonConst.LIST_ITEM_SPACE }) {
        LazyForEach(this.goodsListData, (item: GoodsListItemType) => {
          ListItem() {
            Row() {
              Column() {
                Image(item?.goodsImg)
                  .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
                  .height(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
                  .draggable(false)
              }
              .width(commonConst.GOODS_IMAGE_WIDTH)
              .height(commonConst.LAYOUT_WIDTH_OR_HEIGHT)

              Column() {
                Text(item?.goodsName)
                  .fontSize(commonConst.NORMAL_FONT_SIZE)

                Text(item?.advertisingLanguage)
                  .fontColor($r('app.color.gray'))
                  .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
                  .margin({ right: commonConst.MARGIN_RIGHT })

                Row() {
                  Text(item?.evaluate)
                    .fontSize(commonConst.GOODS_EVALUATE_FONT_SIZE)
                    .fontColor($r('app.color.deepGray'))
                    .width(commonConst.EVALUATE_WIDTH)
                  Text(item?.price).fontSize(commonConst.NORMAL_FONT_SIZE).fontColor($r('app.color.freshRed'))
                }
                .justifyContent(FlexAlign.SpaceAround)
                .width(commonConst.GOODS_LIST_WIDTH)
              }
              .padding(commonConst.GOODS_LIST_PADDING)
              .width(commonConst.GOODS_FONT_WIDTH)
              .height(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
              .justifyContent(FlexAlign.SpaceBetween)
            }
            .justifyContent(FlexAlign.SpaceBetween)
            .height(commonConst.GOODS_LIST_HEIGHT)
            .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
          }
          .onTouch((event?: TouchEvent) => {
            if (event === undefined) {
              return;
            }
            switch (event.type) {
              case TouchType.Down:
                this.startTouchOffsetY = event.touches[0].y;
                break;
              case TouchType.Up:
                this.startTouchOffsetY = event.touches[0].y;
                break;
              case TouchType.Move:
                if (this.startTouchOffsetY - this.endTouchOffsetY > 0) {
                  this.goodsListData.pushData();
                }
                break;
            }
          })
        })
      }
      .width(commonConst.GOODS_LIST_WIDTH)
    }
    .justifyContent(FlexAlign.Center)
    .width(commonConst.LAYOUT_WIDTH_OR_HEIGHT)
  }
}