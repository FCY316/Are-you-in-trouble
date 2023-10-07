import { walletNameList } from "@/walletName";
import { useCallback, useEffect, useState } from "react";
import connectedWallet from "./useConnectedWallet";
// 监听地址变换，链的切换不会影响到地址的切换的监听，故只有退出钱包才要清除地址监听
const useWatchWalletAddress = () => {
    const { walletName, provider, connected } = connectedWallet.useContainer();
    // 存放退出钱包的名字，用于关闭老钱包的监听地址事
    const [oldWalletName, setOldWalletName] = useState('')
    // 判断有没有监听过网络
    const [switchs, setSwitchs] = useState(false)
    // 监听地址的切换函数
    const watchWalletAddress = useCallback(() => {
        if (switchs) return;
        // 改变监听状态，，已监听状态
        setSwitchs(true)
        // 获取连接钱包的名字
        setOldWalletName(walletName)
        // eslint-disable-next-line no-eval
        eval(`window.${walletNameList[walletName]}`)
            ?.on("accountsChanged", (accounts: any[]) => {
                // 如果是的话，我们需要重新连接钱包，更新singer
                // breaks()
                connected(walletName)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [switchs, walletName])
    // 清除监听地址函数
    const removeWatchWalletAddress = useCallback(() => {
        // eslint-disable-next-line no-eval
        eval(`window.${walletNameList[oldWalletName]}`)?.removeAllListeners('accountsChanged');
        // 改变监听状态，，已清除监听状态
        setSwitchs(false)
    }, [oldWalletName])
    useEffect(() => {
        walletName && provider && watchWalletAddress()
        !walletName && !provider && removeWatchWalletAddress()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletName, provider])
}

export default useWatchWalletAddress