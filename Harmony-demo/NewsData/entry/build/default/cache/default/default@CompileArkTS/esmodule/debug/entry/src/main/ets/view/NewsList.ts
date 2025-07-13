if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NewsList_Params {
    newsModel?: NewsModel;
    customRefreshLoadClass?: CustomRefreshLoadLayoutClass;
    refreshLayoutClass?: CustomRefreshLoadLayoutClass;
    loadMoreLayoutClass?: CustomRefreshLoadLayoutClass;
    currentIndex?: number;
}
import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type { PageState } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import NewsItem from "@bundle:com.example.newsdataarkts/entry/ets/view/NewsItem";
import LoadMoreLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/LoadMoreLayout";
import RefreshLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/RefreshLayout";
import CustomRefreshLoadLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/CustomRefreshLoadLayout";
import { CustomRefreshLoadLayoutClass } from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsData";
import type { NewsData } from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsData";
import { listTouchEvent } from "@bundle:com.example.newsdataarkts/entry/ets/common/utils/PullDownRefresh";
import NewsViewModel from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel";
import NoMoreLayout from "@bundle:com.example.newsdataarkts/entry/ets/view/NoMoreLayout";
import NewsModel from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsModel";
export default class NewsList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__newsModel = new ObservedPropertyObjectPU(new NewsModel(), this, "newsModel");
        this.__customRefreshLoadClass = new ObservedPropertyObjectPU(new CustomRefreshLoadLayoutClass(true, { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, this.newsModel.pullDownRefreshHeight), this, "customRefreshLoadClass");
        this.__refreshLayoutClass = new ObservedPropertyObjectPU(new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight), this, "refreshLayoutClass");
        this.__loadMoreLayoutClass = new ObservedPropertyObjectPU(new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage, this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight), this, "loadMoreLayoutClass");
        this.__currentIndex = new SynchedPropertySimpleTwoWayPU(params.currentIndex, this, "currentIndex");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("newsModel", this.newCustom);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NewsList_Params) {
        if (params.newsModel !== undefined) {
            this.newsModel = params.newsModel;
        }
        if (params.customRefreshLoadClass !== undefined) {
            this.customRefreshLoadClass = params.customRefreshLoadClass;
        }
        if (params.refreshLayoutClass !== undefined) {
            this.refreshLayoutClass = params.refreshLayoutClass;
        }
        if (params.loadMoreLayoutClass !== undefined) {
            this.loadMoreLayoutClass = params.loadMoreLayoutClass;
        }
    }
    updateStateVars(params: NewsList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__newsModel.purgeDependencyOnElmtId(rmElmtId);
        this.__customRefreshLoadClass.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshLayoutClass.purgeDependencyOnElmtId(rmElmtId);
        this.__loadMoreLayoutClass.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__newsModel.aboutToBeDeleted();
        this.__customRefreshLoadClass.aboutToBeDeleted();
        this.__refreshLayoutClass.aboutToBeDeleted();
        this.__loadMoreLayoutClass.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __newsModel: ObservedPropertyObjectPU<NewsModel>;
    get newsModel() {
        return this.__newsModel.get();
    }
    set newsModel(newValue: NewsModel) {
        this.__newsModel.set(newValue);
    }
    private __customRefreshLoadClass: ObservedPropertyObjectPU<CustomRefreshLoadLayoutClass>;
    get customRefreshLoadClass() {
        return this.__customRefreshLoadClass.get();
    }
    set customRefreshLoadClass(newValue: CustomRefreshLoadLayoutClass) {
        this.__customRefreshLoadClass.set(newValue);
    }
    private __refreshLayoutClass: ObservedPropertyObjectPU<CustomRefreshLoadLayoutClass>;
    get refreshLayoutClass() {
        return this.__refreshLayoutClass.get();
    }
    set refreshLayoutClass(newValue: CustomRefreshLoadLayoutClass) {
        this.__refreshLayoutClass.set(newValue);
    }
    private __loadMoreLayoutClass: ObservedPropertyObjectPU<CustomRefreshLoadLayoutClass>;
    get loadMoreLayoutClass() {
        return this.__loadMoreLayoutClass.get();
    }
    set loadMoreLayoutClass(newValue: CustomRefreshLoadLayoutClass) {
        this.__loadMoreLayoutClass.set(newValue);
    }
    private __currentIndex: SynchedPropertySimpleTwoWayPU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    //监听刷新状态变化并更新UI
    newCustom() {
        this.refreshLayoutClass =
            new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight);
        this.loadMoreLayoutClass =
            new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage, this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight);
    }
    //切换新闻分类并获取数据
    changeCategory() {
        this.newsModel.currentPage = 1;
        NewsViewModel.getNewsList(this.newsModel.currentPage, this.newsModel.pageSize, Const.GET_NEWS_LIST)
            .then((data: NewsData[]) => {
            //更新页面信息
            this.newsModel.pageState = 1;
            //更新分页信息
            if (data.length === this.newsModel.pageSize) {
                this.newsModel.currentPage++;
                this.newsModel.hasMore = true;
            }
            else {
                this.newsModel.hasMore = false;
            }
            //更新数据
            this.newsModel.newsData = data;
        })
            .catch((err: string | Resource) => {
            this.getUIContext().getPromptAction().showToast({
                message: err,
                duration: Const.ANIMATION_DURATION
            });
            this.newsModel.pageState = 2;
        });
    }
    //组件即将出现时请求新闻数据
    aboutToAppear() {
        this.changeCategory();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(Const.FULL_WIDTH);
            Column.height(Const.FULL_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
            Column.onTouch((event: TouchEvent | undefined) => {
                if (event) {
                    if (this.newsModel.pageState === 1) {
                        listTouchEvent(this.newsModel, event);
                    }
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.newsModel.pageState === 1) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.ListLayout.bind(this)();
                });
            }
            else if (this.newsModel.pageState === 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.LoadingLayout.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.FailLayout.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    //加载中布局构建器
    LoadingLayout(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomRefreshLoadLayout(this, { customRefreshLoadClass: this.customRefreshLoadClass }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 99, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            customRefreshLoadClass: this.customRefreshLoadClass
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        customRefreshLoadClass: this.customRefreshLoadClass
                    });
                }
            }, { name: "CustomRefreshLoadLayout" });
        }
    }
    //列表布局构建器
    ListLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width(Const.NewsListConstant_LIST_WIDTH);
            List.height(Const.FULL_HEIGHT);
            List.margin({ left: Const.NewsListConstant_LIST_MARGIN_LEFT, right: Const.NewsListConstant_LIST_MARGIN_RIGHT });
            List.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            List.divider({
                color: { "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" },
                strokeWidth: Const.NewsListConstant_LIST_DIVIDER_STROKE_WIDTH,
                endMargin: Const.NewsListConstant_LIST_MARGIN_RIGHT
            });
            List.edgeEffect(EdgeEffect.None);
            List.offset({ x: 0, y: `${this.newsModel.offsetY}px` });
            List.onScrollIndex((start: number, end: number) => {
                //监听当前列表的首个索引
                this.newsModel.startIndex = start;
                this.newsModel.endIndex = end;
            });
        }, List);
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new RefreshLayout(this, {
                                refreshLayoutClass: this.refreshLayoutClass
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 107, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    refreshLayoutClass: this.refreshLayoutClass
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                refreshLayoutClass: this.refreshLayoutClass
                            });
                        }
                    }, { name: "RefreshLayout" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            //新闻项列表项
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        //新闻项列表项
                        ListItem.height(Const.NewsListConstant_ITEM_HEIGHT);
                        //新闻项列表项
                        ListItem.backgroundColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
                        //新闻项列表项
                        ListItem.margin({ top: Const.NewsListConstant_ITEM_MARGIN_TOP });
                        //新闻项列表项
                        ListItem.borderRadius(Const.NewsListConstant_ITEM_BORDER_RADIUS);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new NewsItem(this, { newsData: item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 115, col: 11 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            newsData: item
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "NewsItem" });
                        }
                        //新闻项列表项
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    //新闻项列表项
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.newsModel.newsData, forEachItemGenFunction, (item: NewsData, index?: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        ForEach.pop();
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.newsModel.hasMore) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new LoadMoreLayout(this, {
                                            loadMoreLayoutClass: this.loadMoreLayoutClass
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 125, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                loadMoreLayoutClass: this.loadMoreLayoutClass
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            loadMoreLayoutClass: this.loadMoreLayoutClass
                                        });
                                    }
                                }, { name: "LoadMoreLayout" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new NoMoreLayout(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 129, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "NoMoreLayout" });
                            }
                        });
                    }
                }, If);
                If.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
    }
    //加载失败布局构建器
    FailLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Image.height(Const.NewsListConstant_NONE_IMAGE_SIZE);
            Image.width(Const.NewsListConstant_NONE_IMAGE_SIZE);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.opacity(Const.NewsListConstant_NONE_TEXT_opacity);
            Text.fontSize(Const.NewsListConstant_NONE_TEXT_size);
            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.margin({ top: Const.NewsListConstant_NONE_TEXT_margin });
        }, Text);
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
