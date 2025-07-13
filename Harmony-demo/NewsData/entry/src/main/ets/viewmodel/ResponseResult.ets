//响应结果类，用于封装HTTP请求的返回数据
export default class ResponseResult {
  //响应状态码
  code: string;
  //响应消息
  msg: string | Resource;
  //响应数据
  data: string | Object | ArrayBuffer;

  constructor() {
    this.code = '';
    this.msg = '';
    this.data = '';
  }
}