import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; //HashRouter
import connectedWallet from '@/web3Hooks/useConnectedWallet';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';
import newContracts from '@/web3Hooks/useNewContract';
import changeLocalStorage from '@/hooks/useChangeLocalStorage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en.json';
import cn from '@/locales/cn.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      cn: { translation: cn }
    },
    fallbackLng: localStorage.getItem('language') || 'cn', // 默认语言
    debug: true, // 开启调试模式
    interpolation: {
      escapeValue: false // React 已经处理了转义
    }
  });
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <connectedWallet.Provider initialState={undefined}>
      <newContracts.Provider>
        <changeLocalStorage.Provider>
          {/* ui 框架降级 */}
          <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
            <App />
          </StyleProvider>
        </changeLocalStorage.Provider>
      </newContracts.Provider>
    </connectedWallet.Provider>

  </BrowserRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
