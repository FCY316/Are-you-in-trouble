import { useEffect, useState } from "react"
import { ethers, Provider, Signer } from 'ethers'
import { createContainer } from "unstated-next"
import { download, walletNameList, walletNameListShow } from "@/walletName"
type walletType = {
    provider: Provider | null,
    signer: Signer | null,
    address: string,
    walletName: string
}
const initialState: walletType = {
    provider: null,
    signer: null,
    address: '',
    walletName: localStorage.getItem('walletName') || ''
}
const useConnectedWallet = (props = initialState) => {
    const [wallet, setWallet] = useState<walletType>(props);
    let connected = (walletName = 'MetaMask') => connectedWallet(walletName);
    let breaks = () => breakWallet()
    // 连接钱包
    const connectedWallet = async (walletName: string) => {
        try {
            // 判断有没有选中的钱包
            // eslint-disable-next-line no-eval
            if (eval(`window.${walletNameListShow[walletName]}`)) {
                // 有的话连接钱包
                const provider = new ethers.BrowserProvider(
                    // eslint-disable-next-line no-eval
                    eval(`window.${walletNameList[walletName]}`)
                );
                const signer = await provider.getSigner();
                const address = signer.address;
                // 本地没有连接过的钱包的话，存入本地，有的话不存
                localStorage.setItem('walletName', walletName)
                // 本地有连接过的钱包的话，状态管理的walletName不用更新，如果没有的话更新
                props.walletName ? setWallet({ ...wallet, signer, address, provider }) : setWallet({ ...wallet, signer, address, provider, walletName })
            } else {
                window.open(download[walletName]);
            }
        } catch (e) {
            console.log('e', e);
        }
    }
    // 断开钱包
    const breakWallet = () => {
        console.log('断开钱包');
        // 断开钱包先清除本地的的连接的钱包名称
        localStorage.removeItem('walletName')
        // 然后清除状态管理的参数
        setWallet({ ...initialState })
    }
    // 在页面初始化的时候检测本地是都有缓存，有的话连接，没有的话不管
    useEffect(() => {
        if (initialState.walletName) {
            connected()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return { ...wallet, connected, breaks }
}
const connectedWallet = createContainer(useConnectedWallet)
export default connectedWallet
