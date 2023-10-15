import AppRouter from '@/router'
import './App.scss';
// import useListenerNetWork from '@/web3Hooks/useListenerNetWork';
import useWatchWalletAddress from '@/web3Hooks/useWatchWalletAddress';
import { ConfigProvider } from 'antd';
// import "@/log/index";
function App() {
  // 监听网络
  // useListenerNetWork()
  // 监听地址
  useWatchWalletAddress()
  return (
    <div className="App">
      {/* antd 组件全局样式 */}
      <ConfigProvider
        theme={{
          components: {
            Button: {
              contentFontSize: 16,
              fontWeight: "500",
              defaultBg: "#1E1E1E",
              defaultColor: "#ffffff",
              borderRadius: 35,
              colorPrimaryHover: "#ffffff",
              colorPrimaryActive: "#ffffff",
              defaultShadow: "#808080"
            },
          },
        }}>
        <AppRouter />
      </ConfigProvider>
    </div>
  );
}

export default App;
