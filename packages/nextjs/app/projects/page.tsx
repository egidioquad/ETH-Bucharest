"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Grid, Image, Meter, Spinner } from "grommet";
import type { NextPage } from "next";
import { greenfieldBucketGet } from "~~/hooks/greenfieldBucketGet";
import { CampaignInfo } from "~~/hooks/greenfieldDeploy";

const Projects: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [allObjects, setAllObjects] = useState<CampaignInfo[]>([]);

  useEffect(() => {
    const fetchObjects = async () => {
      setLoading(true);
      try {
        const fetchedObjects = await greenfieldBucketGet();
        if (fetchedObjects !== undefined) {
          setAllObjects(fetchedObjects);
        }
      } catch (error) {
        console.error("Error fetching objects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();
  }, []);

  return (
    <Box margin="large">
      <Box margin="medium">
        <h1 className="text-3xl">Discover Projects</h1>
      </Box>
      {loading == false && (
        <Grid rows="small " columns={["1/2", "1/2"]} gap="small">
          {allObjects.map((object, index) => (
            <Link href={`/projects/${object.title}`}>
              <Box key={index} border={{ color: "#4ade80", size: "small" }} pad="medium" direction="row" round="small">
                <Box width="160px" height="160px">
                  <Image src={`${object.image}`} fit="contain" />
                </Box>
                <Box align="center" justify="center" width="full" gap="sxmall">
                  <p className="text-lg">{object.title}</p>
                </Box>
              </Box>
            </Link>
          ))}
        </Grid>
      )}
      {loading == true && (
        <Box align="center" justify="center">
          <Spinner size="medium" />
        </Box>
      )}
    </Box>
  );
};

export default Projects;

const getImageFormat = (base64String: string): "jpeg" | "png" => {
  // Check if the base64 string contains the JPEG or PNG header
  if (base64String.startsWith("/9j/")) {
    return "jpeg";
  } else if (base64String.startsWith("iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AA")) {
    return "png";
  } else {
    // Default to JPEG if format cannot be determined
    return "jpeg";
  }
};
