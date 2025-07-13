import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import type window from "@ohos:window";
import hilog from "@ohos:hilog";
import PreferencesUtil from "@bundle:com.example.pageanddata/entry/ets/common/database/PreferencesUtil";
import RDBStoreUtil from "@bundle:com.example.pageanddata/entry/ets/common/database/RDBStoreUtil";
import ConnectionUtils from "@bundle:com.example.pageanddata/entry/ets/common/network/ConnectionUtils";
// Ability的生命周期管理
export default class entryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        PreferencesUtil.getFontPreferences(this.context);
        ConnectionUtils.openRegister();
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
        hilog.info(0x0000, 'testTag', '%{public}s', 'want param:' + JSON.stringify(want) ?? '');
        hilog.info(0x0000, 'testTag', '%{public}s', 'launchParam:' + JSON.stringify(launchParam) ?? '');
    }
    onDestroy(): void | Promise<void> {
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        // 主窗口已创建，为该ability设置主页面
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        windowStage.getMainWindow().then((data: window.Window) => {
            // 窗口沉浸式
            data.setWindowLayoutFullScreen(true);
        });
        RDBStoreUtil.createObjectiveRDB(this.context);
        windowStage.loadContent('pages/LoginPage', (err, data) => {
            if (err.code) {
                hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.ERROR);
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            let context: UIContext = windowStage.getMainWindowSync().getUIContext();
            ConnectionUtils.registerNetworkAvailableStatus(context);
            hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
        });
    }
    onWindowStageDestroy(): void {
        // 主窗口被销毁，释放UI相关资源
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
        ConnectionUtils.closeRegister();
    }
    onForeground(): void {
        // Ability已被带到前台
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground(): void {
        // Ability已回到后台
        hilog.isLoggable(0x0000, 'testTag', hilog.LogLevel.INFO);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }
}
