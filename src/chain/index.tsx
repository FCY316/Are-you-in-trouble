//  白名单
export const chainIDArr = [12306];
export const chainParams:any = {
    12306: {
        chainId: 12306,
        chainName: "Fibochain", // 自定义链的名称
        nativeCurrency: {
            name: "FIBO",
            symbol: "FIBO",
            decimals: 18,
        },
        rpcUrls: ["https://node1.fibo-rpc.asia"],
        blockExplorerUrls: ['https://scan.fibochain.org/'],
    }
};