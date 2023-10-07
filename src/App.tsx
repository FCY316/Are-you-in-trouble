import React from 'react';
import AppRouter from '@/router'
import './App.css';
import useListenerNetWork from '@/web3Hooks/useListenerNetWork';
import useWatchWalletAddress from '@/web3Hooks/useWatchWalletAddress';
// import "@/log/index";
function App() {
  // 监听网络
  useListenerNetWork()
  // 监听地址
  useWatchWalletAddress()
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
