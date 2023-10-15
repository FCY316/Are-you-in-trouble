import { useCallback, useEffect, useState } from 'react'
import connectedWallet from './useConnectedWallet'
import newContracts from './useNewContract'

const useGetFatherList = () => {
    const [data, steDate] = useState<{ getFatherListList: any[] | null, getFatherListListPending: boolean }>({
        getFatherListList: null,
        getFatherListListPending: true
    })
    const setgetFatherListListPending = () => {
        steDate({ ...data, getFatherListListPending: true })
    }
    const {address} = connectedWallet.useContainer()
    // 拿到合约
    const { Factory } = newContracts.useContainer();
    // 获取指定池的信息的方法
    const getPending = useCallback(async () => {
        try {
            // 我希望id是number 和 有pool的时候使用
            if (Factory) {            
                const res = await Factory.getFatherList(address)
                console.log(res);
                steDate({ ...data, getFatherListList:res , getFatherListListPending: false })
            }
        } catch (e) {
            steDate({ ...data, getFatherListListPending: false })
            console.log('usegetFatherListList', e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Factory,address])
    // 监听getPoolInfo，因为useCallback的特性
    useEffect(() => {
        data.getFatherListListPending && getPending()
    }, [getPending, data])
    return { ...data, setgetFatherListListPending }
}

export default useGetFatherList
