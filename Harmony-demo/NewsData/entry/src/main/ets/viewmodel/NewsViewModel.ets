import { CommonConstant as Const } from '../common/constant/CommonConstant';
import { NewsData } from './NewsData';
import NewsTypeModel from './NewsTypeModel';
import { httpRequestGet } from '../common/utils/HttpUtil';
import Logger from '../common/utils/Logger';
import ResponseResult from './ResponseResult';

class NewsViewModel {
  //从服务器获取新闻类型列表
  getNewsTypeList(): Promise<NewsTypeModel[]> {
    return new Promise((resolve: Function, reject: Function) => {
      let url = `${Const.SERVER}/${Const.GET_NEWS_TYPE}`;
      httpRequestGet(url).then((data: ResponseResult) => {
        if (data.code === Const.SERVER_CODE_SUCCESS) {
          resolve(data.data);
        } else {
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
        } else {
          Logger.error('getNewsList failed', JSON.stringify(data));
          reject($r('app.string.page_none_msg'));
        }
      }).catch((err: Error) => {
        Logger.error('getNewsList failed', JSON.stringify(err));
        reject($r('app.string.http_error_message'));
      });
    });
  }
}

let newsViewModel = new NewsViewModel();

export default newsViewModel as NewsViewModel;
