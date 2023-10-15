import { useState } from "react";
import newContracts from "./useNewContract"
import useListenerTransfer from "./useListenerTransfer";
import connectedWallet from "./useConnectedWallet";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const useCreate = () => {
    const {Factory} =  newContracts.useContainer()
    const {address} = connectedWallet.useContainer()
    const [createLod, setLoading] = useState(false)
    // 获取监听事件成功的方法
    const listenerTransferF = useListenerTransfer()
    const navigate = useNavigate()
    const create = async () => {
        setLoading(true)
        try {
            if (Factory) {
                let saltIndex = Number(localStorage.getItem('saltIndex')) || null ;
                if(!saltIndex){ 
                    saltIndex = 0                    
                    saltIndex +=1
                }else{
                    saltIndex +=1
                }
                console.log(saltIndex);
                const addressWithoutPrefix = (address+saltIndex).substring(2);
                const salt = '0x' + addressWithoutPrefix.padStart(64, '0');
                console.log('salt',salt);
                
                const res= await Factory?.create('0x9c57D81d85E66bD2ba4b0124cc5b86227ebf47ee',salt,address);
                console.log('addressWithoutPrefix',res);
                
                const { hash }  = res
                const relset = await listenerTransferF(hash)
                if (relset) {
                    message.success('创建成功')
                    localStorage.setItem('saltIndex',saltIndex+'')
                    navigate('/establish')
                } else {
                    message.success('创建失败')
                }
            }
        } catch (e) {
            console.log('useCreate', e);
        }
        setLoading(false)
    }
    return { create, createLod }
   
}

export default useCreate

