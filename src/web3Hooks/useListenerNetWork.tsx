import { walletNameList } from "@/walletName";
import { useCallback, useEffect, useState } from "react";
import { message } from 'antd';
import { chainIDArr } from "@/chain";
import connectedWallet from "./useConnectedWallet";
import useGetChainID from "./useGetChainID";
import useChangeChain from "./useChangeChain";
// 监听钱包的网络
const useListenerNetWork = () => {
  // 存放退出钱包的名字，用于关闭老钱包的监听网络事件
  const [oldWalletName, setOldWalletName] = useState('')
  // 判断有没有监听过网络
  const [switchs, setSwitchs] = useState(false)
  // 获取可以见检测链id的方法
  const { getChainID } = useGetChainID()
  const { walletName, provider, connected } = connectedWallet.useContainer();
  // 当前 切换链的方法
  const { changeChainID } = useChangeChain()
  // 监听函数
  const listenerNetWork = useCallback(() => {
    if (switchs) return
    // 改变监听状态，，已连接状态
    setSwitchs(true)
    // 获取连接的钱包
    setOldWalletName(walletName)
    // eslint-disable-next-line no-eval
    eval(`window.${walletNameList[walletName]}`)
      ?.on("chainChanged", (newNetwork: any) => {
        const chainID = Number(newNetwork)
        // 查看切换的链是否是我们支持的链
        if (chainIDArr.indexOf(chainID) === -1) {
          message.warning(`您当前在Chain${chainID}下，无法为您提供服务`);
          // 如果是的话，我们需要重新连接钱包，更新provider，singer,在这之前我们需要把provider等清空，触发清除监听的函数
          connected(walletName)
        }
      });
  }, [connected, switchs, walletName])
  // 删除监听函数
  const removeListener = useCallback(() => {
    // eslint-disable-next-line no-eval
    eval(`window.${walletNameList[oldWalletName]}`)?.removeAllListeners('chainChanged');
    // 改变钱包连接状态，已断开状态
    setSwitchs(false)
  }, [oldWalletName])
  // 进入检测用户在那个链上面，不在所需的链上，帮助他切换链
  const checkChainSupportF = async () => {
    // 获取链id
    const chainIdWithoutSuffix = await getChainID()
    // 检测链id是不是我们需要的id
    if (chainIdWithoutSuffix && chainIDArr.indexOf(chainIdWithoutSuffix) === -1) return changeChainID(12306)
  }
  useEffect(() => {
    // 当用户连接钱包后去 walletName 和  provider 是一定存在的，这样才可以去监听钱包的切换网络事件
    walletName && provider && listenerNetWork()
    // 如果 walletName 和  provider 为空代表用户断开钱包切换钱包或者没连接过钱包，要把之前监听网络的方法清除掉
    // eslint-disable-next-line no-eval
    !walletName && !provider && removeListener()
    // 检测用户在那条链上面，
    walletName && provider && !switchs && checkChainSupportF()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletName, provider]);

};
export default useListenerNetWork;


