import { Button, Form, Input, Radio, RadioChangeEvent, Select } from "antd";
import "./index.scss";
import { useState } from "react";
import useTokenInfo from "@/web3Hooks/useTokenInfo";
import useSet from "@/web3Hooks/useSet";
import useAuthorization from "@/web3Hooks/useAllowance";
import usePledge from "@/web3Hooks/usePledge";
const optionsWithDisabled = [
  { label: "主网币", value: 0 },
  { label: "代币", value: 1 },
];

const Establish = () => {
  const [value1, setValue1] = useState(1);
  const [tokenAddress, setTokenAddress] = useState("");
  const { limit,approve,approveLod } = useAuthorization(tokenAddress);
  const {pdsdas,state,plageLod} = usePledge()
  const [num, setnum] = useState(0);
  const { decimals, symbol, tokenName } = useTokenInfo(tokenAddress);
  const { set, setLod } = useSet();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    const {
      tokenAddress,
      inheritor,
      inheritanceAmount,
      maintainInterval,
      maintainer,
    } = values;
    console.log(tokenAddress);
    const StokenAddress =
      tokenAddress || "0x0000000000000000000000000000000000000000";
    set(
      StokenAddress,
      inheritor,
      inheritanceAmount,
      maintainInterval,
      maintainer
    );
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };

  return (
    <div className="establish">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ radio: value1 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="继承者地址"
          name="inheritor"
          rules={[{ required: true, message: "请输入继承者地址" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="维持者地址"
          name="maintainer"
          rules={[{ required: true, message: "请输入维持者地址" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="心跳间隔时间"
          name="maintainInterval"
          rules={[{ required: true, message: "请输入心跳间隔时间" }]}
        >
          <Select
            defaultValue="请选择"
            style={{ width: 120 }}
            options={[
              { value: 600, label: "10分钟" },
              { value: 1296000, label: "15天" },
              { value: 2592000, label: "30天" },
            ]}
          />
        </Form.Item>
        {/* <Form.Item
          label="心跳间隔时间"
          name="radio"
          rules={[{ required: true, message: "请输入心跳间隔时间" }]}
        >
          <Radio.Group
            options={optionsWithDisabled}
            onChange={onChange}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item> */}
        {!!value1 && (
          <Form.Item
            label="代币地址"
            name="tokenAddress"
            rules={[{ required: true, message: "请输入代币地址" }]}
          >
            <Input
              onBlur={(e) => {
                setTokenAddress(e.target.value);
              }}
            />
          </Form.Item>
        )}
        {!!value1 && (
          <Form.Item>
            <div className="establish-token">
              <div>精度：{decimals || "--"}</div>
              <div>币种：{symbol || "--"}</div>
              <div>代币名称：{tokenName || "--"}</div>
            </div>
          </Form.Item>
        )}
        <Form.Item
          label="继承的金额"
          name="inheritanceAmount"
          rules={[{ required: true, message: "请输入继承的金额" }]}
        >
          <Input
            onChange={(e) => {
              setnum(Number(e.target.value));
            }}
          />
        </Form.Item>
        <Form.Item>
          {
          value1 ? 
             (Number(limit) >= num ? <Button loading={setLod} block htmlType="submit">
              提交
            </Button>: <Button block loading={approveLod} onClick={()=>{approve(num)}}>授权{limit}</Button>)
            :(
              !state ? <Button block onClick={()=>{ pdsdas()}} loading={plageLod} >质押</Button> :
              <Button loading={setLod} block htmlType="submit">
              提交
            </Button>
            )
          }
        </Form.Item>
      </Form>
    </div>
  );
};

export default Establish;
