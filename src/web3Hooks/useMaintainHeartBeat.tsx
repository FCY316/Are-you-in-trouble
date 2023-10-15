import { useState } from "react";
import useListenerTransfer from "./useListenerTransfer";
import connectedWallet from "./useConnectedWallet";
import { message } from "antd";
import { ethers } from "ethers";
const AreYouInTrouble = require("@/abi/AreYouInTrouble.json");

const useMaintainHeartBeat = () => {
    const [maintainLod, setLoading] = useState(false)
    const {signer} = connectedWallet.useContainer()
    // 获取监听事件成功的方法
    const listenerTransferF = useListenerTransfer()    
    const maintain = async (addresss:string) => {
        setLoading(true)
        try {   
            if (signer && addresss) {
                const AreYouInTroublec = new ethers.Contract(addresss, AreYouInTrouble, signer);
                const res= await AreYouInTroublec?.maintainHeartBeat();
                console.log('useMaintainHeartBeat',res);
                const { hash }  = res
                const relset = await listenerTransferF(hash)
                if (relset) {
                    message.success('维持成功')
                } else {
                    message.success('维持失败')
                }
            }
        } catch (e) {
            console.log('usemaintain', e);
        }
        setLoading(false)
    }
    return { maintain, maintainLod }
}

export default useMaintainHeartBeat


