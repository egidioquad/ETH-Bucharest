import { useState } from "react";
import { Client } from "@bnb-chain/greenfield-js-sdk";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

const client = Client.create("https://gnfd-testnet-fullnode-tendermint-ap.bnbchain.org", String(5600), {
  zkCryptoUrl: "https://unpkg.com/@bnb-chain/greenfield-zk-crypto@0.0.3/dist/node/zk-crypto.wasm",
});

export const greenfieldTransfer = async (recipient: string, amount: string, address: string) => {
  if (!address) return;

  const provider = window.ethereum;
  if (!provider) return console.error("no provider");
  const transferTx = await client.account.transfer({
    fromAddress: address,
    toAddress: recipient,
    amount: [
      {
        denom: "BNB",
        amount: parseEther(`${Number(amount)}`).toString(),
      },
    ],
  });

  const simulateInfo = await transferTx.simulate({
    denom: "BNB",
  });

  console.log("simulateInfo", simulateInfo);

  const res = await transferTx.broadcast({
    denom: "BNB",
    gasLimit: Number(simulateInfo.gasLimit),
    gasPrice: simulateInfo.gasPrice,
    payer: address,
    granter: "",
    signTypedDataCallback: async (addr: string, message: string) => {
      provider;
      return await provider?.request({
        method: "eth_signTypedData_v4",
        params: [addr, message],
      });
    },
  });

  if (res.code === 0) {
    alert("transfer success!!");
    // ! SEND SOULBOUND
  }
};

interface Balance {
  balance: {
    denom: string;
    amount: string;
  };
}

export const greenfieldRecords = async (recipient: string) => {
  console.log("spike");
  const response = await client.account.getAccountBalance({
    address: recipient,
    denom: "BNB",
  });
  const amount = response.balance?.amount;

  if (amount) return Number(amount) * Math.pow(10, -18);
};
/* 0xA79DCA141eF8AcC9F0e05c61FF52e885E982731c */
