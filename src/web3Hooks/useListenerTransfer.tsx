import CounterContainer from "./useConnectedWallet";
// 监听交易是否成功
const useListenerTransfer = () => {
    const { provider } = CounterContainer.useContainer();
    const listenerTransferF = (transactionHash: any) => {
        return new Promise((reslove, reject) => {
            provider?.once(transactionHash, (receipt: any) => {
                if (receipt.status) {
                    reslove(true);
                }
                reslove(false);
            });
        });
    };
    return listenerTransferF
}

export default useListenerTransfer