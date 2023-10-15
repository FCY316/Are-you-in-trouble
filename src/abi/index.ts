import { Interface, InterfaceAbi } from "ethers";

type objKeyObjectType = {
  [key: string]: { address: string; abi: Interface | InterfaceAbi };
};
const Factory = require("@/abi/Factory.json");

let contract: objKeyObjectType = {
  // 合约
  // erc20: { abi: erc20, address: "" },
  Factory: { abi: Factory, address: "" },
};
if (process.env.NODE_ENV === "development") {
  //开发环境
  contract.Factory.address = "0x411041B5F0a3D6068E3a0EED5B5849D481461A12";
} else {
  //生产环境
  contract.Factory.address = "0x411041B5F0a3D6068E3a0EED5B5849D481461A12";
}
export default contract;
