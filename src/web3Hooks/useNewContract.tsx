import { Contract, ethers } from 'ethers'
import { useEffect, useState } from "react";
import contract from '@/abi'
import CounterContainer from "@/web3Hooks/useConnectedWallet";
import { createContainer } from 'unstated-next';
type objKeyObjectType = {
    [key: string]: object;
}
type walletType = {
    erc20: Contract | null
}
const initialState: walletType = {
    erc20: null
}
// new出合约，
const useNewContract = (props = initialState) => {
    // new 出来的合约
    const [contracts, setContracts] = useState(props)
    // 得到signer
    const { signer } = CounterContainer.useContainer();
    // 当signer有后new出合约
    useEffect(() => {
        if (signer && false) {
            let obj: objKeyObjectType = {}
            // 遍历出合约
            Object.keys(contract).forEach((key) => {
                obj[key] = new ethers.Contract(contract[key].address, contract[key].abi, signer);
            })
            setContracts({ ...contracts, ...obj })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer])
    return contracts
}
const newContracts = createContainer(useNewContract)
export default newContracts
