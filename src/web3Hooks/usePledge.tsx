import { useEffect, useState } from "react";
import CounterContainer from "./useConnectedWallet";
import newContracts from "./useNewContract";
import { Contract, ethers } from "ethers";
import useListenerTransfer from "./useListenerTransfer";
import { message } from "antd";
const AreYouInTrouble = require("@/abi/AreYouInTrouble.json");

const usePledge = () => {
  const [state, setState] = useState(false);
  const [plageLod, setLoading] = useState(false);
  const [AreYouInTroublec, setAreYouInTroublec] = useState<Contract | null>(
    null
  );
  const listenerTransferF = useListenerTransfer();
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
        const data = new ethers.Contract(res, AreYouInTrouble, signer);
        setAreYouInTroublec(data);
      } catch (e) {
        console.log("getAddress", e);
      }
    }
  };
  const pdsdas =async () => {
    if (AreYouInTroublec) {
        setLoading(true)
        // 质押
         try{
            const {hash} =await AreYouInTroublec.stakeEther()
            const relset = await listenerTransferF(hash);
            if (relset) {
              message.success("质押成功");
              setState(true)
            } else {
              message.success("质押失败");
            }
          }catch(e){
            console.log('e',e);
          }
          setLoading(false)
      } 
  };
  useEffect(() => {
    getAddress();
  }, [Factory]);
  return {pdsdas,state,plageLod};
};

export default usePledge;
