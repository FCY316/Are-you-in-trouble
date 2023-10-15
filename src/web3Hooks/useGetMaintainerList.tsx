import { useCallback, useEffect, useState } from "react"
import connectedWallet from "./useConnectedWallet"
import newContracts from "./useNewContract"

const useGetMaintainerList = () => {
    // pending 代表池子总质押金额，used 代表是否使用过
    const [data, steDate] = useState<{ getMaintainerList: any[] | null, getMaintainerListPending: boolean }>({
        getMaintainerList: null,
        getMaintainerListPending: true
    })
    const setGetMaintainerListPending = () => {
        steDate({ ...data, getMaintainerListPending: true })
    }
    const {address} = connectedWallet.useContainer()
    // 拿到合约
    const { Factory } = newContracts.useContainer();
    // 获取指定池的信息的方法
    const getPending = useCallback(async () => {
        try {
            // 我希望id是number 和 有pool的时候使用
            if (Factory) {            
                const res = await Factory.getMaintainerList(address)
                console.log(res);
                steDate({ ...data, getMaintainerList:res , getMaintainerListPending: false })
            }
        } catch (e) {
            steDate({ ...data, getMaintainerListPending: false })
            console.log('useGetMaintainerList', e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Factory,address])
    // 监听getPoolInfo，因为useCallback的特性
    useEffect(() => {
        data.getMaintainerListPending && getPending()
    }, [getPending, data])
    return { ...data, setGetMaintainerListPending }
}

export default useGetMaintainerList
