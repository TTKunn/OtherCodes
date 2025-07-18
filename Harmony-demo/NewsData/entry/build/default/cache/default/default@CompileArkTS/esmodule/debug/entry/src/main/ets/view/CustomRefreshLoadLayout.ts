if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CustomLayout_Params {
    customRefreshLoadClass?: CustomRefreshLoadLayoutClass;
}
import type { CustomRefreshLoadLayoutClass } from '../viewmodel/NewsData';
import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
export default class CustomLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__customRefreshLoadClass = new SynchedPropertyNesedObjectPU(params.customRefreshLoadClass, this, "customRefreshLoadClass");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CustomLayout_Params) {
        this.__customRefreshLoadClass.set(params.customRefreshLoadClass);
    }
    updateStateVars(params: CustomLayout_Params) {
        this.__customRefreshLoadClass.set(params.customRefreshLoadClass);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__customRefreshLoadClass.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__customRefreshLoadClass.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __customRefreshLoadClass: SynchedPropertyNesedObjectPU<CustomRefreshLoadLayoutClass>;
    get customRefreshLoadClass() {
        return this.__customRefreshLoadClass.get();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.clip(true);
            Row.width(Const.FULL_WIDTH);
            Row.justifyContent(FlexAlign.Center);
            Row.height(this.customRefreshLoadClass.heightValue);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //下拉刷新图标
            Image.create(this.customRefreshLoadClass.imageSrc);
            //下拉刷新图标
            Image.width(Const.RefreshLayout_IMAGE_WIDTH);
            //下拉刷新图标
            Image.height(Const.RefreshLayout_IMAGE_HEIGHT);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            //下拉刷新文本
            Text.create(this.customRefreshLoadClass.textValue);
            //下拉刷新文本
            Text.margin({
                left: Const.RefreshLayout_TEXT_MARGIN_LEFT,
                bottom: Const.RefreshLayout_TEXT_MARGIN_BOTTOM
            });
            //下拉刷新文本
            Text.fontSize(Const.RefreshLayout_TEXT_FONT_SIZE);
            //下拉刷新文本
            Text.textAlign(TextAlign.Center);
        }, Text);
        //下拉刷新文本
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
