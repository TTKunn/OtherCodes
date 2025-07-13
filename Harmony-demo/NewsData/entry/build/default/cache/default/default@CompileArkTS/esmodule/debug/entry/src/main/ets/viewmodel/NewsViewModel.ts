import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type { NewsData } from './NewsData';
import type NewsTypeModel from './NewsTypeModel';
import { httpRequestGet } from "@bundle:com.example.newsdataarkts/entry/ets/common/utils/HttpUtil";
import Logger from "@bundle:com.example.newsdataarkts/entry/ets/common/utils/Logger";
import type ResponseResult from './ResponseResult';
class NewsViewModel {
    //从服务器获取新闻类型列表
    getNewsTypeList(): Promise<NewsTypeModel[]> {
        return new Promise((resolve: Function, reject: Function) => {
            let url = `${Const.SERVER}/${Const.GET_NEWS_TYPE}`;
            httpRequestGet(url).then((data: ResponseResult) => {
                if (data.code === Const.SERVER_CODE_SUCCESS) {
                    resolve(data.data);
                }
                else {
                    reject(Const.TabBars_DEFAULT_NEWS_TYPES);
                }
            }).catch(() => {
                reject(Const.TabBars_DEFAULT_NEWS_TYPES);
            });
        });
    }
    //获取默认的新闻类型列表
    getDefaultTypeList(): NewsTypeModel[] {
        return Const.TabBars_DEFAULT_NEWS_TYPES;
    }
    //从服务器获取新闻列表
    getNewsList(currentPage: number, pageSize: number, path: string): Promise<NewsData[]> {
        return new Promise(async (resolve: Function, reject: Function) => {
            let url = `${Const.SERVER}/${path}`;
            url += '?currentPage=' + currentPage + '&pageSize=' + pageSize;
            httpRequestGet(url).then((data: ResponseResult) => {
                if (data.code === Const.SERVER_CODE_SUCCESS) {
                    resolve(data.data);
                }
                else {
                    Logger.error('getNewsList failed', JSON.stringify(data));
                    reject({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
                }
            }).catch((err: Error) => {
                Logger.error('getNewsList failed', JSON.stringify(err));
                reject({ "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            });
        });
    }
}
let newsViewModel = new NewsViewModel();
export default newsViewModel as NewsViewModel;
