## useNewContract
    是new出合约的hooks目前被关闭了，需要把 ``&& false`` 删除
## 翻译
    const { t, i18n } = useTranslation();

    翻译 t('xxx')
    切换 i18n.changeLanguage(key)   type[cn,en]
## useChangeChain
    切换链,如果切换没有成功，那么就是没有fibo链，会进行添加网络
## useGetChainID
    获取链id
## useListenerNetWork
    监听钱包的网络
## useWatchWalletAddress
    监听地址变换