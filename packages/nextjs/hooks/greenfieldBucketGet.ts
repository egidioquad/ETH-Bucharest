import React from "react";
import { CampaignInfo } from "./greenfieldDeploy";
import { Client } from "@bnb-chain/greenfield-js-sdk";

const client = Client.create("https://gnfd-testnet-fullnode-tendermint-ap.bnbchain.org", String(5600), {
  zkCryptoUrl: "https://unpkg.com/@bnb-chain/greenfield-zk-crypto@0.0.3/dist/node/zk-crypto.wasm",
});
export async function greenfieldBucketGet() {
  const sps = await client.sp.getStorageProviders();

  const res = await client.object.listObjects({
    bucketName: "mybucket22245",
    endpoint: sps[0].endpoint, //! DA TESTARE
  });

  console.log("bucket:", res);
  // Check if the response is successful and contains the Objects array
  if (
    res.code === 0 &&
    res.body &&
    res.body.GfSpListObjectsByBucketNameResponse &&
    res.body.GfSpListObjectsByBucketNameResponse.Objects
  ) {
    const objects = res.body.GfSpListObjectsByBucketNameResponse.Objects;
    const objectNames: string[] = [];
    for (const objectMeta of objects) {
      const objName = objectMeta.ObjectInfo.ObjectName;

      objectNames.push(objName.toString());
    }

    console.log("Object names:", objectNames);
    const objectsByName = await fetchObjectsByName(objectNames);
    return objectsByName;
  } else {
    console.error("Error fetching objects:", res.message);
  }
}

async function fetchObjectsByName(names: string[]): Promise<CampaignInfo[]> {
  const filesArray: CampaignInfo[] = [];

  for (const name of names) {
    const response = await fetch(`https://gnfd-testnet-sp1.nodereal.io/view/mybucket22245/${name}`);
    if (response.ok) {
      const json: CampaignInfo = await response.json();
      filesArray.push(json);
    } else {
      console.error("Failed to fetch JSON file:", response.statusText);
    }
  }
  return filesArray;
}
