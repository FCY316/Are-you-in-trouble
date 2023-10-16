import Ununited from "@/conmonents/Ununited";
import "./index.scss";
import { Button, Empty, Spin } from "antd";
import { handleCopyClick, mobileHidden } from "@/utils";
import { CopyOutlined } from "@ant-design/icons";
import useGetMaintainerList from "@/web3Hooks/useGetMaintainerList";
import useGetcreateAddress from "@/web3Hooks/useGetcreateAddress";
import useMaintainHeartBeat from "@/web3Hooks/useMaintainHeartBeat";
const Connected = () => {
  const { getMaintainerList } = useGetMaintainerList();
  console.log(getMaintainerList);
  return (
    <>
      <Ununited />
      <div className="connected">
        {getMaintainerList?.length ? (
          <div>
            {getMaintainerList?.map((item, index) => {
              return <div key={index} className="connected-item">
                <DataIrtwe address={item}></DataIrtwe>
              </div>;
            })}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};
const DataIrtwe = (props: { address: string }) => {
  const { address } = props;
  const { addressJ, addressJPending } = useGetcreateAddress(address);
  const { maintain, maintainLod } = useMaintainHeartBeat();

  return (
    <>
      <div className="connected-item-left">
        <p>
          <span>合约地址：</span>
          {mobileHidden(address, 5, 5)}
          <CopyOutlined onClick={() => handleCopyClick(address)} />
        </p>
        <p>
          <span>创建地址：</span>
          {addressJPending ? <Spin></Spin> : mobileHidden(addressJ || "", 5, 5)}
          <CopyOutlined onClick={() => handleCopyClick(addressJ || "")} />
        </p>{" "}
      </div>
      <Button loading={maintainLod} onClick={()=>{maintain(address)}} className="connected-item-btn">维持</Button>
    </>
  );
};
export default Connected;
