import connectedWallet from "@/web3Hooks/useConnectedWallet"
import { ConfigProvider } from "antd"
import Connected from "./components/Connected"
import Ununited from "@/conmonents/Ununited";
import './index.scss'
const Home = () => {
   // 获取地址方法
   const { address } = connectedWallet.useContainer();
  return (
    <ConfigProvider
    theme={{
      components: {
        Input: {
          activeBorderColor: "#1e1e1e",
          hoverBorderColor: "#1e1e1e",
          activeShadow: '0 0 0 2px rgba(0, 0, 0, 0)'
        }
      }
    }}
  >
    <div className='home'>
      <div className='pc1200'>
        {address ? <Connected  /> : <Ununited />}
      </div>
    </div>
  </ConfigProvider>  )
}

export default Home