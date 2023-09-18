import { NFTStorage } from "nft.storage";
const APIKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVlM0E5YmZCRmViMjc4MDhDQTk3Zjc5Y0NBOTk1MUYxNzg1NDhCMkEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3OTQ1NDEwOTc1MCwibmFtZSI6Im5lc3QifQ.yGd0GduPqLnvYhh5xWa7zxRcinLT8OqYYoq-d4qPSF8";
// 上传图片的ipfs
export const mintNFTToken = async (uploadedFile: any) => {
  const metaData: any = await uploadNFTContent(uploadedFile);
  const ipfsGateWayURL = getIPFSGatewayURL(metaData.data.image.pathname);
  return ipfsGateWayURL;
};
const uploadNFTContent = async (inputFile: any) => {
  const nftStorage = new NFTStorage({ token: APIKEY });
  try {
    const metaData = await nftStorage.store({
      name: "Harmony NFT collection",
      description:
        "This is a Harmony NFT collenction stored on IPFS & Filecoin.",
      image: inputFile,
    });

    return metaData;
  } catch (error) {
    console.log(error);
  }
};
const getIPFSGatewayURL = (ipfsURL: string) => {
  let urlArray = ipfsURL.split("/");
  let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
  return ipfsGateWayURL;
};
// 上传文件到ipfs
export const uploadJSONToIPFSFileJosn = async (jsonContent: any) => {
  const nftStorage = new NFTStorage({ token: APIKEY });
  try {
    // 将 JSON 数据转换为字符串
    const jsonString = JSON.stringify(jsonContent);
    // 创建一个 Blob 对象
    const blob = new Blob([jsonString], { type: "application/json" });

    // 上传 Blob 对象到 IPFS
    const metaData = await nftStorage.storeBlob(blob);
    const ipfsGateWayURL = getIPFSGatewayURLFileJosn(`ipfs://${metaData}`);
    return ipfsGateWayURL;
  } catch (error) {}
};
const getIPFSGatewayURLFileJosn = (ipfsURL: string) => {
  const urlArray = ipfsURL.split("/");
  const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link`;
  return ipfsGateWayURL;
};
