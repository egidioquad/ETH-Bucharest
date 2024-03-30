"use client";

import React from "react";
import { Box, Button, Grid, Image, Meter } from "grommet";
import { Grommet } from "grommet";
import type { NextPage } from "next";

// Define the main component
const UnifiedPage: NextPage = () => {
  // Render the main component

  return (
    <Grommet full>
      <Box background="#4ade80" height="50vh" width="100%">
        <Box margin="large" fill width={{ max: "90%" }} align="center">
          <Grid columns={["2/3", "1/3"]} margin="small" gap="medium">
            <Box width={{ max: "xlarge" }} gap="medium" margin={{ top: "medium" }} align="start">
              <h1 className="text-3xl font-bold text-black text-left ">Empowering the digital ecosystem, together.</h1>
              <h1 className="text-black leading-relaxed max-w-2xl text-left">
                Join thousands of projects using Bloom to transparently fund, operate, and scale their ideas on BNB
                Chain.
              </h1>
              <Box direction="row" gap="small">
                <Button label="Explore Projects" primary onClick={() => (window.location.href = "/projects")} />
                <Button label="Create Project" secondary onClick={() => (window.location.href = "/create")} />
              </Box>
            </Box>
            <Box>
              <Image className="max-w-full" src="images/hero.png" />
            </Box>
          </Grid>
        </Box>
      </Box>

      <Box width="full" pad="large" background="white">
        <Image src="images/2.png" fit="contain" />
      </Box>
      <Box width="full" pad="large" background="#4ade80">
        <Image src="images/3.png" fit="contain" />
      </Box>
      <Box width="full" background="white">
        <Image src="images/4.png" fit="contain" />
      </Box>
    </Grommet>
  );
};

export default UnifiedPage; // Export the unified component
