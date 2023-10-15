import { ethers } from "ethers";
import { Buffer } from "buffer";
import blockies from "ethereum-blockies";
import { message } from "antd";
var fibo = require("bech32");

// 将BigNumber 转换为普通数(数字类型)
export const formatUnits = (value: any, decimals: number = 18) => {
  const result = ethers.formatUnits(value, decimals);
  return Number(result);
};
// 将普通数转换为BigNumber
export const parseUnits = (value: string, decimals: number = 18) => {
  const result = ethers.parseUnits(value, decimals);
  return result;
};
// 一般用于授权额度，最大额度
export const MaxUint256 = ethers.MaxUint256;
// 时间转换
export function formatTimeToStr(
  times: any,
  pattern1: any = "-",
  pattern2: any = ":",
  w: string = "D"
) {
  // 时间转换
  var date = new Date(times); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + pattern1;
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + pattern1;
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + pattern2;
  var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const timeObj: { [key: string]: string } = {
    s: Y + M + D + h + m + s,
    m: Y + M + D + h + m,
    h: Y + M + D + h,
    D: Y + M + D,
    M: Y + M,
    Y: Y,
  };
  return timeObj[w];
}
// ，如果等于0那么就显示0，如果大于0就保留两位小数+..
export const formatNumber = (value: string | number): string => {
  // 将输入值转换为字符串
  const stringValue = String(value);

  // 将字符串转换为数字，如果无法解析则返回原始字符串
  const numericAmount = parseFloat(stringValue);

  // 检查输入是否为有效的数字
  if (isNaN(numericAmount)) {
    return stringValue; // 如果无法解析为有效数字，则返回原始输入
  }
  // 使用 toFixed 方法将小数位数限制为两位，然后转换为字符串
  const formattedAmount = numericAmount.toFixed(2).toString();

  // 使用正则表达式去除末尾多余的零和可能的小数点
  const cleanedAmount = formattedAmount.replace(/(\.0*|0+)$/, "");

  // 检查小数位数是否超过两位，如果超过，则添加省略号
  const decimalCount = ((numericAmount + "").split(".")[1] || "").length;
  if (decimalCount > 2) {
    return cleanedAmount + "..";
  }

  return cleanedAmount;
};
// 地址转换
export const addressConvert = (address: string) => {
  try {
    if (address.substring(0, 2) === "0x") {
      // 如果是0x开头
      // 0x转fb
      let hexAddr = address;
      hexAddr = hexAddr.slice(0, 2) === "0x" ? hexAddr.slice(2) : hexAddr;
      const words = fibo.bech32.toWords(Buffer.from(hexAddr, "hex"));
      const FBaddress = fibo.bech32.encode("fb", words);
      return FBaddress;
    } else {
      // fb转0x
      const fbAddr = address;
      const addrBuf = Buffer.from(
        fibo.bech32.fromWords(fibo.bech32.decode(fbAddr).words)
      );
      const OXaddress =
        "0x" +
        Array.prototype.map
          .call(new Uint8Array(addrBuf), (x) =>
            ("00" + x.toString(16)).slice(-2)
          )
          .join("");
      return OXaddress;
    }
  } catch (e) {
    return address;
  }
};
// 判断是不是fb地址
export const validateAddress = (addr: any) => {
  try {
    const decodeAddress = fibo.bech32.decode(addr);
    if (decodeAddress.prefix === "fb") {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
// 数据脱敏
export const mobileHidden = (
  value: string,
  start: number = 10,
  end: number = 4,
  d: number = 3
) => {
  const n = start - 1 + d;
  if (value) {
    const valueArray = value.split("");
    for (let i = start; i < valueArray.length - end; i++) {
      valueArray[i] = ".";
      if (i > n) {
        valueArray[i] = "";
      }
    }
    return valueArray.join("");
  }
};
// 通过地址去生成图像
export const ethereumAddressImage = (address: string) => {
  // 创建一个新的 <canvas> 元素
  const canvas = document.createElement("canvas");
  const canvasSize = 64; // 设置画布大小，根据需要调整
  // const fontSize = 16; // 文本字体大小

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  // 在画布上绘制 blockies 图像
  const context = canvas.getContext("2d");
  const img = blockies.create({ seed: address.toLowerCase() });
  context?.drawImage(img, 0, 0, canvasSize, canvasSize); // 绘制 blockies 图像到画布

  // 创建一个新的临时 <canvas> 元素用于裁剪成圆形
  const circularCanvas = document.createElement("canvas");
  circularCanvas.width = canvasSize;
  circularCanvas.height = canvasSize;

  // 在临时画布上绘制圆形图像
  const circularContext = circularCanvas.getContext("2d");
  circularContext?.beginPath();
  circularContext?.arc(
    canvasSize / 2,
    canvasSize / 2,
    canvasSize / 2,
    0,
    2 * Math.PI
  );
  circularContext?.closePath();
  circularContext?.clip();
  circularContext?.drawImage(canvas, 0, 0, canvasSize, canvasSize);
  // 计算文本的居中位置
  // const textWidth = circularContext?.measureText(address).width || 0;
  // const textX = (canvasSize - textWidth) / 2;
  // const textY = canvasSize / 2 + fontSize / 2; // 垂直居中
  // 在圆形图像上方绘制地址文本
  // circularContext && (circularContext.font = "16px Arial");
  // circularContext && (circularContext.fillStyle = "#333"); // 文本颜色
  // circularContext?.fillText(address, textX, textY); // 调整文本位置

  // 将临时画布内容转换为图片格式（PNG）
  const imageDataURL = circularCanvas.toDataURL("image/png");

  return imageDataURL; // 返回生成的圆形图片地址
};
// 复制
export const handleCopyClick = (data: string | number) => {
  try {
    data = data + "";
    const textField = document.createElement("textarea");
    textField.innerText = data;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    message.success("复制成功");
  } catch (e) {
    message.error("复制失败");
  }
};
// 检测是不是fb或者0x地址
export const isValidAddress = (inputString: string) => {
  // 匹配以 "fb" 开头的 41 位字符串，其中包含数字和英文
  const regex1 = /^fb[0-9a-zA-Z]{39}$/;

  // 匹配以 "0x" 开头的 42 位字符串，其中包含数字和英文
  const regex2 = /^0x[0-9a-zA-Z]{40}$/;

  // 使用正则表达式测试输入字符串
  if (regex1.test(inputString) || regex2.test(inputString)) {
    return true; // 字符串符合要求
  } else {
    return false; // 字符串不符合要求
  }
};
