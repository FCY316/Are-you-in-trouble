import { memo, useState } from "react";
import languageConverter from "@/image/languageConverter.png";
import walletimg from "@/image/walletimg.png";
import downarrow from "@/image/downarrow.png";
import copy from "@/image/copy.png";
import connectedWallet from "@/web3Hooks/useConnectedWallet";
import { ConfigProvider, Dropdown, Modal, type MenuProps, Button, Drawer, Menu } from 'antd';
import { useTranslation } from "react-i18next";
import "./index.scss";
import changeLocalStorage from "@/hooks/useChangeLocalStorage";
import {  ethereumAddressImage, handleCopyClick, mobileHidden } from "@/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { PicRightOutlined } from "@ant-design/icons";
const items: MenuProps['items'] = [
  {
    key: 'cn',
    label: '中文',
  },
  {
    key: 'en',
    label: 'English',
  },
];
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const Header = () => {
  // 路由
  const navigate = useNavigate()
  // 获取当前的路由路径用于判断选中的menu
  const { pathname } = useLocation()
  // 本地缓存的语言
  const { language, changeLanguage } = changeLocalStorage.useContainer()
  // 语言hooks
  const { i18n, t } = useTranslation();
  // 获取地址，连接，断开钱包方法
  const { address, connected, breaks } = connectedWallet.useContainer();
  // 控制弹窗的参数
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 更具地址生成的图片
  const [addImg] = useState(ethereumAddressImage(address))
  // 控制侧边栏的参数
  const [open, setOpen] = useState(false);
  // 切换语言
  const onClick: MenuProps['onClick'] = ({ key }) => {
    i18n.changeLanguage(key)
    changeLanguage(key)
  };
  // 打开弹窗
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 关闭弹窗
  const handleOk = () => {
    setIsModalOpen(false);
  };
  // 打开侧边栏
  const showDrawer = () => {
    setOpen(true);
  };
  // 关闭侧边栏
  const onClose = () => {
    setOpen(false);
  };
  // 侧边栏的数据
  const itemss: MenuProps['items'] = [
    getItem(t('header.maintain'), '/'),
    getItem(t('header.creation'), '/creation'),
    getItem(t('header.heres'), '/heres')
  ]
  // 菜单栏的结果
  const onClicks: MenuProps['onClick'] = ({ key }) => {
    // 检测第一个字是不是/ 是的话路由跳转，不是的话连接跳转
    if (key.startsWith("/")) {
      navigate(key)
    } else {
      window.open(key)
    }
    onClose()
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Dropdown: {
            controlPaddingHorizontal: 39,
            controlItemBgActive: "#F1F1F1",
            controlItemBgActiveHover: "#F1F1F1"
          },
          Modal: {
            paddingLG: 20,
            paddingContentHorizontalLG: 18
          },
          Menu: {
            darkItemHoverColor: "#ebdede",
            darkItemBg: '',
            subMenuItemBorderRadius: 0,
            itemBorderRadius: 0,
            itemMarginInline: 0,
            darkItemColor: '#1E1E1E',
            darkItemSelectedBg: '#d2cfcf',
            darkItemSelectedColor: ''
          }
        },
      }}>
      <nav className="header">
        <div className="header-logo">
          <span>Are you in trouble</span>
          <div className="header-center">
              <Menu className="header-center_Menu"
                onClick={onClicks} selectedKeys={[pathname]} mode="horizontal" items={itemss} />
          </div>
        </div>
        <div className="header-function">

          <Dropdown overlayClassName="header-function-language-Dropdown" menu={{
            items, onClick, selectable: true,
            defaultSelectedKeys: [language || 'cn']
          }} placement="bottom" arrow>
            <div className="header-function-language">
              <img onClick={(e) => e.preventDefault()} src={languageConverter} alt="" />
            </div>
          </Dropdown>
          <div className="header-function-address" onClick={address ? showModal : () => { connected() }}>
            {address ? (
              <div>
                <img src={walletimg} alt="" />
                <img src={downarrow} alt="" />
              </div>
            ) : (
              <span >{t('header.connectedWallet')}</span>
            )}
          </div>
          {
            address && <div className="header-function-menu" >
            <PicRightOutlined onClick={showDrawer} />
          </div>
          }
        </div>
        <Modal className="header-modal" footer={null} closeIcon={false} open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
          <div className="header-modal-context">
            <img className="header-modal-context-logo" src={addImg} alt="" />
            <div className="header-modal-context-address">
              <span>{mobileHidden((address))}</span>
              <img onClick={() => { handleCopyClick((address)) }} src={copy} alt="" />
            </div>
            <Button onClick={() => { breaks(); handleOk();navigate('/') }} className='btn header-modal-context-btn'>{t('header.exitWallet')}</Button>
          </div>
        </Modal>
        <Drawer width={'70%'} closeIcon={false}
          placement="right" onClose={onClose} open={open}>

          <Menu
            onClick={onClicks}
            style={{ width: '100% ' }}
            selectedKeys={[pathname]}
            mode="inline"
            theme={'dark'}
            items={itemss}
          />
        </Drawer>
      </nav>
    </ConfigProvider>

  );
};

export default memo(Header);
