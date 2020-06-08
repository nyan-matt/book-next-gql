import React from "react";
import { Flex, Box, Heading, Text } from "theme-ui";

export default (props) => {
  return (
    <Flex
      sx={{
        minHeight: ["300px", "360px", "600px"],
        backgroundImage: [
          "url(/hero-undraw-50.png)",
          "url(/hero-undraw-50.png)",
          "url(/hero-undraw.png)",
        ],
        backgroundSize: "contain",
        backgroundPositionX: ["center", "center", "right"],
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        p={2}
        sx={{
          width: ["100%", "100%", "60%"],
        }}
      >
        <Heading as="h1" variant="display">
          Book headline here
        </Heading>
        <Text sx={{ fontSize: 4, fontWeight: 300 }}>
          Sample Next.js app built with faunadb, graphql, and theme-ui. Blah,
          blah, something lorem ipsum delor set amet.
        </Text>
      </Box>
    </Flex>
  );
};
