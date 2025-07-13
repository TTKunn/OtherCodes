import http from "@ohos:net.http";
import ResponseResult from "@bundle:com.example.newsdataarkts/entry/ets/viewmodel/ResponseResult";
import { CommonConstant as Const } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
import type { ContentType } from "@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant";
export function httpRequestGet(url: string): Promise<ResponseResult> {
    //接收url，返回一个Promise
    let httpRequest = http.createHttp(); //创建http实例
    let responseResult = httpRequest.request(url, {
        //配置请求参数
        method: http.RequestMethod.GET,
        readTimeout: Const.HTTP_READ_TIMEOUT,
        header: {
            'Content-Type': "application/json"
        },
        connectTimeout: Const.HTTP_READ_TIMEOUT,
        extraData: {}
    });
    let serverData: ResponseResult = new ResponseResult();
    //处理响应，返回标准化的ResponseResult
    return responseResult.then((value: http.HttpResponse) => {
        if (value.responseCode === Const.HTTP_CODE_200) {
            //获取返回的数据
            let result = `${value.result}`;
            let resultJson: ResponseResult = JSON.parse(result);
            if (resultJson.code === Const.SERVER_CODE_SUCCESS) {
                serverData.data = resultJson.data;
            }
            serverData.code = resultJson.code;
            serverData.msg = resultJson.msg;
        }
        else {
            serverData.msg = `${{ "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }}&${value.responseCode}`;
        }
        return serverData;
    }).catch(() => {
        serverData.msg = { "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
        return serverData;
    });
}
