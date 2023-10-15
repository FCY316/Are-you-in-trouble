import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import connectedWallet from "./useConnectedWallet";
const AreYouInTrouble = require("@/abi/AreYouInTrouble.json");
const useGetcreateAddress = (addresss:string) => {
          // pending 代表池子总质押金额，used 代表是否使用过
      const [data, steDate] = useState<{ addressJ: string | null, addressJPending: boolean }>({
        addressJ: null,
        addressJPending: true
    })
    const setAddressJPending = () => {
        steDate({ ...data, addressJPending: true })
    }
    const {signer} = connectedWallet.useContainer()
    // 获取指定池的信息的方法
    const getPending = useCallback(async () => {
        try {
            // 我希望id是number 和 有pool的时候使用
            if (signer && addresss ) {            
                const AreYouInTroublec = new ethers.Contract(addresss, AreYouInTrouble, signer);
                const owner = await AreYouInTroublec.owner()
                steDate({ ...data, addressJ:owner , addressJPending: false })
            }
        } catch (e) {
            steDate({ ...data, addressJPending: false })
            console.log('getInheritorList', e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer,addresss])
    // 监听getPoolInfo，因为useCallback的特性
    useEffect(() => {
        data.addressJPending && getPending()
    }, [getPending, data])
    return { ...data, setAddressJPending }
    
    
    
}

export default useGetcreateAddress
