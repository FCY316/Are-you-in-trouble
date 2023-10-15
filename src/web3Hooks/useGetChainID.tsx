import { useState } from "react";
import connectedWallet from "./useConnectedWallet";
// 获取链id
const useGetChainID = () => {
    const [chainIDLod, setLoading] = useState(false)
    // 拿到provider
    const { provider, } = connectedWallet.useContainer();
    const getChainID = async () => {
        setLoading(true)
        try {
            // 获取网络信息
            const network = await (provider as any).getNetwork();
            // 输出当前连接的链的信息
            // 将链 ID 转换为字符串，并去掉后缀 "n"
            const chainId = network.chainId.toString();
            const chainIdWithoutSuffix = chainId.endsWith("n")
                ? chainId.slice(0, -1)
                : chainId;
            return Number(chainIdWithoutSuffix)
        } catch (e) {
            console.log('useApprove', e);
        }
        setLoading(false)
    }
    return { getChainID, chainIDLod }
}

export default useGetChainID