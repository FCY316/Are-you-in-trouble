import { useEffect, useState } from "react";
import connectedWallet from "./useConnectedWallet";
import { ethers } from "ethers";
const erc20 = require('@/abi/erc20.json')
const useTokenInfo = (tokenAddress:string) => {
    const [tokenInfo, setTokenInfo] = useState({
        decimals: '', symbol: '', tokenName: ''
    }
    )
    const {signer} = connectedWallet.useContainer()
    let erc20Contract = null
    const allFun = async (erc20Contract: any) => {
        const decimals = await getDecimalsF(erc20Contract)
        const symbol = await getTokenSymbolF(erc20Contract)
        const tokenName = await getTokenNameF(erc20Contract)
        setTokenInfo({ ...tokenInfo, decimals, symbol, tokenName })
    }
    useEffect(() => {
       if(tokenAddress){
         // eslint-disable-next-line react-hooks/exhaustive-deps
         erc20Contract = new ethers.Contract(tokenAddress, erc20, signer);
         allFun(erc20Contract)
       }else{
        setTokenInfo({
            decimals: '', symbol: '', tokenName: ''
        })
       }
    }, [tokenAddress])
    return tokenInfo
}
// 获取代币的精度
const getDecimalsF = async (erc20Contract: any) => {
    try {
        const decimals = await erc20Contract.decimals();
        return decimals.toString()
    } catch (e) {
        return false;
    }
};
// 获取代币符号
const getTokenSymbolF = async (erc20Contract: any) => {
    try {
        const symbol = await erc20Contract.symbol();
        return symbol
    } catch (e) {
        return false;
    }
};
// 获取代币名称
const getTokenNameF = async (erc20Contract: any) => {
    try {
        const tokenName = await erc20Contract.name();
        return tokenName
    } catch (e) {
        return false;
    }
};
// 获取用户授权额度
export default useTokenInfo
