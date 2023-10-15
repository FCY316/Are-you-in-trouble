import { useEffect, useState } from "react";
import useListenerTransfer from "./useListenerTransfer";
import newContracts from "./useNewContract";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import connectedWallet from "./useConnectedWallet";
import { ethers } from "ethers";
const AreYouInTrouble = require("@/abi/AreYouInTrouble.json");

const useSet = () => {
    const [AreYouInTroubleaddress,setaddress] = useState('')
    const {Factory} =  newContracts.useContainer()
    const {address,signer} = connectedWallet.useContainer()
  const [setLod, setLoading] = useState(false);
  // 获取监听事件成功的方法
  const listenerTransferF = useListenerTransfer();
  const navigate = useNavigate();
  const set = async (
    tokenAddress: string,
    inheritor: string,
    inheritanceAmount: number,
    maintainInterval: number,
    maintainer: string
  ) => {
    setLoading(true);
    try {
      if (AreYouInTrouble) {
        console.log(tokenAddress,inheritor,inheritanceAmount,maintainInterval,maintainer);
        
       const AreYouInTroublec = new ethers.Contract(AreYouInTroubleaddress, AreYouInTrouble, signer);
        const { hash } = await AreYouInTroublec?.set(tokenAddress,inheritor,inheritanceAmount,maintainInterval,maintainer);
        const relset = await listenerTransferF(hash);
        if (relset) {
          message.success("设置成功");
          const data = JSON.parse(localStorage.getItem('obj')|| '[]') 
          localStorage.setItem('obj',JSON.stringify([...data,AreYouInTroubleaddress]))
          navigate("/creation");
        } else {
          message.success("设置失败");
        }
      }
    } catch (e) {
      console.log("useSet", e);
    }
    setLoading(false);
  };
  // 获取继承合约地址
  const getAddress = async()=>{
    if(Factory){
        try{
            let saltIndex = Number(localStorage.getItem('saltIndex'));
            console.log('saltIndex',saltIndex);
            const addressWithoutPrefix = (address+saltIndex).substring(2);
            const salt = '0x' + addressWithoutPrefix.padStart(64, '0');
            console.log('salt',salt);
            const res = await Factory.predictAddress('0x9c57D81d85E66bD2ba4b0124cc5b86227ebf47ee', salt)
            console.log('predictAddress',res);
            setaddress(res)
         }catch(e){
             console.log('getAddress',e);
         }
    }
  }
  useEffect(()=>{
    getAddress()
  },[Factory])
  return { set, setLod };
};

export default useSet;
