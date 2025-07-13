import hilog from "@ohos:hilog";
//日志前缀
const LOGGER_PREFIX: string = 'News Release';
//日志工具类
class Logger {
    //日志域
    private domain: number;
    //日志前缀
    private prefix: string;
    //日志格式化字符串
    private format: string = '%{public}s, %{public}s';
    constructor(prefix: string = '', domain: number = 0xFF00) {
        this.prefix = prefix;
        this.domain = domain;
    }
    //输出调试级别日志
    debug(...args: string[]): void {
        hilog.debug(this.domain, this.prefix, this.format, args);
    }
    //输出信息级别日志
    info(...args: string[]): void {
        hilog.info(this.domain, this.prefix, this.format, args);
    }
    //输出警告级别日志
    warn(...args: string[]): void {
        hilog.warn(this.domain, this.prefix, this.format, args);
    }
    //输出错误级别日志
    error(...args: string[]): void {
        hilog.error(this.domain, this.prefix, this.format, args);
    }
}
//导出日志工具单例
export default new Logger(LOGGER_PREFIX);
