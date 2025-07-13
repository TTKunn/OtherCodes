if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NewsItem_Params {
    newsData?: NewsData;
}
import { NewsData } from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsData";
import type { NewsFile } from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsData";
import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
export default class NewsItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.newsData = new NewsData();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NewsItem_Params) {
        if (params.newsData !== undefined) {
            this.newsData = params.newsData;
        }
    }
    updateStateVars(params: NewsItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    public newsData: NewsData;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //新闻标题和图标行
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777246, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Image.width(Const.NewsTitle_IMAGE_WIDTH);
            Image.height(Const.NewsTitle_IMAGE_HEIGHT);
            Image.margin({
                top: Const.NewsTitle_IMAGE_MARGIN_TOP,
                left: Const.NewsTitle_IMAGE_MARGIN_LEFT
            });
            Image.objectFit(ImageFit.Fill);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.newsData.title);
            Text.fontSize(Const.NewsTitle_TEXT_FONT_SIZE);
            Text.fontColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.height(Const.NewsTitle_TEXT_HEIGHT);
            Text.width(Const.NewsTitle_TEXT_WIDTH);
            Text.maxLines(Const.NewsTitle_TEXT_MAX_LINES);
            Text.margin({ left: Const.NewsTitle_TEXT_MARGIN_LEFT, top: Const.NewsTitle_TEXT_MARGIN_TOP });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.fontWeight(Const.NewsTitle_TEXT_FONT_WEIGHT);
        }, Text);
        Text.pop();
        //新闻标题和图标行
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //新闻内容文本
            Text.create(this.newsData.content);
            //新闻内容文本
            Text.fontSize(Const.NewsContent_FONT_SIZE);
            //新闻内容文本
            Text.fontColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            //新闻内容文本
            Text.height(Const.NewsContent_HEIGHT);
            //新闻内容文本
            Text.width(Const.NewsContent_WIDTH);
            //新闻内容文本
            Text.maxLines(Const.NewsContent_MAX_LINES);
            //新闻内容文本
            Text.margin({ left: Const.NewsContent_MARGIN_LEFT, top: Const.NewsContent_MARGIN_TOP });
            //新闻内容文本
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        //新闻内容文本
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //新闻图片网格
            Grid.create();
            //新闻图片网格
            Grid.columnsTemplate('1fr '.repeat(this.newsData.imagesUrl.length));
            //新闻图片网格
            Grid.columnsGap(Const.NewsGrid_COLUMNS_GAP);
            //新闻图片网格
            Grid.rowsTemplate(Const.NewsGrid_ROWS_TEMPLATE);
            //新闻图片网格
            Grid.width(Const.NewsGrid_WIDTH);
            //新闻图片网格
            Grid.height(Const.NewsGrid_HEIGHT);
            //新闻图片网格
            Grid.margin({ left: Const.NewsGrid_MARGIN_LEFT, top: Const.NewsGrid_MARGIN_TOP,
                right: Const.NewsGrid_MARGIN_RIGHT });
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const itemImg = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(Const.SERVER + itemImg.url);
                            Image.objectFit(ImageFit.Cover);
                            Image.borderRadius(Const.NewsGrid_IMAGE_BORDER_RADIUS);
                        }, Image);
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.newsData.imagesUrl, forEachItemGenFunction, (itemImg: NewsFile, index?: number) => JSON.stringify(itemImg) + index, false, true);
        }, ForEach);
        ForEach.pop();
        //新闻图片网格
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //新闻来源
            Text.create(this.newsData.source);
            //新闻来源
            Text.fontSize(Const.NewsSource_FONT_SIZE);
            //新闻来源
            Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            //新闻来源
            Text.height(Const.NewsSource_HEIGHT);
            //新闻来源
            Text.width(Const.NewsSource_WIDTH);
            //新闻来源
            Text.maxLines(Const.NewsSource_MAX_LINES);
            //新闻来源
            Text.margin({ left: Const.NewsSource_MARGIN_LEFT, top: Const.NewsSource_MARGIN_TOP });
            //新闻来源
            Text.textOverflow({ overflow: TextOverflow.None });
        }, Text);
        //新闻来源
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
