import React, { useEffect } from "react";
import { Client } from "@bnb-chain/greenfield-js-sdk";
import { IReturnOffChainAuthKeyPairAndUpload } from "@bnb-chain/greenfield-js-sdk";
import { ReedSolomon } from "@bnb-chain/reed-solomon";

export interface CampaignInfo {
  title: string;
  desc: string;
  image: string;
  creator: string;
  impact: string;
  amount: string;
}
// Browser
const client = Client.create("https://gnfd-testnet-fullnode-tendermint-ap.bnbchain.org", String(5600), {
  zkCryptoUrl: "https://unpkg.com/@bnb-chain/greenfield-zk-crypto@0.0.3/dist/node/zk-crypto.wasm",
});

export async function greenfieldDeploy(
  title: string,
  desc: string,
  imageBuffer: string,
  impact: string,
  amount: string,
  connectedAddress: string,
) {
  if (!title || !desc || !imageBuffer || !connectedAddress) return console.error("missing fields");

  console.log("addresses", connectedAddress);
  const campaignInfo: CampaignInfo = {
    title: title,
    desc: desc,
    image: imageBuffer,
    impact: impact,
    amount: amount,
    creator: connectedAddress,
  };
  const campaignInfoJson = JSON.stringify(campaignInfo);
  const bodyBlob = new Blob([campaignInfoJson], { type: "application/json" });
  const file = new File([bodyBlob], "file_name.json", { type: "application/json" }); // !DA TESTARE

  const fileBytes = await file.arrayBuffer();
  if (!fileBytes) alert("no file selected");

  // init rs
  const rs = new ReedSolomon();
  const expectCheckSums = rs.encode(new Uint8Array(fileBytes));

  // get s providers
  /*  const sps = await client.sp.getStorageProviders();
  const primarySP = sps[0].operatorAddress;
  console.log("primarySP", primarySP); */
  const sProviders = await getAllSps();

  //# //? // // /// //

  const provider = window.ethereum;
  console.log("provider", provider);
  const offChainData = await getOffchainAuthKeys(connectedAddress, provider, sProviders);
  if (!offChainData) {
    alert("No offchain, please create offchain pairs first");
    return;
  }
  console.log("offchain data: ", offChainData);

  /* const createBucketTx = await client.bucket.createBucket(
    {
      bucketName: "mybucket22245",
      creator: connectedAddress,
      visibility: "VISIBILITY_TYPE_PUBLIC_READ",
      chargedReadQuota: "0",
      spInfo: {
        primarySpAddress: sProviders[0].address,
      },
      paymentAddress: connectedAddress,
    },
    {
      type: "EDDSA",
      domain: window.location.origin,
      seed: offChainData.seedString,
      address: connectedAddress,
      // type: 'ECDSA',
      // privateKey: ACCOUNT_PRIVATEKEY,
    },
  );
  console.log("hi");
  const createBucketTxSimulateInfo = await createBucketTx.simulate({
    denom: "BNB",
  });
  //broadcast create bucket tx
  const bucketRes = await createBucketTx.broadcast({
    denom: "BNB",
    gasLimit: Number(createBucketTxSimulateInfo?.gasLimit),
    gasPrice: createBucketTxSimulateInfo?.gasPrice || "5000000000",
    payer: connectedAddress,
    granter: "",
  }); */
  console.log("letsgoooo");
  //		? THIS IS FOR GETTING THE APPROVAL OF THE OBJECT
  const createObjectTx = await client.object.createObject(
    {
      bucketName: "mybucket22245", //this is our bucket name
      objectName: title,
      creator: connectedAddress,
      visibility: "VISIBILITY_TYPE_PUBLIC_READ",
      fileType: ".json", //change this later
      redundancyType: "REDUNDANCY_EC_TYPE",
      contentLength: fileBytes.byteLength,
      expectCheckSums: expectCheckSums,
    },
    {
      type: "EDDSA",
      domain: window.location.origin,
      seed: offChainData.seedString,
      address: connectedAddress,
      // type: 'ECDSA',
      // privateKey: ACCOUNT_PRIVATEKEY,
    },
  );

  const createObjectTxSimulateInfo = await createObjectTx.simulate({
    denom: "BNB",
  });

  const createObjectTxRes = await createObjectTx.broadcast({
    denom: "BNB",
    gasLimit: Number(createObjectTxSimulateInfo?.gasLimit),
    gasPrice: createObjectTxSimulateInfo?.gasPrice || "5000000000",
    payer: connectedAddress,
    granter: "",
  });

  if (createObjectTxRes.code === 0) {
    console.log("create object success");
  }

  // upload your object
  await client.object.uploadObject(
    {
      bucketName: "mybucket22245",
      objectName: title,
      body: file, // !DA TESTARE

      txnHash: createObjectTxRes.transactionHash,
    },
    {
      type: "EDDSA",
      domain: window.location.origin,
      seed: offChainData.seedString,
      address: connectedAddress,
      // type: 'ECDSA',
      // privateKey: ACCOUNT_PRIVATEKEY,
    },
  );

  const bucketInfo = await client.bucket.headBucket("mybucket22245");

  const res = await client.object.listObjects({
    bucketName: "mybucket22245",
    endpoint: sProviders[0].endpoint, //! DA TESTARE
  });
}

/**
 * generate off-chain auth key pair and upload public key to sp
 */
export const getOffchainAuthKeys = async (address: string, provider: any, sps: any) => {
  const allSps = sps;
  const offchainAuthRes = await client.offchainauth.genOffChainAuthKeyPairAndUpload(
    {
      sps: allSps,
      chainId: 5600,
      expirationMs: 5 * 24 * 60 * 60 * 1000,
      domain: window.location.origin,
      address: address,
    },
    provider,
  );

  const { code, body: offChainData } = offchainAuthRes;
  if (code !== 0 || !offChainData) {
    throw offchainAuthRes;
  }

  console.log("seedSEEDseedSEED", offChainData.seedString);
  return offChainData;
};

export const getSps = async () => {
  const sps = await client.sp.getStorageProviders();
  const finalSps = (sps ?? []).filter((v: any) => v.endpoint.includes("nodereal"));

  // const finalSps = sps.filter((v) => v.id === 4);

  return finalSps;
};

export const getAllSps = async () => {
  const sps = await getSps();

  return sps.map(sp => {
    return {
      address: sp.operatorAddress,
      endpoint: sp.endpoint,
      name: sp.description?.moniker,
    };
  });
};
