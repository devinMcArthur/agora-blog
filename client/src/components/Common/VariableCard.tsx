import React from "react";

import { Box } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";

import { VariableSearchSnippetFragment } from "../../generated/graphql";
import Card from "./Card";
import TextLink from "./TextLink";

interface IVariableCard {
  variable: VariableSearchSnippetFragment;
}

const VariableCard = ({ variable }: IVariableCard) => {
  return (
    <Card
      heading={
        <TextLink link={`/v/${variable._id}`} fontWeight="bold" color="black">
          {variable.title}
        </TextLink>
      }
      key={variable._id}
    >
      <Box pt={2}>
        <Tag>
          <b>Value: {variable.finalValue}</b>
        </Tag>
      </Box>
    </Card>
  );
};

export default VariableCard;
