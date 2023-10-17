import { useCallback, useEffect, useState } from "react";
import connectedWallet from "./useConnectedWallet";
import { ethers } from "ethers";
import { formatUnits } from "@/utils";
import useListenerTransfer from "./useListenerTransfer";
import { message } from "antd";
const AreYouInTrouble = require("@/abi/AreYouInTrouble.json");

const useGetInfo = (addresss: string) => {
  const [data, steDate] = useState<{
    addressj: string | null;
    inheritanceERC20List: string | null;
    inheritanceERC20:number|null
    addressJPending: boolean;
    loadih:boolean,
    claimApproveERC20:any
  }>({
    addressj: null,
    inheritanceERC20List:null,
    inheritanceERC20:null,
    addressJPending: true,
    loadih:false,
    claimApproveERC20:()=>{}
  });
  const [lod,steLoda] = useState(false)
  const setAddressJPending = () => {
    steDate({ ...data, addressJPending: true });
  };
  const { signer,address } = connectedWallet.useContainer();
  const listenerTransferF = useListenerTransfer()

  const getPending = useCallback(async () => {
    try {
      if (signer && addresss) {
        const AreYouInTroublec = new ethers.Contract(
          addresss,
          AreYouInTrouble,
          signer
        );  
        const owner = await AreYouInTroublec.owner();
        const  inheritanceERC20List = await AreYouInTroublec.inheritanceERC20List(address,0);
        const  inheritanceERC20 = await AreYouInTroublec.inheritanceERC20(address,inheritanceERC20List);
        const claimApproveERC20 =async () => {
          steLoda(true)
        try{
          const {hash} =  await AreYouInTroublec.claimApprovedERC20(inheritanceERC20List,  inheritanceERC20)
          const relset = await listenerTransferF(hash)
          if (relset) {
            message.success('继承成功')
            steLoda(false)

        } else {
            message.error('继承失败')
            steLoda(false)
        }
        }catch(e){
          console.log('e',e);
          message.error('继承失败')
          steLoda(false)

        }
        }
        steDate({ ...data, addressj: owner,inheritanceERC20List:inheritanceERC20List,inheritanceERC20:formatUnits(inheritanceERC20,0),claimApproveERC20:claimApproveERC20, addressJPending: false });
      }
    } catch (e) {
      steDate({ ...data, addressJPending: false });
      console.log("getInheritorList", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, addresss]);
  useEffect(() => {
    data.addressJPending && getPending();
  }, [getPending, data]);
  return { ...data,lod, setAddressJPending };
};

export default useGetInfo;
