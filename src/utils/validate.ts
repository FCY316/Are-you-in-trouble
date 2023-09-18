//检验用户名
export function validateName(str: string) {
	const reg = /^[0-9a-zA-Z]{6,12}$/;
	return reg.test(str);
  }
  
  //检验password
  export function validatePwd(str: string) {
	const reg = /^[0-9a-zA-Z]{6,20}$/;
	return reg.test(str);
  }
  
  //检验yzm
  export function validateYzm(str: string) {
	const reg = /^\d{4,6}$/;
	return reg.test(str);
  }
  
  //检验手机号
  export function validPhone(str: string) {
	const reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
	return reg.test(str);
  }
  
  //检验微信号
  export function validWechat(str: string) {
	const reg = /^([a-zA-Z\d])+$/;
	return reg.test(str);
  }
  
  //检验QQ号
  export function validQQ(str: string) {
	const reg = /^\d+$/;
	return reg.test(str);
  }
  
  //检验真实姓名
  export function validRealName(str: string) {
	const reg = /^[\u4e00-\u9fa5]|[a-zA-z\d]{2,}$/;
	return reg.test(str);
  }
  
  //检验登录密码
  export function validLoginPwd(str: string) {
	const reg = /^[a-zA-Z\d]{6,12}$/;
	return reg.test(str);
  }
  
  //检验提款密码
  export function validDrawPwd(str: string) {
	const reg = /^[0-9]{6}$/;
	return str && reg.test(str);
  }
  
  //检验银行卡号
  export function validBankNo(str: string) {
	const reg = /^[0-9]{14,19}$/;
	return reg.test(str);
  }
  
  //检验护照和身份证
  export function validSfz(str: string) {
	const reg = /^[a-zA-Z\d]{8,19}$/;
	return reg.test(str);
  }
  //校验企业代码
  export function validEnterprise(str: string) {
	const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
	return reg.test(str);
  }
  // 检测正整数不包括0
  export function positiveInteger(str: string) {
	const reg = /^[1-9]\d*$/;
	return reg.test(str);
  }
  //正则表达式匹配数字和字母混合（限定位数6-6）
  export function positiveNumAndLetter(str: string) {
	const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,6}$/;
	return reg.test(str);
  }
  // 正的数字或字母
  export function positiveNumOrLetter(str: string) {
	const reg = /^[0-9a-zA-Z]{6,6}$/;
	return reg.test(str);
  }
  // 检测有效的正数（包括小数）
  export function validPositiveNumber(str: string) {
	const reg = /^(\d+(\.\d*)?|\.\d+)$/;
	return reg.test(str);
  }
  