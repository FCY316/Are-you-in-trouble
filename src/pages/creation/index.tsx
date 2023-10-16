import { Button, Empty, Spin } from "antd";
import "./index.scss";
import Ununited from "@/conmonents/Ununited";
import { CopyOutlined } from "@ant-design/icons";
import { handleCopyClick, mobileHidden } from "@/utils";
import useCreate from "@/web3Hooks/useCreate";
import GetInheritorList from "@/web3Hooks/useGetInheritorList";

const Creation = () => {
  const data: any = JSON.parse(localStorage.getItem("obj") || "[]");
  // 创建的 方法 loading
  const { create, createLod } = useCreate();
  return (
    <div className="creation">
      <Ununited />
      <Button
        block
        className="creation-btn"
        loading={createLod}
        onClick={create}
      >
        创建
      </Button>
      <div className="creation-list">
        {data.length ? (
          <>
            {data.map((item: any, inedx: any) => {
              return (
                <div key={inedx} className="creation-list-item">
                  <Item address = {item}></Item>
                </div>
              );
            })}
          </>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

const Item = (props:{address:string}) => {
  const {address} = props
  const { addressJ,addressW,
    addressJPending}= GetInheritorList(address)
 return <div className="creation-list-item-left">
    <p>
      <span>继承地址：</span>
      <span>
        {!addressJPending ?  mobileHidden(addressJ || '', 5, 10): <Spin></Spin>}
        <CopyOutlined onClick={() => handleCopyClick(addressJ || '')} />
      </span>
    </p>
    <p>
      <span>维持地址：</span>
      <span>
        { mobileHidden(addressW||'', 5, 10)}
        <CopyOutlined onClick={() => handleCopyClick(addressW||'')} />
      </span>
    </p>
  </div>;
};
export default Creation;
