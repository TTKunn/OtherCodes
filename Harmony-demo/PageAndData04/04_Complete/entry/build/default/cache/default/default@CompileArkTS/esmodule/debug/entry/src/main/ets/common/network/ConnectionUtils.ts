import connection from "@ohos:net.connection";
import type { BusinessError as BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
const TAG: string = 'ConnectionUtils';
/**
 * The ConnectionUtils provides the network listening capability.
 */
export class ConnectionUtils {
    netConnection = connection.createNetConnection();
    /**
     *The method of checking whether the monitoring network is connected..
     */
    async isNetworkConnected(): Promise<boolean> {
        let result: boolean = false;
        await connection.getDefaultNet().then(async (data: connection.NetHandle) => {
            if (data.netId === 0) {
                hilog.info(0x0000, TAG, 'network error');
                return;
            }
            await connection.getNetCapabilities(data).then((data: connection.NetCapabilities) => {
                let bearerTypes: Set<number> = new Set(data.bearerTypes);
                let bearerTypesNum = Array.from(bearerTypes.values());
                for (let item of bearerTypesNum) {
                    if (item === 0) {
                        result = true;
                        hilog.info(0x0000, TAG, 'BEARER_CELLULAR');
                    }
                    else if (item === 1) {
                        result = true;
                        hilog.info(0x0000, TAG, 'BEARER_WIFI');
                    }
                    else if (item === 3) {
                        result = true;
                        hilog.info(0x0000, TAG, 'BEARER_ETHERNET');
                    }
                    else {
                        return;
                    }
                }
            });
        });
        return result;
    }
    /**
     *The method of opening register.
     */
    openRegister() {
        this.netConnection.register((error: BusinessError) => {
            hilog.info(0x0000, TAG, JSON.stringify(error));
        });
    }
    /**
     *The method of listening to the network status.
     */
    registerNetworkAvailableStatus(context: UIContext) {
        this.netConnection.on('netAvailable', () => {
            context.getPromptAction().showToast({
                message: { "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
                duration: 2000
            });
        });
        this.netConnection.on('netUnavailable', () => {
            context.getPromptAction().showToast({
                message: { "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
                duration: 2000
            });
        });
        this.netConnection.on('netLost', () => {
            context.getPromptAction().showToast({
                message: { "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.pageanddata", "moduleName": "entry" },
                duration: 2000
            });
        });
    }
    /**
     *The method of closing register.
     */
    closeRegister() {
        this.netConnection.unregister((error: BusinessError) => {
            hilog.info(0x0000, TAG, JSON.stringify(error));
        });
    }
}
export default new ConnectionUtils();
