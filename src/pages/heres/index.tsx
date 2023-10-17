import Ununited from "@/conmonents/Ununited";
import "./index.scss";
import { Button, Empty, Popover } from "antd";
import { mobileHidden } from "@/utils";
import useGetFatherList from "@/web3Hooks/useGetFatherList";
import useGetInfo from "@/web3Hooks/useGetInfo";
import useTokenInfo from "@/web3Hooks/useTokenInfo";
const Heres = () => {
  const { getFatherListList } = useGetFatherList();
  return (
    <div className="heres">
      <Ununited />
      <div className="heres-list">
        <div className="heres-list-header">
          <div>地址</div>
          <div>代币</div>
          <div>继承</div>
        </div>
        {getFatherListList?.length ? (
          <div className="heres-list-body">
            { getFatherListList.map((item,index)=>{
                   return <div key={index} className="heres-list-body-item">
                   <Dasd address= {item}></Dasd>
                 </div>
            })
              
            }
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};
const Dasd = (props:{address:string}) => {
  const {address} = props  
  const { addressj,
    inheritanceERC20List,
    inheritanceERC20,claimApproveERC20,lod} =useGetInfo(address)
  const  {symbol} = useTokenInfo(inheritanceERC20List || '')  
  return (
    <>
      <div className="heres-list-body-item-one">
        {mobileHidden(addressj || '', 5, 5)}
      </div>
      <div className="heres-list-body-item-tow">
        <Popover
          content={
            <>
              <div className="heres-list-body-item-tow-popover">
                <span>{symbol}</span>
                <span>{inheritanceERC20}</span>
              </div>
            </>
          }
          title="代币"
        >
          点击查看
        </Popover>
      </div>
      <Button disabled={!!!inheritanceERC20} loading={lod} onClick={claimApproveERC20} className="heres-list-body-item-btn">继承</Button>
    </>
  );
};
export default Heres;
