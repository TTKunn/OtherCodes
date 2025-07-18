import rcp from "@hms:collaboration.rcp";
import fileIo from "@ohos:file.fs";
import fileUri from "@ohos:file.fileuri";
import type { BusinessError as BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import type ResponseData from '../../viewmodel/ResponseData/ResponseData';
import type ListInfo from '../../viewmodel/ResponseData/ListInfo';
const TAG: string = 'RCPUtils';
const IMAGE_URL: string = 'https://developer.huawei.com/system/modules/org.opencms.portal.template.core/' +
    'resources/harmony/img/jiantou_right.svg';
const RESOURCE_URL: string = 'https://svc-drcn.developer.huawei.com/community/servlet/consumer' +
    '/partnerActivityService/v1/developer/activity/terminalActivities/list';
/**
 * The RCPUtils provides the capability of accessing the network through RCP.
 */
export class RCPUtils {
    rcpSession: rcp.Session;
    constructor() {
        this.rcpSession = rcp.createSession();
    }
    /**
     * The method of initiating a GET request through RCP.
     */
    async getRCPRequest(cacheDir: string): Promise<string> {
        let responsePictureUri: string = '';
        await this.rcpSession.get(IMAGE_URL).then((response) => {
            let filePath = cacheDir + '/test.svg';
            let file = fileIo.openSync(filePath, fileIo.OpenMode.CREATE | fileIo.OpenMode.READ_WRITE);
            responsePictureUri = fileUri.getUriFromPath(filePath);
            fileIo.writeSync(file.fd, response.body);
            fileIo.closeSync(file.fd);
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `err: err code is ${err.code}, err message is ${JSON.stringify(err)}`);
        });
        return responsePictureUri;
    }
    /**
     * The method of initiating a POST request through RCP.
     */
    async postRCPRequest(): Promise<ListInfo[]> {
        let responseData: Array<ListInfo> = [];
        let requestContent: rcp.RequestContent = {
            'status': '1',
            'belong': '1',
            'language': 'cn',
            'needTop': 1,
            'displayChannel': [1, 3],
            'count': 4,
            'pagestart': 1,
            'type': '1,4,5,6'
        };
        await this.rcpSession.post(RESOURCE_URL, requestContent).then((response) => {
            let result: ResponseData = response.toJSON() as ResponseData;
            responseData = result.value.list;
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, TAG, `err: err code is ${err.code}, err message is ${JSON.stringify(err)}`);
        });
        return responseData;
    }
    /**
     * The method of closing a RCP Session.
     */
    destroySession() {
        this.rcpSession.close();
    }
}
