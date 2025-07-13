import preferences from "@ohos:data.preferences";
import type { BusinessError as BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
const KEY_APP_FONT_SIZE = 'appFontSize';
const TAG = 'PreferencesUtil';
// PreferencesUtil提供了创建、保存和查询首选项的功能
export class PreferencesUtil {
    preference?: preferences.Preferences;
    // 创建首选项实例的方法
    getFontPreferences(context: Context) {
        this.preference = preferences.getPreferencesSync(context, { name: 'FontPreferences' });
        hilog.info(0x0000, TAG, 'create success');
    }
    // 保存字体大小偏移变化的方法
    saveChangeFontSize(fontSizeOffset: number) {
        this.preference?.putSync(KEY_APP_FONT_SIZE, fontSizeOffset);
        this.preference?.flush((err: BusinessError) => {
            if (err) {
                hilog.error(0x0000, TAG, 'Failed to flush. code =' + err.code + ', message =' + err.message);
                return;
            }
            hilog.info(0x0000, TAG, 'Succeeded in flushing.');
        });
    }
    // 获取字体大小偏移的方法
    getChangeFontSize() {
        let fontSizeOffset: number = 0;
        fontSizeOffset = this.preference?.getSync(KEY_APP_FONT_SIZE, 0) as number;
        return fontSizeOffset;
    }
    // 判断键是否存在的方法
    isKeyExist(): boolean {
        let isKeyExist: boolean = false;
        this.preference?.has(KEY_APP_FONT_SIZE).then(async (isExist: boolean) => {
            isKeyExist = isExist;
        }).catch((err: Error) => {
            hilog.error(0x0000, TAG, 'Has the value failed with err: ' + err);
        });
        return isKeyExist;
    }
}
export default new PreferencesUtil();
