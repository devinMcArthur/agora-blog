import React from "react";

import { Box, Divider, Link } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";

import { VariableSearchSnippetFragment } from "../../generated/graphql";
import Card from "./Card";
import TextLink from "./TextLink";

interface IVariableCard {
  variable: VariableSearchSnippetFragment;
}

const VariableCard = ({ variable }: IVariableCard) => {
  return (
    <Card key={variable._id}>
      <TextLink link={`/v/${variable._id}`} fontWeight="bold" color="black">
        {variable.title}
      </TextLink>
      <Divider />
      <Box pt={2}>
        <Tag>
          <b>Value: {variable.finalValue}</b>
        </Tag>
      </Box>
    </Card>
  );
};

export default VariableCard;
