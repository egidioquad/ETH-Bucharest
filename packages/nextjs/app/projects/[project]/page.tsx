"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, Button, Grid, Image, Meter, Stack } from "grommet";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { greenfieldRecords } from "~~/hooks/greendieldTransfer";
import { CampaignInfo } from "~~/hooks/greenfieldDeploy";
import DonateForm from "~~/utilComponents/donateForm";

const ClubPage: NextPage = () => {
  const pathParts = usePathname().split("/");
  const name = pathParts[pathParts.length - 1];

  const { address } = useAccount();

  const [campaignDetails, setCampaignDetails] = useState<CampaignInfo>();

  const [amountRaised, setAmountRaised] = useState(0);
  useEffect(() => {
    console.log("name", name);
    if (!name) return;

    const fetchObject = async () => {
      const response = await fetch(`https://gnfd-testnet-sp1.nodereal.io/view/bloom553/${name}`);
      if (response.ok) {
        const json: CampaignInfo = await response.json();
        setCampaignDetails(json);
      } else {
        console.error("Failed to fetch JSON file:", response.statusText);
      }
    };

    fetchObject();
  }, [name]);

  useEffect(() => {
    if (!campaignDetails) return;

    const fetchRecords = async () => {
      const records = await greenfieldRecords(campaignDetails?.creator);
      console.log(records);
      if (records) setAmountRaised(records);
    };

    fetchRecords();
  }, [campaignDetails]);

  const [active, setActive] = useState(0);
  const [label, setLabel] = useState("");
  const [highlight, setHighlight] = useState(false);
  return (
    <Box>
      <Box>
        {campaignDetails && (
          <Box>
            <Box width="100%" height="auto" className="bg-green-400 " justify="between" direction="row" align="start">
              <Box pad="medium">
                <Image src={`${campaignDetails.image}`} fit="contain" width="300px" />
                <Box margin={{ top: "medium" }}>
                  <h1 className="text-xl font-bold">{campaignDetails.title}</h1>
                </Box>
              </Box>

              <Box pad="medium" width="60%" gap="large">
                <Box background="white" alignSelf="center" align="center" justify="center" round="medium">
                  <DonateForm recipient={campaignDetails.creator} />
                </Box>
                <Box alignSelf="center" align="center" justify="center" round="medium">
                  <Button
                    label="Get Involved"
                    primary
                    onClick={() =>
                      alert("Feature In Progress. We plan to let people contribute to the project with their skills ")
                    }
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Box width="full" alignSelf="center" pad={{ horizontal: "large" }}>
                <Box direction="row" justify="between">
                  <Box width={{ max: "50%" }} justify="center" align="center" gap="medium" pad="medium">
                    <h1>About The Project:</h1>
                    <h1>{campaignDetails.desc}</h1>
                  </Box>
                  <Box justify="center" pad="large">
                    <Stack anchor="center">
                      <Meter
                        type="circle"
                        background="light-2"
                        values={[
                          {
                            value: amountRaised,
                            onHover: over => {
                              setActive(over ? parseFloat(amountRaised.toFixed(4)) : 0);
                              setLabel(over ? "" : "");
                            },
                            onClick: () => {
                              setHighlight(() => !highlight);
                            },
                            highlight,
                          },
                          {
                            value: parseFloat(parseInt(campaignDetails.amount).toFixed(4)),
                            onHover: over => {
                              setActive(
                                over ? parseFloat((parseInt(campaignDetails.amount) - amountRaised).toFixed(4)) : 0,
                              );
                              setLabel(over ? "missing" : "");
                            },
                          },
                        ]}
                        max={100}
                        size="small"
                        thickness="medium"
                      />
                      <Box align="center" justify="center">
                        <h1 className="font-bold text-sm">{label || "Raised"}</h1>
                        <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
                          <h1 className="font-bold text-lg">{active || amountRaised.toFixed(4)}</h1>
                          <h1>BNB</h1>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ClubPage;
