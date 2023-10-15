import { useCallback, useEffect, useState } from "react";
import CounterContainer from "./useConnectedWallet";
import { formatUnits, parseUnits } from "@/utils";
import { Contract, ethers } from "ethers";
import newContracts from "./useNewContract";
import useListenerTransfer from "./useListenerTransfer";
import { message } from "antd";
const erc20 = require("@/abi/erc20.json");
// 获取授权额度
const useAuthorization = (tokenAddress: string) => {
  const [AreYouInTroubleaddress, setaddress] = useState("");
  const [erc20c,steErc20 ] = useState< Contract | null>(null)
  // limit 代表授权额度，used 代表是否使用过
  const [data, steDate] = useState<{
    limit: number | null;
    usedLimit: boolean;
  }>({
    limit: null,
    usedLimit: true,
  });
  const listenerTransferF = useListenerTransfer();
  // 调用方法
  const setUsedLimit = () => {
    steDate({ ...data, usedLimit: true });
  };
  const [approveLod, setLoading] = useState(false);
  // 获取用户地址
  const { address, signer } = CounterContainer.useContainer();
  const { Factory } = newContracts.useContainer();

  // 拿到合约
  const getAddress = async () => {
    if (Factory) {
      try {
        let saltIndex = Number(localStorage.getItem("saltIndex"));
        const addressWithoutPrefix = (address + saltIndex).substring(2);
        const salt = "0x" + addressWithoutPrefix.padStart(64, "0");
        const res = await Factory.predictAddress('0x9c57D81d85E66bD2ba4b0124cc5b86227ebf47ee', salt);
        console.log(res);
        setaddress(res);
      } catch (e) {
        console.log("getAddress", e);
      }
    }
  };
  useEffect(() => {
    getAddress();
  }, [Factory]);
  // 获取授权额度的方法
  const getAuthorization = useCallback(async () => {
    try {
      // 我希望id是number 和 有pool的时候使用
      if (erc20c) {
        const res = await erc20c.allowance(address, AreYouInTroubleaddress);
        console.log("dasdas", res);
        steDate({ ...data, limit: formatUnits(res), usedLimit: false });
      }
    } catch (e) {
      steDate({ ...data, usedLimit: false });
      console.log("usePoolInfo", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, erc20c, AreYouInTroubleaddress]);
  // 授权方法
  const approve = async (num: number) => {
    setLoading(true);
    try {
      if (erc20c) {
        const { hash } = await erc20c.approve(AreYouInTroubleaddress, parseUnits(num+''));
        const relset = await listenerTransferF(hash);
        if (relset) {
          message.success("授权成功");
          setUsedLimit();
        } else {
          message.success("授权失败");
        }
      }
    } catch (e) {
      console.log("useApprove", e);
    }
    setLoading(false);
  };
  // 监听getPoolInfo，因为useCallback的特性
  useEffect(() => {
    tokenAddress && data.usedLimit && getAuthorization();
  }, [getAuthorization, data]);
  useEffect(()=>{
    if(tokenAddress){
       const datassssss =  new ethers.Contract(tokenAddress, erc20, signer);
       steErc20(datassssss)
    }
  },[tokenAddress])
  return { ...data, setUsedLimit, approve, approveLod };
};

export default useAuthorization;
