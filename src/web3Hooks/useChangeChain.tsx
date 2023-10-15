import { useState } from "react";
import connectedWallet from "./useConnectedWallet";
import { chainParams } from '@/chain'
// 切换链,如果切换没有成功，那么就是没有fibo链，会进行添加网络
const useChangeChain = () => {
    const [changeChainIDLod, setLoading] = useState(false)
    // 拿到provider
    const { provider, } = connectedWallet.useContainer();
    // 切换链,如果切换链失败就添加链
    // 切换链
    const changeChainID = async (chainID: number) => {
        try {
            provider && await (provider as any).send("wallet_switchEthereumChain", [
                { chainId: `0x${chainID.toString(16)}` },
            ]);
        } catch (e) {
            console.log('changeChainID', e);
            addChainID(chainID)
        }
    }
    // 添加链
    const addChainID = async (chainID: number) => {
        setLoading(true)
        try {
            const data = {
                ...chainParams[chainID],
                chainId: `0x${chainID.toString(16)}`,
            };
            // 发送添加链的请求
            provider && await (provider as any).send("wallet_addEthereumChain", [data]);
        } catch (e) {
            console.log('useChangeChain', e);
        }
        setLoading(false)
    }
    return { changeChainID, changeChainIDLod }
}

export default useChangeChain