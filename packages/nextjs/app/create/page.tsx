"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Event } from "@ethersproject/providers/lib/base-provider";
import { Box, Button, Calendar, DateInput, FileInput, Meter, Spinner } from "grommet";
import type { NextPage } from "next";
import { set } from "nprogress";
import { useAccount, useChainId } from "wagmi";
import { InputBase, IntegerInput } from "~~/components/scaffold-eth";
import { greenfieldDeploy } from "~~/hooks/greenfieldDeploy";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { UploadJsonToIPFS } from "~~/utilComponents/IPFSdeploy";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const Create: NextPage = () => {
  //const { write: createCampaign } = useContractWrite();
  const { address: connectedAddress, connector } = useAccount(); //	WORKS
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [impact, setimpact] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  const [ipfsHash, setIpfsHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  //
  const [img, setImg] = useState<File>();
  //

  async function convertImageToBase64(img: File) {
    if (!img) {
      throw new Error("Please select an image file.");
    }

    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(img);
      reader.onload = event => resolve(event?.target?.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleClick = async () => {
    if (!connectedAddress) alert("Connect Wallet First");
    if (img && connectedAddress && connector) {
      if (!Number(goalAmount)) return setError("Invalid Numeric Amount");
      try {
        setError("");
        setIsLoading(true);
        const base64String: string = (await convertImageToBase64(img)) as string;

        await greenfieldDeploy(title, description, base64String, impact, goalAmount, connectedAddress);
        setIsLoading(false);

        window.location.href = "/";
      } catch (error) {
        console.error("Error converting image:", error);
      }
    } else {
      setError("Fill Out All The Fields");
    }
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) {
      console.error("Please select a file.");
      return;
    }

    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]; // Add more types as needed

    const fileType = file.type;

    if (!allowedImageTypes.includes(fileType)) {
      console.error("Please select an image file (JPEG, PNG, GIF, BMP, WebP, TIFF, SVG).");
      return;
    }
    setImg(file);
  };

  return (
    <Box className="bg-green-400 size-full h-100vh " fill pad="large" align="center">
      {!isLoading && (
        <Box
          margin="large"
          background="white"
          pad={{ horizontal: "medium", vertical: "small" }}
          width={{ max: "500px" }}
          round="medium"
        >
          <Box align="center" justify="center" pad={{ vertical: "medium" }} gap="small">
            <h1 className="text-xl">KICK-OFF YOUR PROJECT</h1>
          </Box>
          <Box gap="medium" margin={{ horizontal: "medium", vertical: "small" }} align="start">
            <Box align="start">
              <h1>Project Name</h1>
              <InputBase name="title" value={title} onChange={setTitle} />
            </Box>
            <Box align="start">
              <h1>Project Description</h1>
              <InputBase name="Project Description" value={description} onChange={setDescription} />
            </Box>
            {/*   <Box align="start">
            <h1>Impact on the ecosystem</h1>
            <InputBase name="impact" value={impact} onChange={setimpact} />
          </Box> */}
            <Box align="start">
              <h1>Goal Amount in BNB </h1>
              <InputBase name="goalAmount" value={goalAmount} onChange={value => setGoalAmount(value)} />
            </Box>

            <Box align="start" gap="small">
              <h1>Image Upload</h1>
              <input
                type="file"
                className="file-input file-input-bordered file-input-ghost  w-full max-w-xs"
                onChange={handleFileInput}
                accept="image/*" // Specify accepted file types here
                multiple={false}
              />
            </Box>
          </Box>
          <Box pad="medium">
            <Button
              color="#4ade80"
              size="medium"
              //primary
              pad={{ horizontal: "xsmall", vertical: "small" }}
              label="Create Campaign"
              onClick={handleClick}
            />
          </Box>
          {error.length > 0 && <p className="text-red-600">{error}</p>}
        </Box>
      )}
      {isLoading && (
        <Box align="center" justify="center">
          <Spinner size="large" />
        </Box>
      )}
    </Box>
  );
};

export default Create;
